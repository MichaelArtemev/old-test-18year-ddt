<template>
  <div class="user__wrap">
    <div class="user container">
      <div class="window-down">
        <div class="window__body">
          <div @click="closeInfoWindow" class="window-close">X</div>
          <div class="error">
            {{ error }}
          </div>
        </div>
      </div>
      <div class="user__action-content">
        <header class="user__header">
          <div class="user__info-cluster">
            <img src="../assets/logo2.png" alt />
            <div class="user__headet-info">Управление сотрудниками</div>
          </div>
          <ul>
            <li @click="getAddMenu">Добавить</li>
            <li @click="getWorkersMenu">Вывести список</li>
          </ul>
        </header>
        <div class="user__flex-menu">
          <div class="user__add-menu">
            <!-- <form action> -->
            <div class="user__t-number">
              <div class="user__label">Таб. Номер</div>
              <input v-model="tField" type="text" />
            </div>
            <div class="user__name">
              <div class="user__label">ФИО</div>
              <input v-model="nameField" placeholder="Имя" type="text" />
              <input
                v-model="lastNameField"
                placeholder="Фамилия"
                type="text"
              />
              <input
                v-model="secondNameField"
                placeholder="Отество"
                type="text"
              />
            </div>
            <div class="user__phone">
              <div class="user__label">Телефон</div>
              <input v-model="phoneField" type="text" />
            </div>
            <button @click="addUser" class="btn">Добавить</button>
            <!-- </form> -->
          </div>
          <div class="user__list">
            <div class="user__list-flex"></div>
          </div>
        </div>
      </div>
      <div class="user__body">
        <div class="anim-hand-wrapp">
          <div class="anim-hand">
            <img class="current-img" src="../assets/handddt.png" alt />
            <img class="current-out" src="../assets/out-hand.png" alt />
            <img class="fake-img" src="../assets/fakeimg.png" alt />
          </div>
        </div>
        <div class="preloader-wrapper">
          <div id="preloader">
            <div id="loader"></div>
            <div class="user__temp-img">
              <img src="../assets/logo2.png" alt />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getWorkersService } from "../../server/service.js";
export default {
  name: "UserAction",
  data() {
    return {
      currentHand: null,
      outImg: null,
      fakeImg: null,
      loader: null,
      userBody: null,
      menuBlock: null,
      chekAdd: 0,
      dataPages: [1, 2, 3, 4],
      dataJson: null,
      userListDelTrigge: null,
      listCheck: 0,
      tField: "",
      nameField: "",
      lastNameField: "",
      secondNameField: "",
      phoneField: "",
      error: "",
      windowClose: null,
      workersList: null,
      workersCheck: 0,
      mainMenu: null,
    };
  },
  mounted: function() {
    this.currentHand = document.querySelector(".current-img");
    this.workersList = document.querySelector(".user__list");
    this.mainMenu = document.querySelector(".user__action-content");
    this.windowClose = document.querySelector(".window-down");
    this.userListDelTrigge = document.querySelector(".user__list-flex");
    this.outImg = document.querySelector(".current-out");
    this.fakeImg = document.querySelector(".fake-img");
    this.loader = document.querySelector("#preloader");
    this.userBody = document.querySelector(".user__body");
    this.menuBlock = document.querySelector(".user__add-menu");
    this.hideHand();
    this.getWorkers();
  },
  methods: {
    getMainMenu: function() {
      this.mainMenu.style.width = "content";
      this.mainMenu.style.wheight = "content";
      this.mainMenu.style.visibility = "visible";
      this.mainMenu.style.opacity = "1";
    },
    getWorkersMenu: function() {
      if (this.workersCheck === 1) {
        this.workersList.style.opacity = 0;
        this.workersList.style.visibility = "hidden";
        this.workersCheck = 0;
      } else {
        this.workersList.style.opacity = 1;
        this.workersList.style.visibility = "visible";
        this.workersCheck = 1;
      }
    },
    closeInfoWindow: function() {
      this.windowClose.style.transform = "translateY(-100%)";
    },
    addUser: function() {
      if (
        this.tField.length === 0 ||
        this.nameField.length === 0 ||
        this.lastNameField.length === 0 ||
        this.secondNameField.length === 0 ||
        this.phoneField.length === 0
      ) {
        this.windowClose.style.transform = "translateY(0%)";
        this.error = "Пожалуйста, заполните все поля";
      } else {
        this.dataJson.push({
          first_name: this.nameField,
          last_name: this.lastNameField,
          second_name: this.secondNameField,
          phone: this.phoneField,
          tnumber: this.tField,
        });
        this.clearDom();
        this.getCurrentData();
        console.log(this.dataJson);
      }
    },
    dataLayout: function() {
      if (this.listCheck === 1) {
        return;
      } else {
        this.getWorkers();
        this.listCheck = 1;
      }
    },
    // DRY нарушен. не успевал.
    getCurrentData: function() {
      for (let i = 0; i <= this.dataJson.length - 1; i++) {
        const elem = document.querySelector(".user__list-flex");
        const userInfo = document.createElement("div");
        userInfo.classList.add("user__info-container");

        const tabNameRow = document.createElement("div");
        const tabNameLabel = document.createElement("div");
        const tabNameBtn = document.createElement("div");
        const mainCross = document.createElement("div");

        tabNameLabel.innerText = "Таб.Номер: ";
        tabNameBtn.innerText = " X";
        tabNameBtn.classList.add(`${i}`);
        tabNameBtn.id = "tnumber";
        tabNameBtn.onclick = (e) => {
          const index = e.target.className;
          /*eslint-disable */
          const item = e.target.id;
          /*eslint-enable */
          delete this.dataJson[index][item];
          const rowToDel = document.querySelector(`#tnumber-row${index}`);
          console.log(rowToDel);

          rowToDel.innerHTML = "";
        };
        tabNameBtn.style.cursor = "pointer";
        tabNameBtn.style.color = "red";
        const tabName = document.createElement("div");
        tabNameRow.appendChild(tabNameLabel);
        tabNameRow.appendChild(tabName);
        tabNameRow.appendChild(tabNameBtn);
        tabName.style.marginLeft = "20px";
        tabName.style.marginRight = "20px";
        tabName.style.marginBottom = "5px";
        tabName.innerText = this.dataJson[i].tnumber;
        userInfo.appendChild(mainCross);
        userInfo.appendChild(tabNameRow);
        tabNameRow.style.display = "flex";
        tabNameRow.id = `tnumber-row${i}`;
        tabNameRow.style.alignItems = "bottom";

        const userNameRow = document.createElement("div");
        const userNameLabel = document.createElement("div");
        const userNameBtn = document.createElement("div");
        userNameLabel.innerText = "Имя: ";
        userNameBtn.innerText = " X";
        userNameBtn.classList.add(`${i}`);
        userNameBtn.id = "first_name";
        userNameBtn.onclick = (e) => {
          const index = e.target.className;
          /*eslint-disable */
          const item = e.target.id;
          /*eslint-enable */
          delete this.dataJson[index][item];
          const rowToDel = document.querySelector(`#first_name${index}`);
          rowToDel.innerHTML = "";
        };
        userNameBtn.style.cursor = "pointer";
        userNameBtn.style.color = "red";
        const userName = document.createElement("div");
        userNameRow.appendChild(userNameLabel);
        userNameRow.appendChild(userName);
        userNameRow.appendChild(userNameBtn);
        userName.style.marginLeft = "20px";
        userName.style.marginRight = "20px";
        userName.style.marginBottom = "5px";
        userName.innerText = this.dataJson[i].first_name;
        userInfo.appendChild(userNameRow);
        userNameRow.style.display = "flex";
        userNameRow.id = `first_name${i}`;
        userNameRow.style.alignItems = "bottom";

        const userLastNameRow = document.createElement("div");
        const userLastNameLabel = document.createElement("div");
        const userLastNameBtn = document.createElement("div");
        userLastNameLabel.innerText = "Фамилия: ";
        userLastNameBtn.innerText = " X";
        userLastNameBtn.classList.add(`${i}`);
        userLastNameBtn.id = "last_name";
        userLastNameBtn.onclick = (e) => {
          const index = e.target.className;
          /*eslint-disable */
          const item = e.target.id;
          /*eslint-enable */
          delete this.dataJson[index][item];
          const rowToDel = document.querySelector(`#last_name${index}`);
          rowToDel.innerHTML = "";
        };
        userLastNameBtn.style.cursor = "pointer";
        userLastNameBtn.style.color = "red";
        const lastName = document.createElement("div");
        userLastNameRow.appendChild(userLastNameLabel);
        userLastNameRow.appendChild(lastName);
        userLastNameRow.appendChild(userLastNameBtn);
        lastName.style.marginLeft = "20px";
        lastName.style.marginRight = "20px";
        lastName.style.marginBottom = "5px";
        lastName.innerText = this.dataJson[i].first_name;
        userInfo.appendChild(userLastNameRow);
        userLastNameRow.style.display = "flex";
        userLastNameRow.id = `last_name${i}`;
        userLastNameRow.style.alignItems = "bottom";

        const userSecondNameRow = document.createElement("div");
        const userSecondNameLabel = document.createElement("div");
        const userSecondNameBtn = document.createElement("div");
        userSecondNameLabel.innerText = "Отчество: ";
        userSecondNameBtn.innerText = " X";
        userSecondNameBtn.classList.add(`${i}`);
        userSecondNameBtn.id = "last_name";
        userSecondNameBtn.onclick = (e) => {
          const index = e.target.className;
          /*eslint-disable */
          const item = e.target.id;
          /*eslint-enable */
          delete this.dataJson[index][item];
          const rowToDel = document.querySelector(`#second_name${index}`);
          rowToDel.innerHTML = "";
        };
        userSecondNameBtn.style.cursor = "pointer";
        userSecondNameBtn.style.color = "red";
        const userSecond = document.createElement("div");
        userSecondNameRow.appendChild(userSecondNameLabel);
        userSecondNameRow.appendChild(userSecond);
        userSecondNameRow.appendChild(userSecondNameBtn);
        userSecond.style.marginLeft = "20px";
        userSecond.style.marginRight = "20px";
        userSecond.style.marginBottom = "5px";
        userSecond.innerText = this.dataJson[i].first_name;
        userInfo.appendChild(userSecondNameRow);
        userSecondNameRow.style.display = "flex";
        userSecondNameRow.id = `second_name${i}`;
        userSecondNameRow.style.alignItems = "bottom";

        const phoneNameRow = document.createElement("div");
        const phoneNameLabel = document.createElement("div");
        const phoneNameBtn = document.createElement("div");
        phoneNameLabel.innerText = "Номер: ";
        phoneNameBtn.innerText = " X";
        phoneNameBtn.classList.add(`${i}`);
        phoneNameBtn.id = "phone";
        phoneNameBtn.onclick = (e) => {
          const index = e.target.className;
          /*eslint-disable */
          const item = e.target.id;
          /*eslint-enable */
          delete this.dataJson[index][item];
          const rowToDel = document.querySelector(`#phone${index}`);
          rowToDel.innerHTML = "";
        };
        phoneNameBtn.style.cursor = phone;
        phoneNameBtn.style.color = "red";
        const phone = document.createElement("div");
        phoneNameRow.appendChild(phoneNameLabel);
        phoneNameRow.appendChild(phone);
        phoneNameRow.appendChild(phoneNameBtn);
        phone.style.marginLeftphone;
        phone.style.marginRight = "20px";
        phone.style.marginBottom = "5px";
        phone.innerText = this.dataJson[i].phone;
        userInfo.appendChild(phoneNameRow);
        phoneNameRow.style.display = "flex";
        phoneNameRow.id = `phone${i}`;
        phoneNameRow.style.alignItems = "center";

        userInfo.style.display = "flex";
        userInfo.style.flexDirection = "column";
        userInfo.style.alignItems = "center";
        userInfo.style.justifyContent = "center";
        userInfo.style.marginLeft = "10%";
        userInfo.style.marginBottom = "4%";
        userInfo.style.backgroundColor = "white";
        userInfo.style.width = "80%";

        elem.appendChild(userInfo);
      }
    },
    clearDom: function() {
      this.userListDelTrigge.innerHTML = "";
    },
    hideHand: function() {
      setTimeout(() => {
        this.currentHand.style.display = "none";
        this.fakeImg.style.display = "block";
        this.outImg.classList.remove("current-out");
        this.outImg.classList.add("slideUp");
        setTimeout(() => {
          this.outImg.style.display = "none";
          setTimeout(() => {
            this.userBody.style.opacity = 0;
            setTimeout(() => {
              this.userBody.style.display = "none";
              this.getMainMenu();
              this.mainMenu.classList.remove("user__action-content");
            }, 400);
          }, 500);
        }, 1000);
        // 2500
      }, 2500);
    },
    getAddMenu: function() {
      if (this.chekAdd === 1) {
        this.menuBlock.style.opacity = 0;
        this.menuBlock.style.visibility = "hidden";
        this.chekAdd = 0;
      } else {
        this.menuBlock.style.opacity = 1;
        this.menuBlock.style.visibility = "visible";
        this.chekAdd = 1;
      }
    },
    getWorkers: function(start, end) {
      if (start & end) {
        const promise = getWorkersService(start, end);
        promise.then((result) => {
          this.dataJson = result;
          this.getCurrentData();
        });
      } else {
        const promise = getWorkersService(0, 2);
        promise.then((result) => {
          this.dataJson = result;
          this.getCurrentData();
        });
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;700&display=swap");
@font-face {
  font-family: "circula";
  src: local("☺"), url("../assets/fonts/circula-medium.otf") format("opentype");
  font-style: normal;
}
input {
  transition: 0.4s;
}
.user__action-content {
  transition: all 0.5s;
  visibility: hidden;
  opacity: 0;
  width: 0;
  height: 0;
}
.error {
  font-size: 20px;
  color: black;
  text-align: center;
  margin-top: 100px;
}
input:focus {
  background-color: #2ecc71;
  color: white;
}
.window-close {
  color: red;
  font-size: 20px;
  cursor: pointer;
  position: absolute;
  right: 10px;
  top: 10px;
}
.user__wrap {
  font-family: "Montserrat", sans-serif;
  width: 100%;
  height: 100vh;
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
  transition: all 0.5s;
}
.btn {
  border: 2px solid #2ecc71;
  padding: 10px 37.5px 10px 37.5px;
  font-size: 1.2em;
  color: #fff;
  background-color: transparent;
  outline: 0;
  transition: background-color 0.3s ease;
}
.btn:hover {
  background-color: #2ecc71;
}
.user__wrap-eye-protect {
  width: 100%;
  height: 100vh;
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  transition: all 0.5s;
}
.window-down {
  display: flex;
  justify-content: center;
  position: absolute;
  margin-left: 350px;
  z-index: 99;
  transition: all 0.4s;
  transform: translateY(-100%);
}
.window__body {
  width: 400px;
  height: 250px;
  background-color: white;
  transition: all 0.4s;
}
.container {
  max-width: 1130px;
  width: 100%;
  height: 100vh;
  padding: 0 15px;
  margin: 0 auto;
  position: relative;
  // background-color: green;
}
.slideUp {
  animation-name: slidup;
  -webkit-animation-name: slidup;
  animation-duration: 1s;
  -webkit-animation-duration: 1s;
  visibility: visible !important;
  position: absolute;
}
.user {
  &__list-flex {
    display: flex;
    flex-direction: column;
    width: 100%;
    transition: all 0.5s;
  }
  &__flex-pages {
    display: flex;
    justify-content: center;
    color: white;
    li {
      margin-left: 20px;
      cursor: pointer;
      transition: 0.5s;
      &:hover {
        color: #2ecc71;
      }
    }
  }
  &__flex-menu {
    display: flex;
    justify-content: space-between;
  }
  &__list {
    flex: 0 1 600px;
    margin-top: 67px;
    padding-top: 20px;
    transition: all 0.5s;
    height: 500px;
    overflow: auto;
    opacity: 0;
    visibility: hidden;
    background-color: rgba(52, 93, 125, 0.4);
    .user__block {
      width: 80%;
      height: 150px;
      margin: 0 auto;
      background-color: rgba(255, 255, 255, 1);
      margin-top: 50px;
    }
  }
  &__add-menu {
    flex: 0 1 475px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    transition: 0.5s;
    opacity: 0;
    visibility: hidden;
    height: 500px;
    background-color: rgba(52, 93, 125, 0.4);
    margin-top: 66px;
    color: rgba(255, 255, 255, 0.8);
    input {
      min-width: 300px;
      padding: 10px 10px;
    }
    .user__label {
      font-size: 25px;
    }
    .user__t-number {
      margin-top: 15px;
    }
    .user__phone {
      margin-top: 15px;
      margin-bottom: 30px;
    }
    .user__name {
      margin-top: 15px;
      display: flex;
      text-align: center;
      flex-direction: column;
      align-items: flex-start;
      .user__label {
        align-self: center;
      }
      input {
        margin-top: 15px;
        &::placeholder {
          text-align: center;
        }
      }
    }
  }
  &__header {
    background-color: rgba(52, 93, 125, 0.4);
    padding: 10px 10px;
    padding-left: 40px;
    position: relative;
    ul {
      display: flex;
      align-items: center;
      :last-child {
        margin-left: 110px;
      }
      li {
        margin: 20px;
        margin-left: 160px;
        font-family: "Montserrat", sans-serif;
        color: rgba(255, 255, 255, 0.5);
        cursor: pointer;
        transition: 0.5s;
        &:hover {
          color: rgba(255, 255, 255, 1);
          transform: scale(1.1);
        }
      }
    }
    display: flex;
    .user__headet-info {
      opacity: 0.8;
      padding-left: 30px;
      padding-top: 12px;
      padding-right: 20px;
    }
    .user__info-cluster {
      display: flex;
      align-items: center;
      text-transform: uppercase;
      font-family: "Montserrat", sans-serif;
      font-size: 20px;
      color: white;
      border-right: 1px solid rgba(255, 255, 255, 0.5);
    }
    top: 41px;

    img {
      width: 50px;
      height: 50px;
    }
  }
  // &__hide-block {
  //   max-width: 364px;
  //   height: 154px;
  //   margin-left: 36.078%;
  //   margin-top: -93px;
  // }
  &__text {
    font-family: Roboto;
    font-size: 50px;
    color: white;
    display: flex;
    justify-content: center;
    .user__start {
    }
  }
  .font-test {
    font-size: 50px;
    font-family: Roboto;
    color: white;
  }
  .anim-hand-wrapp {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .anim-hand {
    position: relative;
    img {
      width: 550px;
      height: 550px;
    }
    .current-out {
      // position: absolute;
      // margin-left: 270px;
      // margin-right: 652px;
      -webkit-animation: slidown 2s linear;
      animation: slidown 2s linear;
    }
    .current-img {
      position: absolute;
      // margin: auto;
      // margin-left: 270px;
      // margin-right: 250px;
      -webkit-animation: slidown 2s linear;
      animation: slidown 2s linear;
      // transform: translate(-50%);
    }
    .fake-img {
      // position: absolute;
      // margin-left: 270px;
      // margin-right: 652px;
      display: none;
      // -webkit-animation: slidown 3s linear;
      // animation: slidown 3s linear;
      // transform: translate(-50%);
    }
  }
}
.user__body {
  opacity: 1;
  visibility: visible;
  transition: 0.5s;
}
// .preloader-wrapper{
//   position: relative;
//   max-width: 300px;
// }

#preloader {
  transition: all 0.4s;
  .user__temp-img {
    position: absolute;
    top: 67%;
    left: 48.6%;
    width: 70px;
    height: 70px;
  }
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
#loader {
  display: block;
  position: relative;
  left: 50%;
  top: 70%;
  width: 150px;
  height: 150px;
  margin: -75px 0 0 -75px;
  border-radius: 50%;
  border: 3px solid transparent;
  border-top-color: #9370db;
  -webkit-animation: spin 2s linear infinite;
  animation: spin 2s linear infinite;
}
#loader:before {
  content: "";
  position: absolute;
  top: 5px;
  left: 5px;
  right: 5px;
  bottom: 5px;
  border-radius: 50%;
  border: 3px solid transparent;
  border-top-color: #ba55d3;
  -webkit-animation: spin 3s linear infinite;
  animation: spin 3s linear infinite;
}
#loader:after {
  content: "";
  position: absolute;
  top: 15px;
  left: 15px;
  right: 15px;
  bottom: 15px;
  border-radius: 50%;
  border: 3px solid transparent;
  border-top-color: #ff00ff;
  -webkit-animation: spin 1.5s linear infinite;
  animation: spin 1.5s linear infinite;
}
@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes slidown {
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(0%);
  }
}
@keyframes slidup {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20%);
  }
  100% {
    transform: translateY(-100%);
  }
}
@media (max-width: 1024px) {
  .user__temp-img {
    left: 47.6%;
  }
}
</style>
