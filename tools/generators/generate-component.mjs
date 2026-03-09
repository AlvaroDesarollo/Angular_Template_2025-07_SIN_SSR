import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

function getArg(flag) {
  const index = process.argv.indexOf(flag);
  if (index === -1 || index + 1 >= process.argv.length) return '';
  return process.argv[index + 1];
}

function toKebab(value) {
  return value
    .trim()
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();
}

function toPascal(value) {
  return value
    .split('-')
    .filter(Boolean)
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join('');
}

const rawFeature = getArg('--feature');
const rawName = getArg('--name');
const positionalFeature = process.argv[2] && !process.argv[2].startsWith('--')
  ? process.argv[2]
  : '';
const positionalName = process.argv[3] && !process.argv[3].startsWith('--')
  ? process.argv[3]
  : '';
const featureInput = rawFeature || positionalFeature;
const componentInput = rawName || positionalName;

if (!featureInput || !componentInput) {
  console.error(
    'Uso: npm run generate:component -- dashboard kpi-card (o -- --feature dashboard --name kpi-card)',
  );
  process.exit(1);
}

const featureName = toKebab(featureInput);
const componentName = toKebab(componentInput);
const className = toPascal(componentName);

const root = process.cwd();
const componentDir = join(
  root,
  'src',
  'app',
  'features',
  featureName,
  'components',
  componentName,
);

if (existsSync(componentDir)) {
  console.error(`El componente "${componentName}" ya existe en ${featureName}.`);
  process.exit(1);
}

mkdirSync(componentDir, { recursive: true });

writeFileSync(
  join(componentDir, `${componentName}.component.ts`),
  `import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-${componentName}',
  imports: [CommonModule],
  templateUrl: './${componentName}.component.html',
  styleUrl: './${componentName}.component.scss',
})
export class ${className}Component {}
`,
  'utf8',
);

writeFileSync(
  join(componentDir, `${componentName}.component.html`),
  `<div class="${componentName}">
  ${className} component
</div>
`,
  'utf8',
);

writeFileSync(
  join(componentDir, `${componentName}.component.scss`),
  `.${componentName} {}
`,
  'utf8',
);

console.log(
  `Componente "${componentName}" creado en features/${featureName}/components.`,
);
