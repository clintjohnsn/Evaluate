// Get the modal
$(function(){
    var MINIMUM_AMOUNT = 99;
    var modal = document.getElementById('myModal');

    // Get the button that opens the modal
    var bidbtn = document.getElementById("bidbtn");

    $('#warning').hide();
    $('#confirmation').hide();

    // When the user clicks on the button, open the modal
    bidbtn.onclick = function() {
        modal.style.display = "block";
    }



    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    $('#placebidbtn').click(function() {
        var bidamt = $('#enteredbid').val();
        if(!bidamt){
            $('#warning').show();
        }else if (parseInt(bidamt) < MINIMUM_AMOUNT){
            $('#warning').show();
        }else{
            $('#warning').hide();
            var auctionid  = $('#auctionid').html();
            var settings = {
                "async": true,
                "crossDomain": true,
                "url": "/products/bid",
                "method": "POST",
                "headers": {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                "data": {
                    "bid": bidamt,
                    "auctionid": auctionid
                }
            }

            $.ajax(settings).done(function (response) {
                if (response == 'user not logged in'){
                    window.location='/auth/login';
                }else if (response == 'banned user'){
                    alert('User is banned. You cannot bid when you are banned')
                }else if (response == 'bid amount is less than Minimum'){
                    console.log(response);
                }else if (response.affectedRows == 1) {
                    $('#confirmation').show();
                }
            });
        }
    });

})
