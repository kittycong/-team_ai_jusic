import fs from "node:fs/promises";
import path from "node:path";
import { gzipSync } from "node:zlib";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const sourcePath = path.join(rootDir, "app.js");
const targetDir = path.join(rootDir, "app-compressed");
const manifestPath = path.join(targetDir, "manifest.json");
const chunkSize = 4000;

const source = await fs.readFile(sourcePath, "utf-8");
const compressed = gzipSync(Buffer.from(source, "utf-8")).toString("base64");
const chunks = [];

for (let index = 0; index < compressed.length; index += chunkSize) {
  const chunk = compressed.slice(index, index + chunkSize);
  const fileName = `part-${String(chunks.length + 1).padStart(2, "0")}.txt`;
  chunks.push({ fileName, content: chunk });
}

await fs.rm(targetDir, { recursive: true, force: true });
await fs.mkdir(targetDir, { recursive: true });

for (const chunk of chunks) {
  await fs.writeFile(path.join(targetDir, chunk.fileName), chunk.content, "utf-8");
}

const manifest = {
  version: 1,
  generatedAt: new Date().toISOString(),
  sourceFile: "app.js",
  encoding: "gzip+base64",
  partCount: chunks.length,
  parts: chunks.map((chunk) => chunk.fileName)
};

await fs.writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf-8");
console.log(`Compressed app bundle into ${chunks.length} parts -> ${targetDir}`);
