

let getdetails = async (id) => {
    const variable = await ajax(REQUEST_TYPE.GET, API_LIST.GETPRODUCTDETAILS, { id: id });
    console.log(variable);
    if (variable.status == "success") {
        showProductDetails(variable.data);
    }
}

let showProductDetails = (data) => {
    let html = ``;
    let base64data = _arrayBufferToBase64(data.product_image.data.data);
    html = ` <div class="row">
                <div class="col-sm-6 col-12">
                    <div>
                        <img class="d-block w-100 descriptionImg2 "
                            src="data:image/${data.product_image.contentType};base64,
                            ${base64data}"
                            alt="Second slide">
                    </div>
                </div>
                <div class="col-sm-6 col-12">
                    <p class="headingText textleft">
                        ${data.product_name}
                    </p>
                    <p class="textStyling textleft">
                        ₹${data.product_price}
                    </p>
                    <p class="textStyling textleft">
                        Product Brand: ${data.product_brand}
                    </p>
                    <p class="textStyling textleft">
                        ${data.product_description}
                    </p>
                    <hr>
                    <p class="textStyling textleft font_weight">
                        1 PCS LEFT IN STOCK
                    </p>
                    <div class="container exploreBtnDivClass">
                        <button class="btn btnStyling cartButton" data-value="${data._id}">Add To Cart</button>
                        <button class="btn btnStyling">Buy Now</button>
                    </div>
                    <hr>
                    <p class="textStyling textleft font_weight">
                        <span><i class="fa fa-heart"></i>Add To Wishlist</span>
                    </p>
                    <hr>
                    <div class="row">
                        <div class="col-6">
                            <p class="textStyling textleft">
                                Product Category:
                            </p>
                        </div>
                        <div class="col-6">
                            <p class="textStyling textleft">
                            ${data.product_category}
                            </p>
                        </div>
                    </div>
                    <hr>
                    <div class="row">
                        <div class="col-6">
                            <p class="textStyling textleft">
                                Product Color:
                            </p>
                        </div>
                        <div class="col-6">
                            <p class="textStyling textleft">
                            ${data.product_color}
                            </p>
                        </div>
                    </div>
                    <hr>
                    <div class="row">
                        <div class="col-6">
                            <p class="textStyling textleft">
                                Product Fabric:
                            </p>
                        </div>
                        <div class="col-6">
                            <p class="textStyling textleft">
                            ${data.product_fabric}
                            </p>
                        </div>
                    </div>
                    <hr>
                </div>
            </div>`
    $("#showProductDetail").html(html);
}

let addToCartAPI=async(id)=>{
    const variable = await ajax(REQUEST_TYPE.POST, API_LIST.ADDPRODUCTTOCART, { id: id });
    console.log(variable);
    if (variable.status == "success") {
        showProductDetails(variable.data);
    }
}
let addToCart = (id)=>{
    let email = window.localStorage.getItem("USER");
    addToCartAPI(id);
}

let clickOnBtn = () => {
    $(".cartButton").unbind("click");
    $(".cartButton").click(function () {
        let id = $(this).attr("id");
        addToCart(id);
    });

}

$(document).ready(() => {
    let href = window.location.pathname;
    href = href.substr(13);
    console.log(href);
    getdetails(href);
});