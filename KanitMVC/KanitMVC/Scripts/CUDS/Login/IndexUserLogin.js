$(document).ready(function () {

    localStorage['UserID'] = null;
    localStorage['UserName'] = null;
    localStorage['Password'] = null;
    localStorage['FirstName'] = null;
    localStorage['LastName'] = null;
    localStorage['FullName'] = null;

    $("#btnCancel").click(function () {
        $("#txtUserName").val("")
        $("#txtPassword").val("")
    });


    $('#txtUserName').keypress(function (e) {
        if (e.keyCode == 13) {  // detect the enter key
            $('#txtPassword').focus();
        }
    });
    $('#txtPassword').keypress(function (e) {
        if (e.keyCode == 13) {  // detect the enter key
            //$('#btnLogin').click();
            UserLogin();
        }
    });
});
function UserLogin() {
    //var userName = $("#txtUserName").val()
    //var Password = $("#txtPassword").val()
    var dataObject = { userName: $("#txtUserName").val() + '&' + $("#txtPassword").val() };

    $.ajax({
        url: 'http://localhost:13149/api/Login/',
        type: 'GET',
        async: false,
        data: dataObject,
        datatype: 'json',
        success: function (data) {
            data = JSON.parse(data);
            console.log(data);

            if (data != null && data.Table.length > 0) {

                if ($("#chkRememberMe:checked").length == 1) {
                };

                localStorage['UserID'] = data.Table[0].ID;
                localStorage['UserName'] = data.Table[0].UserName;
                localStorage['Password'] = data.Table[0].Password;
                localStorage['FirstName'] = data.Table[0].FirstName;
                localStorage['LastName'] = data.Table[0].LastName;
                localStorage['FullName'] = data.Table[0].FullName;

                FirstPage();
            }
            else {
                alert("Username is not found or invalid username or password");
            }

        },
        error: function (msg) {
            alert(msg)
        }
    });
}
function FirstPage() {
    //alert(localStorage['UserID']);
    console.log(dataObject);
    if (localStorage['UserID'] != undefined) {

        var dataObject = { UserID: String(localStorage['UserID']) };

        $.ajax({
            url: 'http://localhost:13149/api/CheckAuthorization',
            type: 'GET',
            async: false,
            data: dataObject,
            datatype: 'json',
            success: function (data) {
                data = JSON.parse(data);
                console.log(data);
                //alert(data.Table.length);
                var redirectUrl = "";
                for (var i = 0; i < data.Table.length; i++) {

                    //DashBoard
                    if (data.Table[i].MenuDetailID == "MN001") {
                        redirectUrl = "../Home/Index";
                        break;
                    }
                    //Quotation
                    else if (data.Table[i].MenuDetailID == "MN002") {
                        redirectUrl = "../Quotation/Index";
                        break;
                    }
                    //Product
                    else if (data.Table[i].MenuDetailID == "MN003") {
                        redirectUrl = "../Stock/Index";
                        break;
                    }
                    //Quotation
                    else if (data.Table[i].MenuDetailID == "MN004") {
                        redirectUrl = "../Quotation/Index";
                        break;
                    }
                    //Work Flow
                    else if (data.Table[i].MenuDetailID == "MN005") {
                        redirectUrl = "../WorkFlow/Index";
                        break;
                    }
                    //ExchangeRate
                    else if (data.Table[i].MenuDetailID == "MN006") {
                        redirectUrl = "../ExchangeRate/Index";
                        break;
                    }
                    //Security Profile
                    else if (data.Table[i].MenuDetailID == "MN007") {
                        redirectUrl = "../SecurityProfile/Index";
                        break;
                    }
                    //User
                    else if (data.Table[i].MenuDetailID == "MN008") {
                        redirectUrl = "../User/Index";
                        break;
                    }
                    else {
                        redirectUrl = "../Login/Index";
                    }
                }

                location.href = redirectUrl;
            },
            error: function (msg) {
                alert(msg)
            }
        });
    }
    else {
        location = "../Login/IndexLogin";
    }

}
//function GetUserName() {
//    document.getElementById("lblUserName").innerHTML = localStorage['UserName'];
//}

