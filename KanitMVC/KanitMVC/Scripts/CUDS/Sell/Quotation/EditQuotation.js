$(document).ready(function () {
    CheckAuthorization();
    $("#resultQuotation").on("click", "tr", function (e) {
        $("#txtCustomerName").val($(this).find("td:eq(2)").text());
        $("#hidCompID").val($(this).find("td:eq(1)").text());
        //alert($("#hidCompID").val());
    })
    $("#resultProduct").on("click", "tr", function (e) {
        $("#txtProductCodepopup").val($(this).find("td:eq(2)").text());
        $("#hidProductID").val($(this).find("td:eq(1)").text());
        alert($("#hidProductID").val());
    })
    //GetExpenseGroup();
    //GetCurrency();
});
function GetUnit() {
    var dataObject = { typeID: '008' };
    $.ajax({
        url: 'http://localhost:13149/api/MasterService/',
        type: 'GET',
        async: false,
        dataType: 'json',
        data: dataObject,
        success: function (data) {
            data = JSON.parse(data);
            //alert('test');
            $.each(data.Table, function (i) {
                $('#cmbUnit').append($('<option></option>').val(data.Table[i].ID).html(data.Table[i].Detail));
            });
            $('#cmbUnit').find('option:first-child').attr('selected', true);
        },
        failure: function () {
            alert('Error');
        }
    });
}
function GetCurrency() {
    var dataObject = { typeID: '011' };
    $.ajax({
        url: 'http://localhost:13149/api/MasterService/',
        type: 'GET',
        dataType: 'json',
        async: false,
        data: dataObject,
        success: function (data) {
            data = JSON.parse(data);
            //alert('test');
            $('#cmbCurrency').find("option").remove();
            $.each(data.Table, function (i) {
                $('#cmbCurrency').append($('<option></option>').val(data.Table[i].ID).html(data.Table[i].Detail));
                $('#txtRate').val(data.Table[i].Rate);
            });
            $('#cmbCurrency').find('option:first-child').attr('selected', true);
        },
        failure: function () {
            alert('Error');
        }
    });
}
function BrowseProduct() {
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
    $("#txtProductCodepopup").keyup(function () {
        $("#resultProduct").find("tr").hide();
        var data = this.value.split(" ");
        var jo = $("#resultProduct").find("tr");
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
        url: 'http://localhost:13149/api/Product/',
        type: 'GET',
        datatype: 'json',
        success: function (data) {
            data = JSON.parse(data);
            var html = '<tbody>';
            for (var i = 0; i < data.Table.length; i++) {
                var date = new Date(data.Table[i].UpdateDate);
                var sellingPrice = AddComma(parseFloat(data.Table[i].SellingPrice).toFixed(2));
                html += '<tr>';
                html += '<td data-dismiss="modal">' + data.Table[i].RowNum + '</td>';
                html += '<td data-dismiss="modal" class="hidecolumn">' + data.Table[i].ID + '</td>';
                html += '<td data-dismiss="modal">' + data.Table[i].ProductCode + '</td>';
                html += '<td data-dismiss="modal">' + data.Table[i].UnitName + '</td>';
                html += '<td data-dismiss="modal">' + sellingPrice + '</td>';
                html += '<td data-dismiss="modal">' + data.Table[i].Remain + '</td>';
                html += '</tr>';
            }
            html += '</tbody>';
            document.getElementById("resultProduct").innerHTML = html;

        },
        error: function (msg) {
            alert(msg)
        }
    });
}

function GetIncoTerm() {
    var dataObject = { typeID: '010' };
    $.ajax({
        url: 'http://localhost:13149/api/MasterService/',
        type: 'GET',
        async: false,
        dataType: 'json',
        data: dataObject,
        success: function (data) {
            data = JSON.parse(data);
            //alert('test');
            $.each(data.Table, function (i) {
                $('#cmbIncoTerm').append($('<option></option>').val(data.Table[i].ID).html(data.Table[i].Detail));
            });
            $('#cmbIncoTerm').find('option:first-child').attr('selected', true);
        },
        failure: function () {
            alert('Error');
        }
    });
}
function GetState() {
    var dataObject = { typeID: '009' };
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
                $('#cmbState').append($('<option></option>').val(data.Table[i].ID).html(data.Table[i].Detail));
            });
            $('#cmbState').find('option:first-child').attr('selected', true);
        },
        failure: function () {
            alert('Error');
        }
    });
}
function GetSeller() {
    //61= Sale
    var dataObject = { ID: 61 };
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
                $('#cmbSeller').append($('<option></option>').val(data.Table[i].ID).html(data.Table[i].Detail));
            });
            $('#cmbSeller').find('option:first-child').attr('selected', true);
        },
        failure: function () {
            alert('Error');
        }
    });
}
function BrowseQuotation() {
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

    $.ajax(
    {
        url: 'http://localhost:13149/api/Quotation/',
        type: 'GET',
        datatype: 'json',
        success: function (data) {
            data = JSON.parse(data);
            var html = '<tbody>';
            for (var i = 0; i < data.Table.length; i++) {
                html += '<tr>';
                html += '<td data-dismiss="modal">' + data.Table[i].RowNum + '</td>';
                html += '<td data-dismiss="modal" class="hidecolumn">' + data.Table[i].ID + '</td>';
                html += '<td data-dismiss="modal">' + data.Table[i].QuotationNameTH + '</td>';
                html += '<td data-dismiss="modal">' + data.Table[i].QuotationTypeName + '</td>';
                html += '<td data-dismiss="modal">' + data.Table[i].CustSegmentName + '</td>';
                html += '<td data-dismiss="modal">' + data.Table[i].CreditTermName + '</td>';
                html += '</tr>';
            }
            html += '</tbody>';
            document.getElementById("resultQuotation").innerHTML = html;

            //$('#tblQuotation').paging({
            //    limit: 30,
            //    rowDisplayStyle: 'block',
            //    activePage: 0,
            //    rows: []
            //});
        },
        error: function (msg) {
            alert(msg)
        }
    });
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
function GetData(val) { 
    var dataObject = { ID: val}
    $.ajax(
   {
       url: 'http://localhost:13149/api/Quotation',
       type: 'GET',
       async: false,
       data: dataObject,
       datatype: 'json',
       success: function (data) {
           data = JSON.parse(data);
           GetIncoTerm();
           GetState();
           GetSeller();
           var quotationDate = ChangeformatDate(data.Table[0].QuotationDate, 0);
           var warningDate = ChangeformatDate(data.Table[0].WarningDate, 0);
            $("#txtQuotationNo").val(data.Table[0].QuotationNo);
            $("#txtCustomerName").val(data.Table[0].QuotationName);
            $("#hidCompID").val(data.Table[0].CompID);
            $("#txtYourRef").val(data.Table[0].Ref);
            $("#txtQuotationDate").val(quotationDate);
            $("#txtValidity").val(data.Table[0].Validity);
            $("#txtDelivery").val(data.Table[0].DeliveryTime);
            $("#txtPaymentTerm").val(data.Table[0].PaymentTerm);
            $("#txtWarningDate").val(warningDate);
            $("#cmbIncoTerm").val(data.Table[0].IncoTerm);
            $("#txtIcoTermDetail").val(data.Table[0].IncoDetail);
            $("#txtDiscount").val(data.Table[0].Discount);
            $("#cmbSeller").val(data.Table[0].Seller);
            $("#cmbState").val(data.Table[0].State);
           //FileData: '';
           //CostSheet: '';
            $("#txtReason").val(data.Table[0].Reason);
            $("#txtRemark").val(data.Table[0].Remark);
           // =================================================================================== Description
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
            $("#txtSearchAddress").keyup(function () {
                $("#resultDescription").find("tr").hide();
                var data = this.value.split(" ");
                var jo = $("#resultDescription").find("tr");
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

            var html = '<tbody>';
            for (var i = 0; i < data.Table1.length; i++) {

                html += '<tr>';
                html += '<td class="">' + data.Table1[i].RowNum + '</td>';
                html += '<td class="">' + data.Table1[i].LineNum + '</td>';
                html += '<td class="">' + data.Table1[i].Description + '</td>';
                html += '<td class="">' + data.Table1[i].Quantity + '</td>';
                html += '<td class="">' + data.Table1[i].UnitName + '</td>';
                html += '<td class="">' + data.Table1[i].UnitPrice + '</td>';
                html += '<td class="">' + data.Table1[i].CurrencyName + '</td>';
                html += '<td class="">' + data.Table1[i].Amount + '</td>';
                html += '<td><div class="btn-group">';
                html += '<a class="btn btn-success" href="#ModalDescription" data-toggle="modal" onclick="GetDataDescription(' + data.Table1[i].ID + ')"><i class="icon_pencil-edit_alt"></i></a>';
                html += '<a class="btn btn-danger" data-toggle="modal" href="#" onclick="ConfirmDialog(' + " 'Delete'" + ',' + "'Quotation Description'" + ',' + data.Table1[i].ID + ')"><i class="icon_close_alt2"></i></a>';
                html += '</div></td>';
                html += '</tr>';
            }
            html += '</tbody>';
            document.getElementById("resultDescription").innerHTML = html;
       },
       error: function (msg) {
           alert(msg);
       }

   });
}
function GetDataDescription(QuoDetailID) {
    //alert("GetDataAddress");
    var quoDetailID = QuoDetailID;
    //alert("AddressID "+AddressID);
    if (quoDetailID > 0) {
        var dataObject = { ID: quoDetailID }
        $.ajax(
       {
           url: 'http://localhost:13149/api/QuotationDetail',
           type: 'GET',
           async: false,
           data: dataObject,
           datatype: 'json',
           success: function (data) {
               data = JSON.parse(data);
               GetUnit();
               GetCurrency();

               $("#hidQuoDetailID").val(data.Table[0].ID);
               $("#hidProductID").val(data.Table[0].ProductID);
               $("#txtDescription").val(data.Table[0].Description);
               $("#txtQuantity").val(data.Table[0].Quantity);
               $("#cmbUnit").val(data.Table[0].Unit);
               $("#txtUnitPrice").val(data.Table[0].UnitPrice);
               $("#cmbCurrency").val(data.Table[0].Currency);
               $("#txtRate").val(data.Table[0].Rate);
               $("#txtAmount").val(data.Table[0].Amount);
               $('#txtProductCodepopup').val(data.Table[0].ProductCode);
               
           },
           error: function (msg) {
               alert(msg);
           }

       });
    }
    else {
        //alert("New Address");
        
        $('#cmbUnit').find("option").remove();
        GetUnit();
        GetCurrency();
        $("#hidQuoDetailID").val('');
        $("#hidProductID").val('');
        $("#txtDescription").val('');
        $("#txtQuantity").val('');
        $("#cmbUnit").val('');
        $("#txtUnitPrice").val('');
        $("#cmbCurrency").val('');
        $("#txtRate").val('');
        $("#txtAmount").val('');

    }
}
function Update(val) {
    var discount = $("#txtDiscount").val().replace(',', '');
    var quotationDate = ChangeformatDate($("#txtQuotationDate").val(), 1);
    var warningDate = ChangeformatDate($("#txtWarningDate").val(), 1);
    $("#hidQuotID").val(val);
    var dataObject = {
        ID: val,
        QuotationNo: $("#txtQuotationNo").val(),
        CompID: $("#hidCompID").val(),
        Ref: $("#txtYourRef").val(),
        QuotationDate: quotationDate,
        Validity: $("#txtValidity").val(),
        DeliveryTime: $("#txtDelivery").val(),
        PaymentTerm: $("#txtPaymentTerm").val(),
        WarningDate: warningDate,
        IncoTerm: $("#cmbIncoTerm").find(":selected").val(),
        IncoDetail: $("#txtIcoTermDetail").val(),
        Discount: $("#txtDiscount").val(),
        Seller: $("#cmbSeller").find(":selected").val(),
        State: $("#cmbState").find(":selected").val(),
        //FileData: localStorage['FileData1'],
        //CostSheet: AttachPath,
        FileData: '',
        CostSheet: '',
        Reason: $("#txtReason").val(),
        Remark: $("#txtRemark").val(),
        CreateBy: 1, EditBy: 1
    };
        $.ajax(
        {
            url: 'http://localhost:13149/api/Quotation',
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
        window.location.href = "../Quotation/IndexQuotation";
}
function SaveQuotationDetail(val) {
    var ID = $("#hidQuoDetailID").val();
    var QuoteID = val;
    var ProductID = $("#hidProductID").val();
    //alert("ID " + ID);
    if (ID > 0) {
        //alert("Update");
        var dataObject = {
            ID: ID, Description: $("#txtDescription").val(), Quantity: $("#txtQuantity").val(),
            UnitPrice: $("#txtUnitPrice").val(), Unit: $("#cmbUnit").find(":selected").val(),
            Currency: $("#cmbCurrency").find(":selected").val(), ProductID: ProductID,
            Amount: $("#txtAmount").val(), EditBy: 2
        };
        $.ajax(
        {
            url: 'http://localhost:13149/api/QuotationDetail',
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
        window.location.href = "../Quotation/EditQuotation?id=" + QuoteID;
    }
    else {
        //alert("Insert");
        var dataObject = {
            QuoteID: QuoteID,
            Description: $("#txtDescription").val(), Quantity: $("#txtQuantity").val(),
            UnitPrice: $("#txtUnitPrice").val(), Unit: $("#cmbUnit").find(":selected").val(),
            Currency: $("#cmbCurrency").find(":selected").val(), ProductID: ProductID,
            Amount: $("#txtAmount").val(), CreateBy: 1, EditBy: 1
        };
        $.ajax(
        {
            url: 'http://localhost:13149/api/QuotationDetail',
            type: 'POST',
            data: dataObject,
            datatype: 'json',
            async: false,
            success: function (data) {
            },
            error: function (msg) { alert(msg); }
        });
        window.location.href = "../Quotation/EditQuotation?id=" + QuoteID;
    }

}
function Redirect() {
    window.location.href = "../Quotation/IndexQuotation";
}
function convertFloat(str) {

    $(str).val($(str).val().replace(',', '')).formatNumber({ format: "#,###.00", locale: "us" });
}