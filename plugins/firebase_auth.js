import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';

import rdb from '~/plugins/firebase_rdb.js';

const axios = require('axios');

if (!firebase.apps.length) {
  const firebaseConfig = {
    apiKey: "AIzaSyDuti9M3jfNUZWWqmzGBjU-jX6dsv2ADGE",
    authDomain: "dust-cf800.firebaseapp.com",
    databaseURL: "https://dust-cf800.firebaseio.com",
    projectId: "dust-cf800",
    storageBucket: "dust-cf800.appspot.com",
    messagingSenderId: "34329787477",
    appId: "1:34329787477:web:743d73e8eb7348b6"
  };
  firebase.initializeApp(firebaseConfig);
}

export default {
  init() {
    // if(!firebase.app.length) {
    //   firebase.initializeApp(firebaseConfig);
    //   firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
    // }
  },
  signup(store, name, email, pass) {
    firebase.auth().createUserWithEmailAndPassword(email, pass).then((result)=>{
      console.log("Succeed Sign-Up");
      rdb.create_user(result.user.uid, name, email).then(_result => {
        window.location.href="/";
      });
    }).catch((error) => {
      console.log("Missing Sign-Up");
      let code = error.code;
      let message = error.message;
      if (code === 'auth/weak-password') {
        alert('The password is too weak.');
      } else {
        alert(message);
      }
      console.log(error);
    });
  },
  login(store, email, pass) {
    firebase.auth().signInWithEmailAndPassword(email, pass).then((result)=>{
      console.log("Succeed Sign-In");
      this.process_get_user(store).then((snapshot) => {
        window.location.href = '/';
      });
    }).catch((error) => {
      console.log("Missing Sing-In");
      let code = error.code;
      let message = error.message;
      if (code === 'auth/wrong-password') {
        alert('Wr ond Password');
      } else {
        alert(message);
      }
      console.log(error);
    })
  },
  login_g_auth(store) {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(result => {
      rdb.create_user(result.user.uid, result.user.displayName, result.user.email).then(result => {
        window.location.href = "/";
      });
      // this.process_get_user(store).then(snapshot => {
      //   store.commit('user/onUserStateChanged', true);
      //   store.commit('user/onAuthType', 2);
      // });
    });
  },
  logout() {
    firebase.auth().signOut();
    window.location.href = "/";
  },
  onAuth(store, user_info=true) {
    this.process_Auth(store, user_info).then();
  },
  process_Auth(store, user_info=true) {
    return new Promise(resolve => {
      firebase.auth().onAuthStateChanged(user => {
        user = user ? user : {};
        store.commit('user/onAuthStateChanged', user);
        store.commit('user/onUserStateChanged', user.uid ? true : false);
        if (firebase.auth().currentUser) {
          console.log("current user exsist");
          if (user_info) {
            this.get_user_info(store);
            rdb.load_user_log(store, user.uid);
          }
        } else {
          console.log("current user not exsist");
        }
        resolve(user);
      });
    })
  },
  get_user_info(store) {
    this.process_get_user(store).then();
  },
  process_get_user(store) {
    return new Promise(resolve => {
      let cur_user = firebase.auth().currentUser;
      if(cur_user) {
        let userRef = firebase.database().ref('users/' + cur_user.uid);
        userRef.on('value', (snapshot)=>{
          let user = snapshot.val();
          store.commit('user/onAuthStateChanged', cur_user);
          store.commit('user/onUserInfoChanged', {e_mail:user.e_mail, name:user.name});
          store.commit('user/onUserStateChanged', true);
          store.commit('user/onUserIconChanged', 'icon' in user ? user.icon : "");
          resolve(snapshot);
        });
      } else {
        store.commit('user/onAuthStateChanged', {});
        store.commit('user/onUserInfoChanged', {e_mail: '', name: ''});
        store.commit('user/onUserStateChanged', false);
        store.commit('user/onUserIconChanged', "");
      }
    });
  }
};
