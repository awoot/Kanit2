$(document).ready(function () {
    CheckAuthorization();
    //$('.imgadd').attr("style", "margin-left: 68%; margin-top: -2px;");
    //------------------------------------ Standard ------------------------------------
    //Sorting
    //$('#tableData').paging({ limit: 5 });
    var ShowAll = false;
    GetData(ShowAll);
    
});
function GetChecked(isCheck) {
    var ShowAll = isCheck.checked;
    GetData(ShowAll);
}
function GetData(val) {
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
    $("#txtSearchQuotation").keyup(function () {
        $("#resultQuotation").find("tr").hide();
        var data = this.value.split(" ");
        var jo = $("#resultQuotation").find("tr");
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
    var dataObject = { isLastVersion: val };
    $.ajax(
    {
        url: 'http://localhost:13149/api/Quotation/',
        type: 'GET',
        datatype: 'json',
        data: dataObject,
        success: function (data) {
            data = JSON.parse(data);
            var html = '<tbody>';
            for (var i = 0; i < data.Table.length; i++) {
                var quotDate = new Date(data.Table[i].QuotationDate);
                var warningDate = new Date(data.Table[i].WarningDate);
                html += '<tr>';
                html += '<td class="">' + data.Table[i].RowNum + '</td>';
                html += '<td class="">' + data.Table[i].Docver + '</td>';
                html += '<td class="">' + data.Table[i].QuotationNo + '</td>';
                html += '<td class="">' + data.Table[i].CompanyName + '</td>';
                html += '<td class="">' + quotDate.getDate() + '/' + (quotDate.getMonth() + 1) + '/' + quotDate.getFullYear() + '</td>';
                html += '<td class="">' + warningDate.getDate() + '/' + (warningDate.getMonth() + 1) + '/' + warningDate.getFullYear() + '</td>';
                html += '<td class="">' + data.Table[i].StateName + '</td>';
                html += '<td><div class="btn-group widthmax">';
                html += '<a class="btn btn-success" href="/Quotation/EditQuotation?id=' + data.Table[i].ID + '"><i class="icon_pencil-edit_alt"></i></a>';
                html += '<a class="btn btn-danger" data-toggle="modal" onclick="ConfirmDialog(' + " 'Delete'" + ',' + "'Quotation'" + ',' + data.Table[i].ID + ')" ><i class="icon_close_alt2"></i></a>';
                //html += '<a href="/ExpenseMaster/EditExpenseMaster?id=' + data.Table[i].ID + '" id="edit' + data.Table[i].ID + '" style="margin-right: 3px;">' + '<img src="/Images/edit.png" class="imgExpenseUpdate" /></a>';
                //html += '<a href="#" id="del' + data.Table[i].ID + '" onclick="ConfirmDialog(' + " 'Delete'" + ',' + "'ExpenseMaster'" + ',' + data.Table[i].ID + ')" style="margin-right: 5px;" >' + '<img src="/Images/delete.png" class="imgExpenseDelete" /></a>';
                //html += '<a href="/ExpenseMaster/EditExpenseMaster?id=' + data.Table[i].ID + '&IsView=' + true + '" id="edit' + data.Table[i].ID + '">' + '<img src="/Images/view.png" class="imgExpenseView" /></a>';
                html += '</div></td>';
                html += '</tr>';
            }
            html += '</tbody>';
            document.getElementById("resultQuotation").innerHTML = html;

        },
        error: function (msg) {
            alert(msg)
        }
    });
}
function RowDelete(id) {
    var dataObject = { ID: id, EditBy: localStorage['UserID'] };
    $.ajax(
        {
            url: 'http://localhost:13149/api/Quotation/Delete',
            type: 'DELETE',
            data: dataObject,
            datatype: 'json',

            success: function (result) {
                //alert('Delete is completed')
                window.location.href = "../Quotation/IndexQuotation";
            }
            ,
            error: function (msg) {
                alert(msg)
            }


        });
}