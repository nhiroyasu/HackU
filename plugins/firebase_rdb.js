import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';
import { resolve } from 'url';


export default {
  create_user(uid, name, e_mail) {
    return new Promise((resolve, reject) => {
      firebase.database().ref('users').child(uid).set({
        "name": name,
        "e_mail": e_mail,
      }).then((result)=>{
        alert('Synchronization succeeded');
        resolve ? resolve(result) : false;
      }).catch((error)=>{
        alert('Synchronization failed');
        console.log(error);
        reject ? reject(): false;
      });
    })
  },
  create_story(store, title) {
    let now = new Date();
    firebase.database().ref().child('stories').push({
      "title": title,
      "author": {
        "uid": firebase.auth().currentUser.uid,
        "name": store.getters['user/name'],
      },
      "creation_date": [
        now.getFullYear(),
        now.getMonth()+1,
        now.getDate(),
        now.getHours(),
        now.getMinutes(),
        now.getSeconds(),
        now.getMilliseconds(),
      ].join('-'),
    }).then(result => {
      alert("creating a story is completed.");
    }).catch(error => {
      alert("creating a story is failed.");
      console.log(error);
    });
  },

  create_story_content(store, sid, content) {
    var ref = firebase.database().ref('story_contents')
    var pushRef = ref.push();
    var pid = pushRef.key;
    pushRef.set({
      "creation_user": {
        "uid": firebase.auth().currentUser.uid,
        "name": store.getters['user/name'],
      },
      "content": content,
    }).then(result => {
      var now = new Date();
      var now_time = [
        now.getFullYear(),
        ('0'+now.getMonth()+1).slice(-2),
        ('0'+now.getDate()).slice(-2),
        ('0'+now.getHours()).slice(-2),
        ('0'+now.getMinutes()).slice(-2),
        ('0'+now.getSeconds()).slice(-2),
        ('0'+now.getMilliseconds()).slice(-3),
      ].join('');
      var data = {};
      data[now_time] = pid;
      firebase.database().ref('stories/'+sid).child('contents').update(data).then(result => {
        this.save_contents_log(sid, pid, content);
      });
    }).catch(error => {
      alert("creating a story-content is failed.");
      console.log(error);
    });
  },

  save_contents_log(sid, scid, content) {
    let user = firebase.auth().currentUser;
    let data = {};
    data[scid] = content;
    if (user) {
      firebase.database().ref('users/'+user.uid+'/log').child(sid).update(data);
    } else {
      console.log("At save_contetns_log: auth user isn't finded.");
    }
  },

  load_stories(store) {
    firebase.database().ref('stories').on('value', snapshot => {
      store.commit("stories/onStoriesChanged", snapshot.val());
    });
  },

  load_story_contents(store, sid) {
    let ref = firebase.database().ref('stories/' + sid + '/contents');
    ref.on('value', snapshot => {
      var contents = snapshot.val();
      store.commit("stories/onStoryContentsChanged", contents);
      let story_contents = [];
      for (var date in contents) {
        this.load_story_contents_data(store, contents[date]).then(value => {
          story_contents.push(value);
        });
      }
      store.commit("stories/onContentsDataChanged", story_contents);
    });
    let counterRef = firebase.database().ref('stories/' + sid + '/access_count');
    counterRef.transaction(current_value => {
      return (current_value || 0) + 1;
    });
  },

  load_story_contents_data(store, scid) {
    return new Promise(resolve => {
      firebase.database().ref('story_contents/' + scid).once('value').then(snapshot => {
        let contents_data = {};
        var data = snapshot.val();
        contents_data["uid"] = data.creation_user.uid;
        contents_data["name"] = data.creation_user.name;
        contents_data["content"] = data.content;
        resolve(contents_data);
      }).catch(error => {
        console.log("error");
        console.log(error);
      });
    })

  }
}
