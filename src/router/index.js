import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import ExcelDemo from '@/components/ExcelDemo'
import ExcelDemo2 from '@/components/ExcelDemo2'
import Word from '@/components/Word'
import PDF from '@/components/PDF'
import TablePage from '@/components/TablePage'
import FilterPage from '@/components/FilterPage'

import FilterBox from '@/components/FilterBox'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/excel',
      name: 'ExcelDemo',
      component: ExcelDemo
    },
    {
      path: '/excel2',
      name: 'ExcelDemo2',
      component: ExcelDemo2
    },
    {
      path: '/word',
      name: 'Word',
      component: Word
    },
    {
      path: '/pdf',
      name: 'PDF',
      component: PDF
    },
    {
      path: '/tablepage',
      name: 'TablePage',
      component: TablePage
    },
    {
      path: '/filterpage',
      name: 'FilterPage',
      component: FilterPage
    },
    {
      path: '/filterbox',
      name: 'FilterBox',
      component: FilterBox
    }
  ]
})
