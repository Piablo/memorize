<template>
  <v-layout row wrap>
    <v-flex xs12>
      <div class="card-styles">
        <div class="text-styles">{{title}}</div>
      </div>
    </v-flex>
  </v-layout>
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
        title: this.props.title,
      }
    },

    mounted() {

    },

    created() {

    },

    methods:{

    }
  }
</script>

<style>
  .text-styles{
    font-size: 24px;
    text-align: center;
    padding-top: 5px;
  }
  .card-styles{
    height: 45px;
    background-color: gray;
    margin-bottom: 5px;
  }
</style>
