Download an ECMAScript module and its dependencies.

## Install

```bash
npm install -g @aaronshaf/dem
```

## Usage

```
Usage: index [options] <source>

Options:
  -v, --version                  output the version number
  -d, --destination <directory>  directory to download to
  -b, --bundle <file>            bundle and minify into one file
  -h, --help                     output usage information
```

## Examples

### Simple download

```bash
dem https://unpkg.com/lit-html@0.12/lit-html.js
```

This downloads:

```
lit-html.js
lib/default-template-processor.js
lib/parts.js
lib/directive.js
lib/dom.js
lib/part.js
lib/template-instance.js
lib/template.js
lib/template-result.js
lib/render.js
lib/template-factory.js
```

### Download to a specific directory

```bash
dem https://unpkg.com/lit-html@0.12/lit-html.js --destination vendor
```

### Bundle and minify to a single file

```bash
dem https://unpkg.com/lit-html@0.12/lit-html.js --bundle lit-html.min.js
```
