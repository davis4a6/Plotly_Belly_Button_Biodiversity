
d3.json('./assets/data/samples.json').then(({ names }) => {

    names.forEach(name => {
        d3.select('select').append('option').text(name);
    });

    optionChanged();
})

const optionChanged = () => {
    let option = d3.select('select').node().value;

    d3.json('./assets/data/samples.json').then(({ metadata, samples }) => {
        let meta = metadata.filter(obj => obj.id == option)[0];
        let sample = samples.filter(obj => obj.id == option)[0];

        d3.select('.panel-body').html('');
        Object.entries(meta).forEach(([key, val]) => {
            d3.select('.panel-body').append('h4').text(`${key.toUpperCase()}: ${val}`);
        })

        let { otu_ids,sample_values,otu_labels } = sample;

        var data = [
            {
              x: sample_values.slice(0, 10).reverse(),
              y: otu_ids.slice(0, 10).reverse().map(X => `OTU ${X}`),
              text: otu_labels.slice(0, 10).reverse(),
              orientation: "h",
              type: 'bar'
            }
          ];
          
        var layout = {
            title: 'Top 10 Bacteria Cultures Found',
            showlegend: false,
        };

          Plotly.newPlot('bar', data, layout);

          var trace1 = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: 'markers',
            marker: {
              size: sample_values,
              color: otu_ids,
              colorscale: "Earth",
            }
          };
          
          var data = [trace1];
          
          var layout = {
            title: 'Bacteria Cultures Per Sample',
            xaxis: {title: 'OTU ID'},
            showlegend: false,
            margin: { t: 50 },
            width: 1200
          };
          
          Plotly.newPlot('bubble', data, layout);

          var data = [
            {
              domain: { x: [0, 1], y: [0, 1] },
              value: meta.wfreq,
              title: { text: "<b>Belly Button Washing Frequency</b> <br>Scrubs per week", font: {size: 24 } },
              type: "indicator",
              mode: "gauge+number+delta",
              gauge: { 
                axis: { range: [null, 10], tickwidth: 1, tickcolor: "darkblue" },
                bar: { color: "darkblue" },
                bgcolor: "white",
                borderwidth: 2,
                bordercolor: "gray",
                steps: [
                  { range: [0, 2], color: "cyan"},
                  { range: [2, 4], color: "royalblue"},
                  { range: [4, 6], color: "mediumblue"},
                  { range: [6, 8], color: "slateblue"},
                  { range: [8, 10], color: "midnightblue"}
                ],
                threshold: {
                  line: { color: "blue", width: 4 },
                  thickness: 0.75,
                  value: 490
                }
              }
            }
          ];
          
          var layout = { width: 500, height: 400, margin: { t: 0, b: 0, l: 0, r: 0 } };
          Plotly.newPlot('gauge', data, layout);

    })
}