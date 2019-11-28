$(document).ready(function () {

    //페이지를 불러오면서 서버로부터 productData 데이터를 불러 와야할 것 같아요

    /*제가 생각해본 productData 구조----클래스로 구현
    이 생성자 함수를 이용하여 불러온 데이터를 productData 인스턴스로 생성 -> setProduct에
    인자로 넘겨서 이 페이지를 초기화하기
    */
    function makeProductData(title, /*profile,*/ date, desc, contect, src, prict, tags) {
        this.title = title; //글 제목
        //this.profile = profile; //글쓴이 정보(프로필)
        this.date = date; //글 올린 날짜
        this.desc = desc; //글 내용
        this.contect = contect; //글쓴이 연락처

        this.src = src; //사진 배열
        
        this.price = price;
        this.tags = tags;
    }

    var src = new Array();
    var tags = new Array();

   /*임시 데이터 하드코딩으로 추가할게요*/
    var title = "아프리모 향수";
    //var profile = "";
    var date = "19-11-28";
    var desc = "아프리모 향수 팔아요 <br> 사고 한 번 뿌려봤는데 생각보다 마음에 안들어서 판매합니다 <br> 보증서, 박스 모두 포함해서 새상품 처럼 드려요 <br> 택포입니다";
    
    var contect = "010-9885-5658";
    var price = "19,900";
   src.push("https://m.afrimo.net/web/product/tiny/201808/0c2cafd3a350042731e9e598565323c7.jpg")
    src.push("https://i.ebayimg.com/images/g/tPEAAOSwAm9bxKrt/s-l1600.jpg");
    
    tags.push("향수");
    tags.push("중고");
    tags.push("AFRIMO");
    tags.push("패션");
    tags.push("급처");
    tags.push("택포");
    

    //서버에서 받아온 데이터로 인스턴스 생성
    var productData = new makeProductData(title, /*profile,*/ date, desc, contect, src, price, tags);

    //화면에 보이는 데이터를 그걸로 초기화
    setProduct(productData);
    
    //이미지 슬라이더 플러그인
    $('.slider').bxSlider({
        //자동 넘김 끄기
        auto: false
    });

});

var setProduct = function (productData) {
    setTitle(productData.title);

    //setProfile(productData.profile);
    //프로필 사진 구현해보려고 했는데 우선은 없는 걸로 해요!

    setDate(productData.date);
    setDescription(productData.desc);

    setContect(productData.contect);
    setPrice(productData.price);
    setTag(productData.tags);

    var numOfPic = productData.src.length;

    //이미지의 src들을 슬라이더에 추가
    for (var i = 0; i < numOfPic; i++)
        addPicture(productData.src[i]);
}

//제목 설정
var setTitle = function (str_title) {
    $('.title').html(str_title);
}

//프로필 사진 설정
var setProfile = function (url_profile) {
    $('.profile').attr('src', url_profile);
}

//날짜 설정
var setDate = function (date_date) {
    $('.date').html(date_date);
}

//상품 설명 설정
var setDescription = function (str_description) {
    $('.description').html(str_description)
}

//상품 사진 추가
var addPicture = function (arr_picture) {
    var $li_picture = $('<li></li>');
    var $img_picture = $('<img>');
    $img_picture.attr('src', arr_picture);
    $li_picture.append($img_picture);
    $('.slider').append($li_picture);
}

var setContect = function (str_contect) {
    //buy 누르면 팝업으로 연락처 출력
    //지금은 임시로 콘솔 로그
    $('.buy').click(console.log(str_contect));
}
var setPrice =function(str_price) {
    $('.price').html(str_price + "￦");
}

var setTag = function(arr_tag) {
    var tag_length = arr_tag.length;
    var tags = "";
    
    for(var i = 0; i < tag_length; i++) {
        tags += "#";
        tags += arr_tag[i];
        tags += " ";
    }
    
    $('.tags').html(tags);
}