var vm = {};

$(document).ready(function () {
    $("form").submit(function () { return false; });

    vm = kendo.observable({
        email: "",
        onSendEmail: function () {

            this.get("email");

            var dataObject = {
                email: this.get("email")
            };

            $.ajax({
                url: COMMON.WebAPIHostURL + '/api/Login/SendEmailResetPassword',
                type: 'GET',
                data: dataObject,
                datatype: 'json',
                success: function (data) {
                    alert("please check email");
                },
                error: function (msg) {
                    var err = JSON.parse(msg.responseText);

                    alert(err.ExceptionMessage);
                }
            });            
        },
        onCancel: function () {
            document.location.href = COMMON.HostURL;
        }
    });

    kendo.bind($("#formContext"), vm);
});