<template>
  <div>
    <PageHeader :props="PageHeaderProps"></PageHeader>
    <FlashCardComponent></FlashCardComponent>
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
      FlashCardComponent
    },

    data() {
      return {
        PageHeaderProps: {
          name: "DoTestComponentHeader",
          title: "Flash Card Game"
        },

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

      async getTestableCards(){
        var payload = {
          data: {
            elapsedDays: this.ElapsedDays
          }
        }
        var cards = (await GetTestableCardsService.index(payload)).data;
        this.SET_CARDS_TO_TEST(cards);
      }
    }
  }
</script>

<style>

</style>
