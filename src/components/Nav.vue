<script>
import {onMounted, ref} from "vue";
import axios from "axios";

export default {
  name: "NaV",

  setup() {
    const name = ref();

    onMounted(async ()=>{
      const {data} = await axios.get("user")
      name.value = data.name + " " + data.surname;
    });

    const logout = async () => {
      await axios.post("logout")
    }

    return{
      name,
      logout
    }
  }
}
</script>

<template>
  <div class="header">
    <div class="header-buttons">
      <h2>{{ name }}</h2>
      <router-link to="login" class="btn" @click="logout">Logout</router-link>
    </div>
  </div>
</template>

<style>
.header {
  display: flex;
  justify-content: flex-end; /* Changed from space-between to flex-end */
  align-items: center;
  margin-bottom: 2rem;
}

.header h2 {
  font-size: 1.5rem;
  font-weight: bold;
}

.header-buttons {
  display: flex;
  gap: 1rem;
  align-items: center; /* Added to ensure vertical alignment */
}

.btn {
  padding: 0.5rem 1rem;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  cursor: pointer;
}
</style>