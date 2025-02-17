<template>
  <main class="form-signin w-100 m-auto">
    <form @submit.prevent="submit">
      <h1 class="h3 mb-3 fw-normal">Please Login</h1>

      <div class="form-floating mb-3">
        <input v-model="form.email" type="email" class="form-control" id="email" placeholder="name@example.com" required>
        <label for="email"></label>
      </div>

      <div class="form-floating mb-3">
        <input v-model="form.password" type="password" class="form-control" id="password" placeholder="Password" required>
        <label for="password"></label>
      </div>

      <button class="btn btn-primary w-100 py-2" type="submit">Giriş</button>
    </form>
  </main>
</template>

<script>
import {reactive} from "vue";
import axios from "axios";
import {useRouter} from "vue-router";

export default {
  name: 'LogiN',
  setup(){
    const form = reactive({
      email: "",
      password: "",
    })

    const router= useRouter();

    const submit = async () => {
      await axios.post("login", {
        email: form.email,
        password: form.password
      });

      await router.push("/");
    }

    return {
      form,
      submit,
    }
  }
}
</script>

<style>
html, body {
  height: 100%;
  margin: 0;
  background-color: #f5f5f5;
  font-family: 'Arial', sans-serif;
}

.form-signin {
  max-width: 400px;
  margin: 40px auto;
  padding: 2rem;
  background: white;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 2rem;
  font-weight: 500;
}

.form-floating {
  position: relative;
  margin-bottom: 1.5rem;
}

.form-control {
  width: 100%;
  padding: 1rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  box-sizing: border-box;
}

.form-control:focus {
  outline: none;
  border-color: #4a90e2;
  box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
}

.form-floating label {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
  transition: all 0.3s ease;
  pointer-events: none;
  font-size: 0.9rem;
}

.form-floating input:focus ~ label,
.form-floating input:not(:placeholder-shown) ~ label {
  top: 0;
  font-size: 0.8rem;
  background: white;
  padding: 0 5px;
  color: #4a90e2;
}

.btn-primary {
  width: 100%;
  padding: 1rem;
  font-size: 1rem;
  color: #000000;
  background-color: #4a90e2;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-primary:hover {
  background-color: #357abd;
}

.btn-primary:active {
  transform: translateY(1px);
}

/* Hata durumları için */
.form-control.is-invalid {
  border-color: #dc3545;
}

.invalid-feedback {
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

/* Animasyonlar */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

.form-signin {
  animation: fadeIn 0.5s ease-out;
}

/* Responsive tasarım */
@media (max-width: 480px) {
  .form-signin {
    max-width: 100%;
    margin: 20px;
    padding: 1.5rem;
  }
}
</style>