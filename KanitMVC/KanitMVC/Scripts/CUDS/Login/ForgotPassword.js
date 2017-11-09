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

            showLoading();

            $.ajax({
                url: COMMON.WebAPIHostURL + '/api/Login/SendEmailResetPassword',
                type: 'GET',
                data: dataObject,
                datatype: 'json',
                success: function (data) {
                    hideLoading();
                    alert("ระบบทำการส่ง email เพื่อใช้เปลียนรหัสผ่าน กรุณาตรวจสอบ email");
                    window.location.href = COMMON.WebHostURL + "/Login";
                },
                error: function (msg) {
                    hideLoading();
                    var err = JSON.parse(msg.responseText);
                    alert(err.ExceptionMessage);
                }
            });            
        },
        onCancel: function () {
            document.location.href = COMMON.WebHostURL;
        }
    });

    kendo.bind($("#formContext"), vm);
});