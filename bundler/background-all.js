



 /*********************** start File  js/tools.js **************************/



/* Tools Module */
var tools = function () {

    var validateUrl = function (url) {

        var pattern = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
        return pattern.test(url);

    };
    var loadResource = function (url, container_string, callback) {
        $.get(url, function loadResourceCALLBACK(response) {
            ntf_log('resource loaded : ' + url);
            if (container_string)$(container_string).html(response);
            if (callback)callback(response);

            url = null;
            container_string = null;
            callback = null;
            response = null;
        });
    };
    var validateUrl = function (url) {

        var pattern = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
        return pattern.test(url);

    };
    var extractDomain = function (url) {
        return url && url.split("/").splice(2, 1)[0];
    };

    var loadScript = function (filename, callback) {
        ntf_log('load script : ' + filename);
        var fileref = document.createElement('script');
        fileref.setAttribute("type", "text/javascript");
        fileref.setAttribute("src", filename);
        document.getElementsByTagName("head")[0].appendChild(fileref);
        if (!callback)callback = null;
        fileref.onload = callback;
        return true;
    };
    var extractMainDomain = function (domain) {
        return domain && domain != undefined && (domain.split(".").length == 2) ? domain.split(".")[0] : domain.split(".")[1];
    };
    var inArray = function (obj, arr) {

        return (arr.indexOf(obj) != -1);

    };

    // t1 - old timestamp, t2 - new timestamp. return true if t2-t1 > timeout
    var checkTimestamp = function (t1, t2, timeout) {
        return (timeout < (t2 - t1));
    };

    var arrayShuffle = function (arr) {
        for (var j, x, i = arr.length; i;
             j = parseInt(Math.random() * i),
                 x = arr[--i], arr[i] = arr[j], arr[j] = x);
        return arr;
    };

    var truncate = function (string, length, prefix) {
        if (!prefix)prefix = '';
        return (string && string.length > length) ? string.substring(0, length) + prefix : string;
    };

    var check_for_constant = function (key, default_value) {
        var new_value = localStorage.getItem(key);
        return ( new_value == undefined || new_value == "") ? default_value : new_value;
    }

    var get_now_timestamp = function () {
        return new Date().getTime();
    }

    var length = 3;
    var myString = "ABCDEFG";
    var myTruncatedString = myString.substring(0, length);

    // parseUri 1.2.2
    // (c) Steven Levithan <stevenlevithan.com>
    // MIT License

    var parseUri = function (str) {
        var o = parseUri.options,
            m = o.parser[o.strictMode ? "strict" : "loose"].exec(str),
            uri = {},
            i = 14;

        while (i--) uri[o.key[i]] = m[i] || "";

        uri[o.q.name] = {};
        uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
            if ($1) uri[o.q.name][$1] = $2;
        });

        return uri;
    };

    parseUri.options = {
        strictMode:false,
        key:["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"],
        q:{
            name:"queryKey",
            parser:/(?:^|&)([^&=]*)=?([^&]*)/g
        },
        parser:{
            strict:/^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
            loose:/^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
        }
    };

    var generate_uuid = function () {
        // http://www.ietf.org/rfc/rfc4122.txt
        var s = [];
        var hexDigits = "0123456789abcdef";
        for (var i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
        s[8] = s[13] = s[18] = s[23] = "-";

        var uuid = s.join("");
        return uuid;
    };


    return {
        parseUri:parseUri,
        validateUrl:validateUrl,
        inArray:inArray,
        truncate:truncate,
        get_now_timestamp:get_now_timestamp,
        check_for_constant:check_for_constant,
        checkTimestamp:checkTimestamp,
        generate_uuid:generate_uuid

    };
}();




 /*********************** End File js/tools.js ******************/ 







 /*********************** start File  js/background.js **************************/



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




 /*********************** End File js/background.js ******************/ 



