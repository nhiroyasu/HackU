<template>
  <div class="main">
    <div id="verarea">
      <div id="hello-word">
        <p>DUSTへようこそ！</p>
      </div>
    <div id="create-btn">
      <button @click="openModal">作成</button>

      <fm @close="closeModal" v-if="modal">
        <p>作品タイトル</p>
        <div><input v-model="title"></div>
        <p>説明</p>
        <div><input v-model="Description"></div>

        <template slot="footer">
          <button @click="doSend">作成</button>
        </template>
      </fm>
    </div>
    </div>

    <div id="joined-room">
      <h2>参加した部屋</h2>
      <div v-for="(value, index) in story_list" :key="index">
        <room v-bind:sid="value[index]['sid']" v-bind:title="value[index]['title']" v-bind:author="value[index]['author']"/>
      </div>
      <room></room>
    </div>

    <div id="global-room">
      <div>
        <h2>他の部屋</h2>
      </div>
      <room></room>
    </div>
  </div>
</template>

<script>
  import Logo from '~/components/Logo.vue';
  import Room from '~/components/Room.vue';
  import Fm from '~/components/Form.vue';

  // <add>
  import firebase from '~/plugins/firebase.js';
  import rdb from '~/plugins/firebase_rdb.js';
  // <add>

  export default {
    components: {
      Logo,
      Room,
      Fm,
    },
    data: function() {
      return {
        modal: false,
        title: '',
        Description: ''
      }
    },
    created: function() {
      firebase.onAuth(this.$store);
    },
    methods: {
      openModal: function(){
        this.modal = true
      },
      closeModal: function(){
        this.modal = false
      },
      doSend: function(){
        if(this.title.length > 0 || this.Description.length > 0 ) {
          alert(this.title)
          this.title = ''
          this.Description = ' '
          this.closeModal()
        }

        // else{
        //   alert('メッセージを入力してください')
        // }
      }
    },
  }
</script>

<style scoped>
#verarea {
  width: 100%;
  height: 500px;
  background:aquamarine;
}
#hello-word {
  background: darksalmon;

}

#create-btn {
  background: purple;
}

#joined-room {
  background: blue;
}

#global-room {
  background: green;
}

</style>