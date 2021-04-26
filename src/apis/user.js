import axios from '@/utils/myaxios'
// 登录
export const userLogin = (data) => {
    return axios({
        method: 'post',
        url: '/login',
        data
    })
}
// 注册
export const userRegister = (data) => {
    return axios({
        method: 'post',
        url: '/register',
        data
    })
}
// 更新用户
export const getUserDetail = (id) => {
    return axios({
        // method: 'get',
        url: `/user/${id}`,
        // headers: { Authorization: localStorage.getItem('heimatoken') }
    })
}
// 关注
export const followUser = (id) => {
    return axios({
         method: 'get',
        url: '/user_follows/'+id , 
    })
}
// 取关
export const unFollowUser = (id) => {
    return axios({
         method: 'get',
        url: '/user_unfollow/'+id , 
    })
}

export const updateUserInfo = (id,data) => {
    return axios({
         method: 'post',
        url: `/user_update/${id}`,
      data
        // headers: { Authorization: localStorage.getItem('heimatoken') }
    })
}
// 7.获取用户关注列表数据
export const getUserFollows = () => {
    return axios({
        url: `/user_follows`
    })
}
// 8.获取用户收藏列表数据
export const getUserStars = () => {
    return axios({
        url: `/user_star`
    })
}



