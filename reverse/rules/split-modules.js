const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, 'tibiabot-modules.json');
const outDir = path.join(__dirname, 'modules');

const data = JSON.parse(fs.readFileSync(src, 'utf8'));

fs.mkdirSync(outDir, { recursive: true });

for (const [name, code] of Object.entries(data)) {
  const file = path.join(outDir, name + '.js');
  fs.writeFileSync(file, typeof code === 'string' ? code : JSON.stringify(code, null, 2));
  console.log(name, '->', file, `(${(typeof code === 'string' ? code.length : 0)} chars)`);
}
