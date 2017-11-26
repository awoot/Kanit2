var quoteID = 0;

function GetData(id) {
    quoteID = id;

    $.ajax({
        url: 'http://localhost:13149/api/Quotation/ViewQuotation/',
        type: 'GET',
        data: { id: quoteID, currentUserID: localStorage['UserID'] },
        datatype: 'json',
        success: function (data) {
            data = JSON.parse(data);
            init(data);
        },
        error: function (msg) {
            alert(msg);
        }
    });
}

var vm = {};

var currentUserID = parseInt(localStorage["UserID"]);

function init(data) {

    for (var i = 0; i < data.Table3.length; i++) {
        data.Table3[i].CreatedDate = new Date(data.Table3[i].CreatedDate);
    }

    data.Table[0].QuotationDate = new Date(data.Table[0].QuotationDate);
    data.Table[0].WarningDate = new Date(data.Table[0].WarningDate);

    var observable = {
        Header: data.Table[0],
        Detail: data.Table1,
        WorkFlow: data.Table2,
        History: data.Table3,
        onApprove: function (item) {
            if (!confirm("do you want approve?")) return;
            actionWorkFlow(item.ID, item.Step, "Approve");
        },
        onReject: function (item) {
            if (!confirm("do you want reject?")) return;
            actionWorkFlow(item.ID, item.Step, "Reject");
        },
        onRecall: function (item) {
            if (!confirm("do you want recall?")) return;
            actionWorkFlow(item.ID, item.Step, "Recall");
        },
        onSubmitQuote: function (item) {
            if (!confirm("do you  want submit quote?")) return;
            actionWorkFlow(item.ID, item.Step, "SubmitQuote");
        },
        onPending: function (item) {
            if (!confirm("do you want pending?")) return;
            actionWorkFlow(item.ID, item.Step, "Pending");
        },
        onWin: function (item) {
            if (!confirm("do you win?")) return;
            actionWorkFlow(item.ID, item.Step, "Win");
        },
        onLoss: function (item) {
            if (!confirm("do you loss?")) return;
            actionWorkFlow(item.ID, item.Step, "Loss");
        },
        onEdit: function () {
            if (!confirm("do you  want edit quote?")) return;
            window.location.href = "EditQuotation?id=" + quoteID;
        }
    };

    var canApprove = false;

    for (var i = 0; i < observable.WorkFlow.length; i++) {

        if (observable.WorkFlow[i].AssignedTo == localStorage['UserID']
            && observable.WorkFlow[i].CanApprove) {
            canApprove = true;
        }

        var item = observable.WorkFlow[i];
        if (item.AssignedDate != null) {
            item.AssignedDate = new Date(item.AssignedDate);
        }
        if (item.CompletedDate != null) {
            item.CompletedDate = new Date(item.CompletedDate);
        }

        item.onApprove = function () {
            observable.onApprove(this);
        };
        item.onReject = function () {
            observable.onReject(this);
        };
        item.onRecall = function () {
            observable.onRecall(this);
        };

        item.CanAction = item.Action == null; //&& currentUserID == item.AssignedTo;
    }

    switch (observable.Header.Status) {
        case "Created": {
            $("#btnEdit").show();
            $("#btnPending").show();
            $("#btnLoss").show();

            isShowMenu = true;
        } break;
        case "Inprogress": {
            $("#btnEdit").show();
            $("#btnPending").show();
            $("#btnLoss").show();

            isShowMenu = true;

        } break;
        case "Recall": {
            $("#btnEdit").show();
            $("#btnPending").show();
            $("#btnLoss").show();

            isShowMenu = true;

        } break;
        case "Reject": {
            $("#btnEdit").show();
            $("#btnPending").show();
            $("#btnLoss").show();

            isShowMenu = true;
        } break;
        case "Approve": {
            $("#btnPending").show();
            $("#btnSubmitQuote").show();
            $("#btnWin").show();
            $("#btnLoss").show();

            isShowMenu = true;
        } break;
    }

    switch (observable.Header.State) {
        case "Win":
        case "Loss": {
            isShowMenu = false;
        } break;
    }

    if (isShowMenu) {
        $("#divMenu").show();
    }

    //if (observable.Header.State == "Completed") {
    //    $("#divMenu").show();
    //    $("#btnSubmitQuote").show();
    //    $("#btnPending").show();
    //    $("#btnWin").show();
    //    $("#btnLoss").show();
    //} else {
    //    $("#divMenu").show();
    //    $("#btnRecall").show();
    //}



    //observable.CanRecall = observable.WorkFlow[1].AssignedTo == currentUserID;

    vm = kendo.observable(observable);

    kendo.bind($("#FormQuotation"), vm);

    if (!observable.CanRecall) {
        $("#btnRecall").remove();
    }
}

function actionWorkFlow(id, step, action) {
    var data = {
        QuotationID: quoteID,
        Step: step,
        QuotationWorkFlowID: id,
        Action: action,
        ActionBy: currentUserID,
        Reason: ""
    };

    $.ajax({
        url: 'http://localhost:13149/api/QuotationWorkFlowAction/',
        type: 'POST',
        data: data,
        datatype: 'json',
        success: function (data) {
            location.reload();
        },
        error: function (msg) {
            alert(msg);
        }
    });
}