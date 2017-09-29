var row_index = 0;//RowCal
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

    $(window).load(function () {
        //Income
        $('.cloneRowWorkFlowDetail').click(function () {
            $('.RowCal:last').find('td input[type=text]').eq(0).val('');
            $('.RowCal:last').find('td input[type=text]').eq(1).val('');
            //CalSum();
        });
    });
    $('.RowCal td:first').click(function () {
        row_index2 = $(this).parent().index();
    });
    $('#tblWorkFlow').dynoTable();
});
function SetRowIndex() {
    $('.RowCal td').click(function () {
        row_index = $(this).parent().index();
    });
}
function GetColval() {
    var dataObject = { typeID: '012' };
    $.ajax({
        url: 'http://localhost:13149/api/MasterService/',
        type: 'GET',
        dataType: 'json',
        async: false,
        data: dataObject,
        success: function (data) {
            data = JSON.parse(data);
            //alert('test');
            $.each(data.Table, function (i) {
                $('.cmbColval').append($('<option></option>').val(data.Table[i].ID).html(data.Table[i].Detail));
            });
            $('.cmbColval').find('option:first-child').attr('selected', true);
        },
        failure: function () {
            alert('Error');
        }
    });
}
function GetEquationval() {
    var dataObject = { typeID: '013' };
    $.ajax({
        url: 'http://localhost:13149/api/MasterService/',
        type: 'GET',
        dataType: 'json',
        async: false,
        data: dataObject,
        success: function (data) {
            data = JSON.parse(data);
            //alert('test');
            $.each(data.Table, function (i) {
                $('.cmbEquationval').append($('<option></option>').val(data.Table[i].ID).html(data.Table[i].Detail));
            });
            $('.cmbEquationval').find('option:first-child').attr('selected', true);
        },
        failure: function () {
            alert('Error');
        }
    });
}
function BrowseUser(ResultStep) {
    var flag = 0;
    //alert(ResultName);
    $('th').click(function () {
        var table = $(this).parents('table').eq(0)
        var rows = table.find('tr:gt(0)').toArray().sort(comparer($(this).index()))
        this.asc = !this.asc
        if (!this.asc) { rows = rows.reverse() }
        for (var i = 0; i < rows.length; i++) { table.append(rows[i]) }
    })
    function comparer(index) {
        return function (a, b) {
            var valA = getCellValue(a, index), valB = getCellValue(b, index)
            return $.isNumeric(valA) && $.isNumeric(valB) ? valA - valB : valA.localeCompare(valB)
        }
    }
    function getCellValue(row, index) { return $(row).children('td').eq(index).html() }

    //filter
    $("#txtSearchUser").keyup(function () {
        //$("#"+ResultName+"").find("tr").hide();
        $("#resultUser").find("tr").hide();
        var data = this.value.split(" ");
        var jo = $("#resultUser").find("tr");
        $.each(data, function (i, v) {
            //jo = jo.filter("*:contains('" + v + "')");
            jo = jo.filter(function () {
                return $(this).text().toLowerCase().indexOf(v.toLowerCase()) > -1;
            });
        });
        jo.show();

    }).focus(function () {
        this.value = "";
        $(this).css({ "color": "black" });
        $(this).unbind('focus');
    }).css({ "color": "#C0C0C0" });

    //------------------------------------ Custom ------------------------------------

    $.ajax(
    {
        url: 'http://localhost:13149/api/User/',
        type: 'GET',
        datatype: 'json',
        success: function (data) {
            data = JSON.parse(data);
            var html = '<tbody>';
            for (var i = 0; i < data.Table.length; i++) {
                //var date = new Date(data.Table[i].UpdateDate);
                html += '<tr>';
                html += '<td data-dismiss="modal">' + data.Table[i].RowNum + '</td>';
                html += '<td data-dismiss="modal" class="hidecolumn">' + data.Table[i].ID + '</td>';
                html += '<td data-dismiss="modal">' + data.Table[i].UserName + '</td>';
                html += '<td data-dismiss="modal">' + data.Table[i].FullName + '</td>';
                html += '<td data-dismiss="modal">' + data.Table[i].Email + '</td>';
                html += '<td data-dismiss="modal">' + data.Table[i].SecurityName + '</td>';
                html += '<td data-dismiss="modal" class="hidecolumn">' + data.Table[i].PositionName + '</td>';
                html += '</tr>';
            }
            html += '</tbody>';
            document.getElementById("resultUser").innerHTML = html;
            //flag = 1;
        },
        error: function (msg) {
            alert(msg)
        }
    });
    ////alert("Test");

    //if (ResultStep == 1) {
    //    alert("Step1");

    $("#resultUser").on("click", "tr", function (e) {
        if (ResultStep == '1') {
            //var User1;
            $("#txtUser1").val($(this).find("td:eq(3)").text());
            $("#hidUserID1").val($(this).find("td:eq(1)").text());
            $("#hidPositionName1").val($(this).find("td:eq(6)").text());
            ResultStep = 0;
        }
        if (ResultStep == '2') {
            $("#txtUser2").val($(this).find("td:eq(3)").text());
            $("#hidUserID2").val($(this).find("td:eq(1)").text());
            $("#hidPositionName2").val($(this).find("td:eq(6)").text());
            ResultStep = 0;
        }
        if (ResultStep == '3') {
            $("#txtUser3").val($(this).find("td:eq(3)").text());
            $("#hidUserID3").val($(this).find("td:eq(1)").text());
            $("#hidPositionName3").val($(this).find("td:eq(6)").text());
            ResultStep = 0;
        }
        if (ResultStep == '4') {
            $("#txtUser4").val($(this).find("td:eq(3)").text());
            $("#hidUserID4").val($(this).find("td:eq(1)").text());
            $("#hidPositionName4").val($(this).find("td:eq(6)").text());
            ResultStep = 0;
        }
        if (ResultStep == '5') {
            $("#txtUser5").val($(this).find("td:eq(3)").text());
            $("#hidUserID5").val($(this).find("td:eq(1)").text());
            $("#hidPositionName5").val($(this).find("td:eq(6)").text());
            ResultStep = 0;
        }
        if (ResultStep == '6') {
            $("#txtUser6").val($(this).find("td:eq(3)").text());
            $("#hidUserID6").val($(this).find("td:eq(1)").text());
            $("#hidPositionName6").val($(this).find("td:eq(6)").text());
            ResultStep = 0;
        }
    });
}
function AddRowWorkFlowDetail() {
    var dataObject = { typeID: '012' };
    $.ajax({
        url: 'http://localhost:13149/api/MasterService/',
        type: 'GET',
        dataType: 'json',
        //async: false,
        data: dataObject,
        success: function (data) {
            data = JSON.parse(data);
            //alert('test');
            $('.cmbColval:last').find("option").remove();
            $.each(data.Table, function (i) {
                $('.cmbColval:last').append($('<option></option>').val(data.Table[i].ID).html(data.Table[i].Detail));
            });
            $('.cmbColval:last').find('option:first-child').attr('selected', true);
        },
        failure: function () {
            alert('Error');
        }
    });

    var dataObject = { typeID: '013' };
    $.ajax({
        url: 'http://localhost:13149/api/MasterService/',
        type: 'GET',
        dataType: 'json',
        data: dataObject,
        //async: false,
        success: function (data) {
            data = JSON.parse(data);
            $('.cmbEquationval:last').find("option").remove();
            $.each(data.Table, function (i) {
                $('.cmbEquationval:last').append($('<option></option>').val(data.Table[i].ID).html(data.Table[i].Detail));
            });
            $('.cmbEquationval:last').find('option:first-child').attr('selected', true);
        },
        failure: function () {
            alert('Error');
        }
    });

    //BrowseUser();
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
function BindStepToCollumn() {

    $(".RowCal").each(function () {
        //alert("Test");
        //alert(row_index);
        var Step1 = $('.hidUserID1').val();
        var Step2 = $('.hidUserID2').val();
        var Step3 = $('.hidUserID3').val();
        var Step4 = $('.hidUserID4').val();
        var Step5 = $('.hidUserID5').val();
        var Step6 = $('.hidUserID6').val();

        //alert("Step1 " + Step1);
        //alert("Step2 " + Step2);
        $('.txtStep1').eq(row_index).val(Step1);
        $('.txtStep2').eq(row_index).val(Step2);
        $('.txtStep3').eq(row_index).val(Step3);
        $('.txtStep4').eq(row_index).val(Step4);
        $('.txtStep5').eq(row_index).val(Step5);
        $('.txtStep6').eq(row_index).val(Step6);

        var strDetail;
        var arrDetail = [];
        arrDetail.push($(".hidPositionName1").val());
        arrDetail.push($(".hidPositionName2").val());
        arrDetail.push($(".hidPositionName3").val());
        arrDetail.push($(".hidPositionName4").val());
        arrDetail.push($(".hidPositionName5").val());
        arrDetail.push($(".hidPositionName6").val());
        var arrDetail2 = arrDetail.filter(n=>n != '');
        strDetail = arrDetail2.join(" > ");
        $('.txtDetail').eq(row_index).val(strDetail);
    });

    $("#txtUser1").val('');
    $("#hidUserID1").val('');
    $("#hidPositionName1").val('');
    $("#txtUser2").val('');
    $("#hidUserID2").val('');
    $("#hidPositionName2").val('');
    $("#txtUser3").val('');
    $("#hidUserID3").val('');
    $("#hidPositionName3").val('');
    $("#txtUser4").val('');
    $("#hidUserID4").val('');
    $("#hidPositionName4").val('');
    $("#txtUser5").val('');
    $("#hidUserID5").val('');
    $("#hidPositionName5").val('');
    $("#txtUser6").val('');
    $("#hidUserID6").val('');
    $("#hidPositionName6").val('');
}
function SetCollumnToStep()
{
    SetRowIndex();
    $(".RowCal").each(function () {
        //alert("Test");
        //alert(row_index);
        var Step1 = $('.txtStep1').eq(row_index).val();
        var Step2 = $('.txtStep2').eq(row_index).val();
        var Step3 = $('.txtStep2').eq(row_index).val();
        var Step4 = $('.txtStep2').eq(row_index).val();
        var Step5 = $('.txtStep2').eq(row_index).val();
        var Step6 = $('.txtStep2').eq(row_index).val();

        var FullName1 = $('.txtFullName1').eq(row_index).val();
        var FullName2 = $('.txtFullName2').eq(row_index).val();
        var FullName3 = $('.txtFullName3').eq(row_index).val();
        var FullName4 = $('.txtFullName4').eq(row_index).val();
        var FullName5 = $('.txtFullName5').eq(row_index).val();
        var FullName6 = $('.txtFullName6').eq(row_index).val();

        $('#hidUserID1').val(Step1);
        $('#hidUserID2').val(Step2);
        $('#hidUserID3').val(Step3);
        $('#hidUserID4').val(Step4);
        $('#hidUserID5').val(Step5);
        $('#hidUserID6').val(Step6);

        $('#txtUser1').val(FullName1);
        $('#txtUser2').val(FullName2);
        $('#txtUser3').val(FullName3);
        $('#txtUser4').val(FullName4);
        $('#txtUser5').val(FullName5);
        $('#txtUser6').val(FullName6);
    });
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

           //alert(data.Table1.length);
           if (data.Table1.length > 0) {
               //alert("Test")
               $('.RowCal').remove();

               for (var j = 0; j < data.Table1.length; j++) {
                   $("#add-row").trigger("click");
                   //AddRowWorkFlowDetail();
                   //alert("tirigger");
               }
               //alert("test1");
               $('.RowCal:eq(' + data.Table1.length + ')').remove();
               GetColval();
               GetEquationval();
               //alert($('.cmbEquationval').val());
               //alert("Test2");
               //alert($('.RowCal td').length);
               $('.RowCal').each(function (i) {
                   //alert("test3");
                   //alert("RowNum "+data.Table1[i].RowNum);
                   $(this).find('.txtNo').val(data.Table1[i].RowNum);
                   $(this).find('.cmbColval').val(data.Table1[i].Col_val).change();
                   $(this).find('.cmbEquationval').val(data.Table1[i].Equation_val).change();
                   $(this).find('.txtCondval1').val(data.Table1[i].Cond_val1);
                   $(this).find('.txtCondval2').val(data.Table1[i].Cond_val2);
                   $(this).find('.txtStep1').val(data.Table1[i].Stap1);
                   $(this).find('.txtStep2').val(data.Table1[i].Stap2);
                   $(this).find('.txtStep3').val(data.Table1[i].Stap3);
                   $(this).find('.txtStep4').val(data.Table1[i].Stap4);
                   $(this).find('.txtStep5').val(data.Table1[i].Stap5);
                   $(this).find('.txtStep6').val(data.Table1[i].Stap6);

                   $(this).find('.txtFullName1').val(data.Table1[i].FullName1);
                   $(this).find('.txtFullName2').val(data.Table1[i].FullName2);
                   $(this).find('.txtFullName3').val(data.Table1[i].FullName3);
                   $(this).find('.txtFullName4').val(data.Table1[i].FullName4);
                   $(this).find('.txtFullName5').val(data.Table1[i].FullName5);
                   $(this).find('.txtFullName6').val(data.Table1[i].FullName6);
                   
                   var strDetail;
                   var arrDetail = [];
                   arrDetail.push(data.Table1[i].Position1);
                   arrDetail.push(data.Table1[i].Position2);
                   arrDetail.push(data.Table1[i].Position3);
                   arrDetail.push(data.Table1[i].Position4);
                   arrDetail.push(data.Table1[i].Position5);
                   arrDetail.push(data.Table1[i].Position6);
                   var arrDetail2 = arrDetail.filter(n=>n != '');
                   strDetail = arrDetail2.join(" > ");
                   $(this).find('.txtDetail').val(strDetail);
                   //$('.txtDetail').eq(row_index).val(strDetail);
               });
           }
       },
       error: function (msg) {
           alert(msg);
       }

   });
}
function Update(val) {
    var WorkFlowID = val
    var SDate = ChangeformatDate($("#txtStartDate").val(), 1);
    var EDate = ChangeformatDate($("#txtEndDate").val(), 1);
    var dataObject = { ID: WorkFlowID, FlowName: $("#txtFlowName").val(), FlowDetail: $("#txtFlowDetail").val(), Remark: $("#txtRemark").val(), StartDate: SDate, EndDate: EDate, EditBy: 1 };
        $.ajax(
        {
            url: 'http://localhost:13149/api/WorkFlow',
            type: 'PUT',
            async: false,
            data: dataObject,
            datatype: 'json',

            success: function (data) {
                //alert('Update is completed');
                //Redirect();
            }
            ,
            error: function (msg) {
                alert(msg);
            }
        });
        var dataObject = { ID: WorkFlowID };
        $.ajax(
                {
                    url: 'http://localhost:13149/api/WorkFlowDetail',
                    type: 'DELETE',
                    async: false,
                    data: dataObject,
                    datatype: 'json',
                    success: function (data) {
                    },
                    error: function (msg) {
                        alert(msg)
                    }
                });
        var dataObject = {};
        $(".RowCal").each(function () {
            dataObject.WorkFlowID = WorkFlowID;
            dataObject.Col_val = $(this).find('.cmbColval').find(":selected").val();
            dataObject.Equation_val = $(this).find('.cmbEquationval').find(":selected").val();
            dataObject.Cond_val1 = $(this).find(".txtCondval1").val();
            dataObject.Cond_val2 = $(this).find(".txtCondval2").val();
            dataObject.Stap1 = $(this).find(".txtStep1").val();
            dataObject.Stap2 = $(this).find(".txtStep2").val();
            dataObject.Stap3 = $(this).find(".txtStep3").val();
            dataObject.Stap4 = $(this).find(".txtStep4").val();
            dataObject.Stap5 = $(this).find(".txtStep5").val();
            dataObject.Stap6 = $(this).find(".txtStep6").val();
            dataObject.CreateBy = 1;
            dataObject.EditBy = 1;
            if ($(this).find(".txtCondval1").val() != '') {
                $.ajax(
                {
                    url: 'http://localhost:13149/api/WorkFlowDetail',
                    type: 'POST',
                    async: false,
                    data: dataObject,
                    datatype: 'json',
                    success: function (data) {

                    },
                    error: function (msg) {
                        alert(msg)
                    }
                });
            }
        });
        window.location.href = "../WorkFlow/IndexWorkFlow";
}
function Redirect() {
    window.location.href = "../WorkFlow/IndexWorkFlow";
}
function convertFloat(str) {

    $(str).val($(str).val().replace(',', '')).formatNumber({ format: "#,###.00", locale: "us" });
}