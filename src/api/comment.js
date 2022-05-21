import request from '@/utils/request';

export function submitComment(params) {
    return request.post('/comment/parent', params)
}

export function replyComment(params) {
    return request.post('/comment/child', params)
}

export function getCommentList(params) {
    return request.get('/comment', {params})
}

export function getComments(params) {
    return request.get('/comment/list', {params: {query: params}})
}