<template>
  <div class="header-container">
    <nav>
      <RouterLink to="/">Header</RouterLink>
    </nav>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {},
});
</script>

<style lang="scss" scoped>
.header-container {
  color: white;
  background: $secondary-color;
  padding: 15px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;

  a {
    color: white;
    text-decoration: none;
  }
}

@media (max-width: 600px) {
  .notification {
    width: 90%;
    left: 5%;
    right: 5%;
  }
}
</style>
