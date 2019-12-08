var uploadFiles = [];

$(document).ready(function() {

        
            var $drop = $("#drop");

            $drop.on("dragenter", function(e) { //드래그 요소가 들어왔을떄

                $(this).css('background-color', '#ccf5ff');

            }).on("dragleave", function(e) { //드래그 요소가 나갔을때

                $(this).css('background-color', 'rgb(255, 248, 238);');

            }).on("dragover", function(e) {

                e.stopPropagation();

                e.preventDefault();

            }).on('drop', function(e) { //드래그한 항목을 떨어뜨렸을때
                
                $('.drop_caption').css('display', 'none');
                e.preventDefault();
                
                //배경색을 원래대로 돌리고싶은데 동작을 안하네요..
                $(this).css('background-color', 'rgb(255, 248, 238);');



                var files = e.originalEvent.dataTransfer.files; //드래그&드랍 항목


                for (var i = 0; i < files.length; i++) {

                    var file = files[i];

                    var size = uploadFiles.push(file); //업로드 목록에 추가

                    preview(file, size - 1); //미리보기 만들기

                }



                $("#btnSubmit").on("click", function() {

                    var formData = new FormData();

                    $.each(uploadFiles, function(i, file) {

                        if (file.upload != 'disable') //삭제하지 않은 이미지만 업로드 항목으로 추가

                            formData.append('upload-file', file, file.name);

                    });


                    /*$.ajax({

                        url: '/api/etc/file/upload',

                        data: formData,

                        type: 'post',

                        contentType: false,

                        processData: false,

                        success: function(ret) {

                            alert("완료");

                        }

                    });*/

                });


                $("#thumbnails").on("click", ".close", function(e) {

                    var $target = $(e.target);

                    var idx = $target.attr('data-idx');

                    uploadFiles[idx].upload = 'disable'; //삭제된 항목은 업로드하지 않기 위해 플래그 생성

                    $target.parent().remove(); //프리뷰 삭제
                    
                    if($('#thumbnails').children().length == 0)
                        $('.drop_caption').css('display', 'block');
                });
            });
        });


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
            //resize($thum_img, 170, 170);
            //버그 고칠 때 까지 사용 불가
            
        };

    })(file, idx);
    reader.readAsDataURL(file);
};


//이미지 사이즈 조절 함수. 비율을 유지한 채 최대 크기에 맞춰줌
function resize($image, maxWidth, maxHeight) {
    var ratio = 0;
    var width = $image.width();
    var height = $image.height();
    //버그로 크기 값을 0으로 읽어오는 경우가 종종 있어요... 확인용 로그
    console.log('h = ' + height + ' w = ' + width);

    //가로가 최대 길이 보다 길 때 비율에 맞춰 줄이는 과정
    if (width > maxWidth) {
        console.log('width processing');
        ratio = maxWidth / width;
        //console.log('ratio = ' + ratio);
        $image.css('width', maxWidth);
        $image.css('height', height * ratio);
        height = height * ratio;
        //console.log('h = ' + $(last_prv).css('height') + ' w = ' + $(last_prv).css('width'));
    }

    //가로를 맞춘 후 다시 값들 재정비
    var width = $image.width();
    var height = $image.height();

    //가로를 맞춰도 세로가 최대 길이보다 길면 또 조정
    if (height > maxHeight) {
        console.log('height processing');
        ratio = maxHeight / height;
        //console.log('ratio = ' + ratio);
        $image.css('height', maxHeight);
        $image.css('width', width * ratio);
        width = width * ratio;
        //console.log('h = ' + $(last_prv).css('height') + ' w = ' + $(last_prv).css('width'));
    }
}