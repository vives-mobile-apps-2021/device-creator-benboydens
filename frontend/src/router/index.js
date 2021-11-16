import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import CreateDeviceView from '@/views/CreateDeviceView.vue'
import DeviceListView from '@/views/DeviceListView.vue'
import DeviceView from '@/views/DeviceView.vue'
import QRScanView from '@/views/QRScanView.vue'
import MapView from '@/views/MapView.vue'

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
    path: '/map',
    name: 'Map',
    component: MapView
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
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
