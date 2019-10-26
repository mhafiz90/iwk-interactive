$(document).ready(function() {

    var width = (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth);
    var height = (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight);
    var chart1; 
    var guessX;
    var answered;
    var clicked;
    var chart1Loaded;
    
    $('#chart-container-1').mousemove(function(e){    
        if (answered == 1){} else {
          var xaxis = chart1.xAxis[0];
          xaxis.removePlotLine('plot-line-x');
          var x = xaxis.toValue(e.offsetX-11, true);
          xaxis.addPlotLine({
              value: x,
              color: '#E41A1C',
              width: 2,
              id: 'plot-line-x',
          });
          guessX = x.toFixed(0);
          $("#show-value").html(guessX);
        }
    });  

    $('#chart-container-1').click(function(e){    
        if (answered == 1){} else {
            if(clicked == 1){
                chart1.get('point-new').remove();
            }
            chart1.series[0].addPoint({
                x:  guessX,
                y:  10,
                color: '#E41A1C',
                marker: {radius: 7},   
                id: 'point-new', 
            },true,false);
            $("#guess-value").html(guessX);
            $('#guess-btn').removeAttr("disabled");
            clicked = 1;
        }
    });       

    $('#guess-btn').click(function(){
      $('#guess-btn').attr('disabled','disabled');
      answered = 1;
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
        $("#box-below-chart,#box-above-chart").fadeTo(200, 1, makeChart1());
        chart1Loaded = 1;
      } else {
        
      }
    }, {
      offset: "40%"
    });

    function makeChart1() {
      if (chart1Loaded == 1){} else {
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
            xAxis: {
                title: {
                  text:'litre per person per day',
                },
                endOnTick: true,
                max:600,
                min:0,
            },

            yAxis: {    
                title: {text: null,},
                labels: {enabled: false}
            },
            tooltip: {enabled: false,},
            credits: { enabled: false, },
            legend:{enabled: false,},
            
            plotOptions: {
                series: {
                    stickyTracking: false,
                    dataLabels: {
                        enabled: true,
                        align: 'center',
                        format: '{point.name}<br>{point.x} litres',
                        y: -15,
                        borderRadius: 5,
                        borderWidth: 0.5,
                        borderColor: '#d3d3d3',
                        shape: 'callout',
                        style:{
                            color: '#666',
                            fontSize: '11px',
                            fontWeight: 'normal',
                        },
                    },
                },
                scatter: {
                    marker: {
                        radius: 5,
                        lineColor: '#D3D3D3',
                        lineWidth: 1,
                    },
                }
            },
            series: [{data:[
                {"name":"Singapore<br>(2017)","x":143,"y":10, "color":'#FF7F00', dataLabels: {y:15,verticalAlign: 'top',}},
                {"name":"UN recommendation","x":165,"y":10, "color":'#FF7F00', dataLabels: {x:80,}},
                {"name":"Thailand<br>(2011)","x":90,"y":10, "color":'#FF7F00', dataLabels: {x:-10,}},
                {"name":"Country A","x":410,"y":10, "color":'#FF7F00'},
                {"name":"Country B","x":560,"y":10, "color":'#FF7F00'},
              ],
            }],
        });



      } 
    };
    




});