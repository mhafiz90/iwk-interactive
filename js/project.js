$(document).ready(function() {

    var width = (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth);
    var height = (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight);
    var chart1, chart2; 
    var guessX;
    var answered;
    var clicked;
    var chart1Loaded;

    var answers1 = [
        "You’re a genius! You’ve got the exact answer. Hmm… are you cheating? Only <span id='compareUser'>0</span>% people before you got it right.",
        "Bingo! Your guess is very close to the answer. Your guess is better than <span id='compareUser'>0</span>% of those who have played this quiz.",
        "You’ve underestimated how much water Malaysians waste! <span id='compareUser'>0</span>% of those who have played this quiz performed better than you.",
        "Malaysians are more prudent than you thought! <span id='compareUser'>0</span>% of those who have played this quiz performed better than you.",
        "Seriously? Are you sure you can survive with this little water? Only <span id='compareUser'>0</span>% of those who have played this quiz performed worse than you.",
        "No way! Malaysia might have run out of water if your guess is right. Only <span id='compareUser'>0</span>% of those who have played this quiz performed worse than you.",
    ];

    var dataCountryWater = [
        {name:"Taiwan (2018)",y:280},
        {name:"US (2016)",y:222},
        {name:"Malaysia (2017)",y:201, color:"#4188bc"},
        {name:"UN recommendation",y:165},
        {name:"Singapore (2017)",y:143},
        {name:"Thailand (2011)",y:90},
    ];

    function getAnswer1(d) {
        return d == 201 ? answers1[0] :
               d >= 181 && d <= 221  ? answers1[1] :
               d >= 101 && d <= 180  ? answers1[2] :
               d >= 222 && d <= 301  ? answers1[3] :
               d <= 100  ? answers1[4] :
               answers1[5] ;
    }

    $('#chart-container-1').mousemove(function(e){      
        if (answered == 1){} else {
            var xaxis = chart1.xAxis[0];
            xaxis.removePlotLine('plot-line-x');
            var x = xaxis.toValue(e.offsetX-11, true);
            console.log("move! x = " +x);   
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

    //For mobile
    // $('#chart-container-1').on("touchmove", function(e) {       
    //     // var touchstart = e.type === 'touchmove',
    //     //     e = touchstart ? e.originalEvent : e,
    //     //     pageX = touchstart ? e.targetTouches[0].pageX : e.pageX,
    //     //     pageY = touchstart ? e.targetTouches[0].pageY : e.pageY;
    //     if (answered == 1){} else {
    //         e.preventDefault();
    //         var touchX = e.touches[0].clientX;
    //         var x = touchX + 18;
    //         console.log("touch! point = " +x);   
    //         var xaxis = chart1.xAxis[0];
    //         xaxis.removePlotLine('plot-line-x');
    //         xaxis.addPlotLine({
    //             value: x,
    //             color: '#E41A1C',
    //             width: 2,
    //             id: 'plot-line-x',
    //         });
    //         guessX = x.toFixed(0);
    //         $("#show-value").html(guessX);
    //     }
    // }); 

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
                name: 'Your guess',
                dataLabels: {borderColor: '#E41A1C'}
            },true,false);
            $("#guess-value").html(guessX);
            $('#guess-btn').css("visibility", "visible");
            clicked = 1;
        }
    });       

    $('#guess-btn').click(function(){
        console.log("guessed answer = " + guessX);  
        $('#guess-btn').prop('disabled',true);
        answered = 1;
        $("#answer1").html(getAnswer1(guessX));
        chart1.series[0].addPoint({
                x:  201,
                y:  10,
                color: '#4188BC',
                marker: {radius: 7},   
                id: 'point-my', 
                name: 'Malaysia<br>(2017)',
                dataLabels: {borderColor: '#4188BC',}
            },true,false);
        dataCountryWater.push({name:"Your guess", y:parseInt(guessX), color:"#E41A1C"});
        dataCountryWater = dataCountryWater.sort(function (a, b) {
            return b.y - a.y;
        });
        var dataCountryWater_cat=[];
        for (var i = 0; i < dataCountryWater.length; i++){
            dataCountryWater_cat.push(dataCountryWater[i].name);
        }
        $("#answer-box-1").fadeTo(500, 1, makeChart2(dataCountryWater_cat));
        $('#guess-btn').hide();
    });    

    $("#chart-1-text-1").waypoint(function(direction) {
      if (direction === "down") {
        $("#box-below-chart,#box-above-chart").fadeTo(500, 1, makeChart1());
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
                  text:'litres per person per day',
                },
                max:300,
                min:50,
                tickPositions: [50, 100, 200, 300]
            },

            yAxis: {    
                title: {text: null},
                labels: {enabled: false},
                gridLineWidth: 2
            },
            tooltip: {enabled: false,},
            credits: { enabled: false, },
            legend:{enabled: false,},
            
            plotOptions: {
                series: {
                    stickyTracking: false,
                    dataLabels: {
                        enabled: true,
                        allowOverlap: true,
                        align: 'center',
                        format: '{point.name}<br>{point.x} litres',
                        y: -15,
                        borderRadius: 5,
                        borderWidth: 0.5,
                        borderColor: '#d3d3d3',
                        backgroundColor: 'rgba(256, 256, 256, 0.9)',
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
                {"name":"Taiwan<br>(2018)","x":280,"y":10, "color":'#FF7F00'},
                {"name":"US (2016)","x":222,"y":10, "color":'#FF7F00', dataLabels: {y:15,verticalAlign: 'top',}},
                {"name":"UN<br>recommendation","x":165,"y":10, "color":'#FF7F00', dataLabels: {x:20,}},
                {"name":"Singapore<br>(2017)","x":143,"y":10, "color":'#FF7F00', dataLabels: {y:15,verticalAlign: 'top',}},
                {"name":"Thailand<br>(2011)","x":90,"y":10, "color":'#FF7F00', dataLabels: {x:0,}},
            ],
            }],
        });



      } 
    };

    function makeChart2(cat) {
        chart2 = new Highcharts.Chart({
            chart: {
                renderTo: 'chart-container-2',type: 'bar',
            },
            title: {text: null},
            subtitle: {enabled: false},
            xAxis: {categories: cat},  
            yAxis: {
                title: {text: 'litres per person per day', x:-40,},
                endOnTick: false,
            },
            credits: {enabled: false},
            legend: {enabled: false},
            tooltip: {
                headerFormat: '{point.key}<br>',
                pointFormat: '<b>{point.y} litres</b>',
            },
            plotOptions: {
                series:{
                    groupPadding: 0.05,
                    pointPadding: 0,
                    stickyTracking: false,
                    dataLabels: {
                        enabled: true,
                        style: {
                            fontSize: '11px',
                        },
                        //MODIFY: Customize the data label. "point.y" is the data value. ",.1f" sets "," as thousand separator and sets the decimal point at zero. Refer to the syntax at Highcharts API under the topic "FORMAT STRINGS" (http://www.highcharts.com/docs/chart-concepts/labels-and-string-formatting). Remove this line for Highcharts to auto-populate the label.
                        format: '{point.y:,.1f}',
                    }
                },
            },    
            series: [{
                name:"Domestic water consumption", 
                color:"#FF7F00", 
                data: dataCountryWater
            }],
        });
    }
});     