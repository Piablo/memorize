<template>
  <v-app>
    <div>
      <!--<AddTodo />-->
      <router-view></router-view>
    </div>
  </v-app>
</template>

<script>
import AddTodo from './components/AddTodo'

export default {
  name: 'App',
  components: {
    //AddTodo
  },
  data () {
    return {
      //
    }
  }
}
</script>

<style>

</style>
