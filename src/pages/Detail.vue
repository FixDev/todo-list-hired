<script setup>
import { defineAsyncComponent, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const modalAdd = ref();

const EmptyList = defineAsyncComponent(() =>
  import('@/components/EmptyList.vue')
);

const CardList = defineAsyncComponent(() =>
  import('@/components/CardList.vue')
);

const ModalAdd = defineAsyncComponent(() =>
  import('@/components/modal/Add.vue')
);

const state = reactive({
  dataList: [],
});

const showModal = () => {
  modalAdd.value.toogleModal();
  return;
};

const editTitle = () => {
  document.getElementById('detail-title').focus();
  return;
};
</script>

<template>
  <header class="flex justify-between items-center">
    <div class="inline-flex items-center gap-2">
      <button type="button" @click="router.push('/')">
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.66675 16L14.6667 24"
            stroke="#111111"
            stroke-width="5"
            stroke-linecap="square"
          />
          <path
            d="M6.66675 16L14.6667 8"
            stroke="#111111"
            stroke-width="5"
            stroke-linecap="square"
          />
        </svg>
      </button>
      <h1
        class="text-3xl font-bold not-italic"
        id="detail-title"
        contenteditable="true"
      >
        New Activity
      </h1>
      <button type="button" @click="editTitle()">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 19.9998H8L18.5 9.49981C19.0304 8.96938 19.3284 8.24996 19.3284 7.49981C19.3284 6.74967 19.0304 6.03025 18.5 5.49981C17.9696 4.96938 17.2501 4.67139 16.5 4.67139C15.7499 4.67139 15.0304 4.96938 14.5 5.49981L4 15.9998V19.9998Z"
            stroke="#A4A4A4"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M13.5 6.49982L17.5 10.4998"
            stroke="#A4A4A4"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>

    <div class="inline-flex items-center gap-4">
      <button class="p-3.5 rounded-full border-2 border-gray-300" type="button">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 9L7 5M7 5L11 9M7 5V19"
            stroke="#888888"
            stroke-width="1.5"
            stroke-linecap="square"
          />
          <path
            d="M21 15L17 19M17 19L13 15M17 19V5"
            stroke="#888888"
            stroke-width="1.5"
            stroke-linecap="square"
          />
        </svg>
      </button>
      <button
        class="bg-primary text-white font-bold py-3.5 px-7 rounded-full text-lg inline-flex gap-1"
        type="button"
        @click="showModal()"
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
    </div>
  </header>
  <section class="mt-7 lg:mt-13">
    <EmptyList
      @click="showModal()"
      :is-detail="true"
      v-if="state.dataList.length === 0"
    />
    <div
      class="p-6 w-full h-20 bg-white rounded-xl border border-gray-200 shadow-xl inline-flex flex-col justify-between"
      v-else
    >
      <div class="flex flex-row justify-between items-center">
        <div class="inline-flex items-center gap-4">
          <input
            type="checkbox"
            name="checkbox-1"
            id="checkbox-1"
            class="w-6 h-6 text-primary rounded focus:ring-primary focus:ring-2"
          />
          <div
            class="relative inline-flex rounded-full h-3 w-3 bg-sky-500"
          ></div>
          <p class="text-md text-gray-700">Test</p>
          <button type="button">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 19.9998H8L18.5 9.49981C19.0304 8.96938 19.3284 8.24996 19.3284 7.49981C19.3284 6.74967 19.0304 6.03025 18.5 5.49981C17.9696 4.96938 17.2501 4.67139 16.5 4.67139C15.7499 4.67139 15.0304 4.96938 14.5 5.49981L4 15.9998V19.9998Z"
                stroke="#A4A4A4"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M13.5 6.49982L17.5 10.4998"
                stroke="#A4A4A4"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>

        <button type="button" @click.prevent="whenDelete()">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 7H20"
              stroke="#888888"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M10 11V17"
              stroke="#888888"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M14 11V17"
              stroke="#888888"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M5 7L6 19C6 19.5304 6.21071 20.0391 6.58579 20.4142C6.96086 20.7893 7.46957 21 8 21H16C16.5304 21 17.0391 20.7893 17.4142 20.4142C17.7893 20.0391 18 19.5304 18 19L19 7"
              stroke="#888888"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M9 7V4C9 3.73478 9.10536 3.48043 9.29289 3.29289C9.48043 3.10536 9.73478 3 10 3H14C14.2652 3 14.5196 3.10536 14.7071 3.29289C14.8946 3.48043 15 3.73478 15 4V7"
              stroke="#888888"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  </section>
  <ModalAdd ref="modalAdd" />
</template>