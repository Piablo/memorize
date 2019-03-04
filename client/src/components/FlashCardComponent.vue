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
              </div>
            </v-flex>

            <v-flex xs6>
              <div v-if="showAnswerText" class="text-answer-card-styles">
                <TextInputComponent :props="answerTextfieldProps"></TextInputComponent>
              </div>
              <div v-if="!showAnswerText">
                <AnswerImageSelect :props="answerImageSelectProps"></AnswerImageSelect>
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
  import AnswerImageSelect from '@/components/AnswerImageSelect';

  //Services
  import GetImagesService from '@/services/GetImagesService';
  import ShuffleService from '@/services/ShuffleService';

  export default {
    props: [

    ], 

    components: {
      ImageCard,
      TextInputComponent,
      AnswerImageSelect
    },

    data() {
      return {
        showStartButton: true,
        shuffledCards: [],
        currentCardIndex: 0,
        answerImageDisplayList: [],

        answerImageSelectProps: {
          data: [],
        },

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
        },

        answerTextfieldProps: {
          label: "Your Answer",
          name: "AnswerTextfield"
        },
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

      extractAnswerImages(shuffledCards){
        var listLength = shuffledCards.length;
        var listOfImages = [];
        for(var i = 0; i < listLength; i++){
          var currentImage = shuffledCards[i].answerImage;
          if(currentImage !== null){
            var B64String = new Buffer(shuffledCards[i].answerImage).toString('ascii');
            var decodedImage = this.dataURLtoFile(B64String);

            listOfImages.push(decodedImage);
          }
        }
        return listOfImages;
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
        //this.shuffledCards = this.shuffle(this.CardsToTest);
        this.shuffledCards = ShuffleService.ShuffleCards(this.CardsToTest);
        var extractedImages = this.extractAnswerImages(this.shuffledCards);
        this.setImageOptions(extractedImages);
       
        
        //this.startCountDown();
        
      },

      async setImageOptions(extractedImages){
        var extractedImagesCount = extractedImages.length;
        var shuffledListContainsAnswer = false;
        if(extractedImagesCount < 9){
          var test = (await GetImagesService.index()).data;
          console.log("This is still incomplete");
          debugger;
        } else{
          var numberOfImages = 9;
          var returnList = [];
          var isAnswer = false;
          for(var i = 0; i < numberOfImages; i++){
            var isAnswer = false; 
            if(this.currentCardIndex === i){
              isAnswer = true
            }
            var imageData = {
              image: extractedImages[i],
              isAnswer: isAnswer
            }
            returnList.push(imageData);
          }
          this.answerImageSelectProps.data = returnList;
          this.startCountDown();
        }
      },

      displayCard(card){
        
        //Set the question card
        if(card.questionImage === null){
          this.currentQuestionText = card.questionText;
          this.showQuestionText = true;
        }else{
          var B64String = new Buffer(card.questionImage).toString('ascii');
          this.questionCardImageProps.image = this.dataURLtoFile(B64String);
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
        var value = image.src = B64String;
        return value;
      },

      shuffle(array) {
        let counter = array.length;

        while (counter > 0) {
          let index = Math.floor(Math.random() * counter);
          counter--;
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

.text-answer-card-styles{
  background-color: red;
  padding: 10px;
  height: 338px;
  vertical-align: middle;
}

</style>
