/* eslint-disable */
const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const rootPath = path.resolve('build');
const envPath = path.join('', '.env');
const jsPath = path.join(rootPath, 'static/js');
const swPath = path.join(rootPath, 'service-worker.js');
const htmlPath = path.join(rootPath, 'index.html');
var minify = require('html-minifier').minify;

fixEnv(htmlPath, envPath);

function fixEnv(filePath, envFilePath) {
  fs.stat(envFilePath, (eror, stats) => {
    if (eror) {
      console.warn('error read file', envFilePath);
    } else {
      const isFile = stats.isFile(); // 是文件
      if (isFile) {
        const data = fs.readFileSync(envFilePath, 'utf8');
        const envs = data.split('\n');
        const envObject = _.reduce(
          envs,
          (re, env) => {
            const s = env.split('=');
            const val = _.trim(s[1]);
            if (_.includes(val, "'")) {
              throw Error(`value error : ${env}`);
            }
            if (s[0] === '') return re;
            return {
              ...re,
              [_.trim(s[0])]: _.trim(s.slice(1).join('=')),
            };
          },
          {}
        );
        console.log('env :', JSON.stringify(envObject, null, '  '));
        const html = fs.readFileSync(filePath, 'utf8');
        const htmlStrs = html.split('\n');
        const result = htmlStrs.map((str) => {
          if (str.includes(':') && /^\s*\S+\s*:(\s)*('.*')/.test(str)) {
            const strS = str.split(':');
            const key = _.trim(strS[0]);
            if (key.includes('//')) return '';
            if (key in envObject) {
              console.log('set', key, '=', envObject[key]);
              return str.replace(/^(.*').*(')/, `$1${envObject[key]}$2`);
            }
            throw Error(`key not find: ${key}`);
          }
          return str;
        });
        // fix base
        let newHtml = result.join('\n');
        if ('PUBLIC_URL' in envObject) {
          fixPublicUrl(envObject.PUBLIC_URL || '');
          newHtml = newHtml.replace(/vvvvv/g, envObject.PUBLIC_URL || '');
          console.log('set', 'base', '=', envObject.PUBLIC_URL || '');
        }
        newHtml = minify(newHtml, {
          collapseWhitespace: true,
          minifyCSS: true,
          minifyJS: true,
          removeAttributeQuotes: true,
          removeComments: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
        })
        fs.writeFileSync(filePath, newHtml, 'utf8');
      }
    }
  });
}

function fixPublicUrl(publicUrl) {
  let base = publicUrl;
  if (base.slice('-1') === '/') {
    base = base.slice(0, -1);
  }
  fs.readdir(jsPath, (readDirError, files) => {
    if (readDirError) {
      console.log(readDirError);
    } else {
      files.forEach((filename) => {
        if (filename.includes('runtime') || filename.includes('main')) {
          const runtimePath = path.join(jsPath, filename);
          const str = fs.readFileSync(runtimePath, 'utf8');
          let newStr = str.replace(/vvvvv\/service-worker.js/g, '/service-worker.js');
          newStr = newStr.replace(/vvvvv/g, base);
          fs.writeFileSync(runtimePath, newStr, 'utf8');
        }
      });
    }
  });

  
  fs.stat(swPath, (error, stats) => {
    if (error) return;
    const isFile = stats.isFile(); // 是文件
    if (isFile) {
      const str = fs.readFileSync(swPath, 'utf8');
      let newStr = str.replace(/vvvvv/g, base);
      fs.writeFileSync(swPath, newStr, 'utf8');
    }
  });
}
