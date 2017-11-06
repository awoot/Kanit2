$(document).ready(function () {
    CheckAuthorization();
});
function GetFirstPage() {
    var dataObject = { Group: '1' };
    $.ajax({
        url: 'http://localhost:13149/api/MenuMaster/GetMenuAll',
        type: 'GET',
        dataType: 'json',
        async: false,
        data: dataObject,
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
}
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
    //alert('test');
    //CheckAuthorization();
    var TempMenu;
    var dataObject = { ID: val }
    $.ajax(
   {
       url: 'http://localhost:13149/api/SecurityProfile',
       type: 'GET',
       async: false,
       data: dataObject,
       datatype: 'json',
       success: function (data) {
           data = JSON.parse(data);
           $("#txtProfile").val(data.Table[0].Profile);
           $("#cmbFirstPage").val(data.Table[0].MenuID);
           GetFirstPageDetail();
           $("#cmbFirstPageDetail").val(data.Table[0].MenuDetailID);
           //alert(data.Table1.length);
           if (data.Table1.length > 0) {

               var html = '';
               for (var i = 0; i < data.Table1.length; i++) {
                   //alert(data.Table1[i].IsView);
                   var IsView = data.Table1[i].IsView == '1' ? 'Checked' : '';
                   var IsInsert = data.Table1[i].IsInsert == '1' ? 'Checked' : '';
                   var IsUpdate = data.Table1[i].IsUpdate == '1' ? 'Checked' : '';
                   var IsDelete = data.Table1[i].IsDelete == '1' ? 'Checked' : '';

                   html += '<tr class="RowCal">';
                   //html += '<td class="hidecolumn"><input type="hidden" class="hidMenuTypeID" value="' + data.Table1[i].MenuMasterID + '"/></td>';
                   //html += '<td class="hidecolumn"><input type="hidden" class="hidID" value="' + data.Table1[i].ID + '"/></td>';
                   if (TempMenu != data.Table1[i].GroupID) {
                       TempMenu = data.Table1[i].GroupID;
                       html += '<td class="hidecolumn"></td>';
                       html += '<td colspan="5" Style="font-weight: bold;">' + data.Table1[i].MasterID + '. ' + data.Table1[i].GroupName + '</td>';
                       html += '<tr class="RowCal">';
                       //html += '<td class="hidecolumn"><input type="hidden" class="hidTempGroupName" value="' + data.Table1[i].GroupName + '"/></td>';
                       html += '<td class="hidecolumn"><input type="hidden" class="hidMenuTypeID" value="' + data.Table1[i].MenuDetailID + '"/></td>';
                       html += '<td class="hidecolumn"><input type="hidden" class="hidID" value="' + data.Table1[i].ID + '"/></td>';
                       html += '<td Style="margin-left:5px">' + '&nbsp;&nbsp;' + '- ' + data.Table1[i].Detail + '</td>';
                       html += '<td><input id="chkIsView" type="checkbox" class="IsView" ' + IsView + ' ></td>';
                       html += '<td><input id="chkIsInsert" type="checkbox" class="IsInsert" onchange="GetChecked()"  ' + IsInsert + '></td>';
                       html += '<td><input id="chkIsUpdate" type="checkbox" class="IsUpdate" onchange="GetChecked()"  ' + IsUpdate + '></td>';
                       html += '<td><input id="chkIsDelete" type="checkbox" class="IsDelete"  ' + IsDelete + '></td>';
                       html += '</tr>';
                   }
                   else {
                       html += '<td>' + '&nbsp;&nbsp;' + '- ' + data.Table1[i].Detail + '</td>';
                       html += '<td class="hidecolumn"><input type="hidden" class="hidMenuTypeID" value="' + data.Table1[i].MenuDetailID + '"/></td>';
                       html += '<td class="hidecolumn"><input type="hidden" class="hidID" value="' + data.Table1[i].ID + '"/></td>';
                       html += '<td><input id="chkIsView" type="checkbox" class="IsView" ' + IsView + ' ></td>';
                       html += '<td><input id="chkIsInsert" type="checkbox" class="IsInsert" onchange="GetChecked()"  ' + IsInsert + '></td>';
                       html += '<td><input id="chkIsUpdate" type="checkbox" class="IsUpdate" onchange="GetChecked()"  ' + IsUpdate + '></td>';
                       html += '<td><input id="chkIsDelete" type="checkbox" class="IsDelete"  ' + IsDelete + '></td>';
                       //html += '<td class="hidecolumn"><input type="hidden" class="hidTempGroupName" value="' + data.Table1[i].Detail + '"/></td>';
                       TempMenu = data.Table1[i].GroupID;
                   }
                   html += '</tr>';
               }
               document.getElementById("resultSecurityProfile").innerHTML = html;
           }
       },
       error: function (msg) {
           alert(msg);
       }

   });
}
function GetChecked() {
    $(".RowCal").each(function () {
        if ($(this).find('.IsInsert').css('display') != 'none' || $(this).find('.IsUpdate').css('display') != 'none') {
            var IsInsert = $(this).find('.IsInsert').is(":checked");
            var IsUpdate = $(this).find('.IsUpdate').is(":checked");
            //var IsDelete = $(this).find('.IsDelete').is(":checked");

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
function Update(val) {
    //alert(val);
    var ProfileID = parseInt(val);
    var dataObject = { ID: ProfileID, Profile: $("#txtProfile").val(), MenuID: $('#cmbFirstPage').find(":selected").val(), MenuDetailID: $('#cmbFirstPageDetail').find(":selected").val(), EditBy: localStorage['UserID'] };
    var SecurityID = val;
    console.log(dataObject);
    $.ajax(
    {
        url: 'http://localhost:13149/api/SecurityProfile',
        type: 'PUT',
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
    //alert(val);
    var dataObject = { ID: val };
    $.ajax(
    {
        url: 'http://localhost:13149/api/SecurityProfileDetail',
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

    var dataObject = {};
    $(".RowCal").each(function () {
        if ($(this).find('td:eq(1)').text() != '1. DashBoard' && $(this).find('td:eq(1)').text() != '2. Administrator' && $(this).find('td:eq(1)').text() != '3. Activity'
            && $(this).find('td:eq(1)').text() != '4. Technician & Card' && $(this).find('td:eq(1)').text() != '5. Tools & Machine' && $(this).find('td:eq(1)').text() != '6. Estimate & Job Order' && $(this).find('td:eq(1)').text() != '7. Payment' && $(this).find('td:eq(1)').text() != '8. Report') {
            //dataObject.ID = $(this).find(".hidID").val();
            dataObject.SecurityID = SecurityID;
            dataObject.MenuID = $(this).find(".hidMenuTypeID").val();
            dataObject.IsView = $(this).find('.IsView').is(":checked") == true ? 1 : 0;
            dataObject.IsInsert = $(this).find('.IsInsert').is(":checked") == true ? 1 : 0;
            dataObject.IsUpdate = $(this).find(".IsUpdate").is(":checked") == true ? 1 : 0;
            dataObject.IsDelete = $(this).find(".IsDelete").is(":checked") == true ? 1 : 0;
            dataObject.CreateBy = localStorage['UserID'];
            dataObject.EditBy = localStorage['UserID'];
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
    //alert('Update is completed')
    //window.location.href = "../SecurityProfile/IndexSecurityProfile";
    Redirect();
};
function Redirect() {
    window.location.href = "../SecurityProfile/IndexSecurityProfile";
}