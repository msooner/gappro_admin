$(document).ready(function() {
  // jquery ui
  $("#default-slider").slider();

  $("#eq-slider > span").each(function() {
    var value = parseInt( $( this ).text(), 10 );
    $( this ).empty().slider({
      value: value,
      range: "min",
      animate: true,
      orientation: "vertical"
    });
  });

  $("#slider-range").slider({
      range: true,
      min: 0,
      max: 500,
      values: [ 75, 300 ],
      slide: function( event, ui ) {
        $( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
      }
  });
  
  $("#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) + " - $" + $( "#slider-range" ).slider( "values", 1 ) );

  $("#slider-increase").slider({
    value:100,
    min: 0,
    max: 500,
    step: 50,
    slide: function( event, ui ) {
      $("#inc-amount").val( "$" + ui.value );
    }
  });

  $("#inc-amount").val( "$" + $( "#slider-increase" ).slider("value"));

  //progressbar
  $( "#progressbar" ).progressbar({
    value: 45
  });

  // spiner
  $("#spinner").spinner();
  $("#datepicker").datepicker({
    showButtonPanel: true,
    numberOfMonths: 3
  });
  
  $("#accordion").accordion();
  $("#tabs").tabs();

  $("#btn-confirm").bind('click', function() {
    $("#dialog-confirm").dialog({
    resizable: false,
    height:140,
    modal: true,
    buttons: {
      "Delete all items": function() {
      $( this ).dialog( "close" );
    },
    Cancel: function() {
      $( this ).dialog( "close" );
      }
    }
  });
  });
});  