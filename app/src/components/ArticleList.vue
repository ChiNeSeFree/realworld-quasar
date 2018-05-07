<template>
  <div>
    <div v-if="isLoading" class="article-preview">
      Loading articles...
    </div>
    <div v-else>
      <div v-if="articles.length === 0" class="article-preview">
        No articles are here... yet.
      </div>
      <rwv-article-preview
        v-for="(article, index) in articles"
        :article="article"
        :key="article.title + index">
      </rwv-article-preview>
      <v-pagination
        :pages="pages"
        :currentPage.sync="currentPage"
      ></v-pagination>
    </div>
  </div>
</template>
<style lang="stylus">
@import '~variables'
.article-preview
  padding: 1.5rem 0
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  ol, ul, dl
    margin-top: 0;
    margin-bottom: 1rem;

  .preview-link
    p
      font-weight: 300;
      font-size: 24px;
      color: #999;
      margin-bottom: 15px;
      font-size: 1rem;
      line-height: 1.3rem;
    span
      max-width: 30%;
      font-size: 0.8rem;
      font-weight: 300;
      color: #bbb;
      vertical-align: middle;
    ul
      float: right;
      max-width: 50%;
      vertical-align: top;
      li
        font-weight: 300;
        font-size: 0.8rem !important;
        padding-top: 0px !important;
        padding-bottom: 0px !important;
    h1
      font-weight: 600 !important;
      font-size: 1.5rem !important;
      margin-bottom: 3px;
  .article-meta
    margin: 0 0 1rem 0
    .info
      margin: 0 1.5rem 0 0.3rem
      display: inline-block
      vertical-align: middle
      line-height: 1rem
</style>
<script>
  import { mapGetters } from 'vuex'
  import RwvTag from '../components/VTag'
  import RwvArticlePreview from '../components/VArticlePreview'
  import VPagination from '../components/VPagination'
  import { FETCH_ARTICLES } from '../store/actions.type'
  import { GET_ARTICLE_COUNT, GET_ARTICLES, GET_ARTICLES_IS_LOADING, IS_AUTHENTICATED } from '../store/getters.type'

  export default {
    name: 'rwv-article-list',
    components: {
      RwvTag,
      RwvArticlePreview,
      VPagination
    },
    props: {
      type: {
        type: String,
        required: false,
        default: 'all'
      },
      author: {
        type: String,
        required: false
      },
      tag: {
        type: String,
        required: false
      },
      favorited: {
        type: String,
        required: false
      },
      itemsPerPage: {
        type: Number,
        required: false,
        default: 10
      }
    },
    data () {
      return {
        currentPage: 1
      }
    },
    computed: {
      listConfig () {
        const { type } = this
        const filters = {
          offset: (this.currentPage - 1) * this.itemsPerPage,
          limit: this.itemsPerPage
        }
        if (this.author) {
          filters.author = this.author
        }
        if (this.tag) {
          filters.tag = this.tag
        }
        if (this.favorited) {
          filters.favorited = this.favorited
        }
        return {
          type,
          filters
        }
      },
      pages () {
        if (this.isLoading || this.articlesCount <= this.itemsPerPage) {
          return []
        }
        return [...Array(Math.ceil(this.articlesCount / this.itemsPerPage)).keys()].map(e => e + 1)
      },
      ...mapGetters({
        articlesCount: [GET_ARTICLE_COUNT],
        isLoading: [GET_ARTICLES_IS_LOADING],
        isAuth: [IS_AUTHENTICATED],
        articles: [GET_ARTICLES]
      })
    },
    watch: {
      currentPage (newValue) {
        this.listConfig.filters.offset = (newValue - 1) * this.itemsPerPage
        this.fetchArticles()
      },
      type () {
        this.resetPagination()
        this.fetchArticles()
      },
      author () {
        this.resetPagination()
        this.fetchArticles()
      },
      tag () {
        this.resetPagination()
        this.fetchArticles()
      },
      favorited () {
        this.resetPagination()
        this.fetchArticles()
      }
    },
    mounted () {
      this.fetchArticles()
    },
    methods: {
      fetchArticles () {
        this.$store.dispatch(FETCH_ARTICLES, this.listConfig)
      },
      resetPagination () {
        this.listConfig.offset = 0
        this.currentPage = 1
      }
    }
  }
</script>
