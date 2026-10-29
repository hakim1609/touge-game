// Синтез звука двигателя по его устройству (звук машин, этап «7. Звуковая система»). Это НЕ записи настоящих машин, а модель:
// каждый рабочий ход цилиндра даёт импульс давления в выпуске в свой момент поворота коленвала (порядок и интервалы вспышек —
// настоящие для мотора), импульсы проходят через резонансы выпускной трубы и глушитель, впуск шумит в такт вспышкам, турбина
// свистит по наддуву. Отсюда сами получаются высота тона (частота вспышек = обороты × цилиндры / 120), ровность шестёрки,
// рычание четвёрки и т. д. Профиль мотора — src/audio/profiles.js.
// Файл самодостаточный: он же загружается как модуль AudioWorklet (в конце — регистрация процессора) и импортируется
// в основной код (запасной путь без AudioWorklet и рендер в Node для тестов).

const TAU = Math.PI * 2;

/** Полосовой или НЧ-фильтр второго порядка (формулы RBJ), состояние внутри. */
class Biquad {
  constructor() {
    this.b0 = 1;
    this.b1 = 0;
    this.b2 = 0;
    this.a1 = 0;
    this.a2 = 0;
    this.z1 = 0;
    this.z2 = 0;
  }
  band(f, q, sr) {
    const w = (TAU * Math.min(f, sr * 0.45)) / sr,
      al = Math.sin(w) / (2 * q),
      a0 = 1 + al;
    this.b0 = al / a0;
    this.b1 = 0;
    this.b2 = -al / a0;
    this.a1 = (-2 * Math.cos(w)) / a0;
    this.a2 = (1 - al) / a0;
    return this;
  }
  low(f, q, sr) {
    const w = (TAU * Math.min(f, sr * 0.45)) / sr,
      c = Math.cos(w),
      al = Math.sin(w) / (2 * q),
      a0 = 1 + al;
    this.b0 = (1 - c) / 2 / a0;
    this.b1 = (1 - c) / a0;
    this.b2 = this.b0;
    this.a1 = (-2 * c) / a0;
    this.a2 = (1 - al) / a0;
    return this;
  }
  high(f, q, sr) {
    const w = (TAU * Math.min(f, sr * 0.45)) / sr,
      c = Math.cos(w),
      al = Math.sin(w) / (2 * q),
      a0 = 1 + al;
    this.b0 = (1 + c) / 2 / a0;
    this.b1 = -(1 + c) / a0;
    this.b2 = this.b0;
    this.a1 = (-2 * c) / a0;
    this.a2 = (1 - al) / a0;
    return this;
  }
  run(x) {
    const y = this.b0 * x + this.z1;
    this.z1 = this.b1 * x - this.a1 * y + this.z2;
    this.z2 = this.b2 * x - this.a2 * y;
    return y;
  }
}

/**
 * Настоящая запись мотора, проигрываемая по оборотам: запись разгона (обороты растут вдоль записи, таблица «время → обороты»)
 * читается короткими перекрывающимися кусками (0,1 с, окно Ханна) из того места, где обороты записи равны нынешним; остаток
 * разницы добирается скоростью чтения. Чтобы куски не «дрожали» друг о друга, начало нового подгоняется по сходству волны
 * с продолжением прежнего (в пределах периода вспышек). Ниже диапазона записи скорость чтения падает до 0,5 — дальше
 * звук отдаёт синтез (EngineDsp смешивает слои).
 */
export class SweepPlayer {
  constructor(sr) {
    this.sr = sr;
    this.data = null;
    this.g = [
      { pos: 0, inc: 1, age: 0, on: false },
      { pos: 0, inc: 1, age: 0, on: false },
    ];
    this.hop = 0;
    this.cur = 0;
    this.len = Math.round(sr * 0.16);
    this.seed = 12345;
  }
  /** @param {Float32Array} data @param {number} srcSr @param {number[][]} table [[секунда, обороты], …] по возрастанию @param {number} cyl */
  /** srcCyl — цилиндров у мотора на записи; cyl — у мотора в игре: место в записи выбирается по равной частоте вспышек. */
  /** steps — запись «ровные обороты ступенями»: таблица — пары точек (начало и конец ступени с одними оборотами). */
  setData(data, srcSr, table, srcCyl, cyl = srcCyl, steps = false) {
    this.steps = !!steps;
    this.step = -1;
    this.data = data;
    this.srcSr = srcSr;
    this.table = table;
    this.cyl = srcCyl;
    this.k = cyl / srcCyl;
    this.rpmMin = table[0][1];
    this.rpmMax = table[table.length - 1][1];
    /* таблица — по возрастанию оборотов; время может идти назад (запись торможения мотором) */ this.g[0].on =
      this.g[1].on = false;
    this.hop = 0;
  }
  clear() {
    this.data = null;
  }
  /** Секунда записи, где обороты равны rpm. */
  timeFor(rpm) {
    const T = this.table;
    if (rpm <= T[0][1]) return T[0][0];
    for (let i = 1; i < T.length; i++)
      if (rpm <= T[i][1]) {
        const a = T[i - 1],
          b = T[i],
          k = b[1] > a[1] ? (rpm - a[1]) / (b[1] - a[1]) : 0;
        return a[0] + (b[0] - a[0]) * k;
      }
    return T[T.length - 1][0];
  }
  rpmAt(sec) {
    const T = this.table;
    for (let i = 1; i < T.length; i++) {
      const a = T[i - 1],
        b = T[i];
      if ((sec - a[0]) * (sec - b[0]) <= 0)
        return b[0] === a[0] ? a[1] : a[1] + ((b[1] - a[1]) * (sec - a[0])) / (b[0] - a[0]);
    }
    const L = T[T.length - 1];
    return Math.abs(sec - T[0][0]) < Math.abs(sec - L[0]) ? T[0][1] : L[1];
  }
  /** Очередной отсчёт при оборотах rpm мотора игры. */
  next(rpmGame) {
    const d = this.data;
    if (!d) return 0;
    const rpm = rpmGame * this.k; // обороты мотора записи с той же частотой вспышек
    if (this.hop <= 0) {
      this.hop = this.len >> 1;
      const prev = this.g[this.cur];
      this.cur ^= 1;
      const g = this.g[this.cur];
      const span = (this.len * 2.2 * this.srcSr) / this.sr + 600;
      // каждый кусок — из чуть другого места записи (± 0,2 с вокруг нужных оборотов; разницу оборотов добирает скорость чтения):
      // иначе на ровных оборотах один и тот же кусок повторяется с шагом кусков — треск «как отсечка»
      this.seed = (this.seed * 1664525 + 1013904223) >>> 0;
      const jit = (this.seed / 4294967296 - 0.5) * 0.4 * this.srcSr;
      let start = Math.max(300, Math.min(d.length - span, this.timeFor(rpm) * this.srcSr + jit));
      if (this.steps) {
        // ступени: кусок — целиком из одной ступени, ближайшей по оборотам (с запасом 4 % против метаний между двумя соседними)
        const T = this.table,
          n = T.length >> 1;
        let bi = this.step,
          bd = bi >= 0 ? Math.abs(Math.log(rpm / T[bi * 2][1])) - 0.04 : Infinity;
        for (let i = 0; i < n; i++) {
          const dd = Math.abs(Math.log(rpm / T[i * 2][1]));
          if (dd < bd) {
            bd = dd;
            bi = i;
          }
        }
        this.step = bi;
        const a = T[bi * 2][0] * this.srcSr,
          b = Math.max(a, T[bi * 2 + 1][0] * this.srcSr - span);
        start = Math.max(300, Math.min(d.length - span, a + (this.seed / 4294967296) * (b - a)));
      }
      if (prev.on) {
        // подгонка по сходству с продолжением прежнего куска
        const P = Math.min(
            500,
            Math.round((this.srcSr * 120) / (Math.max(600, Math.min(rpm, this.rpmMax)) * this.cyl)),
          ),
          tp = Math.floor(prev.pos);
        let best = -Infinity,
          bd = 0;
        if (tp + 300 < d.length)
          for (let dl = -P; dl <= P; dl += 2) {
            const s0 = Math.floor(start) + dl;
            if (s0 < 0 || s0 + 300 >= d.length) continue;
            let c = 0;
            for (let i = 0; i < 280; i += 3) c += d[s0 + i] * d[tp + i];
            if (c > best) {
              best = c;
              bd = dl;
            }
          }
        start += bd;
      }
      g.pos = start;
      g.age = 0;
      g.on = true;
      // ниже и выше диапазона записи — добираем скоростью чтения (на холостых запись замедлена: низкий ровный гул)
      // предел ускорения — rateMax профиля (V10/V12 на записи шестёрки: иначе выше ~6500 об/мин тон перестаёт расти)
      g.inc = (this.srcSr / this.sr) * Math.max(0.3, Math.min(this.rateMax || 1.75, rpm / this.rpmAt(start / this.srcSr)));
    }
    this.hop--;
    let y = 0;
    for (let k = 0; k < 2; k++) {
      const g = this.g[k];
      if (!g.on) continue;
      const i = Math.floor(g.pos),
        f = g.pos - i;
      if (i + 1 >= d.length || g.age >= this.len) {
        g.on = false;
        continue;
      }
      const w = 0.5 - 0.5 * Math.cos((6.283185307 * g.age) / this.len);
      y += (d[i] + (d[i + 1] - d[i]) * f) * w;
      g.pos += g.inc;
      g.age++;
    }
    return y;
  }
}

/** Профиль по умолчанию: рядная четвёрка с серийным выпуском. Поля описаны в profiles.js. */
export const DSP_DEFAULT = {
  fire: [0, 180, 360, 540],
  cyl: [1, 1, 1, 1],
  irregular: 0.05,
  pulse: 0.3,
  exhaust: {
    res: [
      [110, 2.2, 1],
      [240, 2.5, 0.55],
      [620, 3, 0.3],
    ],
    lp: 900,
    lpLoad: 1400,
    drive: 1.6,
    gain: 1,
    edge: 0.15,
  },
  intake: { gain: 0.25, f: 520, q: 1.6, sync: 0.6 },
  mech: 0.05,
  crackle: 0,
  cam: null,
  turbo: null,
  idle: 850,
  redline: 7500,
  level: 1,
};

export class EngineDsp {
  /** @param {number} sr частота дискретизации */
  constructor(sr) {
    this.sr = sr;
    this.p = DSP_DEFAULT;
    this.phase = 0;
    this.rpm = 900;
    this.rpmT = 900;
    this.thr = 0;
    this.thrT = 0;
    this.boost = 0;
    this.boostT = 0;
    this.spool = 0;
    this.spoolT = 0;
    this.limiter = false;
    this.gain = 0;
    this.gainT = 0;
    this.cut = 0;
    this.e1 = 0;
    this.e2 = 0;
    this.seed = 22222;
    this.res = [new Biquad(), new Biquad(), new Biquad()];
    this.lp = new Biquad();
    this.hp = new Biquad().high(28, 0.7, sr);
    this.inBp = new Biquad();
    this.inBp2 = new Biquad();
    this.mechHp = new Biquad().high(2600, 0.7, sr);
    this.turboBp = new Biquad();
    this.bovBp = new Biquad();
    this.wh = 0;
    this.bov = 0;
    this.bovLen = 1;
    this.bovAmp = 0;
    this.pop = 0;
    this.popAmp = 0;
    this.lpNow = 0;
    this.ctl = 0;
    this.pPrev = 0;
    this.sweep = new SweepPlayer(sr);
    this.sweepOff = new SweepPlayer(sr);
    this.midBp = new Biquad().band(2000, 0.6, sr);
    this.popBp = new Biquad().band(700, 0.9, sr);
    this.popLen = 1;
    this.sDrive = 0;
    this.sMid = 0;
    this.smix = 0;
    this.sLp = 0;
    this.sLp2 = 0;
    this.sK = 0.5;
    this.sGain = 0;
    this.sG = 0;
    this.setProfile(DSP_DEFAULT);
  }
  /** Сменить мотор. */
  setProfile(p) {
    this.p = {
      ...DSP_DEFAULT,
      ...p,
      exhaust: { ...DSP_DEFAULT.exhaust, ...(p.exhaust || {}) },
      intake: { ...DSP_DEFAULT.intake, ...(p.intake || {}) },
    };
    const P = this.p,
      sr = this.sr;
    P.exhaust.res.forEach((r, i) => this.res[i]?.band(r[0], r[1], sr));
    this.inBp.band(P.intake.f, P.intake.q, sr);
    this.inBp2.band(P.intake.f * 2.1, P.intake.q * 1.3, sr);
    this.lpNow = 0;
    if (P.turbo) this.turboBp.band(5200, 2.5, sr);
    this.fired = new Uint8Array(P.fire.length);
  }
  /** Настоящая запись разгона этого мотора (SweepPlayer): выше её нижних оборотов звучит она, ниже — синтез. */
  /** off — вторая запись того же мотора на сбросе газа (торможение мотором): { data, sr, table }; слои смешиваются по газу. */
  setSample(data, srcSr, table, srcCyl, cyl, off, steps) {
    if (data) this.sweep.setData(data, srcSr, table, srcCyl, cyl, steps);
    else this.sweep.clear();
    if (data && off?.data) this.sweepOff.setData(off.data, off.sr, off.table, srcCyl, cyl);
    else this.sweepOff.clear();
    this.sweep.rateMax = this.sweepOff.rateMax = this.p?.rateMax || 1.75;
  }
  /** Состояние с физики: обороты, газ 0…1, отсечка, наддув 0…1 и раскрутка турбины 0…1; громкость 0…1. */
  set(rpm, throttle, limiter, boost, spool, gain) {
    this.rpmT = Math.max(300, rpm);
    this.thrT = Math.min(1, Math.max(0, throttle));
    this.limiter = !!limiter;
    this.boostT = boost || 0;
    this.spoolT = spool || 0;
    this.gainT = gain;
  }
  /** Сброс наддува через клапан: strength 0…1; recirc — перепускной клапан обратно во впуск (тихий вздох), иначе — в атмосферу. */
  blowOff(strength, recirc) {
    this.bov = 0;
    this.bovLen = Math.round(this.sr * (recirc ? 0.22 : 0.34));
    this.bovAmp = strength * (recirc ? 0.1 : 0.32);
    this.bovRecirc = !!recirc;
  }
  /** Хлопок в выпуске (догорание смеси на сбросе газа). */
  backfire(strength = 1) {
    this.pop = this.popLen = Math.round(this.sr * (0.035 + 0.03 * Math.min(1, strength)));
    this.popAmp = strength;
  }
  rand() {
    this.seed = (this.seed * 1664525 + 1013904223) >>> 0;
    return (this.seed / 4294967296) * 2 - 1;
  }

  /** Записать n отсчётов в out (моно). */
  process(out, n = out.length) {
    const P = this.p,
      sr = this.sr,
      fire = P.fire,
      nc = fire.length,
      E = P.exhaust,
      I = P.intake;
    for (let s = 0; s < n; s++) {
      // управление — раз в 32 отсчёта: сглаживание и перенастройка фильтров
      if ((this.ctl++ & 31) === 0) {
        this.rpm += (this.rpmT - this.rpm) * 0.12;
        this.thr += (this.thrT - this.thr) * 0.08;
        this.boost += (this.boostT - this.boost) * 0.1;
        this.spool += (this.spoolT - this.spool) * 0.1;
        this.gain += (this.gainT - this.gain) * 0.05;
        // кулачки высоких оборотов (VTEC): выше порога — ярче и громче впуск
        const cam = P.cam ? Math.min(1, Math.max(0, (this.rpm - P.cam.rpm) / 220)) : 0;
        this.camK = cam;
        const lp =
          (E.lp + E.lpLoad * this.thr) *
          (1 + (P.cam ? P.cam.bright * cam : 0)) *
          (0.75 + (0.5 * this.rpm) / P.redline);
        if (Math.abs(lp - this.lpNow) > this.lpNow * 0.03) {
          this.lpNow = lp;
          this.lp.low(lp, 0.75, sr);
        }
        if (P.turbo) {
          const f = P.turbo.whistle[0] + (P.turbo.whistle[1] - P.turbo.whistle[0]) * this.spool;
          this.whInc = (TAU * f) / sr;
        }
        // ширина импульса вспышки: доля интервала между вспышками (на высоких оборотах импульсы сливаются в ровный тон)
        const fireHz = (this.rpm / 120) * nc,
          tau = Math.min(0.006, Math.max(0.00035, P.pulse / fireHz));
        this.eK = 1 - Math.exp(-1 / (tau * sr));
        this.eK2 = 1 - Math.exp(-6 / (tau * sr)); // фронт всплеска вшестеро круче спада: выпускной клапан открылся — давление ударило сразу
        this.inc = (this.rpm * 6) / sr; // градусов коленвала на отсчёт
        // запись вместо синтеза — от 0,55 до 0,8 нижних оборотов записи плавно; на сбросе газа запись глуше и тише
        // есть запись — звучит только она (синтез вспышек давал отдельные хлопки вместо звука мотора); тембр — по состоянию:
        // под газом открытый, на сбросе газа глухой; «верховые» кулачки (VTEC) — ярче; отсечка — прерывистый звук
        if (this.sweep.data) {
          this.smix = 1;
          // «рык»: запись у самой трубы — почти чистый тон вспышек; перегруз добавляет обертоны (под газом сильнее), mid — середину 1–4 кГц
          this.sDrive = (P.sample?.drive || 0) * (0.35 + 0.65 * this.thr);
          this.sMid = P.sample?.mid || 0;
          const T = P.sample || {},
            on = T.tone ?? 6500,
            off = T.toneOff ?? on * (this.sweepOff.data ? 0.7 : 0.3); // своя запись сброса газа уже глухая — фильтр почти не нужен
          this.sK =
            1 -
            Math.exp(
              (-6.2832 *
                Math.min(
                  sr * 0.45,
                  (off + (on - off) * this.thr) * (1 + (P.cam ? P.cam.bright * this.camK : 0)),
                )) /
                sr,
            );
          // громче под газом и с оборотами: холостые — тихий ровный гул
          // idle — прибавка громкости у холостых (басовитое урчание), сходит на нет к 2,2 × холостых
          const idleUp = 1 + (T.idle || 0) * Math.max(0, 1 - this.rpm / (2.2 * P.idle));
          this.sGain =
            (T.gain ?? 1) *
            (0.22 + 0.78 * this.thr) *
            (0.4 + 0.6 * Math.min(1, this.rpm / P.redline)) *
            1.5 *
            idleUp *
            (this.limiter && this.cut < 3 ? 0.25 : 1);
          // дожигания в выпуске на сбросе газа (свободный выпуск): редкие хлопки, чаще на высоких оборотах
          if (
            P.crackle > 0 &&
            this.thr < 0.08 &&
            this.rpm > P.redline * 0.4 &&
            this.pop <= 0 &&
            this.rand() > 1 - P.crackle * 0.008 * (this.rpm / P.redline)
          )
            this.backfire(0.45 + 0.35 * (this.rand() + 1));
        } else this.smix = 0;
        if (this.limiter) this.cut = (this.cut + 1) % 6; // отсечка: часть вспышек пропускается — характерный треск
      }
      // ---- вспышки
      let x = 0;
      const ph0 = this.phase;
      let ph = ph0 + this.inc;
      const wrap = ph >= 720;
      if (wrap) ph -= 720;
      for (let k = 0; k < nc; k++) {
        const a = fire[k];
        if (wrap ? a >= ph0 || a < ph : a >= ph0 && a < ph) {
          if (this.limiter && this.cut < 3) continue;
          const load = 0.2 + 0.8 * this.thr;
          let amp = load * P.cyl[k] * (1 + P.irregular * this.rand() * (1.6 - this.thr));
          // сброс газа: редкие дожигания в выпуске (только у моторов со свободным выпуском)
          if (
            P.crackle > 0 &&
            this.thr < 0.06 &&
            this.rpm > P.redline * 0.45 &&
            this.rand() > 1 - P.crackle * 0.07
          )
            amp += 0.8 + 0.5 * this.rand(); // редкие: 1–3 в секунду
          x += amp;
        }
      }
      this.phase = ph;
      if (this.pop > 0) {
        x += this.popAmp * this.rand() * 2.2 * (this.pop / (sr * 0.05));
        this.pop--;
      }
      // импульс → сглаженный всплеск давления (два апериодических звена), без постоянной составляющей
      // (импульс в один отсчёт усиливается на 1,35 / eK: пик всплеска ≈ силе вспышки при любой ширине)
      this.e1 += ((x * 1.35) / this.eK - this.e1) * this.eK;
      this.e2 += (this.e1 - this.e2) * this.eK2;
      // edge — «резкость» выпуска: подчёркивает фронты импульсов (верхние гармоники); свободный выпуск и ротор — резкие, серийный глушитель — нет
      const p0 = this.hp.run(this.e2),
        press = p0 + (p0 - this.pPrev) * E.edge * 70;
      this.pPrev = p0;
      // ---- выпуск: резонансы трубы и глушителя + прямая ветка через «глушитель» (ФНЧ), мягкое ограничение
      let ex = this.lp.run(press);
      for (let i = 0; i < E.res.length; i++) ex += this.res[i].run(press) * E.res[i][2] * 0.35; // резонансы — окраска, а не основа: иначе гул на частоте вспышек давит всё остальное
      ex = Math.tanh(ex * E.drive) * E.gain;
      // ---- впуск: шум в такт вспышкам, громче с газом и на «верховых» кулачках
      const nz = this.rand();
      const sync = 1 - I.sync + I.sync * Math.min(1, Math.abs(this.e2) * 1.5);
      const inG = I.gain * (0.12 + 0.88 * this.thr) * (1 + (P.cam ? P.cam.intake * this.camK : 0)) * sync;
      const intake = (this.inBp.run(nz) + 0.5 * this.inBp2.run(nz)) * inG + this.inBp.run(press * 0.5) * inG;
      // ---- механика: шелест привода и клапанов, растёт с оборотами
      const mech = this.mechHp.run(nz) * P.mech * (0.3 + (0.7 * this.rpm) / P.redline);
      let y = ex + intake + mech;
      if (this.smix > 0) {
        let sv = this.sweep.next(this.rpm);
        if (this.sweepOff.data) {
          const a = Math.min(1, this.thr * 2.5);
          sv = sv * a + this.sweepOff.next(this.rpm) * (1 - a);
        } // на сбросе газа — запись торможения мотором
        this.sLp += (sv - this.sLp) * this.sK;
        this.sLp2 += (this.sLp - this.sLp2) * this.sK;
        this.sG += (this.sGain - this.sG) * 0.002; // громкость меняется плавно (без щелчков на отсечке и переключении)
        let sp = this.sLp2;
        if (this.sDrive > 0) {
          const k = 1 + this.sDrive * 6,
            bias = 0.3 * this.sDrive;
          sp = (Math.tanh(sp * k + bias) - Math.tanh(bias)) / Math.pow(k, 0.55);
        }
        if (this.sMid > 0) sp += this.midBp.run(sp) * this.sMid * 3;
        y = (sp * this.sG * 2.2) / (0.5 + 0.5 * this.thr);
        if (this.pop > 0) {
          const e = this.pop / this.popLen;
          y += (this.popBp.run(this.rand()) * 2.4 + this.rand() * 0.25) * this.popAmp * e * e * this.gain;
        }
      }
      // ---- турбина: свист (тон по раскрутке) и шипение потока по наддуву; сброс через клапан
      if (P.turbo) {
        this.wh += this.whInc;
        if (this.wh > TAU) this.wh -= TAU;
        y +=
          (Math.sin(this.wh) * P.turbo.gain * this.spool * this.spool * 0.5 +
            this.turboBp.run(nz) * P.turbo.hiss * this.boost) *
          (this.smix > 0 ? P.sample?.turbo || 0 : 1); // в записи турбина обычно уже слышна; sample.turbo — добавить свист поверх записи
        if (this.bov < this.bovLen) {
          const t = this.bov / this.bovLen,
            env = (1 - t) * (1 - t) * Math.min(1, t * 30);
          if ((this.bov & 63) === 0)
            this.bovBp.band(this.bovRecirc ? 900 - 400 * t : 3200 - 2100 * t, this.bovRecirc ? 1.2 : 1.6, sr);
          y += this.bovBp.run(this.rand()) * env * this.bovAmp * 6;
          this.bov++;
        }
      }
      // на сбросе газа мотор тише не только импульсами: ограничение (drive) сжимает разницу — добираем общей громкостью
      out[s] = Math.max(-1, Math.min(1, y * this.gain * P.level * 0.5 * (0.5 + 0.5 * this.thr)));
    }
  }
}

// ---- AudioWorklet: тот же синтез в звуковом потоке браузера (сообщения: profile, state, bov, pop)
const WK = /** @type {any} */ (globalThis);
if (typeof WK.AudioWorkletProcessor !== "undefined" && typeof WK.registerProcessor === "function") {
  class TougeEngine extends WK.AudioWorkletProcessor {
    constructor() {
      super();
      this.dsp = new EngineDsp(WK.sampleRate);
      this.port.onmessage = (/** @type {any} */ e) => {
        const m = e.data;
        if (m.t === "state") this.dsp.set(m.rpm, m.thr, m.lim, m.boost, m.spool, m.gain);
        else if (m.t === "profile") this.dsp.setProfile(m.p);
        else if (m.t === "sample") this.dsp.setSample(m.data, m.sr, m.table, m.srcCyl, m.cyl, m.off, m.steps);
        else if (m.t === "bov") this.dsp.blowOff(m.k, m.recirc);
        else if (m.t === "pop") this.dsp.backfire(m.k);
      };
    }
    process(/** @type {any} */ _in, /** @type {Float32Array[][]} */ outputs) {
      const ch = outputs[0];
      this.dsp.process(ch[0]);
      for (let c = 1; c < ch.length; c++) ch[c].set(ch[0]);
      return true;
    }
  }
  WK.registerProcessor("touge-engine", TougeEngine);
}
