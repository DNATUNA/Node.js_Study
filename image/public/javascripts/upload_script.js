var uploadFiles = [];


//프리뷰 생성 함수
function preview(file, idx) {

    var reader = new FileReader();

    reader.onload = (function (f, idx) {

        return function (e) {
            
            //필요한 레이아웃들 정의
            var $thum_div = $('<div></div>');
            var $thum_close = $('<div>X</div>');
            var $thum_img = $('<img>');

            //클래스와 속성 추가
            $thum_div.addClass('thumb');
            $thum_close.addClass('close');
            $thum_close.attr('data-idx', idx);
            $thum_img.attr({
                src: e.target.result,
                title: escape(f.name)
            });

            //노드 연결
            $thum_div.append($thum_close);
            $thum_div.append($thum_img);
            
            $('#thumbnails').append($thum_div);
            
            //이미지 사이즈를 수정
            resize($thum_img);
            
        };

    })(file, idx);
    reader.readAsDataURL(file);
};


//이미지 사이즈 조절 함수. 비율을 유지한 채 최대 크기에 맞춰줌
function resize(last_prv) {
    var maxWidth = 170;
    var maxHeight = 170;
    var ratio = 0;
    var width = $(last_prv).width();
    var height = $(last_prv).height();
    //버그로 크기 값을 0으로 읽어오는 경우가 종종 있어요... 확인용 로그
    console.log('h = ' + height + ' w = ' + width);

    //가로가 최대 길이 보다 길 때 비율에 맞춰 줄이는 과정
    if (width > maxWidth) {
        console.log('width processing');
        ratio = maxWidth / width;
        //console.log('ratio = ' + ratio);
        $(last_prv).css('width', maxWidth);
        $(last_prv).css('height', height * ratio);
        height = height * ratio;
        //console.log('h = ' + $(last_prv).css('height') + ' w = ' + $(last_prv).css('width'));
    }

    //가로를 맞춘 후 다시 값들 재정비
    var width = $(last_prv).width();
    var height = $(last_prv).height();

    //가로를 맞춰도 세로가 최대 길이보다 길면 또 조정
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