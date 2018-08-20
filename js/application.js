// ATTENTION: 
// DON'T INCLUDE THIS FILE IN YOUR PROJECT
// THIS FILE IS ONFY FOR GAPPRO PAGES
// NOT THE CORE UTILITY

function load_css(path) {
	var element = document.createElement("link");  
    element.setAttribute('rel', 'stylesheet');  
    element.setAttribute('type', 'text/css');  
    element.setAttribute('href', path);  
    document.getElementsByTagName('head')[0].appendChild(element);  
}

function load_widget_bg(el, color_name) {
	var node = $(el);

	class_array = ['pink', 'green', 'grey', 'white', 'orange', 'blue', 'gold'];
	for(idx in class_array) {
		node.parent().parent().removeClass(class_array[idx] + '-bg-linear');
	}

	node.parent().parent().addClass(color_name + '-bg-linear');
}

$(document).ready(function() {
	// load menu style
	var menu_css_file = $.jStorage.get("menu_css_file");
	if(menu_css_file && menu_css_file.length > 0) {
		load_css(menu_css_file);
	}

	$("#config-box #backgrounds li a").each(function() {
		$(this).bind("click", function() {
			var bg = $(this).find("img").attr("src");
			$("#main_wrapper").css("background", "url('" + bg + "')");
		});
	});

	$("#config-box #menu-backgrounds li a").each(function() {
		$(this).bind("click", function() {
			var bg = $(this).find("img").attr("src");
			$("#icon-menu").css("background", "url('" + bg + "')");
		});
	});

	$("#menu_colors li a").each(function() { 
		$(this).click(function() {
			var css_file = "css/menu_styles/" + $(this).attr("data-color") + ".css";
			load_css(css_file);
			$.jStorage.set("menu_css_file", css_file);
		});

		var color = $(this).attr("data-color");
		if(color == 'default') color = 'black';
		$(this).css("color", color);
	});

	$("#menu-trigger a").each(function() {
		$(this).bind('click', function() {
			CONFIG['menu_sub_trigger'] = $(this).attr('data-trigger');
			$("#icon-menu > ul > li > a").each(function(){ 
				$(this).unbind('click');
				$(this).unbind('mouseover');
				hack_sub_menu($(this)); 
			});
			$.bootstrapGrowl("<img src='img/icons/exclamation.png' alt='' /> Changed Successfully!", {
		    	type: 'info',
		    	align: 'left'
		  	});
		});
	});

	// guide tour
	$("#tour").css('display', 'none');
	$("#btn-tour, #btn-tour-take").bind("click", function(e) {
		$("#tour").joyride({
			autoStart: true,
			'tipLocation': 'top'
		});
		e.preventDefault();
	});

	//top
	$(window).scroll(function () {
		if ($(this).scrollTop() > 200) {
			$('#back-top').fadeIn();
		} else {
			$('#back-top').fadeOut();
		}
	});

	// scroll body to 0px on click
	$('#back-top a').click(function () {
		$('body, html').animate({
			scrollTop: 0
		}, 800);

		return false;
	});
});

$(window).resize(function() {
	if($("body").find(".bootstrap-growl.alert").length < 1) {
		$.bootstrapGrowl("<img src='img/icons/info.png' alt='' /> If content goes out of place when resizing, please refresh again.");
	}
});