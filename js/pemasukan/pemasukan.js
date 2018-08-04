

function txtTanggalTerima_OnInput(tgl){
    var tahun = tgl.split('-')[0];
    var bulan = tgl.split('-')[1];
    $('#ddDataList').empty();
    $('#txtDariDonatur').val("loading...");
    $('#txtDariDonatur').css('background-color', 'yellow');
    $.get(urlBase + 'pemasukan/' + 'DonaturBelumBayar?tahun=' + tahun + '&bulan=' + bulan, function(data){
        for (let i = 0; i < data.length; i++) {
            // console.log(data);
            $('#ddDataList').append('<option idvalue="' + data[i].Id + '" nominalvalue="' + data[i].DefaultNominal + '">' + data[i].Nama + '</option>');
        }
        $('#txtDariDonatur').css('background-color', '');
        $('#txtDariDonatur').val("");
    });
    
    $('#tableListDonatur tbody').empty();
}

function txtDariDonatur_OnInput(){
    var val = document.getElementById("txtDariDonatur").value;
    var opts = document.getElementById('ddDataList').childNodes;
    for (var i = 0; i < opts.length; i++) {
      if (opts[i].value === val) {
        // An item was selected from the list!
        // yourCallbackHere()

        var id = opts[i].getAttribute('idvalue');
        var nama = opts[i].value;
        var nominal = opts[i].getAttribute('nominalvalue');
        var tgl = $('#txtTanggalTerima').val();
        GenerateRowDonatur(id, nama, nominal, tgl.split('-')[0], tgl.split('-')[1]);

        document.getElementById("txtDariDonatur").value = "";
        $(opts[i]).remove();
        break;
      }
    }

}

function GenerateRowDonatur(id, nama, nominal, tahun, bulan){
    var rowIdx = $('#tableListDonatur tbody tr').length;
    $('#tableListDonatur tbody').append('<tr>' + '<td>' + /*'<input type="button" class="btn btn-danger" value="&times;" onclick="deleteRowDonatur(this)" />'*/ '' + '</td>' + 
                                        '<td class="d-none">' + '<input type="hidden" name="PemasukanItem[' + rowIdx + '].DonaturId" value="' + id + '" />' + '</td>' +
                                        '<td>' + nama + '</td>' +
                                        '<td>' + '<input type="hidden" name="PemasukanItem[' + rowIdx + '].UntukBulan" value="' + (tahun + '-' + bulan + '-' + '01')  + '">'+
                                            '<input type="button" value="▲" style="width:100px" onclick="addUpDonatur(this)"/>' +
                                            '<input type="hidden" value="0" />' +
                                            '<input type="button" value="▼" style="width:100px" onclick="addDownDonatur(this)"/>' +
                                            '<input type="hidden" value="0" />' +
                                        '<td>' + '<input type="text" name="PemasukanItem[' + rowIdx + '].Nominal" value="' + nominal + '"/>' + '</td>' +
                                        '</tr>');

}

function deleteRowDonatur(obj){
    
}

function addMonths (date, count) {
    // if (date && count) {
    //     var m, d = (date = new Date(+date)).getUTCDate()
    
    //     date.setUTCMonth(date.getUTCMonth() + count, 1)
    //     m = date.getUTCMonth()
    //     date.setUTCDate(d)
    //     if (date.getUTCMonth() !== m) date.setUTCDate(0)
    //   }
    date.setMonth(date.getMonth() + count)
      return date
}

function addUpDonatur(obj){
    var counterUp = $(obj).next();
    var tgl = $('#txtTanggalTerima').val();
    var bulanPemasukan = tgl.split('-');
    
    var jumlahUntukBulan = $(obj).val();
    var currentTr = $(obj).parents('tr').eq(0);
    var currentTrAddUp = currentTr;
    // next 2 : https://stackoverflow.com/questions/3904994/how-to-select-next-2-or-more-than-2-items-using-jquery-next 
    for (var index = 0; index < parseInt(counterUp.val()); index++) {; 
        currentTrAddUp = currentTrAddUp.prev();
    }
    var donaturId = $(obj).parent().prev().prev().find('input').val();
    var donaturName = $(obj).parent().prev().html();
    var nominal = $(obj).parent().next().find('input').val();
    //var currentRowIdx = $('#tableListDonatur tr').index(currentTr); // https://stackoverflow.com/questions/1858175/how-to-know-index-of-a-tr-inside-a-table-with-jquery
    var currentRowIdx = $('#tableListDonatur tbody tr').length;
    var nextRowIdx = currentRowIdx;
    var trs = "";
    
    var bulanPemasukanDate = new Date(bulanPemasukan[0] + '-' + parseInt(bulanPemasukan[1]) + '-' + bulanPemasukan[2]);     // masih bingun month nya kenapa +2, bukannya harusnya +1 ya ?. 2018-04-28. Paji
    counterUp.val(parseInt(counterUp.val()) + 1);
    var nextMonth = addMonths(bulanPemasukanDate, 0 - parseInt(counterUp.val()));
    var nextMonthStr = (nextMonth.getFullYear() + '-' + (nextMonth.getMonth() + 1) + '-' + '01');

    trs += '<tr>' + '<td>' + '' + '</td>' + 
                                        '<td class="d-none">' + '<input type="hidden" name="PemasukanItem[' + (nextRowIdx) + '].DonaturId" value="' + donaturId + '" />' + '</td>' +
                                        '<td>' + donaturName + '</td>' +
                                        '<td>' + '<input type="hidden" name="PemasukanItem[' + (nextRowIdx) + '].UntukBulan" value="' + nextMonthStr + '">' +
                                        'Bulan' + ' ' + (nextMonth.getMonth() + 1) + ' ' + nextMonth.getFullYear() +
                                        '</td>' +
                                        '<td>' + '<input type="text" name="PemasukanItem[' + (nextRowIdx) + '].Nominal" value="' + nominal + '"/>' + '</td>' +
                                        '</tr>';

    $(trs).insertBefore(currentTrAddUp);
}

function addDownDonatur(obj){
    var counterDown = $(obj).next();
    
    var tgl = $('#txtTanggalTerima').val();
    var bulanPemasukan = tgl.split('-');
    
    var jumlahUntukBulan = $(obj).val();
    var currentTr = $(obj).parents('tr').eq(0);
    var currentTrAddDown = currentTr;
    // next 2 : https://stackoverflow.com/questions/3904994/how-to-select-next-2-or-more-than-2-items-using-jquery-next 
    for (var index = 0; index < parseInt(counterDown.val()); index++) {; 
        currentTrAddDown = currentTrAddDown.next();
    }
    var donaturId = $(obj).parent().prev().prev().find('input').val();
    var donaturName = $(obj).parent().prev().html();
    var nominal = $(obj).parent().next().find('input').val();
    //var currentRowIdx = $('#tableListDonatur tr').index(currentTrAddDown); // https://stackoverflow.com/questions/1858175/how-to-know-index-of-a-tr-inside-a-table-with-jquery
    var currentRowIdx = $('#tableListDonatur tbody tr').length;
    var nextRowIdx = currentRowIdx;
    
    var trs = "";
    
    var bulanPemasukanDate = new Date(bulanPemasukan[0] + '-' + parseInt(bulanPemasukan[1]) + '-' + bulanPemasukan[2]);     // masih bingun month nya kenapa +2, bukannya harusnya +1 ya ?. 2018-04-28. Paji
    counterDown.val(parseInt(counterDown.val()) + 1);
    var nextMonth = addMonths(bulanPemasukanDate, parseInt(counterDown.val()));
    var nextMonthStr = (nextMonth.getFullYear() + '-' + (nextMonth.getMonth() + 1) + '-' + '01');

    trs += '<tr>' + '<td>' + '' + '</td>' + 
                                        '<td class="d-none">' + '<input type="hidden" name="PemasukanItem[' + (nextRowIdx) + '].DonaturId" value="' + donaturId + '" />' + '</td>' +
                                        '<td>' + donaturName + '</td>' +
                                        '<td>' + '<input type="hidden" name="PemasukanItem[' + (nextRowIdx) + '].UntukBulan" value="' + nextMonthStr + '">' +
                                        'Bulan' + ' ' + (nextMonth.getMonth() + 1) + ' ' + nextMonth.getFullYear() +
                                        '</td>' +
                                        '<td>' + '<input type="text" name="PemasukanItem[' + (nextRowIdx) + '].Nominal" value="' + nominal + '"/>' + '</td>' +
                                        '</tr>';
    
    $(trs).insertAfter(currentTrAddDown); // http://api.jquery.com/insertafter/
    
}

function tambahPemasukan(){
    // untuk kirim ke server
    var f = $('#formPemasukan, #formPemasukanItem').serialize();
    // alert(f);
    $.post(urlBase + 'pemasukan/post', f, function(){ 
        alert('insert pemasukan success');
    });
}