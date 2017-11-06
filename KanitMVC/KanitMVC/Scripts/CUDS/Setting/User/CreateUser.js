$(document).ready(function () {
    CheckAuthorization();
    var dataObject = { typeID: '015' };
    $.ajax({
        url: 'http://localhost:13149/api/MasterService/',
        type: 'GET',
        dataType: 'json',
        data: dataObject,
        async: false,
        success: function (data) {
            data = JSON.parse(data);
            //alert('test');
            $.each(data.Table, function (i) {
                $('#cmbDepartment').append($('<option></option>').val(data.Table[i].ID).html(data.Table[i].Detail));
            });
            $('#cmbDepartment').find('option:first-child').attr('selected', true);
        },
        failure: function () {
            alert('Error');
        }
    });
    var dataObject = { typeID: '016' };
    $.ajax({
        url: 'http://localhost:13149/api/MasterService/',
        type: 'GET',
        dataType: 'json',
        data: dataObject,
        async: false,
        success: function (data) {
            data = JSON.parse(data);
            //alert('test');
            $.each(data.Table, function (i) {
                $('#cmbPosition').append($('<option></option>').val(data.Table[i].ID).html(data.Table[i].Detail));
            });
            $('#cmbPosition').find('option:first-child').attr('selected', true);
        },
        failure: function () {
            alert('Error');
        }
    });

    var dataObject = { typeID: '017' };
    $.ajax({
        url: 'http://localhost:13149/api/MasterService/',
        type: 'GET',
        dataType: 'json',
        data: dataObject,
        async: false,
        success: function (data) {
            data = JSON.parse(data);
            //alert('test');
            $.each(data.Table, function (i) {
                $('#cmbQuotation').append($('<option></option>').val(data.Table[i].ID).html(data.Table[i].Detail));
            });
            $('#cmbQuotation').find('option:first-child').attr('selected', true);
        },
        failure: function () {
            alert('Error');
        }
    });
    $.ajax({
        url: 'http://localhost:13149/api/SecurityProfile/',
        type: 'GET',
        async: false,
        dataType: 'json',
        async: false,
        success: function (data) {
            data = JSON.parse(data);
            $.each(data.Table, function (i) {
                $('#cmbSecurityProfile').append($('<option></option>').val(data.Table[i].ID).html(data.Table[i].Profile));
            });
            $('#cmbSecurityProfile').find('option:first-child').attr('selected', true);
        },
        failure: function () {
            alert('Error');
        }
    });
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
function CreateData() {
    //var Price = $("#txtPricelist").val().replace(',', '');
    //alert($("#cmbCurrency").find(":selected").val());
    var dataObject = { UserName: $("#txtUserName").val(), Password: $("#txtPassword").val(), FirstName: $("#txtFirstName").val(), LastName: $("#txtLastName").val(), Email: $("#txtEmail").val(), Department: $("#cmbDepartment").find(":selected").val(), Position: $("#cmbPosition").find(":selected").val(), Quotation: $("#cmbQuotation").find(":selected").val(), SecurityID: $("#cmbSecurityProfile").find(":selected").val(), CreateBy: 1, EditBy: 1 };
    $.ajax(
    {
        url: 'http://localhost:13149/api/User',
        type: 'POST',
        data: dataObject,
        async: false,
        datatype: 'json',
        success: function (data) {
            //alert('Created Successfully');
            window.location.href = "../User/IndexUser";
        },
        error: function (msg) { alert(msg); }
    });
}
function convertFloat(str) {
    
    $(str).val($(str).val().replace(',', '')).formatNumber({ format: "#,###.00", locale: "us" });
}
function Redirect() {
    window.location.href = "../User/IndexUser";
}