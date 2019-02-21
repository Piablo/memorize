<template>
  <div>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-btn @click="onDoTestClick">Do test</v-btn>
          <v-btn @click="onAddCardClick">Add cards</v-btn>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>

  //Components

  //Services
  import { bus } from '@/services/Bus';

  export default {
    props: [

    ], 

    components: {

    },

    data() {
      return {

      }
    },

    mounted() {

    },

    created() {

    },

    methods:{
      onAddCardClick(){
        bus.$emit("AddCardButtonClicked", true);
      },

      onDoTestClick(){
        bus.$emit("DoTestButtonClicked", true);
      }
    }
  }
</script>

<style>

</style>
