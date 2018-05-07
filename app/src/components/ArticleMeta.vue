<template>
  <div class="article-meta">
    <a href=""><img :src="article.author.image"/></a>
    <div class="info">
      <router-link
        :to="{ name: 'profile', params: { 'username': article.author.username } }"
        class="author">
        {{ article.author.username }}
      </router-link>
      <span class="date">{{ article.createdAt | date }}</span>
    </div>
    <template v-if="actions">
      <rwv-article-actions
      :article="article"
      :canModify="isCurrentUser()"
      ></rwv-article-actions>
    </template>
    <template v-else>
      <q-btn
      outline
      size="md"
      class="pull-xs-right"
      v-if="!actions"
      v-on:click="toggleFavorite"
      icon="ion-heart"
      :class="{
        'btn-primary': article.favorited,
        'btn-outline-primary': !article.favorited
        }">
        <span class="counter">
          {{ article.favoritesCount }}
        </span>
      </q-btn>
    </template>
  </div>
</template>

<style lang="stylus">
  .article-meta
    display: block;
    position: relative;
    font-weight: 300;
    img
      display: inline-block;
      vertical-align: middle;
      height: 32px;
      width: 32px;
      border-radius: 30px;
    .q-btn-inner
      .q-icon
        font-size: 90%
        margin: 2px 2px 0 0;
    .info
      .author
        display: block;
        font-weight: 500 !important;

</style>

<script>
  import { mapGetters } from 'vuex'
  import RwvArticleActions from '../components/ArticleActions'
  import { FAVORITE_ADD, FAVORITE_REMOVE } from '../store/actions.type'
  import { GET_CURRENT_USER } from '../store/getters.type'

  export default {
    name: 'RwvArticleMeta',
    components: {
      RwvArticleActions
    },
    props: {
      article: {
        type: Object,
        required: true
      },
      actions: {
        type: Boolean,
        required: false,
        default: false
      }
    },
    computed: {
      ...mapGetters({
        user: [GET_CURRENT_USER]
      })
    },
    methods: {
      isCurrentUser () {
        if (this.user.username && this.article.author.username) {
          return this.user.username === this.article.author.username
        }
        return false
      },
      toggleFavorite () {
        const action = this.article.favorited
          ? FAVORITE_REMOVE
          : FAVORITE_ADD
        this.$store.dispatch(action, this.article.slug)
      }
    }
  }
</script>
