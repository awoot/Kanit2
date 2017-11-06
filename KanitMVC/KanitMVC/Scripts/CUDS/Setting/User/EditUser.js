$(document).ready(function () {
    //GetExpenseGroup();
    //GetCurrency();
    CheckAuthorization();
});
function GetDepartment() {
    var dataObject = { typeID: '015' };
    $.ajax({
        url: 'http://61.91.120.148/api/MasterService/',
        type: 'GET',
        dataType: 'json',
        async: false,
        data: dataObject,
        success: function (data) {
            data = JSON.parse(data);
            //alert('test');
            $('#cmbDepartment').find("option").remove();
            $.each(data.Table, function (i) {
                $('#cmbDepartment').append($('<option></option>').val(data.Table[i].ID).html(data.Table[i].Detail));
            });
            $('#cmbDepartment').find('option:first-child').attr('selected', true);
        },
        failure: function () {
            alert('Error');
        }
    });
}
function GetPosition() {
    var dataObject = { typeID: '016' };
    $.ajax({
        url: 'http://61.91.120.148/api/MasterService/',
        type: 'GET',
        dataType: 'json',
        async: false,
        data: dataObject,
        success: function (data) {
            data = JSON.parse(data);
            //alert('test');
            $('#cmbPosition').find("option").remove();
            $.each(data.Table, function (i) {
                $('#cmbPosition').append($('<option></option>').val(data.Table[i].ID).html(data.Table[i].Detail));
            });
            $('#cmbPosition').find('option:first-child').attr('selected', true);
        },
        failure: function () {
            alert('Error');
        }
    });
}
function GetQuotation() {
    var dataObject = { typeID: '017' };
    $.ajax({
        url: 'http://61.91.120.148/api/MasterService/',
        type: 'GET',
        dataType: 'json',
        async: false,
        data: dataObject,
        success: function (data) {
            data = JSON.parse(data);
            //alert('test');
            $('#cmbQuotation').find("option").remove();
            $.each(data.Table, function (i) {
                $('#cmbQuotation').append($('<option></option>').val(data.Table[i].ID).html(data.Table[i].Detail));
            });
            $('#cmbQuotation').find('option:first-child').attr('selected', true);
        },
        failure: function () {
            alert('Error');
        }
    });
}
function GetSecurityProfile() {
    $.ajax({
        url: 'http://61.91.120.148/api/SecurityProfile/',
        type: 'GET',
        async: false,
        dataType: 'json',
        async: false,
        success: function (data) {
            data = JSON.parse(data);
        $('#cmbSecurityProfile').find("option").remove();
            $.each(data.Table, function (i) {
                $('#cmbSecurityProfile').append($('<option></option>').val(data.Table[i].ID).html(data.Table[i].Profile));
            });
            $('#cmbSecurityProfile').find('option:first-child').attr('selected', true);
        },
        failure: function () {
            alert('Error');
        }
    });
}
function ControlEnable(Isview) {
    //var Isview = val;
    if (Isview) {
        document.getElementById("txtDetail").disabled = true;
        document.getElementById("txtPricelist").disabled = true;
        document.getElementById("txtSeq").disabled = true;
        document.getElementById("btnSave").disabled = true;
        document.getElementById("cmbExpenseGroup").disabled = true;
    }
}
function GetData(val) { 
    var dataObject = { ID: val}
    $.ajax(
   {
       url: 'http://61.91.120.148/api/User',
       type: 'GET',
       async: false,
       data: dataObject,
       datatype: 'json',
       success: function (data) {
           data = JSON.parse(data);
           GetDepartment();
           GetPosition();
           GetQuotation();
           GetSecurityProfile()
           //alert("First "+$("#cmbCurrency").val());
           //alert(data.Table[0].ExpenseGroup);
           $("#cmbDepartment").val(data.Table[0].Department);
           $("#cmbPosition").val(data.Table[0].Position);
           $("#cmbQuotation").val(data.Table[0].Quotation);
           $("#cmbSecurityProfile").val(data.Table[0].SecurityID);
           $("#txtUserName").val(data.Table[0].UserName);
           $("#txtFirstName").val(data.Table[0].FirstName);
           $("#txtLastName").val(data.Table[0].LastName);
           $("#txtEmail").val(data.Table[0].Email);
           $("#txtPassword").val(data.Table[0].Password);
           //alert("Last " + $("#cmbCurrency").val());
       },
       error: function (msg) {
           alert(msg);
       }

   });
}
function Update(val) {
    var SecurityID = parseInt($("#cmbSecurityProfile").find(":selected").val());
    var dataObject = { ID: val, UserName: $("#txtUserName").val(), Password: $("#txtPassword").val(), FirstName: $("#txtFirstName").val(), LastName: $("#txtLastName").val(), Email: $("#txtEmail").val(), Department: $("#cmbDepartment").find(":selected").val(), Position: $("#cmbPosition").find(":selected").val(), Quotation: $("#cmbQuotation").find(":selected").val(), SecurityID: SecurityID, EditBy: 2 };
        $.ajax(
        {
            url: 'http://61.91.120.148/api/User',
            type: 'PUT',
            async: false,
            data: dataObject,
            datatype: 'json',

            success: function (data) {
                //alert('Update is completed');
                Redirect();
            }
            ,
            error: function (msg) {
                alert(msg);
            }
        });
}
function Redirect() {
    window.location.href = "../User/IndexUser";
}
function convertFloat(str) {

    $(str).val($(str).val().replace(',', '')).formatNumber({ format: "#,###.00", locale: "us" });
}