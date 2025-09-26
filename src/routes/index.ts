import { createMemoryHistory, createRouter } from 'vue-router'


// 由于找不到模块，可能需要检查文件路径是否正确。假设文件路径有误，这里可根据实际情况确认是否存在该文件，若文件存在于其他路径，需修正路径。以下假设文件在同一目录下作为示例，实际请根据项目结构调整。
import HomeView from '@/views/index/index.vue'
import StudyView from '@/views/study/index.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/study', component: StudyView },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router