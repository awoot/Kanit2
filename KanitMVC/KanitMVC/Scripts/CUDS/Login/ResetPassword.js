var vm = {};

$(document).ready(function () {
    $("form").submit(function () { return false; });

    vm = kendo.observable({
        newPassword: "",
        verifyPassword: "",
        onResetPassword: function () {
            debugger;
            var newPassword = this.get("newPassword");
            var verifyPassword = this.get("verifyPassword");

            if (newPassword == "") {
                alert("โปรดระบุ New password");
                return;
            }

            if (newPassword != verifyPassword) {
                alert("Verify Password ไม่ตรงกับ New password");
                return;
            }

            var dataObject = {
                NewPassword: newPassword,
                VerifyPassword: verifyPassword,
                Token: getURLParameters("token")
            };

            $.ajax({
                url: COMMON.WebAPIHostURL + "/api/Login/ResetPassword",
                type: 'POST',
                data: dataObject,
                datatype: 'json',
                success: function (data) {
                    window.location.href = COMMON.WebHostURL + "/Login";
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