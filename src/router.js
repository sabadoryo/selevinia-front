import Vue from 'vue';
import VueRouter from 'vue-router';
import store from './store';
Vue.use(VueRouter);

import Main from './components/main/Main.vue'
import CategoryComponent from './components/category/Category.vue'
import EditCategoryComponent from './components/category/EditCategory.vue'
import LoginComponent from './components/Login/Login.vue'
import PostsComponent from './components/posts/Posts.vue'
import EditPostComponent from './components/posts/EditPost.vue'
import CreatePostComponent from './components/posts/CreatePost.vue'
import ArchivesComponent from './components/archives/Archives.vue'
import EditArchiveComponent from './components/archives/EditArchive.vue'
import CreateArchiveComponent from './components/archives/CreateArchive.vue'
import PublicationsComponent from './components/publications/Publications.vue'
import EditPublicationComponent from './components/publications/EditPublication.vue'
import CreatePublicationComponent from './components/publications/CreatePublication.vue'
import AuthorsComponent from './components/authors/Authors.vue'
import EditAuthorsComponent from './components/authors/EditAuthor.vue'
import CreateAuthorComponent from './components/authors/CreateAuthor.vue'
import ImportAuthorsComponent from './components/authors/ImportAuthors.vue'
import SubscriptionComponent from './components/subscription/Subscriptions.vue'
import PagesComponent from './components/pages/Pages.vue'
import SubmitMailingComponent from './components/subscription/SubmitMailing.vue'

const routes = [
  { path: '/', component: Main, meta: {requiresAuth:true}},
  { path: '/categories', component: CategoryComponent, meta: {requiresAuth:true}},
  { path: '/categories/:id', component: EditCategoryComponent, meta: {requiresAuth:true}},
  { path: '/posts', component: PostsComponent, meta: {requiresAuth:true}},
  { path: '/posts/new/post', component: CreatePostComponent, meta: {requiresAuth:true}},
  { path: '/posts/:id', component: EditPostComponent, meta: {requiresAuth:true}},
  { path: '/archives', component: ArchivesComponent, meta: {requiresAuth:true}},
  { path: '/archives/:id', component: EditArchiveComponent, meta: {requiresAuth:true}},
  { path: '/archives/new/archive', component: CreateArchiveComponent, meta: {requiresAuth:true}},
  { path: '/publications', component: PublicationsComponent, meta: {requiresAuth:true}},
  { path: '/publications/:id', component: EditPublicationComponent, meta: {requiresAuth:true}},
  { path: '/publications/new/publication', component: CreatePublicationComponent, meta: {requiresAuth:true}},
  { path: '/authors', component: AuthorsComponent, meta: {requiresAuth:true}},
  { path: '/authors/:id', component: EditAuthorsComponent, meta: {requiresAuth:true}},
  { path: '/authors/new/author', component: CreateAuthorComponent, meta: {requiresAuth:true}},
  { path: '/authors/new/authors-excel', component: ImportAuthorsComponent, meta: {requiresAuth:true}},
  { path: '/subscriptions', component: SubscriptionComponent, meta: {requiresAuth:true}},
  { path: '/subscriptions/submit-mailing', component: SubmitMailingComponent, meta: {requiresAuth:true}, name: 'submit-mailing'},
  { path: '/pages', component: PagesComponent, meta: {requiresAuth:true}},
  { path : '/login', component: LoginComponent, meta: {redirectIfAuth:true}}
]

const router = new VueRouter({
  mode: 'history',
  routes,
  linkExactActiveClass: 'active',
})

router.beforeEach((to, from ,next) => {
  if (to.meta.requiresAuth) {
    if (!localStorage.getItem('jwt')) {
      next('/login')
    } else {
      store.commit('setAuth', true)
      next()
    }
  } else {
    if (to.meta.redirectIfAuth) {
      if (localStorage.getItem('jwt')){
        store.commit('setAuth', true)
        next('/')
      } else {
        next()
      }
    }
  }
})

export default router;