var tagArray = [];
var size = 0;

$(document).ready(function () {

    //엔터가 눌리면 서버로 데이터 전송
    $("input[name=search]").keydown(function (key) {
        console.log('1');
        if (key.keyCode == 13) {
            console.log('2');
            //인풋 태그 기본 이벤트 제거
            key.preventDefault();

            var aTag = new Object();
            aTag.tag = $(".searchbox").val();


            //아무것도 입력하지 않으면 변화X
            if (aTag.tag == "")
                return false;

            size = tagArray.push(aTag);
            console.log('tagArray idx(+1) : ' + size);
            console.log(tagArray[size-1].tag + ' is pushed');

/*            //태그 배열을 서버로 전송
            if(sendTagArray() != 1) {
                console.log('서버 전송 실패');
                return false;
            }
*/
            sendTagArray();

            //태그 컨테이너 생성
            makeTagContainer($('#tagbox'), tagArray[size - 1], size - 1);

            //검색창은 초기화
            $("input").val('');

            //검색 태그들을 기반으로 상품들 재정렬 (아직 구현 x)
            updateProducts();
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
    const tags = JSON.stringify(tagArray);
    $.ajax({
        url: '/search',
        type: 'POST',
        dataType: 'json',
        data: {
            'search': tags
        },
        success: function (data) {
            let posts = data.posts;
            console.log(posts);
            const start = () =>{
                $('.content').empty();
                //var postsLength = posts.length;
                console.log(posts);  
                $(document).ready(function () {
                    let idArray = new Array();
                    let srcArray = new Array();
                    //console.log(postsLength);
                    // posts가 배열이라는 뜻은 여러 개의 데이터가 넘어왔다는 소리
                    // posts가 배열이 아니라는 뜻은 한 개의 데이터가 넘어왔다는 소리
                    if(Array.isArray(posts)) {
                    // 각 게시물의 썸네일 이미지 URL을 srcArray 배열에 저장.
                    for(var i = 0 ; i < posts.length ; i++){
                        srcArray.push("http://127.0.0.1:3000/img/"+posts[i].item_img.split(',', 1)); 
                    }
                    
                    // 각 게시물의 id값을 idArray 배열에 저장.
                    for(var i = 0 ; i < posts.length ; i++){
                        idArray.push(posts[i].id);
                    }
                    } else {
                    const post = posts.item_img.split(',');
                    for(var i = 0; i < post.length - 1; i++){
                        srcArray.push("http://127.0.0.1:3000/img/"+post[i]);
                    }
                    
                    
                    // 각 게시물의 id값을 idArray 배열에 저장.
                        idArray.push(posts.id);
                    }
    
                // 함수 addProduct : add_data_script.js에 존재.
                for(var i = 0; i < srcArray.length; i++)
                    addProduct($('.content'), srcArray[i], idArray[i]);
                });
            }
            start();
        },
        error: (err) => {
            console.log(err);
        }
    });
}
