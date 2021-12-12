/// <reference path="../typings/codePush.d.ts" />
/// <reference path="../typings/cordova.d.ts" />

"use strict";

declare var cordova: Cordova;

const DefaultServerUrl: string = "https://codepush.azurewebsites.net/";

/**
 * Provides information about the native app.
 */
class NativeAppInfo {
    
    /**
     * Gets the application build timestamp.
     */
    public static getApplicationBuildTime(callback: Callback<String>): void {
        var timestampSuccess = (timestamp?: String) => { callback(null, timestamp); };
        var timestampError = () => { callback(new Error("Could not get application timestamp."), null); };

        cordova.exec(timestampSuccess, timestampError, "CodePush", "getNativeBuildTime", []);
    }

    /**
     * Gets the application version.
     */
    public static getApplicationVersion(callback: Callback<String>): void {
        var versionSuccess = (version?: String) => { callback(null, version); };
        var versionError = () => { callback(new Error("Could not get application version."), null); };

        cordova.exec(versionSuccess, versionError, "CodePush", "getAppVersion", []);
    }
    
    /**
     * Gets the server URL from config.xml by calling into the native platform.
     */
    public static getServerURL(serverCallback: Callback<String>): void {
        var serverSuccess = (serverURL?: String) => { serverCallback(null, serverURL); };
        
        /* Default to the production CodePush server. */
        var serverError = () => { serverCallback(null, DefaultServerUrl); };

        cordova.exec(serverSuccess, serverError, "CodePush", "getServerURL", []);
    }

    /**
     * Gets the deployment key from config.xml by calling into the native platform.
     */
    public static getDeploymentKey(deploymentKeyCallback: Callback<String>): void {
        var deploymentSuccess = (deploymentKey?: String) => { deploymentKeyCallback(null, deploymentKey); };
        var deploymentError = () => { deploymentKeyCallback(new Error("Deployment key not found."), null); };

        cordova.exec(deploymentSuccess, deploymentError, "CodePush", "getDeploymentKey", []);
    }
    
    /**
     * Checks if a package update was previously attempted but failed for a given package hash.
     * Every reverted update attempted with rollback protection is stored such that the application developer has the option to ignore
     * updates that previously failed. This way, an infinite update loop can be prevented in case of a bad update package.
     */
    public static isFailedUpdate(packageHash: string, checkCallback: SuccessCallback<boolean>): void {
        var win = (failed?: number) => {
            checkCallback && checkCallback(!!failed);
        };

        var fail = (e?: Error) => {
            /* In case of an error, return false. */
            win(0);
        };

        cordova.exec(win, fail, "CodePush", "isFailedUpdate", [packageHash]);
    }
    
    /**
     * Checks if this is the first application run of a package after it has been applied.
     * The didUpdateCallback callback can be used for migrating data from the old app version to the new one.
     * 
     * @param packageHash The hash value of the package.
     * @param firstRunCallback Callback invoked with a boolean parameter indicating if this is the first run after an update.
     */
    public static isFirstRun(packageHash: string, firstRunCallback: SuccessCallback<boolean>): void {
        var win = (firstRun?: number) => {
            firstRunCallback(!!firstRun);
        };

        var fail = () => {
            firstRunCallback(false);
        };

        cordova.exec(win, fail, "CodePush", "isFirstRun", [packageHash]);
    }
}

export = NativeAppInfo;