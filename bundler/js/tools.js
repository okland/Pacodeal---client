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
