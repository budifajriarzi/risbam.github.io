
function txtTanggalKeluar_OnInput(tgl){
    var tahun = tgl.split('-')[0];
    var bulan = tgl.split('-')[1];
    $('#upDataList').empty();
    $('#txtUntukPenerima').val("loading...");
    $('#txtUntukPenerima').css('background-color', 'yellow');
    $.get(urlBase + 'pengeluaran/' + 'PenerimaBelumTerima?tahun=' + tahun + '&bulan=' + bulan, function(data){
        for (let i = 0; i < data.length; i++) {
            // console.log(data);
            $('#upDataList').append('<option idvalue="' + data[i].Id + '" nominalvalue="' + data[i].DefaultNominal + '">' + data[i].NamaLengkap + '</option>');
        }
        $('#txtUntukPenerima').css('background-color', '');
        $('#txtUntukPenerima').val("");
    });
    
    $('#tableListPenerima tbody').empty();
}

function txtUntukPenerima_OnInput(){
    var val = document.getElementById("txtUntukPenerima").value;
    var opts = document.getElementById('upDataList').childNodes;
    for (var i = 0; i < opts.length; i++) {
      if (opts[i].value === val) {
        // An item was selected from the list!
        // yourCallbackHere()

        var id = opts[i].getAttribute('idvalue');
        var nama = opts[i].value;
        var nominal = opts[i].getAttribute('nominalvalue');

        GenerateRowPenerima(id, nama, nominal);

        document.getElementById("txtUntukPenerima").value = "";
        $(opts[i]).remove();
        break;
      }
    }

}

function GenerateRowPenerima(id, nama, nominal){
    var rowIdx = $('#tableListPenerima tbody tr').length;
    $('#tableListPenerima tbody').append('<tr>' + '<td>' + '<input type="button" class="btn btn-danger" value="&times;" />' + '</td>' + 
                                        '<td class="d-none">' + '<input type="hidden" name="PengeluaranItem[' + rowIdx + '].PenerimaId" value="' + id + '" />' + '</td>' +
                                        '<td>' + nama + '</td>' +
                                        '<td>' + '<input type="text" name="PengeluaranItem[' + rowIdx + '].Nominal" value="' + nominal + '"/>' + '</td>' +
                                        '</tr>');

}

function tambahPengeluaran(){
    // untuk kirim ke server
    var url = urlBase + 'pengeluaran/';

    var f = $('#formPengeluaran, #formPengeluaranItem').serialize();
    // alert(f);
    $.post(url, f, function(){ 
        alert('insert pengeluaran success');
    });
}