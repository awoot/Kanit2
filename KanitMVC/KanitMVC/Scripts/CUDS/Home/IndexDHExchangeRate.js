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

            var items = [];

            for (var i = 0; i < data.Table.length; i++) {
                if (data.Table[i].IsHistory) continue;

                data.Table[i].UpdateDate = new Date(data.Table[i].UpdateDate);
                items.push(data.Table[i]);
            }

            vm = kendo.observable({
                dataSource: items
            });

            kendo.bind($("#tblDHExchangeRate"), vm);
        },
        error: function (msg) {
            alert(msg)
        }
    });

    $.ajax({
        url: 'http://localhost:13149/api/Common/GetDashboard',
        type: 'GET',
        data: { userID: localStorage['UserID'] },
        datatype: 'json',
        success: function (data) {
            data = JSON.parse(data);

            //------------ DashBoard ---------------------
            var vmDashboard = kendo.observable(data);

            kendo.bind($("#divDashBoard"), vmDashboard);

            //------------- Carendar ----------------------
            var events = [];

            for (var i = 0; i < data.Table1.length; i++) {

                var item = data.Table1[i];

                item.FromDate = new Date(item.FromDate);
                item.ToDate = new Date(item.ToDate);

                var event = {
                    title: item.Title,
                    start: item.FromDate,
                    end: item.ToDate,
                    color: item.Color,
                    url: item.URL
                };

                events.push(event);
            }

            $('#calendar').fullCalendar({
                header: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'month,agendaWeek,agendaDay'
                },
                editable: false,
                events: events
            });

            //-------------  --------------------------
        },
        error: function (msg) {
            alert(msg)
        }
    });

    $.ajax({
        url: 'http://localhost:13149/api/Common/GetCalendar',
        type: 'GET',
        data: { userID: localStorage['UserID'] },
        datatype: 'json',
        success: function (data) {
            data = JSON.parse(data);


        },
        error: function (msg) {
            alert(msg);
        }
    });

    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    $('#dtFromDate').datetimepicker({
        format: 'DD/MM/YYYY',
        defaultDate: firstDay
    });
    $('#dtToDate').datetimepicker({
        format: 'DD/MM/YYYY',
        defaultDate: lastDay
    });

    updateMonitoring();
});

function updateMonitoring() {

    var fromDate = ChangeformatDate($("#txtFromDate").val(), 1);
    var toDate = ChangeformatDate($("#txtToDate").val(), 1);


    kendo.unbind($("#divMonitoring"));

    $.ajax({
        url: 'http://localhost:13149/api/Common/Monitoring',
        type: 'GET',
        data: { userID: localStorage['UserID'], fromDate: fromDate, toDate: toDate },
        datatype: 'json',
        success: function (data) {
            data = JSON.parse(data);

            var vm = kendo.observable({
                Items: data.Table,
                onSearch: updateMonitoring
            });

            kendo.bind($("#divMonitoring"), vm);
        },
        error: function (msg) {
            alert(msg);
        }
    });
}