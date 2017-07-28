// Siddiqui Hera 
// jadrn061
// project #1

function logout() {
    $.ajax({
        type: "GET",
        url: "PUT_YOUR_PROTECTED_URL_HERE",
        dataType: 'json',
        async: true,
        username: "some_username_that_doesn't_exist",
        password: "any_stupid_password",
        data: '{ "comment" }'
    })
//In our case, we WANT to get access denied, so a success would be a failure.
.done(function(){
    alert('Error!')
})
//Likewise, a failure *usually* means we succeeded.
//set window.location to redirect the user to wherever you want them to go
.fail(function(){
    window.location = "/";
    });
}
