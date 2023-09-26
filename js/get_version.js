//获取userStyle的@version头并打印
var fs = require('fs');

var name = process.argv[2];
var prefix = process.argv[3];

var content = fs.readFileSync(name, 'utf8');
var result = content.match(/(?<=@version[ ]*)([^ ])+$/gm);
if(result.length == 0)throw("没有找到版本号");
if(result.length > 1)throw("找到多于一个的版本号");
if(prefix != null){
    console.log(prefix + result[0]);
} else {
    console.log(result[0]);
}
