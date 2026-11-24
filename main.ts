"use strict";
const fs = require("fs");
const path = require("path");

const FORTUNE = "Your future holds a new leaf, a sunnier spot on the sill, and a keeper who talks to you like you always answer back.";

const chars = Array.from(FORTUNE);
if (chars.length < 1 || chars.length > 120) throw new Error("fortune must be 1-120 characters");
if (FORTUNE.trim().length === 0) throw new Error("fortune must not be whitespace-only");
if (/\n|\r/.test(FORTUNE)) throw new Error("fortune must be a single line");
if (FORTUNE !== FORTUNE.trimEnd()) throw new Error("fortune must not end with whitespace");

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
fs.mkdirSync(outDir, { recursive: true });
const outPath = path.join(outDir, "entry.txt");
fs.writeFileSync(outPath, FORTUNE, "utf8");

// Round-trip validation: read back exactly what was written.
const back = fs.readFileSync(outPath, "utf8");
if (back !== FORTUNE) throw new Error("round-trip mismatch");
console.log("wrote " + outPath + " (" + chars.length + " characters)");
