$(document).ready(function () {
    CheckAuthorization();
    //GetExpenseGroup();
    //GetCurrency();
});
function GetAnnounceType() {
    var dataObject = { typeID: '019' };
    $.ajax({
        url: 'http://localhost:13149/api/MasterService/',
        type: 'GET',
        dataType: 'json',
        async: false,
        data: dataObject,
        success: function (data) {
            data = JSON.parse(data);
            //alert('test');
            $('#cmbAnnounceType').find("option").remove();
            $.each(data.Table, function (i) {
                $('#cmbAnnounceType').append($('<option></option>').val(data.Table[i].ID).html(data.Table[i].Detail));
            });
            $('#cmbAnnounceType').find('option:first-child').attr('selected', true);
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
       url: 'http://localhost:13149/api/Announce',
       type: 'GET',
       async: false,
       data: dataObject,
       datatype: 'json',
       success: function (data) {
           data = JSON.parse(data);
           GetAnnounceType();
           //alert("First "+$("#cmbAnnounceType").val());
           //var rate = AddComma(parseFloat(data.Table[0].Rate).toFixed(2));
           var warningDate = ChangeformatDate(data.Table[0].WarningDate, 0);
           //alert(data.Table[0].ExpenseGroup);
           $("#cmbAnnounceType").val(data.Table[0].AnnounceTypeID);
           $("#txtDescription").val(data.Table[0].Description);
           $("#txtWarningDate").val(warningDate);
           //alert("Last " + $("#cmbAnnounceType").val());
       },
       error: function (msg) {
           alert(msg);
       }

   });
}
function Update(val) {
    //var rate = $("#txtRate").val().replace(',', '');
    var warningDate = ChangeformatDate($("#txtWarningDate").val(), 1);
    var dataObject = { ID: val, Currency: $("#cmbAnnounceType").find(":selected").val(), Description: $("#txtDescription").val(), WarningDate: warningDate, EditBy: 2 };
        $.ajax(
        {
            url: 'http://localhost:13149/api/Announce',
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
    window.location.href = "../Announce/IndexAnnounce";
}
function convertFloat(str) {

    $(str).val($(str).val().replace(',', '')).formatNumber({ format: "#,###.00", locale: "us" });
}