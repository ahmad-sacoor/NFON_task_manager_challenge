# Solution Notes

This document outlines the bugs I found and fixed, the features I implemented, and my findings on the edit feature limitation.

## Bugs Fixed

1. **Wrong import style** — `import { App }` changed to `import App` in `index.tsx`. App.tsx uses a default export so curly braces are not needed.

2. **Wrong API port** — `BASE_URL` in `api.ts` was pointing to port 8081. Changed to 8080 to match the backend.

3. **Field name mismatch** — `types.ts` defined the field as `completed` but the backend returns `is_completed`. Updated `types.ts` and all references in `TaskItem.tsx` to use `is_completed`.

4. **useEffect not re-running** — `TaskList.tsx` had an empty dependency array so it only fetched tasks once on mount. Added `refreshTrigger` to the dependency array so the list re-fetches after any action.

## Features Implemented

**Delete**
Implemented `handleDelete` in `TaskItem.tsx` following the same pattern as `handleComplete` — calls `deleteTask(task.id)` then `onTaskUpdated()` to refresh the list.

**Edit (Backend Not Supported)**
No endpoint exists for updating a task title. The only PUT route is `PUT /api/tasks/{id}/complete`. Verified by checking both the API endpoints table and `main.go` directly.

To fully implement this feature the following would be needed: a new `PUT /api/tasks/{id}` endpoint on the backend accepting a JSON body with a title field, and on the frontend an inline edit mode in `TaskItem.tsx` using local `isEditing` state with a new `updateTask` call in `api.ts`.
