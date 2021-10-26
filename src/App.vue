<template>
  <div id="app">
    <div class="container">
      <List />
    </div>
  </div>
</template>

<script>
import List from "./components/List";

export default {
  name: "App",

  components: { List },
};
</script>

<style lang="scss">
*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  font-family: Arial, Helvetica, sans-serif;
  margin: 0;
  background-color: #f7f8fa;
  overflow: hidden;
}

.container {
  max-width: 680px;
  width: 100%;
  margin: 0 auto;
  padding: 0 15px;
}
</style>
