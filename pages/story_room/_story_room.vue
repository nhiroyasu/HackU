<template>
    <div story-wrap>
        <div id="main-contents">
            <div class="story-contents" v-for="(value, index) in get_contents_data" :key="index">
                <!-- <ChatBox v-bind:content="value['content']" /> -->
                <p>{{value['content']}}</p>
            </div>
        </div>

        <div id="bottom-func" v-show="show">
            <div id="input-area">
                <textarea name="none" id="inputdoc" cols="30" rows="10" v-model="text"></textarea>
                <button v-on:click="on_submitted">送信</button>
            </div>
        </div>
        <div id="change-btn">
            <button v-on:click="hideshow">{{maiki}}</button>
        </div>
        <!-- Twitter共有ボタン -->
        <a href="https://twitter.com/share" class="twitter-share-button" data-text="このストーリールームを共有する" v-bind:data-url="get_twitter_card_url" data-lang="ja">Tweet</a>
        <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
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
                maiki: '入力',
                show: false,
                text: '',
                func_link_base: "https://us-central1-dust-cf800.cloudfunctions.net/story_room/",
            }
        },
        created: function() {
            firebase.onAuth(this.$store);
            rdb.load_story_contents(this.$store, this.$route.params['story_room']);
        },
        computed: {
            get_contents_data: function(event) {
                return this.$store.getters['stories/contents_data'];
            },
            get_twitter_card_url: function(event) {
                return this.func_link_base + this.$route.params['story_room'];
            },
        },
        methods: {
            hideshow: function() {
                this.show = !this.show 
                if (this.maiki == '入力'){
                    this.maiki = '閲覧'
                }else{
                    this.maiki = '入力'
                }
            },
            on_submitted: function(event) {
                if (this.text !== '') {
                    rdb.create_story_content(this.$store, this.$route.params['story_room'], this.text);
                }
            },
        },
    }
</script>

<style>
    #main-contents {
        background: sienna;
    }

    #bottom-func {
        background: darkmagenta;
    }

    #change-btn {
        background: darkgreen;
    }
</style>