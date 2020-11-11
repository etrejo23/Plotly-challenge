// First time index.html is loaded with the dashboard of 940
    var select_tag = d3.select("#selDataset");

    d3.json("samples.json").then((data) => {
      var subject_ids = data.names;
    
      console.log("Subject_ids")
      console.log(subject_ids)
    
      subject_ids.forEach((id) => {
        select_tag
          .append("option")
          .property("value", id)
          .text(id);
      });
    
      plot_chart(subject_ids[0]);    
    });
    
     function optionChanged(selected_id) {
      console.log("selected_id=", selected_id);
    
      plot_chart(selected_id);   
     }
     function plot_chart(selected_id) {
        //  Create a horizontal bar chart, the buble chart and display the meta data with a dropdown menu to display the top 10 OTUs found in that individual.
        //  Use`sample_values` as the values for the bar chart.
        //  Use`otu_ids` as the labels for the bar chart.
        //  Use`otu_labels` as the hovertext for the chart.

        //  Use otu_ids for the x values.
        //  Use sample_values for the y values.
        //  Use sample_values for the marker size.
        //  Use otu_ids for the marker colors.
        //  Use otu_labels for the text values.

      
        d3.json("samples.json").then((data) => {
          var samples = data.samples;
      
          var results = samples.filter(sampleObj => sampleObj.id == selected_id);
      
          console.log("results: ")
          console.log(results)
      
          var result = results[0];
      
          console.log("result: ")
          console.log(result)
      
          var otu_ids = result.otu_ids;
          var otu_labels = result.otu_labels;
          var sample_values = result.sample_values;
      
          var y_label = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
          var bar_info = [
            {
              y: y_label,
              x: sample_values.slice(0, 10).reverse(),
              text: otu_labels.slice(0, 10).reverse(),
              type: "bar",
              orientation: "h",
            }
          ];
      
          var bar_fig = {
            title: "Top 10 Bacteria Cultures Found",
            margin: { t: 30, l: 150 }
          };
      
          Plotly.newPlot("bar", bar_info, bar_fig);
      
   
      
          var bubble_info = [
            {
              x: otu_ids,
              y: sample_values,
              text: otu_labels,
              mode: "markers",
              marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: 'Electric',
              }
            }
          ];
      
          var bubble_fig = {
            title: "Bacteria Cultures Per Sample",
            margin: { t: 0 },
            hovermode: "closest",
            xaxis: { title: "OTU ID" },
            margin: { t: 30 }
          };
              
          Plotly.newPlot("bubble", bubble_info, bubble_fig);
  
          //This part reads the demographic information
          var metadata = data.metadata;
          var results = metadata.filter(sampleObj => sampleObj.id == selected_id);
          var result = results[0];
      
          console.log("metadata")
          console.log("results")
      
          var fig = d3.select("#sample-metadata");
      
          fig.html("");
      
          Object.entries(result).forEach(([key, value]) => {
            fig.append("h6").text(`${key}: ${value}`);
          });
      
          buildGauge(result.wfreq);
        });
      }