<script setup>
import { defineAsyncComponent, reactive } from 'vue';

const EmptyState = defineAsyncComponent(() =>
  import('@/components/EmptyList.vue')
);

const CardState = defineAsyncComponent(() =>
  import('@/components/CardList.vue')
);

const state = reactive({
  dataList: [],
});

const addNewList = () => {
  state.dataList.push({
    id: 2,
    title: 'New Activity',
    date: '14 September 2022',
  });
};

const deleteList = () => {
  state.dataList.pop();
};
</script>

<template>
  <header class="flex justify-between items-center">
    <h1 class="text-3xl font-bold not-italic">Activity</h1>

    <button
      class="bg-primary text-white font-bold py-3.5 px-7 rounded-full text-lg inline-flex gap-1"
      type="button"
      @click="addNewList"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 4.99988V18.9999"
          stroke="white"
          stroke-width="2"
          stroke-linecap="square"
          stroke-linejoin="round"
        />
        <path
          d="M5 12H19"
          stroke="white"
          stroke-width="2"
          stroke-linecap="square"
          stroke-linejoin="round"
        />
      </svg>
      Tambah
    </button>
  </header>
  <section class="mt-7 lg:mt-13">
    <EmptyState @click="addNewList" v-if="state.dataList.length === 0" />
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4"
      v-else
    >
      <CardState
        v-for="data in state.dataList"
        :key="data.id"
        :title="data.title"
        :date="data.date"
        :id="data.id"
        @when-delete="deleteList(data.id)"
      />
    </div>
  </section>
</template>
