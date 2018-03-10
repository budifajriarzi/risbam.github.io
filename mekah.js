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

var listDonatur =[
    "Ferry Ferdiansyah"
	, "Lusy Edi Tasman"
	, "Ibu Herri, Hj."
	, "Dairah Buchori, Hj."
	, "Hetty, Hj."
	, "Ahmad Kosasih"
	, "Ibu Ida"
	, "Hary Poliriyanto"
	, "Hj. Djuhaeni"
	, "Arya Budiman"
	, "Hj. Herawati"
	, "Hj. Lilia Hanum"
	, "Faris"
	, "Hj. Nurliana"
	, "Ibu Mufidah"
	, "Marina"
	, "Hj. Darmawati (Ningsih)"
	, "Drian S."
	, "Danik"
	, "Hj. Rohayani"
	, "M. Naufal Maulana"
	, "Almira Balqis"
	, "Langit Barosa"
	, "Retno Widowati"
	, "Hj. Olga Fauziah"
	, "M. Thariqul"
	, "Aisyah Suganda"
	, "Maryah"
	, "Aenny Solahuddin"
	, "Hj. Zainab"
	, "Hj. Siti Hindun"
	, "Tami"
	, "Bu Euis"
	, "Zaidir"
    , "Hamba Allah 1"];
    
    var listPenerimaan =[
                        ["04-10-2017", "Hetty T", 100000],
                        ["05-10-2017", "Arya Budiman", 100000],
                        ["10-10-2017", "Hj. Djahaeni", 150000],
                        ["10-10-2017", "Aisyah Suganda", 100000],
];

// ---------------------------------------------------------------------
$(document).ready(function(){
    var mekahBerjalanKurangLebih = $('#mekahBerjalanKurangLebih');
    var mekahBerjalanDariBulan = $('#mekahBerjalanDariBulan');
    var mekahSampaiDenganBulan = $('#mekahSampaiDenganBulan');
    var santunanMekah = $('#santunanMekah');
    var totalPPMekah = $('#totalPPMekah');
    

    mekahBerjalanKurangLebih.text("4 Bulan");
    mekahBerjalanDariBulan.text("Oktober 2017");
    mekahSampaiDenganBulan.text("Februari 2018");
    santunanMekah.text("Rp.100.000");
    totalPPMekah.text(listPenerima.length);

    // Insert Data Penerima Program Mekah
    var tbl = $('#tblPPMekah');
    // populating column title
    $(tbl).find('thead').append(("<tr> <th> {0} </th> <th> {1} </th> </tr>").format(["No", "Nama"]));
    // populating list
    $.each(listPenerima, function(idx, val){
        $(tbl).find('tbody').append(("<tr> <td> {0} </td> <td> {1} </td> </tr>").format([(idx+1), val]));
    });
    

    // Insert Data Daftar Donatur
    var tbl = $('#tblDaftarDonatur');
    // populating column title
    $(tbl).find('thead').append(("<tr> <th> {0} </th> <th> {1} </th> </tr>").format(["No", "Nama"]));
    // populating list
    $.each(listDonatur, function(idx, val){
        $(tbl).find('tbody').append(("<tr> <td> {0} </td> <td> {1} </td> </tr>").format([(idx+1), val]));
    });


    // Insert Data Laporan Penerimaan
    var tbl = $('#tblLaporanPenerimaan');
    // populating column title
    $(tbl).find('thead').append(("<tr> <th> {0} </th> <th> {1} </th> <th> {2} </th> </tr>").format(["Tanggal", "Nama Donatur", "Nominal"]));
    // populating list
    $.each(listPenerimaan, function(idx, val){
        $(tbl).find('tbody').append(("<tr> <td> {0} </td> <td> {1} </td> <td> {2} </td> </tr>").format([val[0], val[1], val[2]]));
    });
});