#!/usr/bin/env node

import fs from "fs";
import { checkKey } from "../src/checkKey.js";
import { setupKey } from "../src/setupKey.js";
import { summarizeGemini } from "../src/summarizeGemini.js";

const arg = process.argv[2];

if (arg === "--setup") {
  await setupKey();
  process.exit(0);
}

if (!arg) {
  console.error("Please provide a file path.");
  process.exit(1);
}

let content;
try {
  content = fs.readFileSync(arg, "utf-8");
} catch (error) {
  console.error(error.message || error);
  process.exit(1);
}

const keyInfo = await checkKey();

if (keyInfo.type === "gemini") {
  await summarizeGemini(content, keyInfo.key);
} else if (keyInfo.type === "openai") {
  console.log("\nOpenAI summarization will get implemented very soon.");
} else {
  console.log(
    `\nNo Gemini or OpenAI API key found. Run "npx summarize --setup" to configure one.`
  );
}
