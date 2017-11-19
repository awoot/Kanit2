var vm = {};

var dataSourceUnit = [];
var dataSourceExchangeRage = [];

var quoteID = null;


function form_onInit(id) {
    quoteID = id;

    CheckAuthorization();
    $("#resultCompany").on("click", "tr", function (e) {
        $("#txtCustomerName").val($(this).find("td:eq(2)").text());
        $("#hidCompID").val($(this).find("td:eq(1)").text());
        //alert($("#hidCompID").val());
    })

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

    //
    $('#cmbCurrency').on("change", function (e) {
        var detail = vm.get("Detail");
        for (var i = 0; i < detail.length; i++) {
            detail[i].trigger("change", { field: "UnitPrice" });
            detail[i].trigger("change", { field: "Amount" });
            detail[i].trigger("change", { field: "_UnitPrice" });
        }

    });

    //Get Unit
    $.ajax({
        url: 'http://localhost:13149/api/MasterService/',
        type: 'GET',
        async: false,
        dataType: 'json',
        data: { typeID: '008' },
        success: function (data) {
            data = JSON.parse(data);

            dataSourceUnit = data.Table;
        },
        failure: function () {
            alert('Error');
        }
    });

    //Get ExchangeRate
    $.ajax({
        url: 'http://localhost:13149/api/ExchangeRate/',
        type: 'GET',
        async: false,
        datatype: 'json',
        success: function (data) {
            data = JSON.parse(data);
            var items = [];

            for (var i = 0; i < data.Table.length; i++) {
                if (data.Table[i].IsHistory) continue;

                data.Table[i].UpdateDate = new Date(data.Table[i].UpdateDate);
                items.push(data.Table[i]);
            }

            dataSourceExchangeRage = items;
        },
        error: function (msg) {
            alert(msg)
        }
    });

    GetData(id);
}

$(document).ready(function () {

    $("#btnUploadFile").on("click", function () {
        var data = new FormData();
        var files = $("#fileUpload").get(0).files;
        // Add the uploaded image content to the form data collection 
        if (files.length > 0) {
            data.append("UploadedImage", files[0]);
        }

        data.append("quoteID", quoteID);
        // Make Ajax request with the contentType = false, and procesDate = false 
        var ajaxRequest = $.ajax({
            type: "POST",
            url: COMMON.WebAPIHostURL + "/api/Common/UploadFile",
            contentType: false,
            processData: false,
            data: data
        });
        ajaxRequest.done(function (xhr, textStatus) {
            var data = JSON.parse(xhr);

            $("#costSheetURL").attr("href", data.CostSheet);
            $("#txtCost1").text(kendo.toString(parseFloat(data.Cost1), "n"));
            $("#txtSellPrice").text(kendo.toString(parseFloat(data.SellPrice), "n"));
            // Do other operation 
        });
    });

});

function bindProductDetail(quotation, items) {
    var isBindComplete = false;

    var dataSource = {
        Detail: [],
        Summary: [],
        onAddDetail: function (e, data) {
            var detail = vm.get("Detail");

            var tmp = {
                No: detail.length + 1,
                LineNo: "",
                Product: null,
                Description: "",
                Quantity: 0,
                _UnitPrice: 0,
                Discount: 0,
                Unit: "",
                DataSourceUnit: dataSourceUnit,
                onChangeProduct: function (e) {
                    var item = this;

                    vm.onSelectProduct(item);

                    this.trigger("change", { field: "UnitPrice" });
                    this.trigger("change", { field: "Amount" });
                    this.trigger("change", { field: "_UnitPrice" });
                },
                onChangeUnitPrice: function (e) {
                    this.trigger("change", { field: "Amount" });
                },
                onDelete: function (e) {
                    vm.onDeleteDetail(this);
                },
                Amount: function () {
                    var amont = this.Quantity * this._UnitPrice;
                    this._Amount = amont.toFixed(2) * 1.0;

                    if (isNaN(this._Amount)) this._Amount = 0;

                    vm.trigger("change", { field: "SubTotal" });
                    vm.trigger("change", { field: "Total" });
                    vm.trigger("change", { field: "VatValue" });
                    vm.trigger("change", { field: "NetTotal" });

                    return this._Amount;
                },
                UnitPrice: function (e) {
                    if (!isBindComplete) return this._UnitPrice;

                    if (this.Product == null) return;

                    var fromRate = this.Product.Currency * 1;
                    var toRate = $("#cmbCurrency").val() * 1;

                    price = ExchangeRate(fromRate, toRate, this.Product.StandardCost)

                    this._UnitPrice = (price).toFixed(2) * 1.0;

                    return this._UnitPrice;
                },
                onUpdateAmount: function () {
                    this.trigger("change", { field: "Amount" });
                }
            };

            if (typeof (data) != "undefined") {
                tmp.Product = {
                    ID: data.ProductID,
                    ProductCode: data.ProductCode,
                    Unit: data.Unit,
                    StandardCost: data.UnitPrice,
                    UnitName: data.UnitName,
                    Currency: data.Currency
                };

                tmp.Description = data.Description;

                tmp.LineNo = data.LineNum;
                tmp._UnitPrice = data.UnitPrice;
                tmp.Quantity = data.Quantity;
            }

            detail.push(tmp);
        },
        onSelectProduct: function (item) {
            if (item.Product == null) return;

            var detail = vm.get("Detail");

            for (var i = 0; i < detail.length; i++) {
                if (detail[i].uid == item.uid) {
                    vm.set("Detail[" + i + "].Description", item.Product.ProductDetail);
                    break;
                }
            }
        },
        onDeleteDetail: function (item) {
            var detail = vm.get("Detail");

            var temp = [];

            var runNo = 1;

            for (var i = 0; i < detail.length; i++) {
                if (detail[i].uid == item.uid) continue;

                detail[i].No = runNo++;

                temp.push(detail[i]);
            }

            vm.set("Detail", []);
            vm.set("Detail", temp);
        },
        Discount: quotation.Discount,
        Vat: quotation.Vat,
        VatValue: function () {
            var _vat = $("#cmbVat").find(":selected").text();
            this._VatValue = this._Total * (_vat / 100);
            return this._VatValue;
        },
        SubTotal: function () {
            var detail = vm.get("Detail");

            var sum = 0;

            for (var i = 0; i < detail.length; i++) {
                sum += detail[i]._Amount;
            }

            this._SubTotal = sum;

            return this._SubTotal;
        },
        Total: function () {
            this._Total = this._SubTotal - this.Discount;

            return this._Total;
        },
        NetTotal: function () {
            this._NetTotal = this._Total + this._VatValue;
            return this._NetTotal;
        },
        onChangeVat: function () {
            this.trigger("change", { field: "Total" });
            this.trigger("change", { field: "VatValue" });
            this.trigger("change", { field: "NetTotal" });
        },
        onChangeDiscount: function () {
            this.trigger("change", { field: "Total" });
            this.trigger("change", { field: "VatValue" });
            this.trigger("change", { field: "NetTotal" });
        }
    };

    vm = kendo.observable(dataSource);

    for (var j = 0; j < items.length; j++) {
        dataSource.onAddDetail(null, items[j]);
    }


    kendo.bind($("#divProductDetail"), vm);

    isBindComplete = true;
}

function ExchangeRate(from, to, value) {
    var fromRate = {};
    var toRate = {};

    for (var i = 0; i < dataSourceExchangeRage.length; i++) {
        if (from == dataSourceExchangeRage[i].Currency) {
            fromRate = dataSourceExchangeRage[i];
        }
        if (to == dataSourceExchangeRage[i].Currency) {
            toRate = dataSourceExchangeRage[i];
        }
    }

    var baseValue = value * fromRate.Rate;

    return baseValue / toRate.Rate;
}

function BrowseCompany() {
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
    $("#txtSearchCompany").keyup(function () {
        $("#resultCompany").find("tr").hide();
        var data = this.value.split(" ");
        var jo = $("#resultCompany").find("tr");
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
            url: 'http://localhost:13149/api/Company/',
            type: 'GET',
            datatype: 'json',
            success: function (data) {
                data = JSON.parse(data);
                var html = '<tbody>';
                for (var i = 0; i < data.Table.length; i++) {
                    html += '<tr>';
                    html += '<td data-dismiss="modal">' + data.Table[i].RowNum + '</td>';
                    html += '<td data-dismiss="modal" class="hidecolumn">' + data.Table[i].ID + '</td>';
                    html += '<td data-dismiss="modal">' + data.Table[i].CompanyNameTH + '</td>';
                    html += '<td data-dismiss="modal">' + data.Table[i].CompanyTypeName + '</td>';
                    html += '<td data-dismiss="modal">' + data.Table[i].CustSegmentName + '</td>';
                    html += '<td data-dismiss="modal">' + data.Table[i].CreditTermName + '</td>';
                    html += '</tr>';
                }
                html += '</tbody>';
                document.getElementById("resultCompany").innerHTML = html;

                //$('#tblCompany').paging({
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
//function GetCurrency() {
//    //var dataObject = { typeID: '011' };
//    $.ajax({
//        url: 'http://localhost:13149/api/ExchangeRate/',
//        type: 'GET',
//        dataType: 'json',
//        async: false,
//        //data: dataObject,
//        success: function (data) {
//            data = JSON.parse(data);
//            //alert('test');
//            $('#cmbCurrency').find("option").remove();
//            $.each(data.Table, function (i) {
//                $('#cmbCurrency').append($('<option></option>').val(data.Table[i].ID).html(data.Table[i].CurrencyName));
//            });
//            $('#cmbCurrency').find('option:first-child').attr('selected', true);
//            GetRate();
//        },
//        failure: function () {
//            alert('Error');
//        }
//    });
//}
function GetRate() {
    var CurrencyID = $('#cmbCurrency:last').find(":selected").val();
    var dataObject = { ID: parseInt(CurrencyID) };
    $.ajax({
        url: 'http://localhost:13149/api/MasterService/GetRate/',
        type: 'GET',
        dataType: 'json',
        //async: false,
        data: dataObject,
        success: function (data) {
            data = JSON.parse(data);
            var rate = AddComma(parseFloat(data.Table[0].Rate).toFixed(2));
            $('#txtRate').val(rate);
            CalAmount();
        },
        failure: function () {
            alert('Error');
        }
    });
}
function CalAmount() {
    //alert("test");
    var UnitPrice = $("#txtUnitPrice").val().replace(',', '');
    //alert(UnitPrice);
    var Rate = $("#txtRate").val().replace(',', '');
    //alert(Rate);
    var Amount = (UnitPrice * Rate)
    Amount = AddComma(parseFloat(Amount).toFixed(2));
    //alert(Amount);
    $("#txtAmount").val(Amount);
}
//function CalFooter()
//{
//    var total = 0;
//    var SubTotal = 0;
//    var Discount = 0;
//    //alert("calsum");
//    $(".RowCal").each(function () {
//        var qty = $(this).find(".txtDetailAmount").val().replace(',', '');
//        var price = $(this).find(".UnitPrice").val().replace(',', '');
//        var amount = qty * price;
//        $(this).find('.Amount').val(amount);
//        total = total + parseFloat($(this).find('.Amount').val());

//    });
//}
function GetVat() {
    var dataObject = { typeID: '018' };
    $.ajax({
        url: 'http://localhost:13149/api/MasterService/',
        type: 'GET',
        async: false,
        dataType: 'json',
        data: dataObject,
        success: function (data) {
            data = JSON.parse(data);
            //alert('test');
            $('#cmbVat').find("option").remove();
            $.each(data.Table, function (i) {
                //$('#cmbVat').append($('<option></option>').val(data.Table[i].ID).html(data.Table[i].Detail));
                $('#cmbVat').append($('<option></option>').val(data.Table[i].ID).html(data.Table[i].Detail));
            });
            $('#cmbVat').find('option:first-child').attr('selected', true);
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


function GetCurrency() {
    var dataObject = { typeID: '011' };
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
                $('#cmbCurrency').append($('<option></option>').val(data.Table[i].ID).html(data.Table[i].Detail));
            });
            $('#cmbCurrency').find('option:first-child').attr('selected', true);
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

function GetDocversion() {
    var x;
    x = parseInt($("#hidDocver").val());
    var Docver = x + 1;

    $("#hidDocver").val(Docver);
    document.getElementById("verNo").innerHTML = "(" + Docver + ")";
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
    var dataObject = { ID: val }
    $.ajax(
        {
            url: 'http://localhost:13149/api/Quotation/Get/' + val,
            type: 'GET',
            async: false,
            data: dataObject,
            datatype: 'json',
            success: function (data) {
                data = JSON.parse(data);
                GetCurrency();
                GetIncoTerm();
                GetState();
                GetSeller();
                GetVat();
                var quotationDate = ChangeformatDate(data.Table[0].QuotationDate, 0);
                var warningDate = ChangeformatDate(data.Table[0].WarningDate, 0);
                $("#txtQuotationNo").val(data.Table[0].QuotationNo);
                $("#txtCustomerName").val(data.Table[0].CompanyName);
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
                $("#cmbCurrency").val(data.Table[0].Currency);

                $("#costSheetURL").attr("href", data.Table[0].CostSheet);
                $("#txtCost1").text(kendo.toString(data.Table[0].Cost1, "n"));
                $("#txtSellPrice").text(kendo.toString(data.Table[0].SellPrice, "n"));

                kendo.toString(data.Cost1, "n")

                //FileData: '';
                //CostSheet: '';
                $("#txtReason").val(data.Table[0].Reason);
                $("#txtRemark").val(data.Table[0].Remark);
                //alert(data.Table[0].Vat);
                $("#cmbVat").val(data.Table[0].Vat);
                //alert("Docver "+data.Table[0].Docver);
                $("#hidDocver").val(data.Table[0].Docver);
                document.getElementById("verNo").innerHTML = "(" + data.Table[0].Docver + ")";
                // =================================================================================== Description


                bindProductDetail(data.Table[0], data.Table1);



                //if (data.Table1.length > 0) {
                //    $('th').click(function () {
                //        var table = $(this).parents('table').eq(0)
                //        var rows = table.find('tr:gt(0)').toArray().sort(comparer($(this).index()))
                //        this.asc = !this.asc
                //        if (!this.asc) { rows = rows.reverse() }
                //        for (var i = 0; i < rows.length; i++) { table.append(rows[i]) }
                //    })
                //    function comparer(index) {
                //        return function (a, b) {
                //            var valA = getCellValue(a, index), valB = getCellValue(b, index)
                //            return $.isNumeric(valA) && $.isNumeric(valB) ? valA - valB : valA.localeCompare(valB)
                //        }
                //    }
                //    function getCellValue(row, index) { return $(row).children('td').eq(index).html() }

                //    //filter
                //    $("#txtSearchAddress").keyup(function () {
                //        $("#resultDescription").find("tr").hide();
                //        var data = this.value.split(" ");
                //        var jo = $("#resultDescription").find("tr");
                //        $.each(data, function (i, v) {
                //            //jo = jo.filter("*:contains('" + v + "')");
                //            jo = jo.filter(function () {
                //                return $(this).text().toLowerCase().indexOf(v.toLowerCase()) > -1;
                //            });
                //        });
                //        jo.show();

                //    }).focus(function () {
                //        this.value = "";
                //        $(this).css({ "color": "black" });
                //        $(this).unbind('focus');
                //    }).css({ "color": "#C0C0C0" });

                //    bindProductDetail(data.Table[0], data.Table1);

                //    //var html = '<tbody>';
                //    //for (var i = 0; i < data.Table1.length; i++) {
                //    //    var amount = AddComma(parseFloat(data.Table1[i].Amount).toFixed(2));
                //    //    html += '<tr class="RowCal">';
                //    //    html += '<td class="">' + data.Table1[i].RowNum + '</td>';
                //    //    html += '<td class="">' + data.Table1[i].LineNum + '</td>';
                //    //    html += '<td class="">' + data.Table1[i].Description + '</td>';
                //    //    html += '<td class="">' + data.Table1[i].Quantity + '</td>';
                //    //    html += '<td class="">' + data.Table1[i].UnitName + '</td>';
                //    //    html += '<td class="">' + data.Table1[i].UnitPrice + '</td>';
                //    //    html += '<td class="">' + data.Table1[i].CurrencyName + '</td>';
                //    //    html += '<td class="width50"><input class="txtDetailAmount form-control width100 text-right" type="text" id="txtDetailAmount" value="' + amount + '"></td>';
                //    //    html += '<td><div class="btn-group widthmax">';
                //    //    html += '<a class="btn btn-success" href="#ModalDescription" data-toggle="modal" onclick="GetDataDescription(' + data.Table1[i].ID + ')"><i class="icon_pencil-edit_alt"></i></a>';
                //    //    html += '<a class="btn btn-danger" data-toggle="modal" href="#" onclick="ConfirmDialog(' + " 'Delete'" + ',' + "'Quotation Description'" + ',' + data.Table1[i].ID + ')"><i class="icon_close_alt2"></i></a>';
                //    //    html += '</div></td>';
                //    //    html += '</tr>';
                //    //}
                //    //html += '</tbody>';
                //    //document.getElementById("resultDescription").innerHTML = html;
                //}
                //if (data.Table3.length > 0) {
                //    var SubTotal = AddComma(parseFloat(data.Table3[0].SubTotal).toFixed(2));
                //    var Total = AddComma(parseFloat(data.Table3[0].Total).toFixed(2));
                //    var Vat = AddComma(parseFloat(data.Table3[0].Vat).toFixed(2));
                //    var NetTotal = AddComma(parseFloat(data.Table3[0].NetTotal).toFixed(2));
                //    $("#txtSubTotal").val(SubTotal);
                //    $("#txtTotal").val(Total);
                //    $("#txtVal").val(Vat);
                //    $("#txtNetTotal").val(NetTotal);
                //}

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
    //alert(quoDetailID);
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
                    //$("#txtAmount").val(data.Table[0].Amount);
                    $('#txtProductCodepopup').val(data.Table[0].ProductCode);
                    CalAmount();
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
        Seller: $("#cmbSeller").find(":selected").val(),
        State: $("#cmbState").find(":selected").val(),
        Currency: $("#cmbCurrency").find(":selected").val(),
        FileData: '',
        CostSheet: '',
        Reason: $("#txtReason").val(),
        Remark: $("#txtRemark").val(),
        Docver: $("#hidDocver").val(),
        EditBy: localStorage['UserID'],
        Vat: vm.Vat,
        Discount: vm.Discount,
        Detail: [],
        Action: "SaveDraft"
    };

    for (var i = 0; i < vm.Detail.length; i++) {
        var tmp = vm.Detail[i];

        var item = {};

        item.ProductID = tmp.Product.ID;
        item.LineNum = tmp.LineNo;
        item.Description = tmp.Description;
        item.Quantity = tmp.Quantity;
        item.Unit = tmp.Product.Unit;
        item.UnitPrice = tmp._UnitPrice;
        item.Currency = tmp.Product.Currency;

        dataObject.Detail.push(item);
    }

    dataObject.Action = "SendToApprove";

    $.ajax({
        url: 'http://localhost:13149/api/Quotation',
        type: 'PUT',
        async: false,
        data: dataObject,
        datatype: 'json',
        success: function (data) {
            alert('Send to Approve');
            Redirect();
        }
        ,
        error: function (msg) {
            alert(msg);
        }
    });
    //var discount = $("#txtDiscount").val().replace(',', '');
    //var quotationDate = ChangeformatDate($("#txtQuotationDate").val(), 1);
    //var warningDate = ChangeformatDate($("#txtWarningDate").val(), 1);
    //$("#hidQuotID").val(val);
    //var dataObject = {
    //    ID: val,
    //    QuotationNo: $("#txtQuotationNo").val(),
    //    CompID: $("#hidCompID").val(),
    //    Ref: $("#txtYourRef").val(),
    //    QuotationDate: quotationDate,
    //    Validity: $("#txtValidity").val(),
    //    DeliveryTime: $("#txtDelivery").val(),
    //    PaymentTerm: $("#txtPaymentTerm").val(),
    //    WarningDate: warningDate,
    //    IncoTerm: $("#cmbIncoTerm").find(":selected").val(),
    //    IncoDetail: $("#txtIcoTermDetail").val(),
    //    Discount: $("#txtDiscount").val(),
    //    Seller: $("#cmbSeller").find(":selected").val(),
    //    State: $("#cmbState").find(":selected").val(),
    //    //FileData: localStorage['FileData1'],
    //    //CostSheet: AttachPath,
    //    FileData: '',
    //    CostSheet: '',
    //    Reason: $("#txtReason").val(),
    //    Remark: $("#txtRemark").val(),
    //    Vat: $("#cmbVat").find(":selected").val(),
    //    Docver: $("#hidDocver").val(),
    //    CreateBy: 1, EditBy: 1
    //};
    //$.ajax({
    //    url: 'http://localhost:13149/api/Quotation',
    //    type: 'PUT',
    //    async: false,
    //    data: dataObject,
    //    datatype: 'json',
    //    success: function (data) {
    //        //alert('Update is completed');
    //        Redirect();
    //    },
    //    error: function (msg) {
    //        alert(msg);
    //    }
    //});
    //window.location.href = "../Quotation/IndexQuotation";
}
function SaveQuotationDetail(val) {
    var ID = $("#hidQuoDetailID").val();
    $("#hidQuoteID").val(val);
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
                    //Redirect();
                }
                ,
                error: function (msg) {
                    alert(msg);
                }
            });
        //alert(QuoteID);
        window.location.href = "../Quotation/EditQuotation?id=" + $("#hidQuoteID").val();
    }
    else {
        //alert("Insert");
        var dataObject = {
            QuoteID: $("#hidQuoteID").val(),
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
        window.location.href = "../Quotation/EditQuotation?id=" + $("#hidQuoteID").val();
    }

}
function Redirect() {
    window.location.href = "../Quotation/IndexQuotation";
}
function convertFloat(str) {

    $(str).val($(str).val().replace(',', '')).formatNumber({ format: "#,###.00", locale: "us" });
}


function SubmitQuotation(val) {

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
        //FileData: '',
        //CostSheet: '',
        Reason: $("#txtReason").val(),
        Remark: $("#txtRemark").val(),
        Vat: $("#cmbVat").find(":selected").val(),
        Docver: $("#hidDocver").val(),
        EditBy: localStorage['UserID']
    };
    //$.ajax(
    //    {
    //        url: 'http://localhost:13149/api/Quotation',
    //        type: 'PUT',
    //        async: false,
    //        data: dataObject,
    //        datatype: 'json',

    //        success: function (data) {
    //            //alert('Update is completed');
    //            Redirect();
    //        }
    //        ,
    //        error: function (msg) {
    //            alert(msg);
    //        }
    //    });
    //window.location.href = "../Quotation/IndexQuotation";
}


function SaveDraftQuotation(val) {
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
        Seller: $("#cmbSeller").find(":selected").val(),
        State: $("#cmbState").find(":selected").val(),
        Currency: $("#cmbCurrency").find(":selected").val(),
        FileData: '',
        CostSheet: '',
        Reason: $("#txtReason").val(),
        Remark: $("#txtRemark").val(),
        Docver: $("#hidDocver").val(),
        EditBy: localStorage['UserID'],
        Vat: vm.Vat,
        Discount: vm.Discount,
        Detail: [],
        Action: "SaveDraft"
    };

    for (var i = 0; i < vm.Detail.length; i++) {
        var tmp = vm.Detail[i];

        var item = {};

        item.ProductID = tmp.Product.ID;
        item.LineNum = tmp.LineNo;
        item.Description = tmp.Description;
        item.Quantity = tmp.Quantity;
        item.Unit = tmp.Product.Unit;
        item.UnitPrice = tmp._UnitPrice;
        item.Currency = tmp.Product.Currency;

        dataObject.Detail.push(item);
    }

    dataObject.Action = "SaveDraft";

    $.ajax({
        url: 'http://localhost:13149/api/Quotation',
        type: 'PUT',
        async: false,
        data: dataObject,
        datatype: 'json',
        success: function (data) {
            alert('Save Draft is completed');
            Redirect();
        }
        ,
        error: function (msg) {
            alert(msg);
        }
    });
}