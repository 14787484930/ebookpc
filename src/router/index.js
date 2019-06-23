import Vue from 'vue'
import Router from 'vue-router'

import books from "../components/book/book.vue"
import electronics from "../components/electronics/electronics.vue"
import tutorings from "../components/tutoring/tutoring.vue"
import others from "../components/other/others.vue"
import productwarnings from "../components/productwarning/productwarnings.vue"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:"/books",
      component:books
    },
    {
      path:"/electronics",
      component:electronics
    },
    {
      path:"/tutorings",
      component:tutorings
    },
    {
      path:"/others",
      component:others
    },
    {
      path:"/productwarnings",
      component:productwarnings
    },
  ]
})
