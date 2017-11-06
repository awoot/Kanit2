function GetWarning()
{
    //alert("Test GetWarning");
    $.ajax(
    {
        url: 'http://localhost:13149/api/Announce/',
        type: 'GET',
        datatype: 'json',
        success: function (data) {
            data = JSON.parse(data);

            //var ul = document.createElement('ul');
            //for (i = 0; i < data.Table.length; i++) {
            //    var warningDate = new Date(data.Table[i].WarningDate);
            //    var a = document.createElement('a');
            //    a.innerHTML = data.Table[i].Description +' '+ warningDate.getDate() + '/' + (warningDate.getMonth() + 1) + '/' + warningDate.getFullYear();
            //}
            //document.getElementById('ResultNotification').appendChild(ul);

            var text = '<a data-toggle="dropdown" class="dropdown-toggle" href="#">';
            text += '<i class="icon-bell-l"></i>';
            text += '<span class="badge bg-important"> ' + data.Table.length + ' </span>';
            text += '</a>';
            text += '<ul class="dropdown-menu extended notification">';
            text += '<div class="notify-arrow notify-arrow-blue"></div>';
            text += '<li>';
            text += '<p class="blue fontmedium">You have ' + data.Table.length + ' new notifications</p>';
            text += '</li>';
            text += '<li>';
            for (var i = 0; i < data.Table.length; i++) {
                var warningDate = new Date(data.Table[i].WarningDate);
                text += '<a href="#" class="padding10">';
                text += '<span class="label label-danger"></span>';
                text += '<span class="fontmedium">' + data.Table[i].Description + '</span>';
                text += '<span class="small italic pull-right">' + warningDate.getDate() + ' / ' + (warningDate.getMonth() + 1) + ' / ' + warningDate.getFullYear() + '</span>';
                text += '</a>';
            }
            text += '</li>';
            text += '<li class="seeallcolor">';
            text += '<a href="/Announce/IndexAnnounce" class="fontmedium fontseeall">See all notifications</a>';
            text += '</li>';
            text += '</ul>';

            document.getElementById("alert_notificatoin_bar").innerHTML = text;

        },
        error: function (msg) {
            alert(msg)
        }
    });
}