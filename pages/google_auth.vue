<template>
  <section class="main">
    <div class="contentBar">
    <div id="block_1" class="barlittle"></div>
    <div id="block_2" class="barlittle"></div>
    <div id="block_3" class="barlittle"></div>
    <div id="block_4" class="barlittle"></div>
    <div id="block_5" class="barlittle"></div>
    </div>
  </section>
</template>

<style scoped>
.contentBar {
    width:90px;
    margin:0 auto;
    padding-top:40px;
    padding-bottom:40px;
}
/* 四角いブロックの中のアニメーション時の色と動き */
.barlittle {
    background-color:#17cddd; 
    background-image: -moz-linear-gradient(90deg, #2187e7 25%, #a0eaff);
    background-image: -webkit-linear-gradient(90deg, #2187e7 25%, #a0eaff);
    border:1px solid #bbbbbb;
    width:10px;
    height:10px;
    float:left;
    margin-left:5px;
    opacity:0.1;
    -moz-transform:scale(0.7);
    -webkit-transform:scale(0.7);
    -moz-animation:move 1s infinite linear;
    -webkit-animation:move 1s infinite linear;
}
/* ブロックの１つ１つのアニメーションをずらす */
#block_1{
    -moz-animation-delay: .4s;
    -webkit-animation-delay: .4s;
 }
#block_2{
    -moz-animation-delay: .3s;
    -webkit-animation-delay: .3s;
}
#block_3{
    -moz-animation-delay: .2s;
    -webkit-animation-delay: .2s;
}
#block_4{
    -moz-animation-delay: .3s;
    -webkit-animation-delay: .3s;
}
#block_5{
    -moz-animation-delay: .4s;
    -webkit-animation-delay: .4s;
}
/* キーフレームを使ったローディングの始まりと終わりの指定 */
@-moz-keyframes move{
    0%{-moz-transform: scale(1.2);opacity:1;}
    100%{-moz-transform: scale(0.7);opacity:0.1;}
}
@-webkit-keyframes move{
    0%{-webkit-transform: scale(1.2);opacity:1;}
    100%{-webkit-transform: scale(0.7);opacity:0.1;}
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
