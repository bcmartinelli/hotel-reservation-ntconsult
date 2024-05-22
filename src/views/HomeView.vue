<template>
  <v-container>
    <h5 class="text-h5 mb-4">Para onde você vai?</h5>
    <SearchForm class="mb-4" />
    <SearchResults v-if="hotels.length" :hotels="hotels" />
  </v-container>
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
h5 {
  color: $secondary-color;
}
@media (max-width: 600px) {
  h1 {
    font-size: 1.5em;
  }
}
</style>
