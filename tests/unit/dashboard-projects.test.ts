import assert from "node:assert/strict";
import test from "node:test";
import { loadDashboardProjects } from "../../lib/projects/dashboard.ts";

test("loads shared projects only after owned projects finish", async () => {
  const calls: string[] = [];

  const result = await loadDashboardProjects(
    async () => {
      calls.push("owned:start");
      await Promise.resolve();
      calls.push("owned:finish");
      return [];
    },
    async () => {
      calls.push("shared:start");
      return [];
    },
  );

  assert.deepEqual(calls, ["owned:start", "owned:finish", "shared:start"]);
  assert.deepEqual(result, { ownedProjects: [], sharedProjects: [] });
});
