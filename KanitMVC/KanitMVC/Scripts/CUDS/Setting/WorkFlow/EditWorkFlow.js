$(document).ready(function () {
    CheckAuthorization();
    $('#dtStartDate').datetimepicker({
        format: 'DD/MM/YYYY'
    });
    $('#dtEndDate').datetimepicker({
        format: 'DD/MM/YYYY'
    });
    //GetExpenseGroup();
    //GetCurrency();
});
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
       url: 'http://localhost:13149/api/WorkFlow',
       type: 'GET',
       async: false,
       data: dataObject,
       datatype: 'json',
       success: function (data) {
           data = JSON.parse(data);
           var SDate = ChangeformatDate(data.Table[0].StartDate, 0);
           var EDate = ChangeformatDate(data.Table[0].EndDate, 0);
           //alert(SDate);
           //alert(EDate);
           //alert("First "+$("#cmbCurrency").val());
           //alert(data.Table[0].ExpenseGroup);
           $("#txtFlowName").val(data.Table[0].FlowName);
           $("#txtFlowDetail").val(data.Table[0].FlowDetail);
           $("#txtRemark").val(data.Table[0].Remark);
           $("#txtStartDate").val(SDate);
           $("#txtEndDate").val(EDate);
       },
       error: function (msg) {
           alert(msg);
       }

   });
}
function Update(val) {
    var SDate = ChangeformatDate($("#txtStartDate").val(), 1);
    var EDate = ChangeformatDate($("#txtEndDate").val(), 1);
    var dataObject = { ID: val,FlowName: $("#txtFlowName").val(), FlowDetail: $("#txtFlowDetail").val(), Remark: $("#txtRemark").val(), StartDate: SDate, EndDate: EDate,EditBy: 1 };
        $.ajax(
        {
            url: 'http://localhost:13149/api/WorkFlow',
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
    window.location.href = "../WorkFlow/IndexWorkFlow";
}
function convertFloat(str) {

    $(str).val($(str).val().replace(',', '')).formatNumber({ format: "#,###.00", locale: "us" });
}