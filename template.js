// ==UserScript==
// @name         
// @namespace    
// @version      
// @description  
// @author       
// @license      
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
        {{content}}
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