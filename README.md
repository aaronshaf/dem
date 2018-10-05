Download an ECMAScript module and its dependencies.

## Install

```bash
npm install -g @aaronshaf/dem
```

## Install module and its dependencies

```bash
dem https://unpkg.com/lit-html@0.11.4/lit-html.js
```

This downloads:

```bash
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

## Install a module to a directory

```bash
dem https://unpkg.com/lit-html@0.11.4/lit-html.js -o vendor
```
