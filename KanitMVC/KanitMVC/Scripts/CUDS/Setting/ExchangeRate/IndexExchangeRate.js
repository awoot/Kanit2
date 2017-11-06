$(document).ready(function () {
    CheckAuthorization();
    //$('.imgadd').attr("style", "margin-left: 68%; margin-top: -2px;");
    //------------------------------------ Standard ------------------------------------
    //Sorting
    //$('#tableData').paging({ limit: 5 });
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
    $("#txtSearchExchangeRate").keyup(function () {
        $("#resultExchangeRate").find("tr").hide();
        var data = this.value.split(" ");
        var jo = $("#resultExchangeRate").find("tr");
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
        url: 'http://localhost:13149/api/ExchangeRate/',
        type: 'GET',
        datatype: 'json',
        success: function (data) {
            data = JSON.parse(data);
            var html = '<tbody>';
            for (var i = 0; i < data.Table.length; i++) {
                var date = new Date(data.Table[i].UpdateDate);
                html += '<tr>';
                html += '<td class="">' + data.Table[i].RowNum + '</td>';
                html += '<td class="">' + data.Table[i].CurrencyName + '</td>';
                html += '<td class="">' + AddComma(parseFloat(data.Table[i].Rate).toFixed(2)) + '</td>';
                html += '<td class="">' + date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + '</td>';
                html += '<td><div class="btn-group widthmax">';
                html += '<a class="btn btn-success" href="/ExchangeRate/EditExchangeRate?id=' + data.Table[i].ID + '"><i class="icon_pencil-edit_alt"></i></a>';
                html += '<a class="btn btn-danger" data-toggle="modal" onclick="ConfirmDialog(' + " 'Delete'" + ',' + "'ExchangeRate'" + ',' + data.Table[i].ID + ')" ><i class="icon_close_alt2"></i></a>';
                    //html += '<a href="/ExpenseMaster/EditExpenseMaster?id=' + data.Table[i].ID + '" id="edit' + data.Table[i].ID + '" style="margin-right: 3px;">' + '<img src="/Images/edit.png" class="imgExpenseUpdate" /></a>';
                    //html += '<a href="#" id="del' + data.Table[i].ID + '" onclick="ConfirmDialog(' + " 'Delete'" + ',' + "'ExpenseMaster'" + ',' + data.Table[i].ID + ')" style="margin-right: 5px;" >' + '<img src="/Images/delete.png" class="imgExpenseDelete" /></a>';
                    //html += '<a href="/ExpenseMaster/EditExpenseMaster?id=' + data.Table[i].ID + '&IsView=' + true + '" id="edit' + data.Table[i].ID + '">' + '<img src="/Images/view.png" class="imgExpenseView" /></a>';
                html += '</div></td>';
                html += '</tr>';
            }
            html += '</tbody>';
            document.getElementById("resultExchangeRate").innerHTML = html;
            
            $('#tblExchangeRate').paging({
                limit: 30,
                rowDisplayStyle: 'block',
                activePage: 0,
                rows: []
            });
        },
        error: function (msg) {
            alert(msg)
        }
    });
});
function RowDelete(id) {
    var dataObject = { ID: id, EditBy: localStorage['UserID'] };
    $.ajax(
        {
            url: 'http://localhost:13149/api/ExchangeRate/Delete',
            type: 'DELETE',
            data: dataObject,
            datatype: 'json',

            success: function (result) {
                //alert('Delete is completed')
                window.location.href = "../ExchangeRate/IndexExchangeRate";
            }
            ,
            error: function (msg) {
                alert(msg)
            }


        });
}