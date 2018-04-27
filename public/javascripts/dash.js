$(function(){

// The ACTIVE AND JUICY AUCTIONS
    var settingsac = {
        "async": true,
        "crossDomain": true,
        "url": "/dashboard/active",
        "method": "GET",
        "headers": {}
    };

    $.ajax(settingsac).done(function(response){
        console.log(response);
        for (var i = 0; i < response.length; i++) {
            productName = response[i].prod_name;
            endTime = response[i].end_time;
            bidAmount = response[i].bid_amt;
            console.log(productName);
            console.log(endTime);
            console.log(bidAmount);
            var row = `<tr>
                <td class="cart_Status">
                    <p>Active</p>
                </td>
                <td class="cart_description">
                    <p> ${productName}</p> <!-- PLace holder for time to end-->
                </td>
                <td class="cart_Validity">
                    <p>${endTime}</p>
                </td>


                <td class="cart_price">
                    <div class="cart_price_button">
                        <p>${bidAmount}</p>
                    </div>
                </td>
            </tr>`;
            $('#biglol').append(row);
        }
    });

// The ALREADY PAID AUCTIONS
    var settingspd = {
        "async": true,
        "crossDomain": true,
        "url": "/dashboard/paid",
        "method": "GET",
        "headers": {}
    };
    $.ajax(settingspd).done(function(response){
        console.log(response);
        for (var i = 0; i < response.length; i++) {
            productName = response[i].prod_name;
            cost = response[i].sold_at_price;
            time = response[i].timestamp;
            console.log(productName);
            console.log(cost);
            console.log(time);
            var row = `<tr>
                <td class="cart_Status">
                    <p>Won and PAID</p>
                </td>
                <td class="cart_description">
                    <p> ${productName}</p> <!-- PLace holder for time to end-->
                </td>
                <td class="cart_Validity">
                    <p>${time}</p>
                </td>


                <td class="price">
                    <p>${cost}</p>
                </td>
            </tr>`;
            $('#paidlol').append(row);
        }
    });


// The NOT PAID auctions
    var settingsnp = {
        "async": true,
        "crossDomain": true,
        "url": "/dashboard/notpaid",
        "method": "GET",
        "headers": {}
    };
    $.ajax(settingsnp).done(function(response){
        console.log(response);
        for (var i = 0; i < response.length; i++) {
            productName = response[i].prod_name;
            time = response[i].timestamp;
            console.log(productName);
            var row = `<tr>
                <td class="cart_Status">
                    <p>PAY FAST</p>
                </td>
                </td>

                <td class="cart_description">
                    <p> ${productName}</p> <!-- PLace holder for time to end-->
                </td>
                <td class="cart_Validity">
                    <p>${time}</p>

                <td class="price">
                    <a href="/payment"><button type="submit" class="btn btn-default">Pay</button>
                </td>
            </tr>`;
            $('#evillol').append(row);
        }
    });

});
