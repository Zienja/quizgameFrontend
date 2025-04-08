import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import Notifications from '@kyvg/vue3-notification'

import QuizGame from './pages/game.vue'


const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/home', component: App },
        { path: '/Quiz', component: QuizGame}
    ]
});

createApp(App)
    .use(router)
    .use(Notifications)
    .mount('#app')
