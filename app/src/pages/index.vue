<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your <i>Quasar</i> knowledge.</p>
      </div>
    </div>
    <q-page class="flex flex-center">

    </q-page>
  </div>
</template>

<style lang="stylus">
@import '~variables'
.home-page .banner
    background: $primary;
    color: white;
    text-align: center;
    padding: 2rem 0;
    box-shadow: inset 0 8px 8px -8px rgba(0, 0, 0, 0.3), inset 0 -8px 8px -8px rgba(0, 0, 0, 0.3);
.home-page .banner
  h1
    margin: 0;
    padding: 0;
    text-shadow: 0px 1px 3px rgba(0, 0, 0, 0.3);
    font-weight: 700;
    font-size: 4rem;
    padding-bottom: 0.5rem;
  p
    font-size: 2rem;
</style>

<script>
export default {
  name: 'PageIndex'
}
</script>
