function PreviewKartuKuning(donaturId, tahun){

    // set title
    $('#labelTahun').html('<i>' + tahun + '</i>');

    // get donatur details
    $.get(urlBase + 'donatur/get/' + donaturId, function(data){
        $('#labelNama').html(data.Nama);
        $('#labelAlamat').html(data.Alamat != null ? data.Alamat : '.........................');
        $('#labelTelepon').html(data.NoHp != null ? data.NoHp : '.........................');
    })

    //------------------
    var tbl = $('#tableKartuKuning');
            
    $(tbl).find('thead').find('tr').html('');
    $(tbl).find('tbody').find('tr').html('');
    $(tbl).find('tfoot').find('tr').html('');
    
    // tambah nama kolom
    $(tbl).find('thead').append(("<tr> <th style='border:1px solid black; text-align:center;'> {0} </th> <th style='border:1px solid black; text-align:center;'> {1} </th> <th style='border:1px solid black; text-align:center;'> {2} </th> <th style='border:1px solid black; text-align:center;'> {3} </th> </tr>").format(["Bulan", "Jumlah (Rp)", "Tanggal Terima", "Keterangan"]));

    // get kartu kuning
    var totalPemasukan = 0;
    $.get(urlBase + 'laporan/' + 'KartuKuning?donaturId=' + donaturId + '&tahun=' + tahun, function(data){
        if(data){
            // tambah row
            for (var i = 0; i < data.length; i++) {
                $(tbl).find('tbody').append("<tr> <td style='border-left:1px solid black; border-right:1px solid black; border-bottom:1px solid black; font-weight:bold'>" + NamaBulan(new Date(data[i].m_Item1).getMonth() + 1) + "</td> " +
                                        "<td style='border-right:1px solid black; border-bottom:1px solid black; text-align:right;'>" + parseInt(data[i].m_Item2).format(0, 3, '.', ',') + "</td>" +
                                        "<td style='border-right:1px solid black; border-bottom:1px solid black; text-align:center;'>" + convertDate(data[i].m_Item3) + "</td>" +
                                        // "<td style='border-right:1px solid black; text-align:center;'>" + ConvertToRupiah(data[i].m_Item4) + "</td>" +
                                        "<td style='border-right:1px solid black; border-bottom:1px solid black; text-align:center;'>" + (data[i].m_Item4 != null ? data[i].m_Item4 : "")+ "</td>" +
                                        "</tr>");

                totalPemasukan += (data[i].m_Item2 != '' ? parseInt(data[i].m_Item2) : 0);
            }
        
            // Insert Foot
            $(tbl).find('tfoot').append("<tr style='font-weight:bold'> <td style='border:1px solid black; text-align:center;'> TOTAL </td> <td style='border:1px solid black; text-align:right'>" + totalPemasukan.format(0, 3, '.', ',') + "</td> <td style='border:1px solid black;' colspan='2'> </td> </tr>");
                                                
    //             $(tbl).find('tfoot').append(("<tr style='font-weight:bold'> <td style='border-left:1px solid black; border-bottom:1px solid black;'> {0} </td> " +
    //                                             "<td style='border-bottom:1px solid black;'> {1} </td>" +
    //                                             "<td style='border-right:1px solid black; border-bottom:1px solid black; text-align:right; padding-right:10px;'> {2} </td>" +
    //                                             "<td style='border:1px solid black; text-align:right;'> {3} </td>" +
    //                                             "<td style='border:1px solid black; text-align:right;'> {4} </td>" +
    //                                             "</tr>" +
    //                                             "").format(['', 
    //                                             '',
    //                                             'SALDO',
    //                                             '', 
    //                                             "Rp." + (totalPemasukan - totalPengeluaran).format(0, 3, '.', ',')]));
                                                
    //             //$(tbl).find('tfoot').append(("<tr style='font-weight:bold'> <td style='border-left:1px solid black; border-bottom:1px solid black;'> {0} </td> " +
    //             //                                "<td style='border-bottom:1px solid black;'> {1} </td>" +
    //             //                                "<td style='border-right:1px solid black; border-bottom:1px solid black; text-align:right; padding-right:10px;'> {2} </td>" +
    //             //                                "<td style='border:1px solid black; text-align:right;'> {3} </td>" +
    //             //                                "<td style='border:1px solid black; text-align:right;'> {4} </td>" +
    //             //                                "</tr>" +
    //             //                                "").format(['', 
    //             //                                '',
    //             //                                'JUMLAH',
    //             //                                "Rp." + totalPemasukan.format(0, 3, '.', ','), 
    //             //                                "Rp." + totalPengeluaran.format(0, 3, '.', ',')]));

            }
        });
}