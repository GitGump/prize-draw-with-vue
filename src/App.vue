<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import list from './data/all.js';
  import index from '@/components/index.vue';

  export default {
    name: 'App',
    components: {
      index
    },
    data() {
      return {
        navs: this.$router.options.routes
      }
    },
    mounted() {
      if (window.sessionStorage) {
        window.sessionStorage.clear();
        window.sessionStorage.setItem('list', JSON.stringify(list))
      }
    },
    methods: {}
  }
</script>

<style>
  body {
    font-family: 'Microsoft Yahei', 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    top: 0;
    left: 0;
    margin: 0;
    padding: 0;
    font-size: 62.5%;
    background: url(./assets/main-page-bg.jpg) no-repeat fixed center center;
    background-size: cover;
    background-color: #f71b1b;
  }

  ::-webkit-scrollbar {
    display: none;
  }

  #app {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .main-page-bg {
    position: relative;
  }

  .child-page-entry {
    position: absolute;
    width: 640px;
    margin-top: 35%;
    left: 50%;
    margin-left: -240px;
  }

  .entry-button {
    padding: 4px 24px;
    margin-right: 68px;
    margin-bottom: 24px;
    color: #f71b1b;
    background-color: #fff202;
    font-size: 2.4em;
    border-radius: 4px;
  }

  .child-page-entry button:last-child {
    margin-right: 0;
  }
</style>
