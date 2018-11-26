<template>
  <div id="home">
    <div class="top ignore"></div>
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
  }
  /* ignore这个类名, 保证px不转化成vm, 类名可在.postcssrc.js中配置 */
  .ignore {
    flex-basis: 100px;
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
