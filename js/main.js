$(document).ready(function(){
    // inisiasi api
    var _url='http://my-json-server.typicode.com/Clareand/belajar-api/mahasiswa';
    // menampung seluruh data mahasiswa
    var result='';
    //menampung seluruh data gender mahasiswa
    var gender_result='';
    // menampung gender sebagai optiom
    var gender=[];

        $.get(_url,function (data) {
        $.each(data, function(key,items) {
            _gend= items.gender;
            result += '<div>'
                            +'<h3>'+items.name+ '</h3><p>' +_gend+ '</p></div>';

            // gender diambil dari api, gender disini definisi gender yang di atas

            if($.inArray(_gend,gender)===-1){
                gender.push(_gend);
                gender_result += "<option value='"+_gend+"'>"+_gend+"</option>";
            }
        });

        $('#mhs-list').html(result);

        $('#mhs-select').html("<option value='semua'>semua</option>"+gender_result);
        });

        //filter data

        $("#mhs-select").on('change', function(){
            updateListMahasiswa($(this).val());
        });

        function updateListMahasiswa(opt) {
            var result = '';
            var _url2 = _url;

            // cek opsi yg dipilih
            if(opt !== 'semua'){
                _url2 = _url + '?gender='+opt;
            }

            $.get(_url2,function (data) {
                $.each(data, function(key,items) {
                    _gend= items.gender;
                    result += '<div>'
                                    +'<h3>'+items.name+ '</h3><p>' +_gend+ '</p></div>';
                });

                $('#mhs-list').html(result);
        
                });


        }
    });

    if ('serviceWorker' in navigator) {
        window.addEventListener( 'load',function() {
            navigator.serviceWorker.register('/serviceworker.js').then(
                function(reg){
                    //registrasi service worker berhasil
                    console.log('SW registration success, scope :', reg.scope);

                },
                function (err){
                    // reg failed
                    console.log('SW registration failed :', err);
                }
            )
        })
    }