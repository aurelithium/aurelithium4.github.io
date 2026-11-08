import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const source = path.join(root, "out");
const target = path.join(root, "dist");
const repository = process.env.GITHUB_REPOSITORY?.split("/")[1];
const owner = process.env.GITHUB_REPOSITORY?.split("/")[0];
const isUserSite = repository && owner && repository.toLowerCase() === `${owner}.github.io`.toLowerCase();
const basePath = process.env.GITHUB_ACTIONS === "true" && repository && !isUserSite
  ? `/${repository}`
  : "";

if (!fs.existsSync(source)) {
  throw new Error("Next.js static export folder 'out' was not found.");
}

fs.rmSync(target, { recursive: true, force: true });
fs.cpSync(source, target, { recursive: true });

function patchAssets(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const filePath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      patchAssets(filePath);
      continue;
    }
    if (!/\.(html|js|css|json|xml|txt|webmanifest)$/i.test(entry.name)) continue;
    const original = fs.readFileSync(filePath, "utf8");
    let updated = original;
    if (basePath) {
      updated = updated.replaceAll('"/images/', `"${basePath}/images/`);
      updated = updated.replaceAll("'\/images/", `'${basePath}/images/`);
      updated = updated.replaceAll("url(/images/", `url(${basePath}/images/`);
    }
    fs.writeFileSync(filePath, updated);
  }
}

patchAssets(target);
console.log(`Static site prepared in dist/${basePath ? ` (base path: ${basePath})` : ""}`);
