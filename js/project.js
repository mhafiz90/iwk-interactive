$(document).ready(function() {

    var width = (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth);
    var height = (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight);
    var chart1;

    Highcharts.setOptions({
        lang: {
          thousandsSep: ','
        }
    }),
    chart1 = new Highcharts.Chart({
        chart: {
            renderTo: 'chart-container-1', 
            type: 'scatter',
        },
        title: {
            text: null,
        },
        subtitle: {
            enabled: false,
        },
        //INPUT: Variable label displayed on xAxis
        xAxis: {
            title: {
              text:'Variable A',
            },
            endOnTick: true,
            max:2000,
            min:0,
        },

        yAxis: {    
            title: {text: null,},
            labels: {enabled: false}
        },
        
        credits: { enabled: false, },
        legend:{enabled: false,},
        
        plotOptions: {
            series: {stickyTracking: false},
            scatter: {
                marker: {
                    radius: 5,
                    fillColor: '#FF7F00',
                    //The markers should have lineColor and liveWidth if there are overlapping markers
                    lineColor: '#D3D3D3',
                    lineWidth: 1,
                    states: {
                        hover: {
                            enabled: true,
                            lineColor: '#33333c'
                        }
                    }
                },
                tooltip: {
                    headerFormat: '<b>{point.key}</b><br>',
                    pointFormat: 'Variable A: <b>{point.x}</b>'
                }
            }
        },

        //Your data. The "name" will appear in tootltip as "{point.key}"
        series: [{data:[
            {"name":"Brussels","x":1900,"y":10},
            {"name":"Burkina Faso","x":1113,"y":10},
            {"name":"Mali","x":1020,"y":10},
            {"name":"Ivory Coast","x":733,"y":10},
            {"name":"Jakarta","x":132,"y":10},
            {"name":"Ankara (Mar 13)","x":121,"y":10},
            {"name":"Tunisia","x":71,"y":10},
            {"name":"Istanbul","x":50,"y":10},
            {"name":"Somalia","x":69,"y":10},
            {"name":"Ankara (Feb 17)","x":65,"y":10},
          ],
          //labels on markers
            dataLabels: {
                enabled: false,
                rotation: 0,
                align: 'center',
                format: '{point.name}',
                y: -8,
                style: {
                    fontSize: '10px',
                }
            },

        }],
    });

      //   xseries.addPoint({
      //     x:  x,
      //     y:  10,
      //     id: 'point-new'
      // },true,false);
    

    
    
    $('#chart-container-1').mousemove(function(e){    
        var xaxis = chart1.xAxis[0];
        xaxis.removePlotLine('plot-line-x');
        var x = xaxis.toValue(e.offsetX, true);

        xaxis.addPlotLine({
            value: x,
            color: '#d3d3d3',
            width: 1,
            id: 'plot-line-x'
        });
        $("#guess-value").html(x.toFixed(0));
        console.log(x);
    });    
//For mobile
    // $('#chart-container-1').ontouchmove(function(e){    
    //     var xaxis = chart1.xAxis[0];
    //     xaxis.removePlotLine('plot-line-x');
    //     var x = xaxis.toValue(e.offsetX, true);

    //     xaxis.addPlotLine({
    //         value: x,
    //         color: '#d3d3d3',
    //         width: 1,
    //         id: 'plot-line-x'
    //     });
    //     $("#guess-value").html(x.toFixed(0));
    //     console.log(x);
    // });     

    
    
    $("#chart-1-text-1").waypoint(function(direction) {
      if (direction === "down") {

      } else {
        
      }
    }, {
      offset: "60%"
    });

    $("#chart-1-text-2").waypoint(function(direction) {
      if (direction === "down") {

      } else {

      }
    }, {
      offset: "60%"
    });

    $("#chart-1-text-3").waypoint(function(direction) {
      if (direction === "down") {

      } else {

      }
    }, {
      offset: "60%"
    });

    $("#chart-1-text-4").waypoint(function(direction) {
      if (direction === "down") {

      } else {

      }
    }, {
      offset: "60%"
    });

    $("#chart-1-text-5").waypoint(function(direction) {
      if (direction === "down") {

      } else {

      }
    }, {
      offset: "60%"
    });

    $("#chart-1-text-7").waypoint(function(direction) {
      if (direction === "down") {

      } else {

      }
    }, {
      offset: "60%"
    });
  

});