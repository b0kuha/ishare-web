const TokenKey = 'token'

export function getToken() {
	return JSON.parse(localStorage.getItem(TokenKey))
}

export function setToken(token) {
	return localStorage.setItem(TokenKey, JSON.stringify(token))
}

export function removeToken() {
	return localStorage.removeItem(TokenKey)
}
