<template>
  <div class="bütün">
    <MenU></MenU>
    <main class="main-content">
      <NaV></NaV>
      <router-view /> <!--Şu satırdan dolayı neçe hata aldım bu satır index.js içinden export ettiğmiz router bu işte...-->
    </main>
  </div>
</template>

<script>
import NaV from "@/components/Nav.vue";
import MenU from "@/components/Menu.vue";
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

export default {
  name: "Wrapper",
  components: {
    NaV,
    MenU,
  },
  setup() {
    const router = useRouter();

    onMounted(async () => {
      try {
        const { data } = await axios.get('user');

        // Kullanıcı oturum açmışsa ana sayfaya yönlendir
        if (data) {
          await router.push('/');
        }
      } catch (e) {
        // Hata alırsa login sayfasına yönlendir
        await router.push('/login');
      }
    });

    return {};
  }
};

</script>


<style>

.bütün {
  font-family: Arial, sans-serif;
  background: #f3f4f6;
}

.main-content {
  margin-left: 250px;
  padding: 2rem;
}

</style>