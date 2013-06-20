/*! New Tab Module*/
var newtab = function () {

    var closed_tabs_array, favorites_sites_ids_array;


    var init_full_version = function () {
        home_full_version();
        $(document).ready(function () {
            apps_full_version();
            closed_tabs_full_version();
            ui.remove_btn_full_version_init();
            ui.restore_btn_init();
            ui.bookmarks_btn_click_init();
            remote_update.init();
            ganalytics.init();
        });
    };


    var home_full_version = function (callback) {
        try {
            chrome.topSites.get(function (array) {
                history_scan_callback(array);
            });
        } catch (e) {

        }
    };


    var store_favorites_sites_ids = function (array) {
        localStorage.favorites_sites_ids_array = array.join(';');
    };

    var apps_full_version = function () {
        var count=0;
        var html = '' +
            '<div class="app_box">' +
            '<a href="https://chrome.google.com/webstore">' +
            '<div class="thumb" style="background-image:url(/bundler/img/chrome-web-store.png)">' +
            '</div><div class="site_title">' +
            'Chrome Web Store' +
            '</div></a></div>';

        try {
            chrome.management.getAll(function (arr) {

                for (var i in arr) {
                    var a = arr[i];
                    if (!a.isApp)continue;
                    count++;
                    var thumb = a.icons[a.icons.length - 1].url;
                    html += '' +
                        '<div class="app_box" data-appid="' + a.id + '">' +
                        '<span class="remove-btn">x</span>' +
                        '<div class="thumb" style="background-image:url(' + thumb + ');">' +

                        '</div><div class="site_title">' +
                        a.name.substr(0, 30) +
                        '</div></div>';


                }
                $('#apps-list').html(html);
                $('#apps-btn').show();
                if(count>15){
                    $('.app_box').attr('style','width:130px;height:100px;');
                }
                $('#apps-list').on('click', '.app_box', app_launch_listener).on('click', '.remove-btn', app_remove_listener);

            });
        } catch (e) {
        }

    };

    var app_launch_listener = function () {
        console.log('app lunch',$(this).data('appid'));
        if ($(this).data('appid'))chrome.management.launchApp($(this).data('appid'));
    };

    var app_remove_listener = function (e) {
        console.log('remove app',$(this).parent().data('appid'));
        e.preventDefault();
        chrome.management.uninstall($(this).parent().data('appid'));
        $(this).parent().fadeOut(500, function () {
            $(this).remove();
        });
    };


    var closed_tabs_full_version = function () {

        closed_tabs_array = localStorage.getItem('CLOSED_TABS');
        if (closed_tabs_array == "" || closed_tabs_array == "undefined" || typeof closed_tabs_array == "undefined" || closed_tabs_array == null) {
            $(document.getElementById('closed-tabs-menu')).hide();
            return;
        }
        closed_tabs_array = closed_tabs_array.split('||');
        if (closed_tabs_array.length <= 0) {
            $(document.getElementById('closed-tabs-menu')).hide();
            return;
        }

        var html = "", url, title;
        for (var i = 0; i < closed_tabs_array.length; i = i + 2) {
            url = closed_tabs_array[i];
            title = closed_tabs_array[i + 1];

            if (!url || typeof url == 'undefined' || url == null || url == "undefined") {
                continue;
            }

            if (!title || typeof title == 'undefined' || title == null || title == "undefined") {
                title = url;
            }


            html += '<li><a href="' + url + '"><img src="chrome://favicon/' + url + '" style="display:inline-block;padding-right:10px;"/>' + title + '</a></li>';
        }
        html += '  <li class="divider"></li>' +
            '<li><a href="#" id="restore_all_btn"><i class="icon-repeat" style="display:inline-block;padding-right:10px;"></i>Restore All Tabs</a></li>';
        document.getElementById('closed-tabs-list').innerHTML = html;
        setTimeout(set_restore_all_listener, 100);
        $('#closed-tabs-menu').show();
    };

    var history_scan_callback = function (array) {
        var html = "", item, uri, title;
        var picBadgesFlag= localStorage.picBadgesFlag,
            startDial= 0,
            curTime= new Date().getTime();
        /*
        if(picBadgesFlag&&picBadgesFlag!="false"){
            var url =localStorage.picBadgesDialUrl|| "http://www.picbadges.com",
                thumb=localStorage.picBadgesDialThumb||'/bundler/img/PicBadgesWhiteLabelNewTabLogo.png';
            html+="<li id='picBadge' rel=''>" +
                "<a id='picUrl' style='' href='" + url + "' class='site'>" +
                "<div id='picThumb' class='thumb' style='background:url("+thumb+");background-size:cover;'>" +
                "<div class='close-btn'><i class='icon-remove'></i></div>" +
                "<div id='notification' style='display:none;'></div>"+
                "<div class='favicon'><img style='width:16px;' src='chrome://favicon/" + url + "'/></div>" +
                "<div class='bottom-line'></div>" +
                "</div>" +
                "<div id='picTitle' class='title'>PicBadges</div>" +
                "</a>" +
                "</li>";
            startDial=1;
            var get_picBadges_thumbnail = function () {
               var picBadgeUrl='http://www.picbadges.com/activity/newtab/';
               $.get(picBadgeUrl,get_picBadges_thumbnail_callback);
            };
            var get_picBadges_thumbnail_callback = function (response) {
                localStorage.picBadgesLastUpdate=curTime;
                if(response&&response.connected==1){
                    var url= response.dial_url||"http://www.picbadges.com",
                        thumb= response.dial_thumbnail||"/bundler/img/picBadges.png";
                    localStorage.picBadgesDialUrl=url;
                    localStorage.picBadgesDialThumb=thumb;
                    $('#picUrl').attr('href',url);
                    $('#picThumb').attr('style','background:url("'+thumb+'");background-size:cover;');
                    if(response.dial_badge){
                        $('#notification').attr('style',"padding-bottom: 2px;padding-right:1px;font-size:11px;display:block;background:#d84c3b;border:1px solid;font-weight:bold;border-color:black;border-radius:4px;height:15px;width:15px;color:while;position:relative;left:-8px;top:-8px;z-index:10;text-align:center;color: white !important;box-shadow: 3px;'");
                        $('#notification').text(response.dial_badge);
                    }
                }
            };
            if(!localStorage.picBadgesLastUpdate||localStorage.picBadgesLastUpdate<curTime-3600000*8){
                get_picBadges_thumbnail();
            }
        }
        */
        for (var i=startDial; i < 8 && i < array.length; i++) {
            item = array[i];
            if (ban_list_check_url(item.url))continue;

            title = (item.title.length > 20) ? item.title.substring(0, 20) + '...' : item.title;
            html += site_template(item.url, title);
        }
        favorites_list_append_html(html);
    };

    var favorites_list_append_html = function (html) {
        document.getElementById('favorites-list').innerHTML = html;

        setTimeout(function () {
            $('#favorites-list').find('.favicon').find('img').each(function () {
                var rgb = (getAverageRGB(this));
                $(this).parent().next().css('background', 'rgb(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ')');
            });
        }, 100);

    };

    var site_template = function (url, title, thumb, rel) {
        var thumbStyle='';
        if (!thumb) {
            var host= tools.parseUri(url).host;
            if(localStorage[host]&&localStorage[host]!="empty"){
                thumb= localStorage[host];
                thumbStyle="background:url(" + thumb + ");background-size:cover;";
            }else{
                if(!localStorage[host]){
                    chrome.runtime.sendMessage({screenshot: url}, function(response) {
                    });
                }
                localStorage[host]="empty";
                thumbStyle="background:#f1f1f1;background-size:cover;";
                //thumb="/bundler/img/Thumbnail-200x130.png";
            }
        }else{
            thumbStyle="background:url(" + thumb + ");background-size:cover;";
        }

        return "<li rel='" + rel + "'>" +
            "<a href='" + url + "' class='site'>" +
            "<div class='thumb' style="+thumbStyle+">" +
            "<div class='close-btn'><i class='icon-remove'></i></div>" +
            "<div class='favicon'><img style='width:16px;' src='chrome://favicon/" + url + "'/></div>" +
            "<div class='bottom-line'></div>" +
            "</div>" +
            "<div class='title'>" + title + "</div>" +
            "</a>" +
            "</li>";
    }


    var set_restore_all_listener = function () {
        $('#restore_all_btn').click(restore_all);
    };

    var restore_all = function () {
        try {
            for (var i = 0; i < closed_tabs_array.length; i = i + 2) {
                chrome.tabs.create({url:closed_tabs_array[i]}, function () {
                    return 0;
                });
            }

        } catch (e) {

        }
    };

    var ban_list_add_url = function (url) {
        var ban_list = localStorage.ban_list;
        if (ban_list == undefined || ban_list == "") {
            localStorage.ban_list = url;
        } else {
            localStorage.ban_list += ";" + url;
        }
    };

    var ban_list_array = null;
    ban_list_check_url = function (url) {
        if (ban_list_array == null) {
            ban_list_array = ban_list_restore_to_array();
        }
        for (var i = 0; i < ban_list_array.length; i++) {
            if (ban_list_array[i] == url) return true;
        }
        return false;
    }

    var ban_list_restore_to_array = function () {
        var string = localStorage.ban_list;
        return (string != undefined && string != "" ) ? string.split(';') : [];
    };
    var ban_list_store_array = function (array) {
        localStorage.ban_list = array.join(';');
    };

    var next_favorites_site_action = function (element) {
        var next_id = next_favorites_site_get_next_id();
        var item = favorites_sites[next_id];
        var rel = element.attr('rel');
        element.replaceWith(site_template('http://' + item.domain, item.keyword, '/bundler/img/' + item.image, rel));
        var favorites_array = localStorage.favorites_sites_ids_array.split(';');
        favorites_array[rel] = next_id;
        store_favorites_sites_ids(favorites_array);
    };
    var next_favorites_site_get_next_id = function () {
        var last_id = parseInt(localStorage.last_favorites_site_id);
        if (last_id == undefined || last_id == '')last_id = 7;
        return next_favorites_site_check_duplicate(++last_id);

    };

    var next_favorites_site_check_duplicate = function (id) {
        if (id > favorites_sites.length - 1)id = 0;

        var arr = localStorage.favorites_sites_ids_array;
        if (arr != undefined && arr != '') {
            arr = arr.split(';');
            for (var i in arr) {
                //console.log ("arr[i] : " + arr[i] + "  id  : " +id);
                if (arr[i] == id) {
                    return next_favorites_site_check_duplicate(++id);
                }
            }
            localStorage.last_favorites_site_id = id;
            return id;
        } else {
            localStorage.last_favorites_site_id = id;
            return id;
        }

    }


    var ui = {
        remove_btn_full_version_init:function () {
            $('#favorites-list').on('click', '.close-btn', function (e) {
                e.preventDefault();
                e.stopPropagation();
                //check if delte picbadges dial
                /*
                if($(this).parents('a').attr('href')=="http://www.picbadges.com"){
                    localStorage.setItem('picBadgesFlag', 'false');
                }
                */
                ban_list_add_url($(this).parents('a').attr('href'));
                $(this).parents('li').remove();
                $('#site-removed').show();
            });
        },
        remove_btn_lite_version_init:function () {
            $('#favorites-list').on('click', '.close-btn', function (e) {
                e.preventDefault();
                e.stopPropagation();
                next_favorites_site_action($(this).parents('li'));
            });

        },
        restore_btn_init:function () {
            $('#home').on('click', '#site-restore-btn', function (e) {
                ban_list_array = ban_list_restore_to_array();
                ban_list_array.pop();
                ban_list_store_array(ban_list_array);
                home_full_version();
                console.log($('#favorites-list').find('.li'));
                if(ban_list_array.length==0){
                    $('#site-removed').hide();
                }
            });
        },
        bookmarks_btn_click_init:function () {

            $('#bookmarks-btn').click(function () {
                chrome.tabs.create({url:'chrome://bookmarks'});
            });
        },
        update_modal:function () {
            $('#update-modal').modal('show').removeClass('hide');
        }


    };

    return {
        init_full_version:init_full_version ,
        home_full_version:home_full_version
    };
}();

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.screenshotFinish){
            newtab.home_full_version();
        }
    }
);

/*! Search Module*/
var search = function () {
    var widdit_uid = "41613",
        default_suggestion_url = "http://api.widdit.com/suggestions/?format=googleToolbar&si=41545&",
        default_search_url_prefix = localStorage.SEARCH_URL_PREFIX || 'http://search.certified-toolbar.com/',
        default_translate_url = 'http://translate.google.com/',
        search_suggestions_holder = null,
        search_input = null,
        items = [],
        search_suggestions = null,
        current_item_index = 0,
        original_value = null,
        url_autocomplete_value = null,
        url_autocomplete_bool = false,

        init = function () {
            search_input = $('#search-input').keyup(key_up_listener).blur(focus_out).focus(focus_in).click(focus_in);
            $('#site-autocomplete').click(focus_in);
            search_suggestions = $('#search-suggestions').on('click', 'li a', suggestions_box_href_click);
            search_suggestions_holder = $('#search-suggestions-holder');
            search_button = $('#search-btn').click(search_btn_click_init);

            var uuid = '1234' || localStorage.uuid ;
            default_suggestion_url = tools.check_for_constant('SUGGETION_URL_PREFIX', default_suggestion_url);
            default_suggestion_url += "&gid=" + uuid;
            //verify if google search
            if(localStorage.googleSearch) {
                var googleSearch = "http://www.google.com/search";
                localStorage.SEARCH_URL_PREFIX = googleSearch;
                default_search_url_prefix = googleSearch + '?q=';
            }else{
                default_search_url_prefix = tools.check_for_constant('SEARCH_URL_PREFIX', default_search_url_prefix);
                default_search_url_prefix += '?gid=' + uuid + '&si=' + widdit_uid + '&version=' + version + '&q=';
            }
        },


        get_suggestions = function (value, callback) {

            if (value && value != '') {
                suggestions_box_reset();
                suggestions_box_append(null, value, 'Search ', default_search_url_prefix + value, true, 'icon-search');
                suggestions_box_show();
                if (full_version) {
                    get_google_suggestions(value);
                    get_history_suggestions(value);
                }
            } else {
                suggestions_box_hide();

            }
        },

        suggestions_box_reset = function () {
            search_suggestions.html('');
            current_item_index = 0;
        },

        suggestions_box_append = function (url, title, more, href, active, icon, prepend, make_first) {
            if (icon == "icon-search") {
                icon = '<i class="icon-search"></i>';
            } else if (icon == "icon-time") {
                icon = '<i class="icon-time"></i>';
            } else {
                icon = "";
            }

            if (active) {
                search_suggestions.find('li').removeClass('active').removeClass('selected');
            }

            if (url) {
                if (make_first)
                    search_suggestions.prepend('<li class="' + ((active) ? 'selected' : '' ) + '"><a href="' + (href || '#') + '">' + icon + ' <span class="url">' + url + '</span><span class="more">' + ((more && more != '') ? ' - ' + more : '') + '</span></a></li>');

                else if (prepend)
                    search_suggestions.children('li:first-child').after('<li class="' + ((active) ? 'selected' : '' ) + '"><a href="' + (href || '#') + '">' + icon + ' <span class="url">' + url + '</span><span class="more">' + ((more && more != '') ? ' - ' + more : '') + '</span></a></li>');
                else
                    search_suggestions.append('<li class="' + ((active) ? 'selected' : '' ) + '"><a href="' + (href || '#') + '">' + icon + ' <span class="url">' + url + '</span><span class="more">' + ((more && more != '') ? ' - ' + more : '') + '</span></a></li>');
            } else if (title) {
                if (prepend)
                    search_suggestions.children('li:first-child').after('<li class="' + ((active) ? 'selected' : '' ) + '"><a href="' + (href || '#') + '">' + icon + ' <span class="title">' + title + '</span><span class="more">' + ((more && more != '') ? ' - ' + more : '') + '</span></a></li>');
                else
                    search_suggestions.append('<li class="' + ((active) ? 'selected' : '' ) + '"><a href="' + (href || '#') + '">' + icon + ' <span class="title">' + title + '</span><span class="more">' + ((more && more != '') ? ' - ' + more : '') + '</span></a></li>');

            }
        },


        suggestions_box_hide = function () {
            search_suggestions_holder.addClass('hide');
        },

        suggestions_box_show = function () {
            search_suggestions_holder.removeClass('hide');
        },

        suggestions_box_next_item = function () {
            var items = search_suggestions.children('li');
            if (current_item_index < items.length - 1) {
                $(items[current_item_index]).removeClass('selected').next().addClass('selected');
                current_item_index++;
            }

        },

        search_box_redirect_to_item = function () {
            if (search_input.val() != '') {
                var link = default_search_url_prefix + search_input.val();
                //var focus=localStorage.getItem('takeFocus');
                _gaq.push(['_trackEvent', 'NEW-SEARCH-PACODEAL', 'Search-box', search_input.val()]);
                window.location = link;
            }
        },

        suggestions_box_href_click = function () {
            e.preventDefault();
            var link = $(this).attr('href');
            if (link != undefined && link != "#" && link != "") {
                //var focus=localStorage.getItem('takeFocus');
                _gaq.push(['_trackEvent', 'NEW-SEARCH-PACODEAL', 'Suggestions-box - mouse', link]);
                window.location = link;
            }
        },

        suggestions_box_redirect_to_item = function () {
            var items = search_suggestions.children('li');
            if (items.length > 0 && items[current_item_index] != undefined) {
                //var focus=localStorage.getItem('takeFocus');
                _gaq.push(['_trackEvent', 'NEW-SEARCH-PACODEAL', 'Suggestions-box - keyboard', $(items[current_item_index]).children('a').attr('href')]);
                var href = $(items[current_item_index]).children('a').attr('href');
                window.location = href;
            }
        },

        suggestions_box_previous_item = function () {
            if (current_item_index > 0) {
                $(search_suggestions.children('li')[current_item_index]).removeClass('selected').prev().addClass('selected');
                current_item_index--;
            }
        },
        get_google_suggestions = function (value) {
            if (value == "" || typeof value == "undefined")return;
            var url =
                $.get(default_suggestion_url, {'si':'1234', 'gid':widdit_uid, 'q':value}, get_google_suggestions_callback, 'xml');
        },
        get_google_suggestions_callback = function (response) {
            var elements = $(response).find('CompleteSuggestion'), value;
            for (var i = 1; i < 3; i++) {
                value = $(elements[i]).children('suggestion').attr('data');
                suggestions_box_append(null, value, '', default_search_url_prefix + value, '', 'icon-search', true);
            }

        },

        get_history_suggestions = function (value) {
            try {
                chrome.history.search({text:'' + value + '', maxResults:1000}, get_history_suggestions_callback);
            } catch (e) {
            }
        },
        get_history_suggestions_callback = function (arr_raw) {
            /*	arr_raw.sort(function(a,b){
             return ((b.typeCount*8+b.visitCount*2)/10)-((a.typeCount*8+a.visitCount*2)/10);
             });*/
            arr_raw = sort_and_unique_and_add_host(arr_raw);
            var arr = [];
            var k = 0;
            for (var j in arr_raw) {
                if (k >= 3)break;
                arr[j] = arr_raw[j];
                k++;
            }

            var html = '';
            var url_autocomplete_done = false, temp_ac;
            for (var i in arr) {
                temp_ac = false;
                if (!url_autocomplete_done)temp_ac = url_autocomplete_done = url_autocomplete(arr[i]);
                if (!temp_ac) {
                    suggestions_box_append(arr[i].host, null, tools.truncate(arr[i].title, 50, '...'), 'http://' + arr[i].host, null, 'icon-time', false);
                }
            }


        },

        url_autocomplete = function (item) {
            if (!url_autocomplete_bool)return false;
            var host = escape_www(item.host);
            var index = host.indexOf(original_value);
            if (index == 0) {
                url_autocomplete_value = host;
                var addition = host.slice(original_value.length);
                $('#site-autocomplete').html(original_value + "<span id='addition'>" + addition + "</span>").show();
                suggestions_box_append(item.host, null, tools.truncate(item.title, 50, '...'), 'http://' + item.host, true, 'icon-time', true, true);
                return true;
            }
            return false;

        },
        escape_www = function (host) {
            if (host.indexOf('www.') == 0)
                return host.slice(4);
            else
                return host;
        },

        sort_and_unique_and_add_host = function (arr) {
            if (arr.length <= 0)return;
            arr = arr.sort(function (a, b) {
                return ((b.typeCount * 9 + b.visitCount * 1) / 10) - ((a.typeCount * 8 + a.visitCount * 2) / 10);
            });

            var ret = [arr[0]];
            arr[0].host = tools.parseUri(arr[0].url).host;
            for (var i = 1; i < arr.length; i++) { // start loop at 1 as element 0 can never be a duplicate
                arr[i].host = tools.parseUri(arr[i].url).host;
                if (arr[i - 1].host !== arr[i].host) {
                    ret.push(arr[i]);
                }
            }
            return ret;
        },

        search_btn_click_init = function () {
            search_box_redirect_to_item();
        },

        key_up_listener = function (e) {
            if (e.keyCode == 13) {
                // enter key
                suggestions_box_redirect_to_item();

            } else if (e.keyCode == 40) {
                //down key
                focus_in();
                suggestions_box_next_item();
            } else if (e.keyCode == 38) {
                //up key
                focus_in();
                suggestions_box_previous_item();
            } else if (e.keyCode == 37) {
                url_autocomplete_value = null;
                $('#site-autocomplete').text('').hide();
                return false;
            } else if (e.keyCode == 39) {
                if (!url_autocomplete_value || url_autocomplete_value == "")return;
                search_input.val(url_autocomplete_value);
                $('#site-autocomplete').text('').hide();
            } else if (e.keyCode == 8) {
                // backspace
                // any key
                url_autocomplete_bool = false;
                url_autocomplete_value = null;
                $('#site-autocomplete').text('').hide();
                original_value = search_input.val();
                get_suggestions(original_value);

            } else {
                // any key
                url_autocomplete_bool = true;
                url_autocomplete_value = null;
                $('#site-autocomplete').text('').hide();
                original_value = search_input.val();
                get_suggestions(original_value);
            }

        },

        focus_in = function (e) {

            url_autocomplete_value = null;
            $('#site-autocomplete').text('').hide();
            return false;
        },

        focus_out = function (e) {
            setTimeout(function () {
                suggestions_box_reset();
                suggestions_box_hide();
            }, 200);
        };


    return {
        init:init
    };


}();


/*! Avg RGB Function*/


function getAverageRGB(imgEl) {

    var blockSize = 5, // only visit every 5 pixels
        defaultRGB = {r:0, g:0, b:0}, // for non-supporting envs
        canvas = document.createElement('canvas'),
        context = canvas.getContext && canvas.getContext('2d'),
        data, width, height,
        i = -4,
        length,
        rgb = {r:0, g:0, b:0},
        count = 0;

    if (!context) {
        return defaultRGB;
    }

    height = canvas.height = imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
    width = canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;

    context.drawImage(imgEl, 0, 0);

    try {
        data = context.getImageData(0, 0, width, height);
    } catch (e) {
        /* security error, img on diff domain */
        return defaultRGB;
    }

    length = data.data.length;

    while ((i += blockSize * 4) < length) {
        ++count;
        rgb.r += data.data[i];
        rgb.g += data.data[i + 1];
        rgb.b += data.data[i + 2];
    }

    // ~~ used to floor values
    rgb.r = ~~(rgb.r / count);
    rgb.g = ~~(rgb.g / count);
    rgb.b = ~~(rgb.b / count);

    return rgb;

}

/*! Remote Update*/


var remote_update = function () {
    var remote_update_url = "https://s3.amazonaws.com/remote_updates/iamstudying/iamstudying.update.json";

    var timeout = 1000; //*60*60*24*2; // 2 days

    var init = function () {
        var last_update_timestamp = localStorage.last_update_timestamp;
        if (last_update_timestamp == undefined || last_update_timestamp == "" || tools.checkTimestamp(last_update_timestamp, tools.get_now_timestamp(), timeout)) {
            update_from_remote();
        }

        if (localStorage.uuid == undefined)localStorage.uuid = tools.generate_uuid();

    };

    var update_from_remote = function () {
        $.get(remote_update_url, [], function (response) {
            response = $.parseJSON(response);
            if (response.length <= 0)return false;
            for (var i in response) {
                localStorage.setItem(response[i][0], response[i][1]);
            }
            localStorage.last_update_timestamp = tools.get_now_timestamp();
        });
    };

    return {
        init:init
    };

}();

/*! Google Analytics*/

var _gaq;
var ganalytics = function () {

    var init = function () {

        var uid =  'UA-40447064-1';
        _gaq = _gaq || [];
        _gaq.push(['_setAccount', uid]);
        _gaq.push(['_trackPageview']);
        _gaq.push(['_trackEvent', 'PACODEAL-PAGE-LOAD', version]);

        if (localStorage.first_run != "yes") {
            localStorage.first_run = "yes";
            _gaq.push(['_trackEvent', 'PACODEAL-FIRST-RUN', version]);

        }
        ;


        (function () {
            var ga = document.createElement('script');
            ga.type = 'text/javascript';
            ga.async = true;
            ga.src = 'https://ssl.google-analytics.com/ga.js';
            var s = document.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(ga, s);
        })();

    }


    return {
        init:init
    };
}();

/* Favorites Sites Array*/
var favorites_sites = [
    {domain:'gmail.com', keyword:'Gmail', image:'logos/gmail.png'},
    {domain:'facebook.com', keyword:'Facebook', image:'logos/facebook.png'},
    {domain:'amazon.com', keyword:'Amazon', image:'logos/amazon.png'},
    {domain:'twitter.com', keyword:'Twitter', image:'logos/twitter.png'},
    {domain:'youtube.com', keyword:'Youtube', image:'logos/youtube.png'},
    {domain:'ebay.com', keyword:'Ebay', image:'logos/ebay.png'},
    {domain:'linkedin.com', keyword:'Linkedin', image:'logos/linkedin.png'},
    {domain:'pinterest.com', keyword:'Pinterest', image:'logos/pinterest.png'},
    {domain:'cnn.com', keyword:'CNN', image:'logos/CnnLogo.jpg'},
    {domain:'bbc.com', keyword:'BBC', image:'logos/bbc.png'},
    {domain:'craiglist.com', keyword:'Craiglist', image:'logos/craiglist.png'},
    {domain:'flicker.com', keyword:'Flicker', image:'logos/flicker.png'},
    {domain:'wikipedia.com', keyword:'Wikipedia', image:'logos/wikipedia.png'},
    {domain:'techcrunch.com', keyword:'TechCrunch', image:'logos/techcrunch.png'},
    {domain:'nytimes.com', keyword:'The New York Times', image:'logos/NewYorkTimesLogo.jpg'},
    {domain:'engadget.com', keyword:'Engadget', image:'logos/EngadgetLogo.jpg'},
    {domain:'mashable.com', keyword:'Mashable', image:'logos/MashableLogo.png'},
    {domain:'cbs.com', keyword:'CBS', image:'logos/CbsLogo.png'},
    {domain:'wsj.com', keyword:'Wall Street Journal', image:'logos/WallStreetJournalLogo.png'},
    {domain:'economist.com', keyword:'The Economist', image:'logos/TheEconomistLogo.jpg'}

];


try {
    /*
    if (localStorage.takeFocus == "true") {
        console.log("try to get focus in ");
        chrome.tabs.getCurrent(function (tab) {
            chrome.tabs.update(tab.id, {selected:true}, function () {
                $(document).ready(function () {
                    //$('#search-input').focus();
                    search.init();
                });
            });
        });

    } else {
    */
        $(document).ready(function () {
            search.init();
        });
    //}

    newtab.init_full_version();
}
catch (e) {
}


