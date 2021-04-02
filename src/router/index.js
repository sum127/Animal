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
    component: () => import('../views/WriteForm.vue')
  },
  // 수정전
  {
    path: '/test/:id',
    name: 'test',
    component: () => import('@/views/Test.vue')
  },
  // 수정페이지지
  {
    path: '/patch/:id',
    name: 'patch',
    component: () => import('@/views/Patch.vue')
  },
  // 삭제전 본인인증
  {
    path: '/beforedelete/:id/:nickname',
    name: 'beforedelete',
    component: () => import('../views/BeforeDelete.vue')
  },
  // 상세화면 조회
  {
    path: '/reviewdetail/:id',
    name: 'reviewdetail',
    component: () => import('../views/ReviewDetail.vue')
  },
  // 닉네임 입력으로 조회
  {
    path: '/findbytitle/:title',
    name: 'findbytitle',
    component: () => import('../views/FindByTitle.vue')
  }

]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
