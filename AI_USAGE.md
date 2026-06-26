# AI Usage Log - Claude.ai

## Entry 1 — Import syntax clarification
**What I asked:** Why does `import { App }` fail when `App.tsx` uses `export default App`, and is there ever a valid reason to use `{ }` when importing a React component file?

**What I did with the answer:** Used it as-is to understand the distinction. The explanation of default vs named exports, and how `export default { App }` would export a plain object rather than the component itself, clarified the mental model.

**Notes:** The AI identified this was purely a conceptual question, not a deeper bug. The rule of thumb — one main thing per file → default export, multiple things → named exports. Found that this matched what I saw across the codebase.

## Entry 2 — Tasks not updating in UI without page refresh
**What I asked:**
"Tasks are saving to the backend correctly but only appear in the UI after a page refresh. I think it's a useEffect issue — here's my TaskList code.

**What I did with the answer:**
Confirmed my hypothesis. Added `refreshTrigger` to the useEffect dependency array. Also verified the parent component was correctly incrementing `refreshTrigger` after task actions. Tested — tasks now appear immediately without refresh.

**I also asked:** To clarify — the parent component 'owns' the state, and when a child component triggers it to increment, it then refreshes? And confirmed: is `App.tsx` the parent here?

**What I did with that answer:** Used to deepen understanding. The AI explained the "lifting state up" pattern — siblings can't communicate directly, so the parent acts as the middleman. Props flow down, callbacks flow up. This confirmed why `refreshTrigger` lives in `App.tsx` and why `TaskList` doesn't need to know anything about `AddTaskForm`.

**Notes:** The diagnosis was accurate. The empty dependency array `[]` meant the effect only ran on mount.

## Entry 3 — Completed tasks not showing strikethrough styling
**What I asked:** The complete button HTTP request works — I can see `is_completed: true` in the backend. But the strikethrough isn't appearing. The HTML logic looks correct to me. or am i missing something?.

**What I did with the answer:** Did a project-wide search and confirmed `is_completed` is what the backend returns but the frontend was using `completed`. Updated `types.ts` and all references in `TaskItem.tsx` (2 places). Tested — strikethrough now appears correctly. After applying the fix, I followed up: "Are we solving the root problem or is it deeper?" The AI explained both bugs (missing class and always-visible Complete button) were downstream of the same mismatch in `types.ts`. That confirmed the fix was at the right level.

## Entry 4 — Implementing delete functionality
**What I asked:** The Delete button does nothing. `deleteTask` is defined in `api.ts` but `handleDelete` in `TaskItem` is empty. How should it be implemented? (*pasted the method code*)

**What I did with the answer:** Used as-is. The implementation mirrored `handleComplete` — call `deleteTask(task.id)`, then `onTaskUpdated()`. I also made sure `deleteTask` was imported alongside `completeTask`.

**I also asked:** What does `await` actually do here?

**What I did with that answer:** Used to solidify understanding, not to change code. The explanation — that `await` ensures `onTaskUpdated()` only fires after the backend confirms the delete — made the ordering clear. Without it, the re-fetch could run before the deletion is complete.

## Entry 5 — Edit feature scoping and full implementation plan
**What I asked:** I checked the endpoints table in the readme and theres there's no endpoint for updating a task. I checked the backend as well and confirmed the backend only handles the ability to complete and delete tasks.

So i cant fully implment the feature using front alone.

If we were to implement it correctly, what would both the backend endpoint and the frontend implementation look like?

**What I did with the answer:** I did not fully understand the implementation so i asked to explain with more clarity

**I also asked:** What exactly does `r.Body` refer to in the Go handler?

**What I did with that answer:** Used for understanding only, it helped me see how the raw HTTP request body maps to the Go struct via `json.NewDecoder`.

**Notes:** The AI was clear that the edit feature cannot be fully implemented without a backend endpoint. I accepted that scope boundary and treated the response as a design reference for future work.