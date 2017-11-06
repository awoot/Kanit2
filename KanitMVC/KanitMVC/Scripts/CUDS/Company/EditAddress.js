$(document).ready(function () {
    CheckAuthorization();
    //GetExpenseGroup();
    //GetCurrency();
});
function GetCurrency() {
    var dataObject = { typeID: '011' };
    $.ajax({
        url: 'http://localhost:13149/api/MasterService/',
        type: 'GET',
        dataType: 'json',
        async: false,
        data: dataObject,
        success: function (data) {
            data = JSON.parse(data);
            //alert('test');
            $('#cmbCurrency').find("option").remove();
            $.each(data.Table, function (i) {
                $('#cmbCurrency').append($('<option></option>').val(data.Table[i].ID).html(data.Table[i].Detail));
            });
            $('#cmbCurrency').find('option:first-child').attr('selected', true);
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
       url: 'http://localhost:13149/api/ExchangeRate',
       type: 'GET',
       async: false,
       data: dataObject,
       datatype: 'json',
       success: function (data) {
           data = JSON.parse(data);
           GetCurrency();
           alert("First "+$("#cmbCurrency").val());
           var rate = AddComma(parseFloat(data.Table[0].Rate).toFixed(2));
           var updateDate = ChangeformatDate(data.Table[0].UpdateDate, 0);
           //alert(data.Table[0].ExpenseGroup);
           $("#cmbCurrency").val(data.Table[0].Currency);
           $("#txtRate").val(rate);
           $("#dtUpdateDate").val(updateDate);
           alert("Last " + $("#cmbCurrency").val());
       },
       error: function (msg) {
           alert(msg);
       }

   });
}
function Update(val) {
    var rate = $("#txtRate").val().replace(',', '');
    var dataObject = { ID: val, Currency: $("#cmbCurrency").find(":selected").val(), Rate: rate, EditBy: 2 };
        $.ajax(
        {
            url: 'http://localhost:13149/api/ExchangeRate',
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
    window.location.href = "../ExchangeRate/IndexExchangeRate";
}
function convertFloat(str) {

    $(str).val($(str).val().replace(',', '')).formatNumber({ format: "#,###.00", locale: "us" });
}