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

    // Filter through the metadata for demographic info for each specific id
    let demoInfo = data.metadata.filter((demo) => demo.id === id);

    // Bring in built functions for init
    // Bind a change event for dropdown changes
    mySelect.on("change", () => handleChange(mySelect));

    // Build plots in seperate function then call
    buildPlots(otuID, sampleValues, labels);
    metaData();
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
function metaData() {
  
}

// Function to change options on dropdown selector (bind to change event in init)
handleChange = () => {
  d3.event.preventDefault();
  let id = d3.select("#selDataset").property("value");
  init(id);
};

// Call init function
init();





//         // for demographic info:
//         // Filter metdata for id
//         // set internal html of demographic info card

