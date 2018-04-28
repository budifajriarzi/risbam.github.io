

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
    $('#tableListDonatur tbody').append('<tr>' + '<td>' + '<input type="button" class="btn btn-danger" value="&times;" onclick="deleteRowDonatur(this)" />' + '</td>' + 
                                        '<td class="d-none">' + '<input type="hidden" name="PemasukanItem[' + rowIdx + '].DonaturId" value="' + id + '" />' + '</td>' +
                                        '<td>' + nama + '</td>' +
                                        '<td>' + '<input type="hidden" name="PemasukanItem[' + rowIdx + '].UntukBulan" value="' + (tahun + '-' + bulan + '-' + '01')  + '">'+
                                            '<select onchange="ddlUntukBulan_OnChange(this)">'+
                                            '<option value="1">1 bulan</option>'+
                                            '<option value="2">2 bulan</option>'+
                                            '<option value="3">3 bulan</option>'+
                                            '<option value="4">4 bulan</option>'+
                                            '<option value="5">5 bulan</option>'+
                                            '<option value="6">6 bulan</option>'+
                                            '<option value="7">7 bulan</option>'+
                                            '<option value="8">8 bulan</option>'+
                                            '<option value="9">9 bulan</option>'+
                                            '<option value="10">10 bulan</option>'+
                                            '<option value="11">11 bulan</option>'+
                                            '<option value="12">12 bulan</option>'+
                                            '</select>' + '</td>' +
                                        '<td>' + '<input type="text" name="PemasukanItem[' + rowIdx + '].Nominal" value="' + nominal + '"/>' + '</td>' +
                                        '</tr>');

}

function deleteRowDonatur(obj){
    
}

function addMonths (date, count) {
    if (date && count) {
        var m, d = (date = new Date(+date)).getUTCDate()
    
        date.setUTCMonth(date.getUTCMonth() + count, 1)
        m = date.getUTCMonth()
        date.setUTCDate(d)
        if (date.getUTCMonth() !== m) date.setUTCDate(0)
      }
      return date
}

function ddlUntukBulan_OnChange(obj){
    var tgl = $('#txtTanggalTerima').val();
    var bulanPemasukan = tgl.split('-');
    
    var jumlahUntukBulan = $(obj).val();
    var currentTr = $(obj).parents('tr').eq(0);
    var donaturId = $(obj).parent().prev().prev().find('input').val();
    var nominal = $(obj).parent().next().find('input').val();
    var currentRowIdx = $('#tableListDonatur tr').index(currentTr); // https://stackoverflow.com/questions/1858175/how-to-know-index-of-a-tr-inside-a-table-with-jquery
    var nextRowIdx = currentRowIdx;
    var trs = "";
    
    for (var i = 0; i < (jumlahUntukBulan - 1); i++) {
        var bulanPemasukanDate = new Date(bulanPemasukan[0] + '-' + parseInt(bulanPemasukan[1]) + '-' + bulanPemasukan[2]);     // masih bingun month nya kenapa +2, bukannya harusnya +1 ya ?. 2018-04-28. Paji
        var nextMonth = addMonths(bulanPemasukanDate, 2 + i);
        var nextMonthStr = (nextMonth.getFullYear() + '-' + nextMonth.getMonth() + '-' + '01');

        trs += '<tr>' + '<td>' + '' + '</td>' + 
                                            '<td class="d-none">' + '<input type="hidden" name="PemasukanItem[' + (nextRowIdx + i) + '].DonaturId" value="' + donaturId + '" />' + '</td>' +
                                            '<td>' + '' + '</td>' +
                                            '<td>' + '<input type="hidden" name="PemasukanItem[' + (nextRowIdx + i) + '].UntukBulan" value="' + nextMonthStr + '">' +
                                            'Bulan' + ' ' + nextMonth.getMonth() + ' ' + nextMonth.getFullYear() +
                                            '</td>' +
                                            '<td>' + '<input type="text" name="PemasukanItem[' + (nextRowIdx + i) + '].Nominal" value="' + nominal + '"/>' + '</td>' +
                                            '</tr>';
    }

    $(trs).insertAfter(currentTr); // http://api.jquery.com/insertafter/
}

function tambahPemasukan(){
    // untuk kirim ke server
    var f = $('#formPemasukan, #formPemasukanItem').serialize();
    // alert(f);
    $.post(urlBase + 'pemasukan/', f, function(){ 
        alert('insert pemasukan success');
    });
}