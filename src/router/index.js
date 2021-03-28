import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
//import ReviewMain from '../views/ReviewMain.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  // 메인화면
  {
    path: '/reviewmain',
    name: 'reviewmain',
    component: () => import('../views/ReviewMain.vue')
  },
  // 개인정보, 글 생성
  {
    path: '/writeform',
    name: 'writeform',
    component: () => import('../components/WriteForm.vue')
  },
  // 삭제전 본인인증
  {
    path: '/beforedelete/:id/:nickname',
    name: 'beforedelete',
    component: () => import('../components/BeforeDelete.vue')
  },
  // 상세화면 조회
  {
    path: '/reviewdetail/:id',
    name: 'reviewdetail',
    component: () => import('../components/ReviewDetail.vue')
  },
  // 닉네임 입력으로 조회
  {
    path: '/findbytitle/:title',
    name: 'findbytitle',
    component: () => import('../components/FindByTitle.vue')
  }

]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
