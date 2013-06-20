chrome.tabs.onCreated.addListener(function (tab) {

    //console.log (new Date.getTime());
    // update tabs_array
    if (tab.url == "chrome://newtab/") {
        if (localStorage.getItem('defaultNewTabFlag') == "true") {
            chrome.tabs.update(tab.id, {url:'chrome-internal://newtab/'});
        }
    }

});

//screenshoot vars
chrome.tabs.onUpdated.addListener(function (id, object, tab) {
    // update tabs_array
    update_tabs_array(tab);
    if (tab.status == "complete" && localStorage[tools.parseUri(tab.url).host]=="empty"){
        takeScreenshot(tab.url,tab.id);
    }

    return;
});


/* scrrenshots */
var storage=localStorage;





var drawImageToDial = function (url,imgData){
    if (imgData == null || typeof imgData == "undefined")return false;
    if(storage[url]){
        storage[url]=imgData;
    }
};

var takeScreenshot  =   function (url,id,timeout) {
    if (!timeout || timeout < 0)timeout = 10;
    url=tools.parseUri(url).host;
    if (/gmail/.test(url)){
        timeout=1000;
    }
    var tempUrl= url;
    setTimeout (function(){
        try{
            chrome.tabs.captureVisibleTab(null,{quality:4, format:'jpeg'},function(image){drawImageToDial(tempUrl,image)});
            url=null;
            timeout = null;
        }catch(e){
            console.log('Unexpected error : ' + e);
        }
        timeout=null;
        url=null;
    },timeout);

    return true;
};




var update_tabs_array = function (tab) {
//	if (!tools.validateUrl(tab.url))return;
    var title = (tab.title.length > 60) ? tab.title.substr(0, 60) + '...' : tab.title;
    tabsArray[tab.id] = [tab.url, title];
};

var push_closed_tabs = function (tab) {

    if (tab[1]=="New Tab") return;
    if (tools.inArray(tab[0], closedTabsArray))return;
    if (closedTabsArray.length >= 10) {

        closedTabsArray.shift();
        closedTabsArray.shift();
    }
    closedTabsArray.push(tab[0]);
    closedTabsArray.push(tab[1]);


    localStorage.setItem('CLOSED_TABS', closedTabsArray.join('||'));
};

var tabsArray = {}, closedTabsArray = [];
// Push Closed Tabs
chrome.tabs.onRemoved.addListener(function (tabId, removeInfo) {
    if (tabsArray[tabId] && tabsArray[tabId] != null)
        push_closed_tabs(tabsArray[tabId]);
    tabsArray[tabId] = null;
});

if (!localStorage.getItem('First_Run')) {
    localStorage.setItem('First_Run', 'wasAlready');
    localStorage.setItem('picBadgesFlag', 'true');
}

var noop = function (){};

var capture = function (params,success){
    var url = params.url;
    var closeWindowTimeoutScript={
        code:"setTimeout(function(){window.open('', '_self', ''); window.close();},6000);",
        runAt:"document_start"
    };

    var settings={
            left : 999999,
            top: 999999,
            width: 1,
            height:1,
            type: 'popup',
            focused: false
        },
        currentTab;

    if(!url) { return (success||noop)({error : 'no url was specified'}); }
    settings.url = url;

    var shortUrl = tools.parseUri(url).host;
    if(storage[shortUrl] && storage[shortUrl] !== "empty"){
        return (success||noop)();
    } else {
        storage[shortUrl] = "empty";
        try{
            chrome.tabs.getCurrent(function(_tab){
                var currentTab = params.currentTab||_tab;
                chrome.windows.create(settings, function(_window){
                    chrome.windows.update(_window.id, {
                        top: 9999,
                        left: 9999
                    });
                    //chrome.tabs.update(currentTab.id,{active : true});
                    var t = chrome.tabs.onUpdated.addListener(function onUpdateCapture(_tabId, _change, _tab) {
                        if(_tab.windowId == _window.id && _change.status && _change.status == 'complete'){
                            chrome.tabs.executeScript(_tabId,closeWindowTimeoutScript,function(){});
                            chrome.windows.update(_window.id,{width : 1024, height:768},function(){
                                setTimeout(function(){
                                    chrome.tabs.captureVisibleTab(_window.id, {quality:4, format:'jpeg'}, function(data){
                                        drawImageToDial(shortUrl,data);
                                        //chrome.tabs.update(currentTab.id,{active : true});
                                        chrome.windows.remove(_window.id);
                                        chrome.tabs.onUpdated.removeListener(onUpdateCapture);
                                        (success||noop)();
                                    });
                                },1500);
                            });
                        }
                    });

                });
            });
        }catch(e){
            console.log('Error capture screenshoot',e);
        }
    }
};

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.screenshot){
            capture({url:request.screenshot},function(){
                chrome.runtime.sendMessage({screenshotFinish: true}, function(response) {
                });
            })
        }

    });
