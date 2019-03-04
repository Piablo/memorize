<template>
  <v-layout row wrap>
      <v-flex xs4>
        <v-card dark color="primary" @click="imageSelected(0)">
          <img :src="shuffledCards[0].image" alt="Girl in a jacket" height="100" width="100">
        </v-card>
      </v-flex>

      <v-flex xs4>
        <v-card dark color="primary" @click="imageSelected(1)">
          <img :src="shuffledCards[1].image" alt="Girl in a jacket" height="100" width="100">
        </v-card>
      </v-flex>

      <v-flex xs4>
        <v-card dark color="primary" @click="imageSelected(2)">
          <img :src="shuffledCards[2].image" alt="Girl in a jacket" height="100" width="100">
        </v-card>
      </v-flex>

      <v-flex xs4>
        <v-card dark color="primary" @click="imageSelected(3)">
          <img :src="shuffledCards[3].image" alt="Girl in a jacket" height="100" width="100">
        </v-card>
      </v-flex>

      <v-flex xs4>
        <v-card dark color="primary" @click="imageSelected(4)">
          <img :src="shuffledCards[4].image" alt="Girl in a jacket" height="100" width="100">
        </v-card>
      </v-flex>

      <v-flex xs4>
        <v-card dark color="primary" @click="imageSelected(5)">
          <img :src="shuffledCards[5].image" alt="Girl in a jacket" height="100" width="100">
        </v-card>
      </v-flex>

      <v-flex xs4>
        <v-card dark color="primary" @click="imageSelected(6)">
          <img :src="shuffledCards[6].image" alt="Girl in a jacket" height="100" width="100">
        </v-card>
      </v-flex>

      <v-flex xs4>
        <v-card dark color="primary" @click="imageSelected(7)">
          <img :src="shuffledCards[7].image" alt="Girl in a jacket" height="100" width="100">
        </v-card>
      </v-flex>

      <v-flex xs4>
        <v-card dark color="primary" @click="imageSelected(8)">
          <img :src="shuffledCards[8].image" alt="Girl in a jacket" height="100" width="100">
        </v-card>
      </v-flex>
  </v-layout>
</template>

<script>

  //Components

  //Services
  import ShuffleService from '@/services/ShuffleService';

  export default {
    props: [
      'props'
    ], 

    components: {

    },

    data() {
      return {
        //data: this.props.data,
        shuffledCards: ShuffleService.ShuffleCards(this.props.data)
      }
    },

    mounted() {
      console.log("On componetn mount");
      console.log(this.shuffledCards);

    },

    created() {

    },

    methods:{
      imageSelected(selectedImageIndex){
        console.log(selectedImageIndex);
        console.log(this.shuffledCards[selectedImageIndex].isAnswer);
      }

    }
  }
</script>

<style>

</style>
