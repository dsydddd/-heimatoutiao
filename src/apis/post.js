import axios from '@/utils/myaxios'

export const getPostList = (category) => {
    return axios({
         method: 'get',
        url:  `/post?category=${category}`
    })
}