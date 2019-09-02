<template>
    <header id="header">
        <div id="header-wrap">

            <div id="logo-wrap">
                <nuxt-link class="link" id="logo" to="/">DUST</nuxt-link>
            </div>

            <div id="login-btn">
                <nuxt-link class="link" to="/login">Login</nuxt-link>
            </div>

            <div class="icon">
                <img v-bind:src="icon_link" alt="#" width="25" height="25">
                <down />
            </div>

        </div>
    </header>
</template>

<script>
import user_icon_img from "~/static/user_icon_default.png";

import Down from '~/components/Down.vue'
    export default {
        components: {
            Down
        },
        data: function() {
            return {
                user_icon: user_icon_img,
            }
        },
        computed: {
            icon_link: function(event) {
                var link = this.$store.getters['user/icon'];
                if (link !== "") {
                    return link;
                } else {
                    return this.user_icon;
                }
            }
        },
    }
</script>

<style scoped>
    #header {
        width: 100%;
        background-color: skyblue;
        margin: 0;
        padding: 0;
        color: #111;
    }
    #header-wrap {
        display: flex;
    }
    #logo {
        font-size: 1.5em;
        float: left;
        text-align: center;
    }
    #login-btn{
        background: rgb(173, 135, 235);
        margin: 4px;
        padding: 3px;
    }
    .link {
        text-decoration: none;
        color: black;
        cursor: pointer;
    }
    .icon {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        margin:2px;
        padding: 0;
        border-style: none;
    }
</style>