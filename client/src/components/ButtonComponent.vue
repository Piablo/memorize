<template>
  <v-btn
    block
    @click="onClick">
      {{label}}
  </v-btn>
</template>

<script>

  //Services
  import { bus } from '@/services/Bus';

  export default {
    props: [
      'props'
    ],
    data() {
      return {
        label: this.props.label,
        name: this.props.name
      }
    },
    methods: {
      onClick(){
        bus.$emit(this.name + 'OnClick', 'dave');
      }
    }
    
  }
</script>

<style>

</style>
