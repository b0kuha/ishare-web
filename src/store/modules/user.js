import {getInfo, login} from '@/api/auth'
import {getToken, removeToken, setToken} from '@/utils/auth'

const getDefaultState = () => {
	return {
		token: getToken(),
		name: '',
		avatar: '',
		email:''
	}
}

const state = getDefaultState()

const mutations = {
	RESET_STATE: state => {
		Object.assign(state, getDefaultState())
	},
	SET_TOKEN: (state, token) => {
		state.token = token
	},
	SET_NAME: (state, name) => {
		state.name = name
	},
	SET_AVATAR: (state, avatar) => {
		state.avatar = avatar
	},
	SET_EMAIL:(state,email)=>{
		state.email = email
	}
}

const actions = {
	// user login
	async login({ commit }, userInfo) {
		const { email, password } = userInfo
		const res = await login({ email: email.trim(), password: password.trim() })
		commit('SET_TOKEN', res.data)
		setToken(res.data)
		return res
	},

	// get user info
	getInfo({ commit, state }) {
		return new Promise((resolve, reject) => {
			getInfo(state.token)
				.then(response => {
					const { data } = response

					if (!data) {
						return reject('验证失效, 请重新登录.')
					}

					const { nickname, avatar,email } = data

					commit('SET_NAME', nickname)
					commit('SET_AVATAR', avatar)
					commit('SET_EMAIL',email)
					resolve(data)
				})
				.catch(error => {
					reject(error)
				})
		})
	},

	// user logout
	logout({ commit, state }) {
		removeToken() // must remove  token  first
		commit('RESET_STATE')
	},

	// remove token
	resetToken({ commit }) {
		return new Promise(resolve => {
			removeToken() // must remove  token  first
			commit('RESET_STATE')
			resolve()
		})
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}
