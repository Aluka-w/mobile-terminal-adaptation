<template>
  <div id="home">
    <div class="top"></div>
    <div class="mid"></div>
    <div class="bottom">
      <div class="left"></div>
      <div class="right"></div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      word: ''
    }
  },
  methods: {

  }
}
</script>

<style>
  #home {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .top {
    width: 750px;
    background-color: tomato;
    /* 这样注释的/no/, 代表不会转化成rem, 一般用在border,  */
    /* 在px后面添加/px/,会根据dpr的不同，生成三套代码。---- 一般字体需用这个 */
    flex-basis: 100px; /*no*/
  }
  .mid {
    width: 750px;
    flex: 1;
    background-color: aquamarine;
  }
  .bottom{
    flex-basis: 300px;
    width: 750px;
  }
  .left {
    width: 375px;
    height: 100%;
    background-color: skyblue;
    float: left;
  }
  .right {
    width: 375px;
    height: 100%;
    background-color: yellowgreen;
    float: left;
  }
</style>
