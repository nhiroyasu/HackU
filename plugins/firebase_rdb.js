import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';


export default {
  create_user(uid, name, e_mail) {
    return new Promise((resolve, reject) => {
      firebase.database().ref('users').child(uid).set({
        "name": name,
        "e_mail": e_mail,
      }).then((result)=>{
        // alert('Synchronization succeeded');
        resolve ? resolve(result) : false;
      }).catch((error)=>{
        alert('Synchronization failed');
        console.log(error);
        reject ? reject(): false;
      });
    })
  },
  edit_user_name(uid, name) {
    var userRef = firebase.database().ref('users');
    if (name) {
      userRef.child(uid + '/name').set(name).then(result => {
        console.log("user name is edited.");
      }).catch(error => {
        console.log("user name is not edited.");
        console.log(error);
      });
    }
  },
  edit_user_email(uid, e_mail) {
    var userRef = firebase.database().ref('users');
    if (e_mail) {
      userRef.child(uid + '/e_mail').set(e_mail).then(result => {
        console.log("e-mail is edited.");
      }).catch(error => {
        console.log("e-mail is not edited.");
        console.log(error);
      });
    }
  },
  edit_user_pass(uid, password) {
    if (password) {
      firebase.auth().currentUser.updatePassword(password).then(result => {
        console.log("password is edited.");
      }).catch(error => {
        console.log("password is not edited.");
        console.log(error);
      });
    }
  },
  edit_user_icon(store, uid, type, icon_img) {
    if (icon_img) {
      var icon_path = 'user_icons/'+ uid + '.' + type;
      var storageRef = firebase.storage().ref();
      var userIconRef = storageRef.child(icon_path);
      var imgUploadRef = userIconRef.put(icon_img).then(snapshot => {
        // console.log("state:" + snapshot.state);
        userIconRef.getDownloadURL().then(url => {
          var dbIconRef = firebase.database().ref('users/'+uid);
          dbIconRef.child('icon').set(url).then(result => {
            // store.commit('user/onUserIconChanged', url);
          }).catch(error => {
            console.log("f: set icon link\n", error);
          });
        }).catch(error => {
          console.log(error);
        });
      });

    } else {
      alert('not icon_img');
    }
  },

  create_story(store, title, desc) {
    let user = firebase.auth().currentUser;
    if (user) {
      let now = new Date();
      var now_time = [
        now.getFullYear(),
        ('0'+(now.getMonth()+1).toString()).slice(-2),
        ('0'+now.getDate().toString()).slice(-2),
        ('0'+now.getHours().toString()).slice(-2),
        ('0'+now.getMinutes().toString()).slice(-2),
        ('0'+now.getSeconds().toString()).slice(-2),
        ('0'+now.getMilliseconds().toString()).slice(-3),
        ].join('');
      firebase.database().ref().child('stories').push({
        "title": title,
        "description": desc,
        "author": {
          "uid": firebase.auth().currentUser.uid,
          "name": store.getters['user/name'],
        },
        "creation_date":　now_time,
      }).then(result => {
        // alert("creating a story is completed.");
      }).catch(error => {
        alert("creating a story is failed.");
        console.log(error);
      });
    } else {
      console.log("not login");
      window.location.href = "/login";
    }

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
        ('0'+(now.getMonth()+1).toString()).slice(-2),
        ('0'+now.getDate().toString()).slice(-2),
        ('0'+now.getHours().toString()).slice(-2),
        ('0'+now.getMinutes().toString()).slice(-2),
        ('0'+now.getSeconds().toString()).slice(-2),
        ('0'+now.getMilliseconds().toString()).slice(-3),
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
      console.log("At save_contentns_log: auth user isn't finded.");
    }
  },

  delete_story(uid, sid) {
    firebase.database().ref('stories').child(sid).remove().then(r => {
      console.log("success?", r);
      window.location.href = "/";
    }).catch(error => {
      console.log("error", error);
    })
  },

  load_stories(store) {
    var storiesRef = firebase.database().ref('stories');
    storiesRef.on('value', snapshot => {
      var story_data = snapshot.val();
      if (story_data) {
        store.commit("stories/onStoriesChanged", snapshot.val());
      } else {
        console.log("not found stories");
      }
    });
  },
  load_story_data(store, sid) {
    let ref = firebase.database().ref('stories/' + sid);
    ref.on('value', snapshot => {
      var story_data = snapshot.val();
      store.commit("stories/onCurrentStoryChanged", story_data);
    });
  },
  load_story_contents(store, sid) {
    let ref = firebase.database().ref('stories/' + sid + '/contents');
    ref.on('value', snapshot => {
      var contents = snapshot.val();
      if (contents) {
        store.commit("stories/onStoryContentsChanged", contents);
        let story_contents = [];
        for (var date in contents) {
          this.load_story_contents_data(store, contents[date]).then(value => {
            story_contents.push(value);
          });
        }
        store.commit("stories/onContentsDataChanged", story_contents);
      }
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
        if (data) {
          contents_data["uid"] = data.creation_user.uid;
          contents_data["name"] = data.creation_user.name;
          contents_data["content"] = data.content;
        }
        resolve(contents_data);
      }).catch(error => {
        console.log("error");
        console.log(error);
      });
    })
  },

  load_user_log(store, uid) {
    this.process_load_user_log(store, uid).then();
  },
  process_load_user_log(store, uid) {
    return new Promise(resolve => {
      var userLogRef = firebase.database().ref('users/' + uid + '/log');
      userLogRef.on('value', snapshot => {
        var log_data = snapshot.val();
        if (log_data) {
          store.commit('user/onUserLogChanged', log_data);
          resolve(snapshot);
        } else {
          console.log("not found user log");
        }
      });
    })
  },

  async search_stories_info(store, sid_s) {
    var story_list = {};
    for (var i=0; i<sid_s.length;i++) {
      var sid = sid_s[i];
      await firebase.database().ref('stories/' + sid).once('value').then(snapshot => {
        var s_data = snapshot.val();
        if (s_data != null) {
          story_list[sid] = s_data;
        } else {
          story_list[sid] = {
            "title": "このストーリーは削除されました",
            "description": "このストーリーは削除されました",
            "author": {
              "name": "No",
              "uid": "No",
            }
          }
        }
      });
    }
    store.commit('story_manager/onUserParticipateStoryChanged', story_list);
  },

  check_story_auther(store, sid) {
    var uid = firebase.auth().currentUser.uid;
    if (uid) {
      firebase.database().ref('stories/' + sid).on('value', snapshot => {
        var story_data = snapshot.val();
        if (story_data) {
          var r = story_data.author.uid === uid;
          store.commit('story_manager/onStoryAuthorChanged', r);
        }
      });
    } else {
      console.log("error", "user id is not finded.");
    }
  },

  test() {
    let ref = firebase.database().ref('stories/' + "1");
    ref.once('value').then(r => {
      console.log("snapshot", r.val());

    }).catch(e => {
      console.log("error", e);
    })
  }
}
