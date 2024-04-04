<template>
  <div>
    <div class="flex flex-row mb-4 justify-between w-full" v-if="!isEditing">
      <input type="text" v-model="newItem.name" class="block rounded-md border-0 py-1.5 pl-7 pr-7 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Full name" />
      <input type="text" v-model="newItem.email" class="block rounded-md border-0 py-1.5 pl-7 pr-7 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Email Address" />
      <input type="text" v-model="newItem.role" class="block rounded-md border-0 py-1.5 pl-7 pr-7 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Role" />
      <input type="text" v-model="newItem.imageUrl" class="block rounded-md border-0 py-1.5 pl-7 pr-7 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Paste image url" />
      <button @click="addItem" class="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-sm font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">Add</button>
    </div>

    <div class="flex flex-row mb-4 justify-between w-full" v-if="isEditing">
      <input type="text" v-model="isEditItem.name" class="block rounded-md border-0 py-1.5 pl-7 pr-7 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Full name" />
      <input type="text" v-model="isEditItem.email" class="block rounded-md border-0 py-1.5 pl-7 pr-7 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Email Address" />
      <input type="text" v-model="isEditItem.role" class="block rounded-md border-0 py-1.5 pl-7 pr-7 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Role" />
      <input type="text" v-model="isEditItem.imageUrl" class="block rounded-md border-0 py-1.5 pl-7 pr-7 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Paste image url" />
      <button @click="updateItem" class="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-sm font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">Update</button>
    </div>
  </div>
    <ul role="list" class="divide-y divide-gray-100">
      <li v-for="(person, index) in items" :key="person.email" class="flex justify-between gap-x-6 py-5">
        <div class="flex min-w-0 gap-x-4">
          <img class="h-12 w-12 flex-none rounded-full bg-gray-50" :src="person.imageUrl" alt="" />
          <div class="min-w-0 flex-auto">
            <p class="text-sm font-semibold leading-6 text-gray-900">{{ person.name }}</p>
            <p class="mt-1 truncate text-xs leading-5 text-gray-500">{{ person.email }}</p>
          </div>
        </div>
        <div class="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
          <p class="text-sm leading-6 text-gray-900">{{ person.role }}</p>
          <p class="mt-1 text-xs leading-5 text-gray-500">
            Employee ID: {{ index }}
          </p>
          <div class="flex-row mt-2">
            <button @click="editItem(index)" class="inline-grid mr-4 items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">Edit</button>
            <button @click="deleteItem(index)" class="inline-grid items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">Delete</button>
          </div>
        </div>
      </li>
    </ul>
</template>

<script setup>
import { ref } from 'vue'
import { useCrudStore } from '../stores/crud.ts'

const isEditItem = ref(null)
const isEditing = ref(false)
const newItem = ref({ name: '', email: '', role: '', imageUrl: '' })
const crudStore = useCrudStore()
const items = crudStore.getAllItems()

const addItem = () => {
  if (!newItem.value.imageUrl) {
    newItem.value.imageUrl = 'https://via.placeholder.com/150'
  }

  crudStore.addItem({ ...newItem.value })
  newItem.value = {
    name: '',
    email: '',
    role: '',
    imageUrl: ''
  }
}

const editItem = (index) => {
  const item = items[index]
  isEditItem.value = { ...item }
  isEditing.value = index
}

const updateItem = () => {
  crudStore.updateItem(isEditing.value, { ...isEditItem.value })
  isEditItem.value = false
  isEditing.value = false
}

const deleteItem = (index) => {
  crudStore.deleteItem(index)
}
</script>