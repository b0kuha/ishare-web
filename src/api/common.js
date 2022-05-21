import request from '@/utils/request'
export function getStsToken() {
	return request.get('/file/token')
}
