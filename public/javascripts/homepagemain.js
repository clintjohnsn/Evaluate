$(function() {
    //no of the page, initially 1
    var PAGE_NO = 1;
    //track the current category
    var CATEGORYID = 0;

    //make a GET request to get auctions for page 1
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": `/browse/p/${PAGE_NO}`,
        "method": "GET",
        "headers": {}
    };

    $.ajax(settings).done(function(response) {
        renderCards(response);
    });

    //make a GET request to get categories
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "/getcategories",
        "method": "GET",
        "headers": {}
    };
    $.ajax(settings).done(function(response) {
        for (var i = 0; i < response.length; i++) {
            cat_id = response[i].cat_id;
            cat_name = response[i].cat_name;
            var row = `<div class="panel panel-default">
                        <div class="panel-heading">
                            <h4 class="panel-title">
                                <a data-toggle="collapse" href="#" data-parent="#accordian" class ="category_class" id="${cat_id}">
                                    <span class="badge pull-right"><i class="fa fa-plus"></i></span>
                                    ${cat_name}
                                </a>
                            </h4>
                        </div>
                    </div>`;
            $('#accordian').append(row);
        }
        //GET ITEMS BY CATEGORY
        $('.category_class').click(function() {
            CATEGORYID = $(this).attr('id');
            makeBrowseReq();
        });

    });

    function makeBrowseReq(){
        if (CATEGORYID == 0) {
            url = `/browse/p/${PAGE_NO}`
        } else {
            url = `/browsebycategory/cid/${CATEGORYID}/p/${PAGE_NO}`
        }
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": url,
            "method": "GET",
            "headers": {}
        };
        $.ajax(settings).done(function(response) {
            renderCards(response);
        });
    }

    $('.pagination li a').click(function () {
        PAGE_NO = $(this).html()
        makeBrowseReq();
    });


    function renderCards(response) {
        $('#featured_items').html("");
        for (var i = 0; i < response.length; i++) {
            var card = `<div class="col-sm-4">
                        <div class="product-image-wrapper">
                            <div class="single-products">
                                <div class="productinfo text-center">
                                    <img src=${response[i].image} alt="" height="300" width="240"/>
                                    <h2 id = ${response[i].active_auctions_id} >${response[i].prod_name}</h2>
                                    <p> Bid Now! </p>
                                </div>
                                <div class="product-overlay">
                                    <div class="overlay-content">

                                        <h2>${response[i].prod_name}</h2>
                                        <p>Sold By:${response[i].seller_name}</p>
                                        <p>Auction ends: ${response[i].end_time}</p>
                                        <a href="/products/pid/${response[i].prod_id}" class="btn btn-default add-to-cart"><i class="fa fa-shopping-cart"></i>Go to product</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`;
            $('#featured_items').append(card);
        }
    }

});
