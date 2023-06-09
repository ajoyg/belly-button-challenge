const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"


d3.json(url).then(function(data) {
  let allIds = data.names;
  console.log(allIds);
  d3.select("#selDataset")
      .selectAll('myOptions')
     	.data(allIds)
      .enter()
    	.append('option')
      .text(function (d) { return d; }) // text showed in the menu
      .attr("value", function (d) { return d; }) // corresponding value returned by the button

  let nameID = d3.select("#selDataset").property("value");
  drawAllCharts(nameID);
  });
  

function drawAllCharts(nameID)
{
    d3.json(url).then(function(data){
    
    let sampleMetadata = data.metadata.filter(sample => sample.id == nameID)[0];
    d3.select(".panel-body").html("");
    for (const[key,value] of Object.entries(sampleMetadata)) 
    {
      d3.select(".panel-body").append("small").text(key+": "+value).append("br");
    };
    
    let individualSamples = data.samples.filter(sample => sample.id == nameID)[0];
    console.log(individualSamples);
  
    let top10SortedSampleValues = individualSamples['sample_values'].slice(0, 10);
    console.log(top10SortedSampleValues);
    
    let top10OTUIds = individualSamples['otu_ids'].slice(0,10);
    console.log(top10OTUIds);
    let top10OTUValues = top10OTUIds.map(otuId => "OTU " + otuId);
    console.log(top10OTUValues);
    let reverseSortedSampleValues = top10SortedSampleValues.reverse();
    let reverseSortedOTUValues = top10OTUValues.reverse();

    let trace1 = {
       x: reverseSortedSampleValues, 
       y: reverseSortedOTUValues,
       text: top10OTUValues,
      type: 'bar',
      orientation: 'h'
     }
     let plotData =[trace1];
     Plotly.newPlot('bar', plotData);


     let wScrubData = [
      {
        type: "indicator",
        mode: "number+gauge",
        value: sampleMetadata.wfreq,
        title: { text: "<b>Belly Button Washing Frequency</b><br>Scrubs per week", font: { size: 12 } },
        delta: { reference: 9, increasing: { color: "green" } },
        gauge: {
          axis: { range: [0, 9], tickvals:[0,1,2,3,4,5,6,7,8,9], tickwidth: 1, tickcolor: "green" },
          bar: { color: "green" },
          bgcolor: "white",
          borderwidth: 2,
          bordercolor: "gray",
          steps: [
            { range: [0,1], color: "rgba(228, 242, 207, .5)" },
            { range: [1,2], color: "rgba(210,233, 175, .5)" },
            { range: [2,3], color: "rgba(192, 224, 143, .5)" },
            { range: [3,4], color: "rgba(174, 216, 111, .5)" },
            { range: [4,5], color: "rgba(156, 207, 53, .5)" },
            { range: [5,6], color: "rgba(136, 192, 22, .5)" },
            { range: [6,7], color: "rgba(114, 160, 44, .5)" },
            { range: [7,8], color: "rgba(91, 128, 35, .5)" },
            { range: [8,9], color: "rgba(68, 96, 26, .5)" }
          ],
          threshold: {
            line: { color: "rgba(45, 64, 18, 0)", width: 4 },
            thickness: 0.75,
            value: 9
          }       
        }
    } ];
    
  
   Plotly.newPlot('gauge', wScrubData);
    
    var layout = {
      width: 900,
      height: 500,
      xaxis : { title: "OTU ID" },
      // margin: { t: 25, r: 25, l: 25, b: 25 },
      // paper_bgcolor: "lavender",
      // font: { color: "darkblue", family: "Arial" }
    };
    
    //Plotly.newPlot('myDiv', data, layout);

   
    let trace2= {
      x: individualSamples['otu_ids'],
      y: individualSamples['sample_values'],
      text: individualSamples['otu_labels'],
      mode:'markers',
      marker: {size: individualSamples['sample_values'], color: individualSamples['otu_ids'], colorscale: 'Earth'}
    }
    let plotAllData = [trace2];
    Plotly.newPlot('bubble', plotAllData, layout);

  });
};

function optionChanged(newId) {
    drawAllCharts(newId);
  };