var url = urlBase + 'laporan/';

function previewLaporan(){
    var laporanSelected = $('#ddlLaporan').val();
    


    if(laporanSelected == "LaporanKeuangan"){
        var tahunbulan = $('#txtLaporanBulan').val();
        var tahun = tahunbulan.split('-')[0];
        var bulan = tahunbulan.split('-')[1];
        PreviewLaporan_PemasukanPengeluaran(tahun, bulan);
        //loadLaporanKeuangan();
    } else if(laporanSelected == "StatusPembayaranDonatur"){
        PreviewLaporan_StatusPembayaran();
    } else {
        alert('Mohon pilih laporan terlebih dahulu');
    }
                                
};

function loadLaporanKeuangan(){
    $.get(url + 'LaporanKeuangan', function(data){
        console.log(data);
    });

}

function PreviewLaporan_PemasukanPengeluaran(tahun, bulan){
    var totalPemasukan = 0;
    var totalPengeluaran = 0;
    
    $.get(url + 'LaporanKeuangan?tahun=' + tahun + '&bulan=' + bulan, function(data){
        if(data){

            var tbl = $('#tableLaporan');
            
            $(tbl).find('thead').find('tr').html('');
            $(tbl).find('tbody').find('tr').html('');
            $(tbl).find('tfoot').find('tr').html('');
            
            //// tambah title				
            $(tbl).find('thead').append(("<tr> <th style='border:1px solid black; text-align:center;'> {0} </th> <th style='border:1px solid black; text-align:center;'> {1} </th> <th style='border:1px solid black; text-align:center;'> {2} </th> <th style='border:1px solid black; text-align:center;'> {3} </th> <th style='border:1px solid black; text-align:center;'> {4} </th> </tr>").format(["No", "Tanggal", "Keterangan", "Pemasukan", "Pengeluaran"]));
            
            //// tambah row
            // Saldo Awal
            
            console.log(data);
            for (var i = 0; i < data.length; i++) {
                $(tbl).find('tbody').append("<tr> <td style='border-left:1px solid black; border-right:1px solid black'>" + (i+1) + "</td> " +
                                        "<td style='border-right:1px solid black; text-align:center;'>" + (data[i].m_Item1 != null ? (new Date(data[i].m_Item1).getDate() + '-' + (new Date(data[i].m_Item1).getMonth()+1) + '-' + new Date(data[i].m_Item1).getFullYear()) : '') + "</td>" +
                                        "<td style='border-right:1px solid black;'>" + data[i].m_Item2 + "</td>" +
                                        "<td style='border-right:1px solid black; text-align:right;'>" + (data[i].m_Item3 != '' ? "Rp." + parseInt(data[i].m_Item3).format(0, 3, '.', ',') : '') + "</td>" +
                                        "<td style='border-right:1px solid black; text-align:right;'>" + (data[i].m_Item4 != '' ? "Rp." + parseInt(data[i].m_Item4).format(0, 3, '.', ',') : '') + "</td>" +
                                        "</tr>");

                totalPemasukan += (data[i].m_Item3 != '' ? parseInt(data[i].m_Item3) : 0);
                totalPengeluaran += (data[i].m_Item4 != '' ? parseInt(data[i].m_Item4) : 0);
            }
        

    
                                    
    // Pemasukan Bulan <param bulan>
    // $(tbl).find('tbody').append(("<tr> <td style='border-left:1px solid black; border-right:1px solid black'> {0} </td> " +
    //                                 "<td style='border-right:1px solid black; text-align:center;'> {1} </td>" +
    //                                 "<td style='border-right:1px solid black;'> {2} </td>" +
    //                                 "<td style='border-right:1px solid black; text-align:right;'> {3} </td>" +
    //                                 "<td style='border-right:1px solid black; text-align:right;'> {4} </td>" +
    //                                 "</tr>" +
    //                                 "").format([2, 
    //                                 '',
    //                                 'Pemasukan bulan Februari 2018 (dari 14 donatur)',
    //                                 convertToRupiah(2050000), 
    //                                 '']));
    
    // Pengeluaran
    // $(tbl).find('tbody').append(("<tr> <td style='border-left:1px solid black; border-right:1px solid black'> {0} </td> " +
    //                                 "<td style='border-right:1px solid black; text-align:center;'> {1} </td>" +
    //                                 "<td style='border-right:1px solid black;'> {2} </td>" +
    //                                 "<td style='border-right:1px solid black; text-align:right;'> {3} </td>" +
    //                                 "<td style='border-right:1px solid black; text-align:right;'> {4} </td>" +
    //                                 "</tr>" +
    //                                 "").format([3, 
    //                                 '03-03-2018',
    //                                 'Pemberian santunan kepada 16 orang yatim @Rp.100.000',
    //                                 '', 
    //                                 convertToRupiah(1600000)]));
                                    
    // $(tbl).find('tbody').append(("<tr> <td style='border-left:1px solid black; border-right:1px solid black'> {0} </td> " +
    //                                 "<td style='border-right:1px solid black; text-align:center;'> {1} </td>" +
    //                                 "<td style='border-right:1px solid black;'> {2} </td>" +
    //                                 "<td style='border-right:1px solid black; text-align:right;'> {3} </td>" +
    //                                 "<td style='border-right:1px solid black; text-align:right;'> {4} </td>" +
    //                                 "</tr>" +
    //                                 "").format([4, 
    //                                 '03-03-2018',
    //                                 'Pemberian santunan kepada 4 orang dhuafa @Rp.50.000',
    //                                 '', 
    //                                 convertToRupiah(200000)]));
    
    // $(tbl).find('tbody').append(("<tr> <td style='border-left:1px solid black; border-right:1px solid black'> {0} </td> " +
    //                                 "<td style='border-right:1px solid black; text-align:center;'> {1} </td>" +
    //                                 "<td style='border-right:1px solid black;'> {2} </td>" +
    //                                 "<td style='border-right:1px solid black; text-align:right;'> {3} </td>" +
    //                                 "<td style='border-right:1px solid black; text-align:right;'> {4} </td>" +
    //                                 "</tr>" +
    //                                 "").format([5, 
    //                                 '18-03-2018',
    //                                 'Pemberian santunan kepada 3 orang dhuafa @Rp.50.000',
    //                                 '', 
    //                                 convertToRupiah(150000)]));
                                    
                //// Insert Foot
                $(tbl).find('tfoot').append(("<tr style='font-weight:bold'> <td style='border-left:1px solid black; border-top:1px solid black; border-bottom:1px solid black;'> {0} </td> " +
                                                "<td style='border-top:1px solid black; border-bottom:1px solid black;'> {1} </td>" +
                                                "<td style='border-top:1px solid black; border-right:1px solid black; border-bottom:1px solid black; text-align:right; padding-right:10px;'> {2} </td>" +
                                                "<td style='border:1px solid black; text-align:right;'> {3} </td>" +
                                                "<td style='border:1px solid black; text-align:right;'> {4} </td>" +
                                                "</tr>" +
                                                "").format(['', 
                                                '',
                                                'JUMLAH',
                                                "Rp." + totalPemasukan.format(0, 3, '.', ','), 
                                                "Rp." + totalPengeluaran.format(0, 3, '.', ',')]));
                                                
                $(tbl).find('tfoot').append(("<tr style='font-weight:bold'> <td style='border-left:1px solid black; border-bottom:1px solid black;'> {0} </td> " +
                                                "<td style='border-bottom:1px solid black;'> {1} </td>" +
                                                "<td style='border-right:1px solid black; border-bottom:1px solid black; text-align:right; padding-right:10px;'> {2} </td>" +
                                                "<td style='border:1px solid black; text-align:right;'> {3} </td>" +
                                                "<td style='border:1px solid black; text-align:right;'> {4} </td>" +
                                                "</tr>" +
                                                "").format(['', 
                                                '',
                                                'SALDO',
                                                '', 
                                                "Rp." + (totalPemasukan - totalPengeluaran).format(0, 3, '.', ',')]));
                                                
                //$(tbl).find('tfoot').append(("<tr style='font-weight:bold'> <td style='border-left:1px solid black; border-bottom:1px solid black;'> {0} </td> " +
                //                                "<td style='border-bottom:1px solid black;'> {1} </td>" +
                //                                "<td style='border-right:1px solid black; border-bottom:1px solid black; text-align:right; padding-right:10px;'> {2} </td>" +
                //                                "<td style='border:1px solid black; text-align:right;'> {3} </td>" +
                //                                "<td style='border:1px solid black; text-align:right;'> {4} </td>" +
                //                                "</tr>" +
                //                                "").format(['', 
                //                                '',
                //                                'JUMLAH',
                //                                "Rp." + totalPemasukan.format(0, 3, '.', ','), 
                //                                "Rp." + totalPengeluaran.format(0, 3, '.', ',')]));

            }
        });
}