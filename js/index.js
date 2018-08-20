$(document).ready(function() {
    var auto_updating_chart;

    $(".dau_line").peity("line", {width: 120, height: 45, colour: 'green'});
    $(".dnu_line").peity("line", {width: 120, height: 45, colour: 'orange'});

    // dynamic progressbars
    var progress = $("#dynamic-progresses .bar");
    var final = progress.parent().css("width").replace("px", "");
    var current = progress.css("width").replace("px", "");
    var timer = setInterval(function() { 
        if(++current < final) {
            progress.css("width", current + "px");
            progress.parent().prev().html(Math.round(current * 100 / final) + "%");
        } else {
            current = 1;
            // progress.css("width", final + "px");
            // progress.parent().prev().html("100%");
            // clearInterval(timer);
        }
    }, 100);

    // updating
    var updatingChart = $(".updating-chart").peity("line", { width: 120, height: 45, colour: 'red' });
    setInterval(function() {
      var random = Math.round(Math.random() * 10)
      var values = updatingChart.text().split(",")
      values.shift()
      values.push(random)

      updatingChart
        .text(values.join(","))
        .change()
    }, 1000);

    $('#cpu').easyPieChart({
       animate: 2000,
       lineWidth: 10,
       barColor: 'orange'
    });

    $('#mem').easyPieChart({
       animate: 2000,
       lineWidth: 10,
       barColor: 'red'
    });

    var g1 = new JustGage({
        id: "gauge_visited",
        value: getRandomInt(60, 100),
        min: 0,
        max: 100,
        title: "Visitors",
        gaugeColor: "#222222",
        showInnerShadow: false,
        labelFontColor: '#999',
        valueFontColor: '#fff',
        shadowVerticalOffset: 10,
        gaugeWidthScale: 0.5,
        levelColors: [
          "#00fff6",
          "#ff00fc",
          "#1200ff"
        ]  
    }); 

    var g2 = new JustGage({
        id: "gauge_request",
        value: getRandomInt(60, 100),
        min: 0,
        max: 100,
        title: "Request",
        gaugeColor: "#222222",
        showInnerShadow: false,
        labelFontColor: '#999',
        valueFontColor: '#fff',
        shadowVerticalOffset: 10,
        gaugeWidthScale: 0.5,
        levelColors: [
          "#1200ff",
          "#00fff6",
          "#ff00fc"
        ]  
    });

    var g3 = new JustGage({
        id: "gauge_orders",
        value: getRandomInt(60, 100),
        min: 0,
        max: 100,
        title: "Orders",
        gaugeColor: "#222222",
        showInnerShadow: false,
        labelFontColor: '#999',
        valueFontColor: '#fff',
        shadowVerticalOffset: 10,
        levelColors: [
          "#ff00fc",
          "#00fff6",
          "#1200ff"
        ]     
    }); 

    var g4 = new JustGage({
        id: "gauge_task",
        value: getRandomInt(60, 100),
        min: 0,
        max: 100,
        title: "Tasks",
        gaugeColor: "#222222",
        showInnerShadow: false,
        labelFontColor: '#999',
        valueFontColor: '#fff',
        shadowVerticalOffset: 10,
        levelColors: [
          "#00fff6",
          "#1200ff",
          "#ff00fc",
        ]     
    }); 

    setInterval(function() {
      g1.refresh(getRandomInt(60, 100));
      g2.refresh(getRandomInt(60, 100));
      g3.refresh(getRandomInt(60, 100));
      g4.refresh(getRandomInt(60, 100));
    }, 2000);

    // server flot
    var data = [], totalPoints = 300;
    function getRandomData() {
        if (data.length > 0)
            data = data.slice(1);

        // do a random walk
        while (data.length < totalPoints) {
            var prev = data.length > 0 ? data[data.length - 1] : 50;
            var y = prev + Math.random() * 10 - 5;
            if (y < 0)
                y = 0;
            if (y > 100)
                y = 100;
            data.push(y);
        }

        // zip the generated y values with the x values
        var res = [];
        for (var i = 0; i < data.length; ++i)
            res.push([i, data[i]])
        return res;
    }

    // setup control widget
    var updateInterval = 30;
    $("#updateInterval").val(updateInterval).change(function () {
        var v = $(this).val();
        if (v && !isNaN(+v)) {
            updateInterval = +v;
            if (updateInterval < 1)
                updateInterval = 1;
            if (updateInterval > 2000)
                updateInterval = 2000;
            $(this).val("" + updateInterval);
        }
    });

    // setup plot
    var options = {
        series: { shadowSize: 0 }, // drawing is faster without shadows
        yaxis: { show: false },
        xaxis: { show: false }
    };
    var plot = $.plot($("#server_request"), [ getRandomData() ], options);

    function update() {
        plot.setData([ getRandomData() ]);
        // since the axes don't change, we don't need to call plot.setupGrid()
        plot.draw();
        
        setTimeout(update, updateInterval);
    }

    update();

    // morris
    Morris.Donut({
      element: 'mobile_device',
      data: [
        {value: 40, label: 'Android'},
        {value: 45, label: 'iOS'},
        {value: 10, label: 'Window Phone'},
        {value: 5, label: 'Palm'}
      ],
      labelColor: '#999',
      backgroundColor: '#202020',
      formatter: function (x) { return x + "%"},
      colors: [
        '#222222',
        '#303030',
        '#272727',
        '#4a4a4a'
      ]
    }); 

    $("div.msg-items-container, ul#messages-box, ul#chat-box, ul#products_list").mCustomScrollbar({scrollButtons:{enable:true}});
    
    $("#btn-send").click(function() {
      $.bootstrapGrowl("<img src='img/icons/exclamation.png' alt='' /> Message sent!", {
          type: 'info',
          align: 'center',
          stackup_spacing: 30
      });
      $(this).html('<i class="icon-flag"></i> Completely');
      setTimeout(function() { $("#btn-send").html('<i class="icon-flag"></i> Send Messages'); }, 3000);
    });

    $(".todo .check").each(function() {
        $(this).bind('click', function(){
            $(this).toggleClass("checked");
            $(this).next().toggleClass("done");
            $(this).next().next().toggleClass("done");
        });
    });

    $(".todo .level").each(function() {
        $(this).bind('click', function(){
            if($(this).html().trim() == '<i class="icon-star-empty"></i>')
                $(this).html('<i class="icon-star"></i>');
            else
                $(this).html('<i class="icon-star-empty"></i>');
        });
    });

    // leaderboard
    var lb = $(".leaderboard").jqleaderboard();
    var lb_object = lb.data("leaderboard");

    // jqvmap
    jQuery('#sales_vmap').vectorMap({
        map: 'world_en',
        backgroundColor: 'rgba(0,0,0,0.2)',
        color: '#999',
        borderColor: '#2a2a2a',
        hoverOpacity: 0.7,
        selectedColor: '#666',
        enableZoom: true,
        showTooltip: true,
        scaleColors: ['#C8EEFF', '#006491'],
        normalizeFunction: 'linear',
        selectedRegion: 'RU',
        onRegionOver: function(event, code, region)
        {
            lb_object.leaderboard_highlight(code);
        },
        onRegionClick: function(element, code, region) {
            lb_object.leaderboard_select(code);
        }
    });

    // sidebar speakline
    $("#sl_bar").sparkline([5,6,7,2,6,4,2,4,8,5,6,8,9,2,3,6,5,7,8,8,6], {type: 'bar', barColor: '#ff7f00'});
    $("#sl_invoices").sparkline([5,6,7,2,6,4,2,4,8,5,6,8,9,2,3,6,5,7,8,8,6], {type: 'bar', barColor: '#f29b36'});
    $("#sl_users").sparkline([5,6,7,2,6,4,2,4,8,5,6,8,9,2,3,6,5,7,8,8,6], {type: 'bar', barColor: '#336699'});
    $("#sl_clicks").sparkline([5,6,7,2,6,4,2,4,8,5,6,8,9,2,3,6,5,7,8,8,6], {type: 'bar', barColor: '#cb423c'});
    $("#sl_comments").sparkline([5,6,7,2,6,4,2,4,8,5,6,8,9,2,3,6,5,7,8,8,6], {type: 'bar', barColor: '#54a954'});
    $("#sl_line").sparkline([5,6,7,9,9,5,3,6,7,4,6,7,8,6,6,8,9,5,4,6,5,6,7,9,7,8,9,9,5,6,7,8,5,6,7,9], {type: 'line', fillColor: '#5fbf00'});
    $(".sl_product").sparkline([5,6,7,6,9,5,6,7,5,7,8,6,4,5,6,7,8,5,6,7,9], {type: 'bar', barColor: '#666', height: 40});
});