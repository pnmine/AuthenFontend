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
          <input type="text" v-model="firstname" :required="!isLogin" />
          <label>Firstname</label>
        </div>
        <div class="form__input-box" v-show="!isLogin">
          <box-icon name="id-card" color="white"></box-icon>
          <input type="text" v-model="lastname" :required="!isLogin" />
          <label>Lastname</label>
        </div>
        <div class="form__input-box" v-show="!isLogin">
          <box-icon name="envelope" type="solid" color="white"></box-icon>
          <input type="email" v-model="email" :required="!isLogin" />
          <label>Email</label>
        </div>
        <div class="form__input-box" v-show="!isLogin">
          <box-icon name="phone" type="solid" color="white"></box-icon>
          <input type="text" v-model="phone" pattern="^\d{10}$" :required="!isLogin" />
          <label>Phone</label>
        </div>
        <div class="form__submit-button">
          <button v-if="isLogin" type="submit">Login</button>
          <button v-else type="submit">Register</button>
        </div>
        <div class="form__auth-toggle-link">
          <p v-if="isLogin">Don't have an account? <span @click="toggle">Register</span></p>
          <p v-else>Already have an account? <span @click="toggle">Login</span></p>
        </div>
      </form>
    </div>
  </slot>
</template>
<script>
import axios from '../../api.js'
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
    resetForm() {
      this.username = ''
      this.password = ''
      this.firstname = ''
      this.lastname = ''
      this.email = ''
      this.phone = ''
    },
    async save() {
      if (!this.isLogin) {
        console.log('register')
        var registerData = {
          username: this.username,
          password: this.password,
          firstname: this.firstname,
          lastname: this.lastname,
          email: this.email,
          phone: this.phone
        }
        await axios
          .post('/auth/register', registerData)
          .then((res) => {
            console.log(res.data)
            if (res.status == 200) {
              alert('Register successful')
              this.resetForm()
              this.toggle()
              // this.$router.go(0)
            }
          })
          .catch((error) => {
            console.log(error)
            if (error.response.status == 400) {
              this.username = ''
              alert(error.response.data.message + 'Please try again')
            }
          })
      } else {
        console.log('login')
        var loginData = {
          username: this.username,
          password: this.password
        }
        await axios
          .post('/auth/login', loginData)
          .then((res) => {
            console.log(res.data)
            if (res.status == 200) {
              this.$userStore.login(res.data.data.token, res.data.data.tokenExpired, res.data.data.userId)
              //alert('Login successful')
              this.$router.push('/')
              //this.$router.go(0)
            }
          })
          .catch((error) => {
            console.log(error)
            this.password = ''
            alert(error.response.data.message + 'Please try again')
          })
      }
    },
    toggle() {
      this.isLogin = !this.isLogin
      // this.resetForm()
    }
  }
}
</script>
<style scoped>
.wrapper {
  border: 1px solid white;
  min-width: 600px;
  min-height: 750px;
  color: white;
  background: rgba(0, 0, 0, 0.3);
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
  width: 75%;
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
  left: 15.1%;
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
  width: 75%;
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
  transform: scale(0.9);
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

@media only screen and (max-width: 768px) {
  /* For mobile phones: */
  .wrapper {
    width: 100%;
    height: 100%;
  }
}
</style>
