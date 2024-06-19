<template>
  <div class="auth__container">
    <auth-form></auth-form>
  </div>
</template>

<script>
import AuthForm from '../components/AuthForm/Form.vue'
export default {
  name: 'LoginView',
  components: {
    AuthForm
  }
}
</script>
<style scoped>
.auth__container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: var(--grey-050);
  background-image: url('https://images.unsplash.com/photo-1654198340681-a2e0fc449f1b?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D') ;
  background-repeat: no-repeat;
  background-size: cover;
}

</style>
