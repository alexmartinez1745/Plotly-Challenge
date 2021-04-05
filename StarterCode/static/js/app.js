updatePlots = (data) => {
    // Value of dropdown item
    let id = d3.event.target.value;
    let sample = data.samples.filter(sample => sample.id === id)
    let x_bubble = sample.otu_ids;
    let y_bubble = sample.sample_values;
}
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

    // for demographic info:
    // Filter metdata for id
    // set internal html of demographic info card

    //for dropdown list:
    // create an option element for all names
    // be sure to set value of the option to ypur filter value

    let mySelect = d3.select("#selDataset");
    // what we know how to do for right now day 2
    data.names.forEach(element => {
        mySelect.append("option").attr("value", element).text(element);
    })

    // Create a function update plots and bind on change
    mySelect.on("change", updatePlots);

});
