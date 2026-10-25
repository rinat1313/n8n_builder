import { defineTool } from "@grok/agent-sdk/tools";
import fs from "node:fs/promises";
import path from "node:path";
import * as z from "zod/v4";
import { projectSlug, repoRoot } from "../lib/repo-root";

async function listFiles(dir: string): Promise<string[]> {
  try {
    const out: string[] = [];
    async function walk(current: string, prefix: string) {
      const entries = await fs.readdir(current, { withFileTypes: true });
      for (const entry of entries) {
        const rel = prefix ? `${prefix}/${entry.name}` : entry.name;
        if (entry.isDirectory()) {
          await walk(path.join(current, entry.name), rel);
        } else {
          out.push(rel);
        }
      }
    }
    await walk(dir, "");
    return out.sort();
  } catch {
    return [];
  }
}

async function readIfExists(file: string): Promise<string | null> {
  try {
    return await fs.readFile(file, "utf8");
  } catch {
    return null;
  }
}

export default defineTool({
  description:
    "Gather existing files and key texts for a project from projects/, description/, and configs/.",
  effect: "read",
  inputSchema: z.object({
    name: z.string().min(1).describe("Project name or slug."),
  }),
  async execute({ name }) {
    const slug = projectSlug(name);
    const bases = {
      projects: path.join(repoRoot, "projects", slug),
      description: path.join(repoRoot, "description", slug),
      configs: path.join(repoRoot, "configs", slug),
    };

    const [projectFiles, descriptionFiles, configFiles, meta, tz, report] =
      await Promise.all([
        listFiles(bases.projects),
        listFiles(bases.description),
        listFiles(bases.configs),
        readIfExists(path.join(bases.projects, "meta.md")),
        readIfExists(path.join(bases.projects, "tz.md")),
        readIfExists(path.join(bases.projects, "report.md")),
      ]);

    const exists =
      projectFiles.length > 0 ||
      descriptionFiles.length > 0 ||
      configFiles.length > 0;

    return {
      slug,
      exists,
      files: {
        projects: projectFiles,
        description: descriptionFiles,
        configs: configFiles,
      },
      meta,
      tz,
      report,
    };
  },
});
