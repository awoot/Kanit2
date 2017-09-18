$(document).ready(function () {
    
    $("#btnCancel").click(function () {
        $("#txtUserName").val("")
        $("#txtPassword").val("")
    });


    $('#txtUserName').keypress(function (e) {
        if (e.keyCode == 13) {  // detect the enter key
            $('#btnLogin').click();
        }
    });
    $('#txtPassword').keypress(function (e) {
        if (e.keyCode == 13) {  // detect the enter key
            $('#btnLogin').click();
        }
    });
});
function UserLogin() {
    //var userName = $("#txtUserName").val()
    //var Password = $("#txtPassword").val()
    //alert(userName);
    //alert(Password);
    var dataObject = { userName: $("#txtUserName").val()+'&'+$("#txtPassword").val() };
    $.ajax(
    {
        //url: 'http://localhost:13149/api/Login/Authenticate/' + userName + '/' + Password + '',
        url: 'http://localhost:13149/api/Login/',
        type: 'GET',
        async: false,
        data: dataObject,
        datatype: 'json',
        success: function (data) {
            data = JSON.parse(data);
            console.log(data);

            //alert(data.ADUser.length);
            if (data != null && data.Table.length > 0)
            {
                    localStorage['UserID'] = data.Table[0].ID;
                    localStorage['UserName'] = data.Table[0].UserName;
                    localStorage['Password'] = data.Table[0].Password;
                    localStorage['FirstName'] = data.Table[0].FirstName;
                    localStorage['LastName'] = data.Table[0].LastName;
                    localStorage['FullName'] = data.Table[0].FullName;
                    //return Redirect("/ExchangeRate/IndexExchangeRate");
                //RedirectToAction("ExchangeRate", "IndexExchangeRate");
                    //return Redirect("~/Home/Index");
                //window.location.href = '@Url.Action("Index", "Home")';
                //location = 'www.google.com';
                //window.location.href = "../SecurityProfile/IndexSecurityProfile";
                    
                //window.location.href = "../Home/Index";
                    FirstPage();
            }
            else
            {
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
    var dataObject = { UserID: String(localStorage['UserID']) };
    console.log(dataObject);
    if (localStorage['UserID'] != undefined)
    {
        $.ajax(
    {
        url: 'http://localhost:13149/api/CheckAuthorization',
        type: 'GET',
        async: false,
        data: dataObject,
        datatype: 'json',
        success: function (data) {
            data = JSON.parse(data);
            console.log(data);
            //alert(data.Table.length);
            for (var i = 0; i < data.Table.length; i++) {

                //DashBoard
                    if (data.Table[i].MenuDetailID == "MN001") {
                        location = "../Home/DashBoard";
                        break;
                    }
                //Company
                    else if (data.Table[i].MenuDetailID == "MN002") {
                        location = "../Company/IndexCompany";
                        break;
                    }
                //Product
                    else if (data.Table[i].MenuDetailID == "MN003") {
                        location = "../Stock/IndexStock";
                        break;
                    }
                //Quotation
                    else if (data.Table[i].MenuDetailID == "MN004") {
                        location = "../Quotation/IndexQuotation";
                        break;
                    }
                //Work Flow
                    else if (data.Table[i].MenuDetailID == "MN005") {
                        location = "../WorkFlow/IndexWorkFlow";
                        break;
                    }
                //ExchangeRate
                    else if (data.Table[i].MenuDetailID == "MN006") {
                        location = "../ExchangeRate/IndexExchangeRate";
                        break;
                    }
                //Security Profile
                    else if (data.Table[i].MenuDetailID == "MN007") {
                        location = "../SecurityProfile/IndexSecurityProfile";
                        break;
                    }
                //User
                    else if (data.Table[i].MenuDetailID == "MN008") {
                        location = "../User/IndexUser";
                        break;
                    }
                    else {
                        location = "../Login/IndexLogin";
                    }
            }
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

