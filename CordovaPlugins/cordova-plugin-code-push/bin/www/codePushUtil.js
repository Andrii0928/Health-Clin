
 /******************************************************************************************** 
 	 THIS FILE HAS BEEN COMPILED FROM TYPESCRIPT SOURCES. 
 	 PLEASE DO NOT MODIFY THIS FILE AS YOU WILL LOSE YOUR CHANGES WHEN RECOMPILING. 
 	 ALSO, PLEASE DO NOT SUBMIT PULL REQUESTS WITH CHANGES TO THIS FILE. 
 	 INSTEAD, EDIT THE TYPESCRIPT SOURCES UNDER THE WWW FOLDER. 
 	 FOR MORE INFORMATION, PLEASE SEE CONTRIBUTING.md. 
 *********************************************************************************************/ 


/// <reference path="../typings/codePush.d.ts" />
"use strict";
var CodePushUtil = (function () {
    function CodePushUtil() {
    }
    CodePushUtil.getNodeStyleCallbackFor = function (successCallback, errorCallback) {
        return function (error, result) {
            if (error) {
                errorCallback && errorCallback(error);
            }
            else {
                successCallback && successCallback(result);
            }
        };
    };
    CodePushUtil.getErrorMessage = function (e) {
        return e && e.message || e && e.toString() || "";
    };
    CodePushUtil.logMessage = function (msg) {
        console.log(CodePushUtil.TAG + " " + msg);
    };
    CodePushUtil.logError = function (message, error) {
        var errorMessage = message || "" + " " + CodePushUtil.getErrorMessage(error);
        console.error(CodePushUtil.TAG + " " + errorMessage);
    };
    CodePushUtil.TAG = "[CodePush]";
    CodePushUtil.invokeErrorCallback = function (error, errorCallback) {
        CodePushUtil.logError(null, error);
        errorCallback && errorCallback(error);
    };
    return CodePushUtil;
})();
module.exports = CodePushUtil;
