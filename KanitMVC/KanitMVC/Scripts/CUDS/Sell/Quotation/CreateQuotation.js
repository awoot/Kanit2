$(document).ready(function () {
    CheckAuthorization();
    //$(".nav-tabs a").click(function () {
    //    $(this).tab('show');
    //});
    ////$('#datetimepicker1').datetimepicker();
    //$('#datetimepicker1').datetimepicker({
    //    defaultDate: new Date(),
    //    format: 'DD/MM/YYYY'
    //});
    var dataObject = { typeID: '008' };
    $.ajax({
        url: 'http://localhost:13149/api/MasterService/',
        type: 'GET',
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
    var dataObject = {
        OrdNumber: $("#txtOrdNum").val(), ProductCode: $("#txtProductCode").val(),
        ProductDetail: $("#txtProductDetail").val(), Unit: $("#cmbUnit").find(":selected").val(),
        Remain: $("#txtRemain").val(), StandardCost: $("#txtStandardCost").val(), SellingPrice: $("#txtSellingPrice").val(),
        WarningStock: $("#txtWarningStock").val(),
        CreateBy: 1, EditBy: 1
    };
    $.ajax(
    {
        url: 'http://localhost:13149/api/Product',
        type: 'POST',
        data: dataObject,
        datatype: 'json',

        success: function (data) {
            //alert('Created Successfully');
            window.location.href = "../Product/IndexProduct";
        },
        error: function (msg) { alert(msg); }
    });
}
function convertFloat(str) {
    
    $(str).val($(str).val().replace(',', '')).formatNumber({ format: "#,###.00", locale: "us" });
}
function Redirect() {
    window.location.href = "../Product/IndexProduct";
}