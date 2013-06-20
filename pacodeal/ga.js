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