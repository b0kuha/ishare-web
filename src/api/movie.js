import request from '@/utils/request'

export function getMovieList(params) {
	return request.get('/movie', { params: { query: params } })
}

export function getMovieById(id) {
	return request.get(`/movie/m/${id}`)
}

export function getPersonalMovie(params) {
	return request.get('movie/personal', { params: { query: params } })
}

export function createMovie(params) {
	return request.post('movie', params)
}
