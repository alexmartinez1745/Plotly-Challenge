// Function init for start of browser open
function init() {
  // Use of D3 library to read in the samples data
  d3.json("samples.json").then((data) => {
    console.log(data);

    // Populating select options from data in the html
    let mySelect = d3.select("#selDataset");
    data.names.forEach((element) => {
      mySelect.append("option").attr("value", element).text(element);
    });

    // Value of id in dropdown
    let id = mySelect.property("value");

    // Filter the sample data for id selected in dropdown
    let sample = data.samples.filter((sample) => sample.id === id);

    // Sort the samples in descending order
    let sampleSort = sample.sort((a, b) => {
      return b - a;
    });

    // Map to find each value for charts
    let otuID = sampleSort.map((otu) => otu.otu_ids);
    let sampleValues = sampleSort.map((samps) => samps.sample_values);
    let labels = sampleSort.map((label) => label.otu_labels);

    // Bring in built functions for init
    // Bind a change event for dropdown changes
    mySelect.on("change", () => handleChange(mySelect));

    // Build plots in seperate function then call
    buildPlots(otuID, sampleValues, labels);
  });
}

// Creating plots
function buildPlots(otuID, sampleValues, labels) {
  // Grab sorted samples, slice the first 10 and reverse their order
  otu = otuID[0].slice(0, 10).reverse();
  // check to see if values of array are correct and in order
  // console.log(otu);
  vals = sampleValues[0].slice(0, 10).reverse();
  hoverText = labels[0].slice(0, 10).reverse();
  // Creating the labels for the y axis
  otus = [];
  otu.forEach((title) => otus.push(`OTU ${title}`));

  // Build the horizontal bar chart with variables created above
  let trace1 = {
    type: "bar",
    orientation: "h",
    x: vals,
    y: otus,
    text: hoverText,
    marker: {color: vals,colorscale: 'Portland'}
  };

  // Call the trace for barchart and create chart
  let dataBar = [trace1];
  Plotly.newPlot("bar", dataBar);

  // Create bubble values and labels
  let bubbleY = sampleValues[0];
  let bubbleX = otuID[0];
  let bubbleHover = labels[0];

  // Build the bubble chart
  let trace2 = {
    text: bubbleHover,
    x: bubbleX,
    y: bubbleY,
    mode: "markers",
    marker: {color: bubbleX, size: bubbleY, colorscale: 'Portland'},
  }
  // Call the trace for bubble chart and create chart
  let dataBubble = [trace2]
  Plotly.newPlot("bubble", dataBubble)
}

// Function to change options on dropdown selector (bind to change event in init)
handleChange = () => {
  d3.event.preventDefault();
  let id = d3.select("#selDataset").property("value");
  init(id);
};

init();

//   // updatePlots(0);
//     // Set up initial stuff
//     // Filter our samples to element 940, then build plots
//         //filter data.samples and only return the ones where id is equal to 940
//         function updatePlots(index) {
//             // Value of dropdown item
//             // let id = data.samples.otu_ids;
//             // let sample = data.samples.filter(sample => sample.id === id)
//             // let x_bubble = sample.otu_ids;
//             // let y_bubble = sample.sample_values;
//             otuid = data.samples[index].otu_ids.slice(0,10).reverse()
//             sample_values = data.samples[index].sample_values.slice(0,10).reverse()
//             labels = data.samples[index].otu_labels
    
//             let trace1 = {
//                 type: "bar",
//                 orientation: "h",
//                 x: sample_values,
//                 y: otuid,
//             }
        
//             datap = [trace1];
//             Plotly.newPlot("bar", datap)
    
//         }
        
    
//         // for bubble:
//         // y vals and size are the sample_values
//         // x vals are otu_ids
//         // text is otu_labels plus the value
    
//         // for hbar:
//         // x vals are sample_values
//         // y vals are otu_ids
//         // let id = d3.event.target.value;
//         // let sample = data.samples.filter(sample => sample.id === id)
//         // console.log(sample)
//         // let otuid = data.samples.otu_ids
//         // let sample_values = data.sample_values
    
//         // let trace1 = {
//         //     type: "bar",
//         //     orientation: "h",
//         //     x: sample_values,
//         //     y: otuid,
//         // }
    
//         // datap = [trace1];
//         // Plotly.newPlot("bar", datap)
    
//         // for demographic info:
//         // Filter metdata for id
//         // set internal html of demographic info card
    
        
    
//         // Create a function update plots and bind on change
//         mySelect.on("change", () => handleChange(data));
    
//         // when the page first loads, build your plots for id 940
