import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

const src = path.resolve("src");

async function collectJsFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(entries.map(async (entry) => {
    const entryPath = path.join(directory, entry.name);
    return entry.isDirectory()
      ? collectJsFiles(entryPath)
      : entryPath.match(/\.(js|jsx)$/) ? [entryPath] : [];
  }));
  return files.flat();
}

const files = await collectJsFiles(src);
const contents = await Promise.all(files.map((file) => readFile(file, "utf8")));

assert.ok(
  contents.every((content) => !content.includes("http://localhost:5000")),
  "frontend API calls must use the same-origin /api proxy, not localhost:5000"
);

const productPage = await readFile("src/pages/Product.jsx", "utf8");
assert.match(productPage, /from "\.\.\/component\/ProductTable\.jsx"/);

console.log("production frontend configuration checks passed");
