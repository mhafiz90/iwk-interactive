$(document).ready(function() {

  var width = (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth);
  var height = (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight);

  var mapContainer = d3.select("#map")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g");

  var icerdMap;

  var projection = d3.geoMercator();

  var path = d3.geoPath()
    .projection(projection);

  var countryByCode = d3.map();
  var muslimByCode = d3.map();
  var statusByCode = d3.map();

  // d3.queue()
  //   .defer(d3.json("../data/icerd_map.json"))
  //   .defer(d3.csv("../data/OHCHR.csv").then(function(d) {
  //     countryByCode.set(d["ADM0_A3_IS"], d["ADM0_A3_IS"]);
  //     muslimByCode.set(d["ADM0_A3_IS"], d["Muslim_Maj"]);
  //     statusByCode.set(d["ADM0_A3_IS"], d["Status"]);
  //   }))
  //   .await(ready);

  var files = [
    d3.json("../data/icerd_map.json"),
    d3.csv("../data/OHCHR.csv", (d) => {
      countryByCode.set(d["ADM0_A3_IS"], d["ADM0_A3_IS"]);
      muslimByCode.set(d["ADM0_A3_IS"], d["Muslim_Maj"]);
      statusByCode.set(d["ADM0_A3_IS"], d["Status"]);
    })
  ];

  Promise.all(files).then(ready);

  function ready([worldMap]) {
    // if (error) {
    //   throw error;
    // }

    setProjection(worldMap, "icerd");

    console.log(worldMap);
    // console.log(ohchr);

    var icerd_map = topojson.feature(worldMap, worldMap.objects.icerd).features;

    icerdMap = mapContainer.selectAll(".countries")
      .data(icerd_map)
      .enter()
      .append("path")
			.attr("class", "countries")
      .attr("d", path);

    console.log(icerdMap);

    $("#map-1").waypoint(function(direction) {
      if (direction === "down") {
        icerdMap.transition()
          .style("opacity", 1)
          .delay(function(d, i) {
            return 7.5 * i;
          })
          .attr("class", function(d) {
            if (statusByCode.get(d.properties.ADM0_A3_IS) === "State_Party") {
              return "countries-signed";
            } else {
              return "countries";
            }
          });
      } else {
        icerdMap.attr("class", "countries");
      }
    }, {
      offset: "60%"
    });

    $("#map-2").waypoint(function(direction) {
      if (direction === "down") {

        icerdMap.attr("class", function(d) {
            if (countryByCode.get(d.properties.ADM0_A3_IS) == "MYS") {
              return "countries-unsigned";
            } else if (statusByCode.get(d.properties.ADM0_A3_IS) == "State_Party") {
              return "countries-signed";
            } else {
              return "countries";
            }
          })
          .transition()
          .duration(500)
          .style("opacity", function(d) {
            if (statusByCode.get(d.properties.ADM0_A3_IS) === "State_Party") {
              return 0.2;
            } else {
              return 1;
            }
          });

      } else {
        icerdMap.transition()
          .attr("class", function(d) {
            if (statusByCode.get(d.properties.ADM0_A3_IS) === "State_Party") {
              return "countries-signed";
            } else {
              return "countries";
            }
          })
          .style("opacity", 1);
      }
    }, {
      offset: "60%"
    });

    $("#map-3").waypoint(function(direction) {
      if (direction === "down") {
        icerdMap.attr("class", function(d) {
            if (countryByCode.get(d.properties.ADM0_A3_IS) === "PRK" || countryByCode.get(d.properties.ADM0_A3_IS) === "MMR" || countryByCode.get(d.properties.ADM0_A3_IS) === "AGO" || countryByCode.get(d.properties.ADM0_A3_IS) === "BTN" ||
              countryByCode.get(d.properties.ADM0_A3_IS) === "BRN" ||
              countryByCode.get(d.properties.ADM0_A3_IS) === "SSD" || countryByCode.get(d.properties.ADM0_A3_IS) === "MYS") {
              return "countries-unsigned";
            } else if (statusByCode.get(d.properties.ADM0_A3_IS) === "State_Party") {
              return "countries-signed";
            } else {
              return "countries";
            }
          })
          .transition()
          .duration(500)
          .style("opacity", function(d) {
            if (countryByCode.get(d.properties.ADM0_A3_IS) === "PRK" || countryByCode.get(d.properties.ADM0_A3_IS) === "MMR" || countryByCode.get(d.properties.ADM0_A3_IS) === "AGO" || countryByCode.get(d.properties.ADM0_A3_IS) === "BTN" ||
              countryByCode.get(d.properties.ADM0_A3_IS) === "BRN" ||
              countryByCode.get(d.properties.ADM0_A3_IS) === "SSD" || countryByCode.get(d.properties.ADM0_A3_IS) === "MYS") {
              return 1;
            } else {
              return 0.2;
            }
          });
      } else {
        icerdMap.attr("class", function(d) {
            if (countryByCode.get(d.properties.ADM0_A3_IS) == "MYS") {
              return "countries-unsigned";
            } else if (statusByCode.get(d.properties.ADM0_A3_IS) == "State_Party") {
              return "countries-signed";
            } else {
              return "countries";
            }
          })
          .transition()
          .style("opacity", function(d) {
            if (countryByCode.get(d.properties.ADM0_A3_IS) === "MYS") {
              return 1;
            } else {
              return 0.2;
            }
          });

      }
    }, {
      offset: "60%"
    });

    $("#map-4").waypoint(function(direction) {
      if (direction === "down") {
        icerdMap.attr("class", function(d) {
            if (statusByCode.get(d.properties.ADM0_A3_IS) === "No_Action" || statusByCode.get(d.properties.ADM0_A3_IS) === "Signatory") {
              return "countries-unsigned";
            } else if (statusByCode.get(d.properties.ADM0_A3_IS) === "State_Party") {
              return "countries-signed";
            } else {
              return "countries";
            }
          })
          .transition()
          .duration(500)
          .style("opacity", function(d) {
            if (statusByCode.get(d.properties.ADM0_A3_IS) === "No_Action" || statusByCode.get(d.properties.ADM0_A3_IS) === "Signatory") {
              return 1;
            } else {
              return 0.2;
            }
          });
      } else {
        icerdMap.attr("class", function(d) {
            if (countryByCode.get(d.properties.ADM0_A3_IS) === "PRK" || countryByCode.get(d.properties.ADM0_A3_IS) === "MMR" || countryByCode.get(d.properties.ADM0_A3_IS) === "AGO" || countryByCode.get(d.properties.ADM0_A3_IS) === "BTN" ||
              countryByCode.get(d.properties.ADM0_A3_IS) === "BRN" ||
              countryByCode.get(d.properties.ADM0_A3_IS) === "SSD" || countryByCode.get(d.properties.ADM0_A3_IS) === "MYS") {
              return "countries-unsigned";
            } else if (statusByCode.get(d.properties.ADM0_A3_IS) === "State_Party") {
              return "countries-signed";
            } else {
              return "countries";
            }
          })
          .transition()
          .duration(500)
          .style("opacity", function(d) {
            if (countryByCode.get(d.properties.ADM0_A3_IS) === "PRK" || countryByCode.get(d.properties.ADM0_A3_IS) === "MMR" || countryByCode.get(d.properties.ADM0_A3_IS) === "AGO" || countryByCode.get(d.properties.ADM0_A3_IS) === "BTN" ||
              countryByCode.get(d.properties.ADM0_A3_IS) === "BRN" ||
              countryByCode.get(d.properties.ADM0_A3_IS) === "SSD" || countryByCode.get(d.properties.ADM0_A3_IS) === "MYS") {
              return 1;
            } else {
              return 0.2;
            }
          });
      }
    }, {
      offset: "60%"
    });

    // $("#map-5").waypoint(function(direction) {
    //   if (direction === "down") {
    //     icerdMap.attr("class", function(d) {
    //         if (statusByCode.get(d.properties.ADM0_A3_IS) === "State_Party") {
    //           return "countries-signed";
    //         } else if (statusByCode.get(d.properties.ADM0_A3_IS) === "No_Action" || statusByCode.get(d.properties.ADM0_A3_IS) === "Signatory") {
    //           return "countries-unsigned";
    //         } else {
    //           return "countries";
    //         }
    //       })
    //       .transition()
    //       .duration(500)
    //       .style("opacity", function(d) {
    //         if (statusByCode.get(d.properties.ADM0_A3_IS)) {
    //           return 1;
    //         }
    //       });
    //   } else {
    //     icerdMap.attr("class", function(d) {
    //         if (statusByCode.get(d.properties.ADM0_A3_IS) === "No_Action" || statusByCode.get(d.properties.ADM0_A3_IS) === "Signatory") {
    //           return "countries-unsigned";
    //         } else if (statusByCode.get(d.properties.ADM0_A3_IS) === "State_Party") {
    //           return "countries-signed";
    //         } else {
    //           return "countries";
    //         }
    //       })
    //       .transition()
    //       .duration(500)
    //       .style("opacity", function(d) {
    //         if (statusByCode.get(d.properties.ADM0_A3_IS) === "No_Action" || statusByCode.get(d.properties.ADM0_A3_IS) === "Signatory") {
    //           return 1;
    //         } else {
    //           return 0.2;
    //         }
    //       });
    //   }
    // }, {
    //   offset: "60%"
    // });

    $("#map-5").waypoint(function(direction) {
      if (direction === "down") {
        icerdMap.transition()
          .duration(500)
          .style("opacity", function(d) {
            if (muslimByCode.get(d.properties.ADM0_A3_IS) === "Yes" && statusByCode.get(d.properties.ADM0_A3_IS) === "State_Party") {
              return 1;
            } else {
              return 0.2;
            }
          })
          .attr("class", function(d) {
            if (muslimByCode.get(d.properties.ADM0_A3_IS) === "Yes" && statusByCode.get(d.properties.ADM0_A3_IS) === "State_Party") {
              return "countries-signed-muslim";
            } else if (muslimByCode.get(d.properties.ADM0_A3_IS) === "No" && statusByCode.get(d.properties.ADM0_A3_IS) === "State_Party") {
              return "countries-signed";
            } else if ((muslimByCode.get(d.properties.ADM0_A3_IS) === "No" && statusByCode.get(d.properties.ADM0_A3_IS) != "State_Party") || (muslimByCode.get(d.properties.ADM0_A3_IS) === "Yes" && statusByCode.get(d.properties.ADM0_A3_IS) != "State_Party")) {
              return "countries-unsigned";
            } else {
              return "countries";
            }
          });
      } else {
        icerdMap
          .transition()
          .duration(500)
          .style("opacity", function(d) {
            if (statusByCode.get(d.properties.ADM0_A3_IS) === "No_Action" || statusByCode.get(d.properties.ADM0_A3_IS) === "Signatory") {
              return 1;
            } else {
              return 0.2;
            }
          })
          .attr("class", function(d) {
            if (statusByCode.get(d.properties.ADM0_A3_IS) === "No_Action" || statusByCode.get(d.properties.ADM0_A3_IS) === "Signatory") {
              return "countries-unsigned";
            } else if (statusByCode.get(d.properties.ADM0_A3_IS) === "State_Party") {
              return "countries-signed";
            } else {
              return "countries";
            }
          });
      }
    }, {
      offset: "60%"
    });

    $("#map-7").waypoint(function(direction) {
      if (direction === "down") {
        icerdMap.attr("class", function(d) {
          if ((muslimByCode.get(d.properties.ADM0_A3_IS) === "Yes" && statusByCode.get(d.properties.ADM0_A3_IS) === "No_Action") || (muslimByCode.get(d.properties.ADM0_A3_IS) === "No" && statusByCode.get(d.properties.ADM0_A3_IS) === "Signatory")) {
            return "countries-unsigned";
          } else if (muslimByCode.get(d.properties.ADM0_A3_IS) === "Yes" && statusByCode.get(d.properties.ADM0_A3_IS) === "State_Party") {
            return "countries-signed-muslim";
          } else if (statusByCode.get(d.properties.ADM0_A3_IS) === "State_Party") {
            return "countries-signed";
          } else {
            return "countries";
          }
        });

        icerdMap.transition()
          .duration(500)
          .style("opacity", function(d) {
            if (muslimByCode.get(d.properties.ADM0_A3_IS) === "Yes") {
              return 1;
            } else {
              return 0.2;
            }
          });
      } else {
        icerdMap.transition()
          .duration(500)
          .style("opacity", function(d) {
            if (muslimByCode.get(d.properties.ADM0_A3_IS) === "Yes" && statusByCode.get(d.properties.ADM0_A3_IS) === "State_Party") {
              return 1;
            } else {
              return 0.2;
            }
          });
      }
    }, {
      offset: "60%"
    });
  }

  function setProjection(map, code) {
    projection.scale(1).translate([0, 0]);
    var b = path.bounds(topojson.feature(map, map.objects[code]));
    var s = 0.95 / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height);
    var t = [(width - s * (b[1][0] + b[0][0])) / 2, (height - s * (b[1][1] + b[0][1])) / 2];
    projection.scale(s).translate(t);
  }
});