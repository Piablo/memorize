<template>
  <div>
    <v-flex xs12>
      <div class="background-panel">
        <div class="start-btn-panel" v-if="showStartButton">
          <v-btn
            @click="onStartClick">
            start
          </v-btn>
        </div>
        <div v-if="!showStartButton">

          <v-layout row wrap>
            <v-flex xs6>
              <div v-if="showQuestionText">{{currentQuestionText}}

              </div>
              <div v-if="!showQuestionText">
                <v-card dark color="primary">
                  <v-card-text>
                    <ImageCard :props="questionCardImageProps"></ImageCard>
                  </v-card-text>
                </v-card>
                
                <!--<img :src="currentQuestionImage" alt="Girl in a jacket" height="42" width="42">-->
              </div>
            </v-flex>

            <v-flex xs6>
              <div v-if="showAnswerText">{{currentAnswerText}}
                <TextInputComponent></TextInputComponent>
              </div>
              <div v-if="!showAnswerText">
                <v-card dark color="primary">
                  <v-card-text>Answer Image
                    <!--<ImageCard :props="questionCardImageProps"></ImageCard>-->
                  </v-card-text>
                </v-card>
                
                <!--<img :src="currentQuestionImage" alt="Girl in a jacket" height="42" width="42">-->
              </div>
            </v-flex>
          </v-layout>




          
          <div><v-btn @click="tempFunction">Next</v-btn></div>
        </div>
      </div>
    </v-flex>
  </div>
</template>

<script>

  //Vuex
  import { mapState } from 'vuex';

  //Components
  import ImageCard from '@/components/ImageCard';
  import TextInputComponent from '@/components/TextInputComponent';

  //Services

  export default {
    props: [

    ], 

    components: {
      ImageCard,
      TextInputComponent
    },

    data() {
      return {
        showStartButton: true,
        shuffledCards: [],
        currentCardIndex: 0,

        showQuestionText: false,
        showAnswerText: false,

        currentQuestionText: "",
        currentAnswerText: "",

        currentQuestionImage: "",
        cuurentAnswerImage: "",

        testingImage: null,

        questionCardImageProps: {
          name: "QuestionCardImage",
          image: null,
        }
      }
    },
    computed:{
      ...mapState([
        'CardsToTest'
      ]),
    },

    mounted() {
    },

    created() {

    },

    methods:{
      initilizeData(){
        this.shuffledCards = this.shuffle(this.CardsToTest);
        console.log("Show the shuffled cards")
        console.log(this.shuffledCards)
      },

      tempFunction(){
        this.currentCardIndex ++;
        if(this.shuffledCards.length > this.currentCardIndex){
          this.displayCard(this.shuffledCards[this.currentCardIndex]);
        }else{
          console.log("Reached the end")
        }
        
      },

      onStartClick(){
        this.showStartButton = false;
        this.initilizeData();
        this.startCountDown();
        
      },

      displayCard(card){
        
        //Set the question card
        if(card.questionImage === null){
          this.currentQuestionText = card.questionText;
          this.showQuestionText = true;
        }else{
          var B64String = new Buffer(card.questionImage).toString('ascii');
          this.dataURLtoFile(B64String)
          this.showQuestionText = false;
        }

        //Set the answer card
        if(card.answerImage === null){
          this.currentAnswerText = card.answerText;
          this.showAnswerText = true;
        }else{
          //var B64String = new Buffer(card.answerImage).toString('ascii');
          //this.dataURLtoFile(B64String)
          this.showAnswerText = false;
        }
      },

      dataURLtoFile(B64String) {
        var image = new Image(),
          containerWidth = null,
          containerHeight = null;

        image.onload=function(){
            containerWidth = image.width;
            containerHeight = image.height;
        }
        this.questionCardImageProps.image = image.src = B64String;
      },

      shuffle(array) {
        let counter = array.length;

        // While there are elements in the array
        while (counter > 0) {
          // Pick a random index
          let index = Math.floor(Math.random() * counter);

          // Decrease counter by 1
          counter--;

          // And swap the last element with it
          let temp = array[counter];
          array[counter] = array[index];
          array[index] = temp;
        }
        return array;
      },

      startCountDown(){
        console.log("Starting countdown");
        this.displayCard(this.shuffledCards[this.currentCardIndex]);
      }
    }
  }
</script>

<style>
.background-panel{
  height: 624px;
  width: 100%;
  background-color: grey;
  display: table; 
  text-align: center; 
}

.start-btn-panel{
  background-color:red;
  width: 105px;
  display: table-cell;
  vertical-align: middle;
}

</style>
