import axios from '@/utils/myaxios'
export const userLogin = (data) => {
    return axios({
        method: 'post',
        url: '/login',
        data
    })
}
export const userRegister = (data) => {
    return axios({
        method: 'post',
        url: '/register',
        data
    })
}
export const getUserDetail = (id) => {
    return axios({
        // method: 'get',
        url: `/user/${id}`,
        // headers: { Authorization: localStorage.getItem('heimatoken') }
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




