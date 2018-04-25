const ru = require('./common/localization/ru.js');
const en = require('./common/localization/en.js');
const path = require('path');
const fs = require('fs')

const allFiles = path.join(__dirname, './_Src');
const localizationsRu = ru();
const localizationsEn = en();
let counter = 0;

const search = startPath => {
  fs.readdirSync(startPath).forEach(endPath => {
    const filePath = path.join(startPath, endPath);
    const stats = fs.statSync(filePath);

    if (
      filePath.includes('node_modules') || 
      filePath.includes('build') || 
      filePath.includes('combine')
    ) {
      return;
    }

    if (stats.isDirectory()) {
      return search(filePath);
    }

    console.log(++counter);
    const content = fs.readFileSync(filePath);

    Object.keys(localizationsRu).map(key => {
      if (content.indexOf(key) >= 0) {
        delete localizationsRu[key];
        delete localizationsEn[key];

        fs.writeFileSync('localRu', JSON.stringify(localizationsRu, null, 2));
        fs.writeFileSync('localEn', JSON.stringify(localizationsEn, null, 2));
      }
    });
  });
};

search(allFiles);
