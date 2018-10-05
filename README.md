Download an ECMAScript module and its dependencies.

## Install

```bash
npm install -g @aaronshaf/dem
```

## Usage

```bash
dem https://unpkg.com/lit-html@0.11.4/lit-html.js
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
dem https://unpkg.com/lit-html@0.11.4/lit-html.js -o vendor
```
