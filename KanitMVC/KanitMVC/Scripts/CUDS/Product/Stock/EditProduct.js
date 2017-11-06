$(document).ready(function () {
    CheckAuthorization();
    //GetExpenseGroup();
    //GetCurrency();
});
function GetUnit() {
    var dataObject = { typeID: '008' };
    $.ajax({
        url: 'http://localhost:13149/api/MasterService/',
        type: 'GET',
        dataType: 'json',
        async: false,
        data: dataObject,
        success: function (data) {
            data = JSON.parse(data);
            //alert('test');
            $('#cmbUnit').find("option").remove();
            $.each(data.Table, function (i) {
                $('#cmbUnit').append($('<option></option>').val(data.Table[i].ID).html(data.Table[i].Detail));
            });
            $('#cmbUnit').find('option:first-child').attr('selected', true);
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
       url: 'http://localhost:13149/api/Product',
       type: 'GET',
       async: false,
       data: dataObject,
       datatype: 'json',
       success: function (data) {
           data = JSON.parse(data);
           GetUnit();
           //alert("First "+$("#cmbCurrency").val());
           var standardCost = AddComma(parseFloat(data.Table[0].StandardCost).toFixed(2));
           var sellingPrice = AddComma(parseFloat(data.Table[0].SellingPrice).toFixed(2));
            $("#txtOrdNum").val(data.Table[0].OrdNumber); 
            $("#txtProductCode").val(data.Table[0].ProductCode);
            $("#txtProductDetail").val(data.Table[0].ProductDetail);
            $("#cmbUnit").val(data.Table[0].Unit);
            $("#txtRemain").val(data.Table[0].Remain); 
            $("#txtStandardCost").val(standardCost); 
            $("#txtSellingPrice").val(sellingPrice);
            $("#txtWarningStock").val(data.Table[0].WarningStock);
           
           //alert("Last " + $("#cmbCurrency").val());
       },
       error: function (msg) {
           alert(msg);
       }

   });
}
function Update(val) {
    var standardCost = $("#txtStandardCost").val().replace(',', '');
    var sellingPrice = $("#txtSellingPrice").val().replace(',', '');
    var dataObject = {
        ID: val, OrdNumber: $("#txtOrdNum").val(), ProductCode: $("#txtProductCode").val(),
        ProductDetail: $("#txtProductDetail").val(), Unit: $("#cmbUnit").find(":selected").val(),
        Remain: $("#txtRemain").val(), StandardCost: standardCost, SellingPrice: sellingPrice,
        WarningStock: $("#txtWarningStock").val(),
        EditBy: 2
    };
        $.ajax(
        {
            url: 'http://localhost:13149/api/Product',
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
    window.location.href = "../Product/IndexProduct";
}
function convertFloat(str) {

    $(str).val($(str).val().replace(',', '')).formatNumber({ format: "#,###.00", locale: "us" });
}