



 /*********************** start File  js/checkNewTab.js **************************/



/**
 * Created with JetBrains WebStorm.
 * User: OmriKlinger
 * Date: 28/10/12
 * Time: 11:27
 * To change this template use File | Settings | File Templates.
 */
if (localStorage.getItem('defaultNewTabFlag') == "true") {
    document.location.href = "chrome-internal://newtab/";
}




 /*********************** End File js/checkNewTab.js ******************/ 







 /*********************** start File  js/bootstrap.min.js **************************/



/*!
* Bootstrap.js by @fat & @mdo
* Copyright 2012 Twitter, Inc.
* http://www.apache.org/licenses/LICENSE-2.0.txt
*/
!function(e){"use strict";e(function(){e.support.transition=function(){var e=function(){var e=document.createElement("bootstrap"),t={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"},n;for(n in t)if(e.style[n]!==undefined)return t[n]}();return e&&{end:e}}()})}(window.jQuery),!function(e){"use strict";var t='[data-dismiss="alert"]',n=function(n){e(n).on("click",t,this.close)};n.prototype.close=function(t){function s(){i.trigger("closed").remove()}var n=e(this),r=n.attr("data-target"),i;r||(r=n.attr("href"),r=r&&r.replace(/.*(?=#[^\s]*$)/,"")),i=e(r),t&&t.preventDefault(),i.length||(i=n.hasClass("alert")?n:n.parent()),i.trigger(t=e.Event("close"));if(t.isDefaultPrevented())return;i.removeClass("in"),e.support.transition&&i.hasClass("fade")?i.on(e.support.transition.end,s):s()};var r=e.fn.alert;e.fn.alert=function(t){return this.each(function(){var r=e(this),i=r.data("alert");i||r.data("alert",i=new n(this)),typeof t=="string"&&i[t].call(r)})},e.fn.alert.Constructor=n,e.fn.alert.noConflict=function(){return e.fn.alert=r,this},e(document).on("click.alert.data-api",t,n.prototype.close)}(window.jQuery),!function(e){"use strict";var t=function(t,n){this.$element=e(t),this.options=e.extend({},e.fn.button.defaults,n)};t.prototype.setState=function(e){var t="disabled",n=this.$element,r=n.data(),i=n.is("input")?"val":"html";e+="Text",r.resetText||n.data("resetText",n[i]()),n[i](r[e]||this.options[e]),setTimeout(function(){e=="loadingText"?n.addClass(t).attr(t,t):n.removeClass(t).removeAttr(t)},0)},t.prototype.toggle=function(){var e=this.$element.closest('[data-toggle="buttons-radio"]');e&&e.find(".active").removeClass("active"),this.$element.toggleClass("active")};var n=e.fn.button;e.fn.button=function(n){return this.each(function(){var r=e(this),i=r.data("button"),s=typeof n=="object"&&n;i||r.data("button",i=new t(this,s)),n=="toggle"?i.toggle():n&&i.setState(n)})},e.fn.button.defaults={loadingText:"loading..."},e.fn.button.Constructor=t,e.fn.button.noConflict=function(){return e.fn.button=n,this},e(document).on("click.button.data-api","[data-toggle^=button]",function(t){var n=e(t.target);n.hasClass("btn")||(n=n.closest(".btn")),n.button("toggle")})}(window.jQuery),!function(e){"use strict";var t=function(t,n){this.$element=e(t),this.$indicators=this.$element.find(".carousel-indicators"),this.options=n,this.options.pause=="hover"&&this.$element.on("mouseenter",e.proxy(this.pause,this)).on("mouseleave",e.proxy(this.cycle,this))};t.prototype={cycle:function(t){return t||(this.paused=!1),this.interval&&clearInterval(this.interval),this.options.interval&&!this.paused&&(this.interval=setInterval(e.proxy(this.next,this),this.options.interval)),this},getActiveIndex:function(){return this.$active=this.$element.find(".item.active"),this.$items=this.$active.parent().children(),this.$items.index(this.$active)},to:function(t){var n=this.getActiveIndex(),r=this;if(t>this.$items.length-1||t<0)return;return this.sliding?this.$element.one("slid",function(){r.to(t)}):n==t?this.pause().cycle():this.slide(t>n?"next":"prev",e(this.$items[t]))},pause:function(t){return t||(this.paused=!0),this.$element.find(".next, .prev").length&&e.support.transition.end&&(this.$element.trigger(e.support.transition.end),this.cycle(!0)),clearInterval(this.interval),this.interval=null,this},next:function(){if(this.sliding)return;return this.slide("next")},prev:function(){if(this.sliding)return;return this.slide("prev")},slide:function(t,n){var r=this.$element.find(".item.active"),i=n||r[t](),s=this.interval,o=t=="next"?"left":"right",u=t=="next"?"first":"last",a=this,f;this.sliding=!0,s&&this.pause(),i=i.length?i:this.$element.find(".item")[u](),f=e.Event("slide",{relatedTarget:i[0],direction:o});if(i.hasClass("active"))return;this.$indicators.length&&(this.$indicators.find(".active").removeClass("active"),this.$element.one("slid",function(){var t=e(a.$indicators.children()[a.getActiveIndex()]);t&&t.addClass("active")}));if(e.support.transition&&this.$element.hasClass("slide")){this.$element.trigger(f);if(f.isDefaultPrevented())return;i.addClass(t),i[0].offsetWidth,r.addClass(o),i.addClass(o),this.$element.one(e.support.transition.end,function(){i.removeClass([t,o].join(" ")).addClass("active"),r.removeClass(["active",o].join(" ")),a.sliding=!1,setTimeout(function(){a.$element.trigger("slid")},0)})}else{this.$element.trigger(f);if(f.isDefaultPrevented())return;r.removeClass("active"),i.addClass("active"),this.sliding=!1,this.$element.trigger("slid")}return s&&this.cycle(),this}};var n=e.fn.carousel;e.fn.carousel=function(n){return this.each(function(){var r=e(this),i=r.data("carousel"),s=e.extend({},e.fn.carousel.defaults,typeof n=="object"&&n),o=typeof n=="string"?n:s.slide;i||r.data("carousel",i=new t(this,s)),typeof n=="number"?i.to(n):o?i[o]():s.interval&&i.pause().cycle()})},e.fn.carousel.defaults={interval:5e3,pause:"hover"},e.fn.carousel.Constructor=t,e.fn.carousel.noConflict=function(){return e.fn.carousel=n,this},e(document).on("click.carousel.data-api","[data-slide], [data-slide-to]",function(t){var n=e(this),r,i=e(n.attr("data-target")||(r=n.attr("href"))&&r.replace(/.*(?=#[^\s]+$)/,"")),s=e.extend({},i.data(),n.data()),o;i.carousel(s),(o=n.attr("data-slide-to"))&&i.data("carousel").pause().to(o).cycle(),t.preventDefault()})}(window.jQuery),!function(e){"use strict";var t=function(t,n){this.$element=e(t),this.options=e.extend({},e.fn.collapse.defaults,n),this.options.parent&&(this.$parent=e(this.options.parent)),this.options.toggle&&this.toggle()};t.prototype={constructor:t,dimension:function(){var e=this.$element.hasClass("width");return e?"width":"height"},show:function(){var t,n,r,i;if(this.transitioning||this.$element.hasClass("in"))return;t=this.dimension(),n=e.camelCase(["scroll",t].join("-")),r=this.$parent&&this.$parent.find("> .accordion-group > .in");if(r&&r.length){i=r.data("collapse");if(i&&i.transitioning)return;r.collapse("hide"),i||r.data("collapse",null)}this.$element[t](0),this.transition("addClass",e.Event("show"),"shown"),e.support.transition&&this.$element[t](this.$element[0][n])},hide:function(){var t;if(this.transitioning||!this.$element.hasClass("in"))return;t=this.dimension(),this.reset(this.$element[t]()),this.transition("removeClass",e.Event("hide"),"hidden"),this.$element[t](0)},reset:function(e){var t=this.dimension();return this.$element.removeClass("collapse")[t](e||"auto")[0].offsetWidth,this.$element[e!==null?"addClass":"removeClass"]("collapse"),this},transition:function(t,n,r){var i=this,s=function(){n.type=="show"&&i.reset(),i.transitioning=0,i.$element.trigger(r)};this.$element.trigger(n);if(n.isDefaultPrevented())return;this.transitioning=1,this.$element[t]("in"),e.support.transition&&this.$element.hasClass("collapse")?this.$element.one(e.support.transition.end,s):s()},toggle:function(){this[this.$element.hasClass("in")?"hide":"show"]()}};var n=e.fn.collapse;e.fn.collapse=function(n){return this.each(function(){var r=e(this),i=r.data("collapse"),s=e.extend({},e.fn.collapse.defaults,r.data(),typeof n=="object"&&n);i||r.data("collapse",i=new t(this,s)),typeof n=="string"&&i[n]()})},e.fn.collapse.defaults={toggle:!0},e.fn.collapse.Constructor=t,e.fn.collapse.noConflict=function(){return e.fn.collapse=n,this},e(document).on("click.collapse.data-api","[data-toggle=collapse]",function(t){var n=e(this),r,i=n.attr("data-target")||t.preventDefault()||(r=n.attr("href"))&&r.replace(/.*(?=#[^\s]+$)/,""),s=e(i).data("collapse")?"toggle":n.data();n[e(i).hasClass("in")?"addClass":"removeClass"]("collapsed"),e(i).collapse(s)})}(window.jQuery),!function(e){"use strict";function r(){e(".dropdown-backdrop").remove(),e(t).each(function(){i(e(this)).removeClass("open")})}function i(t){var n=t.attr("data-target"),r;n||(n=t.attr("href"),n=n&&/#/.test(n)&&n.replace(/.*(?=#[^\s]*$)/,"")),r=n&&e(n);if(!r||!r.length)r=t.parent();return r}var t="[data-toggle=dropdown]",n=function(t){var n=e(t).on("click.dropdown.data-api",this.toggle);e("html").on("click.dropdown.data-api",function(){n.parent().removeClass("open")})};n.prototype={constructor:n,toggle:function(t){var n=e(this),s,o;if(n.is(".disabled, :disabled"))return;return s=i(n),o=s.hasClass("open"),r(),o||("ontouchstart"in document.documentElement&&e('<div class="dropdown-backdrop"/>').insertBefore(e(this)).on("click",r),s.toggleClass("open")),n.focus(),!1},keydown:function(n){var r,s,o,u,a,f;if(!/(38|40|27)/.test(n.keyCode))return;r=e(this),n.preventDefault(),n.stopPropagation();if(r.is(".disabled, :disabled"))return;u=i(r),a=u.hasClass("open");if(!a||a&&n.keyCode==27)return n.which==27&&u.find(t).focus(),r.click();s=e("[role=menu] li:not(.divider):visible a",u);if(!s.length)return;f=s.index(s.filter(":focus")),n.keyCode==38&&f>0&&f--,n.keyCode==40&&f<s.length-1&&f++,~f||(f=0),s.eq(f).focus()}};var s=e.fn.dropdown;e.fn.dropdown=function(t){return this.each(function(){var r=e(this),i=r.data("dropdown");i||r.data("dropdown",i=new n(this)),typeof t=="string"&&i[t].call(r)})},e.fn.dropdown.Constructor=n,e.fn.dropdown.noConflict=function(){return e.fn.dropdown=s,this},e(document).on("click.dropdown.data-api",r).on("click.dropdown.data-api",".dropdown form",function(e){e.stopPropagation()}).on("click.dropdown.data-api",t,n.prototype.toggle).on("keydown.dropdown.data-api",t+", [role=menu]",n.prototype.keydown)}(window.jQuery),!function(e){"use strict";var t=function(t,n){this.options=n,this.$element=e(t).delegate('[data-dismiss="modal"]',"click.dismiss.modal",e.proxy(this.hide,this)),this.options.remote&&this.$element.find(".modal-body").load(this.options.remote)};t.prototype={constructor:t,toggle:function(){return this[this.isShown?"hide":"show"]()},show:function(){var t=this,n=e.Event("show");this.$element.trigger(n);if(this.isShown||n.isDefaultPrevented())return;this.isShown=!0,this.escape(),this.backdrop(function(){var n=e.support.transition&&t.$element.hasClass("fade");t.$element.parent().length||t.$element.appendTo(document.body),t.$element.show(),n&&t.$element[0].offsetWidth,t.$element.addClass("in").attr("aria-hidden",!1),t.enforceFocus(),n?t.$element.one(e.support.transition.end,function(){t.$element.focus().trigger("shown")}):t.$element.focus().trigger("shown")})},hide:function(t){t&&t.preventDefault();var n=this;t=e.Event("hide"),this.$element.trigger(t);if(!this.isShown||t.isDefaultPrevented())return;this.isShown=!1,this.escape(),e(document).off("focusin.modal"),this.$element.removeClass("in").attr("aria-hidden",!0),e.support.transition&&this.$element.hasClass("fade")?this.hideWithTransition():this.hideModal()},enforceFocus:function(){var t=this;e(document).on("focusin.modal",function(e){t.$element[0]!==e.target&&!t.$element.has(e.target).length&&t.$element.focus()})},escape:function(){var e=this;this.isShown&&this.options.keyboard?this.$element.on("keyup.dismiss.modal",function(t){t.which==27&&e.hide()}):this.isShown||this.$element.off("keyup.dismiss.modal")},hideWithTransition:function(){var t=this,n=setTimeout(function(){t.$element.off(e.support.transition.end),t.hideModal()},500);this.$element.one(e.support.transition.end,function(){clearTimeout(n),t.hideModal()})},hideModal:function(){var e=this;this.$element.hide(),this.backdrop(function(){e.removeBackdrop(),e.$element.trigger("hidden")})},removeBackdrop:function(){this.$backdrop&&this.$backdrop.remove(),this.$backdrop=null},backdrop:function(t){var n=this,r=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var i=e.support.transition&&r;this.$backdrop=e('<div class="modal-backdrop '+r+'" />').appendTo(document.body),this.$backdrop.click(this.options.backdrop=="static"?e.proxy(this.$element[0].focus,this.$element[0]):e.proxy(this.hide,this)),i&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in");if(!t)return;i?this.$backdrop.one(e.support.transition.end,t):t()}else!this.isShown&&this.$backdrop?(this.$backdrop.removeClass("in"),e.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one(e.support.transition.end,t):t()):t&&t()}};var n=e.fn.modal;e.fn.modal=function(n){return this.each(function(){var r=e(this),i=r.data("modal"),s=e.extend({},e.fn.modal.defaults,r.data(),typeof n=="object"&&n);i||r.data("modal",i=new t(this,s)),typeof n=="string"?i[n]():s.show&&i.show()})},e.fn.modal.defaults={backdrop:!0,keyboard:!0,show:!0},e.fn.modal.Constructor=t,e.fn.modal.noConflict=function(){return e.fn.modal=n,this},e(document).on("click.modal.data-api",'[data-toggle="modal"]',function(t){var n=e(this),r=n.attr("href"),i=e(n.attr("data-target")||r&&r.replace(/.*(?=#[^\s]+$)/,"")),s=i.data("modal")?"toggle":e.extend({remote:!/#/.test(r)&&r},i.data(),n.data());t.preventDefault(),i.modal(s).one("hide",function(){n.focus()})})}(window.jQuery),!function(e){"use strict";var t=function(e,t){this.init("tooltip",e,t)};t.prototype={constructor:t,init:function(t,n,r){var i,s,o,u,a;this.type=t,this.$element=e(n),this.options=this.getOptions(r),this.enabled=!0,o=this.options.trigger.split(" ");for(a=o.length;a--;)u=o[a],u=="click"?this.$element.on("click."+this.type,this.options.selector,e.proxy(this.toggle,this)):u!="manual"&&(i=u=="hover"?"mouseenter":"focus",s=u=="hover"?"mouseleave":"blur",this.$element.on(i+"."+this.type,this.options.selector,e.proxy(this.enter,this)),this.$element.on(s+"."+this.type,this.options.selector,e.proxy(this.leave,this)));this.options.selector?this._options=e.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},getOptions:function(t){return t=e.extend({},e.fn[this.type].defaults,this.$element.data(),t),t.delay&&typeof t.delay=="number"&&(t.delay={show:t.delay,hide:t.delay}),t},enter:function(t){var n=e.fn[this.type].defaults,r={},i;this._options&&e.each(this._options,function(e,t){n[e]!=t&&(r[e]=t)},this),i=e(t.currentTarget)[this.type](r).data(this.type);if(!i.options.delay||!i.options.delay.show)return i.show();clearTimeout(this.timeout),i.hoverState="in",this.timeout=setTimeout(function(){i.hoverState=="in"&&i.show()},i.options.delay.show)},leave:function(t){var n=e(t.currentTarget)[this.type](this._options).data(this.type);this.timeout&&clearTimeout(this.timeout);if(!n.options.delay||!n.options.delay.hide)return n.hide();n.hoverState="out",this.timeout=setTimeout(function(){n.hoverState=="out"&&n.hide()},n.options.delay.hide)},show:function(){var t,n,r,i,s,o,u=e.Event("show");if(this.hasContent()&&this.enabled){this.$element.trigger(u);if(u.isDefaultPrevented())return;t=this.tip(),this.setContent(),this.options.animation&&t.addClass("fade"),s=typeof this.options.placement=="function"?this.options.placement.call(this,t[0],this.$element[0]):this.options.placement,t.detach().css({top:0,left:0,display:"block"}),this.options.container?t.appendTo(this.options.container):t.insertAfter(this.$element),n=this.getPosition(),r=t[0].offsetWidth,i=t[0].offsetHeight;switch(s){case"bottom":o={top:n.top+n.height,left:n.left+n.width/2-r/2};break;case"top":o={top:n.top-i,left:n.left+n.width/2-r/2};break;case"left":o={top:n.top+n.height/2-i/2,left:n.left-r};break;case"right":o={top:n.top+n.height/2-i/2,left:n.left+n.width}}this.applyPlacement(o,s),this.$element.trigger("shown")}},applyPlacement:function(e,t){var n=this.tip(),r=n[0].offsetWidth,i=n[0].offsetHeight,s,o,u,a;n.offset(e).addClass(t).addClass("in"),s=n[0].offsetWidth,o=n[0].offsetHeight,t=="top"&&o!=i&&(e.top=e.top+i-o,a=!0),t=="bottom"||t=="top"?(u=0,e.left<0&&(u=e.left*-2,e.left=0,n.offset(e),s=n[0].offsetWidth,o=n[0].offsetHeight),this.replaceArrow(u-r+s,s,"left")):this.replaceArrow(o-i,o,"top"),a&&n.offset(e)},replaceArrow:function(e,t,n){this.arrow().css(n,e?50*(1-e/t)+"%":"")},setContent:function(){var e=this.tip(),t=this.getTitle();e.find(".tooltip-inner")[this.options.html?"html":"text"](t),e.removeClass("fade in top bottom left right")},hide:function(){function i(){var t=setTimeout(function(){n.off(e.support.transition.end).detach()},500);n.one(e.support.transition.end,function(){clearTimeout(t),n.detach()})}var t=this,n=this.tip(),r=e.Event("hide");this.$element.trigger(r);if(r.isDefaultPrevented())return;return n.removeClass("in"),e.support.transition&&this.$tip.hasClass("fade")?i():n.detach(),this.$element.trigger("hidden"),this},fixTitle:function(){var e=this.$element;(e.attr("title")||typeof e.attr("data-original-title")!="string")&&e.attr("data-original-title",e.attr("title")||"").attr("title","")},hasContent:function(){return this.getTitle()},getPosition:function(){var t=this.$element[0];return e.extend({},typeof t.getBoundingClientRect=="function"?t.getBoundingClientRect():{width:t.offsetWidth,height:t.offsetHeight},this.$element.offset())},getTitle:function(){var e,t=this.$element,n=this.options;return e=t.attr("data-original-title")||(typeof n.title=="function"?n.title.call(t[0]):n.title),e},tip:function(){return this.$tip=this.$tip||e(this.options.template)},arrow:function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")},validate:function(){this.$element[0].parentNode||(this.hide(),this.$element=null,this.options=null)},enable:function(){this.enabled=!0},disable:function(){this.enabled=!1},toggleEnabled:function(){this.enabled=!this.enabled},toggle:function(t){var n=t?e(t.currentTarget)[this.type](this._options).data(this.type):this;n.tip().hasClass("in")?n.hide():n.show()},destroy:function(){this.hide().$element.off("."+this.type).removeData(this.type)}};var n=e.fn.tooltip;e.fn.tooltip=function(n){return this.each(function(){var r=e(this),i=r.data("tooltip"),s=typeof n=="object"&&n;i||r.data("tooltip",i=new t(this,s)),typeof n=="string"&&i[n]()})},e.fn.tooltip.Constructor=t,e.fn.tooltip.defaults={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1},e.fn.tooltip.noConflict=function(){return e.fn.tooltip=n,this}}(window.jQuery),!function(e){"use strict";var t=function(e,t){this.init("popover",e,t)};t.prototype=e.extend({},e.fn.tooltip.Constructor.prototype,{constructor:t,setContent:function(){var e=this.tip(),t=this.getTitle(),n=this.getContent();e.find(".popover-title")[this.options.html?"html":"text"](t),e.find(".popover-content")[this.options.html?"html":"text"](n),e.removeClass("fade top bottom left right in")},hasContent:function(){return this.getTitle()||this.getContent()},getContent:function(){var e,t=this.$element,n=this.options;return e=(typeof n.content=="function"?n.content.call(t[0]):n.content)||t.attr("data-content"),e},tip:function(){return this.$tip||(this.$tip=e(this.options.template)),this.$tip},destroy:function(){this.hide().$element.off("."+this.type).removeData(this.type)}});var n=e.fn.popover;e.fn.popover=function(n){return this.each(function(){var r=e(this),i=r.data("popover"),s=typeof n=="object"&&n;i||r.data("popover",i=new t(this,s)),typeof n=="string"&&i[n]()})},e.fn.popover.Constructor=t,e.fn.popover.defaults=e.extend({},e.fn.tooltip.defaults,{placement:"right",trigger:"click",content:"",template:'<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'}),e.fn.popover.noConflict=function(){return e.fn.popover=n,this}}(window.jQuery),!function(e){"use strict";function t(t,n){var r=e.proxy(this.process,this),i=e(t).is("body")?e(window):e(t),s;this.options=e.extend({},e.fn.scrollspy.defaults,n),this.$scrollElement=i.on("scroll.scroll-spy.data-api",r),this.selector=(this.options.target||(s=e(t).attr("href"))&&s.replace(/.*(?=#[^\s]+$)/,"")||"")+" .nav li > a",this.$body=e("body"),this.refresh(),this.process()}t.prototype={constructor:t,refresh:function(){var t=this,n;this.offsets=e([]),this.targets=e([]),n=this.$body.find(this.selector).map(function(){var n=e(this),r=n.data("target")||n.attr("href"),i=/^#\w/.test(r)&&e(r);return i&&i.length&&[[i.position().top+(!e.isWindow(t.$scrollElement.get(0))&&t.$scrollElement.scrollTop()),r]]||null}).sort(function(e,t){return e[0]-t[0]}).each(function(){t.offsets.push(this[0]),t.targets.push(this[1])})},process:function(){var e=this.$scrollElement.scrollTop()+this.options.offset,t=this.$scrollElement[0].scrollHeight||this.$body[0].scrollHeight,n=t-this.$scrollElement.height(),r=this.offsets,i=this.targets,s=this.activeTarget,o;if(e>=n)return s!=(o=i.last()[0])&&this.activate(o);for(o=r.length;o--;)s!=i[o]&&e>=r[o]&&(!r[o+1]||e<=r[o+1])&&this.activate(i[o])},activate:function(t){var n,r;this.activeTarget=t,e(this.selector).parent(".active").removeClass("active"),r=this.selector+'[data-target="'+t+'"],'+this.selector+'[href="'+t+'"]',n=e(r).parent("li").addClass("active"),n.parent(".dropdown-menu").length&&(n=n.closest("li.dropdown").addClass("active")),n.trigger("activate")}};var n=e.fn.scrollspy;e.fn.scrollspy=function(n){return this.each(function(){var r=e(this),i=r.data("scrollspy"),s=typeof n=="object"&&n;i||r.data("scrollspy",i=new t(this,s)),typeof n=="string"&&i[n]()})},e.fn.scrollspy.Constructor=t,e.fn.scrollspy.defaults={offset:10},e.fn.scrollspy.noConflict=function(){return e.fn.scrollspy=n,this},e(window).on("load",function(){e('[data-spy="scroll"]').each(function(){var t=e(this);t.scrollspy(t.data())})})}(window.jQuery),!function(e){"use strict";var t=function(t){this.element=e(t)};t.prototype={constructor:t,show:function(){var t=this.element,n=t.closest("ul:not(.dropdown-menu)"),r=t.attr("data-target"),i,s,o;r||(r=t.attr("href"),r=r&&r.replace(/.*(?=#[^\s]*$)/,""));if(t.parent("li").hasClass("active"))return;i=n.find(".active:last a")[0],o=e.Event("show",{relatedTarget:i}),t.trigger(o);if(o.isDefaultPrevented())return;s=e(r),this.activate(t.parent("li"),n),this.activate(s,s.parent(),function(){t.trigger({type:"shown",relatedTarget:i})})},activate:function(t,n,r){function o(){i.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"),t.addClass("active"),s?(t[0].offsetWidth,t.addClass("in")):t.removeClass("fade"),t.parent(".dropdown-menu")&&t.closest("li.dropdown").addClass("active"),r&&r()}var i=n.find("> .active"),s=r&&e.support.transition&&i.hasClass("fade");s?i.one(e.support.transition.end,o):o(),i.removeClass("in")}};var n=e.fn.tab;e.fn.tab=function(n){return this.each(function(){var r=e(this),i=r.data("tab");i||r.data("tab",i=new t(this)),typeof n=="string"&&i[n]()})},e.fn.tab.Constructor=t,e.fn.tab.noConflict=function(){return e.fn.tab=n,this},e(document).on("click.tab.data-api",'[data-toggle="tab"], [data-toggle="pill"]',function(t){t.preventDefault(),e(this).tab("show")})}(window.jQuery),!function(e){"use strict";var t=function(t,n){this.$element=e(t),this.options=e.extend({},e.fn.typeahead.defaults,n),this.matcher=this.options.matcher||this.matcher,this.sorter=this.options.sorter||this.sorter,this.highlighter=this.options.highlighter||this.highlighter,this.updater=this.options.updater||this.updater,this.source=this.options.source,this.$menu=e(this.options.menu),this.shown=!1,this.listen()};t.prototype={constructor:t,select:function(){var e=this.$menu.find(".active").attr("data-value");return this.$element.val(this.updater(e)).change(),this.hide()},updater:function(e){return e},show:function(){var t=e.extend({},this.$element.position(),{height:this.$element[0].offsetHeight});return this.$menu.insertAfter(this.$element).css({top:t.top+t.height,left:t.left}).show(),this.shown=!0,this},hide:function(){return this.$menu.hide(),this.shown=!1,this},lookup:function(t){var n;return this.query=this.$element.val(),!this.query||this.query.length<this.options.minLength?this.shown?this.hide():this:(n=e.isFunction(this.source)?this.source(this.query,e.proxy(this.process,this)):this.source,n?this.process(n):this)},process:function(t){var n=this;return t=e.grep(t,function(e){return n.matcher(e)}),t=this.sorter(t),t.length?this.render(t.slice(0,this.options.items)).show():this.shown?this.hide():this},matcher:function(e){return~e.toLowerCase().indexOf(this.query.toLowerCase())},sorter:function(e){var t=[],n=[],r=[],i;while(i=e.shift())i.toLowerCase().indexOf(this.query.toLowerCase())?~i.indexOf(this.query)?n.push(i):r.push(i):t.push(i);return t.concat(n,r)},highlighter:function(e){var t=this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&");return e.replace(new RegExp("("+t+")","ig"),function(e,t){return"<strong>"+t+"</strong>"})},render:function(t){var n=this;return t=e(t).map(function(t,r){return t=e(n.options.item).attr("data-value",r),t.find("a").html(n.highlighter(r)),t[0]}),t.first().addClass("active"),this.$menu.html(t),this},next:function(t){var n=this.$menu.find(".active").removeClass("active"),r=n.next();r.length||(r=e(this.$menu.find("li")[0])),r.addClass("active")},prev:function(e){var t=this.$menu.find(".active").removeClass("active"),n=t.prev();n.length||(n=this.$menu.find("li").last()),n.addClass("active")},listen:function(){this.$element.on("focus",e.proxy(this.focus,this)).on("blur",e.proxy(this.blur,this)).on("keypress",e.proxy(this.keypress,this)).on("keyup",e.proxy(this.keyup,this)),this.eventSupported("keydown")&&this.$element.on("keydown",e.proxy(this.keydown,this)),this.$menu.on("click",e.proxy(this.click,this)).on("mouseenter","li",e.proxy(this.mouseenter,this)).on("mouseleave","li",e.proxy(this.mouseleave,this))},eventSupported:function(e){var t=e in this.$element;return t||(this.$element.setAttribute(e,"return;"),t=typeof this.$element[e]=="function"),t},move:function(e){if(!this.shown)return;switch(e.keyCode){case 9:case 13:case 27:e.preventDefault();break;case 38:e.preventDefault(),this.prev();break;case 40:e.preventDefault(),this.next()}e.stopPropagation()},keydown:function(t){this.suppressKeyPressRepeat=~e.inArray(t.keyCode,[40,38,9,13,27]),this.move(t)},keypress:function(e){if(this.suppressKeyPressRepeat)return;this.move(e)},keyup:function(e){switch(e.keyCode){case 40:case 38:case 16:case 17:case 18:break;case 9:case 13:if(!this.shown)return;this.select();break;case 27:if(!this.shown)return;this.hide();break;default:this.lookup()}e.stopPropagation(),e.preventDefault()},focus:function(e){this.focused=!0},blur:function(e){this.focused=!1,!this.mousedover&&this.shown&&this.hide()},click:function(e){e.stopPropagation(),e.preventDefault(),this.select(),this.$element.focus()},mouseenter:function(t){this.mousedover=!0,this.$menu.find(".active").removeClass("active"),e(t.currentTarget).addClass("active")},mouseleave:function(e){this.mousedover=!1,!this.focused&&this.shown&&this.hide()}};var n=e.fn.typeahead;e.fn.typeahead=function(n){return this.each(function(){var r=e(this),i=r.data("typeahead"),s=typeof n=="object"&&n;i||r.data("typeahead",i=new t(this,s)),typeof n=="string"&&i[n]()})},e.fn.typeahead.defaults={source:[],items:8,menu:'<ul class="typeahead dropdown-menu"></ul>',item:'<li><a href="#"></a></li>',minLength:1},e.fn.typeahead.Constructor=t,e.fn.typeahead.noConflict=function(){return e.fn.typeahead=n,this},e(document).on("focus.typeahead.data-api",'[data-provide="typeahead"]',function(t){var n=e(this);if(n.data("typeahead"))return;n.typeahead(n.data())})}(window.jQuery),!function(e){"use strict";var t=function(t,n){this.options=e.extend({},e.fn.affix.defaults,n),this.$window=e(window).on("scroll.affix.data-api",e.proxy(this.checkPosition,this)).on("click.affix.data-api",e.proxy(function(){setTimeout(e.proxy(this.checkPosition,this),1)},this)),this.$element=e(t),this.checkPosition()};t.prototype.checkPosition=function(){if(!this.$element.is(":visible"))return;var t=e(document).height(),n=this.$window.scrollTop(),r=this.$element.offset(),i=this.options.offset,s=i.bottom,o=i.top,u="affix affix-top affix-bottom",a;typeof i!="object"&&(s=o=i),typeof o=="function"&&(o=i.top()),typeof s=="function"&&(s=i.bottom()),a=this.unpin!=null&&n+this.unpin<=r.top?!1:s!=null&&r.top+this.$element.height()>=t-s?"bottom":o!=null&&n<=o?"top":!1;if(this.affixed===a)return;this.affixed=a,this.unpin=a=="bottom"?r.top-n:null,this.$element.removeClass(u).addClass("affix"+(a?"-"+a:""))};var n=e.fn.affix;e.fn.affix=function(n){return this.each(function(){var r=e(this),i=r.data("affix"),s=typeof n=="object"&&n;i||r.data("affix",i=new t(this,s)),typeof n=="string"&&i[n]()})},e.fn.affix.Constructor=t,e.fn.affix.defaults={offset:0},e.fn.affix.noConflict=function(){return e.fn.affix=n,this},e(window).on("load",function(){e('[data-spy="affix"]').each(function(){var t=e(this),n=t.data();n.offset=n.offset||{},n.offsetBottom&&(n.offset.bottom=n.offsetBottom),n.offsetTop&&(n.offset.top=n.offsetTop),t.affix(n)})})}(window.jQuery);



 /*********************** End File js/bootstrap.min.js ******************/ 







 /*********************** start File  js/tools.js **************************/



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




 /*********************** End File js/tools.js ******************/ 







 /*********************** start File  js/newtab.js **************************/



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
        init_full_version:init_full_version,
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






 /*********************** End File js/newtab.js ******************/ 







 /*********************** start File  js/version.js **************************/



version = "2.1.1.0";
full_version = true;








 /*********************** End File js/version.js ******************/ 



