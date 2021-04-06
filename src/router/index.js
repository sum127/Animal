import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
//import ReviewMain from '../views/ReviewMain.vue'
Vue.use(VueRouter)

const routes = [
  // 삭제전 본인인증
  {
    path: '/beforedelete/:id/:nickname',
    name: 'beforedelete',
    component: () => import('../views/BeforeDelete.vue')
  },
  // 수정전
  {
    path: '/beforepatch/:id',
    name: 'beforepatch',
    component: () => import('@/views/BeforePatch.vue')
  },
  // 닉네임 입력으로 조회
  {
    path: '/findbytitle/:title',
    name: 'findbytitle',
    component: () => import('../views/FindByTitle.vue')
  },
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/hospital',
    name: 'hospital',
    component: () => import('../views/Hospital.vue')
  },
  // 수정페이지지
  {
    path: '/patch/:id',
    name: 'patch',
    component: () => import('@/views/Patch.vue')
  },
  // 상세화면 조회
  {
    path: '/reviewdetail/:id',
    name: 'reviewdetail',
    component: () => import('../views/ReviewDetail.vue')
  },
  // 메인화면
  {
    path: '/reviewmain',
    name: 'reviewmain',
    component: () => import('../views/ReviewMain.vue')
  },
  {
    path: '/selectpic',
    name: 'selectpic',
    component: () => import('../views/SelectPic.vue')
  },
  // 개인정보, 글 생성
  {
    path: '/writeform',
    name: 'writeform',
    component: () => import('../views/WriteForm.vue')
  },






]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
