<template>
  <div class="main">

    <div id="verarea">
      <div id="hello-word">
        <div id="hello-word-wrap">
          <h1>Let's write a novel together</h1>
          <p>みんなで一つの小説を作成しよう！</p>
        </div>
      </div>
    </div>

    <div id="create-btn">
      <div class="cb-wrap">
        <!-- <div id="create-hello" class="cre-section">
          <h2>部屋を作る</h2>
        </div> -->
        <div class="cre-section cre-des">
          <h3>Click</h3>
          <p>右のボタンを押して小説のタイトルと簡単な説明を入力しましょう！
          </p>
        </div>
        <div class="cre-section cre-des">
          <h3>Input</h3>
          <p>小説を書き始めましょう。どのような始まりにするかは、あなた次第です。
          </p>
        </div>
        <div class="cre-section cre-des">
          <h3>Share</h3>
          <p>みんなが参加できるようにTwitterで共有しましょう！</p>
        </div>
        <button id="cbtn" class="cre-section" @click="openModal">物語を作る</button>
      </div>

      <fm @close="closeModal" v-if="modal">
        <div id="cre-h" class="modalh">
          <p>作品タイトル</p>
        </div>
        <div id="cre-fm" class="modalfm">
          <input v-model="title" type="text" placeholder="例）ごんぎつね">
        </div>
        <div id="des-h" class="modalh">
          <p>説明</p>
        </div>
        <div id="des-fm" class="modalfm">
          <!-- <input v-model="Description" type="text" size="40"  placeholder="狐の話です"> -->
          <textarea name="setumei" id="credes" v-model="Description" type="text" rows="10" placeholder="例）狐の話です"></textarea>
        </div>
        <template slot="footer">
          <button id="fmbtn" @click="doSend">作成</button>
        </template>
      </fm>
    </div>


    <div id="joinedh" class="roomh">
      <h2>参加した部屋</h2>
    </div>
    <div id="joined-room">
      <div v-for="(value, index) in part_story_list" :key="index">
        <room v-bind:sid="value['sid']" v-bind:title="value['title']" v-bind:author="value['author']['name']" />
      </div>

      <!-- <room>
        </room>-->
    </div>

    <div id="globalh" class="roomh">
      <h2>他の部屋</h2>
    </div>

    <div id="global-room">
      <div v-for="(value, index) in story_list" :key="index">
        <room v-bind:sid="value['sid']" v-bind:title="value['title']" v-bind:author="value['author']['name']" />
      </div>

      <!-- <room>
        </room>-->
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
    }

    ,
    data: function () {
        return {
          modal: false,
          title: '',
          Description: '',
          param: '',
        }
    },

    asyncData({query}) {
      return {
        param: query['redirect_to_room'],
      }
    },

    created: function () {
      firebase.process_Auth(this.$store).then((user) => {
        if (this.param === '' || !this.param) {
          rdb.load_stories(this.$store);

          rdb.process_load_user_log(this.$store, user.uid).then(sp => {
              console.log(this.$nuxt.$route.params);
              var user_log = sp.val();
              user_log ? user_log : [];
              var sid_list = [];

              for (var sid in user_log) {
                sid_list.push(sid);
              }
              rdb.search_stories_info(this.$store, sid_list);
            }
          ); 
        } else {
          this.$router.push('/story_room/' + this.param);
        }
      });
      }

      ,
    methods: {
      openModal: function(){
        if (this.$store.getters['user/isSignedIn']) {
          this.modal = true;
        } else {
          var result = confirm("ストーリーを作成するにはログインしてください");
          if (result) {
            window.location.href = "/login";
          }
        }
      },
      closeModal: function(){
        this.modal = false
      },
      doSend: function(){
        if(this.title.length > 0 || this.Description.length > 0 ) {
          rdb.process_create_story(this.$store, this.title, this.Description).then(push_id => {
            this.$router.push("/story_room/" + push_id);
          });
          this.closeModal();
        }
      },
      test: function() {
        rdb.test();
      }
    }

    ,
    watch: {}

    ,
    computed: {
      story_list: function (event) {
        return this.$store.getters['stories/story_list'];
      },
      part_story_list: function (event) {
        return this.$store.getters['story_manager/participate_stories'];
      },
    }
  }
</script>
<style scoped>
  .main {
    /* background: darkblue; */
  }

  #verarea {
    width: 100%;
    height: 400px;
    background: aquamarine;
  }

  #hello-word {
    background: rgb(72, 69, 255);
    height: 400px;
    /* display: flex;
  justify-content: center;
  align-items: center; */
    position: relative;
  }

  #hello-word-wrap {
    /* font-size: 8vh; */
    color: aliceblue;
    /* background:red; */
    width: 80%;
    position: absolute;
    left: 5%;
    bottom: 30%;
    user-select: none;
  }

  #hello-word-wrap h1 {
    font-size: 2.8vw;
    border-bottom: solid 4px whitesmoke;
  }

  #hello-word-wrap p {
    font-size: 1.8vw;
  }

  #create-btn {
    background: rgba(245, 245, 245, 0.938);
    height: 15vw;
    width: 90%;
    margin: 0 auto;
    border-radius: 10px;
    position: relative;
    z-index: 30;
    top: -50px;
  }

  .cb-wrap {
    /* background: skyblue; */
    height: 100%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: auto;
    /* grid-gap: 10px 10px;
    padding: 10px; */
  }

  #create-hello h2 {
    font-size: 1.8vw;
    width: 100%;
    padding: 0.3em 0.5em;
    /* background: red; */
    /* margin: 0 auto; */
  }

  .cre-section:nth-child(1) {
    /* background: rgb(253, 205, 82); */
    /* height: 5vh; */
    /* grid-column: 1/5; */
  }

  .cre-section {
    /* padding: 0.2em 0.5em; */
    /* background: darkcyan; */
  }

  .cre-des {
    /* margin-top: 5%; */
    padding: 0.9em 0.9em;
    font-size: 1.3vw;
    height: 100%;
  }

  .cre-des h3 {
    margin-bottom: 5%;
    /* background-image: linear-gradient(45deg, #0041cc 0%, #aa49b3 100%); */
    /* border-bottom: 6px solid;
    background-image: linear-gradient(to right, #0041cc 0%, #aa49b3 100%);
    border-image-slice: 1; */
  }

  #cbtn {
    /* height: 10vw; */
    background: seagreen;
    color: aliceblue;
    /* margin: 0 auto; */
    text-align: center;
    border-style: none;
    font-size: 1.8vw;
    display: inline-block;
    margin: 2em 0.6em;
    border-radius: 10px;
    font-weight: bold;
    background-image: linear-gradient(45deg, #0041cc 0%, #aa49b3 100%);
    transition: .4s;
    user-select: none;
  }

  #cbtn:hover {
    background-image: linear-gradient(45deg, #1957db 0%, #c565cc 100%);
    transition: .4s;
  }

  #joinedh {
    /* background: aqua; */
  }

  #joined-room {
    /* background: blue; */
    width: 90%;
    margin: 0 auto;
    margin-bottom: 40px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 10px 10px;
    padding: 10px;
  }

  #globalh {
    /* background: lawngreen; */
  }


  #global-room {
    /* background: green; */
    width: 90%;
    margin: 0 auto;
    margin-bottom: 40px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 10px 10px;
    padding: 10px;
  }

  .roomh {
    width: 90%;
    margin: 0 auto;
    font-size: 1.2vw;
    margin-bottom: 10px;
    border-bottom: 4px solid;
    border-image: linear-gradient(to right, #0004de 0%, #bd5aac 100%);
    border-image-slice: 1;
  }

  .modalh {
    /* background: #0004de; */
    font-size: 1.0em;
  }

  .modalfm {
    /* width: 10vw; */
    /* background: #aa49b3; */
    position: relative;
    /* width: 27.33%; */
    /* margin: 40px 3%; */
  }
  #des-h {
    margin-top: 2vw;
  }

  input[type="text"] {
    /* box-shadow: 0 0 7px #ffffff; */
    border: 1px solid #505050;
    width: 100%;
  }

  textarea[type="text"] {
    /* box-shadow: 0 0 7px #ffffff; */
    border: 1px solid #505050;
    width: 100%;
    resize: vertical;
  }
  #fmbtn{
    background: rgb(72, 69, 255);
    color: aliceblue;
    border-radius: 4px;
    padding: 1vw 3vw;
    transition: .4s;
    user-select: none;
  }
  #fmbtn:hover{
    background: rgb(99, 97, 251);
    transition: .4s;
  }
</style>