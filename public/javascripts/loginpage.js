$(function () {
    $('#signupbtn').click(function(){
        var settings = {
          "async": true,
          "crossDomain": true,
          "url": "http://localhost:3000/auth/register",
          "method": "POST",
          "headers": {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          "data": {
            "email": "test@gmail.com",
            "password": "password123",
            "name": "test"
          }
        }

        $.ajax(settings).done(function (response) {
          console.log(response);
        });

    });
});
