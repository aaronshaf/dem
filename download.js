const acorn = require("acorn");
const chalk = require("chalk");
const util = require("util");
const fs = require("fs");
const got = require("got");
const mkdirp = require("mkdirp-promise");
const path = require("path");
const resolveUrl = require("url").resolve;

const readFile = util.promisify(fs.readFile);

let alreadyDownloading = new Set();

function download(localDirectory, url) {
  return new Promise(async (resolve, reject) => {
    await mkdirp(localDirectory);
    const filename = path.basename(url);
    const absoluteLocalPath = path.join(localDirectory, filename);
    console.log(
      chalk.green(absoluteLocalPath.substr(process.cwd().length + 1))
    );
    const stream = got
      .stream(url)
      .pipe(fs.createWriteStream(absoluteLocalPath));
    alreadyDownloading.add(url);
    stream.on("close", async () => {
      const content = await readFile(absoluteLocalPath, "utf8");
      const ast = acorn.parse(content, { sourceType: "module" });
      const declarations = ast.body
        .filter(node =>
          [
            "ImportDeclaration",
            "ExportAllDeclaration",
            "ExportDefaultDeclaration"
          ].includes(node.type)
        )
        .map(node => node.source.value)
        .filter(_path => path.isAbsolute(_path) === false)
        .filter(_path => _path.endsWith(".js") || _path.endsWith(".mjs"));
      for (let declaration of declarations) {
        const dir = path.dirname(declaration);
        const newPath = path.join(localDirectory, dir);
        const externalUrl = resolveUrl(url, declaration);
        if (alreadyDownloading.has(externalUrl)) {
          continue;
        }
        await download(newPath, externalUrl);
      }
      resolve();
    });
  });
}

module.exports = download;
