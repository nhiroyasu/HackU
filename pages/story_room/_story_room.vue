<template>
    <div id="story-room-wrap">
        <div id="story-room-title">
            <h2>{{get_story_title}}</h2>
            <h3> {{get_story_last_update}}</h3>
            <!-- Twitter共有ボタン -->
            <div id="twitter-btn">
                <a href="https://twitter.com/share" class="twitter-share-button" v-bind:data-text="get_card_data"
                    v-bind:data-url="get_twitter_card_url" data-lang="ja">Tweet</a>
                <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
            </div>
        </div>
        <div id="con-wrap">
            <div id="con-wrap1">
                <div id="main-contents">
                    <div class="story-contents" v-for="(value,index) in get_contents_data" :key="index">
                        <p>{{value['content']}}</p>
                    </div>
                </div>

                <div id="user-input-area">
                    <div id="change-btn">
                        <button v-on:click="hideshow">{{maiki}}</button>
                    </div>
                    <div id="bottom-func" v-show="show">
                        <div id="input-area">
                            <textarea name="none" id="inputdoc" cols="60" rows="5" v-model="text"></textarea>
                            <button v-on:click="on_submitted">送信</button>
                        </div>
                    </div>

                </div>
            </div>
            <div id="rem-wrap">

                <div id="con-wrap2">
                    <p>{{get_story_description}}</p>
                </div>
                <button id="delete-btn" v-if="get_story_author" v-on:click="on_delete">部屋の削除</button>
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
                author: this.$store.getters['story_manager/story_author_state'],
                func_link_base: "https://us-central1-dust-cf800.cloudfunctions.net/story_room/",
            }
        },
        created: function () {
            firebase.process_get_user(this.$store).then(snapshot => {
                rdb.check_story_auther(this.$store, this.$route.params['story_room']);
            });
            rdb.load_story_data(this.$store, this.$route.params['story_room']);
            rdb.load_story_contents(this.$store, this.$route.params['story_room']);
        },
        computed: {
            get_story_title: function(event) {
                var current_story_data = this.$store.getters['stories/current_story'];
                return current_story_data.title
            },
            get_story_description: function(event) {
                var current_story_data = this.$store.getters['stories/current_story'];
                var description = current_story_data.description;
                return description ? description : "Not found description";
            },
            get_story_last_update: function(event) {
                var current_story_data = this.$store.getters['stories/current_story'];
                if (current_story_data.contents) {
                    var edit_dates = Object.keys(current_story_data.contents);
                    var last_update = edit_dates[edit_dates.length - 1];
                    last_update = last_update.slice(4, 6)+'月'+last_update.slice(6,8)+'日 '+last_update.slice(8, 10)+':'+last_update.slice(10,12);
                    return last_update;
                } else {
                    return "更新なし";
                }
            },
            get_contents_data: function (event) {
                return this.$store.getters['stories/contents_data'];
            },
            get_twitter_card_url: function (event) {
                return this.func_link_base + this.$route.params['story_room'];
            },
            get_card_data: function(event) {
                var now = new Date();
                return "「" + this.get_story_title+ "」" + "を共有する" + ' ' +now.getHours()+':'+now.getMinutes()+':'+now.getSeconds();
            },
            get_story_author: function (event) {
                return this.$store.getters['story_manager/story_author_state'];
            }
        },
        methods: {
            hideshow: function () {
                if (this.$store.getters['user/isSignedIn']) {
                    this.show = !this.show
                    if (this.maiki == '閲覧モード') {
                        this.maiki = '入力モード'
                    } else {
                        this.maiki = '閲覧モード'
                    }
                } else {
                    var result = confirm("ストーリーに参加するにはログインしてください");
                    if (result) {
                        window.location.href = "/login";
                    }
                }
            },
            on_submitted: function (event) {
                if (this.text !== '') {
                    rdb.create_story_content(this.$store, this.$route.params['story_room'], this.text);
                }
            },
            on_delete: function (event) {
                rdb.delete_story(this.$store.getters['user/user_id'], this.$route.params['story_room'])
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
        border-bottom: solid 2px rgb(87, 97, 119);
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

    .story-contents {
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
        width: 80%;
        /* font-family: serif; */
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

    #con-wrap {
        position: relative;
    }

    #con-wrap1 {
        /* background: #0004de; */
        width: 72%;
    }

    #con-wrap2 {
        /* background: #bd5aac; */
        border: solid 2px rgba(133, 133, 133, 0.691);
        padding: .5vw;
        border-radius: 4px;
        font-size: 1.2vw;
        width: 100%;
        overflow-y: scroll;
        position: absolute;
        top: 0;
        right: 1%;
        height: 35vw;
        z-index: 10;
    }

    #delete-btn {
        display: block;
        font-size: 1vw;
        width: 10vw;
        padding: 0.6em;
        text-align: center;
        text-decoration: none;
        color: #FFF;
        background: #af3434;
        /* border-bottom: 2px solid rgb(0, 62, 143); */
        border-radius: 4px;
        /* box-shadow: inset 0 2px 0 rgba(255, 255, 255, 0.2), 0 2px 2px rgba(0, 0, 0, 0.19); */
        position: absolute;
        right: 1%;
        bottom: 0; 
        z-index: 10;
        user-select: none;
        transition: .4s;
    }

    #delete-btn:hover {
        background: #df6767;
        transition: .4s;
    }

    #rem-wrap {
        /* background: #0004de; */
        height: 38vw;
        display: inline-block;
        width: 25%;
        position: absolute;
        top: 0;
        right: 1%;
    }
</style>