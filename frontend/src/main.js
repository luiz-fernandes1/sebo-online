import { createApp } from 'vue'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUserSecret, faUser, faLock, faCalendar, faEnvelope, faPhone, faSearch, faCartShopping, faArrowLeft, faTag, faComment, faLandmark, faDollar, faGlobe } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import router from './router'

library.add(faUserSecret, faUser, faLock, faCalendar, faEnvelope, faPhone, faSearch, faHeart, faCartShopping, faArrowLeft, faTag, faComment, faLandmark, faDollar, faGlobe)

createApp(App)
.component('font-awesome-icon', FontAwesomeIcon)
.use(router)
.mount('#app')
