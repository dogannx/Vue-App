<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import axios from 'axios';
import * as c3 from 'c3';

export default defineComponent({
  name: 'DashBoard',
  setup() {
    onMounted(async () => {
      // Önce sabit veri ile grafiği oluştur
      const chart = c3.generate({
        bindto: '#chart',
        data: {
          x: 'x',
          columns: [
            ['x', '2025-1-1', '2025-2-2'],
            ['Sales', 100, 200]
          ],
          types: {
            Sales: 'bar'
          }
        },
        axis: {
          x: {
            type: 'timeseries',
            tick: {
              format: '%Y-%m-%d'
            }
          }
        }
      });

      try {
        const { data } = await axios.get('chart');

        console.log("Gelen veri:", data); // Burada veriyi kontrol edebilirsin

        if (!Array.isArray(data) || data.length === 0) {
          console.error("HATA: API'den gelen veri boş veya hatalı!");
          return;
        }

        chart.load({
          columns: [
            ['x', ...data.map((r: any) => r.date)],
            ['Sales', ...data.map((r: any) => r.sum)]
          ]
        });
      } catch (error) {
        console.error("Veri çekme hatası:", error);
      }
    });

  }
});
</script>

<template>
  <h2>Daily Sales</h2>

  <div id="chart"></div>
</template>