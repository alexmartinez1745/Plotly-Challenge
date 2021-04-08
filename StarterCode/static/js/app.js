// Function init for start of browser open
function init() {
  // Use of D3 library to read in the samples data
  d3.json("../data/samples.json").then((data) => {
    console.log(data);

    // Populating select options from data in the html
    let mySelect = d3.select("#selDataset");
    data.names.forEach((element) => {
      mySelect.append("option").attr("value", element).text(element);
    });

    // Value of id in dropdown
    let id = mySelect.property("value");

    // Filter the sample data for id selected in dropdown
    // When page first loads it will grab first id on list (940)
    // Will be default for refreshes and opening of html page
    let sample = data.samples.filter((sample) => sample.id === id);

    // Sort the samples in descending order
    let sampleSort = sample.sort((a, b) => {
      return b - a;
    });

    // Map to find each value for bar and bubble charts
    let otuID = sampleSort.map((otu) => otu.otu_ids);
    let sampleValues = sampleSort.map((samps) => samps.sample_values);
    let labels = sampleSort.map((label) => label.otu_labels);

    // meta ids are set to integers not strings, so must change with parse
    let metaIDs = parseInt(id)

    // Filter through the metadata for demographic info for each specific id
    let demoFilter = data.metadata.filter((demo) => demo.id === metaIDs);
    // Grab first id selected
    let demos = demoFilter[0];

    // Bring in built functions for init
    // Bind a change event for dropdown changes
    mySelect.on("change", () => handleChange(mySelect));

    // Build plots in seperate function then call
    buildPlots(otuID, sampleValues, labels);

    // Call demographic information from function
    metaData(demos);
  });
}

// Creating plots
function buildPlots(otuID, sampleValues, labels) {
  // Grab sorted samples, slice the first 10 and reverse their order
  otu = otuID[0].slice(0, 10).reverse();
  vals = sampleValues[0].slice(0, 10).reverse();
  hoverText = labels[0].slice(0, 10).reverse();
  // check to see if values of array are correct and in order
  console.log(`OTU selected, top IDs: 
          ${otu}
  And their values:
          ${vals}`);
  
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
    marker: { color: vals, colorscale: "Portland" },
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
    marker: { color: bubbleX, size: bubbleY, colorscale: "Portland" },
  };
  // Call the trace for bubble chart and create chart
  let dataBubble = [trace2];
  Plotly.newPlot("bubble", dataBubble);
}

// Grabbing information to fill the demographic info bootstap card
function metaData(demos) {
  let demoInfo = d3.select("#sample-metadata");
  demoInfo.html("")
  Object.entries(demos).forEach(([key,value]) => {
    demoInfo.append("option").text(`${key} : ${value}`)
  })

  // For the gauge chart
  let gaugeFreq = demos.wfreq
  let trace3 = {
    // domain: { x: [0, 1], y: [0, 1] },
		value: gaugeFreq,
		title: { text: "Washing Frequency" },
		type: "indicator",
		mode: "gauge+number",
    gauge: {
      axis: { range: [null, 9] },
      bar: { color: "darkblue" },
      steps: [
        { range: [0, 1], color: "00CCFF" },
        { range: [1, 2], color: "00CCFF" },
        { range: [2, 3], color: "00CCCC" },
        { range: [3, 4], color: "00CCCC" },
        { range: [4, 5], color: "00CC99" },
        { range: [5, 6], color: "00CC60" },
        { range: [6, 7], color: "00CC49" },
        { range: [7, 8], color: "00CC33" },
        { range: [8, 9], color: "00CC00" },
      ]
    }
  }
  let dataGauge = [trace3]
  Plotly.newPlot("gauge", dataGauge)
}

// Function to change options on dropdown selector (bind to change event in init)
handleChange = () => {
  d3.event.preventDefault();
  let id = d3.select("#selDataset").property("value");
  init(id);
};

// Call init function
init();


