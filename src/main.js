import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase'
import {firestorePlugin} from 'vuefire'
import 'firebase/firestore'

Vue.config.productionTip = false
Vue.use(firestorePlugin)

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyArho7-8depWRMMz6R2w5v28g7uABXZY4o",
  authDomain: "vuetube-69cf5.firebaseapp.com",
  databaseURL: "https://vuetube-69cf5.firebaseio.com",
  projectId: "vuetube-69cf5",
  storageBucket: "vuetube-69cf5.appspot.com",
  messagingSenderId: "931154935519",
  appId: "1:931154935519:web:cb37a82ed3a4eca696f36a",
  measurementId: "G-6XWRD4X9WF"
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
