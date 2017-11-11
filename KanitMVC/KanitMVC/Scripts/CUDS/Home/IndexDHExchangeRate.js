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
        $("#resultDHExchangeRate").find("tr").hide();
        var data = this.value.split(" ");
        var jo = $("#resultDHExchangeRate").find("tr");
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

    $.ajax({
        url: 'http://localhost:13149/api/ExchangeRate/',
        type: 'GET',
        datatype: 'json',
        success: function (data) {
            data = JSON.parse(data);
            //var html = '<tbody>';
            //for (var i = 0; i < data.Table.length; i++) {
            //    var date = new Date(data.Table[i].UpdateDate);
            //    html += '<tr>';
            //    html += '<td class="">' + data.Table[i].CurrencyName + '</td>';
            //    html += '<td class="">' + AddComma(parseFloat(data.Table[i].Rate).toFixed(2)) + '</td>';
            //    html += '</tr>';
            //}
            //html += '</tbody>';
            //document.getElementById("resultDHExchangeRate").innerHTML = html;

            var items = [];

            for (var i = 0; i < data.Table.length; i++) {
                if (data.Table[i].IsHistory) continue;

                data.Table[i].UpdateDate = new Date(data.Table[i].UpdateDate);
                items.push(data.Table[i]);
            }

            vm = kendo.observable({
                dataSource: items
            });

            //$('#tblExchangeRate').paging({
            //    limit: 30,
            //    rowDisplayStyle: 'block',
            //    activePage: 0,
            //    rows: []
            //});

            kendo.bind($("#tblDHExchangeRate"), vm);
        },
        error: function (msg) {
            alert(msg)
        }
    });


    $.ajax({
        url: 'http://localhost:13149/api/Common/InfoDashboard',
        type: 'GET',
        datatype: 'json',
        success: function (data) {
            data = JSON.parse(data);

            var vmInfoDashboard = kendo.observable(data);

            kendo.bind($("#divInfoDashBoard"), vmInfoDashboard);
        },
        error: function (msg) {
            alert(msg)
        }
    });


});