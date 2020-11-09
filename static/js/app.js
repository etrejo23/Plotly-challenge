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
    
    // The function is triggered by an option change in the Dropdown box of "Test Subject ID No" in index.html
    // <select id="selDataset" onchange="optionChanged(this.value)">
    function optionChanged(selected_id) {
      console.log("selected_id=", selected_id);
    
      plot_chart(selected_id);   
     }
  