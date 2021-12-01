let detail_id;
let editContactId;
let productid;
let userContacts = []
const adminProductAddAPI = async (data) => {
  console.log("preparing");
  const variable = await ajax(REQUEST_TYPE.POST, API_LIST.ADMINPRODUCTADD, data);
  if (variable.status == "success") {
    console.log("working");
  }
  detail_id = variable.data._id;
  console.log(detail_id);
  imagupload(detail_id);
  console.log(variable);
}

const editDetailsAPI = async (data) => {
  const variable = await ajax(REQUEST_TYPE.POST, API_LIST.EDITDATA, data);
  console.log(variable);
  if (variable.status == "success") {
    // $("#backgrounddiv").css("-webkit-filter", "blur(0)");
    $("#adminEditModal").hide();
    getdetails();

  }
}
const editDetailsPopUp = (id) => {
  let result = userContacts.find(obj => obj._id == id);
  productid=id;
  console.log(result);
  $('#productName1').val(result.product_name);
 $('#productCategory1').val(result.product_category);
 $('#productPrice1').val(result.product_price);
$('#productDescription1').val(result.product_description);
  $('#productFabric1').val(result.product_fabric);
 $('#productColor1').val(result.product_color);
  $('#productBrand1').val(result.product_brand);
  $("#adminEditModal").show();

}
const editSubmit = () => {
  let data = {};
  data.id=productid;
  data.productName = $('#productName1').val();
  data.productCategory = $('#productCategory1').val();
  data.productPrice = $('#productPrice1').val();
  data.productDescription = $('#productDescription1').val();
  data.productFabric = $('#productFabric1').val();
  data.productColor = $('#productColor1').val();
  data.productBrand = $('#productBrand1').val();
  console.log(data);
  editDetailsAPI(data);
}

const imagupload = (detail_id) => {
  $("#productId").val(detail_id);
  $("#addDetailsParent").hide();
  $("#imageModal").show();

}

const adiminSubmit = () => {
  let data = {};
  data.productName = $('#productName').val();
  data.productCategory = $('#productCategory').val();
  data.productPrice = $('#productPrice').val();
  data.productDescription = $('#productDescription').val();
  data.productFabric = $('#productFabric').val();
  data.productColor = $('#productColor').val();
  data.productBrand = $('#productBrand').val();
  console.log(data);
  adminProductAddAPI(data);
}





const showdetails = (data) => {
  let html = ``
  data.forEach((d) => {
    let base64data = _arrayBufferToBase64(d.product_image.data.data);

    html = `${html}
      <div class="col-lg-3 col-sm-6 col-md-4 col-12 cardClassCol" id="${d._id}">
      <div class="container cardClass">
      <img class="imageClass" src="data:image/${d.product_image.contentType};base64,
      ${base64data}">

          <div class="headingDivClassCard">
              <h6 class="cardHeadingClass">${d.product_name}</h6>
          </div>
          <div>
              <div class="priceTagPElementDiv">
                  <p class="priceTagPElement"><strike class="StrikeThrough">Rs. 2300</strike> ${d.product_price}</p>
              </div>
              <div class="discountDiv">
                  <p>30% off</p>
              </div>
          </div>
          <div><i class="far fa-star starIconClass"></i>
              <i class="far fa-star"></i>
              <i class="far fa-star"></i>
              <i class="far fa-star"></i>
              <i class="far fa-star"></i>
              <span class="starsSpanClass">4.3 stars (234)</span>
          </div>
          <div class="dropdown dropleft" style=" float: right; margin-top: -12px;
          margin-right: 5px;">
              <i data-toggle="dropdown" class=" fas fa-ellipsis-v"></i>
              <div class="dropdown-menu" style=" min-width: 6rem" id="${d._id}">
                <div class="deleteBtnClass">
                  <a class="dropdown-item " style="font-size: 0.7rem;"> <i style="font-weight: 600" class="far fa-trash-alt fa-lg "> delete</i>
                  </a>
                </div>
                <div class="editBtnClass">
                  <a class="dropdown-item"  style="font-size: 0.7rem;"> <i class="fas fa-edit fa-lg"> edit</i>
                  </a>
                </div>
              </div>
            </div>
      </div>
  </div>  
     
  `
  })
  $("#dashboardparent").html(html);
  clickOnBtn();

}
const showProductsToUser = (data) => {
  let html = ``
  data.forEach((d) => {
    let base64data = _arrayBufferToBase64(d.product_image.data.data);

    html = `${html}
    <div class="col-lg-3 col-sm-6 col-md-4 col-12 cardClassCol" id="${d._id}">
    <div class="container cardClass">
    <img class="imageClass" src="data:image/${d.product_image.contentType};base64,
    ${base64data}">
        <div class="headingDivClassCard">
            <h6 class="cardHeadingClass">${d.product_name}</h6>
        </div>
        <div>
            <div class="priceTagPElementDiv">
                <p class="priceTagPElement"><strike class="StrikeThrough">Rs. 2300</strike> ${d.product_price}</p>
            </div>
            <div class="discountDiv">
                <p>30% off</p>
            </div>
        </div>
        <div><i class="far fa-star starIconClass"></i>
            <i class="far fa-star"></i>
            <i class="far fa-star"></i>
            <i class="far fa-star"></i>
            <i class="far fa-star"></i>
            <span class="starsSpanClass">4.3 stars (234)</span>
        </div>
    </div>
</div>
     
  `
  })
  $("#showproducttouser").html(html);
  clickOnBtn();

}
function _arrayBufferToBase64(buffer) {
  var binary = '';
  var bytes = new Uint8Array(buffer);
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}
const getdetails = async () => {
  const result = await ajax(REQUEST_TYPE.GET, API_LIST.GETUSERDETAILS, {})
  console.log(result);
  if (result.data) {
    userContacts = result.data;
    showdetails(result.data);
    showProductsToUser(result.data);
  }
  else {
    console.log("no details found");
  }
}

const  userRegisterDeleteAPI = async(data)=>{
  const result = await ajax(REQUEST_TYPE.DELETE,API_LIST.DELETEDATA,data);
  if(result)
  {
      console.log(result);
      getdetails();
  }
  
}

const clickOnBtn = () => {
  $("#updateImage").unbind("click");
  $("#updateImage").click(function () {
    console.log(editContactId);
    $('#productId').val(editContactId );
         $("#imageModal").show();


  });

  $("#adiminSubmitProductAdd").unbind("click");
  $("#adiminSubmitProductAdd").click(function () {
    adiminSubmit();

  });


  $("#closeBtnImgPopUp").click(function () {

    $("#imageModal").hide();
    $("#addDetailsParent").show();
  });
  $(".deleteBtnClass").unbind("click")
  $(".deleteBtnClass").click(function(){
     let data = {
          id: $(this).parent().attr("id")
      }
      console.log(data);
    userRegisterDeleteAPI(data);
  });

  $("#dashboardId").click(function () {
    $("#addDetailsParent").hide();
    $("#useDetailParent").hide();
    $("#productDetailsCard").show();

  });
  $("#addNewProductId").click(function () {
    $("#productDetailsCard").hide();
    $("#useDetailParent").hide();
    $("#addDetailsParent").show();

  });
  $(".editBtnClass").unbind("click")
  $(".editBtnClass").click(function () {
    flag = 1;
    let data = {
      id: $(this).parent().attr("id")
    }
    editContactId = data.id;
    console.log(data);
    editDetailsPopUp(data.id);
  });
  $("#adiminSubmitProductAdd1").unbind("click")
  $("#adiminSubmitProductAdd1").click(function () {
    //  $("#mainDivBg").css("-webkit-filter", "blur(0)");
    editSubmit();
    $("#adminEditModal").hide();
    // $("#imageModal").show();
  });
  $("#closeBtnImgPopUp1").unbind("click")
  $("#closeBtnImgPopUp1").click(function () {

    $("#adminEditModal").hide();
    // $("#imageModal").show();
  });

}

$(document).ready(() => {
  clickOnBtn();
  getdetails();
  console.log("working fine");

});