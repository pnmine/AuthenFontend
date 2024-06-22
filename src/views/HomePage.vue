<template>
  <navigation-bar></navigation-bar>
  <div>
    <button @click="logout">Logout</button>
    <h1>Home Page</h1>
    <p>Welcome to the home page</p>
    <p>My Data</p>
    <div v-if="userData">
      <p>Username: {{ userData.username }}</p>
      <p>Firstname: {{ userData.firstname }}</p>
      <p>Lastname: {{ userData.lastname }}</p>
      <p>Email: {{ userData.email }}</p>
      <p>Phone: {{ userData.phone }}</p>
    </div>
    <div v-else>
      <p>You need Authorize first</p>
    </div>
  </div>
</template>
<script>
import axios from '../api.js'
import NavigationBar from '../components/ui/NavigationBar.vue'
export default {
  name: 'HomeView',
  components: {
    NavigationBar
  },
  data() {
    return {
      userData: null,
      username: '',
      password: '',
      firstname: '',
      lastname: '',
      email: '',
      phone: ''
    }
  },
  mounted() {
    this.getUserData()
  },
  methods: {
    logout() {
      this.$userStore.logout()
      this.$router.replace('/auth')
    }
    ,
    async getUserData() {
      await axios
        .get('/User')
        .then((res) => {
          console.log(res.data)
          this.userData = res.data.data
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>
<style scoped></style>
