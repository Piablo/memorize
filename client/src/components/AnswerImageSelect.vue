<template>
  <div v-if="pageLoaded">
    <v-layout row wrap>
        <v-flex xs4>
          <v-card dark color="primary" @click="imageSelected(data[0].isAnswer)">
            <img :src="data[0].image" alt="Girl in a jacket" height="100" width="100">
          </v-card>
        </v-flex>

        <v-flex xs4>
          <v-card dark color="primary" @click="imageSelected(data[1].isAnswer)">
            <img :src="data[1].image" alt="Girl in a jacket" height="100" width="100">
          </v-card>
        </v-flex>

        <v-flex xs4>
          <v-card dark color="primary" @click="imageSelected(data[2].isAnswer)">
            <img :src="data[2].image" alt="Girl in a jacket" height="100" width="100">
          </v-card>
        </v-flex>

        <v-flex xs4>
          <v-card dark color="primary" @click="imageSelected(data[3].isAnswer)">
            <img :src="data[3].image" alt="Girl in a jacket" height="100" width="100">
          </v-card>
        </v-flex>

        <v-flex xs4>
          <v-card dark color="primary" @click="imageSelected(data[4].isAnswer)">
            <img :src="data[4].image" alt="Girl in a jacket" height="100" width="100">
          </v-card>
        </v-flex>

        <v-flex xs4>
          <v-card dark color="primary" @click="imageSelected(data[5].isAnswer)">
            <img :src="data[5].image" alt="Girl in a jacket" height="100" width="100">
          </v-card>
        </v-flex>

        <v-flex xs4>
          <v-card dark color="primary" @click="imageSelected(data[6].isAnswer)">
            <img :src="data[6].image" alt="Girl in a jacket" height="100" width="100">
          </v-card>
        </v-flex>

        <v-flex xs4>
          <v-card dark color="primary" @click="imageSelected(data[7].isAnswer)">
            <img :src="data[7].image" alt="Girl in a jacket" height="100" width="100">
          </v-card>
        </v-flex>

        <v-flex xs4>
          <v-card dark color="primary" @click="imageSelected(data[8].isAnswer)">
            <img :src="data[8].image" alt="Girl in a jacket" height="100" width="100">
          </v-card>
        </v-flex>
    </v-layout>
  </div>
</template>

<script>

  //Components

  //Services
  import { bus } from '@/services/Bus';
  import ShuffleService from '@/services/ShuffleService';

  export default {
    props: [
      'props'
    ], 

    components: {

    },

    data() {
      return {
        name: this.props.name,
        data: [],
        pageLoaded: false,
        //shuffledCards: ShuffleService.ShuffleCards(this.props.data)
      }
    },

    mounted() {

    },

    created() {
      bus.$on(this.name + "FromParent", (data) => {
        this.data =  data;
        this.pageLoaded = true;
      })

    },

    methods:{
      imageSelected(isAnswer){
        this.emitAnswer(isAnswer);
      },

      emitAnswer(answer){
        bus.$emit(this.name + "FromChild", answer);
      }

    }
  }
</script>

<style>

</style>
