function PreviewLaporan_PemasukanPengeluaran(tahun, bulan){
    
    $('#labelPeriode').html(NamaBulan(parseInt(bulan)-2).toUpperCase() + ' - ' +NamaBulan(bulan).toUpperCase() + ' ' + tahun);
    $('#tableTitle1').html(NamaBulan(parseInt(bulan)-2).toUpperCase() + ' ' + tahun);
    $('#tableTitle2').html(NamaBulan(parseInt(bulan)-1).toUpperCase() + ' ' + tahun);
    $('#tableTitle3').html(NamaBulan(parseInt(bulan)).toUpperCase() + ' ' + tahun);

    // https://stackoverflow.com/questions/1531093/how-do-i-get-the-current-date-in-javascript
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    if(dd<10) {
        dd = '0'+dd
    } 

    today = dd + ' ' + NamaBulan(mm) + ' ' + yyyy;
    
    
    $.get(urlBase + 'laporan/' + 'LaporanKeuangan?tahun=' + tahun + '&bulan=' + (parseInt(bulan) - 2), function(data){
        if(data){

            var tbl = $('#tableLaporanKeuangan');
            var totalPemasukan = 0;
            var totalPengeluaran = 0;

            $(tbl).find('thead').find('tr').html('');
            $(tbl).find('tbody').find('tr').html('');
            $(tbl).find('tfoot').find('tr').html('');
            
            //// tambah title				
            $(tbl).find('thead').append(("<tr> <th style='border:1px solid black; text-align:center;'> {0} </th> <th style='border:1px solid black; text-align:center; width:100px;'> {1} </th> <th style='border:1px solid black; text-align:center;'> {2} </th> <th style='border:1px solid black; text-align:center;'> {3} </th> <th style='border:1px solid black; text-align:center;'> {4} </th> </tr>").format(["No", "Tanggal", "Keterangan", "Pemasukan", "Pengeluaran"]));
            
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
                                               
            }
        });
        $.get(urlBase + 'laporan/' + 'LaporanKeuangan?tahun=' + tahun + '&bulan=' + (parseInt(bulan) - 1), function(data){
            if(data){
    
                var tbl = $('#tableLaporanKeuangan2');
                var totalPemasukan = 0;
                var totalPengeluaran = 0;

                $(tbl).find('thead').find('tr').html('');
                $(tbl).find('tbody').find('tr').html('');
                $(tbl).find('tfoot').find('tr').html('');
                
                //// tambah title				
                $(tbl).find('thead').append(("<tr> <th style='border:1px solid black; text-align:center;'> {0} </th> <th style='border:1px solid black; text-align:center; width:100px;'> {1} </th> <th style='border:1px solid black; text-align:center;'> {2} </th> <th style='border:1px solid black; text-align:center;'> {3} </th> <th style='border:1px solid black; text-align:center;'> {4} </th> </tr>").format(["No", "Tanggal", "Keterangan", "Pemasukan", "Pengeluaran"]));
                
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
                                                   
                }
            });
            $.get(urlBase + 'laporan/' + 'LaporanKeuangan?tahun=' + tahun + '&bulan=' + parseInt(bulan), function(data){
                if(data){
        
                    var tbl = $('#tableLaporanKeuangan3');
                    var totalPemasukan = 0;
                    var totalPengeluaran = 0;
                    
                    $(tbl).find('thead').find('tr').html('');
                    $(tbl).find('tbody').find('tr').html('');
                    $(tbl).find('tfoot').find('tr').html('');
                    
                    //// tambah title				
                    $(tbl).find('thead').append(("<tr> <th style='border:1px solid black; text-align:center;'> {0} </th> <th style='border:1px solid black; text-align:center; width:100px;'> {1} </th> <th style='border:1px solid black; text-align:center;'> {2} </th> <th style='border:1px solid black; text-align:center;'> {3} </th> <th style='border:1px solid black; text-align:center;'> {4} </th> </tr>").format(["No", "Tanggal", "Keterangan", "Pemasukan", "Pengeluaran"]));
                    
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
                                                       
                    }
                });


    $('#labelTanggalPrint').html(today);
}