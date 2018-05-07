<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header>
      <q-toolbar
        color="white"
        text-color="primary"
        :inverted="$q.theme === 'ios'"
      >
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
        >
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title class="navbar-brand clearfix">
          conduit
          <!-- <div slot="subtitle">Running on Quasar v{{ $q.version }}</div> -->
        </q-toolbar-title>
        <q-btn flat class="gt-sm mobile-hide">
          Sign up
        </q-btn>
        <q-btn flat class="gt-sm mobile-hide">
          Sign in
        </q-btn>
        <q-btn flat class="gt-sm mobile-hide">
          Home
        </q-btn>
      </q-toolbar>
    </q-layout-header>

    <q-layout-drawer
      v-model="leftDrawerOpen"
      :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null"
    >
      <q-list
        no-border
        link
        inset-delimiter
      >
        <q-list-header>Essential Links</q-list-header>
        <q-item @click.native="openURL('http://quasar-framework.org')">
          <q-item-side icon="school" />
          <q-item-main label="Docs" sublabel="quasar-framework.org" />
        </q-item>
        <q-item @click.native="openURL('https://github.com/quasarframework/')">
          <q-item-side icon="code" />
          <q-item-main label="GitHub" sublabel="github.com/quasarframework" />
        </q-item>
        <q-item @click.native="openURL('https://discord.gg/5TDhbDg')">
          <q-item-side icon="chat" />
          <q-item-main label="Discord Chat Channel" sublabel="https://discord.gg/5TDhbDg" />
        </q-item>
        <q-item @click.native="openURL('http://forum.quasar-framework.org')">
          <q-item-side icon="record_voice_over" />
          <q-item-main label="Forum" sublabel="forum.quasar-framework.org" />
        </q-item>
        <q-item @click.native="openURL('https://twitter.com/quasarframework')">
          <q-item-side icon="rss feed" />
          <q-item-main label="Twitter" sublabel="@quasarframework" />
        </q-item>
      </q-list>
    </q-layout-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'

export default {
  name: 'LayoutDefault',
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop
    }
  },
  methods: {
    openURL
  }
}
</script>

<style lang="stylus">
  @import '~variables'
  @import url('https://fonts.googleapis.com/css?family=Titillium+Web:700|Source+Serif+Pro:400,700|Merriweather+Sans:400,700|Source+Sans+Pro:400,300,600,700,300italic,400italic,600italic,700italic');
  .clearfix:before,
  .clearfix:after {
    content: "";
    display: table;
  }

  .clearfix:after {
    clear: both;
  }

  .clearfix {
    zoom: 1; /* ie 6/7 */
  }
  .right {
    float: right;
  }
  html
    color: #373a3c
  body
    font-family: "Source Sans Pro", sans-serif;
    font-size: 1rem;
    line-height: 1.5;
    color: #373a3c;
    background-color: #fff;
  .navbar-brand
    font-family: "Titillium Web", sans-serif;
    font-size: 1.75rem;
    font-weight: 600;
    line-height: 50px;
    letter-spacing: -1px;
    height: 3.5rem;
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  main,
  menu,
  nav,
  section,
  summary
    display: block
  a
    color: $primary;
    text-decoration: none;
    h1 {
      color: #373a3c;
    }

  h1, h2, h3, h4, h5, h6, .h1, .h2, .h3, .h4, .h5, .h6
    margin-bottom: 0.5rem
    font-family: inherit
    font-weight: 500
    line-height: 1.1
    color: inherit
  .pull-xs-right
    float: right !important;
  .btn-outline-primary
    color: #5CB85C;
    background-image: none;
    background-color: transparent;
    border-color: #5CB85C;

  .btn-sm, .btn-group-sm > .btn
    padding: 0.25rem 0.5rem;
    font-size: 0.875rem;
    border-radius: 0.2rem;

  .btn
    display: inline-block;
    font-weight: normal;
    line-height: 1.25;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    cursor: pointer;
    user-select: none;
    border: 1px solid transparent;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    border-radius: 0.25rem;
  .page-link
    position: relative;
    float: left;
    padding: 0.5rem 0.75rem;
    margin-left: -1px;
    color: #5CB85C;
    text-decoration: none;
    background-color: #fff;
    border: 1px solid #ddd;
  .page-item:first-child .page-link
    margin-left: 0;
    border-bottom-left-radius: 0.25rem;
    border-top-left-radius: 0.25rem;
  .page-item.active .page-link, .page-item.active .page-link:focus, .page-item.active .page-link:hover
    z-index: 2;
    color: #fff;
    cursor: default;
    background-color: #5CB85C;
    border-color: #5CB85C;
  .page-item:last-child .page-link
    border-bottom-right-radius: 0.25rem;
    border-top-right-radius: 0.25rem;


</style>
