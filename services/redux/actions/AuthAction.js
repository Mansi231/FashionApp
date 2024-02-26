import API from "../../AxiosConfig";
export const LOGIN = LOGIN

export const registerApi = async (RequestData) => {

    return new Promise((resolve, reject) => {
        API.post(`/register`, RequestData).then((res) => {
            return resolve(res.data)
        }
        ).catch((error) => {
            if (error?.response) {
                return reject(error?.response?.data || error.message);
            } else {
                return reject(error?.message)
            }
        }
        )
    })
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
        ost
        API.get(`/resend-code?email=${email}`)
            .then((res) => resolve(res.data))
            .catch((error) => reject(error.response.data))
    })
};

export const loginApi = async (obj) => {
    return new Promise((resolve, reject) => {
        API.get(`/login?email=${obj?.email}&password=${obj?.password}`)
            .then((res) => {
                return resolve(res?.data)
            })
            .catch((error) => {
                // console.log(error,':: error in sign in ::')
                if (error.response) {
                    return reject(error?.response?.data || error.message);
                } else {
                    return reject(error?.message)
                }

            })
    })
};

export const changePassword = async (data) =>{
    return new Promise((resolve, reject) => {
        API.post(`/buyer/changepassword`,data)
            .then((res) => {
                return resolve(res?.data) 
            })
            .catch((error) => {
                // console.log(error,':: error in sign in ::')
                if (error.response) {
                    return reject(error?.response?.data || error.message);
                } else {
                    return reject(error?.message)
                }

            })
    })

}
