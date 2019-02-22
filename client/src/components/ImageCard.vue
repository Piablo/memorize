<template>
  <div>
    <img :src="currentImage" alt="Girl in a jacket" height="300" width="300">
  </div>
</template>

<script>

  //Components

  //Services

  export default {
    props: [
      'props'
    ], 

    components: {

    },

    data() {
      return {
        currentImage: this.props.image      
      }
    },

    mounted() {
      console.log(this.props.image);
    },

    created() {

    },

    methods:{

    }
  }
</script>

<style>

</style>
