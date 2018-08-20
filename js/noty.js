$(document).ready(function() {
  // growl messages
  $("#btn-show-growl-default").click(function() { show_growl_default(); });
  $("#btn-show-growl-success").click(function() { show_growl_success(); });
  $("#btn-show-growl-error").click(function() { show_growl_error(); });
  $("#btn-show-growl-info").click(function() { show_growl_info(); });

  $("#btn-show-growl-left").click(function() { show_growl_left(); });
  $("#btn-show-growl-center").click(function() { show_growl_center(); });
  $("#btn-show-growl-right").click(function() { show_growl_right(); });

  $("#btn-show-growl-1").click(function() { show_growl_1(); });
  $("#btn-show-growl-2").click(function() { show_growl_2(); });
  $("#btn-show-growl-3").click(function() { show_growl_3(); });
});  

// growl notifications
function show_growl_default() {
  $.bootstrapGrowl("<img src='img/icons/lightbulb.png' alt='' /> Hey, This is a default message.");
};

function show_growl_success() {
  $.bootstrapGrowl("<img src='img/icons/lock.png' alt='' /> This is success message.", { type: 'success' });
}

function show_growl_error() {
  $.bootstrapGrowl("<img src='img/icons/heart.png' alt='' /> Error message, danger, no dismiss!", {
      type: 'error',
      allow_dismiss: false
  });
}

function show_growl_info() {  
  $.bootstrapGrowl("<img src='img/icons/exclamation.png' alt='' /> Info message, align right!", {
      type: 'info'
  });
}

function show_growl_left() {  
  $.bootstrapGrowl("<img src='img/icons/exclamation.png' alt='' /> Info message, align left!", {
      type: 'info',
      align: 'left'
  });
}

function show_growl_center() {  
  $.bootstrapGrowl("<img src='img/icons/exclamation.png' alt='' /> Info message, align center!", {
      type: 'info',
      align: 'center'
  });
}

function show_growl_right() {  
  $.bootstrapGrowl("<img src='img/icons/exclamation.png' alt='' /> Info message, align right!", {
      type: 'info',
      align: 'right'
  });
}

function show_growl_1() {  
  setTimeout(function() {
      $.bootstrapGrowl("<img src='img/icons/exclamation.png' alt='' /> Info message, timeout = 1!", {
          type: 'info',
          align: 'right'
      });
  }, 1000);
}

function show_growl_2() {  
  setTimeout(function() {
      $.bootstrapGrowl("<img src='img/icons/exclamation.png' alt='' /> Info message, timeout = 2!", {
          type: 'info',
          align: 'right'
      });
  }, 2000);
}

function show_growl_3() {  
  setTimeout(function() {
      $.bootstrapGrowl("<img src='img/icons/exclamation.png' alt='' /> Info message, timeout = 3!", {
          type: 'info',
          align: 'right'
      });
  }, 3000);
}