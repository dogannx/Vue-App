<script>
import {ref, watch} from "vue";

export default {
  name: "Paginator",
  emits: ['page-changed'],
  props:{
    lastPage:Number,
  },

  setup(props, context) {
    const page = ref(1);

    //watch
    watch(page, ()=> {
      context.emit('page-changed', page.value);
    });

    const prev = /*async*/ () => {
      if(page.value>1){
        page.value--;
        /*await load();*/ //watch fonksiyonundan dolayı kaldırdık bunu
      }
    }

    const next = /*async*/ () => {
      if(page.value<props.lastPage) {
        page.value++;
        /*await load();*/ //watch fonksiyonundan dolayı kaldırdık bunu
      }
    }
    return {
      next,
      prev,
    }
  }
}
</script>

<template>
  <nav>
    <ul class="pagination">
      <li class="page-item">
        <a class="pagination-button" href="javascript:void(0)" @click="prev">
          <svg class="button-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
          Prev
        </a>
      </li>
      <li class="page-item">
        <a class="pagination-button" href="javascript:void(0)" @click="next">
          Next
          <svg class="button-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
        </a>
      </li>
    </ul>
  </nav>
</template>