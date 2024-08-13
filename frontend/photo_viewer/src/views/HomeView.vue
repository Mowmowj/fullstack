<script setup>
import TheWelcome from '../components/TheWelcome.vue'
import { onMounted, ref } from 'vue'
let userList = ref([])
onMounted(() => {
  getUser()
})
let newUser = ref('')
const getUser = () => {
  fetch('/api/user')
    .then((response) => response.json())
    .then((res) => {
      console.log(res)
      userList.value = res
    })
    .catch((e) => {
      console.error(res)
    })
}
const addUser = () => {
  fetch('/api/user/add', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({ name: newUser.value })
  })
    .then((response) => response.json())
    .then((data) => (userList.value = data))
    .catch((e) => {
      console.error(res)
    })
    .finally(() => {
      getUser()
    })
}
const deleteUser = (_id) => {
  fetch('/api/user/delete', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({ id: _id })
  })
    .then((response) => response.json())
    .then((data) => (userList.value = data))
    .catch((e) => {
      console.error(res)
    })
    .finally(() => {
      getUser()
    })
}
</script>

<template>
  <h2>Name list</h2>
  <div>
    <input v-model="newUser" />
    <button @click="addUser">Add</button>
  </div>
  <main class="card">
    <li v-for="(user, _id) in userList" class="user">
      {{ user.name }}
      <button @click="deleteUser(_id)">Delete</button>
    </li>
  </main>
</template>

<style scoped>
.card {
  height: 600px;
  width: 50%;
  overflow-y: auto;
  margin-top: 30px;
}
.user {
  justify-content: space-between;
  display: flex;
  margin-bottom: 10px;
}
</style>
