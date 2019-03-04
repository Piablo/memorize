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
      // bus.$on(this.answerImageSelectProps.name + "FromChild", (answer) => {
      //   console.log(answer);
      //   if(answer){
      //     this.nextQuestion();
      //   }else{
      //     console.log("nope try again")
      //   }
      // })

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
        var currentAnswerImage = [];

        for(var i = 0; i < answerCardImages.length; i++){
          if(answerCardImages[i].index === answerIndex){
            currentAnswerImage = answerCardImages[i];
            answerCardImages.splice(i,1);
          
          }
        }
        return currentAnswerImage;
        
      },

      showNextCard(){

        var showQuestionText = false;
        var showAnswerText = false;

        console.log(this.shuffledCards[this.currentCardIndex])
        if(this.shuffledCards[this.currentCardIndex].questionImage === null){
          console.log("The questionCard is text");
          showQuestionText = true;
          this.currentQuestionText = this.shuffledCards[this.currentCardIndex].questionText;
        }else{
          console.log("The questionCard is an image");
        }

        if(this.shuffledCards[this.currentCardIndex].answerImage === null){
          console.log("The answerCard is text");
          showAnswerText = true;
          this.currentQuestionText = this.shuffledCards[this.currentCardIndex].answerText;
        }else{
          console.log("The answerCard is an image");
          var answerIndex = this.shuffledCards[this.currentCardIndex].index;
          console.log(this.answerCardImages);

          var currentAnswerImage = this.spliceAnswerFromList(this.answerCardImages, answerIndex);

          debugger;
        }

        //var imagesForDisplay = this.getNineRandomImages(this.answerCardImages, this.currentCardIndex);
        this.showQuestionText = showQuestionText;
        this.showAnswerText = showAnswerText;

        //bus.$emit(this.answerImageSelectProps.name + "FromParent", imagesForDisplay);
      },

      getNineRandomImages(images, answerIndex){
        debugger;
        var listLength = images.length;
        var isAnswer = null;
        var nineImageListUnshuffled = [];

        for(var i = 0; i < listLength; i++){
          isAnswer = false;
          if(i === answerIndex){
            isAnswer = true;
          };

          var value = {
            image: images[i],
            isAnswer: isAnswer
          }
          nineImageListUnshuffled.push(value);
        }
        return this.shuffleCards(nineImageListUnshuffled);
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
