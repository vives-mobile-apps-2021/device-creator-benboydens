import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import CreateDeviceView from '@/views/CreateDeviceView.vue'
import DeviceListView from '@/views/DeviceListView.vue'
import DeviceView from '@/views/DeviceView.vue'
import QRScanView from '@/views/QRScanView.vue'
import RegisterView from '@/views/RegisterView.vue'
import ProfileView from '@/views/UserView.vue'
import PageNotFound from "@/views/PageNotFound.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/scan',
    name: 'Scan',
    component: QRScanView
  },
  {
    path: '/devices',
    name: 'Devices',
    component: DeviceListView
  },
  {
    path: '/devices/create',
    name: 'Create',
    component: CreateDeviceView
  },
  {
    path: '/devices/:id',
    name: 'Device',
    component: DeviceView
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterView
  },
  {
    path: '/profile',
    name: 'Profile',
    component: ProfileView
  },
  {
    path: '*',
    name: "PageNotFound",
    component: PageNotFound
  }
]

const router = new VueRouter({
  routes
})

export default router
