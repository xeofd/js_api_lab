// Imports 
import { mount } from  '@vue/test-utils';
import App from "@/App.vue";
import { data } from "./data.js";

// Create mock fetch
global.fetch = jest.fn(() =>
Promise.resolve({
  json: () => Promise.resolve({} ),
})
);

// Describe
describe("App", () => {
    
    // Tests

    // Test 1: it should have one object
    it("should have 1 object", () => {
        // Set up
        const wrapper = mount(App);
        wrapper.setData({
            energyData: data
        });

        // Test
        expect(wrapper.vm.energyData).toMatchObject(data);
    });

    // Test 2: it should have 9 array items
    it('should have 10 items', async () => {
        // Set up
        const wrapper = mount(App);
        wrapper.setData({
            energyData: data,
            gChartData: [['Fuel', 'Percentage']]
        });
        await wrapper.vm.$nextTick();

        wrapper.vm.gChartDataFormat();
        await wrapper.vm.$nextTick();

        // Test
        expect(wrapper.vm.gChartData).toHaveLength(10);
    });
});