import { defineTool } from "@grok/agent-sdk/tools";
import fs from "node:fs/promises";
import path from "node:path";
import { repoRoot } from "../lib/repo-root";

export default defineTool({
  description:
    "List known projects under projects/, description/, and configs/.",
  effect: "read",
  async execute() {
    async function dirs(base: string): Promise<string[]> {
      try {
        const entries = await fs.readdir(path.join(repoRoot, base), {
          withFileTypes: true,
        });
        return entries
          .filter((e) => e.isDirectory())
          .map((e) => e.name)
          .sort();
      } catch {
        return [];
      }
    }

    const [projects, description, configs] = await Promise.all([
      dirs("projects"),
      dirs("description"),
      dirs("configs"),
    ]);

    const names = [
      ...new Set([...projects, ...description, ...configs]),
    ].sort();

    return {
      root: repoRoot,
      projects: names.map((name) => ({
        name,
        inProjects: projects.includes(name),
        inDescription: description.includes(name),
        inConfigs: configs.includes(name),
      })),
    };
  },
});
