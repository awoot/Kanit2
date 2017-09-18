function Isvalidate(val, topic, id) {
    var validatehtml = '';
    if (topic == "ExchangeRate") {
        if ($("#txtRate").val() == '') {
            validatehtml += '<div class="modal-body modal-body-Warning">Please input Rate.</div>';
        }
    }
    //if (topic == "ExpenseMaster") {
    //    if ($("#txtDetail").val() == '') {
    //        validatehtml += '<div class="modal-body modal-body-Warning">Please input Detail.</div>';
    //    }
    //    if ($("#txtPricelist").val() == '') {
    //        validatehtml += '<div class="modal-body modal-body-Warning">Please input Price list.</div>';
    //    }
    //    if ($("#txtSeq").val() == '') {
    //        validatehtml += '<div class="modal-body modal-body-Warning">Please input Sequence.</div>';
    //    }
    //}
    //if (topic == "Products") {
    //    if ($("#cmbProductType").val() == '') {
    //        validatehtml += '<div class="modal-body modal-body-Warning">Please input ประเภทสินค้า.</div>';
    //    }
    //    if ($("#dtReceiveDate").val() == '') {
    //        validatehtml += '<div class="modal-body modal-body-Warning">Please input วันที่รับเข้า.</div>';
    //    }
    //    if ($("#txtBalance").val() == '') {
    //        validatehtml += '<div class="modal-body modal-body-Warning">Please input ยกมา.</div>';
    //    }
    //    if ($("#txtRemain").val() == '') {
    //        validatehtml += '<div class="modal-body modal-body-Warning">Please input คงเหลือ.</div>';
    //    }
    //}
    //if (topic == "BDC") {
    //    if ($("#hidQuoID").val() == '' && $("#txtQuoNo").val() == '') {
    //        validatehtml += '<div class="modal-body modal-body-Warning">Please input QuotationNo.</div>';
    //    }
    //}
    //if (topic == "JobOrderBorrow"){
    //    //if ($("#txtQty").val() == '') {
    //    //    validatehtml += '<div class="modal-body modal-body-Warning">Please input จำนวนที่ยืม.</div>';
    //    //}
    //}
    //if (topic == "JobOrder") {
    //    $(".RowCal5").each(function () {
    //        var fName = $(this).find('.FName').val();
    //        var manDate = $(this).find('.ManDate').val();
    //        var workingFrom = $(this).find('.WorkingFrom').val();
    //        var WorkingTo = $(this).find('.WorkingTo').val();

    //        if (fName != '') {
    //            if (manDate == '') {
    //                validatehtml += '<div class="modal-body modal-body-Warning">Please input Date.</div>';
    //            }
    //            if (workingFrom == '') {
    //                validatehtml += '<div class="modal-body modal-body-Warning">Please input FROM.</div>';
    //            }
    //            if (WorkingTo == '') {
    //                validatehtml += '<div class="modal-body modal-body-Warning">Please input TO.</div>';
    //            }
    //        }
    //    });
    //    if ($("#dtJobDate").val() == '') {
    //        validatehtml += '<div class="modal-body modal-body-Warning">Please input วันที่.</div>';
    //    }
    //    if ($("#dtSWorking").val() == '') {
    //        validatehtml += '<div class="modal-body modal-body-Warning">Please input วันเริ่มทำงาน.</div>';
    //    }
    //    if ($("#dtEWorking").val() == '') {
    //        validatehtml += '<div class="modal-body modal-body-Warning">Please input วันจบงาน.</div>';
    //    }
    //    if ($("#txtJobBy").val() == '') {
    //        validatehtml += '<div class="modal-body modal-body-Warning">Please input รับงานโดย.</div>';
    //    }
    //    if ($("#txtIssuedBy").val() == '') {
    //        validatehtml += '<div class="modal-body modal-body-Warning">Please input ออกโดย.</div>';
    //    }
    //    //if ($("#hidCustID").val() == '') {
    //    //    validatehtml += '<div class="modal-body modal-body-Warning">Please input ลูกค้า.</div>';
    //    //}
    //}
    //if (topic == "SecurityProfile") {
    //    if ($("#txtProfile").val() == '') {
    //        validatehtml += '<div class="modal-body modal-body-Warning">Please input Profile.</div>';
    //    }
    //}
    //if (topic == "ProductAdjust") {

    //    if (parseFloat($("#txtAdded").val()) == 0 && parseFloat($("#txtDeduction").val()) == 0) {
    //        validatehtml += '<div class="modal-body modal-body-Warning">กรุณากรอกข้อมูลเพิ่มหรือลด.</div>';
    //    }
    //    if ($("#hidProductID").val() == '') {
    //        validatehtml += '<div class="modal-body modal-body-Warning">Please Select Stock.</div>';
    //    }
    //}
    //if (topic == "User") {
    //    if ($("#txtUserName").val() == '') {
    //        validatehtml += '<div class="modal-body modal-body-Warning">Please input UserName.</div>';
    //    }
    //    if ($("#txtPassword").val() == '') {
    //        validatehtml += '<div class="modal-body modal-body-Warning">Please input Password.</div>';
    //    }
    //}
    if (validatehtml != '')
    {
            $('#ShowDialog').modal('show');
            var html = '<div class="modal-dialog modal-dialog-warning">';
            html += '<div class="modal-content">';
            html += '<div class="modal-header modal-header-warning">';
            html += '<button type="button" class="close" data-dismiss="modal">&times;</button>';
            html += '<h4 class="modal-title">' + topic + '</h4>';
            html += '</div>';
            html += validatehtml;
            html += '</div></div>';
            document.getElementById("ShowDialog").innerHTML = html;
    }
    else
    {
        ConfirmDialog(val, topic, id);
    }
}
function ConfirmDialog(val, topic, id) {
    if (val == "Create") {
            $('#ShowDialog').modal('show');
            var html = '<div class="modal-dialog modal-dialog-info">';
            html += '<div class="modal-content">';
            html += '<div class="modal-header modal-header-info">';
            html += '<button type="button" class="close" data-dismiss="modal">&times;</button>';
            html += '<h4 class="modal-title">' + topic + '</h4>';
            html += '</div>';
            html += '<div class="modal-body modal-body-info">Do you want to save?</div>';
            html += '<div class="modal-footer">';
            html += '<button type="button" class="btn btn-info" onclick="CreateData()">Yes</button>';
            html += '<button type="button" class="btn btn-info" data-dismiss="modal">No</button>';
            html += '</div></div></div>';
            document.getElementById("ShowDialog").innerHTML = html;
    }
    else if (val == "Update") {
        //alert("Confirm Update");
            $('#ShowDialog').modal('show');
            var html = '<div class="modal-dialog modal-dialog-info">';
            html += '<div class="modal-content">';
            html += '<div class="modal-header modal-header-info">';
            html += '<button type="button" class="close" data-dismiss="modal">&times;</button>';
            html += '<h4 class="modal-title">' + topic + '</h4>';
            html += '</div>';
            html += '<div class="modal-body modal-body-info">Do you want to update?</div>';
            html += '<div class="modal-footer">';
        //html += '<button type="button" class="btn btn-info" onclick="Update(' + id + ')" onblur="Redirect()">Yes</button>';
            html += '<button type="button" class="btn btn-info" onclick="Update(' + id + ')">Yes</button>';
            html += '<button type="button" class="btn btn-info" data-dismiss="modal">No</button>';
            html += '</div></div></div>';
            document.getElementById("ShowDialog").innerHTML = html;
    }
    else if (val == "Delete") {
            $('#ShowDialog').modal('show');
            var html = '<div class="modal-dialog modal-dialog-info">';
            html += '<div class="modal-content">';
            html += '<div class="modal-header modal-header-info">';
            html += '<button type="button" class="close" data-dismiss="modal">&times;</button>';
            html += '<h4 class="modal-title">' + topic + '</h4>';
            html += '</div>';
            html += '<div class="modal-body modal-body-info">Do you want to delete?</div>';
            html += '<div class="modal-footer">';
            html += '<button type="button" class="btn btn-danger" onclick="RowDelete(' + id + ')">Confirm</button>';
            html += '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>';
            html += '</div></div></div>';
            document.getElementById("ShowDialog").innerHTML = html;
    }
    else if (val == "DeleteContactPerson") {
        $('#ShowDialog').modal('show');
        var html = '<div class="modal-dialog modal-dialog-info">';
        html += '<div class="modal-content">';
        html += '<div class="modal-header modal-header-info">';
        html += '<button type="button" class="close" data-dismiss="modal">&times;</button>';
        html += '<h4 class="modal-title">' + topic + '</h4>';
        html += '</div>';
        html += '<div class="modal-body modal-body-info">Do you want to delete?</div>';
        html += '<div class="modal-footer">';
        html += '<button type="button" class="btn btn-danger" onclick="RowDeleteContactPerson(' + id + ')">Confirm</button>';
        html += '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>';
        html += '</div></div></div>';
        document.getElementById("ShowDialog").innerHTML = html;
        //$('#ShowDialog').modal('show');
        //var html = '<div class="modal-dialog modal-dialog-info">';
        //html += '<div class="modal-content">';
        //html += '<div class="modal-header modal-header-info">';
        //html += '<button type="button" class="close" data-dismiss="modal">&times;</button>';
        //html += '<h4 class="modal-title">' + topic + '</h4>';
        //html += '</div>';
        //html += '<div class="modal-body modal-body-info">หากท่านลบ Estimate Price ระบบจะทำการลบ Job order ที่เกี่ยวข้องด้วย</div>';
        //html += '<div class="modal-footer">';
        //html += '<button type="button" class="btn btn-info" onclick="RowDelete(' + id + ')">Yes</button>';
        //html += '<button type="button" class="btn btn-info" data-dismiss="modal">No</button>';
        //html += '</div></div></div>';
        //document.getElementById("ShowDialog").innerHTML = html;
    }

}