<template>
  <div class="auth-service">
    <div class="auth-link-block">
      <nuxt-link v-bind:to="to_link" class="login-a">
        <img v-bind:src="icon_link" alt="#" width="15px" height="15px">
        <span>{{service_name}}でログイン</span>
      </nuxt-link>
    </div>
  </div>
</template>

<style scoped>
  .auth-service {
    width: 60%;
    margin: 0 auto;
    /* background: rgb(246, 112, 112); */
    /* margin: 10px 20px;
  padding: 0px;
  width: auto;
  border: solid 1px #707070;
  border-radius: 10px;
  font-size: 25px;
  position: relative; */
  }

  .auth-link-block {
    /* border-bottom:solid 2px olive; */
    /* margin: auto;
  padding: 5px;
  width: 100%;
  background: #fff;
  line-height: 35px;
  border-radius: 10px;
  overflow: hidden;
  position: relative; */
  }

  .login-a {
    text-align: center;
    text-decoration: none;
    color: #000000;
    background: rgb(253, 253, 253);
    display: block;
    padding: 0.6em 1.2em;
    margin: 20px 0;
    border-radius: 4px;
    overflow: hidden;
    /* border-right: solid 2px #0004de;
    border-bottom: solid 2px #bd5aac; */
    /* border-left: solid 5px #0004de;
    border-right: solid 5px #bd5aac; */
    box-shadow: 1px 1px 2px 1px gray;
    /* display: inline-block; */
    /*
  margin: 0px;
  padding: 0px;
  width: 100%;  */
  transition:.5s
  }
  .login-a:hover{
    /* border-right: solid 2px #bd5aac;
    border-bottom: solid 2px #0004de; */
    background-image: linear-gradient(90deg, #6d8dce 0%, #aa83ad 80%);
    box-shadow: 2px 2px 4px 1px gray;
    transition:.5s
  }
  .login-a img{
    vertical-align: middle;
    margin-right: 10px;
  }

  .login-a span {
    display: inline-block;
    transition: .5s
  }

  .login-a:hover span {
    transform: rotateX(360deg);
  }

  .auth-link-block img {
    /* margin: auto 10px;
  padding: auto;
  width: 1.2rem;
  height: 1.2rem; */
  }

</style>

<script>
  import firebase from '~/plugins/firebase_auth.js';

  export default {
    name: "auth-link-block",
    props: {
      service_name: String,
      icon_link: String,
      to_link: String,
      action: String,
    },
    components: {

    },
    data: function () {
      return {
        link: '/' + this.service_name + '_auth'
      };
    }
  }
</script>