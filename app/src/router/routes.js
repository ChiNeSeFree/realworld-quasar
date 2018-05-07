import store from '../store/index'

import RwvHome from '../pages/Home'
import RwvHomeGlobal from '../pages/HomeGlobal'
import RwvRegister from '../pages/Register'
import RwvProfile from '../pages/Profile'
import RwvProfileArticles from '../pages/ProfileArticles'
import RwvProfileFavorited from '../pages/ProfileFavorited'
import RwvSettings from '../pages/Settings'
import RwvArticle from '../pages/Article'
import RwvArticleEdit from '../pages/ArticleEdit'
import RwvHomeTag from '../pages/HomeTag'
import RwvHomeMyFeed from '../pages/HomeMyFeed'
import RwvLogin from '../pages/Login'

export default [
  {
    path: '/',
    component: () => import('layouts/default'),
    children: [
      { path: '', component: RwvHome, name: 'home' },
      { path: 'register', component: RwvRegister, name: 'register' },
      { path: 'login', component: RwvLogin, name: 'login' },
      { path: 'settings', component: RwvSettings, name: 'settings' },
      { path: 'profile', component: RwvProfileArticles, name: 'profile' },
      { path: 'profile-favorites', component: RwvProfileFavorited, name: 'favorites' },
      { path: 'tag/:tag', component: RwvHome, name: 'home-tag' },
      { path: '/articles/:slug', component: RwvArticle, name: 'article', props: true },
      { path: '/editor/:slug', component: RwvArticleEdit, name: 'article-edit', props: true },
    ]
  },
  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]
