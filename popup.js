function performForm(){
	event.preventDefault();
	chrome.extension.getBackgroundPage().console.log(document.getElementById('task_id').value);

	var resp_text = document.getElementById('response').value;
	var task_id = document.getElementById('task_id').value;
	var project_id = document.getElementById('project_id').value;

	var xhr = new XMLHttpRequest();
	xhr.open("GET", "http://recoin.cloudapp.net:3215/RecoinPyBossaRestTaskCollector/sendTaskRun?text="+resp_text+"&task_id="+task_id+"&project_id="+project_id+"&contributor_name=saud&source=restful", true);
    xhr.onreadystatechange = function() {
    	if (xhr.readyState == 4) {
        	var resp = JSON.parse(xhr.responseText);
        	chrome.extension.getBackgroundPage().console.log(resp);
        	chrome.storage.sync.set({'performedId': {'task_id':task_id}},function (object) {
	            chrome.extension.getBackgroundPage().console.log('saved new latest performed task');
	            chrome.extension.getBackgroundPage().console.log(object.task_id);
	            window.close();
	        });
        }
    }
    xhr.send();
}

chrome.storage.sync.get('lastId',function (object) {
  chrome.storage.sync.get('performedId',function (obj) {
    
    chrome.extension.getBackgroundPage().console.log(object.lastId);
    
  	if(obj.performedId == undefined || obj.performedId.task_id < object.lastId.task_id){
		document.getElementById('question').textContent = object.lastId.question;
		document.getElementById('content').textContent = object.lastId.task_text;
		document.getElementById('task_id').value = object.lastId.task_id;
		document.getElementById('project_id').value = object.lastId.project_id;
	} else{
		document.getElementById('perform').textContent = 'nothing new to contribute yet';
	}
  });
});

// When the popup HTML has loaded
window.addEventListener('load', function(evt) {
    // Cache a reference to the status display SPAN
    //statusDisplay = document.getElementById('status-display');
    // Handle the bookmark form submit event with our addBookmark function

    document.getElementById('performform').addEventListener('submit', performForm);
    // Get the event page
    //chrome.runtime.getBackgroundPage(function(eventPage) {
        // Call the getPageInfo function in the event page, passing in 
        // our onPageDetailsReceived function as the callback. This injects 
        // content.js into the current tab's HTML
    //    eventPage.getPageDetails(onPageDetailsReceived);
    //});
});