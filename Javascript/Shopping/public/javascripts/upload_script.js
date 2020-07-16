var uploadFiles = [];

var worldCount = 0;

$(document).ready(function () {
  $('#files').css('display', 'none')


    var $drop = $("#drop");

    $drop.on("dragenter", function (e) { //드래그 요소가 들어왔을떄

        $(this).css('background-color', '#ccf5ff');

    }).on("dragleave", function (e) { //드래그 요소가 나갔을때

        $(this).css('background-color', 'rgb(255, 248, 238);');

    }).on("dragover", function (e) {

        e.stopPropagation();

        e.preventDefault();

    }).on('drop', function (e) { //드래그한 항목을 떨어뜨렸을때

        $('.drop_caption').css('display', 'none');
        e.preventDefault();

        //배경색을 원래대로 돌리고싶은데 동작을 안하네요..
        $(this).css('background-color', 'rgb(255, 248, 238);');

        initDropZone();

        var files = e.originalEvent.dataTransfer.files; //드래그&드랍 항목

        var size = addFiles(files); //파일 input에 추가
        console.log(size);
        for(var i = 0; i < size; i++) {
          preview(files[i], size); //미리보기 만들기
          console.log('파일 프리뷰 생성. idx : ' + size);
        }
    });
    /*$("#thumbnails").on("click", ".close", function (e) {
        deleteFile(e);
    });*/

    /*$("button.upload").click(function() {
        beforeUpload();
    });*/
});

function initDropZone() {
  $('#thumbnails').empty();
}

/*function beforeUpload() {
    $("input.disabled").remove();
    var input_tag = $('input#file_upload.addinput');
    input_tag[input_tag.length-1].remove();
}*/

/*function deleteFile(e) {
    var $target = $(e.target);
    //x누른 파일의 인덱스 가져오기
    var idx = $target.attr('data-idx');
    console.log('누른 항목의 idx : ' + idx);

    //파일input 태그들 탐색
    var input_tag = $('input#file_upload.addinput');

    //삭제한 파일에 해당하는 태그에 플래그용 클래스 추가
    input_tag.eq(idx).addClass('disabled');

    $target.parent().remove(); //프리뷰 삭제

    if ($('#thumbnails').children().length == 0)
        $('.drop_caption').css('display', 'block');
}*/

/*function addFiles(file) {
    var arr = $('input#file_upload.addinput'); //파일 input 태그들 선택
    //console.log('arr.lenght = ' + arr.length);
    arr[arr.length - 1].files = file; //마지막 파일 input에다가 드래그한 파일 추가
    try {
        let new_input = "<input id='file_upload' type='file' name='fileupload' multiple='multiple' class='addinput'/>";
        $('#files').append(new_input);
        //새롭게 파일input 태그 추가해놓기
    } catch (err) {
        console.log(err);
    }
    console.log('arr.length = ' + arr.length);
    return arr.length - 1;
}*/

function addFiles(file) {
  var arr = $('input#file_upload.addinput');
  arr[arr.length - 1].files = file;
  console.log(file);
  return file.length;
}

//프리뷰 생성 함수
function preview(file, idx) {

    var reader = new FileReader();

    reader.onload = function (e) {

        //return function (e) {

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
            title: escape(file.name)
        });

        //노드 연결
        $thum_div.append($thum_close);
        $thum_div.append($thum_img);

        $('#thumbnails').append($thum_div);

        $thum_close.css('display', 'none');

        //이미지 사이즈를 수정
        //resize($thum_img, 170, 170);
        //버그 고칠 때 까지 사용 불가
        //};
    } //(file, idx);
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

//태그를 공백 기준으로 파싱
function parseTag(tag_string) {
    var tagsArray = tag_string.split(' ');
    return tagsArray;
}
