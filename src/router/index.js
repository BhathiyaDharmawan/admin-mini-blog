import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import AdminLayout from '@/layouts/AdminLayout.vue'
import DashboardView from '@/views/DashboardView.vue'
import CategoryList from '@/views/categories/CategoryList.vue'
import CategoryForm from '@/views/categories/CategoryForm.vue'
import ArticleList from '@/views/articles/ArticleList.vue'
import ArticleForm from '@/views/articles/ArticleForm.vue'
import UserList from '@/views/users/UserList.vue'
import UserForm from '@/views/users/UserForm.vue'
import { isAuthenticated } from '@/store/auth'


const routes = [
{ path: '/login', name: 'login', component: LoginView },
{
path: '/',
component: AdminLayout,
meta: { requiresAuth: true },
children: [
{ path: '', name: 'dashboard', component: DashboardView },
{ path: 'categories', name: 'categories', component: CategoryList },
{ path: 'categories/new', name: 'category-new', component: CategoryForm },
{ path: 'categories/:id', name: 'category-edit', component: CategoryForm, props: true },
{ path: 'articles', name: 'articles', component: ArticleList },
{ path: 'articles/new', name: 'article-new', component: ArticleForm },
{ path: 'articles/:id', name: 'article-edit', component: ArticleForm, props: true },
{ path: 'users', name: 'users', component: UserList },
{ path: 'users/new', name: 'user-new', component: UserForm },
{ path: 'users/:id', name: 'user-edit', component: UserForm, props: true },
]
},
]


const router = createRouter({ history: createWebHistory(), routes })


router.beforeEach((to, from, next) => {
if (to.meta.requiresAuth && !isAuthenticated()) {
next({ name: 'login' })
} else if (to.name === 'login' && isAuthenticated()) {
next({ name: 'dashboard' })
} else {
next()
}
})


export default router