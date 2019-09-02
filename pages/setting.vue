<template>
  <div class="main">
    <div id="wrap1">
      <h2>アカウント情報</h2>
      <div id="ac-info">
        <div id="info1">
          <p>{{ $store.getters['user/name'] }}</p>
        </div>

        <div id="info2">
          <p>{{ $store.getters['user/e_mail'] }}</p>
        </div>

        <div id="info3">
          <p>その他</p>
        </div>
      </div>
    </div>


    <div id="wrap2">
      <h2>変更</h2>
      <div id="ac-change">
        <div id="change1">
          <p>名前変更</p>
          <input type="text" v-model="name">
          <button type="button" v-on:click="edit_name">送信</button>
        </div>
        <div id="change2">
          <p>メールアドレス変更</p>
          <input type="email" v-model="e_mail">
          <button type="button" v-on:click="edit_email">送信</button>
        </div>
        <div id="change3">
          <p>パスワード変更</p>
          <input type="password" v-model="pass">
          <button type="button" v-on:click="edit_pass">送信</button>
        </div>
        <div id="change4">
          <p>アイコン画像変更</p>
          <input type="image" v-model="icon_img">
          <button type="button" v-on:click="edit_icon_img">送信</button>
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
            }
        },
    }
</script>

<style>

</style>
