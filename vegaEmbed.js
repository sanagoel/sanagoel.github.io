// Load CSV, then render the Vega-Lite chart
async function fetchData() {
  const data = await d3.csv("./dataset/videogames_wide.csv");

  // --- Chart 1: Global Sales by Genre and Platform ---
  const spec1 = {
    $schema: "https://vega.github.io/schema/vega-lite/v5.json",
    data: { values: data },
    mark: "bar",
    encoding: {
      x: {
        field: "Platform",
        type: "nominal",
        title: "Platform",
        sort: "-y"
      },
      y: {
        aggregate: "sum",
        field: "Global_Sales",
        type: "quantitative",
        title: "Total Global Sales (millions)"
      },
      color: {
        field: "Genre",
        type: "nominal",
        title: "Genre"
      },
      tooltip: [
        { field: "Platform", type: "nominal" },
        { field: "Genre", type: "nominal" },
        {
          aggregate: "sum",
          field: "Global_Sales",
          type: "quantitative",
          title: "Total Global Sales"
        }
      ]
    },
    width: 700,
    height: 400,
    title: "Global Sales by Genre and Platform"
  };

   // --- Chart 2: Heatmaps of Global Sales by Platform & Genre ---
  const spec2 = {
    $schema: "https://vega.github.io/schema/vega-lite/v5.json",
    vconcat: [
      {
        title: "Heatmap of Global Video Game Sales by Platform and Year",
        data: { values: data },
        mark: "rect",
        encoding: {
          x: { field: "Year", type: "ordinal", title: "Year", sort: "ascending" },
          y: { field: "Platform", type: "nominal", title: "Platform" },
          color: { 
            aggregate: "sum", field: "Global_Sales", type: "quantitative", 
            title: "Total Sales (millions)", scale: { scheme: "blues" } 
          },
          tooltip: [
            { field: "Year", type: "ordinal" },
            { field: "Platform", type: "nominal" },
            { aggregate: "sum", field: "Global_Sales", type: "quantitative", title: "Total Sales" }
          ]
        },
        width: 1000,
        height: 500
      },
      {
        title: "Heatmap of Global Video Game Sales by Genre and Year",
        data: { values: data },
        mark: "rect",
        encoding: {
          x: { field: "Year", type: "ordinal", title: "Year", sort: "ascending" },
          y: { field: "Genre", type: "nominal", title: "Genre" },
          color: { 
            aggregate: "sum", field: "Global_Sales", type: "quantitative", 
            title: "Total Sales (millions)", scale: { scheme: "blues" } 
          },
          tooltip: [
            { field: "Year", type: "ordinal" },
            { field: "Genre", type: "nominal" },
            { aggregate: "sum", field: "Global_Sales", type: "quantitative", title: "Total Sales" }
          ]
        },
        width: 1000,
        height: 500
      }
    ]
  };


   // --- Chart 3: Regional Sales by Platform (Heatmap) ---
const spec3 = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  data: { values: data },
  transform: [
    {
      fold: ["NA_Sales", "EU_Sales", "JP_Sales", "Other_Sales"],
      as: ["Region", "Sales"]
    }
  ],
  mark: "rect",
  encoding: {
    x: { field: "Platform", type: "nominal", title: "Platform" },
    y: { field: "Region", type: "nominal", title: "Region" },
    color: {
      aggregate: "sum",
      field: "Sales",
      type: "quantitative",
      title: "Total Sales (millions)"
    },
    tooltip: [
      { field: "Platform", type: "nominal" },
      { field: "Region", type: "nominal" },
      {
        aggregate: "sum",
        field: "Sales",
        type: "quantitative",
        title: "Total Sales (millions)"
      }
    ]
  },
  width: 700,
  height: 400,
  title: "Regional Sales by Platform"
}
   // --- Chart 4: Regional Genre Preferences (Sales by Genre and Region) ---
  const spec4 = {
    $schema: "https://vega.github.io/schema/vega-lite/v5.json",
    data: { values: data },
    transform: [
      {
        fold: ["NA_Sales", "EU_Sales", "JP_Sales", "Other_Sales"],
        as: ["Region", "Sales"]
      }
    ],
    mark: "bar",
    encoding: {
      x: { field: "Genre", type: "nominal", title: "Genre" },
      y: {
        aggregate: "sum",
        field: "Sales",
        type: "quantitative",
        title: "Total Sales (millions)"
      },
      color: { field: "Region", type: "nominal", title: "Region" },
      tooltip: [
        { field: "Genre", type: "nominal" },
        { field: "Region", type: "nominal" },
        {
          aggregate: "sum",
          field: "Sales",
          type: "quantitative",
          title: "Total Sales (millions)"
        }
      ]
    },
    width: 700,
    height: 400,
    title: "Regional Genre Preferences: Sales by Genre and Region"
  };

  // Render all four charts
  await vegaEmbed("#chart1", spec1);
  await vegaEmbed("#chart2", spec2);
  await vegaEmbed("#chart3", spec3);
  await vegaEmbed("#chart4", spec4);
}


fetchData();
