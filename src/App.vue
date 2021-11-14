<template>
  <div id="app">
    <UserAction />
  </div>
</template>

<script>
import UserAction from './components/UserAction.vue'

export default {
  name: 'App',
  components: {
    UserAction
  }
}
</script>

<style lang="scss">
@import "./style/core.scss";
#app{
}
</style>
