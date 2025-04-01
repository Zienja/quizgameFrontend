import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'

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
    .mount('#app')
