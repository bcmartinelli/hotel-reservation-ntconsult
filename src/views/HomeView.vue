<template>
  <div>
    <h1>Pesquisa de Hotéis</h1>
    <SearchForm />
    <SearchResults v-if="hotels.length" :hotels="hotels" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import SearchForm from '@/components/forms/SearchForm.vue';
import SearchResults from '@/components/SearchResults.vue';
import { useSearchStore } from '@/store/search';
import { computed } from 'vue';

export default defineComponent({
  components: { SearchForm, SearchResults },
  setup() {
    const searchStore = useSearchStore();
    const hotels = computed(() => searchStore.hotels);

    onMounted(() => {
      searchStore.fetchHotels();
    });

    return {
      hotels,
    };
  },
});
</script>

<style lang="scss" scoped>
h1 {
  color: $primary-color;
  text-align: center;
  margin-bottom: 20px;
}
@media (max-width: 600px) {
  h1 {
    font-size: 1.5em;
  }
}
</style>
