var quoteID = 0;

function GetData(id) {
    quoteID = id;

    $.ajax({
        url: 'http://localhost:13149/api/Quotation/ViewQuotation/' + quoteID,
        type: 'GET',
        data: { id: quoteID },
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

    var observable = {
        Header: data.Table[0],
        Detail: data.Table1,
        WorkFlow: data.Table2,
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
            if (!confirm("do you want submit quote?")) return;
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

        }
    };

    for (var i = 0; i < observable.WorkFlow.length; i++) {
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

        item.CanAction = item.Action == null; //&& currentUserID == item.AssignedTo;
    }

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