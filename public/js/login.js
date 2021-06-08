const loginAPI = async (data) => {
    const result = await ajax(REQUEST_TYPE.POST, API_LIST.LOGINPOPUP, data);
    if (result.status == "success") {
        console.log("success");
        window.localStorage.setItem("TOKEN", result.token);
        window.localStorage.setItem('USER', result.user.email)
        $(".PopUpClassCustomSignup").hide();

    }
    console.log(result);
}
const submitLogindata = () => {
    let data = {};
    let errobj = {};
    data.email = $('#emailId').val();
    data.password = $('#passwordId').val();
    if (!isEmailValid(data.email)) {
        errobj.email = "please enter valid email"
        $("#err5").text(errobj.email).show();
    }
    if (!isPasswordValid(data.password)) {
        errobj.password = "please enter valid password"
        $("#err6").text(errobj.password).show();

    }
    if (!isEmpty(errobj)) {
        console.log(errobj);
    }
    else {
        console.log(data);
        loginAPI(data);
    }
}

const submitLoginclick = () => {
    $("#loginSubmit").click(() => {
        console.log("hiii");
        submitLogindata();
    });

    $("#emailId").on("click change input",() => {
        $("#err5").hide()
    });
    $("#passwordId").on("click change input",() => {
        $("#err6").hide()
    });
}


$(document).ready(() => {
    submitLoginclick();
});