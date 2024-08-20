import actionTypes from './actionTypes';
import {
    getAllcodes, createNewUser, getAllUsers, deleteUser, updateUser,
} from '../../services/userService';




// CREATE new user:
export const createUser = (userData) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.CREATE_USER_START });
            let res = await createNewUser(userData);
            if (res) {
                if (res.EC === 0) {
                    dispatch(createNewUserSuccess(res));
                }
                else {  // email/phone existed or password.length <3
                    dispatch(createNewUserFailed(res));
                }
            }
        }
        catch (err) {
            dispatch(createNewUserFailed());
            console.log('Check error in createNewUser(): ', err);
        }
    }
}
export const createNewUserSuccess = (response) => ({
    type: actionTypes.CREATE_USER_SUCCESS,
    EM: response.EM, EC: response.EC
})
export const createNewUserFailed = (response) => ({
    type: actionTypes.CREATE_USER_FAILED,
    EM: response.EM, EC: response.EC, DT: response.DT
})

// READ all users:
export const fetchAllUsersStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_ALL_USERS_START });
            let res = await getAllUsers();
            if (res && res.EC === 0) {
                dispatch(fetchAllUsersSuccess(res.DT));
            }
            else {
                dispatch(fetchAllUsersFailed());
                console.log(res);
            }
        }
        catch (err) {
            dispatch(fetchAllUsersFailed());
            console.log('Check error in fetchAllUsersStart(): ', err);
        }
    }
}
export const fetchAllUsersSuccess = (usersData) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    data: usersData,
})
export const fetchAllUsersFailed = () => ({
    type: actionTypes.FETCH_ALL_USERS_FAILED,
})

// DELETE user:
export const deleteUserStart = (userDelete) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.DELETE_USER_START });
            let res = await deleteUser(userDelete);
            if (res) {
                if (res.EC === 0) {
                    dispatch(deleteUserSuccess(res));
                }
                else {
                    dispatch(deleteUserFailed(res));
                }
            }
        }
        catch (err) {
            dispatch(deleteUserFailed());
            console.log('Check error in deleteUser(): ', err);
        }
    }
}
export const deleteUserSuccess = (response) => ({
    type: actionTypes.DELETE_USER_SUCCESS,
    EM: response.EM, EC: response.EC
})
export const deleteUserFailed = (response) => ({
    type: actionTypes.DELETE_USER_FAILED,
    EM: response.EM, EC: response.EC
})

// UPDATE  user:
export const updateUserStart = (userData) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.UPDATE_USER_START });
            let res = await updateUser(userData);
            if (res) {
                if (res.EC === 0) {
                    dispatch(updateUserSuccess(res));
                }
                else {
                    dispatch(updateUserFailed(res));
                }
            }
        }
        catch (err) {
            dispatch(updateUserFailed());
            console.log('Check error in updateUserStart(): ', err);
        }
    }
}
export const updateUserSuccess = (response) => ({
    type: actionTypes.UPDATE_USER_SUCCESS,
    EM: response.EM, EC: response.EC
})
export const updateUserFailed = (response) => ({
    type: actionTypes.UPDATE_USER_FAILED,
    EM: response.EM, EC: response.EC, DT: response.DT
})


