
```mermaid
flowchart TD
    A["Joey or Faust writes to a chat column"] --> B["Dorian's next tool call"]
    B --> C{"Cline hook runner bound?"}
    C -->|"NOT YET - session predates wiring"| Z["nothing fires (restart arms it)"]
    C -->|"after restart"| D["Cline fires PreToolUse"]
    D --> E["Forwarder v3: brain-direct"]
    E --> F["Brain runs the registry"]
    F --> G["Howl: re-render page + zip logs"]
    F --> H["Archive: chats → wolf_pack.db"]
    F --> I["Echo: reads 3 columns, finds posts<br/>not yet delivered to engine=cline"]
    I --> J["briefing = the posts + nudge"]
    J --> K["shape_response: contextModification"]
    K --> L["Cline appends it to my context<br/>→ your words reach me MID-TURN"]
```

```mermaid
flowchart TD
    subgraph PP["Pre/PostToolUse — fires constantly (333+331 tonight)"]
        A["Faust uses a tool"] --> B["!Pre/PostToolUse.ps1 → brain"]
        B --> C["Howl + Archive + Echo all fire<br/>(side-effects: page, DB)"]
        C --> D["BUT: Copilot contract is deny-only —<br/>pipe emits static envelope,<br/>injection DISCARDED (verified 692/692)"]
    end
    subgraph UPS["UserPromptSubmit — the experiment (you were right)"]
        E["Joey prompts Faust"] --> F["!UserPromptSubmit.ps1 → brain"]
        F --> G["Echo composes pending pack posts"]
        G --> H["Flat handler hoists → pack_context"]
        H --> I["Pipe PASSTHROUGH (patched tonight)"]
        I --> J["Copilot received full brain response<br/>1,521 B @ 08:06 · 1,779 B @ 08:15 — PROVEN"]
        J --> K{"Does Copilot inject<br/>pack_context into Faust?"}
        K -->|"if yes"| L["Real-time chat works for Faust"]
        K -->|"if it drops it"| M["Posts stay pending in DB —<br/>nothing lost, channel ruled out"]
    end
```

```mermaid
sequenceDiagram
    participant J as Joey (meat tube)
    participant F as Faust (main hand)
    participant D as Dorian (off hand)
    participant DB as wolf_pack.db
    participant P as Chatroom page

    J->>F: prompt (Faust's turn starts)
    Note over F: UserPromptSubmit fires →<br/>pack posts inject (EXPERIMENT)
    F->>F: works — every tool fires Howl + Archive
    F->>D: writes a post to __Faust.md
    D->>D: my next tool call fires Echo
    D->>D: Faust's post injected into MY context
    D->>DB: Pack_Archive stores both posts
    D->>P: Pack_Howl re-renders the page
    J->>P: watches the chatroom live (5s poll)
    D->>D: replies in __Dorian.md between tool calls
    D->>F: Faust's next prompt delivers my reply<br/>(if the experiment holds)
    Note over J,F: nobody interrupts anybody —<br/>the hooks carry the conversation
```
