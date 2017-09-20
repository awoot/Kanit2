var row_index = 0;//RowCal
$(document).ready(function () {
    CheckAuthorization();
    //$("#resultUser").on("click", "tr", function (e) {
    //    $("#txtUser1").val($(this).find("td:eq(3)").text());
    //    $("#hidUserID1").val($(this).find("td:eq(1)").text());
    //})
    //$("#resultUser2").on("click", "tr", function (e) {
    //    $("#txtUser2").val($(this).find("td:eq(3)").text());
    //    $("#hidUserID2").val($(this).find("td:eq(1)").text());
    //})

    $('#dtStartDate').datetimepicker({
        defaultDate: new Date(),
        format: 'DD/MM/YYYY'
    });
    $('#dtEndDate').datetimepicker({
        defaultDate: new Date(),
        format: 'DD/MM/YYYY'
    });
    GetColval();
    GetEquationval();

    $(window).load(function () {
        //Income
        $('.cloneRowWorkFlowDetail').click(function () {
            $('.RowCal:last').find('td input[type=text]').eq(0).val('');
            $('.RowCal:last').find('td input[type=text]').eq(1).val('');
            //CalSum();
        });
    });
});
$(document).on('click', '#close-preview', function () {
    $('.image-preview').popover('hide');
    // Hover befor close the preview
    $('.image-preview').hover(
        function () {
            $('.image-preview').popover('show');
        },
         function () {
             $('.image-preview').popover('hide');
         }
    );
});
$(function () {
    $('.RowCal td:first').click(function () {
        row_index = $(this).parent().index();
    });

    $('#tblWorkFlow').dynoTable();

    // Create the close button
    var closebtn = $('<button/>', {
        type: "button",
        text: 'x',
        id: 'close-preview',
        style: 'font-size: initial;',
    });
    closebtn.attr("class", "close pull-right");
    // Set the popover default content
    $('.image-preview').popover({
        trigger: 'manual',
        html: true,
        title: "<strong>Preview</strong>" + $(closebtn)[0].outerHTML,
        content: "There's no image",
        placement: 'bottom'
    });
    // Clear event
    $('.image-preview-clear').click(function () {
        $('.image-preview').attr("data-content", "").popover('show');
        $('.image-preview-filename').val("");
        $('.image-preview-clear').hide();
        $('.image-preview-input input:file').val("");
        $(".image-preview-input-title").text("Browse");
    });
    // Create the preview image
    $(".image-preview-input input:file").change(function () {
        var img = $('<img/>', {
            id: 'dynamic',
            width: 250,
            height: 200
        });
        var file = this.files[0];
        var reader = new FileReader();
        // Set preview image into the popover data-content
        reader.onload = function (e) {
            $(".image-preview-input-title").text("Change");
            $(".image-preview-clear").show();
            $(".image-preview-filename").val(file.name);
            img.attr('src', e.target.result);
            $(".image-preview").attr("data-content", $(img)[0].outerHTML).popover("show");
        }
        reader.readAsDataURL(file);
    });
});
function SetRowIndex() {
    $('.RowCal td').click(function () {
        row_index = $(this).parent().index();
    });
}
function GetColval()
{
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
        async: false,
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
        async: false,
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
function BindStepToCollumn()
{
    

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

        var arrDetail = [];
        arrDetail.push($(".hidPositionName1").val());
        arrDetail.push($(".hidPositionName2").val());
        arrDetail.push($(".hidPositionName3").val());
        arrDetail.push($(".hidPositionName4").val());
        arrDetail.push($(".hidPositionName5").val());
        arrDetail.push($(".hidPositionName6").val());
        alert(arrDetail);
        for (i = 0; i < arrDetail.length; ++i) {
            arrDetail[i] = arrDetail[i].replaceAll("/", ",")
        }
        alert(rate);
        
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
function CreateData() {
    // =============================== Create WorkFlow ===============================

    var SDate = ChangeformatDate($("#txtStartDate").val(), 1);
    var EDate = ChangeformatDate($("#txtEndDate").val(), 1);
    var WorkFlowID;
    //var Price = $("#txtPricelist").val().replace(',', '');
    //alert($("#cmbCurrency").find(":selected").val());
    var dataObject = { FlowName: $("#txtFlowName").val(), FlowDetail: $("#txtFlowDetail").val(), Remark: $("#txtRemark").val(), StartDate: SDate, EndDate: EDate, CreateBy: 1, EditBy: 1 };
    $.ajax(
    {
        url: 'http://localhost:13149/api/WorkFlow',
        type: 'POST',
        data: dataObject,
        async: false,
        datatype: 'json',
        success: function (data) {
            WorkFlowID = data;
            //alert('Created Successfully');
        },
        error: function (msg) { alert(msg); }
    });
    // =============================== Create WorkFlowDetail ===============================
    alert("WorkFlowID " + WorkFlowID);
    if (WorkFlowID > 0)
    {
        alert("Test");
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
    }
    window.location.href = "../WorkFlow/IndexWorkFlow";
}
function convertFloat(str) {
    
    $(str).val($(str).val().replace(',', '')).formatNumber({ format: "#,###.00", locale: "us" });
}
function Redirect() {
    window.location.href = "../WorkFlow/IndexWorkFlow";
}