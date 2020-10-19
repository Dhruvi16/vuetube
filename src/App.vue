<template>
  <div id="app">
    <nav class="navbar" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item">
      Vuetube
    </a>

    <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

  <div id="navbarBasicExample" class="navbar-menu">
    <div class="navbar-start">
    </div>

    <div class="navbar-end">
      <div class="navbar-item">
        <div class="field is-grouped" v-if="!isAuthenticated">
          <p class="control">
            <router-link to="/signup" class="button is-primary">Sign Up</router-link>
          </p>
          <p class="control">
            <router-link to="/login" class="button is-info">Login</router-link>
          </p>
        </div>
        <div class="field" v-else>
          <div class="field is-grouped">
            <p class="control">
              <button @click="showCategoryForm = !showCategoryForm" class="button is-primary">Add Category</button>
            </p>
            <p class="control">
              <button @click="showMovieForm = !showMovieForm" class="button is-primary">Add Movie</button>
            </p>
            <p class="control">
              <button @click="logOut" class="button is-danger">Log out</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</nav>
    <div class="modal" :class="{ 'is-active': showCategoryForm }">
      <div class="modal-background"></div>
      <div class="modal-content">
        <form @submit.prevent="addCategory">
          <div class="field">
            <input type="text" class="input" v-model="title">
          </div>

          <div class="field">
            <button class="button is-success">Add</button>
          </div>
        </form>        
      </div>
      <button class="modal-close is-large" aria-label="close" @click="showCategoryForm = !showCategoryForm"></button>
    </div>

    <div class="modal" :class="{ 'is-active': showMovieForm }">
      <div class="modal-background"></div>
      <div class="modal-content">
        <form @submit.prevent="addMovie">
          <div class="field">
            <input type="text" class="input" v-model="title" placeholder="Title">
          </div>
          <div class="field">
            <input type="text" class="input" v-model="url" placeholder="URL">
          </div>
          <div class="field">
            <select v-model="category">
              <option value="empty" selected>Choose category</option>
              <option v-for="category in categories" :value="category.id">{{ category.title }}</option>
            </select>
          </div>
          <div class="field">
            <button class="button is-success">Add</button>
          </div>
        </form>        
      </div>
      <button class="modal-close is-large" aria-label="close" @click="showMovieForm = !showMovieForm"></button>
    </div>

    <router-view/>
  </div>
</template>

<script>
  import firebase from 'firebase'
  import { db } from './main'

  export default {
    data () {
      return {
        isAuthenticated: false,
        showCategoryForm: false,
        showMovieForm: false,
        title: '',
        category: 'empty',
        url: '',
        categories: []
      }
    },
    created () {
      firebase.auth().onAuthStateChanged( user => {
        if (user) {
          this.isAuthenticated = true
        }
      })
    },
    firestore () {
      return {
        categories: db.collection('categories')
      }
    },
    methods: {
      addMovie () {
        if (this.title && this.category !== 'empty') {
          const movie = {
            title: this.title,
            url: this.url
          }

          db.collection('categories').doc(this.category).collection('movies').add(movie)

          this.title = ''
          this.category = 'empty'
          this.url = ''
          this.showMovieForm = false

        } else {
          alert("Fill out the form please!")
        } 

      },
      addCategory () {
        const category = {
          title: this.title
        }

        db.collection('categories').add(category)
        this.showCategoryForm = false
        this.title = ''
      },
      logOut () {
        firebase.auth().signOut()
          .then(() => {
            this.isAuthenticated = false

            this.$router.push('/login')
          })
      }
    },
  }
</script>

<style>
@import "../node_modules/bulma/css/bulma.css";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
