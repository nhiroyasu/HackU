<template>
    <div id="story-room-wrap">
        <div id="story-room-title">
            <h2>作品タイトル
            </h2>
            <!-- Twitter共有ボタン -->
            <div id="twitter-btn">
                <a href="https://twitter.com/share" class="twitter-share-button" data-text="このストーリールームを共有する"
                    v-bind:data-url="get_twitter_card_url" data-lang="ja">Tweet</a>
                <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
            </div>
        </div>
        <div id="main-contents">
            <div class="story-contents" v-for="(value, index) in get_contents_data" :key="index">
                <!-- <ChatBox v-bind:content="value['content']" /> -->
                <p>{{value['content']}}</p>
            </div>
        </div>

        <div id="user-input-area">
            <div id="change-btn">
                <button v-on:click="hideshow">{{maiki}}</button>
            </div>
            <div id="bottom-func" v-show="show">
                <div id="input-area">
                    <textarea name="none" id="inputdoc" cols="95" rows="5" v-model="text"></textarea>
                    <button v-on:click="on_submitted">送信</button>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    import firebase from '~/plugins/firebase_auth.js';
    import rdb from '~/plugins/firebase_rdb.js';

    export default {
        components: {
            firebase,
            rdb,
        },
        data() {
            return {
                maiki: '閲覧モード',
                show: false,
                text: '',
                func_link_base: "https://us-central1-dust-cf800.cloudfunctions.net/story_room/",
            }
        },
        created: function () {
            firebase.onAuth(this.$store);
            rdb.load_story_contents(this.$store, this.$route.params['story_room']);
        },
        computed: {
            get_contents_data: function (event) {
                return this.$store.getters['stories/contents_data'];
            },
            get_twitter_card_url: function (event) {
                return this.func_link_base + this.$route.params['story_room'];
            },
        },
        methods: {
            hideshow: function () {
                this.show = !this.show
                if (this.maiki == '閲覧モード') {
                    this.maiki = '入力モード'
                } else {
                    this.maiki = '閲覧モード'
                }
            },
            on_submitted: function (event) {
                if (this.text !== '') {
                    rdb.create_story_content(this.$store, this.$route.params['story_room'], this.text);
                }
            },
        },
    }
</script>

<style>
    #story-room-wrap {
        /* background: firebrick; */
        width: 90%;
        /* height: 1000px; */
        margin: 0 auto;
        position: relative;
    }

    #story-room-title {
        /* background: darkblue; */
        padding: 0.5vw;
        border-bottom: solid 2px rgb(19, 19, 19);
        line-height: 2vw;
        position: relative;
    }

    #story-room-title h2 {
        /* background: darkblue; */
        font-size: 2vw;
    }

    #twitter-btn {
        /* background: darkblue; */
        position: absolute;
        bottom: 0;
        right: 10px;
    }


    #main-contents {
        background: rgb(245, 245, 245);
        margin-bottom: 1vw;
        margin-top: 0.5vw;
        padding: 1vw;
    }
    .story-contents{
        border-bottom: solid 1px rgba(82, 82, 82, 0.253);
    }

    #main-contents p {
        color: black;
        font-size: 1.2vw;
        font-family: serif;
        /* cursive sans-serif; */
    }

    #user-input-area {
        /* background: steelblue; */
        /* display: flex;
        flex-direction: column; */
        position: relative;
    }

    #bottom-func {
        /* background: darkmagenta; */
    }

    #input-area textarea {
        border: solid 2px gray;
        resize: vertical;
        min-height: 100px;
        /* widows: 100%;
        height: 10em; */
    }

    #input-area button {
        /* border: solid 2px gray; */
        /* background: darkgreen; */
        padding: 0.6vw 4vw;
        position: absolute;
        right: 1vw;
        bottom: 5%;

        /* width: 200px; */
        /* font-size: 24px; */
        font-weight: bold;
        text-decoration: none;
        display: block;
        text-align: center;
        color: aliceblue;
        background: rgb(0, 2, 143);
        border-radius: 5px;
        transition: .4s;
        /* widows: 100%;
        height: 10em; */
    }

    #input-area button:hover {
        background: rgb(98, 102, 224);
        transition: .4s;
    }

    #change-btn button {
        background: darkgreen;
        padding: 0.6vw 2.6vw;
        position: absolute;
        top: 0;
        right: 1vw;
        font-weight: bold;
        text-decoration: none;
        display: block;
        text-align: center;
        color: aliceblue;
        background: #0004de;
        /* border-radius: 5px; */
        border: solid 2px;
        border-image: linear-gradient(to right, #0004de 0%, #bd5aac 100%);
        border-image-slice: 1;
        transition: .4s;
        /* display: inline-block; */
        /* text-align: right; */
    }

    #change-btn button:hover {
        background: #bd5aac;
        /* border-radius: 5px; */
        border: solid 2px;
        border-image: linear-gradient(to right, #0004de 0%, #bd5aac 100%);
        border-image-slice: 1;
        transition: .4s;
        /* display: inline-block; */
        /* text-align: right; */
    }
</style>