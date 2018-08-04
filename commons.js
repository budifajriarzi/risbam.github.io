// 2018-03-10 convert to rupiah, vice versa : https://gist.github.com/faisalman/845309
/**
 * JavaScript Code Snippet
 * Convert Number to Rupiah & vice versa
 * https://gist.github.com/845309
 *
 * Copyright 2011-2012, Faisalman
 * Licensed under The MIT License
 * http://www.opensource.org/licenses/mit-license  
 *
 */
 
// function convertToRupiah(angka)
// {
// 	var rupiah = '';		
// 	var angkarev = angka.toString().split('').reverse().join('');
// 	for(var i = 0; i < angkarev.length; i++) if(i%3 == 0) rupiah += angkarev.substr(i,3)+'.';
// 	return 'Rp. '+rupiah.split('',rupiah.length-1).reverse().join('');
// }
/**
 * Usage example:
 * alert(convertToRupiah(10000000)); -> "Rp. 10.000.000"
 */
 
// function convertToAngka(rupiah)
// {
// 	return parseInt(rupiah.replace(/,.*|[^0-9]/g, ''), 10);
// }
/**
 * Usage example:
 * alert(convertToAngka("Rp 10.000.123")); -> 10000123
 */

// 2018-04-24. Neur
Number.prototype.format = function (n, x, s, c) {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
        num = this.toFixed(Math.max(0, ~~n));

    return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
};

// 2018-06-25
function ConvertToRupiah(nominal) {
    return 'Rp.' + nominal.format(0, 3, '.', ',');
}
function ConvertToNumber(nominal) {
    return nominal.replace(/[^\d^,-]/g, '').replace(',', '.');
}

// 2018-06-27
// https://stackoverflow.com/questions/13459866/javascript-change-date-into-format-of-dd-mm-yyyy/13459946
function convertDate(inputFormat) {
    function pad(s) { return (s < 10) ? '0' + s : s; }
    var d = new Date(inputFormat);
    return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/');
  }

// 2018-02-23 string format in javascript : https://www.codeproject.com/Tips/201899/String-Format-in-JavaScript

String.prototype.format = function (args) {
    var str = this;
    return str.replace(String.prototype.format.regex, function(item) {
        var intVal = parseInt(item.substring(1, item.length - 1));
        var replace;
        if (intVal >= 0) {
            replace = args[intVal];
        } else if (intVal === -1) {
            replace = "{";
        } else if (intVal === -2) {
            replace = "}";
        } else {
            replace = "";
        }
        return replace;
    });
};
String.prototype.format.regex = new RegExp("{-?[0-9]+}", "g");

// 2018-04-21, Paji.
function TDGenerator(arr){
    var str = "";
    for (let i = 0; i < arr.length; i++) {
        str += "<td> " + arr[i] + " </td>";
    }

    return str;
}

// 2018-05-04, Paji.
function NamaBulan(bln){
    var b = parseInt(bln);
    if(b == 1){
        return 'Januari';
    } else if(b == 2) {
        return 'Februari';
    } else if(b == 3) {
        return 'Maret';
    } else if(b == 4) {
        return 'April';
    } else if(b == 5) {
        return 'Mei';
    } else if(b == 6) {
        return 'Juni';
    } else if(b == 7) {
        return 'Juli';
    } else if(b == 8) {
        return 'Agustus';
    } else if(b == 9) {
        return 'September';
    } else if(b == 10) {
        return 'Oktober';
    } else if(b == 11) {
        return 'November';
    } else if(b == 12) {
        return 'Desember';
    }
}


// 2018-02-23 Go to spesific tab in boostrab : https://stackoverflow.com/questions/7862233/twitter-bootstrap-tabs-go-to-specific-tab-on-page-reload-or-hyperlink
var url = document.location.toString();
if (url.match('#')) {
    $('.nav-tabs a[href="#' + url.split('#')[1] + '"]').tab('show');
    $('.nav-tabs a[href="#' + url.split('#')[2] + '"]').tab('show');
    
} 

// Change hash for page-reload
$('.nav-tabs a').on('shown.bs.tab', function (e) {
    window.location.hash = e.target.hash;
});

