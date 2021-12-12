
 /******************************************************************************************** 
 	 THIS FILE HAS BEEN COMPILED FROM TYPESCRIPT SOURCES. 
 	 PLEASE DO NOT MODIFY THIS FILE AS YOU WILL LOSE YOUR CHANGES WHEN RECOMPILING. 
 	 ALSO, PLEASE DO NOT SUBMIT PULL REQUESTS WITH CHANGES TO THIS FILE. 
 	 INSTEAD, EDIT THE TYPESCRIPT SOURCES UNDER THE WWW FOLDER. 
 	 FOR MORE INFORMATION, PLEASE SEE CONTRIBUTING.md. 
 *********************************************************************************************/ 


/// <reference path="../typings/codePush.d.ts" />
/// <reference path="../typings/cordova.d.ts" />
"use strict";
var DefaultServerUrl = "https://codepush.azurewebsites.net/";
var NativeAppInfo = (function () {
    function NativeAppInfo() {
    }
    NativeAppInfo.getApplicationBuildTime = function (callback) {
        var timestampSuccess = function (timestamp) { callback(null, timestamp); };
        var timestampError = function () { callback(new Error("Could not get application timestamp."), null); };
        cordova.exec(timestampSuccess, timestampError, "CodePush", "getNativeBuildTime", []);
    };
    NativeAppInfo.getApplicationVersion = function (callback) {
        var versionSuccess = function (version) { callback(null, version); };
        var versionError = function () { callback(new Error("Could not get application version."), null); };
        cordova.exec(versionSuccess, versionError, "CodePush", "getAppVersion", []);
    };
    NativeAppInfo.getServerURL = function (serverCallback) {
        var serverSuccess = function (serverURL) { serverCallback(null, serverURL); };
        var serverError = function () { serverCallback(null, DefaultServerUrl); };
        cordova.exec(serverSuccess, serverError, "CodePush", "getServerURL", []);
    };
    NativeAppInfo.getDeploymentKey = function (deploymentKeyCallback) {
        var deploymentSuccess = function (deploymentKey) { deploymentKeyCallback(null, deploymentKey); };
        var deploymentError = function () { deploymentKeyCallback(new Error("Deployment key not found."), null); };
        cordova.exec(deploymentSuccess, deploymentError, "CodePush", "getDeploymentKey", []);
    };
    NativeAppInfo.isFailedUpdate = function (packageHash, checkCallback) {
        var win = function (failed) {
            checkCallback && checkCallback(!!failed);
        };
        var fail = function (e) {
            win(0);
        };
        cordova.exec(win, fail, "CodePush", "isFailedUpdate", [packageHash]);
    };
    NativeAppInfo.isFirstRun = function (packageHash, firstRunCallback) {
        var win = function (firstRun) {
            firstRunCallback(!!firstRun);
        };
        var fail = function () {
            firstRunCallback(false);
        };
        cordova.exec(win, fail, "CodePush", "isFirstRun", [packageHash]);
    };
    return NativeAppInfo;
})();
module.exports = NativeAppInfo;
