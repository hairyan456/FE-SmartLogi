import axios from '../setup/axios';

// API for Login/Register/Logout user:
const loginUser = (valueLogin, password) => {
    return axios.post('/login', { valueLogin, password });
}

const registerNewUser = (inputData) => {
    return axios.post('/register', { ...inputData });
}

const getAllcodes = (inputData) => {
    return axios.get(`/allcodes/read?type=${inputData}`);
}

const getAllUsers = () => {
    return axios.get('/users/read');
}

const createNewUser = (userData) => {
    return axios.post('/users/create', { ...userData })
}

const updateUser = (userData) => {
    return axios.put('/users/update', { ...userData })
}

const deleteUser = (user) => {
    return axios.delete('/users/delete', { data: { id: user.id } })
}

const getAllVouchers = () => {
    return axios.get('/vouchers/read');
}

const checkVoucherExisted = (voucherCode) => {
    return axios.get(`/vouchers/checkExisted?voucherCode=${voucherCode}`);
}

const postConfirmOrder = (data) => {
    return axios.post('/users/confirm-order', { ...data })
}

const getAllOrders = () => {
    return axios.get('/orders/read');
}

const getAllDrivers = () => {
    return axios.get('/drivers/read');
}

const updateDriverForOrder = (data) => {
    return axios.put('/orders/update', { ...data });
}

const updateOrderForDriver = (data) => {
    return axios.put('/drivers/update', { ...data });
}

const getOrderOfDriver = (driverName) => {
    return axios.get(`/orders/order-of-driver?driverName=${driverName}`);
}

const confirmDriverOrder = (email) => {
    return axios.put(`/users/confirm-driver-order?email=${email}`)
}

const getDriverByEmail = (email) => {
    return axios.get(`/drivers/get-by-email?email=${email}`)

}
export {
    loginUser, registerNewUser, getAllcodes, getAllUsers, createNewUser, updateUser, deleteUser,
    getAllVouchers, checkVoucherExisted, postConfirmOrder, getAllOrders, getAllDrivers, updateDriverForOrder,
    updateOrderForDriver, getOrderOfDriver, confirmDriverOrder, getDriverByEmail
};