export const state = () => ({
    participate_stories: {},

});

export const mutations = {
    onUserParticipateStoryChanged(state, p_stories) {
        state.participate_stories = p_stories;
    }
};

export const getters = {
    participate_stories: function(state) {
        let list = [];
        if (Object.keys(state.participate_stories).length != 0) {
            for (var sid in state.participate_stories) {
                const dic = state.participate_stories[sid];
                dic["sid"] = sid;
                list.push(dic);
            }
        }
        return list;
    }
};