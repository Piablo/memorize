<template>
  <div>
    <v-layout row wrap>
      <v-flex xs6 class="test-container">
        <v-layout row wrap>
          <v-flex xs12 class="test-container">
            <div class="question-panel">
              {{question}}
            </div>
          </v-flex>

          <v-flex xs12 v-if="pageReady">
            <div v-for="(item, index) in userEnteredWords" :key="index">
              <div class="edit-word-container">
                <v-layout row wrap>
                  <v-flex xs8>
                    <v-text-field 
                      :disabled="!enabled[index]"
                      v-model="userEnteredWords[index]"
                      solo>
                    </v-text-field>
                  </v-flex>

                  <v-flex xs4>
                    <div class="button-container" v-if="!enabled[index]">
                      <v-btn 
                        block
                        @click="editEntry(index)">
                        edit
                      </v-btn>
                    </div>

                    <div class="button-container" v-if="enabled[index]">
                      <v-btn 
                        block
                        @click="saveEditedEntry(index)">
                        save
                      </v-btn>
                    </div>
                  </v-flex>
                </v-layout>
              </div>
            </div>
          </v-flex>

          <v-flex xs12>
            <div class="text-field-container">
              <v-text-field 
                v-model="userEnteredWord"
                @keyup="checkIfSpace($event)"
                solo>
              </v-text-field>
            </div>
          </v-flex>

          <v-flex xs12>
            <v-btn 
              block
              @click="submitAnswer">
              submit
            </v-btn>
          </v-flex>
        </v-layout>

      </v-flex>

      <v-flex xs6 v-if="showVerbatimStatsComponent">
        <VerbatimTestStats></VerbatimTestStats>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>

  //Components
  import VerbatimTestStats from '@/components/VerbatimTestStats';

  //Services
  import GetSentenceService from '@/services/GetSentenceService';

  export default {
    props: [

    ], 

    components: {
      VerbatimTestStats
    },

    data() {
      return {
        sentenceIndex: 0,
        currentTestSentence: [],
        userEnteredWords: [],
        userEnteredWord: "",
        pageReady: true,
        sessionAnswers: [],
        enabled: [],
        allSentencesToTest: [],
        question: "",
        showVerbatimStatsComponent: false,
      }
    },

    mounted() {
      this.loadData();
    },

    created() {

    },

    methods:{
      async loadData(){
        this.allSentencesToTest = (await GetSentenceService.index("")).data;
        this.currentTestSentence = this.getSentenceArray(this.allSentencesToTest, this.sentenceIndex);
        debugger;
      },

      checkIfSpace(event){
        if(event.key === " "){
          this.userEnteredWord = this.removeWhiteSpace(this.userEnteredWord);
          this.userEnteredWords.push(this.userEnteredWord);
          this.userEnteredWord = "";
        }
      },

      removeWhiteSpace(word){
        return word.slice(0, -1);
      },

      editEntry(selectionIndex){
        this.pageReady = false;
        this.enabled[selectionIndex] = true;
        this.pageReady = true;
      },

      saveEditedEntry(selectionIndex){
        this.pageReady = false;
        this.enabled[selectionIndex] = false;
        this.pageReady = true;
      },

      submitAnswer(){
        var validAnswers = [];
        for(var i = 0; i < this.currentTestSentence.length; i++){
          if(this.currentTestSentence[i] === this.userEnteredWords[i]){
            validAnswers.push(true)
          }else{
            validAnswers.push(false);
          }
        }
        this.sessionAnswers.push(validAnswers)
        this.showTestStats();
        //this.loadNextTest();
      },

      showTestStats(){
        this.showVerbatimStatsComponent = true;
      },

      

      loadNextTest(){
        this.userEnteredWords = [];
        this.sentenceIndex++;
        this.currentTestSentence = this.getSentenceArray(this.allSentencesToTest, this.sentenceIndex);
      
      },

      getSentenceArray(serverResponse, index){
        this.question = serverResponse[index].question
        return JSON.parse(serverResponse[index].sentence);
      },
    }
  }
</script>

<style>

.test-container{
  background-color: red;
  padding: 5px;
}

.question-panel{
  background-color: green;
}

.edit-word-container{
  background-color: yellow;
}

.text-field-container{
  background-color: blue;
  padding: 5px;
  height: 59px;
}

.button-container{
  padding-left: 5px;
}

</style>
