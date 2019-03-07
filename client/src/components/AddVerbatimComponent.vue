<template>
  <div>
    <v-layout row wrap>
      
      <v-flex xs6 class="word-list-container">
        <div v-for="(item, index) in listOfWords" :key="index">
          <v-flex xs12 class="edit-word-container">
            <div v-if="!listOfWords[index].showEditWord">
              <v-layout row wrap>
                <v-flex xs9 class="edit-word-display">
                  {{listOfWords[index].word}}
                </v-flex>

                <v-flex xs3>
                  <v-layout row wrap>
                  <div class="icon-container">
                    <v-icon @click="deleteWord(index)">delete</v-icon>
                  </div>

                  <div class="icon-container">
                    <v-icon  @click="editWord(index)">edit</v-icon>
                  </div>
                  </v-layout>
                  
                </v-flex>
              </v-layout>
            </div>
            <div v-if="listOfWords[index].showEditWord">
              <EditWordComponent :props="editVerbatimWordComponentProps"></EditWordComponent>
            </div>
          </v-flex>
        </div>
        <v-flex xs12>
          <AddWordComponent :props="addVerbatimWordComponentProps"></AddWordComponent>
        </v-flex>
        
      </v-flex>
    </v-layout>
    <v-btn @click="saveSentence">log stuff</v-btn>
  </div>
</template>

<script> 

  //Components
  import AddWordComponent from '@/components/AddWordComponent';
  import EditWordComponent from '@/components/EditWordComponent';

  //Services
  import { bus } from '@/services/Bus';
  import SaveSentenceService from '@/services/SaveSentenceService';

  export default {
    props: [
      'props'
    ], 

    components: {
      AddWordComponent,
      EditWordComponent
    },

    data() {
      return {
        label:"Add word",
        addedWord: "",
        listOfWords: [],
        editWordIndex: 0,
        name: this.props.name,

        addVerbatimWordComponentProps: {
          name: "AddVerbatimWordComponent"
        },

        editVerbatimWordComponentProps: {
          name: "EditVerbatimWordComponent",
          text: ""
        }
      }
    },

    mounted() {
      
    },

    created() {
      bus.$on(this.addVerbatimWordComponentProps.name + "FromChild", (word) => {
        this.addWordToList(word);
      }),

      bus.$on(this.editVerbatimWordComponentProps.name + "FromChild", (word) => {
        this.listOfWords[this.editWordIndex].word = word;
        this.listOfWords[this.editWordIndex].showEditWord = false;
      })


    },

    beforeDestroy() {
      bus.$off(this.addVerbatimWordComponentProps.name + "FromChild");
      bus.$off(this.editVerbatimWordComponentProps.name + "FromChild");
    },

    methods:{
      deleteWord(wordIndex){
        console.log(wordIndex);
        this.listOfWords.splice(wordIndex, 1);
      },

      saveSentence(){
        var listLength = this.listOfWords.length;
        var wordArray = [];
        for(var i = 0; i < listLength; i++){
          wordArray.push(this.listOfWords[i].word);
        }
        
        this.saveSentenceToDB(wordArray);
      },

      async saveSentenceToDB(sentence){
        var sentenceAsJSONString = JSON.stringify(sentence);
        var payload = {
          sentence: sentenceAsJSONString
        }

        var serverResponse = (await SaveSentenceService.index(payload)).data;
        this.destroyComponent();
      },

      destroyComponent(){
        bus.$emit(this.name + "FromChild", "Destroy");
      },

      editWord(wordIndex){
        console.log("OnEdit Click");
        console.log(this.editVerbatimWordComponentProps.name + "FromParent")
        this.editVerbatimWordComponentProps.text = this.listOfWords[wordIndex].word;
        this.editWordIndex = wordIndex;
        this.listOfWords[wordIndex].showEditWord = true;
      },

      addWordToList(word){
        var value = {
          word: word,
          showEditWord: false
        }
        this.listOfWords.push(value);
        this.addedWord = "";
      },
    }
  }
</script>

<style>
.word-list-container{
  background-color: red;
  padding: 5px;
}
.edit-word-container{
  background-color: blue;
  padding: 5px;
  height: 60px;
  margin-bottom: 5px;
}
.icon-container{
  background-color: green;
  padding-top: 14px;
  padding-left: 15px;
  height: 50px;
  width: 50%;
}

.edit-word-display{
  background-color: red;
  height: 50px;
  padding: 5px;
  font-size: 25px;
}



</style>
