import request from '@/utils/request'

export function login(data) {
    return request.post('auth/login', data)
}

export function getInfo() {
    return request.get('auth/userInfo')
}

export function register(data) {
    return request.post('user/register', data)
}