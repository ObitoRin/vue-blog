import auth from '../../api/auth';
/**
 * 登录 注册的处理
 */
const state = {
    user: null,    //默认为空，登录后自然就有状态,
    isLogin: false //默认未登录
};

const getters = {
    user: state => state.user,
    isLogin: state => state.isLogin
};

const mutations = {
    setUser(state, payload){
        state.user = payload.user
    },
    setLogin(state, payload){
        state.isLogin = payload.isLogin
    }

};

const actions = {
    login({ commit }, { username, password }){
        return auth.login({ username, password })
            .then(res => {
                commit('setUser', { user: res.data })
                commit('setLogin', { isLogin: true })
           })
    },
    async register({ commit }, { username, password }){
        let res = await auth.register({ username, password })
        commit('setUser', { user: res.data })
        commit('setLogin', { isLogin: true })
        return res.data
    },
    async checkLogin({ commit, state }){
        if(state.isLogin) return true
        let res = await auth.getInfo()
        commit('setLogin', { isLogin: res.isLogin })
        if(!res.isLogin) return false
        commit('setUser', { user: res.data })
        return true
    },
    async logout({ commit }){
        await auth.logout()
        commit('setUser', { user: null })
        commit('setLogin', { isLogin: false } )

    }   
};

export default {
    state,
    getters,
    mutations,
    actions
}