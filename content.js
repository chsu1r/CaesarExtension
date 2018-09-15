function storeAndHighlight() {
    console.log(this.parentNode.id);
    var commentId = this.parentNode.id;
    chrome.storage.local.get(function(cfg) {
      if(typeof(cfg["kerb"]) !== 'undefined' && cfg["kerb"] instanceof Array) {
        if (!cfg["kerb"].includes(commentId)) {
            cfg["kerb"].push(commentId);
        }
      } else {
        cfg["kerb"] = [commentId];
      }
      chrome.storage.local.set(cfg);
    });
    this.parentNode.style.backgroundColor = "#66ff99"; 
}

function unstoreAndUnhighlight() {
    if (this.classList.contains("collapsed")) {
        var commentId = this.id;
        console.log("here");
        chrome.storage.local.get(function(cfg) {
          if(typeof(cfg["kerb"]) !== 'undefined' && cfg["kerb"] instanceof Array) { 
            var index = cfg["kerb"].indexOf(commentId);
            cfg["kerb"].splice(index, 1);
          }
          chrome.storage.local.set(cfg);
        });
        this.style.backgroundColor = "white";
    }
}

var comments = document.getElementsByClassName("comment");
var commentHeaders = document.getElementsByClassName("comment-header");
var doneComments = [];
chrome.storage.local.get(["kerb"], function(result) {
    doneComments = new Set(result["kerb"]);
    doneComments = Array.from(doneComments);
    for (i = 0;i<doneComments.length; i++) {
        document.getElementById(doneComments[i]).style.backgroundColor = "#66ff99";
        document.getElementById(doneComments[i]).classList.add('collapsed');
        document.getElementById(doneComments[i]).classList.remove('expanded');
    }
});

for (j = 0;j<commentHeaders.length;j++) {
    commentHeaders[j].addEventListener('click', storeAndHighlight);
}

for (j=0; j<comments.length;j++) {
    comments[j].addEventListener('click',unstoreAndUnhighlight);
}

