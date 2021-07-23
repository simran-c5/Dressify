const API_SERVER = "http://localhost:3000/"

const REQUEST_TYPE = {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE",
    PATCH: "PATCH",
    OPTION: "OPTION"
}

const API_LIST = {

    SIGNUPPOPUP: `${API_SERVER}auth/signup/`,
    LOGINPOPUP: `${API_SERVER}auth/signin/`,
    ADMINPRODUCTADD :  `${API_SERVER}admin/adminAddProductDetails/`,
    // LOGINSUBMIT :  `${API_SERVER}submitchk/`,
    // SUCCESS :  `${API_SERVER}success/`,
    // USERDETAILS :  `${API_SERVER}submitdetail/`,
    // USERDETAILSPAGE :  `${API_SERVER}userdetail/`,
    GETUSERDETAILS :  `${API_SERVER}admin/getproductdetail/`,
    // GETHOMEPAGE :  `${API_SERVER}`,
    // DELETEDATA : `${API_SERVER}deleteDetail/`,
    // EDITDATA : `${API_SERVER}editDetails/`,
    // GETREGISTERUSERS :  `${API_SERVER}userRegister/`,
    // DELETEREGISTERUSER :  `${API_SERVER}deleteUser/`,
    // EDITREGISTERUSER :  `${API_SERVER}editData/`



}