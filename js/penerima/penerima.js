function loadPenerima(){
    var tbl = $('#tablePenerima');
    $(tbl).find('tbody').empty();

    $.get(urlBase + 'penerima/', function(data){
        console.log(data);
        for (let i = 0; i < data.length; i++) {

            // https://stackoverflow.com/questions/1876485/how-to-iterate-through-property-names-of-javascript-object
            // by : eiu165
            // for (var key in data[i]) {
            //     alert(' name=' + key + ' value=' + data[i][key]);
            // }
            var columns = '<td>' + '<input type="button" value="Hapus" data-dismiss="alert" class="btn btn-danger" onclick="hapusPenerima('+ data[i].Id +')"/>' + ' ' + '<input type="button" value="Lihat Detail" class="btn btn-primary" data-toggle="collapse" data-target="#divDetailPenerima" aria-expanded="false" aria-controls="collapseExample" onclick="detailPenerima(this)"/>' + '</td>' +
                        '<td>' + (i + 1) + '</td>' +
                        '<td bindName="NamaLengkap">' + data[i].NamaLengkap + '</td>' +
                        '<td bindName="NamaPanggilan" class="d-none">' + data[i].NamaPanggilan + '</td>' +
                        '<td bindName="JenisKelamin">' + (data[i].JenisKelamin == true ? "Laki-Laki" : "Perempuan") + '</td>' +
                        '<td bindName="TempatLahir">' + data[i].TempatLahir + '</td>' +
                        '<td bindName="TanggalLahir">' + data[i].TanggalLahir.split('T')[0] + '</td>' +
                        '<td bindName="Alamat">' + data[i].Alamat + '</td>' +
                        '<td bindName="Keterangan">' + data[i].Keterangan + '</td>' +
                        '<td bindName="NamaSekolah" class="d-none">' + data[i].NamaSekolah + '</td>' +
                        '<td bindName="Kelas" class="d-none">' + data[i].Kelas + '</td>' +
                        '<td bindName="AlamatSekolah" class="d-none">' + data[i].AlamatSekolah + '</td>' +
                        '<td bindName="NamaAyah" class="d-none">' + data[i].NamaAyah + '</td>' +
                        '<td bindName="TempatLahirAyah" class="d-none">' + data[i].TempatLahirAyah + '</td>' +
                        '<td bindName="TanggalLahirAyah" class="d-none">' + (data[i].TanggalLahirAyah != null ? data[i].TanggalLahirAyah.split('T')[0] : "") + '</td>' +
                        '<td bindName="PekerjaanAyah" class="d-none">' + data[i].PekerjaanAyah + '</td>' +
                        '<td bindName="TanggalWafatAyah" class="d-none">' + (data[i].TanggalWafatAyah != null ? data[i].TanggalWafatAyah.split('T')[0] : "") + '</td>' +
                        '<td bindName="NamaIbu" class="d-none">' + data[i].NamaIbu + '</td>' +
                        '<td bindName="TempatLahirIbu" class="d-none">' + data[i].TempatLahirIbu + '</td>' +
                        '<td bindName="TanggalLahirIbu" class="d-none">' + (data[i].TanggalLahirIbu != null ? data[i].TanggalLahirIbu.split('T')[0] : "") + '</td>' +
                        '<td bindName="PekerjaanIbu" class="d-none">' + data[i].PekerjaanIbu + '</td>' +
                        '<td bindName="TanggalWafatIbu" class="d-none">' + (data[i].TanggalWafatIbu != null ? data[i].TanggalWafatIbu.split('T')[0] : "") + '</td>' +
                        '<td bindName="DefaultNominal" class="d-none">' + data[i].DefaultNominal + '</td>';

            var rowPenerima = "<tr class='alert alert-dismissible fade show'> " + columns + " </tr>";
            $(tbl).find('tbody').append(rowPenerima);
            
            //// sebelumnya seperti ini
            // $(tbl).find('tbody').append(("<tr class='alert alert-dismissible fade show'> <td> {0} </td> " +
            //                                 stringTdGenerator(1) +
            //                                 "<td> {2} </td>" +
            //                                 "<td> {3} </td>" +
            //                                 "<td> {4} </td>" +
            //                                 "<td> {5} </td>" +
            //                                 "<td> {6} </td>" +
            //                                 "<td> {7} </td>" +
            //                                 "</tr>" +
            //                                 "").format(['<input type="button" value="Hapus" data-dismiss="alert" class="btn btn-danger" onclick="hapusPenerima('+ data[i].Id +')"/>' + ' ' + '<input type="button" value="Lihat Detail" class="btn btn-primary" data-toggle="collapse" data-target="#divDetailPenerima" aria-expanded="false" aria-controls="collapseExample" onclick="detailPenerima(this)"/>',
            //                                 i + 1, 
            //                                 data[i].NamaLengkap,
            //                                 data[i].JenisKelamin == true ? "Laki-Laki" : "Perempuan",
            //                                 data[i].TempatLahir,
            //                                 data[i].TanggalLahir.split('T')[0], 
            //                                 data[i].Alamat,
            //                                 "Yatim"]));
        }
        
    });
}

function detailPenerima(obj){
    var tds = $(obj).parents('tr').find('td');
    for (let i = 2; i < tds.length; i++) { // index 0 untuk button, index 1 untuk nomor (#), maka mulai nya dari 2
        var attrName = tds.eq(i).attr('bindName');
        var value = tds.eq(i).html().trim();
        

        $('#formPenerima').find("input[name="+ attrName + "]").val(value);

        // Nanti kalau sudah selesai, balik lagi kesini untuk binding dropdownlist
        // if(attrName == "JenisKelamin"){
        //     $('#formPenerima').find("select[name="+ attrName + "] option").filter(function(){
        //         return $(this).html() == value;
        //     }).attr('selected');
        // }
    }
			
    // var nama = $(obj).parents('tr').find('td').eq(2).html().trim();
    // var jenisKelamin = $(obj).parents('tr').find('td').eq(3).html().trim();
    // var tempatLahir = $(obj).parents('tr').find('td').eq(4).html().trim();
    // var tglLahir = $(obj).parents('tr').find('td').eq(5).html().trim();
    // var alamat = $(obj).parents('tr').find('td').eq(6).html().trim();
    // var keterangan = $(obj).parents('tr').find('td').eq(7).html().trim();
    
    // // $('#formPenerima').find("input[name=NamaPanggilan]").val(nama);
    // $('#ddlJenisKelamin').val(jenisKelamin);
    // $('#txtTempatLahir').val(tempatLahir);
    // $('#txtTanggalLahir').val(tglLahir);
    // $('#txtAlamat').val(alamat);
    // $('#ddlKeterangan').val(keterangan);
    
    
    
    btnExpand(btnTambahPenerima, "Detail Penerima", "Tutup");
    //$('#titlePenerima').html('Detail Penerima');
    
    
}

function tambahPenerima(){
    // untuk kirim ke server
    var f = $('#formPenerima').serialize();
    $.post(urlBase + 'penerima/', f, function(){ 
        alert('insert penerima success');
    });
    //alert(f);
    
    ////untuk kirim ke client
    // var nama = f.split('&')[0].split('=')[1]; // $('#txtNama').val();
    // var jenisKelamin = f.split('&')[1].split('=')[1]; // $('#ddlJenisKelamin').val();
    // var tempatLahir = f.split('&')[2].split('=')[1]; // $('#txtTempatLahir').val();
    // var tanggalLahir = f.split('&')[3].split('=')[1];
    // var alamat = f.split('&')[4].split('=')[1]; //$('#txtAlamat').val();
    // var keterangan = f.split('&')[5].split('=')[1];
    
    // var tbl = $('#tablePenerima');
     

    //  //// tambah penerima
    // $(tbl).find('tbody').append(("<tr class='alert alert-dismissible fade show'> <td> {0} </td> " +
    //                                 "<td> {1} </td>" +
    //                                 "<td> {2} </td>" +
    //                                 "<td> {3} </td>" +
    //                                 "<td> {4} </td>" +
    //                                 "<td> {5} </td>" +
    //                                 "<td> {6} </td>" +
    //                                 "<td> {7} </td>" +
    //                                 "</tr>" +
    //                                 "").format(['<input type="button" value="Hapus" data-dismiss="alert" class="btn btn-danger" onclick="hapusPenerima(this)"/>' + ' ' + '<input type="button" value="Lihat Detail" class="btn btn-primary" data-toggle="collapse" data-target="#divDetailPenerima" aria-expanded="false" aria-controls="collapseExample" onclick="detailPenerima(this)"/>',
    //                                 1, 
    //                                 nama,
    //                                 jenisKelamin,
    //                                 tempatLahir,
    //                                 tanggalLahir, 
    //                                 alamat,
    //                                 keterangan]));
}

function hapusPenerima(id){
    alert("deleting " + id);
    $.ajax({
        url: urlBase + 'penerima/' + id,
        type: 'DELETE',
        success: alert(id + " has been deleted"),
        beforeSend: function (xhr) {
            
        },
        data: {},
        success: function(){}
    });
};