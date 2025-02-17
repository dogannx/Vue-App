<script>
import { onMounted, ref } from 'vue';
import axios from 'axios';
import PaginatoR from "@/components/Paginator.vue";

export default {
  name: "Products",
  components: {PaginatoR},
  setup() {
    const products = ref([]);
    const lastPage = ref(0);

    const load = async (page = 1) => {
      const { data } = await axios.get(`products?page=${page}`);

      products.value = data.data;
      lastPage.value = data.meta.last_page;
    };

    onMounted(load);

    const del = async (id) => {
      if (confirm('Are you sure?')) {
        await axios.delete(`products/${id}`);

        products.value = products.value.filter((p) => p.id !== id);
      }
    };

    return {
      products,
      lastPage,
      del,
      load
    };
  }
};
</script>

<template>

  <div class="pt-3 pb-2 mb-3 border-bottom">
    <router-link to="/products/create" class="btn-add">Add</router-link>
  </div>

  <div class="table-container">
    <h2 class="table-title">Products</h2>
    <table>
      <thead>
      <tr>
        <th>#</th>
        <th>Resim</th>
        <th>Başlık</th>
        <th>Açıklama</th>
        <th>Ücret</th>
        <th>Eylem</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="product in products" :key="product.id">
        <td>{{ product.id }}</td>
        <td><img :src="product.image" width="50" /></td>
        <td>{{ product.title }}</td>
        <td>{{ product.description }}</td>
        <td>{{ product.price }}</td>
        <td>
          <div class="btn-group">
            <router-link :to="`/products/${product.id}/edit`" class="btn-edit">Edit</router-link>
            <button class="btn-delete btn btn-sm" @click="del(product.id)">Delete</button>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
  </div>

  <PaginatoR :last-page="lastPage" @page-changed="load($event)"></PaginatoR>
</template>

<style>
.btn-delete {
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #dc2626;
  background-color: transparent;
  border: 1px solid #dc2626;
  border-radius: 0.375rem;
  transition: all 0.2s ease;
  text-decoration: none;
  cursor: pointer;
}

.btn-delete:hover {
  color: white;
  background-color: #dc2626;
}

.btn-delete:active {
  background-color: #b91c1c;
  border-color: #b91c1c;
}

/* Edit butonu stilleri */
.btn-edit {
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #3b82f6;
  background-color: transparent;
  border: 1px solid #3b82f6;
  border-radius: 0.375rem;
  transition: all 0.2s ease;
  text-decoration: none;
  cursor: pointer;
  margin-right: 0.5rem;
}

.btn-edit:hover {
  color: white;
  background-color: #3b82f6;
}

.btn-edit:active {
  background-color: #2563eb;
  border-color: #2563eb;
}
</style>