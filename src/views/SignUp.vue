<template>
  <div class="container">
      <h1 class="title">Sign Up</h1>

      <form @submit.prevent="signUp">
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
    name: 'signUp',
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
            console.log(user);
            this.isAuthenticated = true
          }
        })
    },
    methods: {
      signUp () {
        firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
          .catch(error => this.error = error.message)
      }
    },
  }

</script>
