<template>
    <div>
        <!-- <h2>Time between: {{ energyData.from }} and {{ energyData.to }}</h2> -->
        <g-chart type="PieChart" :data="generationMix"></g-chart>
    </div>
</template>

<script>
// Imports
import { GChart } from "vue-google-charts";

// Display data component
export default {
    name: 'display-data',
    props: ['energyData', 'generationMix'],
    components: {
        'g-chart': GChart
    }
}
</script>

<style>

</style>