$(document).ready(function() {
  // smart tab
  $('#tabs1').smartTab({autoProgress: false,stopOnFocus:true,transitionEffect:'vSlide'});

  // smart wizard
  $('#wizard').smartWizard();

  // button actions
  $("#btn-top, #btn-bottom, #btn-horizontal, #btn-vertical").bind('click', function() { 
  	load_css($(this).attr('data-css'));
  });
});  