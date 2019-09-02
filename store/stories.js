export const state = () => ({
    stories: [],
    story_contents: {},
    contents_data: [],
    current_story: {},
  });
  
  export const mutations = {
    onStoriesChanged: function(state, stories) {
      state.stories = stories ? stories : [];
    },
  
    onStoryContentsChanged: function(state, contents) {
      state.story_contents = contents ? contents : {};
    },
  
    onContentsDataChanged: function(state, datas) {
      state.contents_data = datas ? datas : [];
    },

    onCurrentStoryChanged: function(state, story) {
      state.current_story = story;
    }
  };
  
  export const getters = {
    story_list: function(state) {
      let list = [];
      if (Object.keys(state.stories).length != 0) {
        for (var sid in state.stories) {
          const dic = state.stories[sid];
          dic["sid"] = sid;
          list.push(dic);
        }
        return list;
      } else {
        return list;
      }
    },
  
    story_contents: function(state) {
      let list = [];
      if (Object.keys(state.story_contents).length != 0) {
        for (var scid_key in state.story_contents) {
          let scid = state.story_contents[scid_key];
          list.push(scid);
        }
        return list;
      } else {
        return false;
      }
    },

    contents_data: function(state) {
      return state.contents_data;
    },

    current_story: function(state) {
      return state.current_story ? state.current_story : {};
    }
  }
  