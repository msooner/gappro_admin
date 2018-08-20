var line_chart;
var area_chart;
var bar_chart;
var pie_chart;

$(document).ready(function() {
    $("span.pie").peity("pie");
    $(".line").peity("line");
    $(".bar").peity("bar");

    $(".bar-colours-1").peity("bar", {
      colours: ["red", "green", "blue"]
    });

    $(".bar-colours-2").peity("bar", {
      colours: function(value) {
        return value > 0 ? "green" : "red"
      }
    });

    $(".bar-colours-3").peity("bar", {
      colours: function(_, i, all) {
        var g = parseInt((i / all.length) * 255)
        return "rgb(255, " + g + ", 0)"
      }
    });

    $(".pie-colours-1").peity("pie", {
      colours: ["cyan", "magenta", "yellow", "black"]
    });

    $(".pie-colours-2").peity("pie", {
      colours: function(_, i, all) {
        var g = parseInt((i / all.length) * 255)
        return "rgb(255, " + g + ", 0)"
      }
    });

    $('.chart').easyPieChart({
       animate: 2000,
       lineWidth: 10,
       barColor: '#369'
    });

    $('.chart-info').easyPieChart({
       animate: 2000,
       lineWidth: 10,
       barColor: '#f29b36'
    });

    $('.chart-success').easyPieChart({
       animate: 2000,
       lineWidth: 10,
       barColor: '#54a954'
    });

    var updatingChart = $(".updating-chart").peity("line", { colour: '#f29b36', width: 100, height: 38 });

    setInterval(function() {
      var random = Math.round(Math.random() * 10)
      var values = updatingChart.text().split(",")
      values.shift()
      values.push(random)

      updatingChart
        .text(values.join(","))
        .change()
    }, 1000);

    // morris
    /* data stolen from http://howmanyleft.co.uk/vehicle/jaguar_e_type */
    var quarter_data = [
      {"period": "2011 Q3", "licensed": 3407, "sorned": 660},
      {"period": "2011 Q2", "licensed": 3351, "sorned": 629},
      {"period": "2011 Q1", "licensed": 3269, "sorned": 618},
      {"period": "2010 Q4", "licensed": 3246, "sorned": 661},
      {"period": "2010 Q3", "licensed": 3257, "sorned": 667},
      {"period": "2010 Q2", "licensed": 3248, "sorned": 627},
      {"period": "2010 Q1", "licensed": 3171, "sorned": 660},
      {"period": "2009 Q4", "licensed": 3171, "sorned": 676},
      {"period": "2009 Q3", "licensed": 3201, "sorned": 656},
      {"period": "2009 Q2", "licensed": 3215, "sorned": 622},
      {"period": "2009 Q1", "licensed": 3148, "sorned": 632},
      {"period": "2008 Q4", "licensed": 3155, "sorned": 681},
      {"period": "2008 Q3", "licensed": 3190, "sorned": 667},
      {"period": "2007 Q4", "licensed": 3226, "sorned": 620},
      {"period": "2006 Q4", "licensed": 3245, "sorned": null},
      {"period": "2005 Q4", "licensed": 3289, "sorned": null},
      {"period": "2004 Q4", "licensed": 3263, "sorned": null},
      {"period": "2003 Q4", "licensed": 3189, "sorned": null},
      {"period": "2002 Q4", "licensed": 3079, "sorned": null},
      {"period": "2001 Q4", "licensed": 3085, "sorned": null},
      {"period": "2000 Q4", "licensed": 3055, "sorned": null},
      {"period": "1999 Q4", "licensed": 3063, "sorned": null},
      {"period": "1998 Q4", "licensed": 2943, "sorned": null},
      {"period": "1997 Q4", "licensed": 2806, "sorned": null},
      {"period": "1996 Q4", "licensed": 2674, "sorned": null},
      {"period": "1995 Q4", "licensed": 1702, "sorned": null},
      {"period": "1994 Q4", "licensed": 1732, "sorned": null}
      ];
    Morris.Line({
      element: 'line_graph',
      data: quarter_data,
      xkey: 'period',
      ykeys: ['licensed', 'sorned'],
      labels: ['Licensed', 'SORN']
    });

    Morris.Area({
      element: 'area_graph',
      data: [
        {x: '2011 Q1', y: 3, z: 3},
        {x: '2011 Q2', y: 2, z: 0},
        {x: '2011 Q3', y: 0, z: 2},
        {x: '2011 Q4', y: 4, z: 4}
      ],
      xkey: 'x',
      ykeys: ['y', 'z'],
      labels: ['Y', 'Z']
    });

    Morris.Bar({
      element: 'bar_graph',
      data: [
        {x: '2011 Q1', y: 3, z: 2, a: 3},
        {x: '2011 Q2', y: 2, z: null, a: 1},
        {x: '2011 Q3', y: 0, z: 2, a: 4},
        {x: '2011 Q4', y: 2, z: 4, a: 3}
      ],
      xkey: 'x',
      ykeys: ['y', 'z', 'a'],
      labels: ['Y', 'Z', 'A'],
      barColors: [
        '#336699',
        '#f29b36',
        '#cb423c'
      ]
    });

    Morris.Donut({
      element: 'pie_graph',
      data: [
        {value: 70, label: 'foo'},
        {value: 15, label: 'bar'},
        {value: 10, label: 'baz'},
        {value: 5, label: 'A really really long label'}
      ],
      formatter: function (x) { return x + "%"}
    });

    Morris.Bar({
      element: 'stacked_bar',
      data: [
        {x: '2011 Q1', y: 3, z: 2, a: 3},
        {x: '2011 Q2', y: 2, z: null, a: 1},
        {x: '2011 Q3', y: 0, z: 2, a: 4},
        {x: '2011 Q4', y: 2, z: 4, a: 3}
      ],
      xkey: 'x',
      ykeys: ['y', 'z', 'a'],
      labels: ['Y', 'Z', 'A'],
      stacked: true
    });

    Morris.Bar({
      element: 'bar_colors',
        data: [
          {x: '2011 Q1', y: 0},
          {x: '2011 Q2', y: 1},
          {x: '2011 Q3', y: 2},
          {x: '2011 Q4', y: 3},
          {x: '2012 Q1', y: 4},
          {x: '2012 Q2', y: 5},
          {x: '2012 Q3', y: 6},
          {x: '2012 Q4', y: 7},
          {x: '2013 Q1', y: 8}
        ],
        xkey: 'x',
        ykeys: ['y'],
        labels: ['Y'],
        barColors: function (row, series, type) {
          if(type === 'bar') {
            var red = Math.ceil(255 * row.y / this.ymax);
            return 'rgb(' + red + ',0,0)';
          } else {
            return '#000';
          }
        }
    });

    Morris.Bar({
      element: 'no_axes',
      axes: false,
      data: [
        {x: '2011 Q1', y: 3, z: 2, a: 3},
        {x: '2011 Q2', y: 2, z: null, a: 1},
        {x: '2011 Q3', y: 0, z: 2, a: 4},
        {x: '2011 Q4', y: 2, z: 4, a: 3}
      ],
      xkey: 'x',
      ykeys: ['y', 'z', 'a'],
      labels: ['Y', 'Z', 'A']
    });

    Morris.Donut({
      element: 'pie_graph_colors',
      data: [
        {value: 70, label: 'foo'},
        {value: 15, label: 'bar'},
        {value: 10, label: 'baz'},
        {value: 5, label: 'A really really long label'}
      ],
      backgroundColor: '#000',
      labelColor: '#f29b36',
      colors: [
        '#272727',
        '#202020',
        '#1b1b1b',
        '#2a2a2a'
      ],
      formatter: function (x) { return x + "%"}
    });

    // vmap
    var areas = ['usa', 'russia', 'germany', 'france', 'europe', 'world'];
    var maps = ['usa_en', 'russia_en', 'germany_en', 'france_fr', 'europe_en', 'world_en'];
    
    for(idx in maps) {
      var id = "#" + areas[idx] + "_vmap";
      $(id).css('width', $(id).parent().parent().width());
      $(id).vectorMap({
        map: maps[idx],
        backgroundColor: '#272727',
        borderColor: '#202020',
        borderOpacity: 0.25,
        borderWidth: 1,
        color: '#999',
        enableZoom: true,
        hoverColor: '#666',
        hoverOpacity: null,
        normalizeFunction: 'linear',
        selectedColor: '#fff',
        onRegionClick: function(element, code, region)
        {
            var message = 'You clicked "'+ region + '" which has the code: '+ code.toUpperCase();
            $("#desc").html(message);
        }
      });
    }
});