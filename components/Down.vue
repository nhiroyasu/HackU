<template>
    <div class="js-accordion" v-cloak>
        <div id="acc-btn-wrap">
            <button class="js-accordion--trigger icon" type="button" :class="{ '_state-open': isOpened }"
                @click="accordionToggle()"></button>
        </div>
        <div class="js-accordion--target" :class="{ '_state-open': isOpened }" v-if="isOpened">
            <div class="js-accordion--body">
                <div class="menuchild">
                    <nuxt-link id="set" class="link" to="/setting">設定</nuxt-link>
                </div>
                <div class="menuchild">使い方</div>
                <div class="menuchild">ヘルプ</div>
                <div class="menuchild">ログアウト</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                isOpened: false
            };
        },

        methods: {
            accordionToggle: function () {
                this.isOpened = !this.isOpened
            },
        },
    }
</script>

<style>
    .js-accordion {
        /* background: saddlebrown; */
        position: relative;
        width: 100%;
        height: 40px;
        /* padding-top: 5px; */
    }

    #acc-btn-wrap {
        /* background: rebeccapurple; */
        margin-top: 10px;
        /*
        position:absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto; */
    }

    .js-accordion--trigger {
        background: rebeccapurple;
        height: 20px;
        width: 20px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;

    }

    .js-accordion--target {
        background: seagreen;
        position: absolute;
        left: -130px;
    }

    .js-accordion--body {
        background: rgb(255, 255, 255);
        /* border: solid 2px black; */
        position: absolute;
        z-index: 10;
        /* right: 0px;
    bottom: 0px; */
        width: 150px;
        box-shadow: 1px 1px 1px gray;
        
    }

    .menuchild {
        border-bottom: solid 1px rgba(206, 206, 206, 0.472);
        height: initial;
        /* padding-left: 30px; */
        padding-top: 0px;
        padding-bottom: 0px;
        text-align: center;
        font-size: 0.7em;
    }

    .link {
        text-decoration: none;
        color: black;
        cursor: pointer;
    }
    #set {
        /* background: rebeccapurple; */
        padding:10px 50px;
        /* font-size: 20px; */
    }
</style>