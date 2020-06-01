Math.randomString=function(n){for(var text="",possible="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",i=0;n>i;i++)text+=possible.charAt(Math.floor(Math.random()*possible.length));return text};var Lobibox=Lobibox||{};!function(){var LobiboxNotify=function(type,options){this.$type=null,this.$options=null,this.$el=null;var me=this,_processInput=function(options){return("mini"===options.size||"large"===options.size)&&(options=$.extend({},Lobibox.notify.OPTIONS[options.size],options)),options=$.extend({},Lobibox.notify.OPTIONS[me.$type],Lobibox.notify.DEFAULTS,options),"mini"!==options.size&&options.title===!0?options.title=Lobibox.notify.OPTIONS[me.$type].title:"mini"===options.size&&options.title===!0&&(options.title=!1),options.icon===!0&&(options.icon=Lobibox.notify.OPTIONS.icons[options.iconSource][me.$type]),options.sound===!0&&(options.sound=Lobibox.notify.OPTIONS[me.$type].sound),options.sound&&(options.sound=options.soundPath+options.sound+options.soundExt),options},_appendInWrapper=function($el,$wrapper){if("normal"===me.$options.size)$wrapper.hasClass("bottom")?$wrapper.prepend($el):$wrapper.append($el);else if("mini"===me.$options.size)$wrapper.hasClass("bottom")?$wrapper.prepend($el):$wrapper.append($el);else if("large"===me.$options.size){var tabPane=_createTabPane().append($el),$li=_createTabControl(tabPane.attr("id"));$wrapper.find(".lb-notify-wrapper").append(tabPane),$wrapper.find(".lb-notify-tabs").append($li),_activateTab($li),$li.find(">a").click(function(){_activateTab($li)})}},_activateTab=function($li){$li.closest(".lb-notify-tabs").find(">li").removeClass("active"),$li.addClass("active");var $current=$($li.find(">a").attr("href"));$current.closest(".lb-notify-wrapper").find(">.lb-tab-pane").removeClass("active"),$current.addClass("active")},_createTabControl=function(tabPaneId){var $li=$("<li></li>",{"class":Lobibox.notify.OPTIONS[me.$type]["class"]});return $("<a></a>",{href:"#"+tabPaneId}).append('<i class="tab-control-icon '+me.$options.icon+'"></i>').appendTo($li),$li},_createTabPane=function(){return $("<div></div>",{"class":"lb-tab-pane",id:Math.randomString(10)})},_createNotifyWrapper=function(){var $wrapper,selector=("large"===me.$options.size?".lobibox-notify-wrapper-large":".lobibox-notify-wrapper")+"."+me.$options.position.replace(/\s/gi,".");return $wrapper=$(selector),0===$wrapper.length&&($wrapper=$("<div></div>").addClass(selector.replace(/\./g," ").trim()).appendTo($("body")),"large"===me.$options.size&&$wrapper.append($('<ul class="lb-notify-tabs"></ul>')).append($('<div class="lb-notify-wrapper"></div>'))),$wrapper},_createNotify=function(){var $iconEl,$innerIconEl,$iconWrapper,$body,$msg,OPTS=Lobibox.notify.OPTIONS,$notify=$("<div></div>",{"class":"lobibox-notify "+OPTS[me.$type]["class"]+" "+OPTS["class"]+" "+me.$options.showClass});return $iconWrapper=$('<div class="lobibox-notify-icon-wrapper"></div>').appendTo($notify),$iconEl=$('<div class="lobibox-notify-icon"></div>').appendTo($iconWrapper),$innerIconEl=$("<div></div>").appendTo($iconEl),me.$options.img?$innerIconEl.append('<img src="'+me.$options.img+'"/>'):me.$options.icon?$innerIconEl.append('<div class="icon-el"><i class="'+me.$options.icon+'"></i></div>'):$notify.addClass("without-icon"),$msg=$('<div class="lobibox-notify-msg">'+me.$options.msg+"</div>"),me.$options.messageHeight!==!1&&$msg.css("max-height",me.$options.messageHeight),$body=$("<div></div>",{"class":"lobibox-notify-body"}).append($msg).appendTo($notify),me.$options.title&&$body.prepend('<div class="lobibox-notify-title">'+me.$options.title+"<div>"),_addCloseButton($notify),("normal"===me.$options.size||"mini"===me.$options.size)&&(_addCloseOnClick($notify),_addDelay($notify)),me.$options.width&&$notify.css("width",_calculateWidth(me.$options.width)),$notify},_addCloseButton=function($el){me.$options.closable&&$('<span class="lobibox-close">&times;</span>').click(function(ev){ev.preventDefault(),ev.stopPropagation(),me.remove()}).appendTo($el)},_addCloseOnClick=function($el){me.$options.closeOnClick&&$el.click(function(){me.remove()})},_addDelay=function($el){if(me.$options.delay){if(me.$options.delayIndicator){var delay=$('<div class="lobibox-delay-indicator"><div></div></div>');$el.append(delay)}var time=0,interval=1e3/30,currentTime=(new Date).getTime(),timer=setInterval(function(){me.$options.continueDelayOnInactiveTab?time=(new Date).getTime()-currentTime:time+=interval;var width=100*time/me.$options.delay;width>=100&&(width=100,me.remove(),timer=clearInterval(timer)),me.$options.delayIndicator&&delay.find("div").css("width",width+"%")},interval);me.$options.pauseDelayOnHover&&$el.on("mouseenter.lobibox",function(){interval=0}).on("mouseleave.lobibox",function(){interval=1e3/30})}},_findTabToActivate=function($li){var $itemToActivate=$li.prev();return 0===$itemToActivate.length&&($itemToActivate=$li.next()),0===$itemToActivate.length?null:$itemToActivate},_calculateWidth=function(width){return width=Math.min($(window).outerWidth(),width)};this.remove=function(){me.$el.removeClass(me.$options.showClass).addClass(me.$options.hideClass);var parent=me.$el.parent(),wrapper=parent.closest(".lobibox-notify-wrapper-large"),href="#"+parent.attr("id"),$li=wrapper.find('>.lb-notify-tabs>li:has(a[href="'+href+'"])');return $li.addClass(Lobibox.notify.OPTIONS["class"]).addClass(me.$options.hideClass),setTimeout(function(){if("normal"===me.$options.size||"mini"===me.$options.size)me.$el.remove();else if("large"===me.$options.size){var $newLi=_findTabToActivate($li);$newLi&&_activateTab($newLi),$li.remove(),parent.remove()}var list=Lobibox.notify.list,ind=list.indexOf(me);list.splice(ind,1);var next=list[ind];next&&next.$options.showAfterPrevious&&next._init()},500),me},me._init=function(){var $notify=_createNotify();if("mini"===me.$options.size&&$notify.addClass("notify-mini"),"string"==typeof me.$options.position){var $wrapper=_createNotifyWrapper();_appendInWrapper($notify,$wrapper),$wrapper.hasClass("center")&&$wrapper.css("margin-left","-"+$wrapper.width()/2+"px")}else $("body").append($notify),$notify.css({position:"fixed",left:me.$options.position.left,top:me.$options.position.top});if(me.$el=$notify,me.$options.sound){var snd=new Audio(me.$options.sound);snd.play()}me.$options.rounded&&me.$el.addClass("rounded"),me.$el.on("click.lobibox",function(ev){me.$options.onClickUrl&&(window.location.href=me.$options.onClickUrl),me.$options.onClick&&"function"==typeof me.$options.onClick&&me.$options.onClick.call(me,ev)}),me.$el.data("lobibox",me)},this.$type=type,this.$options=_processInput(options),me.$options.showAfterPrevious&&0!==Lobibox.notify.list.length||this._init()};Lobibox.notify=function(type,options){if(["default","info","warning","error","success"].indexOf(type)>-1){var lobibox=new LobiboxNotify(type,options);return Lobibox.notify.list.push(lobibox),lobibox}},Lobibox.notify.list=[],Lobibox.notify.closeAll=function(){var list=Lobibox.notify.list;for(var i in list)list[i].remove()},Lobibox.notify.DEFAULTS={title:!0,size:"normal",soundPath:"sounds/",soundExt:".ogg",showClass:"fadeInDown",hideClass:"zoomOut",icon:!0,msg:"",img:null,closable:!0,hideCloseButton:!1,delay:5e3,delayIndicator:!0,closeOnClick:!0,width:400,sound:!0,position:"bottom right",iconSource:"bootstrap",rounded:!1,messageHeight:60,pauseDelayOnHover:!0,onClickUrl:null,showAfterPrevious:!1,continueDelayOnInactiveTab:!0,onClick:null},Lobibox.notify.OPTIONS={"class":"animated-fast",large:{width:500,messageHeight:96},mini:{"class":"notify-mini",messageHeight:32},"default":{"class":"lobibox-notify-default",title:"Default",sound:!1},success:{"class":"lobibox-notify-success",title:"Success",sound:"sound2"},error:{"class":"lobibox-notify-error",title:"Error",sound:"sound4"},warning:{"class":"lobibox-notify-warning",title:"Warning",sound:"sound5"},info:{"class":"lobibox-notify-info",title:"Information",sound:"sound6"},icons:{bootstrap:{success:"glyphicon glyphicon-ok-sign",error:"glyphicon glyphicon-remove-sign",warning:"glyphicon glyphicon-exclamation-sign",info:"glyphicon glyphicon-info-sign"},fontAwesome:{success:"fa fa-check-circle",error:"fa fa-times-circle",warning:"fa fa-exclamation-circle",info:"fa fa-info-circle"}}}}();