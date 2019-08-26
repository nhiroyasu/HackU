<template>
  <div class="auth-service">
    <div class="auth-link-block">
      <p>
        <nuxt-link v-bind:to="link">
          <img v-bind:src="icon_link" alt="#">
          {{service_name}}でログイン
        </nuxt-link>
      </p>
    </div>
  </div>
</template>

<style scoped>
.auth-service {
  margin: 10px 20px;
  padding: 0px;
  width: auto;
  border: solid 1px #707070;
  border-radius: 10px;
  font-size: 25px;
  position: relative;
}

.auth-link-block {
  margin: auto;
  padding: 5px;
  width: 100%;
  background: #fff;
  line-height: 35px;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
}
.auth-link-block a {
  text-decoration:none;
  color: #636e72;
  text-align: left;
  display: inline-block;
  margin: 0px;
  padding: 0px;
  width: 100%;
}
.auth-link-block img {
  margin: auto 10px;
  padding: auto;
  width: 1.2rem;
  height: 1.2rem;
}
</style>

<script>
export default {
  name: "auth-link-block",
  props: {
    service_name: String,
    icon_link: String,
  },
  components: {

  },
  data: function() {
    return {
      link: '/' + this.service_name + '_auth'
    };
  },
}
</script>
