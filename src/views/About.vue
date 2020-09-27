<template>
  <div>
    <h1>Sign up</h1>

    <form @submit.prevent="signUp">
      <input type="email" placeholder="Email" v-model="email">
      <input type="password" placeholder="Password" v-model="password">

      <button>Submit</button>
    </form>
  </div>
</template>

<script>

export default {
  name: 'Sign up',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    signUp () {
      console.log('sign up')
    }
  },
}

</script>