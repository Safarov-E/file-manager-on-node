<template>
  <div @click="showNone" class="container window" @click.right.prevent="actionsDirectory($event)">
    <Disk />
    <form class="isDirectory">
      <button type="submit" class="isDirectoryButton" @click="pathDirectoryButton">&#8617;</button>
      <input class="isDirectoryInput" type="text" v-model="isdirectory" />
      <button
        type="submit"
        class="isDirectoryButton"
        @click="pathDirectoryInput(isdirectory)"
      >&#10004;</button>
    </form>
    <hr />
    <div class="action-btn">
      <button @click="createFolder">
        <img
          class="create_folder"
          src="../assets/iconfinder_icon-105-folder-add_314682.png"
          alt="delete"
          width="25px"
        />Создать папку
      </button>
      <button @click="createFile">
        <img
          class="create_file"
          src="../assets/iconfinder_icon-81-document-add_314764.png"
          alt="rename"
          width="25px"
        />Создать Файл
      </button>
      <button @click="showDeleteFolder = !showDeleteFolder">
        <img
          class="delete"
          src="../assets/iconfinder_delete-file_85306.png"
          alt="delete"
          width="25px"
        />Удалить
      </button>
    </div>
    <hr />
    <div class="directory">
      <ul>
        <li class="directory" v-for="(item) in directory" :key="item">
          <input
            v-if="showDeleteFolder"
            class="pathDirInput"
            type="checkbox"
            name="pathDir"
            @click="handlerDeleteFolder(item)"
          />
          <a class="pathDir text-truncate" @click="pathDirectory(item)" :value="item" :href="item">{{item}}</a>
        </li>
      </ul>

      <div v-if="show" class="modal">
        <div class="modal-content">
          <span class="close" @click="handlerClose">&times;</span>
          <div class="textError">
            <img src="../assets/cancel-icon-47512.png" alt="cancel" width="40px" />
            <p>Файл или папка повреждены. Чтение невозможно.</p>
          </div>
          <div class="btn-close">
            <button class="closeBtn" @click="handlerClose">OK</button>
          </div>
        </div>
      </div>
      <div class="contextmenu">
        <ul>
          <li @click="actDirDelete" class="delete">
            <img
              class="delete"
              src="../assets/iconfinder_delete-file_85306.png"
              alt="delete"
              width="25px"
            /> Удалить
          </li>
          <li @click="actDirRename" class="rename">
            <img class="rename" src="../assets/_20160211_1036638836.png" alt="rename" width="25px" /> Переменовать
          </li>
        </ul>
      </div>
      <form class="renameFile" v-if="showRename">
        <div class="renameFile_action">
          <span class="close_modal" @click="handlerClose">&times;</span>
          <div class="inputValue">
            <p>Введите новое имя файла:</p>
            <input type="text" v-model="newName" />
          </div>
          <div class="btn-close">
            <button class="closeBtn" @click="actDirRename1">Сохранить</button>
          </div>
        </div>
      </form>
      <div class="contextmenu1">
        <ul>
          <li @click="createFolder" class="create_folder">
            <img
              class="create_folder"
              src="../assets/iconfinder_icon-105-folder-add_314682.png"
              alt="delete"
              width="25px"
            /> Создать папку
          </li>
          <li @click="createFile" class="create_file">
            <img
              class="create_file"
              src="../assets/iconfinder_icon-81-document-add_314764.png"
              alt="rename"
              width="25px"
            /> Создать файл
          </li>
        </ul>
      </div>

      <form class="renameFile1" v-if="showfolder">
        <div class="renameFile_action1">
          <span class="close_modal1" @click="handlerClose">&times;</span>
          <div class="inputValue1">
            <p>Введите имя папки:</p>
            <input type="text" v-model="folder_name" />
          </div>
          <div class="btn-close">
            <button class="closeBtn" @click="handlerCreateFolder">Создать</button>
          </div>
        </div>
      </form>

      <form class="renameFile1" v-if="showFile">
        <div class="renameFile_action1">
          <span class="close_modal1" @click="handlerClose">&times;</span>
          <div class="inputValue1">
            <p>Введите имя файла:</p>
            <input type="text" v-model="file_name" />
          </div>
          <div class="btn-close">
            <button class="closeBtn" @click="handlerCreateFile">Создать</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Disk from "./Disk";
import "./style/style.css";
export default {
  name: "Directory",
  data() {
    return {
      directory: [],
      controls: [],
      show: false,
      isdirectory: "",
      showRename: false,
      showfolder: false,
      showFile: false,
      newName: "",
      oldName: "",
      folder_name: "",
      file_name: "",
      showDeleteFolder: false
    };
  },
  components: {
    Disk
  },
  mounted() {
    axios
      .get("http://localhost:3001/users")
      .then(response =>
        response.data.forEach((el, i) => this.$set(this.directory, i, el))
      )
      .catch(error => {
        this.show = true;
        console.error(error);
      });
    axios.get("http://localhost:3001/users/directory").then(response => {
      this.isdirectory = response.data.join("");
    });
  },
  methods: {
    pathDirectory(value) {
      var xhr = new XMLHttpRequest();
      xhr.open("POST", "http://localhost:3001/users/value", true);
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.send("param=" + JSON.stringify({ name: value }));
    },
    pathDirectoryInput(value) {
      var xhr = new XMLHttpRequest();
      xhr.open("POST", "http://localhost:3001/users/pathdirectory", true);
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.send("param=" + JSON.stringify({ name: value }));
    },
    handlerClose() {
      this.show = false;
      this.showRename = false;
      this.showfolder = false;
      this.showFile = false;
    },
    pathDirectoryButton() {
      axios
        .get("http://localhost:3001/users/return")
        .then(response => (this.directory = response.data))
        .catch(error => {
          console.error(error);
        });
    },
    actionsDirectory(event) {
      let block = document.querySelector(".contextmenu");
      let block1 = document.querySelector(".contextmenu1");
      if (event.target.classList.contains("pathDir")) {
        this.oldName = event.target.textContent;
        block.style.position = "fixed";
        block.style.left = event.clientX + "px";
        block.style.top = event.clientY + "px";
        block.style.display = "block";
        block1.style.display = "none";
      } else if (event.target.className == "directory") {
        block1.style.position = "fixed";
        block1.style.left = event.clientX + "px";
        block1.style.top = event.clientY + "px";
        block1.style.display = "block";
        block.style.display = "none";
      } else {
        block1.style.display = "none";
        block.style.display = "none";
      }
    },
    showNone() {
      document.querySelector(".contextmenu").style.display = "none";
      document.querySelector(".contextmenu1").style.display = "none";
    },
    actDirRename() {
      this.showRename = true;
      this.newName = this.oldName;
    },
    actDirRename1() {
      this.showRename = true;
      if (this.newName.length >= 2) {
        let old_name = this.isdirectory + "/" + this.oldName;
        let new_name = this.isdirectory + "/" + this.newName;

        var xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost:3001/users/newRename", true);
        xhr.setRequestHeader(
          "Content-Type",
          "application/x-www-form-urlencoded"
        );
        xhr.send("param=" + JSON.stringify({ new: new_name, old: old_name }));
      }
    },
    actDirDelete() {
      let deleteDir = this.isdirectory + "/" + this.oldName;
      console.log(deleteDir);
      var xhr = new XMLHttpRequest();
      xhr.open("POST", "http://localhost:3001/users/deletDir", true);
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.send("param=" + JSON.stringify({ del: deleteDir }));
      location.reload();
    },
    createFolder() {
      this.showfolder = true;
    },
    handlerCreateFolder() {
      let create_folder = this.isdirectory + "/" + this.folder_name;
      var xhr = new XMLHttpRequest();
      xhr.open("POST", "http://localhost:3001/users/createFolder", true);
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.send("param=" + JSON.stringify({ create: create_folder }));
    },
    createFile() {
      this.showFile = true;
    },
    handlerCreateFile() {
      let create_file = this.isdirectory + "/" + this.file_name;
      var xhr = new XMLHttpRequest();
      xhr.open("POST", "http://localhost:3001/users/createFile", true);
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.send("param=" + JSON.stringify({ create: create_file }));
    },
    handlerDeleteFolder(value) {
      let delete_file = this.isdirectory + "/" + value;
      var xhr = new XMLHttpRequest();
      xhr.open("POST", "http://localhost:3001/users/deleteButton", true);
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.send("param=" + JSON.stringify({ create: delete_file }));
      this.showDeleteFolder = false;
      location.reload();
    }
  }
};
</script>

<style scoped>
</style>
 