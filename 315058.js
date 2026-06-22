$(function () {
    // 頁面載入後自動執行獲取資料
    Retrieve();
});

function Retrieve() {
    var dataArray = [];
    var URL = '部署為網路應用程式的網址'; // https://script.google.com/macros/s/AKfycbzSBkw9fNQMXyPwXuZguvXTpqsydQVA5A811yvpJSX0nk_YyAOauCK82ByH6S3WJay6/exec
    $.ajax({
        url: URL,
        type: 'POST',
        dataType: "json",
        error: function (xhr) {
            alert('發生錯誤！請重新再試一次～');
        },
        success: function (Jdata) {
            var Info = Jdata.data;
            // 資料量長度
            var Length = Number(Info.length);
            if (Length > 0) {
                for (i = 0; i < Info.length; i++) {
                    FillTime = Info[i].FillTime;
                    Department = Info[i].Department;
                    Applicant = Info[i].Applicant;
                    RoomName = Info[i].RoomName;
                    BorrowDate = Info[i].BorrowDate;
                    StartTime = Info[i].StartTime;
                    EndTime = Info[i].EndTime;
                    Reason = Info[i].Reason;
                    // 印出資料
                    print();
                }
            } else {
                $("#table-data").append('暫無資料');
            }
        }
    });
}

// 資料列印到 HTML 表格中
function print() {
    $("#table-data").append(
        '<tr>' +
        '<td class="w-15">' + FillTime + '</td>' +
        '<td class="w-10">' + Department + '</td>' +
        '<td class="w-10">' + Applicant + '</td>' +
        '<td class="w-10">' + RoomName + '</td>' +
        '<td class="w-15">' + BorrowDate + '</td>' +
        '<td class="w-15">' + StartTime + '</td>' +
        '<td class="w-15">' + EndTime + '</td>' +
        '<td class="w-10">' + Reason + '</td>' +
        '</tr>'
    );
}

// 會議室搜尋按鈕點擊事件
$("#doaction").click(function () {
    select();
});

function select() {
    var result = "";
    // 取得下拉選單的值並執行搜尋
    $("#select").each(function () {
        result = $(this).val();
        search_table($(this).val());
    });
}

// 搜尋表格內容過濾
function search_table(value) {
    $('tbody tr').each(function () {
        var found = 'false';
        $(this).each(function () {
            if ($(this).text().toLowerCase().indexOf(value.toLowerCase()) >= 0) {
                found = 'true';
            }
        });
        if (found == 'true') {
            $(this).show();
        } else {
            $(this).hide();
        }
    });
}