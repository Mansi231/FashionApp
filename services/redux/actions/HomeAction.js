import API from "../../AxiosConfig";

export const getCategories = () => API.get('/getCategory').then(response => response.data.data).catch(error => error);

export const getFilterProducts = (params) => API.get(`/getProductfilter`, { params }).then(response => response.data.data).catch(error => error);

export const getShopDetail = (seller_id) => API.get(`/getShopDetails/${seller_id}`).then(response => response.data.data).catch(error => error.response);

export const sendReview = async (params) => {
    API.get(`/buyer/product-review`, { params }).then(response => {
        console.log(response,'------response.data------')
        return response.data.data
    }
    ).catch(error =>{
        console.log(error.response,'---error in review')
        return error.response});
}

