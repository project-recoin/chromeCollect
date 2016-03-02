setInterval(function() {
  var xhr = new XMLHttpRequest();
  chrome.storage.sync.get('lastId',function (object) {
    xhr.open("GET", "http://recoin.cloudapp.net:3215/RecoinPyBossaRestTaskCollector/getTasks", true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
        var resp = JSON.parse(xhr.responseText);
        if(object.lastId == undefined || object.lastId.task_id < resp.task_id){
          chrome.storage.sync.set({'lastId': resp},function (object) {
            chrome.browserAction.setIcon({path: 'success_icon.png'});
            chrome.extension.getBackgroundPage().console.log('saved new latest task');
            chrome.extension.getBackgroundPage().console.log(resp.task_id);
            setTimeout(function(){ chrome.browserAction.setIcon({path: 'icon.png'}); }, 1000);
          });
        }
      }
    }
    xhr.send();
  });
}, 10000);

function storeTask(taskObj) {
}