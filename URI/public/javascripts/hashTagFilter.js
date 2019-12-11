var tagArray = [];
var size = 0;

$(document).ready(function () {

    //엔터가 눌리면 서버로 데이터 전송
    $("input[name=search]").keydown(function (key) {
        if (key.keyCode == 13) {
            var aTag = new Object();
            aTag.tag = $(".searchbox").val();

            //아무것도 입력하지 않으면 변화X
            if (aTag.tag == "")
                return false;

            size = tagArray.push(aTag);
            console.log('tagArray idx(+1) : ' + size);
            console.log(tagArray[size-1].tag + ' is pushed');

            //태그 배열을 서버로 전송
            if(sendTagArray() != 1) {
                console.log('서버 전송 실패');
                return false;
            }

            //태그 컨테이너 생성
            makeTagContainer($('#tagbox'), tagArray[size - 1], size - 1);

            //검색창은 초기화
            $("input").val('');

            //검색 태그들을 기반으로 상품들 재정렬 (아직 구현 x)
            updateProducts();

            //인풋 태그 기본 이벤트 제거
            return false;

            /*makeTagContainer($('#tagbox'), aTag);
            return false;*/
        }
    });

    //태그 삭제.
    $('#tagbox').on("click", ".close", function (e) {
        deleteTagContainer(e);
    });
});

function updateProducts() {
    //상품 재정렬
}

//태그 컨테이너 만드는 함수
function makeTagContainer(target_div, aTag, index) {
    var tag = aTag.tag;
    var $target = target_div;
    var $container = $("<div></div>");
    var idx = index;
    var $close = makeCloseButton(idx);

    $container.text(tag);
    $container.append($close);
    $target.append($container);

    return $target.children().length;
}

//태그 삭제 버튼
function makeCloseButton(index) {
    var $closebt = $("<div>X</div>");
    $closebt.addClass('close');
    $closebt.attr('tag-idx', index);

    return $closebt;
}

//태그 삭제 함수
function deleteTagContainer(e) {
    var $target = $(e.target);
    var idx = $target.attr('tag-idx');
    console.log('tagArray[' + idx + '] : ' + '/' + tagArray[idx].tag + '/' + ' 태그 삭제');

    //삭제한 태그는 사용불가 플래그 설정
    tagArray[idx].upload = 'disable';
    //console.log(tagArray[idx].upload);

    //플래그 설정된 태그 배열을 다시 서버로 전송
    if(sendTagArray() != 1) {
        console.log('태그 삭제 후 전송 실패');
    }

    $target.parent().remove();
}

function sendTagArray() {
    //ajax사용해서 json 형식으로 서버 선송
    var isSuccess = 0;
    const tags = JSON.stringify(tagArray);
    $.ajax({
        url: '/search',
        type: 'POST',
        dataType: 'json',
        data: {
            'search': tagArray
        },
        success: isSuccess = 1
    });

    return isSuccess;
}
