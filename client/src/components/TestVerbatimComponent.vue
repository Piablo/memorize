<template>
  <div v-if="pageLoaded">
    <v-layout row wrap>
        <v-flex xs6  class="answer-panel-container">
          <div v-for="(item, index) in currentTestSentence" :key="index">
            <v-layout row wrap>
              <v-flex xs8>
                <div class="answer-field-container">
                  <v-text-field
                    solo
                    @keyup="checkIfSpace($event, index)"
                    v-model="userEnteredWords[index]"
                    :disabled="disabled[index]">
                  </v-text-field>
                </div>
              </v-flex>

              <v-flex xs4>
                <div class="answer-field-container">
                  <v-btn block @click="showHint(index)">hint</v-btn>
                </div>
              </v-flex>
            </v-layout>
          </div>
        </v-flex>
    </v-layout>
  </div>
</template>

<script>

  //Components

  //Services
  import GetSentenceService from '@/services/GetSentenceService';

  export default {
    props: [

    ], 

    components: {

    },

    data() {
      return {
        sentenceIndex: 0,
        currentTestSentence: [],
        userEnteredWords: [],
        pageLoaded: false,
        disabled: [],
      }
    },

    mounted() {
      this.loadData();
    },

    created() {

    },

    methods:{
      async loadData(){
        var serverResponse = (await GetSentenceService.index("")).data;
        this.currentTestSentence = this.getSentenceArray(serverResponse, this.sentenceIndex);
        // for(var i = 0; i < this.currentTestSentence.length; i++){
        //   this.disabled.push(false);
        // }
        this.pageLoaded = true;
      },

      getSentenceArray(serverResponse, index){
        return JSON.parse(serverResponse[index].sentence);
      },

      showHint(hintIndex){
        console.log(this.currentTestSentence[hintIndex]);
      },

      checkIfSpace(event, focusedFieldIndex){
        if(event.key === " "){
          this.pageLoaded = false;
          this.disabled[focusedFieldIndex] = true;
          console.log(this.disabled)
          // var wordWithSpace = this.userEnteredWords[focusedFieldIndex];
          // var userEnteredWord = wordWithSpace.slice(0, -1);
          // var correctWord = this.currentTestSentence[focusedFieldIndex];
          // if(userEnteredWord === correctWord){
          //   debugger;
          // }else{
          //   debugger;
          // }
          // var userEnteredWordwithSpace = this.userEnteredWords[focusedFieldIndex];
          // var userEnteredWord = userEnteredWordwithSpace.split(0, lastChar - 1)
          // console.log(userEnteredWord)
          this.pageLoaded = true;

        }
      }

    }
  }
</script>

<style>

.answer-field-container{
  background-color: red;
  padding: 5px;
  margin: 5px;
  height: 58px;
}
.answer-panel-container{
  background-color: blue;
  padding: 5px;
}

</style>
