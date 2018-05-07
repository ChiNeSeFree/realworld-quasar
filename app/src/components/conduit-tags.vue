<template>
  <div class="tag-panel conduit-tags">
    <p class="heading">Popular tags</p>
    <a class="tag-pill tag-default">stuff</a>
    <a class="tag-pill tag-default">dragons</a>
    <a class="tag-pill tag-default">poetry</a>
    <a class="tag-pill tag-default">violence</a>
  </div>
</template>

<style lang="stylus">
@import '~variables'
.tag-panel
  border-radius: 3px
  background-color: #f3f3f3
  border: 1px solid transparent
  .tag-pill
    padding-right: 0.6em;
    padding-left: 0.6em;
    border-radius: 10rem;
  .tag-default
    color: #fff ;
    font-size: 0.8rem;
    padding-top: 0.1rem;
    padding-bottom: 0.1rem;
    white-space: nowrap;
    margin-right: 3px;
    margin-bottom: 0.2rem;
    display: inline-block;
    background-color: #818a91
    // border-radius: 15px
    // padding: 0px 5px 2px 5px
    // font-weight: 600
    // line-height: 1rem
    // vertical-align: 50%
    // letter-spacing: -1px
    // font-size: 0.9rem
    // color: white
    // border: 1px solid transparent
</style>

<script>
export default {
  data() {
    return {
      }
    }
}
</script>
