<template>
  <div>
    <p>DoTest</p>
  </div>
</template>

<script>

  //Vuex
  import { mapState } from 'vuex';

  //Components

  //Services

  export default {
    props: [
    ], 

    components: {
    },

    data() {
      return {

      }
    },
    computed:{
      ...mapState([
        'ElapsedDays'
      ]),
    },

    mounted() {
      console.log("Mounting");
      console.log(this.ElapsedDays)
    },

    created() {
    },

    methods:{
    }
  }
</script>

<style>

</style>
