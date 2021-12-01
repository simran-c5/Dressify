const signupAPI = async (data) => {
    console.log("testingsignup");
    const result = await ajax(REQUEST_TYPE.POST, API_LIST.SIGNUPPOPUP, data);
    if (result.status == "success") {
        console.log("success");
        window.localStorage.setItem("TOKEN", result.token);
        window.localStorage.setItem('USER', result.user.email)
        $(".PopUpClassCustom").hide();

    }
    console.log(result);
}
const submitdata = () => {
    let data = {};
    data.name = $('#name').val();
    data.email = $('#email').val();
    data.password = $('#password').val();
    data.confirmpassword = $('#confirmpassword').val();
    let errobj = {};
    if (!isNameValid(data.name)) {
        errobj.name = "please enter valid name"
        $("#err1").text(errobj.name).show();
        
    }
    if (!isEmailValid(data.email)) {
        errobj.email = "please enter valid email"
        $("#err2").text(errobj.email).show();
    }
    if (!isPasswordValid(data.password)) {
        errobj.password = "please enter valid password"
        $("#err3").text(errobj.password).show();
    }
    if (!isPasswordMatch(data.password, data.confirmpassword)) {
        errobj.confirmpassword = "password does not match"
        $("#err4").text(errobj.confirmpassword).show();
    }
    if (!isEmpty(errobj)) {
        console.log(errobj);
    }
    else {
        console.log(data);
        signupAPI(data);
    }

}

const submitbtnclick = () => {
    $("#signUpSubmit").click(() => {
        console.log("hiii");
        submitdata();
    });

    $("#name").on("click change input",() => {
        $("#err1").hide()
    });
    $("#email").on("click change input",() => {
        $("#err2").hide()
    });
    $("#password").on("click change input",() => {
        $("#err3").hide()
    });
    $("#confirmpassword").on("click change input",() => {
        $("#err4").hide()
    });

}



$(document).ready(() => {
    submitbtnclick();
});