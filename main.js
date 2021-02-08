// JavaScript Document

chrome.runtime.onInstalled.addListener(function() {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [new chrome.declarativeContent.PageStateMatcher({
                pageUrl: {hostContains: 'clickfunnels.com'},
                css:[".editorHelpTopBar"]
            })
            ],
                actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });
});
