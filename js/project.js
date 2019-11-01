$(document).ready(function() {

    var width = (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth);
    var height = (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight);
    var chart1a, chart1b, chart2, chart3a, chart3b; 
    var guessX, guessY;
    var answered1, answered2;
    var clicked2, clicked3, clicked4;
    var chart1Loaded;
    var chart3Loaded;

    var answers1 = [
        "You’re a genius! You’ve got the exact answer. are you cheating? Only <span id='compareUser1'>0</span>% people before you got it right.",
        "Bingo! Your guess is very close to the answer. It is more accurate than <span id='compareUser1'>0</span>% of those who have played this quiz.",
        "You’ve underestimated how much water Malaysians waste! <span id='compareUser1'>0</span>% of those who have played this quiz did better than you.",
        "Malaysians are more prudent than you thought! <span id='compareUser1'>0</span>% of those who have played this quiz did better than you.",
        "Seriously? Are you sure you can survive with this little water? Only <span id='compareUser1'>0</span>% of those who have played this quiz did worse than you.",
        "No way! Malaysia might have run out of water if your guess is right. Only <span id='compareUser1'>0</span>% of those who have played this quiz did worse than you.",
    ];

    var answers2 = [
        "Unbelievable! You’ve got the exact answer. IWK should offer you a job!",
        "Not bad! Looks like you know the situation well.",
        "Sorry, your guess is far from the actual charge rate. Go check your IWK bill!",
    ];

    var dataCountryWater = [
        {name:"Taiwan (2018)",y:280},
        {name:"US (2016)",y:222},
        {name:"Malaysia (2017)",y:201, color:"#4188bc"},
        {name:"UN recommendation",y:165},
        {name:"Singapore (2017)",y:143},
        {name:"Thailand (2011)",y:90},
    ];

    var dataStateWater = [
        {name:"Pulau Pinang",y:277},
        {name:"Perlis",y:245},
        {name:"Melaka",y:228},
        {name:"Perak",y:227},
        {name:"N. Sembilan",y:222},
        {name:"Selangor, KL &amp;<br>Putrajaya",y:222},
        {name:"Kedah",y:217},
        {name:"Terengganu",y:204},
        {name:"National<br>average",y:201, color:"#4188bc"},
        {name:"Johor",y:200},
        {name:"Pahang",y:190},
        {name:"UN<br>recommendation",y:165, color:"#4188bc"},
        {name:"Sarawak",y:165},
        {name:"Kelantan",y:141},
        {name:"Sabah",y:108},
    ];

    var dataCost = [
        {name:"Tokyo,<br>Japan", y:2.49},
        {name:"Sydney,<br>Australia", y:1.41},
        {name:"London<br>UK",y: 1.20},
        {name:"Global<br>average", y:0.99},
        {name:"Singapore", y:0.71},
        {name:"Johannesburg,<br>South Africa", y:0.53},
        {name:"Istanbul<br>Turkey", y:0.44},
        {name:"Beijing,<br>China", y:0.20},
        {name:"Kuala Lumpur,<br>Malaysia", y:0.08, color:"#4188bc"},
        {name:"Hanoi,<br>Vietnam", y:0.03},
    ];

    function getAnswer1(d) {
        return d == 201 ? answers1[0] :
               d >= 181 && d <= 221  ? answers1[1] :
               d >= 101 && d <= 180  ? answers1[2] :
               d >= 222 && d <= 301  ? answers1[3] :
               d <= 100  ? answers1[4] :
               answers1[5] ;
    }

    function getAnswer2(d) {
        return d == 0.08 ? answers2[0] :
               d >= 0.01 && d <= 0.5 ? answers2[1] :
               answers2[2] ;
    }

    if (width<500){
        //For chart1a mobile
        $('#chart-container-1a').on("touchmove", function(e) {       
            if (answered1 == 1){} else {
                e.preventDefault();
                var touchX = e.touches[0].clientX;
                var x = touchX + 18;
                var xaxis = chart1a.xAxis[0];
                xaxis.removePlotLine('plot-line-x');
                xaxis.addPlotLine({
                    value: x,
                    color: '#E41A1C',
                    width: 2,
                    id: 'plot-line-x',
                });
                guessX = x.toFixed(0);
                $("#guess-value-1").html(guessX);
                $('#guess-btn-1').fadeIn();
            }
        }); 

        $('#guess-btn-1').click(function(){
            $('#guess-btn-1').prop('disabled',true);
            answered1 = 1;
            $("#answer1").html(getAnswer1(guessX));
            chart1a.series[0].addPoint({
                x:  201,
                y:  10,
                color: '#4188BC',
                marker: {radius: 7},   
                id: 'point-my', 
                name: 'Malaysia<br>(2017)',
                dataLabels: {borderColor: '#4188BC', borderWidth: 2, y:15, verticalAlign: 'top'}
            },true,false);  
            chart1a.series[0].addPoint({
                x:  guessX,
                y:  10,
                color: '#E41A1C',
                marker: {radius: 7},   
                id: 'point-new', 
                name: 'Your guess',
                dataLabels: {borderColor: '#E41A1C', y:15, verticalAlign: 'top'}
            },true,false);                          
            dataCountryWater.push({name:"Your guess", y:parseInt(guessX), color:"#E41A1C"});
            dataCountryWater = dataCountryWater.sort(function (a, b) {
                return b.y - a.y;
            });
            var dataCountryWaterCat=[];
            for (var i = 0; i < dataCountryWater.length; i++){
                dataCountryWaterCat.push(dataCountryWater[i].name);
            }
            $("#answer-box-1").fadeTo(500, 1, makeChart1b(dataCountryWaterCat));
            $('#guess-btn-1').hide();
        });    

        //For chart3a mobile
        $('#chart-container-3a').on("touchmove", function(e) {       
            if (answered2 == 1){} else {
                e.preventDefault();
                var touchX = e.touches[0].clientX;
                var x = ((touchX + 18)/100)-0.5; 
                console.log("touch! point = " + touchX + ", " + x);   
                var xaxis = chart3a.xAxis[0];
                xaxis.removePlotLine('plot-line-x');
                xaxis.addPlotLine({
                    value: x,
                    color: '#E41A1C',
                    width: 2,
                    id: 'plot-line-x',
                });
                guessY = x.toFixed(2);
                $("#guess-value-2").html(guessY);
                $('#guess-btn-2').fadeIn();
            }
        }); 

        $('#guess-btn-2').click(function(){
            console.log("guessed answer Y = " + guessY);  
            $('#guess-btn-2').prop('disabled',true);
            answered2 = 1;
            $("#answer2").html(getAnswer2(guessY));
            chart3a.series[0].addPoint({
                x:  0.08,
                y:  10,
                color: '#4188BC',
                marker: {radius: 7},   
                id: 'point-my', 
                name: 'Kuala Lumpur<br>Malaysia',
                dataLabels: {borderColor: '#4188BC', borderWidth: 2, x:10, y:15, verticalAlign: 'top'}
            },true,false);
            chart3a.series[0].addPoint({
                x:  guessY,
                y:  10,
                color: '#E41A1C',
                marker: {radius: 7},   
                id: 'point-new', 
                name: 'Your guess',
                dataLabels: {borderColor: '#E41A1C', y:15, verticalAlign: 'top'}
            },true,false);                
            dataCost.push({name:"Your guess", y:Number(guessY), color:"#E41A1C"});
            dataCost = dataCost.sort(function (a, b) {
                return b.y - a.y;
            });
            var dataCostCat=[];
            for (var i = 0; i < dataCost.length; i++){
                dataCostCat.push(dataCost[i].name);
            }
            $("#answer-box-3").fadeTo(500, 1, makeChart3b(dataCostCat));
            $('#guess-btn-2').hide();
        }); 


    } else {
        // Chart1a desktop
        $('#chart-container-1a').mousemove(function(e){      
            if (answered1 == 1){} else {
                var xaxis = chart1a.xAxis[0];
                xaxis.removePlotLine('plot-line-x');
                var x = xaxis.toValue(e.offsetX-11, true); 
                xaxis.addPlotLine({
                    value: x,
                    color: '#E41A1C',
                    width: 2,
                    id: 'plot-line-x',
                });
                guessX = x.toFixed(0);
                $("#guess-value-1").html(guessX);
            }
        });  
    
        $('#chart-container-1a').click(function(e){    
            if (answered1 == 1){} else {
                chart1a.series[0].addPoint({
                    x:  guessX,
                    y:  10,
                    color: '#E41A1C',
                    marker: {radius: 7},   
                    id: 'point-new', 
                    name: 'Your guess',
                    dataLabels: {borderColor: '#E41A1C', y:15, verticalAlign: 'top'}
                },true,false);
                $("#guess-value-1").html(guessX);
                answered1 = 1;
                $("#answer1").html(getAnswer1(guessX));
                chart1a.series[0].addPoint({
                        x:  201,
                        y:  10,
                        color: '#4188BC',
                        marker: {radius: 7},   
                        id: 'point-my', 
                        name: 'Malaysia<br>(2017)',
                        dataLabels: {borderColor: '#4188BC', borderWidth: 2, y:15, verticalAlign: 'top'}
                    },true,false);
                dataCountryWater.push({name:"Your guess", y:parseInt(guessX), color:"#E41A1C"});
                dataCountryWater = dataCountryWater.sort(function (a, b) {
                    return b.y - a.y;
                });
                var dataCountryWaterCat=[];
                for (var i = 0; i < dataCountryWater.length; i++){
                    dataCountryWaterCat.push(dataCountryWater[i].name);
                }
                $("#answer-box-1").fadeTo(500, 1, makeChart1b(dataCountryWaterCat));            
            }
        }); 

        // Chart3b desktop
        $('#chart-container-3a').mousemove(function(e){      
            if (answered2 == 1){} else {
                var xaxis = chart3a.xAxis[0];
                xaxis.removePlotLine('plot-line-x');
                var x = xaxis.toValue(e.offsetX-11, true); 
                xaxis.addPlotLine({
                    value: x,
                    color: '#E41A1C',
                    width: 2,
                    id: 'plot-line-x',
                });
                guessY = x.toFixed(2);
                $("#guess-value-2").html(guessY);
            }
        });  
    
        $('#chart-container-3a').click(function(e){    
            if (answered2 == 1){} else {
                chart3a.series[0].addPoint({
                    x:  guessY,
                    y:  10,
                    color: '#E41A1C',
                    marker: {radius: 7},   
                    id: 'point-new', 
                    name: 'Your guess',
                    dataLabels: {borderColor: '#E41A1C', y:15, verticalAlign: 'top'}
                },true,false);
                $("#guess-value-2").html(guessY);
                answered2 = 1;
                $("#answer2").html(getAnswer2(guessY));
                chart3a.series[0].addPoint({
                        x:  0.08,
                        y:  10,
                        color: '#4188BC',
                        marker: {radius: 7},   
                        id: 'point-my', 
                        name: 'Kuala Lumpur<br>Malaysia',
                        dataLabels: {borderColor: '#4188BC', borderWidth: 2, x:10, y:15, verticalAlign: 'top'}
                    },true,false);
                dataCost.push({name:"Your guess", y:Number(guessY), color:"#E41A1C"});
                dataCost = dataCost.sort(function (a, b) {
                    return b.y - a.y;
                });
                var dataCostCat=[];
                for (var i = 0; i < dataCost.length; i++){
                    dataCostCat.push(dataCost[i].name);
                }
                $("#answer-box-3").fadeTo(500, 1, makeChart3b(dataCostCat));            
            }
        });         

    }  
    
    $(".btnState").click(function(){
        if (clicked2 == 1){}else{
            var yourState = $(this).html(); 
            var dataStateWaterCat = [];
            for (var i = 0; i < dataStateWater.length; i++){
                dataStateWaterCat.push(dataStateWater[i].name);
                if (dataStateWater[i].name == yourState){
                    dataStateWater[i].color = "#E41A1C";
                    dataStateWater[i].note = "Your state";
                }
            }
            $("#answer-box-2").fadeTo(500, 1, makeChart2(dataStateWaterCat));
            clicked2 = 1;
        }
    });

    $(".btnPay").click(function(){
        if (clicked3 == 1){}else{
            var payAnswer = $(this).text();
            console.log("payAnswer = " + payAnswer);
            if(payAnswer == "Yes"){
                $(".payExtra").fadeTo(500, 1);
            } else {
                $(".payExtra").hide();
                $(".thankYou").fadeTo(500, 1);
            }
            clicked3 = 1;
            $('.btnPay').prop('disabled',true);
        }
    })

    $(".btnExtra").click(function(){
        if (clicked4 == 1){} else {
            var payExtra = $(this).text();
            console.log("payExtra = " + payExtra);
            clicked4 = 1;
            $('.btnExtra').prop('disabled',true);
            $(".thankYou").fadeTo(500, 1);
        }        
    })

    $("#chart-1-text-1").waypoint(function(direction) {
        if (direction === "down") {
            $("#box-below-chart-1, #box-above-chart-1").fadeTo(500, 1, makeChart1a());
            chart1Loaded = 1;
        } else {}
    }, {
        offset: "40%"
    });

    $("#chart-2-text-1").waypoint(function(direction) {
        if (direction === "down") {
            $("#state-menu-container").fadeTo(500, 1, makeChart1a());
            chart1Loaded = 1;
        } else { }
    }, {
        offset: "40%"
    });

    $("#chart-3-text-1").waypoint(function(direction) {
        if (direction === "down") {
            $("#box-below-chart-2, #box-above-chart-2").fadeTo(500, 1, makeChart3a());
            chart3Loaded = 1;
        } else { }
    }, {
        offset: "40%"
    });

    function makeChart1a() {
      if (chart1Loaded == 1){} else {
        chart1a = new Highcharts.Chart({
            chart: {
                renderTo: 'chart-container-1a', 
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
                    states: {hover: {enabled: false}},
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
                {"name":"Taiwan<br>(2018)","x":280,"y":10, "color":"#FF7F00"},
                {"name":"US (2016)","x":222,"y":10, "color":"#FF7F00", dataLabels: {x:-15}},
                {"name":"UN<br>recommendation","x":165,"y":10, "color":"#FF7F00", dataLabels: {x:-35,y:15,verticalAlign: 'top'}},
                {"name":"Singapore<br>(2017)","x":143,"y":10, "color":"#FF7F00", dataLabels: {x:0}},
                {"name":"Thailand<br>(2011)","x":90,"y":10, "color":"#FF7F00", dataLabels: {x:-15}},
            ],
            }],
        });
      } 
    };

    function makeChart1b(cat) {
        chart1b = new Highcharts.Chart({
            chart: {
                renderTo: 'chart-container-1b',type: 'bar',
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
                        inside: true,
                        align: 'right',
                        style: {fontSize: '11px', textOutline: null},
                        format: '{point.y}',
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

    function makeChart2(cat) {
        chart2 = new Highcharts.Chart({
            chart: {
                renderTo: 'chart-container-2',type: 'bar',
                marginLeft: 105,
            },
            title: {text: null},
            subtitle: {enabled: false},
            xAxis: {categories: cat,
                labels: {
                    style: {
                        whiteSpace: "nowrap",
                    },
                }
            },  
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
                        whiteSpace: "nowrap",
                        enabled: true,
                        
                    },
                },
            },    
            series: [{
                dataLabels: [{
                    style: {fontSize: '11px', textOutline: null},
                    format: '{point.y}',
                    
                },{
                    style: {fontSize: '12px', textOutline: null},
                    format: '{point.note}',
                    align: 'left',
                    inside: true,
                }],
                name:"Domestic water consumption", 
                color:"#FF7F00", 
                data: dataStateWater,
            }],
        });
    }

    function makeChart3a() {
        if (chart3Loaded == 1){} else {
            chart3a = new Highcharts.Chart({
                chart: {
                    renderTo: 'chart-container-3a', 
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
                        useHTML: true,
                        text:'US$ per m<sup>3</sup> (1000 litres) of wastewater',
                    },
                    max:2.5,
                    min:0,
                    tickPositions: [0, 0.5, 1, 1.5, 2, 2.5]
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
                            format: '{point.name}<br>{point.x}',
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
                        states: {hover: {enabled: false}},
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
                    {"name":"Tokyo,<br>Japan", "x":2.49, "y":10, "color":"#FF7F00", dataLabels: {x:-10}},
                    {"name":"Sydney,<br>Australia", "x":1.41, "y":10, "color":"#FF7F00", dataLabels: {x:15}},
                    {"name":"Global<br>average", "x":0.99, "y":10, "color":"#FF7F00", dataLabels: {x:-13}},
                    {"name":"Singapore", "x":0.71, "y":10, "color":"#FF7F00", dataLabels: {x:35, y:15,verticalAlign: 'top'}},
                    {"name":"Hanoi,<br>Vietnam", "x":0.03, "y":10, "color":"#FF7F00", dataLabels: {x:10}},
                ],
                }],
            });
        } 
    };

    function makeChart3b(cat) {
        chart3b = new Highcharts.Chart({
            chart: {
                renderTo: 'chart-container-3b',type: 'bar',
            },
            title: {text: null},
            subtitle: {enabled: false},
            xAxis: {categories: cat},  
            yAxis: {
                title: {text: 'US$ per m<sup>3</sup> (1000 litres)', x:-40,},
                endOnTick: false,
            },
            credits: {enabled: false},
            legend: {enabled: false},
            tooltip: {
                headerFormat: '{point.key}<br>',
                pointFormat: '<b>{point.y}</b>',
            },
            plotOptions: {
                series:{
                    groupPadding: 0.05,
                    pointPadding: 0,
                    stickyTracking: false,
                    dataLabels: {
                        enabled: true,
                        style: {fontSize: '11px', textOutline: null},
                        format: '{point.y}',
                    }
                },
            },    
            series: [{
                name:"Wasterwater cost", 
                color:"#FF7F00", 
                data: dataCost
            }],
        });
    }

});     