<template>
  <div class="pt-3 pb-2 mb-3 border-bottom d-flex justify-content-between">
    <a href="javascript:void(0)" class="btn btn-sm btn-primary action-button" @click="exportCSV">Export</a>
  </div>

  <div class="table-container mt-3">
    <div class="table-responsive">
      <table class="table table-sm">
        <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Email</th>
          <th>Total</th>
          <th>Action</th>
        </tr>
        </thead>
        <tbody>
        <template v-for="order in orders" :key="order.id">
          <tr>
            <td>{{ order.id }}</td>
            <td>{{ order.name }}</td>
            <td>{{ order.email }}</td>
            <td>{{ order.total }}</td>
            <td>
              <div class="btn-group mr-2">
                <a href="javascript:void(0)" class="btn btn-sm btn-info view-button" @click="select(order.id)">View</a>
              </div>
            </td>
          </tr>
          <transition name="slide-fade">
            <tr v-if="selected === order.id">
              <td colspan="5">
                <div class="order-details">
                  <table class="table table-sm">
                    <thead>
                    <tr>
                      <th>#</th>
                      <th>Product Title</th>
                      <th>Quantity</th>
                      <th>Price</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="item in order.order_items" :key="item.id">
                      <td>{{ item.id }}</td>
                      <td>{{ item.product_title }}</td>
                      <td>{{ item.quantity }}</td>
                      <td>{{ item.price }}</td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </td>
            </tr>
          </transition>
        </template>
        </tbody>
      </table>
    </div>
  </div>

  <Paginator :last-page="lastPage" @page-changed="load($event)"/>
</template>

<script lang="ts">
import {ref, onMounted} from 'vue';
import axios from 'axios';
import Paginator from "@/components/Paginator.vue";

export default {
  name: "OrderS",
  components: {Paginator},
  setup() {
    const orders = ref([]);
    const lastPage = ref(0);
    const selected = ref(0);

    const load = async (page = 1) => {
      const {data} = await axios.get(`orders?page=${page}`);
      orders.value = data.data;
      lastPage.value = data.meta.last_page;
    };

    onMounted(load);

    const select = (id: number) => selected.value = selected.value !== id ? id : 0;

    const exportCSV = async () => {
      const {data} = await axios.post('export', {}, {responseType: 'blob'});
      const blob = new Blob([data], {type: 'text/csv'});
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'orders.csv';
      link.click();
    }

    return {
      orders,
      lastPage,
      selected,
      load,
      select,
      exportCSV
    }
  }
}
</script>

<style scoped>
.show {
  max-height: 150px;
  transition: max-height 1000ms ease-in;
}

.hide {
  max-height: 0;
  transition: max-height 1000ms ease-out;
}

/* Buton stilleri */
.action-button {
  border-radius: 4px;
  font-weight: 500;
  transition: all 0.3s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.action-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
}

.view-button {
  border-radius: 4px;
  font-weight: 500;
  padding: 0.25rem 0.75rem;
  transition: all 0.3s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.view-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
}

.btn-group {
  display: inline-flex;
}

/* Sipariş detaylarını ayrı bir kutu haline getirme */
.order-details {
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 5px;
  margin-top: 10px;
}

.table-container {
  margin-top: 20px;
}

/* Açılış ve kapanış animasyonu */
.slide-fade-enter-active {
  transition: all 0.5s ease-in-out;
}
.slide-fade-leave-active {
  transition: all 0.3s ease-in-out;
}
.slide-fade-enter, .slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
