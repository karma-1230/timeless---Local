import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000",
});


// User
export const loginUser = (data) => api.post("/user/login", data);
export const signupUser = (data) => api.post("/user/signup", data);
export const sendContactForm = (data) => api.post("/user/contactus", data);

export const addToCart = async (productId, quantity) => {
    return api.post(
        "/user/cart",
        { productId, quantity },
        {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
    );
};

export const submitRating = (productId, rating, comment = "") => {
    const token = localStorage.getItem("token"); // make sure token exists
    return api.post(
        `/products/${productId}/rate`,
        { rating, comment },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};



// Products
export const getProducts = () => api.get("/products"); // fetch all
export const getProductById = (id) => api.get(`/products/${id}`);

export const fetchItems = async () => {
    const token = localStorage.getItem("token");

    return api.get("admin/items", {
        headers: { Authorization: `Bearer ${token}` }
    });
};

export const deleteItem = async (id) => {


    return api.delete(`admin/items/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    });
};

// Admin
export const addItem = (data) => {
    const token = localStorage.getItem("token");

    return api.post("/admin/item", data, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
        },
    });
};

export const updateItem = (id, data) => api.put(`/admin/item/${id}`, data, {
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data"
    },
});

export default api;
