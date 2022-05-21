import request from '@/utils/request'

export function replyList(params) {
	return request.get('/reply', { params: { query: params } })
}

export function createReply(params) {
	return request.post('/reply', params)
}
