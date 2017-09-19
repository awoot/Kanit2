$(document).ready(function () {
    CheckAuthorization();
    $.ajax({
        url: 'http://localhost:13149/api/MenuMaster/GetMenuAll',
        type: 'GET',
        dataType: 'json',
        async: false,
        success: function (data) {
            data = JSON.parse(data);
            $.each(data.Table, function (i) {
                $('#cmbFirstPage').append($('<option></option>').val(data.Table[i].ID).html(data.Table[i].Detail));
            });
            $('#cmbFirstPage').find('option:first-child').attr('selected', true);
        },
        failure: function () {
            alert('Error');
        }
    });
    //alert("FirstPage" + $('#cmbFirstPage').val());
    GetFirstPageDetail();

    var TempMenu;
    $.ajax({
        url: 'http://localhost:13149/api/MenuMaster',
        type: 'GET',
        async: false,
        dataType: 'json',
        //data: dataObject,
        success: function (data) {
            data = JSON.parse(data);
            var html = '';
            for (var i = 0; i < data.Table.length; i++) {
                html += '<tr class="RowCal">';
                if (TempMenu != data.Table[i].GroupID) {
                    TempMenu = data.Table[i].GroupID;
                    html += '<td colspan="6" Style="font-weight: bold;">' + data.Table[i].MasterID + '. ' + data.Table[i].GroupName + '</td>';
                    html += '<tr class="RowCal">';
                    //html += '<td class="hidecolumn"><input type="hidden" class="hidTempGroupName" value="' + data.Table[i].GroupName + '"/></td>';
                    html += '<td class="hidecolumn"><input type="hidden" class="hidMenuTypeID" value="' + data.Table[i].ID + '"/></td>';
                    html += '<td>' + '&nbsp;&nbsp;' + '- ' + data.Table[i].Detail + '</td>';
                    html += '<td><input id="chkIsView" type="checkbox" class="IsView"></td>';
                    html += '<td><input id="chkIsInsert" type="checkbox" class="IsInsert" onchange="GetChecked()"></td>';
                    html += '<td><input id="chkIsUpdate" type="checkbox" class="IsUpdate" onchange="GetChecked()"></td>';
                    html += '<td><input id="chkIsDelete" type="checkbox" class="IsDelete"></td>';
                    html += '</tr>';
                }
                else {
                    html += '<td>' + '&nbsp;&nbsp;' + '- ' + data.Table[i].Detail + '</td>';
                    html += '<td class="hidecolumn"><input type="hidden" class="hidMenuTypeID" value="' + data.Table[i].ID + '"/></td>';
                    html += '<td><input id="chkIsView" type="checkbox" class="IsView"></td>';
                    html += '<td><input id="chkIsInsert" type="checkbox" class="IsInsert" onchange="GetChecked()"></td>';
                    html += '<td><input id="chkIsUpdate" type="checkbox" class="IsUpdate" onchange="GetChecked()"></td>';
                    html += '<td><input id="chkIsDelete" type="checkbox" class="IsDelete"></td>';
                    //html += '<td class="hidecolumn"><input type="hidden" class="hidTempGroupName" value="' + data.Table[i].Detail + '"/></td>';
                    TempMenu = data.Table[i].GroupID;
                }
                html += '</tr>';
            }
            document.getElementById("resultSecurityProfile").innerHTML = html;

        },
        error: function (msg) {
            alert(msg)
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
function GetFirstPageDetail() {
    //alert("test");
    var val = $('#cmbFirstPage:last').find(":selected").val();
    //alert(val);
    var dataObject = { ID: parseInt(val) };
    $.ajax({
        url: 'http://localhost:13149/api/MenuMaster/',
        type: 'GET',
        dataType: 'json',
        async: false,
        data: dataObject,
        success: function (data) {
            data = JSON.parse(data);
            $('#cmbFirstPageDetail').find("option").remove();
            $.each(data.Table, function (i) {
                $('#cmbFirstPageDetail').append($('<option></option>').val(data.Table[i].ID).html(data.Table[i].Detail));
            });
            $('#cmbFirstPageDetail').find('option:first-child').attr('selected', true);
        },
        failure: function () {
            alert('Error');
        }
    });
}
function GetChecked() {
    //alert("test");
    $(".RowCal").each(function () {
        if ($(this).find('.IsInsert').css('display') != 'none' || $(this).find('.IsUpdate').css('display') != 'none') {
            var IsInsert = $(this).find('.IsInsert').is(":checked");
            var IsUpdate = $(this).find('.IsUpdate').is(":checked");
            //alert(IsInsert);
            if (IsInsert || IsUpdate) {
                $(this).find('.IsView').prop('checked', true);
                $(this).find('.IsView').prop('disabled', true);
            }
            else if (IsInsert == false && IsUpdate == false) {
                $(this).find('.IsView').prop('checked', false);
                $(this).find('.IsView').prop('disabled', false);
            }
        }
    });
}
function CreateData() {
    var dataObject = { Profile: $("#txtProfile").val(), MenuID: $('#cmbFirstPage').find(":selected").val(), MenuDetailID: $('#cmbFirstPageDetail').find(":selected").val(), CreateBy: 1, EditBy: 1 };
    var SecurityID;
    console.log(dataObject);
    $.ajax(
    {
        url: 'http://localhost:13149/api/SecurityProfile',
        type: 'POST',
        async: false,
        data: dataObject,
        datatype: 'json',
        success: function (data) {
            //alert('data '+data);
            SecurityID = data;
            //alert(SecurityID);
        }
        ,
        error: function (msg) {
            alert(msg)
        }
    });

    var dataObject = {};
    //alert(SecurityID);
    if (SecurityID > 0)
    {
        $(".RowCal").each(function () {
            if ($(this).find('td:eq(1)').text() != '1. DashBoard' && $(this).find('td:eq(1)').text() != '2. Quotation' && $(this).find('td:eq(1)').text() != '3. Product'
            && $(this).find('td:eq(1)').text() != '4. Quotation' && $(this).find('td:eq(1)').text() != '5. Setting') {
                dataObject.SecurityID = SecurityID;
                dataObject.MenuID = $(this).find('td:eq(1)').text() != '1. DashBoard' && $(this).find('td:eq(1)').text() != '2. Quotation' && $(this).find('td:eq(1)').text() != '3. Product'
            && $(this).find('td:eq(1)').text() != '4. Quotation' && $(this).find('td:eq(1)').text() != '5. Setting' ? $(this).find(".hidMenuTypeID").val() : 0;
                dataObject.IsView = $(this).find('.IsView').is(":checked") == true ? 1 : 0;
                dataObject.IsInsert = $(this).find('.IsInsert').is(":checked") == true ? 1 : 0;
                dataObject.IsUpdate = $(this).find(".IsUpdate").is(":checked") == true ? 1 : 0;
                dataObject.IsDelete = $(this).find(".IsDelete").is(":checked") == true ? 1 : 0;
                dataObject.CreateBy = 1;
                dataObject.EditBy = 1;
                $.ajax(
                {
                    url: 'http://localhost:13149/api/SecurityProfileDetail',
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
    }
    window.location.href = "../SecurityProfile/IndexSecurityProfile";
}
function Redirect() {
    window.location.href = "../SecurityProfile/IndexSecurityProfile";
}