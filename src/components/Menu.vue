<template>
  <div class="sidebar">
    <div class="company-name">Admin Paneli</div>
    <nav class="nav-menu">
      <router-link to="/dashboard" active-class="active" class="nav-item">
        <span>📊</span>
        Dashboard
      </router-link>
      <router-link to="/users" active-class="active" class="nav-item">
        <span>👥</span>
        Users
      </router-link>
      <router-link to="/roles" active-class="active" class="nav-item">
        <span>📦</span>
        Roles
      </router-link>
      <router-link to="/products" active-class="active" class="nav-item">
        <span>🛍️</span>
        Products
      </router-link>
      <router-link to="/orders" active-class="active" class="nav-item">
        <span>📈</span>
        Orders
      </router-link>
    </nav>
  </div>
</template>

<script>
export default {
  name: "MenU",
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.nav-item span {
  margin-right: 0.75rem;
}

.sidebar {
  position: fixed;
  left: 0;
  top: 0;
  width: 250px;
  height: 100%;
  background: white;
  border-right: 1px solid #e5e7eb;
  padding: 1rem;
}

.company-name {
  padding: 1rem;
  border-bottom: 1px solid #e5e7eb;
  font-size: 1.25rem;
  font-weight: bold;
}

.nav-menu {
  padding: 1rem 0;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  color: #374151;
  text-decoration: none;
  margin-bottom: 0.5rem;
}

.nav-item.active {
  color: #2563eb;
  font-weight: 500;
}
</style>