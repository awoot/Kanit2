var vm = {};

$(document).ready(function () {
    $("form").submit(function () { return false; });

    vm = kendo.observable({
        email: "",
        onSendEmail: function () {
            //alert("send email to " + vm.email);

            this.get("email");

            var dataObject = {
                email: this.get("email"),
                tmp: "tara"
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


            //$.ajax({
            //    url: 'http://localhost:13149/api/Company/',
            //    type: 'GET',
            //    datatype: 'json',
            //    success: function (data) {
            //        debugger;
            //    },
            //    error: function (msg) {
            //        alert(msg)
            //    }
            //});
        },
        onCancel: function () {
            document.location.href = COMMON.HostURL;
        }
    });

    kendo.bind($("#formContext"), vm);
});