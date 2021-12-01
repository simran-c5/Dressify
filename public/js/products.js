let userContacts = [];
const getProducts = async () => {
    const result = await ajax(REQUEST_TYPE.GET, API_LIST.GETALLPRODUCTS, {})
    console.log(result);
    if (result.data) {
        userContacts = result.data;
        showProductsToUser(result.data);
    }
    else {
        console.log("no details found");
    }
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

let showProductDetails = (id) => {
    window.location.href = `/description/${id}`;
}

let clickOnBtn = () => {
    $(".cardClassCol").unbind("click");
    $(".cardClassCol").click(function () {
        let id = $(this).attr("id");
        showProductDetails(id);
    });

}

$(document).ready(() => {
    clickOnBtn();
    getProducts();
});