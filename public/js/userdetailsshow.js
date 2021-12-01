const showuserinfo = (data) => {
    let html = ``
    console.log(data);
    data.forEach((d) => {
      html = `${html}     
  <tr id="${d._id}">
        <td>${d.name}</td>
        <td>${d.email}</td>
  </tr>
  `
    })
    $("#showinfo").html(html);
    clicksBtnUserDetail();
  
  }

const getuserinfo = async () => {
    const result = await ajax(REQUEST_TYPE.GET, API_LIST.GETUSERINFO, {})
    console.log(result);
    if (result.data) {
      userContacts = result.data;
      showuserinfo(result.data);
    }
    else {
      console.log("no details found");
    }
  }
const clicksBtnUserDetail =()=>{
    $("#userdetailId").unbind("click");
    $("#userdetailId").click(function () {
        getuserinfo();
        $("#productDetailsCard").hide();
        $("#addDetailsParent").hide();

        $("#useDetailParent").show();
      });

}

$(document).ready(() => {
  
    clicksBtnUserDetail();
  
  
  });