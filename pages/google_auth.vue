<template>
  <section class="main">
    <div>
      <div class="auth-detail">
        <h1>{{title}}</h1>
        <p>{{message}}</p>
      </div>
      <p>{{ $store.state.user }}</p>
    </div>
  </section>
</template>

<style scoped>
.auth-detail {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  min-width: 300px;
  min-height: 500px;
  background: #dfe6e9;
  color: #636e72;
}
</style>


<script>
import firebase from '~/plugins/firebase_auth.js';

export default {
  components: {
    firebase,
  },
  data: function() {
    return {
      title: 'Auth',
      message: 'this is message.',
    };
  },
  created: function() {
    firebase.login_g_auth(this.$store);
  }
}
</script>
