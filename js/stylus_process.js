//去掉第四行的@preprocessor
//使用方法 node css_process.js 要处理的css文件
var fs = require('fs');

var name = process.argv[2];

var content = fs.readFileSync(name, 'utf8');
var sContent = content.split(/\r\n|\r|\n/);
setHeader(/^@name[ ]+/gm, "", "（stylus版）");
fs.writeFileSync(name, sContent.join('\n'));

function setHeader(cssRegex, prefix, suffix){
    for(var i = 0;i < sContent.length;i++){
        if(cssRegex.test(sContent[i])){
            var t = sContent[i].replace(cssRegex, "");
            var matchResult = sContent[i].match(cssRegex);
            sContent[i] = matchResult[0]+prefix+t+suffix;
            break;
        }
    }
}
