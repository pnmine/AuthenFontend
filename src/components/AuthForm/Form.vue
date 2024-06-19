<template>
  <slot>
    <div class="wrapper">
      <div class="form__toggle-button">
        <div id="cover-button" :class="{ 'move-right': !isLogin }"></div>
        <button @click="toggle" type="button">Login</button>
        <button @click="toggle" type="button">Register</button>
      </div>
      <h1 v-if="isLogin" style="margin-top: 20%">Login</h1>
      <h1 v-else>Register</h1>
      <form @submit.prevent="save" class="form">
        <div class="form__input-box">
          <box-icon type="solid" color="white" name="user-circle"></box-icon>
          <input type="text" v-model="username" required />
          <label>Username</label>
        </div>
        <div class="form__input-box">
          <box-icon name="key" color="white"></box-icon>
          <input type="password" v-model="password" required />
          <label>Password</label>
        </div>
        <div class="form__input-box" v-show="!isLogin">
          <box-icon name="id-card" color="white"></box-icon>
          <input type="text" v-model="firstname" required />
          <label>Firstname</label>
        </div>
        <div class="form__input-box" v-show="!isLogin">
          <box-icon name="id-card" color="white"></box-icon>
          <input type="text" v-model="lastname" required />
          <label>Lastname</label>
        </div>
        <div class="form__input-box" v-show="!isLogin">
          <box-icon name="envelope" type="solid" color="white"></box-icon>
          <input type="email" v-model="email" required />
          <label>Email</label>
        </div>
        <div class="form__input-box" v-show="!isLogin">
          <box-icon name="phone" type="solid" color="white"></box-icon>
          <input type="text" v-model="phone" pattern="^\d{10}$" required />
          <label>Phone</label>
        </div>
        <div class="form__submit-button">
          <button v-if="isLogin" type="submit">Login</button>
          <button v-else type="submit">Register</button>
        </div>
        <div class="form__auth-toggle-link">
          <p v-if="isLogin">
            Don't have an account? <span @click="toggle">Register</span>
          </p>
          <p v-else>Already have an account? <span @click="toggle">Login</span> </p>
        </div>
      </form>
    </div>
  </slot>
</template>
<script>
export default {
  name: 'LoginRegisterForm',
  data() {
    return {
      isLogin: true,
      username: '',
      password: '',
      firstname: '',
      lastname: '',
      email: '',
      phone: ''
    }
  },
  methods: {
    save() {
      console.log(
        this.username,
        this.password,
        this.firstname,
        this.lastname,
        this.email,
        this.phone
      )
      
    },
    toggle() {
      this.isLogin = !this.isLogin
    }
  }
}
</script>
<style scoped>
.wrapper {
  border: 1px solid white;
  min-width: 500px;
  min-height: 750px;
  color: white;
  background: transparent;
  backdrop-filter: blur(10px);
  border-radius: 0.5rem;
}
.wrapper h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
  text-align: center;
}
.form__toggle-button {
  text-align: center;
  width: 220px;
  margin: 1rem auto;
  box-shadow: rgba(255, 200, 211, 0.5) 0px 7px 29px 0px;
  border-radius: 1rem;
}
.form__toggle-button button {
  color: white;
  padding: 0.5rem 2rem;
  cursor: pointer;
  background: transparent;
  border: 0;
  outline: none;
  position: relative;
}
#cover-button {
  box-sizing: content-box;
  position: absolute;
  width: 110px;
  height: 2rem;
  background: linear-gradient(to right, var(--indigo-900), var(--pink-200));
  border-radius: inherit;
  transition: transform 0.3s ease;
}
#cover-button.move-right {
  transform: translateX(100%);
  background: linear-gradient(to left, var(--indigo-900), var(--pink-200));
}
/* form */
form {
  text-align: center;
}
.form__input-box {
  height: 50px;
  margin: 1.5rem auto;
  position: relative;
}
.form__input-box input {
  text-align: left;
  width: 80%;
  height: 100%;
  border: none;
  outline: none;
  border: 1px solid var(--grey-050);
  border-radius: 2rem;
  padding-left: 3rem;
  background: transparent;
  color: white;
}
.form__input-box input:focus {
  border: 1px solid var(--indigo-400);
}
.form__input-box label {
  left: 13.5%;
  top: 25%;
  margin-left: 2rem;
  position: absolute;
  color: white;
  pointer-events: none;
  transition: transform 1s ease-in-out;
}
.form__input-box input:focus ~ label,
.form__input-box input:valid ~ label {
  top: -1.5rem;
}
.form__input-box input:invalid ~ label {
}

.form__input-box box-icon {
  color: white;
  box-sizing: content-box;
  position: absolute;
  margin-left: 1rem;
  /* margin-top: 13px;  50% of the height but 24x24 = 50-24 = 26  ,26/2 =13 */
  transform: translateY(
    50%
  ); /* use percentage values: the percentage is relative to the element itself, and not the parent. */
}

.form__submit-button button {
  width: 80%;
  height: 50px;
  border: none;
  outline: none;
  border-radius: 20px;
  background-clip: padding-box;
  background: transparent;
  box-shadow:
    inset 0 0px 10px 0px rgba(255, 255, 255, 0.6),
    inset 0px 5px 10px 0px rgba(255, 255, 255, 0.2),
    inset 0px 2px 5px 0px rgba(255, 255, 255, 0.3),
    inset 0px 3px 20px 0px rgba(0, 0, 0, 0.25);
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 150ms ease-in-out;
}

.form__submit-button button:hover {
  background-color: rgba(255, 255, 255, 0.05);
}

.form__submit-button button:active {
  transform: scale(0.90);
}

.form__auth-toggle-link p {
  margin-top: 1rem;
  color: white;
}
.form__auth-toggle-link p span {
  color: var(--indigo-200);
  text-decoration: underline;
  cursor: pointer;
}
</style>
