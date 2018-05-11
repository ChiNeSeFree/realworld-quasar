<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <RwvListErrors :errors="errors"/>
            <fieldset :disabled="submit">
              <q-field
              class="form-group"
              :error="$v.article.title.$error"
              error-label="Please enter a title"
              >
                <q-input
                  type="text"
                  class="form-control form-control-lg"
                  v-model="article.title"
                  placeholder="Article Title">
                </q-input>
              </q-field>



              <q-field
              class="form-group"
              :error="$v.article.description.$error"
              error-label="Please enter a description"
              >
                <q-input
                  type="text"
                  class="form-control"
                  v-model="article.description"
                  placeholder="What's this article about?">
                </q-input>
              </q-field>



              <q-field
              class="form-group"
              :error="$v.article.body.$error"
              error-label="Please enter the article body"
              >
                <q-input
                  type="textarea"
                  class="form-control"
                  rows="8"
                  v-model="article.body"
                  placeholder="Write your article (in markdown)">
                </q-input>
              </q-field>



              <q-field
              class="form-group"
              >
                <q-input
                  type="text"
                  class="form-control"
                  placeholder="Enter tags"
                  v-model="tagInput"
                  v-on:keypress.enter.prevent="addTag(tagInput)">
                </q-input>
                <div class="tag-list">
                  <span
                    class="tag-default tag-pill"
                    v-for="(tag, index) of article.tagList"
                    :key="tag + index">
                  <i
                    class="ion-close-round"
                    v-on:click="removeTag(tag)">
                </i>
                {{ tag }}
              </span>
                </div>
              </q-field>



            </fieldset>
            <q-btn
              color="primary"
              class="right"
              max-height="100"
              rows="1"
              label="Publish Article"
              @click="onPublish()"
              >

            </q-btn>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import store from '../store'
  import RwvListErrors from '../components/ListErrors'
  import {
    ARTICLE_PUBLISH,
    ARTICLE_EDIT,
    FETCH_ARTICLE,
    ARTICLE_EDIT_ADD_TAG,
    ARTICLE_EDIT_REMOVE_TAG,
    ARTICLE_RESET_STATE
  } from '../store/actions.type'
  import {
    GET_ARTICLE
  } from '../store/getters.type'
  import { required } from 'vuelidate/lib/validators'

  export default {
    name: 'RwvArticleEdit',
    components: { RwvListErrors },
    props: {
      previousArticle: {
        type: Object,
        required: false
      }
    },
    async beforeRouteUpdate (to, from, next) {
      // Reset state if user goes from /editor/:id to /editor
      // The component is not recreated so we use to hook to reset the state.
      await store.dispatch(ARTICLE_RESET_STATE)
      return next()
    },
    async beforeRouteEnter (to, from, next) {
      // SO: https://github.com/vuejs/vue-router/issues/1034
      // If we arrive directly to this url, we need to fetch the article
      await store.dispatch(ARTICLE_RESET_STATE)
      if (to.params.slug !== undefined) {
        await store.dispatch(FETCH_ARTICLE,
          to.params.slug,
          to.params.previousArticle
        )
      }
      return next()
    },
    async beforeRouteLeave (to, from, next) {
      await store.dispatch(ARTICLE_RESET_STATE)
      next()
    },
    data () {
      return {
        tagInput: null,
        submit: false,
        errors: {},
        error: false
      }
    },
    computed: {
      ...mapGetters({
        article: [GET_ARTICLE]
      })
    },
    validations: {
      article: {
        title: { required },
        description: { required },
        body: { required }
      }
    },
    methods: {
      onPublish (slug, article) {

        this.$v.article.$touch()

        if (this.$v.article.$error || this.$v.article.$invalid) {
          return false
        }
        console.log('slug')
        console.log(slug)
        let action = slug ? ARTICLE_EDIT : ARTICLE_PUBLISH
        console.log('action');
        console.log(action);
        this.submit = true
        this.$store
          .dispatch(action)
          .then(({ data }) => {
            console.log('data');
            console.log(data);
            this.submit = false
            this.$router.push({
              name: 'article',
              params: { slug: data.article.slug }
            })
          })
          .catch(({ response }) => {
            console.log('response');
            console.log(response);
            this.submit = false
            this.errors = response.data.errors
          })
      },
      removeTag (tag) {
        this.$store.dispatch(ARTICLE_EDIT_REMOVE_TAG, tag)
      },
      addTag (tag) {
        this.$store.dispatch(ARTICLE_EDIT_ADD_TAG, tag)
        this.tagInput = null
      }
    }
  }
</script>
