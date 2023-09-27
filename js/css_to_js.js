//将css转成js，将css中的文件头放到js中，并为@name添加后缀
//使用方法 node css_to_js.js 模板js文件 输入css文件 输出js文件
var XRegExp = require('xregexp');
var fs = require('fs');

var name = process.argv[3];

var content = fs.readFileSync(name, 'utf8');
var sContent = content.split(/\r\n|\r|\n/);
var mozDocContents = XRegExp.matchRecursive(content, '\\{', '\\}', 'g');
var mozDocs = sContent.filter((value, index, array)=>{if(value.trim().startsWith("@-moz-document")){return true;}else{return false;}})
var output = "";
if(mozDocs.length != mozDocContents.length)throw "css转换js错误。@-moz-document数量与节点数量不匹配";
mozDocs.map((mozDoc, index, array)=> {
    let pairs = mozDoc.match(/(url|url-prefix|domain|regexp)\(\".+?\"\)/g);
    let conditions = pairs.map((pair, index2, array2)=>{
        var pairValue = pair.match(/"([^"]+)"/g)[0];
        pairValue = pairValue.substring(1,pairValue.length-1);
        if(pair.startsWith("url-prefix")){
            // location.href startswith
            return `location.href.startsWith("${pairValue}")`
        }else if(pair.startsWith("url")){
            // location.href
            return `location.href == "${pairValue}"`
        }else if(pair.startsWith("domain")){
            // window.location.host
            return `window.location.host == ${pairValue}`
        }else if(pair.startsWith("regexp")){
            // location.href
            return `/${regExp}/i.test(location.href)`
        }
    });
    let conditionStr = "";
    conditions.map((condition, index2, array2)=>{
        conditionStr += condition;
        if(index2 != array2.length-1){
            conditionStr += " || ";
        }
    });

    output += `if(${conditionStr}){
        let styleNode = document.createElement("style");
        styleNode.appendChild(document.createTextNode(\`${mozDocContents[index]}\`));
        styleNode.setAttribute("bilibili-old-style-fragment", "${index}");
        document.documentElement.appendChild(styleNode);
    }
    `;
});

var templateFileName = process.argv[2];
var tContent = fs.readFileSync(templateFileName, 'utf8');
moveHeader(/^@name[ ]+/gm, /^[/][/] @name[ ]+$/gm, "", "（js版）");         //@name
moveHeader(/^@namespace[ ]+/gm, /^[/][/] @namespace[ ]+$/gm, "", "");       //@namespace
moveHeader(/^@version[ ]+/gm, /^[/][/] @version[ ]+$/gm, "", "");           //@version
moveHeader(/^@description[ ]+/gm, /^[/][/] @description[ ]+$/gm, "", "");   //@description
moveHeader(/^@author[ ]+/gm, /^[/][/] @author[ ]+$/gm, "", "");             //@author
moveHeader(/^@license[ ]+/gm, /^[/][/] @license[ ]+$/gm, "", "");           //@license
moveHeader(/^@homepageURL[ ]+/gm, /^[/][/] @homepageURL[ ]+$/gm, "", "");   //@homepageURL
moveHeader(/^@supportURL[ ]+/gm, /^[/][/] @supportURL[ ]+$/gm, "", "");     //@supportURL
tContent = tContent.replace("{{content}}", output);

fs.writeFileSync(process.argv[4], tContent);


function moveHeader(cssRegex, jsRegex, prefix, suffix){
    var matchResult = tContent.match(jsRegex);
    if(matchResult.length == 1){
        var j = sContent.find((str)=> cssRegex.test(str));
        j = j.replace(cssRegex, "");
        tContent = tContent.replace(jsRegex, matchResult[0]+prefix+j+suffix);
    }
}