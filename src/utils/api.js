import axios from "axios";
import {Message} from "element-ui";

axios.interceptors.response.use(response => {
    if (response.status && response.status === 200 && response.data.status === 500) {
        Message.error({message: response.data.msg})
        return;
    }
    if (response.data.msg) {
        Message.success({message: response.data.msg})
    }
    return response.data;

}, error => {
    Message.error("error")
})

let base = ''

export const postKeyValueRequest = (url, params) => {
    return axios({
        method: "post",
        url: `${base}${url}`,
        data: params,
        transformRequest: [function (data) {
            let ret = '';
            for (let key in data) {
                ret += encodeURIComponent(key) + '=' + encodeURIComponent(data[key]) + '&'
            }
            return ret
        }],
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}