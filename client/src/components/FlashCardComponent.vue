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
              <div v-if="showQuestionText" class="card-container">
                {{currentQuestionText}}
              </div>
              <div v-if="!showQuestionText">
                <v-card dark color="primary">
                  <v-card-text>
                    <!--<ImageCard :props="questionCardImageProps"></ImageCard>-->
                  </v-card-text>
                </v-card>
              </div>
            </v-flex>

            <v-flex xs6>
              <div v-if="showAnswerText" class="text-answer-card-styles">dave
                <!--<TextInputComponent :props="answerTextfieldProps"></TextInputComponent>-->
              </div>
              <div v-if="!showAnswerText">
                <AnswerImageSelect :props="answerImageSelectProps"></AnswerImageSelect>
              </div>
            </v-flex>
          </v-layout>
          <v-btn @click="onStart">start</v-btn>
        </div>
      </div>
    </v-flex>
  </div>
</template>

<script>

  //Vuex
  import { mapState } from 'vuex';

  //Components
  import AnswerImageSelect from '@/components/AnswerImageSelect';

  //Services
  import { bus } from '@/services/Bus';
  import ShuffleService from '@/services/ShuffleService';

  export default {
    props: [

    ], 

    components: {
      AnswerImageSelect
    },

    data() {
      return {
        showStartButton: true,
        shuffledCards: [],
        currentCardIndex: 0,

        answerImageSelectProps: {
          name:'AnswerImageSelect'
        },

        showQuestionText: false,
        showAnswerText: false,

        currentQuestionText: "",
        answerCardImages: [],
        imagesForDisplay: [],
        testableCards: [],
      }
    },
    computed:{
      ...mapState([
        'CardsToTest'
      ]),
    },

    mounted() {
      this.setTestableCardList();
    },

    created() {
      bus.$on(this.answerImageSelectProps.name + "FromChild", (answer) => {
        if(answer){
          this.showNextCard();
        }else{
          console.log("nope try again")
        }
      })

    },

    methods:{

      async setTestableCardList(){
        this.testableCards = this.CardsToTest;
        this.answerCardImages = this.extractImages(this.testableCards);
        var testableCardsCount = this.answerCardImages.length;
        var thereAreCardsToTest = false;

        if(testableCardsCount < 9){
          if(testableCardsCount === 0){
            console.log("There are no cards to test")
          }else{
            thereAreCardsToTest = true;
            console.log("Get " + (9 - testableCardsCount) + " more cards.")
          }
        }else{
          thereAreCardsToTest = true;
        }

        if(thereAreCardsToTest){
          this.shuffledCards = this.shuffleCards(this.testableCards);
        }
      },

      onStart(){
        this.showNextCard();
      },
      
      extractImages(cards){
        var listLength = cards.length;
        var images = [];

        for(var i = 0; i < listLength; i++){
          if(cards[i].answerImage !== null){
            var B64String = new Buffer(cards[i].answerImage).toString('ascii');
            var decodedImage = this.dataURLtoFile(B64String);
            var data = {
              image: decodedImage,
              index: cards[i].index
            }
            images.push(data)
          }
        }
        return images;
      },

      spliceAnswerFromList(answerCardImages, answerIndex){
        var currentAnswerImage = null
        var nonAnswerImages = [];
        var returnArray = [];

        for(var i = 0; i < answerCardImages.length; i++){
          if(answerCardImages[i].index === answerIndex){
            currentAnswerImage = answerCardImages[i];
          }
          else{
            nonAnswerImages.push(answerCardImages[i]);
          }
        }
        returnArray.push(currentAnswerImage);
        returnArray.push(nonAnswerImages);
        
        return returnArray;
        
      },

      showNextCard(){
        var showQuestionText = false;
        var showAnswerText = false;
        var allCardsTested = false;

        if(this.shuffledCards.length === this.currentCardIndex){
          allCardsTested = true;
        }

        if(!allCardsTested){
          if(this.shuffledCards[this.currentCardIndex].questionImage === null){
          showQuestionText = true;
          this.currentQuestionText = this.shuffledCards[this.currentCardIndex].questionText;
          }else{
            console.log("The questionCard is an image");
          }

          if(this.shuffledCards[this.currentCardIndex].answerImage === null){
            showAnswerText = true;
            this.currentQuestionText = this.shuffledCards[this.currentCardIndex].answerText;
          }else{
            var answerIndex = this.shuffledCards[this.currentCardIndex].index;
            var splitImages = this.spliceAnswerFromList(this.answerCardImages, answerIndex);
            var nineRandomImages = this.getNineRandomImages(splitImages[1], splitImages[0]);
            bus.$emit(this.answerImageSelectProps.name + "FromParent", nineRandomImages);
          }
          this.showQuestionText = showQuestionText;
          this.showAnswerText = showAnswerText;
          this.currentCardIndex++;
        }
        else{
          console.log("End reached")
        }
        
      },

      getNineRandomImages(allImages, answerImage){

        var shuffledFullList = ShuffleService.ShuffleCards(allImages);
        var returnValue = [];

        for(var i = 0; i < 8; i++){
          allImages[i].isAnswer = false;
          returnValue.push(allImages[i]);
        }

        answerImage.isAnswer = true;
        returnValue.push(answerImage);
        return returnValue = ShuffleService.ShuffleCards(returnValue);
      },

      shuffleCards(cards){
        return ShuffleService.ShuffleCards(cards);
      },

      onStartClick(){
        this.showStartButton = false;
      },

      dataURLtoFile(B64String) {
        var image = new Image(),
          containerWidth = null,
          containerHeight = null;

        image.onload=function(){
            containerWidth = image.width;
            containerHeight = image.height;
        }
        var value = image.src = B64String;
        return value;
      },
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

.card-container{
  background-color: blue;
  height: 300px;
}
/* .text-answer-card-styles{
  background-color: red;
  padding: 10px;
  height: 338px;
  vertical-align: middle;
} */

</style>
