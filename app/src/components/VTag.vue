<template>
  <router-link :to="{ name: 'home-tag', params: { tag: name } }" :class="className">
    {{ name }}
  </router-link>
</template>
<style lang="stylus">
@import '~variables'
.tag-default
  background-color: #818a91;
  color: #fff;
  font-size: 0.8rem;
  padding-top: 0.1rem;
  padding-bottom: 0.1rem;
  white-space: nowrap;
  margin-right: 3px;
  margin-bottom: 0.2rem;
  display: inline-block;
.tag-outline
  border: 1px solid #ddd;
  color: #aaa !important;
  background-color: #fff;
.tag-pill
  padding-right: 0.6em;
  padding-left: 0.6em;
  border-radius: 10rem;
  border-top-left-radius: 10rem;
  border-top-right-radius: 10rem;
  border-bottom-right-radius: 10rem;
  border-bottom-left-radius: 10rem;
ul
  li
    display: inline-block !important;
  .tag-list
    padding-left: 0px !important;
    display: inline-block;
    list-style: none !important;


</style>
<script>
  export default {
    name: 'RwvTag',
    props: {
      name: {
        type: String,
        required: true
      },
      className: {
        type: String,
        default: 'tag-pill tag-default'
      }
    }
  }
</script>
