import { defineTool } from "@grok/agent-sdk/tools";
import fs from "node:fs/promises";
import path from "node:path";
import * as z from "zod/v4";
import { projectSlug, repoRoot } from "../lib/repo-root";

export default defineTool({
  description:
    "Create the isolated project folder triad (projects/description/configs) for a project slug.",
  effect: "idempotent",
  inputSchema: z.object({
    name: z
      .string()
      .min(1)
      .describe("Project name or slug; will be normalized to a folder slug."),
    title: z
      .string()
      .optional()
      .describe("Human-readable project title to store in meta.md."),
  }),
  async execute({ name, title }) {
    const slug = projectSlug(name);
    if (!slug) {
      return { ok: false as const, error: "empty_slug", name };
    }

    const paths = {
      projects: path.join(repoRoot, "projects", slug),
      description: path.join(repoRoot, "description", slug),
      configs: path.join(repoRoot, "configs", slug),
    };

    for (const dir of Object.values(paths)) {
      await fs.mkdir(dir, { recursive: true });
    }

    for (const sub of [
      "answers",
      "questions",
      "solutions",
      "tasks",
      "drafts",
      "tests",
    ]) {
      await fs.mkdir(path.join(paths.projects, sub), { recursive: true });
    }

    const metaPath = path.join(paths.projects, "meta.md");
    try {
      await fs.access(metaPath);
    } catch {
      await fs.writeFile(
        metaPath,
        [
          `# ${title?.trim() || name.trim()}`,
          "",
          `- slug: \`${slug}\``,
          `- created: ${new Date().toISOString()}`,
          "",
        ].join("\n"),
        "utf8",
      );
    }

    return { ok: true as const, slug, paths };
  },
});
