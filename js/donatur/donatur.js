function loadDonatur(){
    var tbl = $('#tableDonatur');
    $(tbl).find('tbody').empty();

    $.get(urlBase + 'donatur/get', function(data){
        console.log(data);
        for (let i = 0; i < data.length; i++) {

            // https://stackoverflow.com/questions/1876485/how-to-iterate-through-property-names-of-javascript-object
            // by : eiu165
            // for (var key in data[i]) {
            //     alert(' name=' + key + ' value=' + data[i][key]);
            // }
            var columns = '<td>' + '<input type="button" value="Hapus" data-dismiss="alert" class="btn btn-danger" onclick="hapusDonatur('+ data[i].Id +')"/>' + ' ' + '<input type="button" value="Lihat Detail" class="btn btn-primary" data-toggle="collapse" data-target="#divDetailDonatur" aria-expanded="false" aria-controls="collapseExample" onclick="detailDonatur(this)"/>' + '</td>' +
                        '<td>' + (i + 1) + '</td>' +
                        '<td bindName="Nama">' + data[i].Nama + '</td>' +
                        '<td bindName="NamaPreview">' + data[i].NamaPreview + '</td>' +
                        '<td bindName="JenisKelamin">' + (data[i].JenisKelamin == true ? "Laki-Laki" : "Perempuan") + '</td>' +
                        '<td bindName="NoHp">' + data[i].NoHp + '</td>' +
                        '<td bindName="Alamat">' + data[i].Alamat + '</td>' +
                        '<td bindName="DefaultNominal" class="d-none">' + data[i].DefaultNominal + '</td>';

            var rowDonatur = "<tr class='alert alert-dismissible fade show'> " + columns + " </tr>";
            $(tbl).find('tbody').append(rowDonatur);
            
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

function detailDonatur(obj){
    var tds = $(obj).parents('tr').find('td');
    for (let i = 2; i < tds.length; i++) { // index 0 untuk button, index 1 untuk nomor (#), maka mulai nya dari 2
        var attrName = tds.eq(i).attr('bindName');
        var value = tds.eq(i).html().trim();
        

        $('#formDonatur').find("input[name="+ attrName + "]").val(value);

        // Nanti kalau sudah selesai, balik lagi kesini untuk binding dropdownlist
        // if(attrName == "JenisKelamin"){
        //     $('#formPenerima').find("select[name="+ attrName + "] option").filter(function(){
        //         return $(this).html() == value;
        //     }).attr('selected');
        // }
    }
    
    
    
    
    btnExpand(btnTambahDonatur, "Detail Donatur", "Tutup");
    //$('#titleDonatur').html('Detail Donatur');
    
    
}


function tambahDonatur(){
    // untuk kirim ke server
    var f = $('#formDonatur').serialize();
    $.post(urlBase + 'donatur/post', f, function(){ 
        alert('insert donatur success');
    });

    // ////untuk kirim ke client
    // var nama = $('#txtNamaDonatur').val();
    // var alias = $('#txtAliasDonatur').val();
    // var jenisKelamin = f.split('&')[2].split('=')[1]; // $('#ddlJenisKelamin').val();
    // var noHP = $('#txtNoHPDonatur').val();
    // var alamat = $('#txtAlamatDonatur').val();
    
    // var tbl = $('#tableDonatur');
        
    //  //// tambah penerima
    // $(tbl).find('tbody').append(("<tr class='alert alert-dismissible fade show'> <td> {0} </td> " +
    //                                 "<td> {1} </td>" +
    //                                 "<td> {2} </td>" +
    //                                 "<td> {3} </td>" +
    //                                 "<td> {4} </td>" +
    //                                 "<td> {5} </td>" +
    //                                 "<td> {6} </td>" +
    //                                 "</tr>" +
    //                                 "").format(['<input type="button" value="Hapus" data-dismiss="alert" class="btn btn-danger" onclick="hapusDonatur(this)"/>' + ' ' + '<input type="button" value="Lihat Detail" class="btn btn-primary" data-toggle="collapse" data-target="#divDetailDonatur" aria-expanded="false" aria-controls="collapseExample" onclick="detailDonatur(this)"/>',
    //                                 1, 
    //                                 nama,
    //                                 alias,
    //                                 jenisKelamin,
    //                                 noHP, 
    //                                 alamat]));
}

function hapusDonatur(id){
    if(confirm('Apakah anda yakin ingin menghapus data ini ?')){    
        $.ajax({
            url: urlBase + 'donatur/delete' + id,
            type: 'DELETE',
            success: alert(id + " has been deleted"),
            beforeSend: function (xhr) {
                
            },
            data: {},
            success: function(){}
        });
    }
};