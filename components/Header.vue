<template>
    <header id="header">
        <div id="header-wrap">

            <div id="logo-wrap">
                <nuxt-link class="link" id="logo" to="/">DUST</nuxt-link>
            </div>
            <nuxt-link id="login-btn" class="link" to="/login">Login</nuxt-link>
            <div class="icon">
                <!-- <img src="" alt=""> -->
                <down />
            </div>

        </div>
    </header>
</template>

<script>
    import Down from '~/components/Down.vue'
    export default {
        components: {
            Down
        },
    }
</script>

<style scoped>
    #header {
        width: 100%;
        height: 40px;
        line-height: 40px;
        margin: 0;
        padding: 0;
        color: #111;
        position: relative;
        /* vertical-align: middle; */
        /* border-bottom: solid 10px rgb(224, 224, 224); */
        /* margin-bottom: 5px; */
        /* display: flex;
        justify-content: center;
        align-items: center; */
    }

    #header-wrap {
        /* display: flex; */
    }

    #logo {
        font-size: 1.5em;
        text-align: center;
        position: absolute;
        left: 5%;
        user-select: none;
        /* border-bottom: solid 10px darkblue; */
    }

    #login-btn {
        /* background: rgb(173, 135, 235); */
        /* padding: 3px; */
        /* width: 80px; */
        /* height: 50px; */
        /* text-align: center; */
        /* vertical-align: middle; */
        font-size: 1.0em;
        position: absolute;
        right: 5%;
        user-select:none;
    }

    .icon {
        position: absolute;
        right: 5%;
    }

    .link {
        text-decoration: none;
        color: black;
        cursor: pointer;
    }

    /* .icon {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        margin:2px;
        padding: 0;
        border-style: none;
    } */
</style>