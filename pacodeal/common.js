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
