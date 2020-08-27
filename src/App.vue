<template>
  <div>
    <h1>Charts</h1>
    <display-data :energyData="energyData" :generationMix="gChartData"></display-data>

    <p>{{ gChartData }}</p>
  </div>
</template>

<script>
// Imports
import displayData from "./components/displayData";

// App component
export default {
  name: "app",
  data(){
    return{
      // App data
      energyData: [],
      gChartData: [['Fuel', 'Percentage']]
    }
  },
  methods: {
    apiCall: function(){
      // Fetch the API data
      fetch("https://api.carbonintensity.org.uk/generation")
      .then(response => response.json())
      .then((data) => {
        this.energyData = data.data;
        this.gChartDataFormat();
        });
    },
    gChartDataFormat: function(){
      // Make empty array
      let mix = [];

      // Grab the dataset
      // for (type in this.energyData.generationmix){
      //   mix.push(type.fuel);
      //   mix.push(int(type.perc));
      //   this.gChartData.push(mix);
      // }
      this.energyData.generationmix.forEach((type) => {
        mix.push(type.fuel);
        mix.push(type.perc);
        this.gChartData.push(mix);
        mix = [];
      });
    }
  },
  mounted() {
    this.apiCall()
  },
  components: {
    "display-data": displayData
  }
}
</script>

<style>

</style>