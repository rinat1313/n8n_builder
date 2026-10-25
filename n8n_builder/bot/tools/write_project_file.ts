import { defineTool } from "@grok/agent-sdk/tools";
import fs from "node:fs/promises";
import path from "node:path";
import * as z from "zod/v4";
import { projectSlug, repoRoot } from "../lib/repo-root";

const areas = ["projects", "description", "configs"] as const;

export default defineTool({
  description:
    "Write a text file inside projects/<slug>/, description/<slug>/, or configs/<slug>/.",
  effect: "write",
  inputSchema: z.object({
    name: z.string().min(1).describe("Project name or slug."),
    area: z.enum(areas).describe("Which root folder to write into."),
    relativePath: z
      .string()
      .min(1)
      .describe("Path relative to the project folder, e.g. tz.md or drafts/flow.json."),
    content: z.string().describe("Full file contents to write."),
  }),
  async execute({ name, area, relativePath, content }) {
    const slug = projectSlug(name);
    const normalized = relativePath.replace(/\\/g, "/").replace(/^\/+/, "");
    if (
      !normalized ||
      normalized.includes("..") ||
      path.isAbsolute(normalized)
    ) {
      return { ok: false as const, error: "invalid_path", relativePath };
    }

    const target = path.join(repoRoot, area, slug, normalized);
    await fs.mkdir(path.dirname(target), { recursive: true });
    await fs.writeFile(target, content, "utf8");
    return { ok: true as const, slug, area, path: target };
  },
});
