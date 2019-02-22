<template>
  <div>
    <PageHeader :props="PageHeaderProps"></PageHeader>
    <v-layout row wrap>
      <v-flex xs6>
        <v-card>
          <EditCardComponent :props="QuestionCardProps"></EditCardComponent>
        </v-card>
      </v-flex>

      <v-flex xs6>
        <v-card>
          <EditCardComponent :props="AnswerCardProps"></EditCardComponent>
        </v-card>
      </v-flex>

      <v-flex xs12>
        <v-card>
          <v-btn
            block
            @click="saveToDB">
            save
          </v-btn>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>

  //Components
  import PageHeader from '@/components/PageHeader';
  import EditCardComponent from '@/components/EditCardComponent'

  //Services
  import { bus } from '@/services/Bus';
  import SaveCardService from '@/services/SaveCardService';

  export default {
    props: [
    ], 

    components: {
      PageHeader,
      EditCardComponent
    },

    data() {
      return {
        PageHeaderProps: {
          name: "AddCardComponentHeader",
          title: "Add Cards"
        },

        QuestionCardProps: {
          name: "QuestionCard",
          title: "Question Card"
        },

        AnswerCardProps: {
          name: "AnswerCard",
          title: "Answer Card"
        },

        questionText: null,
        questionImage: null,
        answerText: null,
        answerImage: null,
      }
    },

    mounted() {

    },

    created() {
      bus.$on(this.AnswerCardProps.name + "FromChild", (payload) => {
        if(payload.isValid){
          this.answerText = payload.metaData.text;
          this.answerImage = payload.metaData.image;
        }
      }),

      bus.$on(this.QuestionCardProps.name + "FromChild", (payload) => {
        if(payload.isValid){
          this.questionText = payload.metaData.text;
          this.questionImage = payload.metaData.image;
        }
      })

    },

    methods:{
      saveToDB(){
        this.pingChildComponentsForData();
        
        var payload = {
          questionText: this.questionText,
          questionImage: this.questionImage,
          answerText: this.answerText,
          answerImage: this.answerImage,
          nextTestDay: 0
        }
        this.saveCard(payload);
      },

      async saveCard(payload){
        var serverResponse = (await SaveCardService.index(payload)).data;
        debugger;
      },

      pingChildComponentsForData(){
        var command = "SendData";
        bus.$emit(this.QuestionCardProps.name + "FromParent", command);
        bus.$emit(this.AnswerCardProps.name + "FromParent", command);
      }
    }
  }
</script>

<style>

</style>
