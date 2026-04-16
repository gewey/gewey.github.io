# Architectural Fact: AlphaGenes Restoration v2 ((Mitochondria))

## Context
- **Date**: April 5, 2026
- **Project**: Consolidating 11 Alpha-series mods into a single RimWorld 1.6 assembly.
- **Base Project**: [v:\RimWorld\Mods\((V2)) Mitochondria](v:\RimWorld\Mods\((V2)) Mitochondria)

## Discovered Patterns & Hacks
1. **Decompiler Artifacts**: 
   - `ault<T>` is a truncated `default(T)`. Fixed via `Mitochondria.Internal.QuarkDefaulter.ault<T>()`.
   - Truncated prefixes: `Comp` -> `ThingComp`, `Request` -> `ThingRequest`, `PotentialWork` -> `PotentialWorkThingRequest`.
2. **RimWorld 1.6 API Drift**:
   - `DamageWorker.Apply` now returns `DamageWorker.DamageResult` instead of `void`.
   - `ThingSetMaker.GenerateInternal` renamed to `Generate`.
   - `PawnKindDef.GetModExtension` is now the standard for def-linked metadata.
3. **InternalDefOf Alignment**:
   - Combined all mod-specific `DefOf` files into `AlphaGenes.InternalDefOf`.
   - Must handle `[MayRequireAnomaly]` and `[MayRequireBiotech]` for conditional loading.
   - Fixed `CS0102` duplicates caused by overlapping source restoration scripts.

## Restoration Methodology
- **Tier 0**: Regex cleanup of syntax (Python based).
- **Tier 1**: Semantic injection (missing members in `InternalDefOf`).
- **Tier 2**: API alignment (1.6 signature fixes).
- **Tier 3**: Logic verification (Harmony patch validation).

## Unresolved Blockers
- `AlphaGenes_Mod` class name mismatch across unified sources.
- `Gizmo.disabled` access in `Command` subclasses (Protected Member access).
