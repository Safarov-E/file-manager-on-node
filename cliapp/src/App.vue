<template>
  <div id="app">
    <div class="container text">
      Перед использованием обезательно прочтите документ .docx который был вложен <br> в данное приложение, в нем описан весь функционал данного приложения
    </div>
    <Directory msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import Directory from './components/Directory.vue'

export default {
  name: 'App',
  components: {
    Directory
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.text {
  font-size: 20px;
  padding-bottom: 20px
}
</style>
