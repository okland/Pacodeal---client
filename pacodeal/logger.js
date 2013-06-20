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