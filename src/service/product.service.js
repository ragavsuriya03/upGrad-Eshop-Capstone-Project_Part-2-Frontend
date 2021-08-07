import authService from "./auth.service";
import http from "./http.service"

const searchProducts = async (queryString) => {
    return await http.get(`http://localhost:8080/api/products${queryString}`);
}

const saveProduct = async (data) => {
    return await http.post('http://localhost:8080/api/products', data, {
        headers: {
            'x-auth-token': authService.getToken(),
        }
    });
}

const editProduct = async (id, data) => {
    return await http.put(`http://localhost:8080/api/products/${id}`, data, {
        headers: {
            'x-auth-token': authService.getToken(),
        }
    });
}

const getProductDetails = async (id) => {
    return await http.get(`http://localhost:8080/api/products/${id}`);
}

const deleteProduct = async (id) => {
    return await http.delete(`http://localhost:8080/api/products/${id}`,{
        headers: {
            'x-auth-token': authService.getToken(),
        }
});
}

const getAllCategories = async () => {
    return await http.get(`http://localhost:8080/api/products/categories`);
}

const createOrder = async (address, product, quantity) => {
    return await http.post('http://localhost:8080/api/orders', {
        address,
        product,
        quantity
    }, {
        headers: {
            'x-auth-token': authService.getToken(),
        }
    });
}

export default {
    saveProduct,
    editProduct,
    getProductDetails,
    getAllCategories,
    searchProducts,
    deleteProduct,
    createOrder
}