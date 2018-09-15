$(document).ready(function () {
    $('#go').click(function () {
        chrome.tabs.executeScript(null, {file: 'content.js'});
    });
    $('#reset').click(function () {
        chrome.storage.local.clear();
        chrome.tabs.getSelected(null, function(tab) {
          var code = 'window.location.reload();';
          chrome.tabs.executeScript(tab.id, {code: code});
        });
    });
});