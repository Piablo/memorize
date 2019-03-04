<template>
  <div>
    <PageHeader :props="PageHeaderProps"></PageHeader>
    <FlashCardComponent v-if="showFlashCardComponent"></FlashCardComponent>
  </div>
</template>

<script>

  //Vuex
  import { mapState, mapMutations } from 'vuex';

  //Components
  import PageHeader from '@/components/PageHeader';
  import FlashCardComponent from '@/components/FlashCardComponent';

  //Services
  import GetTestableCardsService from '@/services/GetTestableCardsService';

  export default {
    props: [
    ], 

    components: {
      PageHeader,
      FlashCardComponent,
    },

    data() {
      return {
        PageHeaderProps: {
          name: "DoTestComponentHeader",
          title: "Flash Card Game"
        },

        showFlashCardComponent: false,

      }
    },
    computed:{
      ...mapState([
        'ElapsedDays'
      ]),
    },

    mounted() {
      this.getTestableCards();
      
    },

    created() {
    },

    methods:{
      ...mapMutations([
        'SET_CARDS_TO_TEST',
      ]),

      indexCards(cards){
        var listLength = cards.length;

        for(var i = 0; i < listLength; i++){
          cards[i].index = i;
        }
        return cards;
      },

      async getTestableCards(){
        var payload = {
          data: {
            elapsedDays: this.ElapsedDays
          }
        }
        var cards = (await GetTestableCardsService.index(payload)).data;

        cards = this.indexCards(cards);


        this.SET_CARDS_TO_TEST(cards);
        this.showFlashCardComponent = true;
      }
    }
  }
</script>

<style>

</style>
