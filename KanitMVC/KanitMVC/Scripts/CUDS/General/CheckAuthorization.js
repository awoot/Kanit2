function CheckAuthorization() {
    //alert('test');
    var IsDashboard = 0;
    var IsQuotation = 0;
    var IsProduct = 0;
    var IsQuotation = 0;
    var IsWorkFlow = 0;
    var IsExchangeRate = 0;
    var IsSecurityProfile = 0;
    var IsUser = 0;
    var dataObject = { ID: localStorage['UserID'] };
    console.log(dataObject);
    //alert(localStorage['UserID']);
    if (localStorage['UserID'] != undefined) {
        $.ajax(
        {
            url: 'http://localhost:13149/api/CheckAuthorization',
            type: 'GET',
            async: false,
            data: dataObject,
            datatype: 'json',
            success: function (data) {
                data = JSON.parse(data);
                console.log(data);
                for (var i = 0; i < data.Table.length; i++) {
                    //(Dashboard)Dashboard
                    if (data.Table[i].MenuName == "MN001") {
                        if (data.Table[i].Role == 0) {
                            $('.mnDashboard').attr("style", "display:none");
                            IsDashboard = 1;
                        }
                    }
                    if (data.Table[i].MenuName == "MN002") {
                        if (data.Table[i].Role == 7) {
                            
                        }
                        if (data.Table[i].Role == 6) {
                            
                        }
                        if (data.Table[i].Role == 5) {
                            
                        }
                        if (data.Table[i].Role == 4) {

                        }
                        if (data.Table[i].Role == 3) {
                            
                        }
                        if (data.Table[i].Role == 2) {
                            
                        }
                        if (data.Table[i].Role == 1) {
                            
                        }
                        if (data.Table[i].Role == 0) {
                            $('.subQuotation').attr("style", "display:none");
                            IsQuotation = 1;
                        }
                    }
                    //Product
                    if (data.Table[i].MenuName == "MN003") {
                        if (data.Table[i].Role == 7) {
                            //Update,Delete
                            //$('#imgExpenseCreate').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 6) {
                            //Insert, Delete
                            //$('img.imgExpenseUpdate').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 5) {
                            //Insart, Update
                            //$('img.imgExpenseDelete').attr('style', 'display:none');
                        }
                        if (data.Table[i].Role == 4) {

                            //$('#imgExpenseCreate').attr("style", "display:none");
                            //$('img.imgExpenseUpdate').attr("style", "display:none");
                            ////$('img.imgExpenseView').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 3) {
                            //$('#imgExpenseCreate').attr("style", "display:none");
                            //$('img.imgExpenseDelete').attr('style', 'display:none');
                        }
                        if (data.Table[i].Role == 2) {
                            //$('img.imgExpenseUpdate').attr("style", "display:none");
                            //$('img.imgExpenseDelete').attr('style', 'display:none');
                        }
                        if (data.Table[i].Role == 1) {
                            //$('img.imgExpenseUpdate').attr("style", "display:none");
                            //$('#imgExpenseCreate').attr("style", "display:none");
                            //$('img.imgExpenseDelete').attr('style', 'display:none');
                        }
                        if (data.Table[i].Role == 0) {
                            $('.subProduct').attr("style", "display:none");
                            IsProduct = 1;
                        }
                    }
                    //Quotation
                    if (data.Table[i].MenuName == "MN004") {
                        if (data.Table[i].Role == 7) {
                            ////Update,Delete
                            //$('#imgSecurityCreate').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 6) {
                            ////Insert, Delete
                            //$('img.imgSecurityUpdate').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 5) {
                            //Insart, Update
                            $('img.imgSecurityDelete').attr('style', 'display:none');
                        }
                        if (data.Table[i].Role == 4) {

                            //$('#imgSecurityCreate').attr("style", "display:none");
                            //$('img.imgSecurityUpdate').attr("style", "display:none");
                            ////$('img.imgSecurityView').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 3) {
                            //$('#imgSecurityCreate').attr("style", "display:none");
                            //$('img.imgSecurityDelete').attr('style', 'display:none');
                        }
                        if (data.Table[i].Role == 2) {
                            //$('img.imgSecurityUpdate').attr("style", "display:none");
                            //$('img.imgSecurityDelete').attr('style', 'display:none');
                        }
                        if (data.Table[i].Role == 1) {
                            //$('img.imgSecurityUpdate').attr("style", "display:none");
                            //$('#imgSecurityCreate').attr("style", "display:none");
                            //$('img.imgSecurityDelete').attr('style', 'display:none');
                        }
                        if (data.Table[i].Role == 0) {
                            $('.subQuotation').attr("style", "display:none");
                            IsQuotation = 1;
                        }
                    }
                    //Work Flow
                    if (data.Table[i].MenuName == "MN005") {
                        if (data.Table[i].Role == 7) {
                            ////Update,Delete
                            //$('#imgUserCreate').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 6) {
                            ////Insert, Delete
                            //$('img.imgUserUpdate').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 5) {
                            //Insart, Update
                            //$('img.imgUserDelete').attr('style', 'display:none');
                        }
                        if (data.Table[i].Role == 4) {

                            //$('#imgUserCreate').attr("style", "display:none");
                            //$('img.imgUserUpdate').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 3) {
                            //$('#imgUserCreate').attr("style", "display:none");
                            //$('img.imgUserDelete').attr('style', 'display:none');
                        }
                        if (data.Table[i].Role == 2) {
                            //$('img.imgUserUpdate').attr("style", "display:none");
                            //$('img.imgUserDelete').attr('style', 'display:none');
                        }
                        if (data.Table[i].Role == 1) {
                            //$('img.imgUserUpdate').attr("style", "display:none");
                            //$('#imgUserCreate').attr("style", "display:none");
                            //$('img.imgUserDelete').attr('style', 'display:none');
                        }
                        if (data.Table[i].Role == 0) {
                            $('.subWorkFlow').attr("style", "display:none");
                            IsWorkFlow = 1;
                        }
                    }
                    //Exchange Rate
                    if (data.Table[i].MenuName == "MN006") {
                        //if (data.Table[i].Role == 7) {
                        //    $('#carlendarcreateDisable').attr("style", "display:none");
                        //}
                        if (data.Table[i].Role == 6) {
                            $('img.imgActivityUpdate').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 5) {

                            $('img.imgActivityDelete').attr('style', 'display:none');
                        }
                        if (data.Table[i].Role == 4) {
                            $('img.imgActivityUpdate').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 3) {

                            $('img.imgActivityDelete').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 2) {
                            $('img.imgActivityDelete').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 1) {
                            $('img.imgActivityUpdate').attr("style", "display:none");
                            $('img.imgActivityDelete').attr("style", "display:none");
                            //$('#ActivitycreateDisable').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 0) {
                            $('.subExchangeRate').attr("style", "display:none");
                            IsExchangeRate = 1;
                        }
                    }
                    //Security Profile
                    if (data.Table[i].MenuName == "MN007") {
                        //if (data.Table[i].Role == 7) {
                        //    $('#carlendarcreateDisable').attr("style", "display:none");
                        //}
                        if (data.Table[i].Role == 6) {
                            $('img.imgJobCalendarUpdate').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 5) {

                            $('img.imgJobCalendarDelete').attr('style', 'display:none');
                        }
                        if (data.Table[i].Role == 4) {
                            $('img.imgJobCalendarUpdate').attr("style", "display:none");
                            $('img.imgJobCalendarView').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 3) {

                            $('img.imgJobCalendarDelete').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 2) {

                            $('img.imgJobCalendarUpdate').attr("style", "display:none");
                            $('img.imgJobCalendarDelete').attr('style', 'display:none');
                        }
                        if (data.Table[i].Role == 1) {
                            $('img.imgJobCalendarUpdate').attr("style", "display:none");
                            $('img.imgJobCalendarDelete').attr('style', 'display:none');
                            //$('#JobCalendarcreateDisable').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 0) {
                            $('.subSecurityProfile').attr("style", "display:none");
                            IsSecurityProfile = 1;
                        }
                    }
                    //User
                    if (data.Table[i].MenuName == "MN008") {
                        //if (data.Table[i].Role == 7) {
                        //    $('#carlendarcreateDisable').attr("style", "display:none");
                        //}
                        if (data.Table[i].Role == 6) {
                            $('img.imgManCalendarUpdate').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 5) {

                            $('img.imgManCalendarDelete').attr('style', 'display:none');
                        }
                        if (data.Table[i].Role == 4) {
                            $('img.imgManCalendarUpdate').attr("style", "display:none");
                            $('img.imgManCalendarView').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 3) {

                            $('img.imgManCalendarDelete').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 2) {

                            $('img.imgManCalendarUpdate').attr("style", "display:none");
                            $('img.imgManCalendarDelete').attr('style', 'display:none');
                        }
                        if (data.Table[i].Role == 1) {
                            $('img.imgManCalendarUpdate').attr("style", "display:none");
                            $('img.imgManCalendarDelete').attr('style', 'display:none');
                            //$('#ManCalendarcreateDisable').attr("style", "display:none");
                        }
                        if (data.Table[i].Role == 0) {
                            $('.subUser').attr("style", "display:none");
                            IsUser = 1;
                        }
                    }


                    if (IsDashboard == 1) {
                        $('.mnDashboard').attr("style", "display:none");
                    }
                    if (IsQuotation == 1) {
                        $('.mnQuotation').attr("style", "display:none");
                    }
                    if (IsProduct == 1) {
                        $('.mnProduct').attr("style", "display:none");
                    }
                    if (IsQuotation == 1) {
                        $('.mnQuotation').attr("style", "display:none");
                    }
                    if (IsWorkFlow == 1 && IsExchangeRate == 1 && IsSecurityProfile == 1 && IsUser == 1) {
                        $('.mnSetting').attr("style", "display:none");
                    }
                    
                }
                //alert(data.Table.length);

            },
            error: function (msg) {
                alert(msg)
            }
        });
    }
    else {
        location = "../Login/IndexLogin";
    }
   



}

