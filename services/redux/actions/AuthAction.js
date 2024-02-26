import API from "../../AxiosConfig";
export const LOGIN = LOGIN

export const registerApi = async (RequestData) => {
  
    return new Promise((resolve, reject) => { API.post(`/register`, RequestData).then((res) => resolve(res.data)).catch((error) => reject(error.response.data)) })
};

export const verifyCodeApi = async (obj) => {
    return new Promise((resolve, reject) => {
        API.get(`/email-verified?email=${obj?.email}&verification_code=${obj?.verification_code}`)
            .then((res) => resolve(res))
            .catch((error) => reject(error.response.data))
    })
};

export const resendCodeApi = async (email) => {
    return new Promise((resolve, reject) => {
        API.get(`/resend-code?email=${email}`)
            .then((res) => resolve(res.data))
            .catch((error) => reject(error.response.data))
    })
};

export const loginApi = async (obj) => {
    return new Promise((resolve, reject) => {
        API.get(`/login?email=${obj?.email}&password=${obj?.password}`)
            .then((res) => {
                console.log(res, '----inn'); return resolve(res.data)
            })
            .catch((error) => {
                console.log(reject(error.response.data), '-err'); return reject(error)
            })
    })
};

