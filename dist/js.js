// ==UserScript==
// @name         B站仿旧版样式（搜索页(beta)、播放页）（js版）
// @namespace    github.com/czxinc/bilibili-old-style
// @version      3.0.0
// @description  B站仿旧版样式，仅播放页，搜索页还在改造中
// @author       CZX Fuckerman
// @license      GPL
// @homepageURL  https://github.com/czxinc/bilibili-old-style
// @supportURL   https://github.com/czxinc/bilibili-old-style
// @match        https://*.bilibili.com/*
// @icon         https://www.bilibili.com/favicon.ico
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
// @run-at       document-body
// @noframes
// ==/UserScript==

(function() {
    'use strict';
    var cssLoaded = true;
    var menuIds = [];

    function setCss(){
        if(location.href.startsWith("https://www.bilibili.com/video/")){
        let styleNode = document.createElement("style");
        styleNode.appendChild(document.createTextNode(`
`));
        styleNode.setAttribute("bilibili-old-style-fragment", "0");
        document.documentElement.appendChild(styleNode);
    }
    if(location.href.startsWith("https://search.bilibili.com/")){
        let styleNode = document.createElement("style");
        styleNode.appendChild(document.createTextNode(`
`));
        styleNode.setAttribute("bilibili-old-style-fragment", "1");
        document.documentElement.appendChild(styleNode);
    }
    
        cssLoaded = true;
        reloadMenu();
    };
    
    function reloadCss(){
        uploadCss();
        setCss();
    }

    function uploadCss(){
        var oStyles = document.querySelectorAll('[bilibili-old-style-fragment]');
        for(var i = 0;i < oStyles.length;i++){
            oStyles[i].remove();
        }
        cssLoaded = false;
        reloadMenu();
    }

    function removeAllMenu(){
        for(var i = 0;i < menuIds.length;i++){
            GM_unregisterMenuCommand(menuIds[i]);
        }
        menuIds = [];
    }

    function reloadMenu(){
        removeAllMenu();
        if(cssLoaded){
            menuIds.push(GM_registerMenuCommand("关闭", uploadCss));
            menuIds.push(GM_registerMenuCommand("刷新", reloadCss));
        } else {
            menuIds.push(GM_registerMenuCommand("开启", setCss));
        }
    }
 
    setCss();
})();