<template>
    <div id="room-main">
        <div id="info-wrap">
            <div id="title">
                <p>{{title}}</p>
            </div>
            <div id="author">
                <p>{{author}}</p>
            </div>
        </div>

        <div id="join-btn">
            <nuxt-link class="link" v-bind:to="to_story">参加する</nuxt-link>
        </div>
    </div>
</template>

<script>
export default {
    data: function() {
        return {
        };
    },
    props: {
        sid: String,
        title: String,
        author: String,
    },
    computed: {
        to_story: function(event) {
            return "/story_room/" + this.sid;
        }
    }
}
</script>

<style>
#room-main {
    background: salmon;
    margin: 5px;
}
#join-btn{
    background: orange;
    width: fit-content;
}
</style>