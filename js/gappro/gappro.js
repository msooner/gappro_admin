/*-----------------------------------------------------

[Javascript Functoins]

    Project: Gappro Theme
    Version: 1.0 
    Last Change: 03/18/2013
    Assign to: Bob Wang

	0. polyfill
    1. widget drag-drop
    2. menuitem drag-drop
    3. widget actions
    4. menu collapse & expand
    5. menu filters
    6. functions

-----------------------------------------------------*/

// webshims
$.webshims.polyfill();

// widget drag features
/*
$(".widget .widget-header").each(function() { 
	var widget = $(this);

	widget.draggable({
		cursor: "move",
		revert: "invalid",
		snap: "#workspace",

		start: function() {
			// collapse when moving 
			$(this).parent().find(".widget-content").slideUp();
			$(this).css("z-index", 10000);
		},
		stop: function () {
			// expand when over, but it were be fadeIn
			$(this).parent().find(".widget-content").slideDown();	
		}
	});
});

$("#workspace").droppable({
	accept: ".widget-header",
	activeClass: "sidebar-active",
	hoverClass: "sidebar-hover",
	tolerance: 'touch',

	drop: function(event, ui) {
		var widget = ui.draggable.parent();
		add_to_sidebar(widget, widget.find(".widget-header h3").html());
		ui.draggable.draggable('option', 'revert', true);
	}
});
*/

if(CONFIG['enable_widget_workspace']) {
	$("#btn-restore-all").bind('click', function() {
		$("#workspace .btn").not("#btn-restore-all").each(function() { $(this).trigger('click'); });
	});
} else {
	$("#btn-restore-all").remove();
}

// menu drag features
if(CONFIG['enable_menuitem_drag']) {
	$("#icon-menu > ul > li > a > i").each(function() {
		var menuitem = $(this).parent();

		menuitem.draggable({
			cursor: "move", 
			revert: "invalid",
			snap: ".navbar-inner form.form-search"
		});
	});

	$(".navbar-inner form.form-search").droppable({
		accept: "#icon-menu > ul > li > a",
		activeClass: "menuitem-active",
		hoverClass: "menuitem-hover",
		tolerance: 'touch',

		drop: function(event, ui) {
			var menuitem = ui.draggable;
			add_to_favlinks(menuitem.clone());
			ui.draggable.draggable('option', 'revert', true);
		}
	});
} else {
	$("#icon-menu > ul > li > a > i").each(function() {
		$(this).css('cursor', 'pointer');
	});
}

// widget action controller
$(".widget").each(function() {
	// not only data-action
	$(this).find(".widget-header > a").wrapAll("<div class='pull-right'></div>");
});

$(".widget .widget-header > div > a[data-widget-action]").each(function() {
	var action_name = $(this).attr("data-widget-action").trim().toLowerCase();

	// class and href attr
	$(this).attr("href", "javascript:void(0)");

	switch(action_name) {
		case 'close':
			$(this).html("<i class='icon-remove'></i>");
			$(this).bind('click', function() {
				$(this).parent().parent().parent().slideUp();
			});
	        break;

		case 'hide':
	        $(this).html("<i class='icon-minus'></i>");
	        $(this).bind('click', function() {
				$(this).parent().parent().next("div").slideToggle();
				if($(this).html().trim().toLowerCase() == '<i class="icon-minus"></i>')
					$(this).html('<i class="icon-plus"></i>');
				else
					$(this).html('<i class="icon-minus"></i>');
			});
			break;

		case 'code':
			$(this).html("<i class='icon-legal'></i>");
			$(this).bind('click', function() {
				var html = $(this).parent().parent().parent().parent().html().trim();
				html = html.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
				var id = new Date().getTime().toString();
				$('<div id="' + id + '" class="modal hide fade" tabindex="-1" role="dialog"><div class="modal-body"><pre class="prettyprint lang-html linenums"></pre></div></div>').appendTo("body");
				html = style_html(html, 2, " ",  80);
				$("#" + id + " pre.prettyprint").html(html);
				prettyPrint();
				$("#" + id).modal();
				$("#" + id).on('hidden', function () {
					// remove from tree
					$(this).remove();
				});
			});
			break;

		case 'config':
			$(this).html('<i class="icon-cog"></i>');
			$(this).bind('click', function() {
				$("#" + $(this).attr("data-widget-box")).modal();
			});
	        break;

		case 'help':
			$(this).html('<i class="icon-question-sign"></i>');
			$(this).bind('click', function() {
				$("#" + $(this).attr("data-widget-box")).modal();
			});
	        break;
	        
	    case 'thumb':
	    	if(CONFIG['enable_widget_workspace']) {
				$(this).html('<i class="icon-arrow-left"></i>');
				$(this).bind('click', function() {
					add_to_sidebar($(this).parent().parent().parent(), $(this).parent().parent().find("h3").html());
				});
			} else {
				$(this).remove();
			}
	        break;
	    case 'full':
			$(this).html('<i class="icon-fullscreen"></i>');
			$(this).bind('click', function() {
				// safari bug when your using 2 monitors 
				// it get the master but your safari browser is on salve
				// var width = screen.width - 20;
				// var height = screen.height;
				var width = $(window).width();
				var height = $(window).height();

				if(!$(this).data('full')) {
					// save to restrore
					$(this).data('position', $(this).parent().parent().parent().css('position'));
					$(this).data('left', $(this).parent().parent().parent().css('left'));
					$(this).data('top', $(this).parent().parent().parent().css('top'));
					$(this).data('width', $(this).parent().parent().parent().css('width'));
					// $(this).data('height', $(this).parent().parent().parent().css('height'));
					$(this).data('background-color', $(this).parent().parent().parent().css('background-color'));
					$(this).data('z-index', $(this).parent().parent().parent().css('z-index'));

					// set fullscreen
					$(this).parent().parent().parent().fadeIn().css({
						'position': 'absolute', 
						'left' : '0px', 'top': '0px', 
						'width': width, 
						// 'height': height,
						'background-color': '#272727',
						'z-index': 9999
					});

					// flag it
					$(this).data('full', true);
				} else {
					$(this).parent().parent().parent().css({
						'position': $(this).data('position'), 
						'left' : $(this).data('left'), 'top': $(this).data('top'), 
						'width': $(this).data('width'), 'height': $(this).data('height'),
						'background-color': $(this).data('background-color'),
						'z-index': $(this).data('z-index')
					});

					// unflag it
					$(this).data('full', false);
				}
			});
	        break;        
	}
});

// menu collapse & expand
if(CONFIG['enable_menu_collapse']) { 
	$("#btn-menu-controller").bind('click', function() {
		var display;

		if($(this).html().trim() == '<span><i class="icon-angle-up"></i></span>') {
			$(this).html('<span><i class="icon-angle-down"></i></span>');
			display = "none";
		} else {
			$(this).html('<span><i class="icon-angle-up"></i></span>');
			display = "block";
		}

		$("#icon-menu > ul > li:nth-child(n+4)").each(function() {
			$(this).css("display", display);
		});
	});
} else {
	$("#btn-menu-controller").remove();
}

// menu filter
if(CONFIG['enable_menu_filter']) { 
	$("#menuitem-filter").bind('keyup', function(e) {
		var input = $("#menuitem-filter").val().trim().toLowerCase();

		if(e.keyCode == 27) {
			$("#menuitem-filter").val("");
			input = "";
		}

		$("#icon-menu > ul > li:nth-child(n+4)").each(function() {
			if(
				input.length > 0 &&
			  	(($(this).attr("data-keywords") || "").toLowerCase().indexOf(input) == -1) &&
			  	(($(this).find("a > span").html() || "").toLowerCase().indexOf(input) == -1)
			  ) 
				display = "none";
		 	else 
		 		display = "block";

			$(this).css('display', display);
		});
	});
} else {
	$("#menuitem-filter").parent().remove();
}

// menu avatar
if(!CONFIG['enable_menu_avatar']) { 
	$("#icon-menu > ul > li.circle").remove();
	$("#icon-menu > ul").css('margin-top', '2px');
}

// fix position for quick widget and sub-menus
var global_hover = null;
$("#icon-menu > ul > li > a").each(function(){ hack_sub_menu($(this)); });
function hack_sub_menu(menuitem){
	menuitem.bind(CONFIG['menu_sub_trigger'], function(e) {
		// var sidebar_margin = $("#main_wrapper").css("margin-left");
		// var sidebar_padding = $("#main_wrapper").css("padding-left");
		// var width = $(this).parent().width() * 1 + 
		// 			sidebar_margin.replace("px","") * 1 + 
		// 			sidebar_padding.replace("px", "") * 1;

		var width = $(this).parent().width() + 1;
		
		if($("#main_wrapper").width() <= 640) {
			width = 30;
		}

		$(this).next(".quick-widget, .sub-menus").each(function(){
			$(this).prev().addClass("parent-hover");
			$(this).addClass("sub-hover").css("left", width);

			if(global_hover && global_hover.html() != $(this).html()) {
				global_hover.removeClass("sub-hover");
				global_hover.prev().removeClass("parent-hover");
			}

			global_hover = $(this);
		});

		// cancel parent link
		if($(this).next(".sub-menus, .quick-widget").length > 0) {
			e.preventDefault();
		}
	});
}

$("#icon-menu").bind('mouseleave', function(e) {
	if(global_hover) {
		var timer = setTimeout(function() {
			global_hover.removeClass("sub-hover");
			global_hover.prev().removeClass("parent-hover");
		}, 1000);

		global_hover.bind('mouseenter', function() {
			clearTimeout(timer);
		});
	}
});

// load fav menus
load_fav_menus();

// tooltip
$("a[data-toggle=tooltip]").each(function() {
	// 
});
  
// popover 
$("a[data-toggle=popover]").each(function() {
	$(this).bind('mouseenter', function() {
		$(this).popover('show');
	});

	$(this).bind('mouseleave', function() {
		$(this).popover('hide');
	});
});

// place widget to workspace
function add_to_sidebar(widget, title, pos) {
	var id = widget.attr("id");
	if($("#workspace").css("display") == "none") return;
	if(!title) title = "Untitled Widget";

	if(!id || id.length == 0) {
		id = new Date().getTime().toString();
		widget.attr("id", id);
	}

	widget.fadeOut();
	$.bootstrapGrowl("<img src='img/icons/heart.png' alt='' /> You can restore it from sidebar.", {align: 'center'});
	
	$("#workspace").append("<a rel='widget-thumb' class='btn' id='thumb" + id + "' target-id='" + id + "' href='javascript:void(0)'><i class='icon-arrow-right'></i> " + title + "</a>");
	$("#thumb" + id).bind('click', function() {
		$("#" + $(this).attr("target-id")).fadeIn();
		// scroll to the widget's position
		$("html,body").animate({scrollTop: $("#" + $(this).attr("target-id")).offset().top}, 1000);
		$(this).remove();
	});
}

// clone menuitems and place to topbar
function add_to_favlinks(menuitem) {
	// change id
	menuitem.attr('id', new Date().getTime().toString());

	menuitem.addClass("btn").css({'left': 0, 'top': 0, 'margin-right': '4px'});
	menuitem.draggable({
		start: function(){$(this).remove();save_fav_menus();}
	});

	$.bootstrapGrowl("<img src='img/icons/heart.png' alt='' /> I'm persistent, you can drag again to remove me.", {align: 'center'});
	$(".navbar-inner form.form-search").append(menuitem);

	var outer_html = $('<div></div>').append(menuitem.clone()).html();

	// cross pages persist
	var fav_menus_str = $.jStorage.get("fav_menus_str");
	if(!fav_menus_str || fav_menus_str.length == 0)
		$.jStorage.set("fav_menus_str", outer_html);
	else 
		$.jStorage.set("fav_menus_str", fav_menus_str + "@" + outer_html);
}

// load fav menus
function load_fav_menus() {
	var fav_menus_str = $.jStorage.get("fav_menus_str");
	if(fav_menus_str && fav_menus_str.length > 0) {
		var array = $.jStorage.get("fav_menus_str").split("@");
		for(idx in array) {
			// console.debug(menuitem);
			var menuitem = $(array[idx]);
			menuitem.appendTo(".navbar-inner form.form-search");
			menuitem.draggable({
				start: function(){$(this).remove();save_fav_menus();}
			});
		}
	}
}

// reset fav menus str
function save_fav_menus() {
	var array = [];

	$(".navbar-inner form.form-search .ui-draggable").each(function() {
		var outer_html = $('<div></div>').append($(this).clone()).html();
		array.push(outer_html);
	});

	if(array.length > 0)
		$.jStorage.set("fav_menus_str", array.join("@"));
	else
		$.jStorage.deleteKey("fav_menus_str");
}