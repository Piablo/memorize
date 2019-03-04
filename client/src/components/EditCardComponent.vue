<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12>
        <div class="card-header-style">
          <v-layout row wrap reverse>
            <div @click="onAddTextClick"><v-btn>Text</v-btn></div>
            <div @click="onAddImageClick"><v-btn>image</v-btn></div>
            <div class="card-header-text-style">{{title}}</div>
          </v-layout>
          <div class="card-container-style">
            <div class="card-style">
              <div v-if="showInstructionDiv">Instructions</div>
              <div v-if="showAddTextDiv" class="card-controls-header">
                <v-flex xs12>
                  <v-layout row wrap>
                    <v-flex xs4>
                      <div class="text-styles">Add text:</div>
                    </v-flex>
                    <v-flex xs8>
                      <v-text-field
                        label="Solo"
                        solo
                        block
                        v-model="userEnteredText">
                      </v-text-field>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <div class="parent">
                  <div class="child">{{userEnteredText}}</div>
                </div>
              </div>

              <div v-if="showAddImageDiv" class="card-controls-header">
                <v-flex xs12>
                  <v-layout row wrap>
                    <v-flex xs4>
                      <div class="text-styles">Add Image</div>
                    </v-flex>
                    <v-flex xs4>
                      <v-btn :onclick="onFileUploadClick" block>BROWSE</v-btn>
                      <input type="file" @change="onFileChange($event)" :id="name" name="files" style="display:none" />
                    </v-flex>

                    <v-flex xs4>
                      <v-btn
                        @click="onBrowseImage"
                        block>
                          Paste
                      </v-btn>
                    </v-flex>
                  </v-layout>
                </v-flex>

                <div>
                  <iframe :src="upliftmentDocData" height="342px" width="100%"></iframe>
                </div>

                <div class="btn-container-style">
                  
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

  //Components

  //Services
  import { bus } from '@/services/Bus';

  export default {
    props: [
      'props'
    ], 

    components: {

    },

    data() {
      return {
        name: this.props.name,
        title: this.props.title,
        showAddTextDiv: false,
        showAddImageDiv: false,
        showInstructionDiv: true,
        userEnteredText: "",
        upliftmentDocData: null,
        onFileUploadClick: "document.getElementById('" + this.props.name + "').click()",
        cardType: null,
      }
    },

    mounted() {

    },

    created() {
      bus.$on(this.name + "FromParent", (command) => {
        if(command === "SendData"){
          this.sendDataToParent();
        }
        else if(command === "ResetComponent"){
          this.userEnteredText = null;
          this.upliftmentDocData = null;
        }
      })

    },

    methods:{
      onAddTextClick(){
        this.cardType = "text"
        this.showInstructionDiv = false;
        this.showAddImageDiv = false;
        this.showAddTextDiv = true;
      },

      onAddImageClick(){
        this.cardType = "image"
        this.showInstructionDiv = false;
        this.showAddTextDiv = false;
        this.showAddImageDiv = true;
      },

      onBrowseImage(){
        console.log("Open file explorer")
      },

      onFileChange(e) {
        var file = e.target.files[0];
        this.convertToB64(file);
      },

      convertToB64(file){

        let reader = new FileReader();
        let vm = this;
        var fileSize = file.size;

        //Check file size
        if(fileSize > 5000000){
          alert("File selected is too large")
        }else{
          reader.onload = (e) => {
            vm.upliftmentDocData = e.target.result;
            //vm.completeTask(1);
          };
          reader.readAsDataURL(file);
        }
      },

      sendDataToParent(){
        var dataToSave = null;
        var selectedImage = "";
        var selectedText = "";
        if(this.cardType === "text"){
          selectedText = this.userEnteredText;
        }
        else if(this.cardType === "image"){
          selectedImage = this.upliftmentDocData;
        }
        var payload = {
          isValid: true,
          metaData: {
            image: selectedImage,
            text: selectedText
          }
        }

        bus.$emit(this.name + "FromChild", payload);
      }
    }
  }
</script>

<style>
  .card-header-style{
    background-color: red;
  }
  .card-style{
    background-color: green;
    height: 400px;;
  }
  .card-container-style{
    padding: 5px;
  }

  .card-header-text-style{
    margin-top: 5px;
    padding: 5px;
    font-size: 20px;
  }

  .btn-container-style{
    padding: 5px;
  }

  .card-controls-header {
    background-color: blue;
    height: 57px;
  }

  .parent{
    display: table; 
    width: 100%; 
    height: 300px; 
    text-align: center; 
  }

  .child{
    display: table-cell;
    vertical-align: middle;
    font-size: 30px;
  }

  .text-styles{
    background-color: red;
    height: 50px;
    padding-top: 8px;
    font-size: 20px;
  }
</style>
