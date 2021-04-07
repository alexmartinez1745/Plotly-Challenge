function init() {
d3.json("samples.json").then(data => {
        console.log(data);
        let mySelect = d3.select("#selDataset");
        data.names.forEach((element) => {
            mySelect.append("option").attr("value", element).text(element);
        });

        let id = mySelect.property("value");

        let sample = data.samples.filter((sample) => sample.id === id);

        // Sort the array in descending order
        let sampleSort = sample.sort(function comp(numOne, numTwo) {
            return numTwo - numOne;
        });

        let otuID = sampleSort.map((otu) => otu.otu_ids);
        let sampleValues = sampleSort.map((samps) => samps.sample_values);
        let labels = sampleSort.map((label) => label.otu_labels);

        mySelect.on("change", () => handleChange(mySelect));
        buildPlots(otuID, sampleValues, labels);
    })   
}

function buildPlots (otuID, sampleValues, labels) {
    otu = otuID[0].slice(0,10).reverse();
    console.log(otu)
    vals = sampleValues[0].slice(0,10).reverse();
    labs = labels[0].slice(0,10).reverse();
    otus = []
    otu.forEach (title => otus.push(`OTU ${title}`))

    let trace1 = {
        type: "bar",
        orientation: "h",
        x: vals,
        y: otus,
        text: labs
    }

    let dataBar = [trace1];
    Plotly.newPlot("bar", dataBar);
}

handleChange = () => {
    d3.event.preventDefault();
    let id = d3.select('#selDataset').property("value");
    init(id)
}

init();