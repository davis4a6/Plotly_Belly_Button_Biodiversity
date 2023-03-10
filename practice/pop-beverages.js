var trace = {
    x: ["nonalcoholic beer", "nonalcoholic wine", "nonalchoholic martini",
    "nonalcoholic margarita", "ice tea", "nonalcoholic rum & coke", 
    "nonalcoholic mai tai", "nonalcoholic gin & tonic"],
    y: [22.7, 17.1, 9.9, 8.7, 7.2, 6.1, 6.0, 4.6],
    type: "bar"
};

var layout = {
    title: "Popular Drinks in a Nonalcoholic Bar",
    xaxis: {title: "Drinks"},
    yaxis: {title: "Percent of Drinks Ordered"}
};
Plotly.newPlot("plotArea", [trace], layout);