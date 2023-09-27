// ==UserScript==
// @name         B站仿旧版样式（搜索页(beta)、播放页）（js版）
// @namespace    github.com/czxinc/bilibili-old-style
// @version      2.1.1
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
        if(location.href.startsWith("https://www.bilibili.com/video/") || location.href.startsWith("https://search.bilibili.com/")){
        let styleNode = document.createElement("style");
        styleNode.appendChild(document.createTextNode(`
  #biliMainHeader {
    height: 56px !important;
  }
  .bili-header {
    height: 56px !important;
  }
  .bili-header .bili-header__bar {
    padding: 10px 24px;
    height: 56px;
  }
  .bili-header .left-entry .default-entry {
    margin-right: 12px !important;
  }
  .bili-header .left-entry__title .mini-header__logo {
    width: 70px;
    height: 32px;
  }
  .bili-header .left-entry__title .mini-header__logo path {
    fill: #00a1d6;
  }
  .bili-header .right-entry .right-entry__outside .right-entry-icon {
    display: none;
  }
  .bili-header .right-entry .right-entry__outside .right-entry-text {
    color: #212121;
    text-shadow: none;
    line-height: 30px;
    display: block !important;
  }
  .bili-header .right-entry .right-entry-item {
    min-width: 0px;
    margin-right: 0px;
  }
  .bili-header .right-entry .right-entry-item--upload .v-popover-wrap {
    margin-left: 0px;
  }
  .bili-header .right-entry .right-entry--vip .red-point {
    right: -8px;
  }
  .bili-header .right-entry__outside {
    -webkit-font-smoothing: antialiased;
    font: 14px -apple-system, BlinkMacSystemFont, Helvetica Neue, Helvetica, Arial, PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif;
    min-width: 0px;
    margin: 0px 0px 0px 12px !important;
  }
  .bili-header .right-entry__outside.go-login-btn {
    width: 64px;
  }
  .bili-header .red-num--message {
    background-color: #fa5a57;
    text-align: center;
    color: #fff;
    min-width: 16px;
    height: 16px;
    padding: 0 3px;
    border-radius: 8px;
    line-height: 16px;
    font-size: 12px;
    top: -7px;
    right: -10px;
    left: auto;
  }
  .bili-header .red-num--dynamic {
    left: auto;
    right: -10px;
  }
  .bili-header .v-popover-wrap.right-entry__outside.right-entry--message {
    margin: 0px 0px 0px 0px !important;
  }
  .bili-header .v-popover-wrap .header-favorite-container {
    height: 100%;
    min-width: 0px;
  }
  .bili-header .v-popover-wrap .header-favorite-container .header-favorite-container-box {
    margin-top: 0px;
  }
  .bili-header .v-popover-wrap .header-favorite-container .header-favorite-container-box .header-favorite-container__up {
    top: 0px !important;
  }
  .bili-header .v-popover-wrap .header-favorite-container .header-favorite-container-box .header-favorite-container__down {
    display: none;
  }
  .bili-header .header-entry-mini {
    width: 40px;
    height: 40px;
    left: 0px;
    top: 0px;
  }
  .bili-header .header-entry-mini .v-img >img {
    border: 0px;
  }
  .bili-header .header-avatar-wrap {
    width: 50px;
    height: 40px;
    margin-left: 12px;
    padding-right: 0px;
  }
  .bili-header .header-upload-entry {
    cursor: pointer;
    position: relative;
    color: #fff;
    font-size: 14px;
    display: block;
    width: 100px;
    height: 36px;
    line-height: 36px;
    text-align: center;
    background: #fb7299;
    border-radius: 2px;
    margin-left: 14px;
  }
  .bili-header .header-upload-entry .header-upload-entry__text {
    display: block !important;
  }
  .bili-header .header-upload-entry .header-upload-entry__icon {
    display: none;
  }
  .bili-header .center-search-container .center-search__bar.is-focus {
    box-shadow: none;
    border-radius: 0px;
  }
  .bili-header .center-search-container .center-search__bar #nav-searchform {
    display: block;
    padding: 0 48px 0 16px;
    border-radius: 2px !important;
    background: #f4f4f4;
    border: 1px solid #e7e7e7;
    position: inherit;
    height: inherit;
    background: var(--bg3) !important;
  }
  .bili-header .center-search-container .center-search__bar .nav-search-content {
    padding: 0px;
    background: inherit !important;
  }
  .bili-header .center-search-container .center-search__bar .nav-search-content .nav-search-input {
    word-break: break-all;
    overflow: hidden;
    width: 100%;
    height: 34px;
    border: none;
    background-color: transparent;
    box-shadow: none;
    color: #999;
    font-size: 14px;
    line-height: 34px;
    transition: all 0.2s;
  }
  .bili-header .center-search-container .center-search__bar .nav-search-content .nav-search-input:focus {
    background-color: inherit;
    color: #999;
  }
  .bili-header .center-search-container .center-search__bar .is-actived .nav-search-content .nav-search-input:focus {
    color: #222;
  }
  .bili-header .center-search-container .center-search__bar .nav-search-btn {
    position: absolute;
    top: 0px;
    right: 0;
    margin: 0;
    padding: 0;
    width: 48px;
    height: 36px;
    border: none;
    border-radius: 2px;
    background: #e7e7e7;
    line-height: 26px;
    cursor: pointer;
    display: inherit;
    transition: none;
  }
  .bili-header .center-search-container .center-search__bar .nav-search-btn svg {
    position: absolute;
    top: 7px;
    right: 16px;
    margin: 0;
    padding: 0;
    border: none;
    background: none;
    color: #505050;
    font-size: 16px;
    line-height: 20px;
    cursor: pointer;
    transition: all 0.2s;
  }
  .bili-header .search-panel {
    background: #fff;
    border: 1px solid #e6e9ee;
    box-sizing: border-box;
    box-shadow: 0px 2px 4px rgba(0,0,0,0.1);
    border-radius: 2px;
    padding: 16px 0;
    margin-top: 2px;
    font-family: PingFang SC, sans-serif;
    font-style: normal;
    font-weight: normal;
    color: #212121;
    -webkit-font-smoothing: antialiased;
  }
  .bili-header .message-entry-popover {
    min-width: 173px;
  }
  .bili-header .message-entry-popover .message-inner-list {
    padding: 10.058px 0;
    color: #212121;
  }
  .bili-header .message-entry-popover .message-inner-list__item {
    padding: 0px 0px 0px 20.116px;
    line-height: 36.2093px;
    font-size: 14px;
    color: inherit;
  }
  .bili-header .header-dynamic-avatar {
    width: 34.1px !important;
    height: 34.1px !important;
    border: 0px !important;
  }
  .bili-header .header-dynamic-list-item {
    transition: 0.3s !important;
  }
  .bili-header .header-dynamic-list-item:hover {
    background-color: #f4f4f4 !important;
  }
  .bili-header .header-dynamic-list-item .header-dynamic__box--right {
    top: 0px !important;
    width: auto !important;
  }
  .bili-header .header-dynamic-list-item .dynamic-info-content {
    font-size: 13.267px !important;
    font-weight: 500 !important;
    color: #212121 !important;
    margin: 5.68px 0px !important;
    line-height: normal !important;
  }
  .bili-header .header-dynamic-list-item .dynamic-name-line,
  .publish-time {
    font-size: 12px !important;
    color: #505050 !important;
  }
  .wnd_bottom {
    height: 60.64px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0px 18.95px;
  }
  .wnd_bottom .r-l {
    height: 30.313px;
    width: auto;
    margin: 0px;
    border-radius: 0px;
    color: #212121;
    font-size: 13.267px;
    background-color: #f4f4f4;
    line-height: normal;
    transition: box-shadow 0.1s;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: auto;
  }
  .wnd_bottom .r-l:hover {
    background-color: #e7e7e7;
  }
  .right-entry .v-popover-wrap.right-entry-message {
    margin-left: 12px !important;
  }
  .v-popover-content {
    border-radius: 2px;
    box-shadow: 0 3px 6px 0 rgba(0,0,0,0.2);
  }
  .dynamic-panel-popover {
    width: 350.63px;
  }
  .dynamic-panel-popover .header-tabs-panel {
    font-size: 12px;
    color: #999;
    line-height: 15.1px;
    height: 45.5px;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-left: 19px;
    border-bottom: 1px solid #e7e7e7;
    user-select: none;
    justify-content: normal;
  }
  .dynamic-panel-popover .header-tabs-panel__content {
    min-height: 113.717px;
    max-height: 444.445px;
  }
  .dynamic-panel-popover .header-tabs-panel__item {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0px 22.743px 0px 0px;
    padding: 0px;
    border-radius: 30px;
    cursor: pointer;
    transition: 0.3s ease;
    z-index: 1;
    flex: inherit;
    font-size: 12px;
    line-height: 15px;
    border-bottom: none;
  }
  .dynamic-panel-popover .header-tabs-panel__item--active {
    background-color: #00a1d6;
    color: #fff;
    padding: 3.79px 9.5px;
    margin: 0px 13.267px 0px 0px;
    border-bottom: none;
  }
  .dynamic-panel-popover .cover {
    width: 60.641px !important;
    height: 34.109px !important;
    border-radius: 1.895px !important;
  }
  .dynamic-article .tip-box {
    color: #999 !important;
    font-size: 13.267px !important;
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
    height: 94.75px !important;
  }
  .dynamic-video-item {
    line-height: normal !important;
  }
  .v-popover.is-bottom {
    padding-top: 13px !important;
  }
  .v-popover.is-bottom::before {
    content: '';
    width: 10px;
    height: 7px;
    display: block;
    position: absolute;
    top: 11px;
    left: calc(50% - 5px) !important;
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
    background-color: #fff;
    -webkit-box-shadow: -1px -1px 1px rgba(0,0,0,0.05);
    box-shadow: -1px -1px 1px rgba(0,0,0,0.05);
    z-index: 1;
  }
  .watch-later {
    width: 20.844px !important;
    height: 20.844px !important;
  }
  .watch-later .bili-watch-later__icon {
    width: 15px !important;
    height: 15px !important;
  }
  .bili-avatar-right-icon {
    width: 15.1px;
    height: 15.1px;
  }
`));
        styleNode.setAttribute("bilibili-old-style-fragment", "0");
        document.documentElement.appendChild(styleNode);
    }
    if(location.href.startsWith("https://www.bilibili.com/video/")){
        let styleNode = document.createElement("style");
        styleNode.appendChild(document.createTextNode(`
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Helvetica Neue, Helvetica, Arial, PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif;
    font-size: 12px;
    line-height: 1.5;
    color: #222;
    background-color: #fff;
  }
  a {
    color: #222;
    background-color: transparent;
    text-decoration: none;
    outline: none;
    cursor: pointer;
    transition: color 0.3s;
    -webkit-text-decoration-skip: objects;
  }
  .harmony-font {
    -webkit-font-smoothing: antialiased;
    font: 14px -apple-system, BlinkMacSystemFont, Helvetica Neue, Helvetica, Arial, PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif;
    z-index: 1000;
    margin: 0;
    padding: 0;
  }
  .left-container {
    max-width: 1280px;
  }
  .video-info-container {
    height: 96px !important;
    padding-top: 27px !important;
    box-sizing: border-box !important;
  }
  .video-info-container .video-title {
    font-size: 18px !important;
    font-weight: 500 !important;
    line-height: 26px !important;
  }
  .video-info-detail {
    font-size: 12px !important;
    height: 16px !important;
    color: #999 !important;
    display: flex !important;
    align-items: center !important;
    text-overflow: ellipsis !important;
    white-space: nowrap !important;
  }
  .video-info-detail .video-info-detail-list .pubdate-ip {
    font-size: inherit !important;
  }
  .video-info-detail .video-info-detail-list .pubdate-ip .pubdate .pubdate-text {
    font-size: inherit !important;
  }
  .video-info-detail .video-info-detail-list .honor {
    font-size: 12px;
  }
  .video-info-detail .video-info-detail-list .honor.honor-rank .honor-icon {
    width: 12px;
    height: 12px;
  }
  .video-info-detail .video-info-detail-list .honor.honor-rank .honor-arrow {
    width: 5px;
    height: 8px;
  }
  #bilibili-player:has(.bpx-player-container:not([data-screen = "web"]):not([data-screen = "full"]):not([data-screen = "wide"])) {
    max-width: 1280px;
  }
  #bilibili-player {
    height: 100%;
  }
  #playerWrap:has(.bpx-player-container:not([data-screen = "web"]):not([data-screen = "full"]):not([data-screen = "wide"])) {
    max-height: 766px;
  }
  .bpx-player-sending-bar {
    display: flex !important;
    flex: none !important;
    justify-content: space-between !important;
    height: 46px !important;
    padding: 0 12px 0 20px !important;
    font-size: 12px !important;
  }
  .bpx-player-sending-bar .bpx-player-video-info-online b {
    font-weight: bold !important;
  }
  .bpx-player-sending-bar .bpx-player-video-inputbar {
    border-radius: 2px !important;
  }
  .bpx-player-sending-bar .bpx-player-video-inputbar .bpx-player-dm-btn-send {
    border-radius: 0 2px 2px 0 !important;
  }
@media (min-width: 1681px) {
    #bilibili-player-placeholder,
    #bilibili-player {
      height: calc(100% - 10px);
    }
}
  .bui-collapse .bui-collapse-header {
    border-radius: 2px !important;
  }
  .video-toolbar-container .video-toolbar-left .toolbar-left-item-wrap {
    margin-right: 8px !important;
  }
  .video-toolbar-container .video-toolbar-right .toolbar-right-note {
    margin-right: 0px !important;
  }
  .video-toolbar-container .video-toolbar-right .toolbar-right-note .video-note-inner {
/* position: relative; */
    margin-right: 25px !important;
    width: 71px;
    height: 24px;
    align-items: center;
    justify-content: center;
    border-radius: 2px;
    cursor: pointer;
    font-size: 12px !important;
    line-height: 20px;
    border: 1px solid #00a1d6;
    color: #00a1d6;
    background: #fff;
    transition: 0.3s;
  }
  .video-toolbar-container .video-toolbar-right .toolbar-right-note .video-note-inner:hover {
    color: #fff !important;
    background: #00a1d6 !important;
  }
  .video-toolbar-left-item {
    width: 92px !important;
  }
  .video-toolbar-left-item .video-toolbar-item-icon {
    width: 28px !important;
    height: 28px !important;
  }
  .video-toolbar-right-item {
    font-size: 12px !important;
  }
  .video-toolbar-right-item .video-toolbar-item-icon {
    width: 16px;
    height: 20px;
    fill: #00a1d6;
    transition: 0.3s;
  }
  .video-toolbar-right-item .video-toolbar-item-icon.video-complaint-icon {
    display: none;
  }
  .toolbar-right-note .video-toolbar-item-text {
    transition: 0.3s;
  }
  .toolbar-right-note .video-toolbar-item-text:hover .video-toolbar-item-icon {
    fill: #fff !important;
  }
  .toolbar-right-note .video-toolbar-item-text:hover .video-toolbar-item-text {
    color: #fff !important;
  }
  .video-tool-more .video-tool-more-reference .video-tool-more-icon {
    width: 20px !important;
    height: 24px !important;
  }
  .video-tool-more-popover {
    display: block;
    position: absolute;
    width: 80px;
    min-width: 0px;
    left: -65px;
    z-index: 30;
    text-align: center;
    padding: 10px 0;
    background: #fff;
    border: 1px solid #e5e9ef;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.14);
    border-radius: 2px;
    font-size: 14px;
    color: #222;
  }
  .video-tool-more-popover .video-tool-more-dropdown .dropdown-item {
    position: relative;
    height: 34px;
    line-height: 34px;
    cursor: pointer;
    transition: all 0.3s;
    justify-content: center;
    padding: 0px;
  }
  .video-tool-more-popover .video-tool-more-dropdown .dropdown-item .video-toolbar-item-text {
    font-size: 14px !important;
  }
  .video-tool-more-popover .video-tool-more-dropdown .dropdown-item svg {
    display: none;
  }
  .video-share-popover {
    border-radius: 2px;
    -webkit-box-shadow: 0 2px 4px 0 rgba(0,0,0,0.14);
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.14);
    border: 1px solid #e5e9ef;
  }
  .video-share-popover .video-share-dropdown .dropdown-top {
    padding: 20px 10px 12px 10px;
  }
  .video-share-popover .video-share-dropdown .dropdown-bottom {
    padding: 20px 10px;
  }
  .video-desc-container .basic-desc-info {
    font-size: 12px !important;
    line-height: 18px !important;
  }
  .video-tag-container .tag-panel .tag {
    margin: 0px !important;
  }
  .video-tag-container .tag-panel .tag .show-more-btn {
    display: none;
  }
  .video-tag-container .tag-panel .tag.not-btn-tag {
    display: block !important;
  }
  .video-tag-container .tag-panel .tag-link {
    float: left;
    margin: 0 10px 8px 0;
    background: #f6f7f8;
    border-radius: 100px;
    padding: 0 12px;
    position: relative;
    height: 22px;
    line-height: 22px;
    transition: all 0.3s;
    font-size: 12px;
    border: 1px solid transparent;
    box-sizing: content-box;
  }
  .video-tag-container .tag-panel .tag-link:hover {
    border-color: #00a1d6;
  }
  .video-tag-container .tag-panel .tag-link .tag-icon {
    width: 14px !important;
    height: 14px !important;
  }
  .newchannel-tag .tag-link.newchannel-link .newchannel-tag-icon {
    fill: #9499a0;
    margin-right: 5px !important;
  }
  .newchannel-tag .tag-link.newchannel-link .newchannel-tag-icon path {
    fill: inherit;
  }
  .reply-header .reply-notice {
    box-sizing: content-box;
    background-color: #fff1d3 !important;
    border: 1px solid #f8dfaa !important;
    color: #e78b1f !important;
    border-radius: 4px;
    padding: 0px 15px 0px 10px !important;
  }
  .reply-header .reply-notice::after {
    background-color: inherit !important;
    opacity: 0 !important;
  }
  .reply-header .reply-notice .svg-icon.notice {
    width: 21px !important;
    height: 21px !important;
  }
  .reply-header .reply-notice .svg-icon.notice svg path {
    fill: #e78b1f;
  }
  .reply-header .reply-notice .notice-content {
    line-height: 20px;
    font-size: 14px;
    font-family: "Microsoft YaHei", Arial, Helvetica, sans-serif;
    padding-left: 13px !important;
  }
  .bili-comment.browser-pc * {
    font-family: "Microsoft YaHei", Arial, Helvetica, sans-serif;
  }
  .bili-comment.browser-pc * a {
    outline: none;
    color: #00a1d6;
    text-decoration: none;
    cursor: pointer;
  }
  .bili-comment.browser-pc * a:hover {
    color: #f25d8e;
  }
  .reply-header .reply-navigation .nav-bar .nav-title {
    font-size: 18px !important;
    line-height: 24px !important;
    font-weight: normal !important;
  }
  .reply-header .reply-navigation .nav-bar .nav-title .nav-title-text {
    font-family: -apple-system, BlinkMacSystemFont, Helvetica Neue, Helvetica, Arial, PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif !important;
  }
  .reply-header .reply-navigation .nav-bar .nav-title .total-reply {
    color: inherit !important;
    font-size: 18px !important;
    font-family: -apple-system, BlinkMacSystemFont, Helvetica Neue, Helvetica, Arial, PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif !important;
  }
  .reply-header .reply-navigation .nav-bar .nav-sort {
    font-size: 14px !important;
    color: #222 !important;
  }
  .reply-header .reply-navigation .nav-bar .nav-sort .hot-sort,
  .reply-header .reply-navigation .nav-bar .nav-sort .time-sort {
    font-weight: bold !important;
  }
  .reply-header .reply-navigation .nav-bar .nav-sort.hot .hot-sort,
  .reply-header .reply-navigation .nav-bar .nav-sort.time .time-sort {
    color: #00a1d6 !important;
  }
  .emoji-panel {
    margin-top: 7px;
    margin-bottom: 10px;
    box-shadow: 0 11px 12px 0 rgba(106,115,133,0.3);
    top: 27px;
  }
  .emoji-panel .emoji-content {
    height: 196px !important;
  }
  .reply-list .login-prompt {
    border-radius: 4px !important;
  }
  .reply-box .box-normal .reply-box-send {
    background-color: #00a1d6;
    border: 1px solid #00a1d6;
    transition: 0.1s;
  }
  .reply-box .box-normal .reply-box-send:hover {
    background-color: #00b5e5;
    border-color: #00b5e5;
  }
  .reply-box .box-normal .reply-box-send:after {
    content: none !important;
  }
  .reply-box .box-normal .reply-box-warp .reply-box-textarea {
    font-size: 12px;
    line-height: normal !important;
  }
  .reply-box .box-normal .reply-box-warp .reply-box-textarea:hover {
    border-color: #00a1d6 !important;
    background-color: #fff !important;
  }
  .reply-box.disabled .box-normal .reply-box-send {
    background-color: #e5e9ef !important;
    border-color: #e5e9ef !important;
    color: #b8c0cc !important;
  }
  .reply-box.fixed-box .box-normal .reply-box-warp .reply-box-textarea {
    padding-top: 10px;
  }
  .main-reply-box .box-normal {
    height: 65px !important;
  }
  .main-reply-box .box-normal .reply-box-send {
    width: 70px !important;
    height: 64px !important;
  }
  .main-reply-box .box-normal .reply-box-wrap .reply-box-textarea {
    height: 65px !important;
  }
  .reply-item .root-reply-container {
    padding-left: 85px !important;
    padding-top: 24px !important;
  }
  .reply-item .root-reply-container .root-reply-avatar {
    width: 82px !important;
    padding-top: 6px !important;
  }
  .reply-item .root-reply-container .content-warp .user-info {
    font-size: 12px !important;
    font-weight: bold !important;
    line-height: 18px !important;
    word-wrap: break-word !important;
    height: 22px !important;
  }
  .reply-item .root-reply-container .content-warp .user-info .user-name {
    font-family: inherit !important;
    font-weight: inherit !important;
  }
  .reply-item .root-reply-container .content-warp .user-info .user-level {
    margin-left: 11px !important;
  }
  .reply-item .root-reply-container .content-warp .root-reply {
    font-size: 14px !important;
    line-height: 20px !important;
  }
  .reply-item .root-reply-container .content-warp .root-reply .reply-info {
    font-size: 12px !important;
    margin-top: 6px !important;
  }
  .reply-item .root-reply-container .content-warp .root-reply .reply-info .reply-time {
    margin-right: 20px !important;
  }
  .reply-item .root-reply-container .content-warp .root-reply .reply-info .reply-dislike {
    margin-right: 15px !important;
  }
  .reply-item .root-reply-container .content-warp .root-reply .reply-info .reply-btn {
    padding: 0 5px;
    border-radius: 4px;
    margin-right: 15px;
    cursor: pointer;
  }
  .reply-item .root-reply-container .content-warp .root-reply .reply-info .reply-btn:hover {
    color: #00a1d6 !important;
    background: #e5e9ef !important;
  }
  .reply-item .sub-reply-container {
    padding-left: 78px !important;
  }
  .reply-item.login-limit-reply-end .login-limit-mask {
    display: none !important;
  }
  .sub-reply-item {
    font-size: 14px !important;
    line-height: 20px !important;
  }
  .sub-reply-item .sub-user-info .sub-user-name {
    font-size: 12px !important;
    font-weight: bold !important;
    line-height: 18px !important;
    word-wrap: break-word !important;
    font-family: "Microsoft YaHei", Arial, Helvetica, sans-serif !important;
  }
  .sub-reply-item .sub-user-info .sub-user-level {
    margin-left: 11px;
  }
  .sub-reply-item .sub-reply-info {
    line-height: 14px !important;
    margin-top: 6px !important;
    font-size: 12px !important;
  }
  .sub-reply-list .view-more {
    font-size: 12px !important;
    color: #6d757a !important;
    font-weight: bolder !important;
  }
  .sub-reply-list .view-more .view-more-default .view-more-btn {
    color: #00a1d6;
    padding: 2px 3px;
    border-radius: 4px;
  }
  .sub-reply-list .view-more .view-more-default .view-more-btn:hover {
    background: #e5e9ef;
    color: #00a1d6;
  }
  .sub-reply-list .view-more .view-more-pagination span {
    transition: color 0.3s;
    line-height: 26px;
  }
  .reply-content-container .reply-content {
    line-height: inherit;
    font-family: -apple-system, BlinkMacSystemFont, Helvetica Neue, Helvetica, Arial, PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif;
  }
  .reply-content-container .jump-link,
  .reply-content-container .icon {
    line-height: inherit !important;
  }
  .reply-content-container .icon {
    vertical-align: top !important;
  }
  .reply-content-container .icon.search-word {
    position: relative;
    top: 2px;
  }
  .reply-operation .operation-list {
    padding: 10px 0 !important;
  }
  .image-exhibition .preview-image-container .image-item-wrap {
    border-radius: 4px !important;
  }
  .video-container-v1 .right-container {
    max-width: 320px !important;
  }
  .up-info-container {
    box-sizing: border-box !important;
    height: 96px !important;
    padding-top: 15px !important;
    padding-bottom: 12px !important;
    display: flex !important;
    align-items: flex-start !important;
  }
  .up-avatar-wrap {
    max-width: 60px;
    max-height: 50px;
  }
  .up-detail .up-detail-top .up-name {
    position: relative !important;
    font-size: 14px !important;
    color: #fb7299 !important;
    font-weight: 500 !important;
    display: inline-block !important;
    max-width: 180px !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
    white-space: nowrap !important;
    vertical-align: top !important;
    margin-right: 0px !important;
  }
  .up-detail .up-detail-top .send-msg {
    margin-left: 12px !important;
    font-size: 12px !important;
    color: #505050 !important;
    display: inline-block !important;
    vertical-align: middle !important;
  }
  .up-detail .up-detail-top .send-msg i {
    color: #999 !important;
    font-size: 16px;
    margin-right: 4px;
    height: 16px;
    width: 16px;
    vertical-align: text-bottom;
  }
  .up-detail .up-description {
    margin-top: 4px !important;
    font-size: 12px !important;
    line-height: 16px !important;
    height: 16px !important;
    color: #999 !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
    white-space: nowrap !important;
  }
  .slide-ad-exp .slide-gg {
    height: 182.857px !important;
    border-radius: 2px !important;
  }
  .next-button {
    font-size: 12px !important;
    color: #999 !important;
    line-height: 22px !important;
    cursor: pointer !important;
  }
  .recommend-list-v1 .rec-title {
    font-size: 16px !important;
    color: #222 !important;
    display: flex !important;
    justify-content: space-between !important;
    margin-bottom: 6px !important;
  }
  .recommend-list-v1 .split-line {
    background: #e5e9ef !important;
    margin: 6px 0 12px !important;
  }
  .recommend-list-v1 .rec-list {
    margin: 0px !important;
  }
  .recommend-list-v1 .rec-footer {
    border-radius: 2px !important;
  }
  .video-page-card-small,
  .video-page-special-card-small,
  .video-page-operator-card-small {
    padding: 6px 0 !important;
    margin-bottom: 0px !important;
  }
  .video-page-card-small:first-child,
  .video-page-special-card-small:first-child,
  .video-page-operator-card-small:first-child {
    padding-top: 0px !important;
  }
  .video-page-card-small .card-box .info,
  .video-page-special-card-small .card-box .info,
  .video-page-operator-card-small .card-box .info {
    font-size: 12px !important;
  }
  .video-page-card-small .card-box .info .upname,
  .video-page-special-card-small .card-box .info .upname,
  .video-page-operator-card-small .card-box .info .upname {
    height: 16px;
  }
  .video-page-card-small .card-box .info .upname a svg,
  .video-page-special-card-small .card-box .info .upname a svg,
  .video-page-operator-card-small .card-box .info .upname a svg {
    display: none;
  }
  .video-page-card-small .card-box .pic-box .pic,
  .video-page-special-card-small .card-box .pic-box .pic,
  .video-page-operator-card-small .card-box .pic-box .pic {
    position: relative !important;
    border-radius: 2px !important;
    border-top-left-radius: 2px !important;
    border-top-right-radius: 2px !important;
    border-bottom-right-radius: 2px !important;
    border-bottom-left-radius: 2px !important;
  }
  .video-page-card-small .card-box .playinfo .play,
  .video-page-special-card-small .card-box .playinfo .play,
  .video-page-operator-card-small .card-box .playinfo .play,
  .video-page-card-small .card-box .playinfo .dm,
  .video-page-special-card-small .card-box .playinfo .dm,
  .video-page-operator-card-small .card-box .playinfo .dm {
/* display: none; */
    height: 14px !important;
    width: 14px !important;
    position: relative;
    top: -1px;
  }
  .is-in-large-ab .video-page-card-small .card-box .info .upname,
  .is-in-large-ab .video-page-special-card-small .card-box .info .upname,
  .is-in-large-ab .video-page-operator-card-small .card-box .info .upname {
    margin: 0px 0px 4px 0px;
  }
  .is-in-large-ab .video-page-card-small .card-box .info .title,
  .is-in-large-ab .video-page-special-card-small .card-box .info .title,
  .is-in-large-ab .video-page-operator-card-small .card-box .info .title {
    display: block !important;
    font-size: 14px !important;
    font-weight: 500 !important;
    height: 36px !important;
    line-height: 18px !important;
    margin-bottom: 6px !important;
    word-break: break-word !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
    display: box !important;
  }
  .is-in-large-ab .video-page-card-small .card-box .info .desc,
  .is-in-large-ab .video-page-special-card-small .card-box .info .desc,
  .is-in-large-ab .video-page-operator-card-small .card-box .info .desc {
    font-size: 12px !important;
  }
  .is-in-large-ab .video-page-card-small .card-box .pic-box,
  .is-in-large-ab .video-page-special-card-small .card-box .pic-box,
  .is-in-large-ab .video-page-operator-card-small .card-box .pic-box {
    width: 141px !important;
    height: 80px !important;
    border-radius: 2px !important;
  }
  .is-in-large-ab .video-page-card-small .card-box .pic-box .framepreview-box .video-awesome-img,
  .is-in-large-ab .video-page-special-card-small .card-box .pic-box .framepreview-box .video-awesome-img,
  .is-in-large-ab .video-page-operator-card-small .card-box .pic-box .framepreview-box .video-awesome-img {
    width: 141px;
    height: 80px;
  }
  .is-in-large-ab .video-page-card-small .card-box .pic-box .pic .duration,
  .is-in-large-ab .video-page-special-card-small .card-box .pic-box .pic .duration,
  .is-in-large-ab .video-page-operator-card-small .card-box .pic-box .pic .duration {
    font-size: 12px;
    line-height: inherit;
    height: 14px;
  }
  .is-in-large-ab .video-page-card-small .card-box .pic-box .cover,
  .is-in-large-ab .video-page-special-card-small .card-box .pic-box .cover,
  .is-in-large-ab .video-page-operator-card-small .card-box .pic-box .cover {
    width: 80px !important;
    height: 80px !important;
    background: none !important;
  }
  .video-sections-v1 {
    border-radius: 2px !important;
  }
  .video-sections-v1 .video-sections-item {
    width: 295px !important;
  }
  .base-video-sections-v1 {
    border-radius: 2px !important;
/*.video-sections-head_first-line
			.first-line-left
				.first-line-title
					height: 42px;
					line-height: 42px;
					font-size: 16px;
					color: rgb(33, 33, 33);
					font-weight: 400; */
  }
  .multi-page-v1 {
    border-radius: 2px !important;
  }
  .multi-page-v1.small-mode .cur-list .list-box li {
    width: 308px !important;
  }
  .video-card-ad-small .vcd .cover .b-img[data-v-eba1a9e8],
  .video-card-ad-small .vcd .cover img[data-v-eba1a9e8] {
    border-radius: 2px !important;
  }
  .is-in-large-ab .video-card-ad-small .vcd .cover {
    width: 141px !important;
    height: 80px !important;
    border-radius: 2px !important;
  }
  .is-in-large-ab .video-card-ad-small .vcd .info {
    line-height: 12px !important;
    font-size: 12px !important;
    word-break: keep-all !important;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .is-in-large-ab .video-card-ad-small .vcd .title {
    font-size: 14px !important;
    font-weight: 500;
    line-height: 18px !important;
    word-break: break-word;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
  }
  .video-container-v1 .right-container #right-bottom-banner {
    height: 160px !important;
    border-radius: 2px !important;
  }
  .pop-live-small-mode .pl__title {
    font-size: 14px !important;
  }
  .pop-live-small-mode .pl__name__text {
    font-size: 12px !important;
  }
  .pop-live-small-mode .pl__user {
    font-size: 12px !important;
  }
  .pop-live-small-mode .pl__cover,
  .pop-live-small-mode .pl__mask {
    height: 180px !important;
    border-radius: 2px !important;
  }
`));
        styleNode.setAttribute("bilibili-old-style-fragment", "1");
        document.documentElement.appendChild(styleNode);
    }
    if(location.href.startsWith("https://search.bilibili.com/")){
        let styleNode = document.createElement("style");
        styleNode.appendChild(document.createTextNode(`
  .i_wrapper.video.search-all-list,
  .i_wrapper.search-page.search-page-video {
    padding-left: 0px !important;
    padding-right: 0px !important;
    width: 980px !important;
  }
  .search-page.search-page-all>.i_wrapper.mt_xxl {
    padding-left: 0px !important;
    padding-right: 0px !important;
    width: 980px !important;
  }
  .search-page-wrapper>.i_wrapper.mt_xxl {
    padding-left: 0px !important;
    padding-right: 0px !important;
    width: 980px !important;
  }
  .video-list.row>div {
    flex: 0 0 20% !important;
    max-width: none !important;
  }
  .bili-video-card {
    height: 208px;
    width: 168px;
    border: 1px solid #e5e9ef;
    border-radius: 4px;
    box-sizing: content-box;
  }
  .bili-video-card .bili-video-card__image {
    height: 100px;
    border-radius: 4px !important;
  }
  .bili-video-card .bili-video-card__image:hover .bili-video-card__mask {
    opacity: inherit !important;
    visibility: visible !important;
  }
  .bili-video-card .bili-video-card__image:hover .bili-video-card__stats:before {
    opacity: 0;
  }
  .bili-video-card .bili-video-card__wrap {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .bili-video-card .bili-video-card__image--wrap {
    padding-top: 0px !important;
  }
  .bili-video-card .bili-video-card__image--wrap .bili-watch-later,
  .bili-video-card .bili-video-card__image--wrap picture {
    border-radius: inherit !important;
    object-fit: fill !important;
  }
  .bili-video-card .bili-video-card__stats {
    border-bottom-left-radius: 4px !important;
    border-bottom-right-radius: 4px !important;
    padding: 0px !important;
    background-image: none !important;
    height: auto !important;
  }
  .bili-video-card .bili-video-card__stats--left {
    position: relative;
    top: 75px !important;
    left: 9px !important;
    color: #99a2aa !important;
    font-size: 12px !important;
    line-height: 16px !important;
  }
  .bili-video-card .bili-video-card__stats--left svg {
    color: #99a2aa !important;
    width: 16px !important;
    height: 16px !important;
  }
  .bili-video-card .bili-video-card__stats__duration {
    position: absolute;
    right: 0;
    bottom: 0;
    line-height: 18px;
    padding: 0 5px;
    color: #fff;
    background-color: #333;
    background-color: rgba(0,0,0,0.5);
    border-top-left-radius: 4px;
  }
  .bili-video-card .bili-video-card__info {
    padding: 8px 10px 0 !important;
    margin-top: 0px !important;
    flex: 1;
  }
  .bili-video-card .bili-video-card__info--tit {
    font-size: 12px !important;
    line-height: 20px !important;
    color: #222 !important;
    font-family: -apple-system, BlinkMacSystemFont, Helvetica Neue, Helvetica, Arial, PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif !important;
    padding-right: 0px !important;
    height: 40px !important;
  }
  .bili-video-card .bili-video-card__info--right {
    height: 100% !important;
    display: flex !important;
    flex-direction: column !important;
    justify-content: space-between !important;
  }
  .bili-video-card .bili-video-card__info--bottom {
    margin-bottom: 8px !important;
    font-size: 12px !important;
    line-height: 16px !important;
    color: #99a2aa !important;
  }
  .bili-video-card .bili-video-card__info--bottom svg {
    width: 15px !important;
    height: 15px !important;
  }
  .bili-video-card .bili-video-card__info--bottom svg use {
    stroke-width: 2px;
  }
`));
        styleNode.setAttribute("bilibili-old-style-fragment", "2");
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