$(document).ready(function () {
    CheckAuthorization();
    $(".nav-tabs a").click(function () {
        $(this).tab('show');
    });
    GetCreditTerm();
    GetPaymentType();
    GetCustomerSegment();
    GetCompanyType();
    GetCompanyParent();

    // ========= Address
    //GetAddressType();
    //GetProvince();
    //GetAmphurByProvince();
    //GetDistrictByAmphur();

    // ========= Contact Person
    //GetSalutation();
    //GetEmailLetters();
});
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
function GetProvince()
{
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
function GetCompanyParent()
{
    var TempMenu;
    $.ajax({
        url: 'http://localhost:13149/api/IndustryMaster',
        type: 'GET',
        async: false,
        dataType: 'json',
        //data: dataObject,
        success: function (data) {
            data = JSON.parse(data);
            var html = '';
            for (var i = 0; i < data.Table.length; i++) {
                html += '<tr class="RowCal">';
                ////html += '<td class="hidecolumn"><input type="hidden" class="hidTempGroupName" value="' + data.Table[i].GroupName + '"/></td>';
                html += '<td class="hidecolumn"><input type="hidden" class="hidMenuTypeID" value="' + data.Table[i].ID + '"/></td>';
                html += '<td class="width50"><input id="chkIsSelect" type="checkbox" class="IsSelect"></td>';
                //html += '<td class="width50">'+ data.Table[i].RowNum + '</td>';
                html += '<td>'+ data.Table[i].Detail + '</td>';
                html += '</tr>';
            }
            document.getElementById("resultSecurityProfile").innerHTML = html;

        },
        error: function (msg) {
            alert(msg)
        }
    });
}

$(document).on('click', '#close-preview', function () {
    $('.image-preview').popover('hide');
    // Hover befor close the preview
    $('.image-preview').hover(
        function () {
            $('.image-preview').popover('show');
        },
         function () {
             $('.image-preview').popover('hide');
         }
    );
});
$(function () {
    // Create the close button
    var closebtn = $('<button/>', {
        type: "button",
        text: 'x',
        id: 'close-preview',
        style: 'font-size: initial;',
    });
    closebtn.attr("class", "close pull-right");
    // Set the popover default content
    $('.image-preview').popover({
        trigger: 'manual',
        html: true,
        title: "<strong>Preview</strong>" + $(closebtn)[0].outerHTML,
        content: "There's no image",
        placement: 'bottom'
    });
    // Clear event
    $('.image-preview-clear').click(function () {
        $('.image-preview').attr("data-content", "").popover('show');
        $('.image-preview-filename').val("");
        $('.image-preview-clear').hide();
        $('.image-preview-input input:file').val("");
        $(".image-preview-input-title").text("Browse");
    });
    // Create the preview image
    $(".image-preview-input input:file").change(function () {
        var img = $('<img/>', {
            id: 'dynamic',
            width: 250,
            height: 200
        });
        var file = this.files[0];
        var reader = new FileReader();
        // Set preview image into the popover data-content
        reader.onload = function (e) {
            $(".image-preview-input-title").text("Change");
            $(".image-preview-clear").show();
            $(".image-preview-filename").val(file.name);
            img.attr('src', e.target.result);
            $(".image-preview").attr("data-content", $(img)[0].outerHTML).popover("show");
        }
        reader.readAsDataURL(file);
    });
});
function CreateData() {
    //var Price = $("#txtPricelist").val().replace(',', '');
    //alert($("#cmbCurrency").find(":selected").val());
    var dataObject = {};
    //var temp = [];
    //var temp1;
    //$(".RowCal").each(function () {
    //    if ($(this).find('td:eq(1)').text() != '1. DashBoard' && $(this).find('td:eq(1)').text() != '2. Quotation' && $(this).find('td:eq(1)').text() != '3. Product'
    //    && $(this).find('td:eq(1)').text() != '4. Quotation' && $(this).find('td:eq(1)').text() != '5. Setting') {
    //        //dataObject.SecurityID = SecurityID;
    //        dataObject.MenuID = $(this).find('td:eq(1)').text() != '1. DashBoard' && $(this).find('td:eq(1)').text() != '2. Quotation' && $(this).find('td:eq(1)').text() != '3. Product'
    //    && $(this).find('td:eq(1)').text() != '4. Quotation' && $(this).find('td:eq(1)').text() != '5. Setting' ? $(this).find(".hidMenuTypeID").val() : 0;
    //        dataObject.IsView = $(this).find('.IsView').is(":checked") == true ? 1 : 0;
    //        if ($(this).find('.IsView').is(":checked"))
    //        {
    //            temp.push(dataObject.MenuID);
    //            temp1 = temp.toString();;
    //        }
    //    }
    //});
    //console.log(temp1);
    //alert(temp1);
    var dataObject = {
        CompanyCode: $("#txtCompanyCode").val(), CompanyNameTH: $("#txtCompanyNameTH").val(),
        CompanyNameEN: $("#txtCompanyNameEN").val(), CompanyTypeID: $("#cmbCompanyType").find(":selected").val(),
        CustSegment: $("#cmbCustomerSegment").find(":selected").val(), Validity: $("#txtValidity").val(),
        PaymentTypeID: $("#cmbPaymentType").find(":selected").val(), CreditTerm: $("#cmbCreditTerm").find(":selected").val(),
        CreditLimit: $("#txtCreditLimit").val(), ParentCompany: $("#txtParentCompany").val(), KeyAccountSR: $("#txtKeyAccountSR").val(),
        CreateBy: 1, EditBy: 1
    };
    var CompID;
    $.ajax(
    {
        url: 'http://localhost:13149/api/Company',
        type: 'POST',
        data: dataObject,
        datatype: 'json',
        async: false,
        success: function (data) {
            CompID = data;
            //alert(CompID);
        },
        error: function (msg) { alert(msg); }
    });
    //alert(CompID);
    if (CompID > 0)
    {
        $(".RowCal").each(function () {
                dataObject.CompID = CompID;
                dataObject.IsSelect = $(this).find('.IsSelect').is(":checked") == true ? 1 : 0;
                dataObject.MasterID = $(this).find(".hidMenuTypeID").val();
            //    dataObject.MenuID = $(this).find('td:eq(1)').text() != '1. DashBoard' && $(this).find('td:eq(1)').text() != '2. Quotation' && $(this).find('td:eq(1)').text() != '3. Product'
            //&& $(this).find('td:eq(1)').text() != '4. Quotation' && $(this).find('td:eq(1)').text() != '5. Setting' ? $(this).find(".hidMenuTypeID").val() : 0;
                dataObject.CreateBy = 1;
                dataObject.EditBy = 1;
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
    //if (CompID > 0)
    //{
    //    //================================================== Address =====================================================
    //    var IsPrimary = $(this).find('.chkPrimary').is(":checked") == true ? '1' : '0';
    //    var dataObject = { CompID: CompID,
    //        TaxID: $("#txtTaxID").val(), Branch: $("#txtBranch").val(),
    //        Address: $("#txtAddress").val(), Province: $("#cmbProvince").find(":selected").val(),Amphur:$("#cmbAmphur").find(":selected").val(),
    //        Tambon: $("#cmbTambon").find(":selected").val(), PostCode: $("#txtPostCode").val(),
    //        TelNo: $("#txtTelNo").val(), TelExt: $("#txtTelExt").val(),
    //        MobileNo: $("#txtMobileNo").val(), FaxNo: $("#txtFaxNo").val(),
    //        AddressTypeID: $("#cmbAddressType").find(":selected").val(), IsPrimary: IsPrimary,CreateBy: 1, EditBy: 1
    //    };
    //    $.ajax(
    //    {
    //        url: 'http://localhost:13149/api/Address',
    //        type: 'POST',
    //        data: dataObject,
    //        datatype: 'json',
    //        async: false,
    //        success: function (data) {
    //        },
    //        error: function (msg) { alert(msg); }
    //    });
    //    //================================================== Contact Person =====================================================
    //    var dataObject = {
    //        CompID: CompID,
    //        Salutation: $("#cmbSalutation").find(":selected").val(), FirstNameTH: $("#txtFirstNameTH").val(),
    //        LastNameTH: $("#txtLastNameTH").val(), FirstNameEN: $("#txtFirstNameEN").val(),
    //        LastNameEN: $("#txtLastNameEN").val(), MobileNo: $("#txtContactMobile").val(),
    //        Email: $("#txtContactEmail").val(), EmailLetters: $("#cmbEmailLetter").find(":selected").val(),
    //        CreateBy: 1, EditBy: 1
    //    };
    //    $.ajax(
    //    {
    //        url: 'http://localhost:13149/api/ContactPerson',
    //        type: 'POST',
    //        data: dataObject,
    //        datatype: 'json',
    //        async: false,
    //        success: function (data) {
    //        },
    //        error: function (msg) { alert(msg); }
    //    });
    //}
    //alert("CompID "+CompID);
    window.location.href = "../Company/EditCompany?id=" + CompID;
}
function convertFloat(str) {
    
    $(str).val($(str).val().replace(',', '')).formatNumber({ format: "#,###.00", locale: "us" });
}
function Redirect() {
    window.location.href = "../Company/IndexCompany";
}