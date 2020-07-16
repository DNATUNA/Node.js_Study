var COL_LENGTH = 4; //한 행에 들어갈 상품 수
var detailUrl = ""; //디테일 페이지 URL 주소


// 건훈이가 주는 디테일 URL 뒤에 idArray로 받은 id 값을 붙여서 a 태그 링크로 걸자. 
var addProduct = function ($target_div, productData, idArray) { //상품 추가하는 함수

    // 디테일 페이지 URL를 detailUrl변수에 저장.
    detailUrl = "http://127.0.0.1:3000/detail/" + idArray;
    
    //현재 페이지에 있는 상품 행의 개수를 검사
    var numOfChildren = $target_div.children().length;

    //상품의 행이 없다면 새로 만듦
    if (numOfChildren == 0) {
        makeRowProduct($target_div);
        numOfChildren++;
        console.log("context don't have row. row is created.");
    }

    //마지막 행(상품을 추가할)을 정의
    $parent_row_product = $target_div.children().eq(numOfChildren - 1);

    //마지막 행의 열 개수를 검사
    var numOfRowChildren = $parent_row_product.children().length;

    //상품을 추가할 행이 가득 찼다면 새로운 행을 만듦 
    if (numOfRowChildren == COL_LENGTH) {
        makeRowProduct($target_div);
        numOfChildren++;
        console.log("last row is full. new row is created.");
    }

    //마지막 행을 다시 정의
    $parent_row_product = $target_div.children().eq(numOfChildren - 1);

    //마지막 행에 열을 추가
    makeColProduct($parent_row_product, productData);
}

//열을 추가하는 함수
var makeColProduct = function ($parent_row_product, productData) {
    //열과 상품 요소를 생성
    var $col_product = $("<img></img>"); //썸네일 이미지 태그.
    var $container = $("<a></a>");  //썸네일 이미지를 감싸는 a태그.


    // 썸네일 이미지를 감싸는 a태그에 href속성을 설정해준다.
    $container.attr("href", detailUrl);
    $col_product.addClass("col_product").attr("src", productData);
    

    //네 번째 상품이면 오른쪽 마진을 없앤다
    if ($parent_row_product.children().length == COL_LENGTH - 1) {
        $container.css("margin-right", "0px");
        console.log("last row has " + $parent_row_product.children().length + " cols. we need no margin col.");

    }

        
    $container.append($col_product);
    $parent_row_product.append($container);
}

//열을 만드는 함수
var makeRowProduct = function ($target_div) {
    var $row_product = $("<div></div>")
    $row_product.addClass("row_product");
    $target_div.append($row_product);
}


