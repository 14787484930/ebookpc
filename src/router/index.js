import Vue from 'vue'
import Router from 'vue-router'

import books from "../components/book/book.vue"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:"/books",
      component:books
    }
  ]
})
