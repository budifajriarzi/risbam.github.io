var listPenerima =["Dimas Adi Prasetyo", 
                    "Thahir Kusuma Setyo",
                    "Tyas",
                    "Panji",
                    "Gita",
                    "Aldino Saurus",
                    "M. Alpin Saputra",
                    "Puspita Arif Rama",
                    "Devi Yuniarti",
                    "Deva Yunita",
                    "Bilal",
                    "Fahrul",
                    "Adiknya Fahrul, Cucu Pak Jasmin"
                ];

// ---------------------------------------------------------------------
$(document).ready(function(){
    var mekahBerjalanKurangLebih = $('#mekahBerjalanKurangLebih');
    var mekahBerjalanDariBulan = $('#mekahBerjalanDariBulan');
    var mekahSampaiDenganBulan = $('#mekahSampaiDenganBulan');
    var santunanMekah = $('#santunanMekah');
    var totalPPMekah = $('#totalPPMekah');
    var tbl = $('#tblPPMekah');

    mekahBerjalanKurangLebih.text("4 Bulan");
    mekahBerjalanDariBulan.text("Oktober 2017");
    mekahSampaiDenganBulan.text("Februari 2018");
    santunanMekah.text("Rp.100.000");
    totalPPMekah.text(listPenerima.length);

    // populating column title
    $(tbl).find('thead').append(("<tr> <th> {0} </th> <th> {1} </th> </tr>").format(["No", "Nama"]));
    
    // populating list
    $.each(listPenerima, function(idx, val){
        $(tbl).find('tbody').append(("<tr> <td> {0} </td> <td> {1} </td> </tr>").format([(idx+1), val]));
    });
    
});