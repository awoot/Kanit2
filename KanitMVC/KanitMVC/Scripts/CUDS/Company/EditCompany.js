var row_index2 = 0;//RowCal
$(document).ready(function () {
    CheckAuthorization();
    $("#hidFlagOnchange").val(0);
    $(".nav-tabs a").click(function () {
        $(this).tab('show');
    });

    $(window).load(function () {
        //Income
        $('.cloneContactAddress').click(function () {
            $('.RowCal:last').find('td input[type=text]').eq(0).val('');
            $('.RowCal:last').find('td input[type=text]').eq(1).val('');
            //CalSum();
        });
    });
    //GetExpenseGroup();
    //GetCurrency();
});
$(function () {
    $('.RowCal td:first').click(function () {
        row_index2 = $(this).parent().index();
    });

    $('#tblContactAddress').dynoTable2();
    //GetPriceList();
    $('.multiselect-ui').multiselect({
        includeSelectAllOption: true
    });
});
function SetRowIndex() {
    $('.RowCal td').click(function () {
        row_index2 = $(this).parent().index();
    });
}
function GetSalutation() {
    var dataObject = { typeID: '001' };
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
                $('#cmbSalutation').append($('<option></option>').val(data.Table[i].ID).html(data.Table[i].Detail));
            });
            $('#cmbSalutation').find('option:first-child').attr('selected', true);
        },
        failure: function () {
            alert('Error');
        }
    });
}
function GetEmailLetters() {
    var dataObject = { typeID: '002' };
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
                $('#cmbEmailLetter').append($('<option></option>').val(data.Table[i].ID).html(data.Table[i].Detail));
            });
            $('#cmbEmailLetter').find('option:first-child').attr('selected', true);
        },
        failure: function () {
            alert('Error');
        }
    });
}
function GetAddressType() {
    var dataObject = { typeID: '003' };
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
                $('#cmbAddressType').append($('<option></option>').val(data.Table[i].ID).html(data.Table[i].Detail));
            });
            $('#cmbAddressType').find('option:first-child').attr('selected', true);
        },
        failure: function () {
            alert('Error');
        }
    });
}
function GetCreditTerm() {
    var dataObject = { typeID: '004' };
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
                $('#cmbCreditTerm').append($('<option></option>').val(data.Table[i].ID).html(data.Table[i].Detail));
            });
            $('#cmbCreditTerm').find('option:first-child').attr('selected', true);
        },
        failure: function () {
            alert('Error');
        }
    });
}
function GetPaymentType() {
    var dataObject = { typeID: '005' };
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
                $('#cmbPaymentType').append($('<option></option>').val(data.Table[i].ID).html(data.Table[i].Detail));
            });
            $('#cmbPaymentType').find('option:first-child').attr('selected', true);
        },
        failure: function () {
            alert('Error');
        }
    });
}
function GetCustomerSegment() {
    var dataObject = { typeID: '006' };
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
                $('#cmbCustomerSegment').append($('<option></option>').val(data.Table[i].ID).html(data.Table[i].Detail));
            });
            $('#cmbCustomerSegment').find('option:first-child').attr('selected', true);
        },
        failure: function () {
            alert('Error');
        }
    });
}
function GetCompanyType() {
    var dataObject = { typeID: '007' };
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
                $('#cmbCompanyType').append($('<option></option>').val(data.Table[i].ID).html(data.Table[i].Detail));
            });
            $('#cmbCompanyType').find('option:first-child').attr('selected', true);
        },
        failure: function () {
            alert('Error');
        }
    });
}
function GetProvince() {
    $.ajax({
        url: 'http://localhost:13149/api/AddressMaster/',
        type: 'GET',
        dataType: 'json',
        async: false,
        success: function (data) {
            data = JSON.parse(data);
            $.each(data.Table, function (i) {
                $('#cmbProvince').append($('<option></option>').val(data.Table[i].ID).html(data.Table[i].Detail));
            });
            $('#cmbProvince').find('option:first-child').attr('selected', true);
        },
        failure: function () {
            alert('Error');
        }
    });
}
function GetAmphurByProvince() {
    var ProvinceID = $('#cmbProvince:last').find(":selected").val();
    //alert(val);
    var dataObject = { ProvinceID: parseInt(ProvinceID) };
    $.ajax({
        url: 'http://localhost:13149/api/AddressMaster/GetAmphurByProvinceID',
        type: 'GET',
        dataType: 'json',
        async: false,
        data: dataObject,
        success: function (data) {
            data = JSON.parse(data);
            //alert('test');
            $('#cmbAmphur').find("option").remove();
            $.each(data.Table, function (i) {
                $('#cmbAmphur').append($('<option></option>').val(data.Table[i].ID).html(data.Table[i].Detail));
            });
            $('#cmbAmphur').find('option:first-child').attr('selected', true);
        },
        failure: function () {
            alert('Error');
        }
    });
    GetDistrictByAmphur();
}
function GetDistrictByAmphur() {
    var AmphurID = $('#cmbAmphur:last').find(":selected").val();
    //alert(val);
    var dataObject = { AmphurID: parseInt(AmphurID) };
    $.ajax({
        url: 'http://localhost:13149/api/AddressMaster/GetDistrictByAmphurID',
        type: 'GET',
        dataType: 'json',
        async: false,
        data: dataObject,
        success: function (data) {
            data = JSON.parse(data);
            //alert('test');
            $('#cmbTambon').find("option").remove();
            $.each(data.Table, function (i) {
                //alert(data.Table[i].Detail);
                $('#cmbTambon').append($('<option></option>').val(data.Table[i].ID).html(data.Table[i].Detail));
            });
            $('#cmbTambon').find('option:first-child').attr('selected', true);
        },
        failure: function () {
            alert('Error');
        }
    });
}
function GetAmphurAll() {
    $.ajax({
        url: 'http://localhost:13149/api/AddressMaster/GetAmphurAll',
        type: 'GET',
        dataType: 'json',
        async: false,
        success: function (data) {
            data = JSON.parse(data);
            //$('#cmbAmphur').find("option").remove();
            $.each(data.Table, function (i) {
                $('#cmbAmphur').append($('<option></option>').val(data.Table[i].ID).html(data.Table[i].Detail));
            });
            $('#cmbAmphur').find('option:first-child').attr('selected', true);
        },
        failure: function () {
            alert('Error');
        }
    });
}
function GetDistrictAll() {
    $.ajax({
        url: 'http://localhost:13149/api/AddressMaster/GetDistrictAll',
        type: 'GET',
        dataType: 'json',
        async: false,
        success: function (data) {
            data = JSON.parse(data);
            //$('#cmbTambon').find("option").remove();
            $.each(data.Table, function (i) {
                $('#cmbTambon').append($('<option></option>').val(data.Table[i].ID).html(data.Table[i].Detail));
            });
            $('#cmbTambon').find('option:first-child').attr('selected', true);
        },
        failure: function () {
            alert('Error');
        }
    });
}


function GetContactProvince() {
    //alert("Onchange");
    //สำหรับตอน create , Onchange
    $.ajax({
        url: 'http://localhost:13149/api/AddressMaster/',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            data = JSON.parse(data);
            $.each(data.Table, function (i) {
                //alert(data.Table[i].Detail);
                //$('.cmbContProvince:last').append($('<option></option>').val(data.Table[i].ID).html(data.Table[i].Detail));
                $('.cmbContProvince').append($('<option></option>').val(data.Table[i].ID).html(data.Table[i].Detail));
            });
            $('.cmbContProvince').find('option:first-child').attr('selected', true);
            GetContactAmphurByProvince();
        },
        failure: function () {
            alert('Error');
        }
    });
}
function GetContactAmphurByProvince() {
    //สำหรับตอน create , Onchange
    var ProvinceID = $('.cmbContProvince:last').find(":selected").val();
    //alert("weng ");
    var dataObject = { ProvinceID: parseInt(ProvinceID) };
    $.ajax({
        url: 'http://localhost:13149/api/AddressMaster/GetAmphurByProvinceID',
        type: 'GET',
        dataType: 'json',
        data: dataObject,
        success: function (data) {
            data = JSON.parse(data);
            //alert('test');
            $('.cmbContAmphur:last').find("option").remove();
            $.each(data.Table, function (i) {
                $('.cmbContAmphur:last').append($('<option></option>').val(data.Table[i].ID).html(data.Table[i].Detail));
            });
            $('.cmbContAmphur:last').find('option:first-child').attr('selected', true);

            GetContactDistrictByAmphur();
        },
        failure: function () {
            alert('Error');
        }
    });
}
function GetContactDistrictByAmphur() {
    //สำหรับตอน create , Onchange
    var AmphurID = $('.cmbContAmphur:last').find(":selected").val();
    //alert(val);
    var dataObject = { AmphurID: parseInt(AmphurID) };
    $.ajax({
        url: 'http://localhost:13149/api/AddressMaster/GetDistrictByAmphurID',
        type: 'GET',
        dataType: 'json',
        data: dataObject,
        success: function (data) {
            data = JSON.parse(data);
            //alert('test');
            $('.cmbContTambon:last').find("option").remove();
            $.each(data.Table, function (i) {
                //alert(data.Table[i].Detail);
                $('.cmbContTambon:last').append($('<option></option>').val(data.Table[i].ID).html(data.Table[i].Detail));
            });
            $('.cmbContTambon:last').find('option:first-child').attr('selected', true);

        },
        failure: function () {
            alert('Error');
        }
    });
}

function GetContactProvinceAll() {
    //alert("DataSource");
    //สำหรับตอน Edit
    $.ajax({
        url: 'http://localhost:13149/api/AddressMaster/',
        type: 'GET',
        dataType: 'json',
        async: false,
        success: function (data) {
            data = JSON.parse(data);
            $.each(data.Table, function (i) {
                //alert(data.Table[i].Detail);
                $('.cmbContProvince').append($('<option></option>').val(data.Table[i].ID).html(data.Table[i].Detail));
            });
            $('.cmbContProvince').find('option:first-child').attr('selected', true);
            //alert("Province function" + $('.cmbContProvince').val());
            GetContactAmphurAll();
        },
        failure: function () {
            alert('Error');
        }
    });
}
function GetContactAmphurAll(provinceID) {
    //สำหรับตอน Edit
    var ProvinceID = provinceID;
    var dataObject = { ProvinceID: parseInt(ProvinceID) };
    $.ajax({
        url: 'http://localhost:13149/api/AddressMaster/GetAmphurByProvinceID',
        type: 'GET',
        dataType: 'json',
        async: false,
        data: dataObject,
        success: function (data) {
            data = JSON.parse(data);
            //$('#cmbAmphur').find("option").remove();
            $.each(data.Table, function (i) {
                $('.cmbContAmphur').append($('<option></option>').val(data.Table[i].ID).html(data.Table[i].Detail));
            });
            $('.cmbContAmphur').find('option:first-child').attr('selected', true);
        },
        failure: function () {
            alert('Error');
        }
    });
}
function GetContactDistrictAll(amphurID) {
    //สำหรับตอน Edit
    var AmphurID = amphurID;
    var dataObject = { ProvinceID: parseInt(AmphurID) };
    $.ajax({
        url: 'http://localhost:13149/api/AddressMaster/GetDistrictByAmphurID',
        type: 'GET',
        dataType: 'json',
        async: false,
        data: dataObject,
        success: function (data) {
            data = JSON.parse(data);
            //$('#cmbTambon').find("option").remove();
            $.each(data.Table, function (i) {
                $('.cmbContTambon').append($('<option></option>').val(data.Table[i].ID).html(data.Table[i].Detail));
            });
            $('.cmbContTambon').find('option:first-child').attr('selected', true);
        },
        failure: function () {
            alert('Error');
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
function CheckParentCompany(valParentCompany) {
    var len = document.getElementById("cmbParentCompany").options.length;

    //alert("len " + len);
    for (var i = 0; i < len; i++) {
        var Total = document.getElementById("cmbParentCompany").options[i].index;
        //alert("Total " + Total);
        //alert("valParentCompany " + valParentCompany);
        if (Total == valParentCompany) {
            //alert("test222")
            //$('#cmbParentCompany').
        }
    }
}
function GetData(val) {
    $('#hidCompID').val(val);
    var dataObject = { ID: val }
    $.ajax(
        {
            url: 'http://localhost:13149/api/Company',
            type: 'GET',
            async: false,
            data: dataObject,
            datatype: 'json',
            success: function (data) {
                data = JSON.parse(data);

                // =================================================================================== Company
                GetCreditTerm();
                GetPaymentType();
                GetCustomerSegment();
                GetCompanyType();
                var creditLimit = AddComma(parseFloat(data.Table[0].CreditLimit).toFixed(2));

                //$.each(data.Table, function (i) {
                //    $('#cmbParentCompany').append($('<option></option>').val(data.Table[i].ID).html(data.Table[i].Detail));
                //});
                //$('#cmbParentCompany').find('option:first-child').attr('selected', true);

                $("#txtCompanyCode").val(data.Table[0].CompanyCode);
                $("#txtCompanyNameTH").val(data.Table[0].CompanyNameTH);
                $("#txtCompanyNameEN").val(data.Table[0].CompanyNameEN);
                $("#cmbCompanyType").val(data.Table[0].CompanyTypeID);
                $("#cmbCustomerSegment").val(data.Table[0].CustSegment);
                $("#txtValidity").val(data.Table[0].Validity);
                $("#cmbPaymentType").val(data.Table[0].PaymentTypeID);
                $("#cmbCreditTerm").val(data.Table[0].CreditTerm);
                $("#txtCreditLimit").val(creditLimit);
                $("#txtParentCompany").val(data.Table[0].ParentCompany);
                $("#txtKeyAccountSR").val(data.Table[0].KeyAccountSR);

                if (data.Table3.length > 0) {

                    var html = '';
                    for (var i = 0; i < data.Table3.length; i++) {
                        var IsSelect = data.Table3[i].IsSelect == '1' ? 'Checked' : '';
                        html += '<tr class="RowCal">';
                        ////html += '<td class="hidecolumn"><input type="hidden" class="hidTempGroupName" value="' + data.Table[i].GroupName + '"/></td>';
                        html += '<td class="hidecolumn"><input type="hidden" class="hidMenuTypeID" value="' + data.Table3[i].ID + '"/></td>';
                        html += '<td class="width50"><input id="chkIsSelect" type="checkbox" class="IsSelect" ' + IsSelect + ' ></td>';
                        //html += '<td class="width50">' + data.Table3[i].RowNum + '</td>';
                        html += '<td>' + data.Table3[i].Detail + '</td>';
                        html += '</tr>';
                    }
                    document.getElementById("resultSecurityProfile").innerHTML = html;
                }

                // =================================================================================== Address
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
                    $("#resultAddress").find("tr").hide();
                    var data = this.value.split(" ");
                    var jo = $("#resultAddress").find("tr");
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
                    html += '<td class="">' + data.Table1[i].Branch + '</td>';
                    html += '<td class="">' + data.Table1[i].Address + '</td>';
                    html += '<td class="">' + data.Table1[i].TelNo + '</td>';
                    html += '<td class="">' + data.Table1[i].MobileNo + '</td>';
                    html += '<td class="">' + data.Table1[i].AddressTypeName + '</td>';
                    if (data.Table1[i].IsPrimary == '1') {
                        html += '<td class=""><img src="#" class="fa fa-check" /></td>';
                    }
                    else {
                        html += '<td class=""><img src="#" class="fa fa-minus" /></td>';
                    }
                    html += '<td><div class="btn-group widthmax">';
                    html += '<a class="btn btn-success" href="#myModal" data-toggle="modal" onclick="GetDataAddress(' + data.Table1[i].ID + ')"><i class="icon_pencil-edit_alt"></i></a>';
                    html += '<a class="btn btn-danger" data-toggle="modal" href="#" onclick="ConfirmDialog(' + " 'Delete'" + ',' + "'CompanyAddress'" + ',' + data.Table1[i].ID + ')"><i class="icon_close_alt2"></i></a>';
                    //html += '<a href="/ExpenseMaster/EditExpenseMaster?id=' + data.Table[i].ID + '" id="edit' + data.Table[i].ID + '" style="margin-right: 3px;">' + '<img src="/Images/edit.png" class="imgExpenseUpdate" /></a>';
                    //html += '<a href="#" id="del' + data.Table[i].ID + '" onclick="ConfirmDialog(' + " 'Delete'" + ',' + "'ExpenseMaster'" + ',' + data.Table[i].ID + ')" style="margin-right: 5px;" >' + '<img src="/Images/delete.png" class="imgExpenseDelete" /></a>';
                    //html += '<a href="/ExpenseMaster/EditExpenseMaster?id=' + data.Table[i].ID + '&IsView=' + true + '" id="edit' + data.Table[i].ID + '">' + '<img src="/Images/view.png" class="imgExpenseView" /></a>';
                    html += '</div></td>';
                    html += '</tr>';
                }
                html += '</tbody>';
                document.getElementById("resultAddress").innerHTML = html;

                // =================================================================================== Contact Person
                //GetSalutation();
                //GetEmailLetters();
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
                $("#txtSearchContact").keyup(function () {
                    $("#resultContact").find("tr").hide();
                    var data = this.value.split(" ");
                    var jo = $("#resultContact").find("tr");
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
                for (var i = 0; i < data.Table2.length; i++) {

                    html += '<tr>';
                    html += '<td class="">' + data.Table2[i].RowNum + '</td>';
                    html += '<td class="">' + data.Table2[i].FullName + '</td>';
                    html += '<td class="">' + data.Table2[i].Position + '</td>';
                    html += '<td class="">' + data.Table2[i].MobileNo + '</td>';
                    html += '<td class="">' + data.Table2[i].Email + '</td>';
                    html += '<td class="">' + data.Table2[i].EmailLettersName + '</td>';
                    html += '<td><div class="btn-group widthmax">';
                    html += '<a class="btn btn-default btnContAddress" href="#ModalContactAddress" data-toggle="modal" onclick="GetDataContactAddress(' + data.Table2[i].ID + ')"><i class="	fa fa-home"></i></a>';
                    html += '</div></td>';
                    html += '<td><div class="btn-group widthmax">';
                    html += '<a class="btn btn-success" href="#ModalContact" data-toggle="modal" onclick="GetDataContactPerson(' + data.Table2[i].ID + ')"><i class="icon_pencil-edit_alt"></i></a>';
                    html += '<a class="btn btn-danger" data-toggle="modal" href="#" onclick="ConfirmDialog(' + " 'DeleteContactPerson'" + ',' + "'CompanyContact'" + ',' + data.Table2[i].ID + ')"><i class="icon_close_alt2"></i></a>';
                    //html += '<a href="/ExpenseMaster/EditExpenseMaster?id=' + data.Table[i].ID + '" id="edit' + data.Table[i].ID + '" style="margin-right: 3px;">' + '<img src="/Images/edit.png" class="imgExpenseUpdate" /></a>';
                    //html += '<a href="#" id="del' + data.Table[i].ID + '" onclick="ConfirmDialog(' + " 'Delete'" + ',' + "'ExpenseMaster'" + ',' + data.Table[i].ID + ')" style="margin-right: 5px;" >' + '<img src="/Images/delete.png" class="imgExpenseDelete" /></a>';
                    //html += '<a href="/ExpenseMaster/EditExpenseMaster?id=' + data.Table[i].ID + '&IsView=' + true + '" id="edit' + data.Table[i].ID + '">' + '<img src="/Images/view.png" class="imgExpenseView" /></a>';
                    html += '</div></td>';
                    html += '</tr>';
                }
                html += '</tbody>';
                document.getElementById("resultContact").innerHTML = html;

            },
            error: function (msg) {
                alert(msg);
            }

        });
}
function RowDelete(id) {
    var dataObject = { ID: id, EditBy: localStorage['UserID'] };
    $.ajax(
        {
            url: 'http://localhost:13149/api/Address/Delete',
            type: 'DELETE',
            data: dataObject,
            datatype: 'json',

            success: function (result) {
                //alert('Delete is completed')
                window.location.href = "../Company/EditCompany?id=" + $('#hidCompID').val();
            }
            ,
            error: function (msg) {
                alert(msg)
            }


        });
}
function RowDeleteContactPerson(id) {
    var dataObject = { ID: id, EditBy: localStorage['UserID'] };
    $.ajax(
        {
            url: 'http://localhost:13149/api/ContactPerson/Delete',
            type: 'DELETE',
            data: dataObject,
            datatype: 'json',

            success: function (result) {
                //alert('Delete is completed')
                window.location.href = "../Company/EditCompany?id=" + $('#hidCompID').val();
            }
            ,
            error: function (msg) {
                alert(msg)
            }


        });
}
function GetDataAddress(AddressID) {
    //alert("GetDataAddress");
    var AddressID = AddressID;
    //alert("AddressID "+AddressID);
    if (AddressID > 0) {
        var dataObject = { ID: AddressID }
        $.ajax(
            {
                url: 'http://localhost:13149/api/Address',
                type: 'GET',
                async: false,
                data: dataObject,
                datatype: 'json',
                success: function (data) {
                    data = JSON.parse(data);
                    GetAddressType();
                    GetProvince();
                    GetAmphurAll();
                    GetDistrictAll();

                    $("#hidAddressID").val(data.Table[0].ID);
                    $("#txtTaxID").val(data.Table[0].TaxID);
                    $("#txtBranch").val(data.Table[0].Branch);
                    $("#txtAddress").val(data.Table[0].Address);
                    $("#cmbProvince").val(data.Table[0].Province);
                    $("#cmbAmphur").val(data.Table[0].Amphur);
                    $("#cmbTambon").val(data.Table[0].Tambon);
                    $("#txtPostCode").val(data.Table[0].PostCode);
                    $("#txtTelNo").val(data.Table[0].TelNo);
                    $("#txtTelExt").val(data.Table[0].TelExt);
                    $("#txtMobileNo").val(data.Table[0].MobileNo);
                    $("#txtFaxNo").val(data.Table[0].FaxNo);
                    $("#cmbAddressType").val(data.Table[0].AddressTypeID);
                    if (data.Table[0].IsPrimary == '1') {
                        $('#chkPrimary').prop('checked', true);
                    }
                },
                error: function (msg) {
                    alert(msg);
                }

            });
    }
    else {
        //alert("New Address");
        $('#cmbAddressType').find("option").remove();
        GetAddressType();
        GetProvince();
        GetAmphurByProvince();
        GetDistrictByAmphur();
        $("#hidAddressID").val('');
        $("#txtTaxID").val('');
        $("#txtBranch").val('');
        $("#txtAddress").val('');
        $("#txtPostCode").val('');
        $("#txtTelNo").val('');
        $("#txtTelExt").val('');
        $("#txtMobileNo").val('');
        $("#txtFaxNo").val('');
        $('#chkPrimary').prop('checked', false);

    }
}
function GetDataContactPerson(ContactID) {
    //alert("GetDataContactPerson");
    var ContactID = ContactID;
    //alert("ContactID " + ContactID);
    if (ContactID > 0) {
        var dataObject = { ID: ContactID }
        $.ajax(
            {
                url: 'http://localhost:13149/api/ContactPerson',
                type: 'GET',
                async: false,
                data: dataObject,
                datatype: 'json',
                success: function (data) {
                    data = JSON.parse(data);
                    GetSalutation();
                    GetEmailLetters();

                    $("#hidContactID").val(data.Table[0].ID);
                    $("#cmbSalutation").val(data.Table[0].Salutation);
                    $("#txtFirstNameTH").val(data.Table[0].FirstNameTH);
                    $("#txtFirstNameEN").val(data.Table[0].FirstNameEN);
                    $("#txtLastNameTH").val(data.Table[0].LastNameTH);
                    $("#txtLastNameEN").val(data.Table[0].LastNameEN);
                    $("#txtContactMobile").val(data.Table[0].MobileNo);
                    $("#txtContactEmail").val(data.Table[0].Email);
                    $("#cmbEmailLetter").val(data.Table[0].EmailLetters);
                    $("#txtPosition").val(data.Table[0].Position);
                },
                error: function (msg) {
                    alert(msg);
                }

            });
    }
    else {
        //alert("New Address");
        $('#cmbSalutation').find("option").remove();
        $('#cmbEmailLetter').find("option").remove();
        GetSalutation();
        GetEmailLetters();

        $("#hidContactID").val('');
        $("#cmbSalutation").val('');
        $("#txtFirstNameTH").val('');
        $("#txtFirstNameEN").val('');
        $("#txtLastNameTH").val('');
        $("#txtLastNameEN").val('');
        $("#txtContactMobile").val('');
        $("#txtContactEmail").val('');
        $("#cmbEmailLetter").val('');
        $("#txtPosition").val('');
    }
}
function GetDataContactAddress(ContactID) {

    loadContactPersonAddress(ContactID);

    //alert("GetDataAddress");
    //var ContactID = ContactID;
    ////alert("AddressID "+AddressID);
    //if (ContactID > 0) {
    //    //alert("ContactID " + ContactID);
    //    var dataObject = { ID: ContactID }
    //    $.ajax({
    //        url: 'http://localhost:13149/api/ContactAddress',
    //        type: 'GET',
    //        async: false,
    //        data: dataObject,
    //        datatype: 'json',
    //        success: function (data) {
    //            data = JSON.parse(data);

    //            if (data.Table.length > 0) {
    //                //alert("Test")
    //                $('.RowCal').remove();

    //                for (var j = 0; j < data.Table.length; j++) {
    //                    $("#add-row2").trigger("click");
    //                    //AddRowContactAddress();

    //                    GetContactProvinceAll();
    //                    $('.cmbContProvince').eq(j).val(data.Table[j].Province).change();
    //                    //alert("BindProvince " + $('.cmbContProvince').val());

    //                    GetContactAmphurAll($('.cmbContProvince').val());
    //                    $('.cmbContAmphur').eq(j).val(data.Table[j].Amphur).change();
    //                    //alert("BindAmphur " + $('.cmbContAmphur').val());

    //                    GetContactDistrictAll($('.cmbContAmphur').val());
    //                    $('.cmbContTambon').eq(j).val(data.Table[j].Tambon).change();
    //                    //alert("BindTambon " + $('.cmbContTambon').val());

    //                }
    //                $('.RowCal:eq(' + data.Table.length + ')').remove();

    //                $(".RowCal").each(function (i) {
    //                    $(this).find('.txtNo').val(data.Table[i].RowNum);
    //                    $(this).find('.txtContAddress').val(data.Table[i].Address);
    //                    //alert("Province " + data.Table[i].Province);
    //                    //$(this).find('.cmbContProvince').val(data.Table[i].Province).change();
    //                    //alert("Province BindData" + $('.cmbContProvince').val());
    //                    //$(this).find('.cmbContAmphur').val(data.Table[i].Amphur).change();
    //                    //$(this).find('.cmbContTambon').val(data.Table[i].Tambon).change();
    //                    $(this).find('.txtContPostCode').val(data.Table[i].PostCode);
    //                });


    //            }
    //            else {
    //                //alert("test2");
    //                //GetContactProvince();
    //                //GetContactAmphurByProvince();
    //                //GetContactDistrictByAmphur();
    //            }

    //        }
    //    });
    //}
}
function AddRowContactAddress() {
    SetRowIndex();
    GetContactProvince();

}
function Update(val) {
    //var rate = $("#txtRate").val().replace(',', '');
    var creditLimit = $("#txtCreditLimit").val().replace(',', '');
    var parentCompany = "'" + $("#cmbParentCompany").val() + "'";
    //alert('parentCompany '+parentCompany);
    var dataObject = {
        ID: val, CompanyCode: $("#txtCompanyCode").val(), CompanyNameTH: $("#txtCompanyNameTH").val(),
        CompanyNameEN: $("#txtCompanyNameEN").val(), CompanyTypeID: $("#cmbCompanyType").find(":selected").val(),
        CustSegment: $("#cmbCustomerSegment").find(":selected").val(), Validity: $("#txtValidity").val(),
        PaymentTypeID: $("#cmbPaymentType").find(":selected").val(), CreditTerm: $("#cmbCreditTerm").find(":selected").val(),
        CreditLimit: creditLimit, ParentCompany: parentCompany, KeyAccountSR: $("#txtKeyAccountSR").val(),
        EditBy: 2
    };

    $.ajax(
        {
            url: 'http://localhost:13149/api/Company',
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
    var dataObject = { ID: val };
    $.ajax(
        {
            url: 'http://localhost:13149/api/CompanyDetail',
            type: 'DELETE',
            async: false,
            data: dataObject,
            datatype: 'json',
            success: function (data) {
                //alert('data ' + data);
            }
            ,
            error: function (msg) {
                alert(msg)
            }
        });

    $(".RowCal").each(function () {
        dataObject.CompID = CompID;
        dataObject.IsSelect = $(this).find('.IsSelect').is(":checked") == true ? 1 : 0;
        dataObject.MasterID = $(this).find(".hidMenuTypeID").val();
        //    dataObject.MenuID = $(this).find('td:eq(1)').text() != '1. DashBoard' && $(this).find('td:eq(1)').text() != '2. Quotation' && $(this).find('td:eq(1)').text() != '3. Product'
        //&& $(this).find('td:eq(1)').text() != '4. Quotation' && $(this).find('td:eq(1)').text() != '5. Setting' ? $(this).find(".hidMenuTypeID").val() : 0;
        dataObject.EditBy = 2;
        $.ajax(
            {
                url: 'http://localhost:13149/api/CompanyDetail',
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
    });
}
function SaveAddress(val) {
    //alert("test");
    var ID = $("#hidAddressID").val();
    var CompID = val;
    //alert("ID " + ID);
    if (ID > 0) {
        //alert("Update");
        var IsPrimary = $('#chkPrimary').is(":checked") == true ? '1' : '0';
        var dataObject = {
            ID: ID, TaxID: $("#txtTaxID").val(), Branch: $("#txtBranch").val(),
            Address: $("#txtAddress").val(), Province: $("#cmbProvince").find(":selected").val(), Amphur: $("#cmbAmphur").find(":selected").val(),
            Tambon: $("#cmbTambon").find(":selected").val(), PostCode: $("#txtPostCode").val(),
            TelNo: $("#txtTelNo").val(), TelExt: $("#txtTelExt").val(),
            MobileNo: $("#txtMobileNo").val(), FaxNo: $("#txtFaxNo").val(),
            AddressTypeID: $("#cmbAddressType").find(":selected").val(), IsPrimary: IsPrimary, EditBy: 2
        };
        $.ajax(
            {
                url: 'http://localhost:13149/api/Address',
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
        //alert(CompID);
        window.location.href = "../Company/EditCompany?id=" + CompID;
    }
    else {
        //alert("Insert");
        var IsPrimary = $('#chkPrimary').is(":checked") == true ? '1' : '0';
        var dataObject = {
            CompID: CompID,
            TaxID: $("#txtTaxID").val(), Branch: $("#txtBranch").val(),
            Address: $("#txtAddress").val(), Province: $("#cmbProvince").find(":selected").val(), Amphur: $("#cmbAmphur").find(":selected").val(),
            Tambon: $("#cmbTambon").find(":selected").val(), PostCode: $("#txtPostCode").val(),
            TelNo: $("#txtTelNo").val(), TelExt: $("#txtTelExt").val(),
            MobileNo: $("#txtMobileNo").val(), FaxNo: $("#txtFaxNo").val(),
            AddressTypeID: $("#cmbAddressType").find(":selected").val(), IsPrimary: IsPrimary, CreateBy: 1, EditBy: 1
        };
        $.ajax(
            {
                url: 'http://localhost:13149/api/Address',
                type: 'POST',
                data: dataObject,
                datatype: 'json',
                async: false,
                success: function (data) {
                },
                error: function (msg) { alert(msg); }
            });
        //alert(CompID);
        window.location.href = "../Company/EditCompany?id=" + CompID;
    }

}
function SaveContact(val) {
    //alert("test SaveContact");
    var ID = $("#hidContactID").val();
    var CompID = val;
    //alert("ID " + ID);
    if (ID > 0) {
        //alert("Update");
        var dataObject = {
            ID: ID, Salutation: $("#cmbSalutation").find(":selected").val(), FirstNameTH: $("#txtFirstNameTH").val(),
            LastNameTH: $("#txtLastNameTH").val(), FirstNameEN: $("#txtFirstNameEN").val(),
            LastNameEN: $("#txtLastNameEN").val(), MobileNo: $("#txtContactMobile").val(),
            Email: $("#txtContactEmail").val(), EmailLetters: $("#cmbEmailLetter").find(":selected").val(),
            Position: $("#txtPosition").val(), EditBy: 2
        };
        $.ajax(
            {
                url: 'http://localhost:13149/api/ContactPerson',
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
        window.location.href = "../Company/EditCompany?id=" + CompID;
    }
    else {
        //alert("Insert");
        var dataObject = {
            CompID: CompID,
            Salutation: $("#cmbSalutation").find(":selected").val(), FirstNameTH: $("#txtFirstNameTH").val(),
            LastNameTH: $("#txtLastNameTH").val(), FirstNameEN: $("#txtFirstNameEN").val(),
            LastNameEN: $("#txtLastNameEN").val(), MobileNo: $("#txtContactMobile").val(),
            Email: $("#txtContactEmail").val(), EmailLetters: $("#cmbEmailLetter").find(":selected").val(),
            Position: $("#txtPosition").val(), CreateBy: 1, EditBy: 1
        };
        $.ajax(
            {
                url: 'http://localhost:13149/api/ContactPerson',
                type: 'POST',
                data: dataObject,
                datatype: 'json',
                async: false,
                success: function (data) {

                },
                error: function (msg) { alert(msg); }
            });
        window.location.href = "../Company/EditCompany?id=" + CompID;
    }

}
function SaveContactAddress(val) {
    var ContactID = val
    //alert("ContactID " + ContactID);
    //var CompID = val;
    //alert("ID " + ID);
    //=================== DeleteContactAddress
    //alert(val);
    var dataObject = { ID: ContactID };
    $.ajax({
        url: 'http://localhost:13149/api/ContactAddress',
        type: 'DELETE',
        async: false,
        data: dataObject,
        datatype: 'json',
        success: function (data) {
        },
        error: function (msg) {
            alert(msg)
        }
    });
    //alert("test");
    //alert("ID " + ContactID);
    if (ContactID > 0) {
        //alert("Save");
        $(".RowCal").each(function () {
            //alert("RequistionID "+$('#hidRequisitionID').val());
            //dataObject.ID = $('#hidContactAddressID').val();
            dataObject.ContactID = ContactID;
            dataObject.Address = $(this).find('.txtContAddress').val();
            dataObject.Province = $(this).find('.cmbContProvince').find(":selected").val();
            dataObject.Amphur = $(this).find('.cmbContAmphur').find(":selected").val();
            dataObject.Tambon = $(this).find('.cmbContTambon').find(":selected").val();
            dataObject.PostCode = $(this).find('.txtContPostCode').val();
            dataObject.CreateBy = 1;
            dataObject.EditBy = 1;
            //dataObject.EditBy = localStorage['UserID'];

            if (ContactID != '') {
                $.ajax(
                    {
                        url: 'http://localhost:13149/api/ContactAddress',
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
        window.location.href = "../Company/EditCompany?id=" + CompID;
    }

}
function Redirect() {
    window.location.href = "../Company/IndexCompany";
}
function convertFloat(str) {

    $(str).val($(str).val().replace(',', '')).formatNumber({ format: "#,###.00", locale: "us" });
}


//---------------------

function loadContactPersonAddress(contactPersonID) {
    $.ajax({
        url: 'http://localhost:13149/api/ContactPersonAddress',
        type: 'GET',
        async: false,
        data: { ID: contactPersonID },
        datatype: 'json',
        success: function (data) {
            data = JSON.parse(data);

            bindContractAddress(contactPersonID, data.Table);
        },
        error: function (msg) {
            alert(msg)
        }
    });
}

var ProvinceID = 0;
var AmphurID = 0;

var vmContractAddress = {};

function bindContractAddress(contactPersonID, data) {

    kendo.unbind($("#templateContactAddress"));

    vmContractAddress = kendo.observable({
        Items: [],
        onAdd: function (e) {
            var Items = vmContractAddress.get("Items");

            var item = genContractAddress({ID: null});

            Items.push(item);
        },
        onSave: function () {
            var items = vmContractAddress.get("Items");

            var address = [];

            for (var i = 0; i < items.length; i++) {
                var tmp = items[i];

                address.push({
                    Province: tmp.Province.ID,
                    Amphur: tmp.Amphur.ID,
                    Tambon: tmp.District.ID,
                    Address: tmp.Address,
                    PostCode: tmp.PostCode
                });
            }

            $.ajax({
                url: 'http://localhost:13149/api/ContactPersonAddress',
                type: 'POST',
                async: false,
                data: { ID: contactPersonID, Address: address },
                datatype: 'json',
                success: function (data) {
                    document.location.reload();
                },
                error: function (msg) {
                    alert(msg)
                }
            });
        }
    });

    for (var i = 0; i < data.length; i++) {
        data[i].No = i + 1;
        var _tmp = genContractAddress(data[i]);
        vmContractAddress.Items.push(_tmp);
    }



    kendo.bind($("#divContractAddress"), vmContractAddress);

    //re bind contract address
    for (var i = 0; i < vmContractAddress.Items.length; i++) {
        var tmp = vmContractAddress.Items[i];

        ProvinceID = tmp.Province.ID;
        var ddlAmphur = $("#" + tmp.ddlAmphurID).data("kendoDropDownList");
        ddlAmphur.dataSource.read();
        ddlAmphur.value(tmp.Amphur.ID);
        ddlAmphur.trigger("change");
        AmphurID = tmp.Amphur.ID;
        var ddlDistrict = $("#" + tmp.ddlDistrictID).data("kendoDropDownList");
        ddlDistrict.dataSource.read();
        ddlDistrict.value(tmp.District.ID);
        ddlDistrict.trigger("change");
    }
}

function genContractAddress(data) {
    var id = guid();

    var item = {
        ID: data.ID,
        No: data.No,
        ddlProvinceID: "Province" + id,
        ddlAmphurID: "Amphur" + id,
        ddlDistrictID: "District" + id,
        Province: { ID: data.Province },
        Amphur: { ID: data.Amphur },
        District: { ID: data.District },
        Address: data.Address,
        PostCode: data.PostCode,
        DataSourceProvince: new kendo.data.DataSource({
            transport: {
                read: {
                    url: "http://localhost:13149/api/AddressMaster/",
                    type: "GET",
                    dataType: "json"
                }
            },
            schema: {
                parse: function (response) {
                    var data = JSON.parse(response);

                    var items = [];
                    for (var i = 0; i < data.Table.length; i++) {
                        var _item = {
                            ID: data.Table[i].ID,
                            PROVINCE_ID: data.Table[i].ID,
                            Detail: data.Table[i].Detail
                        };

                        items.push(_item);
                    }

                    return items;
                }
            }
        }),
        DataSourceAmphur: new kendo.data.DataSource({
            transport: {
                read: {
                    url: "http://localhost:13149/api/AddressMaster/GetAmphurByProvinceID",
                    type: "GET",
                    async: false,
                    dataType: "json",

                },
                parameterMap: function (data, type) {
                    return { ProvinceID: parseInt(ProvinceID) };
                }
            },
            schema: {
                parse: function (response) {
                    var data = JSON.parse(response);

                    var items = [];
                    for (var i = 0; i < data.Table.length; i++) {
                        var _item = {
                            ID: data.Table[i].ID,
                            AMPHUR_ID: data.Table[i].ID,
                            Detail: data.Table[i].Detail,
                            PROVINCE_ID: data.Table[i].PROVINCE_ID
                        };

                        items.push(_item);
                    }

                    return items;
                }
            }
        }),
        DataSourcetDistrict: new kendo.data.DataSource({
            transport: {
                read: {
                    url: "http://localhost:13149/api/AddressMaster/GetDistrictByAmphurID",
                    type: "GET",
                    async: false,
                    dataType: "json"
                },
                parameterMap: function (data, type) {
                    return { AmphurID: parseInt(AmphurID) };
                }
            },
            schema: {
                parse: function (response) {
                    var data = JSON.parse(response);

                    var items = [];
                    for (var i = 0; i < data.Table.length; i++) {
                        var _item = {
                            ID: data.Table[i].ID,
                            Detail: data.Table[i].Detail
                        };

                        items.push(_item);
                    }

                    return items;
                }
            }
        }),
        onChangeProvice: function () {
            if (typeof (this.Province) != "undefined" && this.Province != null) {

                ProvinceID = this.Province.ID;
                $("#" + this.ddlAmphurID).data("kendoDropDownList").dataSource.read();
                AmphurID = 0;
                $("#" + this.ddlDistrictID).data("kendoDropDownList").dataSource.read();
            }
        },
        onChangeAmphur: function () {
            if (typeof (this.Amphur) != "undefined" && this.Amphur != null) {
                AmphurID = this.Amphur.ID;
                $("#" + this.ddlDistrictID).data("kendoDropDownList").dataSource.read();

            }
        },
        onDelete: function () {

            var ID = this.ID;

            $.ajax({
                url: 'http://localhost:13149/api/ContactPersonAddress/Delete',
                type: 'DELETE',
                async: false,
                data: { ContactPersonID: ID },
                datatype: 'json',
                success: function (data) {
                    document.location.reload();
                },
                error: function (msg) {
                    alert(msg)
                }
            });

            //$.ajax({
            //    url: 'http://localhost:13149/api/ContactPersonAddress',
            //    type: 'DELETE',
            //    async: false,
            //    data: { ContactPersonID: ID },
            //    datatype: 'json',
            //    success: function (data) {
            //        data = JSON.parse(data);

            //        bindContractAddress(contactPersonID, data.Table);
            //    },
            //    error: function (msg) {
            //        alert(msg)
            //    }
            //});
        }
    };

    return item;
}

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}