<template>
    <div id="room-main">
        <div id="info-wrap">
            <div id="title">
                <p>{{title}}</p>
                <p>{{get_story_creation_date}}</p>
            </div>
            <div id="author">
                <p>by {{author}}</p>
            </div>
            <div id="cre-day">
                <p>作成日 {{}}</p>
            </div>
            <nuxt-link id="join-btn" class="link" v-bind:to="to_story">参加する</nuxt-link>
        </div>
    </div>
</template>

<script>
    export default {
        data: function () {
            return {};
        },
        props: {
            sid: String,
            title: String,
            author: String,
        },
        created: function() {
            rdb.load_story_data(this.$store, this.$route.params['story_room']);
        },
        computed: {
            to_story: function (event) {
                return "/story_room/" + this.sid;
            },
            get_story_creation_date: function(event) {
                var current_story_data = this.$store.getters['stories/current_story'];
                var cre_date = current_story_data.creation_date;
                cre_date = cre_date.slice(0, 4)+'/'+cre_date.slice(4,6)+'/'+cre_date.slice(6,8);
                return cre_date;
            },
        }
    }
</script>

<style>
    #room-main {
        /* background: salmon; */
        position: relative;
        width: 100%;
        height: 8vw;
        /* padding: 5%; */
        border: solid 1px rgba(128, 128, 128, 0.383);
        border-radius: 4px;
    }

    #info-wrap {
        /* background: chartreuse; */
        height: 8vw;
    }

    #title {
        font-size: 1.5vw;
        font-weight: bold;
        margin-left: 5px;
        margin-top: 5px;
        /* margin-left: 3%; */
        /* position: absolute;
        left: 3%;
        top: 3%; */
    }

    #author {
        /* margin-left: 3%; */
        font-size: 1.2vw;
        color: rgb(0, 0, 129);
        margin-left: 5px;
        margin-top: 5px;
        /* position: absolute;
        left: 3%; */
        /* bottom: 3%; */
    }

    #cre-day {
        font-size: 1vw;
        color: rgb(0, 0, 129);
        margin-left: 5px;
        margin-top: 5px;
        /* position: absolute;
        right: 12%;
        bottom: 45%; */
    }

    #join-btn {
        /* background: orange; */
        position: relative;
        display: block;
        font-size: 1.2vw;
        width: 10vw;
        padding: 0.6em;
        text-align: center;
        text-decoration: none;
        color: #FFF;
        background: rgb(1, 25, 161);
        /* border-bottom: 2px solid rgb(0, 62, 143); */
        border-radius: 4px;
        /* box-shadow: inset 0 2px 0 rgba(255, 255, 255, 0.2), 0 2px 2px rgba(0, 0, 0, 0.19); */
        position: absolute;
        right: 1%;
        bottom: 3%;
        user-select: none;
    }

    #join-btn:hover {
        background: rgb(76, 91, 177);
        /* border-bottom: 2px solid rgb(30, 75, 134); */
    }
</style>