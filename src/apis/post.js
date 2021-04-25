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
