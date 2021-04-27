import axios from '@/utils/myaxios'

export const getPostList = (params) => {
    return axios({
         method: 'get',
        url: `/post`,
        params
    })
}
export const getPostDetail = (id) => {
    return axios({
         method: 'get',
        url: '/post/'+id , 
    })
}
export const likePost = (id) => {
    return axios({
        url: '/post_like/' + id
    })
}
export const starPost = (id) => {
    return axios({
        url: '/post_star/' + id
    })
}
// 获取文章评论列表
export const getCommentList = (id,params) => {
    return axios({
        url:`/post_comment/${id}`,
        params
    })
}
// 发表评论
export const pubCommentList = (id,data) => {
    return axios({
        method:'post',
        url:`/post_comment/${id}`,
       data
    })
}