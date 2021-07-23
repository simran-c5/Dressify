let detail_id;
let userContacts=[]
 const adminProductAddAPI = async (data) => {
    const variable = await ajax(REQUEST_TYPE.POST, API_LIST.ADMINPRODUCTADD, data);
    if (variable.status == "success") {
       console.log("working");
    }
    detail_id=variable.data._id;
    console.log(detail_id);
    imagupload(detail_id);
    console.log(variable);
}

const imagupload=(detail_id)=>{
    $("#productId").val(detail_id);
    $("#addDetailsParent").hide();
    $("#imageModal").show();

} 

const adiminSubmit=()=>{
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
const clickOnBtn =()=>{
  $("#adiminSubmitProductAdd").unbind("click");
    $("#adiminSubmitProductAdd").click(function(){
       adiminSubmit();
       
     });

     $("#closeBtnImgPopUp").click(function(){
       
         $("#imageModal").hide();
         $("#addDetailsParent").show();
      });

      $("#dashboardId").click(function(){
        $("#addDetailsParent").hide();
         $("#dashboardparent").show();
        
      });
      $("#addNewProductId").click(function(){
        $("#dashboardparent").hide();
         $("#addDetailsParent").show();
        
      });
      
     
}

const showdetails = (data) => {
    let html = ``
    data.forEach((d) => {
      html = `${html}
      <div class="col-lg-3 col-sm-6 col-md-4 col-12 cardClassCol" id="${d._id}">
      <div class="container cardClass">
          <img class="imageClass"
              src="data:image/png;base64${d.product_image.data.data}"
              alt="">
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
    $("#dashboardparent").html(html);
    clickOnBtn();
  
  }
const getdetails = async () => {
    const result = await ajax(REQUEST_TYPE.GET, API_LIST.GETUSERDETAILS, {})
    console.log(result);
    if (result.data) {
      userContacts = result.data;
      showdetails(result.data);
    }
    else {
      console.log("no details found");
    }
  }
 

$(document).ready(() => {
    clickOnBtn();
    getdetails();
    console.log("working fine");
   
});