<template>
  <div>
    <h1>
      Dashboard
    </h1>

    <div class="tabs">
      <ul>
        <li class="is-active"><a>Newest</a></li>
        <li v-for="category in categories"><a>{{ category }}</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'dashboard',
  data () {
    return {
      categories: ['Thriller', 'Comedy', 'Action']
    }
  }
}
</script>
