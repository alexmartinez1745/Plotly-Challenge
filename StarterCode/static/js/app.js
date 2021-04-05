updatePlots = (data) => {
    // Value of dropdown item
    let id = d3.event.target.value;
    let sample = data.samples.filter(sample => sample.id === id)
    let x_bubble = sample.otu_ids;
    let y_bubble = sample.sample_values;
}

handleChange = (data) => {
    let id = d3.event.target.value;
    updatePlots(data)
}

// Let d3 json load first when you open up the index html
// Use of D3 library to read in the samples data
d3.json("samples.json").then(data => {
    console.log(data);
    // Set up initial stuff
    // Filter our samples to element 940, then build plots
        //filter data.samples and only return the ones where id is equal to 940

    // for bubble:
    // y vals and size are the sample_values
    // x vals are otu_ids
    // text is otu_labels plus the value

    // for hbar:
    // x vals are sample_values
    // y vals are otu_ids
    let id = d3.event.target.value;
    let sample = data.samples.filter(sample => sample.id === id)
    let otuid = sample.otu_ids.slice(0,10)
    let sample_values = sample.sample_values.slice(0,10)

    trace1 = {
        type: "bar",
        orientation: "h",
        x: sample_values,
        y: otuid,
    }

    // for demographic info:
    // Filter metdata for id
    // set internal html of demographic info card

    // Populating select options from data in the html
    let mySelect = d3.select("#selDataset");
    data.names.forEach(element => {
        mySelect.append("option").attr("value", element).text(element);
    })

    // Create a function update plots and bind on change
    mySelect.on("change", () => handleChange(data));

    // when the page first loads, build your plots for id 940

});
