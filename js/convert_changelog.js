//去掉md的##号
//使用方法 node convert_changelog.js 输入文件 输出文件
var fs = require('fs');
var readline = require('readline');

var name = process.argv[2];
var aName = process.argv[3];

var content = fs.readFileSync(name, 'utf8');
var aContent = content.replace(/## /gm, "");
fs.writeFileSync(aName, aContent);