import Vue from 'vue'
import Router from 'vue-router'

//Users
import UserIndex from '@/components/Users/Index'

// Authen
import Login from '@/components/Login'

// Comments
import CommentIndex from '@/components/Comments/Index'

// Blogs
import BlogIndex from '@/components/Blogs/Index'
import BlogCreate from '@/components/Blogs/CreateBlog'
import BlogEdit from '@/components/Blogs/EditBlog'
import BlogShow from '@/components/Blogs/ShowBlog'
import BackStatus from '@/components/Blogs/BackStatus'

// Upload Testing
import Upload from '@/components/Utils/Upload'

// Front
import FrontIndex from '@/components/Fronts/Index'
import FrontTreasury from '@/components/Fronts/Treasury'
import FrontShow from '@/components/Fronts/ShowBlog'

// Reserve
import ReserveCreate from '@/components/Fronts/Reserve'
import ReserveStatus from '@/components/Fronts/Status'
import ReserveProfile from '@/components/Fronts/Profile'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/Users',
      name: 'users',
      component: UserIndex
    },
    //authen
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    // blogs
    {
      path: '/blogs',
      name: 'blogs',
      component: BlogIndex
    },
    {
      path: '/blog/create',
      name: 'blogs-create',
      component: BlogCreate
    },
    {
      path: '/blog/edit/:blogId',
      name: 'blog-edit',
      component: BlogEdit
    },
    {
      path: '/blog/:blogId',
      name: 'blog',
      component: BlogShow
    },
    {
      path: '/back/status',
      name: 'back-status',
      component: BackStatus
    },
    // comments
    {
      path: '/comments',
      name: 'comments',
      component: CommentIndex
    },
    // upload testing
    {
      path: '/upload',
      name: 'upload',
      component: Upload
    },
    // front
    {
      path: '/front',
      name: 'front',
      component: FrontIndex
    },
    {
      path: '/front/read/:blogId',
      name: 'front-read',
      component: FrontShow
    },
    {
      path: '/treasury',
      name: 'treasury',
      component: FrontTreasury
    },
    {
      path: '/reserve/create',
      name: 'reserve-create',
      component: ReserveCreate
    },
    {
      path: '/reserve/status',
      name: 'reserve-status',
      component: ReserveStatus
    },
    {
      path: '/reserve/profile/:userId',
      name: 'reserve-profile',
      component: ReserveProfile
    },
  ]
})
