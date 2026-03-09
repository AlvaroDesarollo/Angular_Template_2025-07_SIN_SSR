import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
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

function appendExportIfMissing(filePath, line) {
  const current = readFileSync(filePath, 'utf8');
  if (current.includes(line)) return;
  writeFileSync(filePath, `${current.trimEnd()}\n${line}\n`, 'utf8');
}

function insertRouteIfMissing(routesPath, featureName, className) {
  const current = readFileSync(routesPath, 'utf8');
  if (current.includes(`path: '${featureName}'`)) return;

  const block = [
    '      {',
    `        path: '${featureName}',`,
    '        loadComponent: () =>',
    `          import('@features/${featureName}/${featureName}.page').then(`,
    `            (m) => m.${className}Page,`,
    '          ),',
    '      },',
  ];

  const lines = current.split('\n');
  let insertAt = lines.findIndex((line) => line.includes("path: 'auth'"));
  if (insertAt > 0) {
    insertAt -= 1;
  } else {
    insertAt = lines.findIndex((line) => line.trim() === '],');
  }
  if (insertAt === -1) {
    throw new Error('No se pudo insertar la ruta en features.routes.ts');
  }

  lines.splice(insertAt, 0, ...block);
  writeFileSync(routesPath, `${lines.join('\n')}\n`, 'utf8');
}

const rawName = getArg('--name');
const positionalName = process.argv[2] && !process.argv[2].startsWith('--')
  ? process.argv[2]
  : '';
const featureInput = rawName || positionalName;

if (!featureInput) {
  console.error(
    'Uso: npm run generate:feature -- dashboard (o -- --name dashboard)',
  );
  process.exit(1);
}

const featureName = toKebab(featureInput);
const className = toPascal(featureName);

const root = process.cwd();
const featureDir = join(root, 'src', 'app', 'features', featureName);
const pageTs = join(featureDir, `${featureName}.page.ts`);
const pageHtml = join(featureDir, `${featureName}.page.html`);
const pageScss = join(featureDir, `${featureName}.page.scss`);
const modelPath = join(root, 'src', 'app', 'core', 'models', `${featureName}.model.ts`);
const serviceDir = join(root, 'src', 'app', 'core', 'services', featureName);
const servicePath = join(serviceDir, `${featureName}.service.ts`);

if (existsSync(featureDir) || existsSync(modelPath) || existsSync(servicePath)) {
  console.error(`La feature "${featureName}" ya existe total o parcialmente.`);
  process.exit(1);
}

mkdirSync(featureDir, { recursive: true });
mkdirSync(serviceDir, { recursive: true });

writeFileSync(
  pageTs,
  `import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-${featureName}-page',
  imports: [CommonModule],
  templateUrl: './${featureName}.page.html',
  styleUrl: './${featureName}.page.scss',
})
export class ${className}Page {}
`,
  'utf8',
);

writeFileSync(
  pageHtml,
  `<section class="${featureName}">
  <h1>${className}</h1>
  <p>Feature ${featureName} creada con el generador.</p>
</section>
`,
  'utf8',
);

writeFileSync(
  pageScss,
  `.${featureName} {
  padding: 2rem 1rem;
}
`,
  'utf8',
);

writeFileSync(
  modelPath,
  `export interface ${className}Model {
  id: string;
}
`,
  'utf8',
);

writeFileSync(
  servicePath,
  `import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ${className}Service {}
`,
  'utf8',
);

appendExportIfMissing(
  join(root, 'src', 'app', 'core', 'models', 'index.ts'),
  `export * from './${featureName}.model';`,
);
appendExportIfMissing(
  join(root, 'src', 'app', 'core', 'services', 'index.ts'),
  `export * from './${featureName}/${featureName}.service';`,
);
insertRouteIfMissing(
  join(root, 'src', 'app', 'features', 'features.routes.ts'),
  featureName,
  className,
);

console.log(`Feature "${featureName}" creada correctamente.`);
