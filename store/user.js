
export const state = () => ({
    user: {},
    name: '',
    e_mail: '',
    state: false,
    type: 0,
  });
  
  export const mutations = {
    onAuthStateChanged: function(state, user) {
      state.user = user;
    },
    onUserInfoChanged: function(state, {e_mail, name}) {
      state.e_mail = e_mail;
      state.name = name;
    },
    onUserStateChanged: function(state, status) {
      state.state = status;
    },
    onAuthType: function(state, type) {
      state.type = type;
    }
  };
  
  export const getters = {
    user_id: function(state) {
      return state.user.uid;
    },
    name: function(state) {
      return state.name ? state.name : 'No Name';
    },
    e_mail: function(state) {
      return state.e_mail ? state.e_mail : 'No E-mail';
    },
    verified: function(state) {
      if (state.user) {
        if(state.user.emailVerified) {
          return state.user.emailVerified;
        } else {
          return 'is not email-verified';
        }
      } else {
        return 'is not Login';
      }
    },
    isSignedIn: function(state) {
      return state.state ? 'true' : 'false';
    },
    type: function(state) {
      return state.type;
    }
  };
  