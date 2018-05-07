<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your <i>Quasar</i> knowledge.</p>
      </div>
    </div>
    <q-page class="flex">
      <div class="col-sm-12 col-md-9">
        <q-tabs
          color="white"
          text-color="tertiary"
          no-pane-border
          align="left"
          >
          <!-- Tabs - notice slot="title" -->
          <q-tab v-if="isAuth" slot="title" name="tab-1" label="Your feed"/>
          <q-tab default slot="title" name="tab-2" label="Global feed"/>

          <!-- Targets -->
          <q-tab-pane name="tab-1">
            <div class="home-my-feed">
              <RwvArticleList type="feed" />
            </div>
          </q-tab-pane>
          <q-tab-pane name="tab-2">
            <div class="home-global">
              <RwvArticleList type="all" />
            </div>
          </q-tab-pane>
        </q-tabs>
      </div>
      <div class="col-sm-12 col-md-3">
        <div class="sidebar">
          <p>Popular Tags</p>
          <div class="tag-list">
            <RwvTag
              v-for="(tag, index) in tags"
              :name="tag"
              :key="index">
            </RwvTag>
          </div>
        </div>
      </div>
    </q-page>
  </div>
</template>

<style lang="stylus">
@import '~variables'
.home-page
  .sidebar
    padding: 5px 10px 10px 10px;
    background: #f3f3f3;
    border-radius: 4px;
    margin: 8px 20px;
  .banner
    background: $primary;
    color: white;
    text-align: center;
    padding: 2rem 0;
    box-shadow: inset 0 8px 8px -8px rgba(0, 0, 0, 0.3), inset 0 -8px 8px -8px rgba(0, 0, 0, 0.3);
    h1
      font-family: "Titillium Web", sans-serif;
      margin: 0;
      padding: 0;
      text-shadow: 0px 1px 3px rgba(0, 0, 0, 0.3);
      font-weight: 700;
      font-size: 4rem;
      padding-bottom: 0.5rem;
    p
      font-size: 2rem;
.q-tabs
  .q-tabs-panes
    margin-top: -1px;
    z-index: 2;
    .q-tab-pane
      padding: 0 12px 12px 12px;
.q-tab.active
  color: $primary
  z-index: 3;
.conduit-tags
  margin: 10px;
  padding: 10px;
  p.heading
    font-weight: 400;
    font-size: 1rem;
</style>

<script>

import { mapGetters, mapState } from 'vuex'
import RwvTag from '../components/VTag.vue'
import { IS_AUTHENTICATED } from '../store/getters.type'
import { FETCH_TAGS } from '../store/actions.type'
import RwvArticleList from '../components/ArticleList'

export default {
  name: 'PageIndex',
  namespaced: true,
  components: {
    RwvTag,
    RwvArticleList
  },
  mounted () {
    this.$store.dispatch(FETCH_TAGS)
  },
  computed: {
    ...mapGetters({
      isAuth: [IS_AUTHENTICATED]
    }),
    ...mapState({
      tags: state => state.home.tags
    }),
    tag () {
      return this.$route.params.tag
    }
  }
}
</script>
