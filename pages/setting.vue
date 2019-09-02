<template>
  <div class="main">
    <div id="wrap1">
      <h2>アカウント情報</h2>
      <div id="ac-info">
        <div id="info1">
          <p>
            <span>Name</span>
          </p>
          <p>
            {{ $store.getters['user/name'] }}
          </p>
        </div>

        <div id="info2">
          <p>
            <span>E-mail</span>
          </p>
          <p>
            {{ $store.getters['user/e_mail'] }}
          </p>
        </div>
<!-- 
        <div id="info3">
          <p>その他</p>
        </div> -->
      </div>
    </div>

    <hr>
    <div id="wrap2">
      <h2>変更</h2>
      <div id="ac-change">
        <div class="change" id="change1">
          <p>名前変更</p>
          <input type="text" class="edit_input" v-model="name">
          <button type="button" v-on:click="edit_name">送信</button>
        </div>
        <div class="change" id="change2">
          <p>メールアドレス変更</p>
          <input type="email" class="edit_input" v-model="e_mail">
          <button type="button" v-on:click="edit_email">送信</button>
        </div>
        <div class="change" id="change3">
          <p>パスワード変更</p>
          <input type="password" class="edit_input" v-model="pass">
          <button type="button" v-on:click="edit_pass">送信</button>
        </div>
        <div class="change" id="change4">
          <p style="margin=: 10px 0px">アイコン画像変更</p>
          <div id="icon-edit-group">
            <input type="file" class="edit_select" name="icon_img" id="icon_img" @change="on_icon_changed">
            <label id="label-icon-img" for="icon_img">画像を選択</label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import firebase from '~/plugins/firebase_auth.js';
    import rdb from '~/plugins/firebase_rdb.js';

    export default {
        created: function() {
            firebase.onAuth(this.$store);
        },
        data: function() {
            return {
                name: '',
                e_mail: '',
                pass: '',
                icon_img: '',
            }
        },
        computed: {
            user_id: function() {
                return this.$store.getters['user/user_id'];
            }
        },
        methods: {
            edit_name: function(event) {
                rdb.edit_user_name(this.user_id, name=this.name);
            },
            edit_email: function(event) {
                rdb.edit_user_email(this.user_id, this.e_mail);
            },
            edit_pass: function(event) {
                rdb.edit_user_pass(this.user_id, this.pass);
            },
            edit_icon_img: function(event) {
                rdb.edit_user_icon(this.user_id, this.icon_img);
            },
            on_icon_changed: function(event) {
              var file = event.target.files[0];
              console.log(file);
              var type = file["type"].replace("image/", "")
              var reader = new FileReader();
              var uid = this.user_id;
              var store = this.$store;
              reader.onload = function() {
                var bin_str = window.atob(reader.result.slice(reader.result.indexOf(',')+1));
                var len = bin_str.length;
                var bytes = new Uint8Array(len);
                for (var i = 0; i < len; i++) {
                  bytes[i] = bin_str.charCodeAt(i);
                }
                rdb.edit_user_icon(store, uid, type, bytes.buffer);
              }
              reader.readAsDataURL(file);
            }
        },
    }
</script>

<style scoped>
.main {
  background: #dfe6e9;
  font-size: 20px;
}

#wrap1, #wrap2 {
  font-size: 1em;
  color: #2d3436;
  margin: 30px 0px;
  display: flex;
  flex-direction: column;
}

#wrap1 #info1, #wrap #info2 {
  margin: 10px 0px;
}
#wrap1 p {
  margin: 0px 0px;
  padding: 0px 5px;
}
#wrap1 span {
  font-style: italic;
  font-size: 0.8em;
}

#wrap2 .change {
  width: 100%;
  min-width: 400px;
  max-width: 1000px;
  padding: 0px;
  margin: 20px 0px;
}
#wrap2 .edit_input {
  font-size: 1em;
  line-height: 1.2em;
  background: #dfe6e9;
  outline: none;
  border: none;
  border-bottom: solid 1px #0984e3;
  text-align: left;
  padding: 0.2em 1em;
}
#wrap2 #icon-edit-group {
  margin: 20px 0px;
}
#wrap2 #icon_img {
  display: none;
}
#wrap2 #label-icon-img {
  cursor: pointer;
  height: 1.5em;
  margin: 10px;
  padding: 10px;
  font-size: 0.8em;
  background: #0984e3;
  color: #dfe6e9;
  border-radius: 0.8em;
  box-sizing: border-box;
}
#wrap2 button {
  padding: 0.5em;
  border-style: none;
  border-radius: 0.5em;
  font-size: 0.8em;
  background: #0984e3;
  color: #dfe6e9;
}


@media screen and (min-width: 501px) {
  .main {
    width: 100%;
    height: auto;
    margin: 0px;
    padding: 20px 20%;
    text-align: center;
  }
}

@media screen and (man-width: 500px) {
  .main {
    width: 100%;
    text-align: center;
  }
}
</style>
