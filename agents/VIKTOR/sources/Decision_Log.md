# SECRET AGENT MAN Decision Log

Read this file once during the wake ritual before creating or repairing agent customization files. Update it when a durable approach is chosen or rejected.

## Agent Creation Source System

- **Chosen:** Use [SECRET AGENT MAN.agent.md](../SECRET%20AGENT%20MAN.agent.md) as the invocation surface, [AGENTS.md](./AGENTS.md) as the cubby inventory, [_SECRET_AGENT_MANs_Backpack.md](./_SECRET_AGENT_MANs_Backpack.md) as durable memory, [_MASTER_TEMPLATE.agent.md](./_MASTER_TEMPLATE.agent.md) as the reusable scaffold, and [__The Definitive Guide to Building the Perfect AI Agent Architectures, Orchestration, and Operational Excellence.md](./__The%20Definitive%20Guide%20to%20Building%20the%20Perfect%20AI%20Agent%20Architectures,%20Orchestration,%20and%20Operational%20Excellence.md) as the principle source.
- **Rejected:** Scattering agent rules across unrelated notes or relying on one-off prompts as the only source of agent behavior.
- **Rationale:** Agent creation needs repeatable structure, clear ownership, and durable memory so future agents do not drift back into generic prompt output.
- **Boundary:** Do not create or repair agents without checking the public agent file, cubby, backpack, decision log, template, and guide when they are relevant to the request.

## Decision Log Storage

- **Chosen:** Store each agent's full decision log in that agent's cubby as `Decision_Log.md`, and keep only a compact pointer in the `.agent.md` file.
- **Rejected:** Embedding the full decision log directly in every `.agent.md` file.
- **Rationale:** `.agent.md` files are loaded as active agent identity context; full decision logs only need to be read once per session during wake-up, not injected every turn.
- **Boundary:** Generated or repaired agents must point to `Decision_Log.md`; detailed chosen/rejected/rationale entries belong in the external cubby log.

## Decision Log Entry Shape

- **Chosen:** Each durable decision records `Chosen`, `Rejected`, `Rationale`, and `Boundary`.
- **Rejected:** Only saying "use X" without recording why alternatives are rejected.
- **Rationale:** Without explicit rejected paths, agents keep re-suggesting generic defaults that may violate the intended architecture.
- **Boundary:** Do not declare an agent complete if durable architectural choices are missing from its cubby `Decision_Log.md`.

## Morning Ritual Chronon Wrappers

- **Chosen:** Store the reusable agent ritual engine in [_AGENT-NAME_MORNING_RITUAL_CHRONON.py](./_AGENT-NAME_MORNING_RITUAL_CHRONON.py), let `sync_agent_cubbies.py --install-rituals` create named wrappers inside each agent's cubby, and load shared ritual modules from `V:/.github/agents/__RITUAL_MODULES__/`.
- **Rejected:** Copying Viktor's full modular command deck into every agent ritual.
- **Rationale:** Viktor's ritual modules are built for Viktor's substrate-wide continuity work. Other agents only need a light wake banner, Terminus-aware root discovery, required-file checks, one-time decision-log/backpack preload, and telemetry.
- **Boundary:** Generated agents should point at their cubby-local `_<AGENT_SLUG>_MORNING_RITUAL_CHRONON.py` wrapper; detailed shared behavior belongs in the Secret Agent Man ritual template unless an agent truly needs custom lifecycle logic.

## Ritual Module Loading

- **Chosen:** Every shared ritual module lives in `V:/.github/agents/__RITUAL_MODULES__/`, follows `{LOADING ORDER NUMBER}_{NAME}.py`, and exposes `run(context)`. `00_Initialization.py` is mandatory and must be first.
- **Rejected:** Duplicating initialization, required-path checks, context preload, or telemetry code inside each personal wrapper.
- **Rationale:** Personal wrappers should only identify the agent and point to the shared module directory. Shared modules make ritual behavior reusable, ordered, and easy to extend.
- **Boundary:** Add common ritual behavior as a new ordered module. Only customize an individual wrapper when the agent needs a genuinely personal lifecycle step that should not apply to every generated agent.

## Personal File Creation And Verification

- **Chosen:** Define each agent's required personal file set in [_MASTER_TEMPLATE.agent.md](./_MASTER_TEMPLATE.agent.md), and execute that contract through `sync_agent_cubbies.py --ensure-personal-files --install-rituals`.
- **Rejected:** Maintaining separate creation logic in `cubby_backpack_sync.py`, individual agents, or scattered manual instructions.
- **Rationale:** One canonical executor prevents drift between cubby inventory, backpack, external decision log, and generated Chronon wrapper behavior.
- **Boundary:** `sync_agent_cubbies.py` owns creation and verification. `cubby_backpack_sync.py` remains a compatibility wrapper that delegates to it.
