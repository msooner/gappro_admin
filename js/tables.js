$(document).ready(function() {
  var lb = $(".leaderboard").jqleaderboard();
  var lb_object = lb.data("leaderboard");
  lb_object.leaderboard_select('CA');

  $('#demo_table').dataTable({
     "sPaginationType": "full_numbers"
  });

  // excel table
  var data = [
    ["Year \\ Brand", "Kia", "Nissan", "Toyota", "Honda", "Kia", "Nissan", "Toyota", "Honda", "Kia", "Nissan", "Toyota", "Honda"],
    ["2008", 10, 11, 12, 13, 10, 11, 12, 13, 10, 11, 12, 13],
    ["2009", 20, 11, 14, 13, 20, 11, 14, 13, 20, 11, 14, 13],
    ["2010", 30, 15, 12, 13, 30, 15, 12, 13, 30, 15, 12, 13],
    ["2011", 10, 11, 12, 13, 10, 11, 12, 13, 10, 11, 12, 13],
    ["2012", 20, 11, 14, 13, 20, 11, 14, 13, 20, 11, 14, 13],
    ["2013", 30, 15, 12, 13, 30, 15, 12, 13, 30, 15, 12, 13]
  ];

  $("#excel_table").handsontable({
    data: data
  });
});