# Модели деревьев мира

С 2026-10-23 все деревья леса сгенерированы `tools/trees/ez-gen.mjs` генератором
[EZ-Tree](https://github.com/dgreenheck/ez-tree) (Daniel Greenheck, MIT): 11 пород — суги (3 вида), хиноки, акамацу,
клён (2 вида), дуб, конара, кэяки, ямадзакура; у каждой полная модель `<id>.glb` и облегчённая `<id>_lo.glb`.
Затенение внутри кроны запечено в цвет вершин (`tools/trees/ez-gen.html`, bakeAO). Список пород в игре — `Sn`
в `src/beauty.js`.

Текстуры коры и листвы общие для всех пород (`tex/`), из пакета EZ-Tree: кора — [TextureCan](https://www.texturecan.com)
и [Poly Haven](https://polyhaven.com) (CC0), листва — из того же пакета (MIT).

Прежние модели Sketchfab (lolipop_1707, danielpetrov, dariiiii; CC BY 4.0) с 2026-10-23 удалены — не использовались
с 2026-10-21.
