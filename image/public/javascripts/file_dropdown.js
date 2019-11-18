var uploadFiles = [];

function preview(file, idx) {

    var reader = new FileReader();

    reader.onload = (function (f, idx) {

        return function (e) {
            //var $thum_ct = $('<div></div>');
            var $thum_div = $('<div></div>');
            var $thum_close = $('<div>X</div>');
            var $thum_img = $('<img>');

            //$thum_ct.addClass('container');
            $thum_div.addClass('thumb');
            $thum_close.addClass('close');
            $thum_close.attr('data-idx', idx);
            $thum_img.attr({
                src: e.target.result,
                title: escape(f.name)
            });

            $thum_div.append($thum_close);
            $thum_div.append($thum_img);
            //$thum_ct.append($thum_div);

            //$('#thumbnails').append($thum_ct);
            $('#thumbnails').append($thum_div);
            resize($thum_img);
            //isFile();
        };

    })(file, idx);
    reader.readAsDataURL(file);


};

function resize(last_prv) {
    var maxWidth = 170;
    var maxHeight = 170;
    var ratio = 0;
    var width = $(last_prv).width();
    var height = $(last_prv).height();
    console.log('h = ' + height + ' w = ' + width);

    if (width > maxWidth) {
        console.log('width processing');
        ratio = maxWidth / width;
        //console.log('ratio = ' + ratio);
        $(last_prv).css('width', maxWidth);
        $(last_prv).css('height', height * ratio);
        height = height * ratio;
        //console.log('h = ' + $(last_prv).css('height') + ' w = ' + $(last_prv).css('width'));
    }

    var width = $(last_prv).width();
    var height = $(last_prv).height();

    if (height > maxHeight) {
        console.log('height processing');
        ratio = maxHeight / height;
        //console.log('ratio = ' + ratio);
        $(last_prv).css('height', maxHeight);
        $(last_prv).css('width', width * ratio);
        width = width * ratio;
        //console.log('h = ' + $(last_prv).css('height') + ' w = ' + $(last_prv).css('width'));
    }
}

/*function isFile() {
    if ($('#thumbnails').children().length == 0) {
        $('#drop').attr('background-color', 'rgba(187, 255, 255, 0.56)');
        $('#drop').html('파일을 드롭 앤 드롭하여 첨부');
    } else {
        $('#drop').attr('background-color', '');
        $('#drop').html('');
    }
}*/