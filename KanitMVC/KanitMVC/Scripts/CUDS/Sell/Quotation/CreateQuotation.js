$(document).ready(function () {
    CheckAuthorization();
    //$(".nav-tabs a").click(function () {
    //    $(this).tab('show');
    //});
    //$('#datetimepicker1').datetimepicker();

    $("#resultCompany").on("click", "tr", function (e) {
        $("#txtCustomerName").val($(this).find("td:eq(2)").text());
        $("#hidCompID").val($(this).find("td:eq(1)").text());
        //alert($("#hidCompID").val());
    })

    $('#dtQuotationDate').datetimepicker({
        defaultDate: new Date(),
        format: 'DD/MM/YYYY'
    });
    $('#dtWarningDate').datetimepicker({
        defaultDate: new Date(),
        format: 'DD/MM/YYYY'
    });
    GetIncoTerm();
    GetState();
    GetSeller();
    GetVat();
});

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
function GetIncoTerm()
{
    var dataObject = { typeID: '010' };
    $.ajax({
        url: 'http://localhost:13149/api/MasterService/',
        type: 'GET',
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
function BrowseCompany()
{
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
            $.each(data.Table, function (i) {
                $('#cmbVat').append($('<option></option>').val(data.Table[i].ID).html(data.Table[i].Detail));
            });
            $('#cmbVat').find('option:first-child').attr('selected', true);
        },
        failure: function () {
            alert('Error');
        }
    });
}
function CreateData() {
    //var Price = $("#txtPricelist").val().replace(',', '');
        var readResult;
        var AttachPath;
        var FileData;
        var fileUpload = document.getElementById('FileUpload1');
        var fileUploadValue = fileUpload.value;
        if (fileUploadValue != '') {
            //alert("Test");
            var date = new Date();
            var d = date.getDate();
            var m = date.getMonth();
            var y = date.getYear();
            var tmp1 = y.toString();
            var tmp2 = tmp1.substring(1, 3);
            var tmpDate = d + "_" + m + "_" + tmp2 + "_";
            var file = fileUpload.files[0];
            var AttachFileName = tmpDate + file.name;
            //alert(fileUpload[i].name);
            AttachPath = ("../Attach/Product/" + AttachFileName);

            //FileData = getBase64(file);
            //alert(FileData);
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = function () {
                readResult = reader.result;
                var FileSource = readResult.split(",");
                FileData = FileSource[1];
                FileData = FileData.toString();
                localStorage['FileData1'] = FileData;
                //alert(FileData);
                //var dataObject = { RefID: ProductID, AttachName: AttachFileName, AttachPath: AttachPath, AttachData: img, CreateBy: localStorage['UserID'], EditBy: localStorage['UserID'] };
            }
        }
        //alert(AttachPath);
        //alert("FileData1 "+localStorage['FileData1']);
        var QuotationID;
        var quotationDate = ChangeformatDate($("#txtQuotationDate").val(), 1);
        var warningDate = ChangeformatDate($("#txtWarningDate").val(), 1);
        var dataObject = {
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
            Vat: $("#cmbVat").find(":selected").val(),
            CreateBy: 1, EditBy: 1
        };
        $.ajax(
        {
            url: 'http://localhost:13149/api/Quotation',
            type: 'POST',
            data: dataObject,
            datatype: 'json',
            async: false,
            success: function (data) {
                //alert('Created Successfully');
                QuotationID = data;
            },
            error: function (msg) { alert(msg); }
        });
    
    window.location.href = "../Quotation/EditQuotation?id" + QuotationID;
}

function convertFloat(str) {
    
    $(str).val($(str).val().replace(',', '')).formatNumber({ format: "#,###.00", locale: "us" });
}
function Redirect() {
    window.location.href = "../Quotation/IndexQuotation";
}