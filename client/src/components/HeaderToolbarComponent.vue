<template>
  <div>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-btn @click="onDoTestClick">Do test</v-btn>
          <v-btn @click="onAddCardClick">Add cards</v-btn>
          <v-btn @click="onTestVerbatim">Do verbatim</v-btn>
          <v-btn @click="onAddVerbatim">Add verbatim</v-btn>
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
      },

      onAddVerbatim(){
        bus.$emit("AddVerbatimButtonClicked", true);
      },

      onTestVerbatim(){
        bus.$emit("AddVerbatimButtonClicked", true);
      }
    }
  }
</script>

<style>

</style>
