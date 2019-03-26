<template>
  <div class="component-container">
    <div class="stats-grid-container">
      <v-layout row wrap>
        <v-flex xs6 class="cell-container">
          Words in sentence: 
        </v-flex>

        <v-flex xs6 class="cell-container">
          {{sentenceWordCount}}
        </v-flex>

        <v-flex xs6 class="cell-container">
          Answered correctly:
        </v-flex>

        <v-flex xs6 class="cell-container">
          {{correctAnswers}}
        </v-flex>

        <v-flex xs6 class="cell-container">
          Mistakes:
        </v-flex>

        <v-flex xs6 class="cell-container">
          {{mistakes}}
        </v-flex>

        <v-flex xs6 class="cell-container">
          Forgotton:
        </v-flex>

        <v-flex xs6 class="cell-container">
          {{forgotton}}
        </v-flex>

        <v-flex xs6 class="cell-container">
          Percent:
        </v-flex>

        <v-flex xs6 class="cell-container">
          {{scorePercentage}}
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>

<script>

  //Components

  //Services

  export default {
    props: [

    ], 

    components: {

    },

    data() {
      return {
        sentenceWordCount: 13,
        correctAnswers: 4,
        mistakes: 3,
        forgotton: 3,
        scorePercentage: null,
      }
    },

    mounted() {
      this.scorePercentage = this.calculatePercentage(this.sentenceWordCount, this.correctAnswers) + " %";

    },

    created() {

    },

    methods:{
      calculatePercentage(sentenceWordCount, correctAnswers){
        var wordValue = 100 / sentenceWordCount;
        var correctPercentage = (wordValue * correctAnswers).toFixed(2);
        return correctPercentage;
      }

    }
  }
</script>

<style>
.component-container{
  background-color: blue;
  padding: 5px;
}
.stats-grid-container{
  background-color: red;
  padding: 5px;
}
.row-container{
  background-color: green;
  padding: 5px;
}
.cell-container{
  background-color: blue;
  border-style: solid;
  border-width: 1px;
}

</style>
