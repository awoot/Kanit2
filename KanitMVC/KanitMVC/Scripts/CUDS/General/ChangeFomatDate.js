function ChangeformatDate(val, mode) {
    var ManDate = val;

    //Update
    if (mode == 1) {
        var dateParts = ManDate.split("/");
        if (dateParts.length != 3)
            return null;
        var year = dateParts[2];
        var month = dateParts[1];
        var day = dateParts[0];

        var d = new Date();
        d.setYear = year;
        d.setMonth = month;
        d.setDate = day;

        var mDate = year + '/' + month + '/' + day;
    }
    else {//GetData

        var JobDate = new Date(ManDate);
        mDate = $.datepicker.formatDate('dd/mm/yy', JobDate);

        //var dateParts = ManDate.split("/");
        //if (dateParts.length != 3)
        //    return null;
        //var year = dateParts[2];
        //var month = dateParts[1];
        //var day = dateParts[0];

        //var d = new Date();
        //d.setYear = year;
        //d.setMonth = month;
        //d.setDate = day;

        //var mDate = day + '/' + month + '/' + year;
        
    }
    return mDate;
}

function AddComma(val) {
    while (/(\d+)(\d{3})/.test(val.toString())) {
        val = val.toString().replace(/(\d+)(\d{3})/, '$1' + ',' + '$2');
    }
    return val;
}