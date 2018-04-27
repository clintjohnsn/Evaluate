$(function () {
    $('#warning').hide();
    $('#success').hide();
    $('#anotheruser').hide()

    $('#signupbtn').click(function(){
        var name = $("#name").val();
        var emailid = $("#emailid").val();
        var password = $('#password').val();

        var settings = {
          "async": true,
          "crossDomain": true,
          "url": "/auth/register",
          "method": "POST",
          "headers": {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          "data": {
            "email": emailid,
            "password": password,
            "name": name
          }
        }

        $.ajax(settings).done(function (response) {
            if(response){
                if (response.affectedRows == 1){
                    $('#success').show();
                }else{
                    $('#anotheruser').show()
                }
            }else{
                $('#warning').show()
            }
        });

    });
});
