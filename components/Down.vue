<template>
    <div class="js-accordion" v-cloak>
        <button  class="js-accordion--trigger icon" type="button" :class="{ '_state-open': isOpened }"
            @click="accordionToggle()"></button>
        <div class="js-accordion--target" :class="{ '_state-open': isOpened }" v-if="isOpened">
            <div class="js-accordion--body">
                <nuxt-link  class="link" to="/setting" >設定</nuxt-link>
                <p>使い方</p>
                <p>ヘルプ</p>
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
.js-accordion--body {
    background: red;
    width: 200px
}
</style>