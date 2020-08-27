<template>
  <div>
    <h1>Charts</h1>
    <display-data :energyData="energyData" :generationMix="gChartData"></display-data>

    <div>
      <form v-on:submit.prevent="handleInput">
          <label for="data_from">Date From:</label>
          <input type="datetime-local" v-model="userFrom" placeholder="Date From" /><br />
          <label for="data_from">Date To:</label>
          <input type="datetime-local" v-model="userTo" placeholder="Date To"/>
          <input type="submit" value="Enter dates" />
      </form> 

      <display-data v-if="userGChartData" :generationMix="userGChartData"></display-data> 
    </div>    
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
      gChartData: [['Fuel', 'Percentage']],
      userGChartData: [['Fuel', 'Percentage']],
      userFrom: null,
      userTo: null
    }
  },
  methods: {
    apiCall: function(location, from=null, to=null){
      // Fetch the API data
      let url;
      if (!from && !to){
        url = "https://api.carbonintensity.org.uk/generation"
      } else {
        url = `https://api.carbonintensity.org.uk/generation/${from}/${to}`
      }
      fetch(url)
      .then(response => response.json())
      .then((data) => {
        this.energyData = data.data;
        this.gChartDataFormat(location);
        });
    },
    gChartDataFormat: function(location){
      // Make empty array
      let mix = [];

      this.energyData.generationmix.forEach((type) => {
        mix.push(type.fuel);
        mix.push(type.perc);
        location.push(mix);
        mix = [];
      });
    },
    handleInput: function(){
      // Grab input, convert to date
      let from = new Date(this.userFrom).toISOString();
      let to = new Date(this.userTo).toISOString();

      // Destroy seconds
      from  = from.split('.')[0]+"Z";
      to = to.split('.')[0]+"Z";

      // Call API
      this.apiCall(this.userGChartData, from, to);
    }
  },
  mounted() {
    this.apiCall(this.gChartData)
  },
  components: {
    "display-data": displayData
  }
}
</script>

<style>

</style>