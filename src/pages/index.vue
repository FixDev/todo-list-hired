<script setup>
import { defineAsyncComponent, onMounted, reactive, ref } from 'vue';

onMounted(async () => {
  await getActivities();
});

const getActivities = async () => {
  state.showLoading = true;
  const resp = await fetch(
    'https://todo.api.devcode.gethired.id/activity-groups?email=fikrimuhammad2016%40gmail.com',
    {
      method: 'GET',
    }
  );
  const res = await resp.json();

  state.dataList = res.data;
  state.showLoading = false;
  return;
};
const EmptyState = defineAsyncComponent(() =>
  import('@/components/EmptyList.vue')
);

const CardState = defineAsyncComponent(() =>
  import('@/components/CardList.vue')
);

const AlertDone = defineAsyncComponent(() =>
  import('@/components/modal/AlertDone.vue')
);
const alertDone = ref();

const state = reactive({
  dataList: [],
  showLoading: false,
});

const addNewList = async () => {
  const req = {
    title: 'New Activity',
    email: 'fikrimuhammad2016@gmail.com',
  };
  await fetch('https://todo.api.devcode.gethired.id/activity-groups', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(req),
  });
  await getActivities();
  return;
};

const deleteList = async (id) => {
  const resp = await fetch(
    `https://todo.api.devcode.gethired.id/activity-groups/${id}`,
    {
      method: 'DELETE',
    }
  );
  const res = await resp.json();

  state.dataList = state.dataList.filter((val) => val.id !== id);
  alertDone.value.toogleModal();
};
</script>

<template>
  <header class="flex justify-between items-center">
    <h1 class="text-3xl font-bold not-italic" data-cy="activity-title">
      Activity
    </h1>

    <button
      class="bg-primary text-white font-bold py-3.5 px-7 rounded-full text-lg inline-flex gap-1"
      type="button"
      @click="addNewList()"
      data-cy="activity-add-button"
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
    <div
      v-if="state.showLoading"
      class="flex justify-center items-center mt-64 lg:mt-40"
    >
      <div class="loader"></div>
    </div>
    <div data-cy="activity-empty-state" v-else-if="state.dataList.length === 0">
      <EmptyState @click="addNewList()" />
    </div>
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4"
      data-cy="activity-item"
      v-else
    >
      <CardState
        v-for="data in state.dataList"
        :key="data.id"
        :title="data.title"
        :date="data.created_at"
        :id="data.id"
        @when-delete="deleteList(data.id)"
      />
    </div>
  </section>

  <div data-cy="modal-information">
    <AlertDone ref="alertDone" />
  </div>
</template>
