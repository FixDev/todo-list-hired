<template>
  <!-- Main modal -->
  <div
    v-show="isModalOpen"
    class="overflow-y-auto bg-gray-900 bg-opacity-40 overflow-x-hidden flex justify-center items-center fixed z-50 w-full inset-0 h-modal"
    @click.self="toogleModal()"
  >
    <div class="relative p-4 w-full max-w-2xl h-full md:h-auto">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow">
        <!-- Modal header -->
        <div class="flex justify-between items-start p-4 rounded-t border-b">
          <h1 class="text-xl font-semibold text-gray-900">Tambah List Item</h1>
          <button
            type="button"
            @click="toogleModal()"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
          >
            <svg
              aria-hidden="true"
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        <!-- Modal body -->
        <form
          autocomplete="off"
          method="POST"
          @submit.prevent="
            emit('whenSubmit', { ...state, isEdit: props.isEdit })
          "
        >
          <div class="p-6 space-y-6">
            <div class="flex flex-col gap-2 mb-2">
              <label for="name" class="uppercase">Nama List Item</label>
              <input
                required
                type="text"
                id="name"
                placeholder="Tambahkan nama list item"
                v-model="state.title"
                data-cy="modal-add-name-input"
              />
            </div>
            <div class="flex flex-col gap-2 mb-2">
              <label for="priority" class="uppercase">Priority</label>
              <select
                required
                name="priority"
                id="priority"
                class="w-52"
                v-model="state.priority"
                data-cy="modal-add-priority-dropdown"
              >
                <option v-for="opt in listOpt" :key="opt" :value="opt.value">
                  {{ opt.label }}
                </option>
              </select>
            </div>
          </div>
          <!-- Modal footer -->
          <div
            class="flex items-center justify-end p-6 space-x-2 rounded-b border-t border-gray-200"
          >
            <button
              class="bg-primary text-white font-bold py-3 px-7 rounded-full text-md inline-flex"
              :class="{ 'bg-opacity-70': state.title === '' }"
              :disabled="state.title === ''"
              type="submit"
              data-cy="modal-add-save-button"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  priority: {
    type: String,
    default: 'very-high',
  },
  isEdit: {
    type: Boolean,
    default: false,
  },
});

const listOpt = ref([
  {
    label: 'Very High',
    value: 'very-high',
    color: 'red',
  },
  {
    label: 'High',
    value: 'high',
    color: 'red',
  },
  {
    label: 'Medium',
    value: 'normal',
    color: 'red',
  },
  {
    label: 'Very Low',
    value: 'very-low',
    color: 'red',
  },
  {
    label: 'Low',
    value: 'low',
    color: 'red',
  },
]);

const emit = defineEmits(['whenSubmit']);

const state = reactive({
  title: '',
  priority: 'very-high',
});

const isModalOpen = ref(false);

const toogleModal = () => {
  isModalOpen.value = !isModalOpen.value;
};

const setState = () => {
  state.priority = props.priority;
  state.title = props.title;
};
defineExpose({ toogleModal, setState });
</script>

<style scoped>
input[type='text'] {
  border: 1px solid lightgrey;
  padding: 10px;
  border-radius: 5px;
}

input:focus,
select:focus {
  outline: none !important;
  border: 2px solid #16abf8;
  box-shadow: 0 0 5px #16abf8;
}

select {
  border: 1px solid lightgrey;
  padding: 10px;
  border-radius: 5px;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 1em;
}
</style>
