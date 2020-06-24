<template>
  <div class="disk">
    <select @input="diskSize" @click="diskSizes">
      <option disabled selected></option>
      <option class="option" v-for="(disk, index) in disks" :key="index" >{{disk.name}}</option>
    </select>
    <p class="diskSize" >Выбран диск: <span>{{ disk }}</span></p>
    <p class="diskSize" >Размер диска: <span>{{ size2 }}</span> Кб</p>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Disk",
  data() {
    return {
      disks: [],
      size: "",
      size1: 0,
      size2: 0,
      disk: '',
    };
  },
  methods: {
    diskSizes() {
      this.disks.filter(item => {
        if (item.name === this.size) {
          this.size1 = item.size
          localStorage.diskSize = this.size1 / 1024
          location.reload();
        }
      });
    },
    diskSize(event) {
      this.size = event.target.value;
      localStorage.disk = event.target.value + '//'
      let size = this.size + '/';
        var xhr =  new XMLHttpRequest();
        xhr.open("POST", 'http://localhost:3001/users/name', true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send('param=' + JSON.stringify({name: size}));
    }
  },
  mounted() { 
    axios
      .get("http://localhost:3001/users/disk")
      .then(response => (this.disks = response.data));


     this.size2 = localStorage.diskSize
     this.disk = localStorage.disk
  } 
};
</script>

<style scoped>
</style>
