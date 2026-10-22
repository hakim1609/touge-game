# Модели деревьев мира (Г9.7)

Подготовлены `tools/assets/prepareTree.mjs` (упрощение до 4,5–6 тыс. треугольников, текстуры ≤ 512). Лицензия у всех — CC Attribution 4.0 (Sketchfab); автор указывается в титрах игры.

| Файл | Исходник | Автор |
|---|---|---|
| `pine_large.glb`, `pine_big.glb` (не используются с 2026-10-20) | [Pine trees pack (lowpoly, game ready, LODs)](https://sketchfab.com/3d-models/e1e9c07b8e2e445c943fec660beefba2) | lolipop_1707 |
| `maple_large.glb`, `maple_medium.glb` | [Maple trees pack (lowpoly, game ready, LODs)](https://sketchfab.com/3d-models/b5d2833c258f4054a01ee2b4ef85adf0) | lolipop_1707 |
| `rtree.glb` | [Realistic Tree](https://sketchfab.com/3d-models/d989c0f801d847b9a74992ec4ddcfdfc) | danielpetrov |
| `fir.glb`, `noblefir.glb` (не используются с 2026-10-20) | [Coniferous Forest Assets Pack](https://sketchfab.com/3d-models/240ce9cf0ad3474f809a59f9446e63cd) | dariiiii |

С 2026-10-20 хвойные в мире — свои процедурные суги/хиноки (src/beauty.js, En), бамбук — свой (TakeGeo); из моделей используются клёны и rtree (список Sn в src/beauty.js).

## С 2026-10-21: деревья EZ-Tree

`sugi.glb`, `sugi2.glb`, `maple.glb`, `oak.glb` (+ `_lo`) — сгенерированы `tools/trees/ez-gen.mjs` генератором
[EZ-Tree](https://github.com/dgreenheck/ez-tree) (Daniel Greenheck, MIT). Текстуры коры и листвы из пакета:
кора — [TextureCan](https://www.texturecan.com) и [Poly Haven](https://polyhaven.com) (bark_brown_02, CC0).
Старые модели выше в лесу больше не используются (список Sn в src/beauty.js).
