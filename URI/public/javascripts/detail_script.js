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