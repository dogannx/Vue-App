<script>
import {onMounted, ref} from 'vue';
import axios from 'axios';
import PaginatoR from "@/components/Paginator.vue";

export default {
  name: "UserS",
  components: {PaginatoR},
  setup() {
    const users = ref([]);
    const lastPage = ref(0);

    const load = async (page = 1) => {
      const {data} = await axios.get(`users?page=${page}`);

      users.value = data.data;
      lastPage.value = data.meta.last_page;
    };

    onMounted(load);

    const del = async (id) => {
      if (confirm('Are you sure?')) {
        await axios.delete(`users/${id}`);

        users.value = users.value.filter((u) => u.id !== id);
      }
    };


    return {
      users,
      lastPage,
      del,
      load
    }
  }
}
</script>

<template>
  <div class="pt-3 pb-2 mb-3 border-bottom">
    <router-link to="/users/create" class="btn-add">Add</router-link>
  </div>

  <div class="table-container">
    <h2 class="table-title">Section title</h2>
    <table>
      <thead>
      <tr>
        <th>#</th>
        <th>Ad</th>
        <th>Email</th>
        <th>Rol</th>
        <th>Eylem</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="user in users" :key="user.id">
        <td>{{ user.id }}</td>
        <td>{{user.name}}{{user.surname}}</td>
        <td>{{user.email}}</td>
        <td>{{user.role.name}}</td>
        <td>
          <div class="btn-group mr-2">
            <router-link :to="`/users/${user.id}/edit`" class="btn-edit">Edit</router-link>
            <a href="javascript:void(0)" class="btn-delete" @click="del(user.id)">Delete</a>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
  </div>

  <PaginatoR :last-page="lastPage" @page-changed="load($event)"></PaginatoR>

</template>

<style>
.table-container {
  background: white;
  border-radius: 0.5rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.table-title {
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 0.75rem 1rem;
  text-align: left;
  border-bottom: 1px solid #e5e7eb;
}

th {
  font-weight: 600;
  color: #374151;
}

tr:hover {
  background: #f9fafb;
}


/*
//sayfalama prev ve next için
*/
.pagination {
  display: flex;
  gap: 1rem;
  list-style: none;
  padding: 0;
  margin: 1rem 0;
}

.pagination-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  background: white;
  color: #374151;
  font-size: 0.875rem;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s;
}

.pagination-button:hover {
  background: #f3f4f6;
  border-color: #d1d5db;
}

.pagination-button:active {
  background: #e5e7eb;
}

.button-icon {
  width: 1.25rem;
  height: 1.25rem;
}


/*
//add ve delete butonları için
*/
.btn-add {
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #4b5563;
  background-color: white;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  transition: all 0.2s ease;
  text-decoration: none;
  cursor: pointer;
  margin: 1rem 0;
}

.btn-add:hover {
  color: #1f2937;
  background-color: #f3f4f6;
  border-color: #9ca3af;
}

.btn-add:active {
  background-color: #e5e7eb;
  border-color: #6b7280;
}

/* Delete butonu stilleri */
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