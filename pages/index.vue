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
      <div v-for="(value, index) in part_story_list" :key="index">
        <room v-bind:sid="value['sid']" v-bind:title="value['title']" v-bind:author="value['author']['name']"/>
      </div>
      <!-- <room></room> -->
    </div>

    <div id="global-room">
      <h2>他の部屋</h2>
      <div v-for="(value, index) in story_list" :key="index">
        <room v-bind:sid="value['sid']" v-bind:title="value['title']" v-bind:author="value['author']['name']"/>
      </div>
      <!-- <room></room> -->
    </div>
  </div>
</template>

<script>
  import Logo from '~/components/Logo.vue';
  import Room from '~/components/Room.vue';
  import Fm from '~/components/Form.vue';

  // <add>
  import firebase from '~/plugins/firebase_auth.js';
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
      firebase.process_Auth(this.$store).then((user) => {
        rdb.load_stories(this.$store);
        rdb.process_load_user_log(this.$store, user.uid).then(sp => {
          var user_log = sp.val();
          var sid_list = [];
          for (var sid in user_log) {
            sid_list.push(sid);
          }
          console.log(sid_list);
          rdb.search_stories_info(this.$store, sid_list);
        });
      });
    },
    methods: {
      openModal: function(){
        if (this.$store.getters['user/isSignedIn']) {
          this.modal = true;
        } else {
          alert("ストーリーを作成するにはログインしてください");
          window.location.href = "/login";
        }
      },
      closeModal: function(){
        this.modal = false
      },
      doSend: function(){
        if(this.title.length > 0 || this.Description.length > 0 ) {
          alert(this.title);
          rdb.create_story(this.$store, this.title, this.Description);
          this.closeModal();
        }

        // else{
        //   alert('メッセージを入力してください')
        // }
      }
    },
    watch: {
    },
    computed: {
      story_list: function(event) {
        return this.$store.getters['stories/story_list'];
      },
      part_story_list: function(event) {
        return this.$store.getters['story_manager/participate_stories']
      }
  }
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