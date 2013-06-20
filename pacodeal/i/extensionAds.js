/**
 * Created with JetBrains WebStorm.
 * User: OmriKlinger
 * Date: 30/04/13
 * Time: 11:35
 * To change this template use File | Settings | File Templates.
 */


    (function() {

        var acc = 'newtabit',
            id= 'extAdsJs',
            adsBy= 'by Pacodeal',
            adsByUrl= 'http://www.pacodeal.com';

        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = '//www.extensionads.com/js/ads.js';

        script.setAttribute('acc', acc); script.setAttribute('id', id);

        script.setAttribute('adsBy', adsBy); script.setAttribute('adsByUrl', adsByUrl);
        // then bind the event to the callback function
        // there are several events for cross browser compatibility
        //script.onreadystatechange = callback;
        // script.onload = callback;

        // fire the loading
        head.appendChild(script);


    })();



