#!/usr/bin/env node

const path = require("path");
const download = require("./download");
const argv = require("minimist")(process.argv.slice(2));
if (argv["_"] == null || argv["_"][0] == null) {
  throw Error("url missing");
}
const url = argv["_"][0];

const localDirectory = path.resolve(
  process.cwd(),
  typeof argv["o"] === "string" ? argv["o"] : ""
);

download(localDirectory, url);
