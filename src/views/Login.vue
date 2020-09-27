<template>
  <div class="container">
      <h1 class="title">Login</h1>

      <form @submit.prevent="logIn">
        <div class="field">
          <div class="control">
            <input type="email" placeholder="Email" v-model="email">
          </div>
        </div>
        <div class="field">
          <div class="control">
            <input type="password" placeholder="Password" v-model="password">
          </div>
        </div>
        <div class="field">
          <div class="control">
            <button class="button is-success">Submit</button>
          </div>
        </div>

        <article class="message is-danger" v-if="error">
          <div class="message-body">
            {{ error }}
          </div>
        </article>
      </form>
    </div>
</template>

<script>
import firebase from 'firebase'

  export default {
    name: 'logIn',
    data () {
      return {
        email: '',
        password: '',
        isAuthenticated: false,
        error: null
      }
    },
    created () {
        firebase.auth().onAuthStateChanged( user => {
          if (user) {
            this.isAuthenticated = true
          }
        })
    },
    methods: {
      logIn () {
        firebase.auth().signInWithEmailAndPassword(this.email, this.password)
          .catch(error => this.error = error.message)
      },
      logOut () {
        firebase.auth().signOut()
          .then(() => {
            this.isAuthenticated = false
          })
      }
    },
  }

</script>
