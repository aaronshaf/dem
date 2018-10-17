#!/usr/bin/env node

const fs = require("fs");
const program = require("commander");
const path = require("path");
const chalk = require("chalk");
const tempy = require("tempy");
const download = require("./download");
const rollup = require("rollup");
const minify = require("babel-minify");

program
  .version(require("./package.json").version, "-v, --version")
  .usage("[options] <source>")
  .option("-d, --destination <directory>", "directory to download to")
  .option("-b, --bundle <file>", "bundle and minify into one file")
  .action(async (source, options) => {
    try {
      if (source == null || options == null) {
        program.outputHelp();
        return;
      }

      const localDirectory = options.bundle
        ? tempy.directory()
        : path.resolve(
            process.cwd(),
            typeof options.destination === "string" ? options.destination : ""
          );
      await download(
        localDirectory,
        source,
        options.bundle && localDirectory /* tmpDirectory */
      );

      if (options.bundle) {
        const filename = path.basename(source);
        const inputOptions = {
          input: path.join(localDirectory, filename)
        };
        const outputOptions = {
          format: "esm"
        };
        const _bundle = await rollup.rollup(inputOptions);
        const rollupResult = await _bundle.generate(outputOptions);
        const licenses = new Set();
        const { code } = minify(
          rollupResult.code,
          {},
          {
            sourceType: "module",
            // don't include redundant license or copyright notice
            comments: function(comment) {
              const isLicense =
                comment.toLowerCase().includes("license") ||
                comment.toLowerCase().includes("copyright");
              if (isLicense === false) {
                return false;
              }
              if (licenses.has(comment) === false) {
                licenses.add(comment);
                return true;
              } else {
                return false;
              }
            }
          }
        );
        fs.writeFileSync(path.resolve(process.cwd(), options.bundle), code);
        console.log("→ " + chalk.green(options.bundle));
      }
    } catch (error) {
      console.log(error);
    }
  })
  .parse(process.argv);
