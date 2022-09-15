<template>
  <div
    class="flex items-center justify-center my-44 lg:my-0"
    data-cy="”activity-empty-state”"
  >
    <img
      v-if="!props.isDetail"
      src="../assets/img/activity-empty-state.png"
      class="w-auto md:w-3/4 lg:w-1/2"
      alt="empty-state"
    />
    <img
      v-else
      src="../assets/img/todo-empty-state.png"
      class="w-auto md:w-3/4 lg:w-1/2"
      alt="empty-state"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  isDetail: { type: Boolean, default: false },
});
</script>

<style scoped></style>
