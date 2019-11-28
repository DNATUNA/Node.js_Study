var COL_LENGTH = 4; //한 행에 들어갈 상품 수

var addProduct = function ($target_div, productData) { //상품 추가하는 함수
    //현재 페이지에 있는 상품 행의 개수를 검사
    var numOfChildren = $target_div.children().length;

    console.log("content has " + numOfChildren + " rows");

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

    console.log("last row has " + numOfRowChildren + " cols.");

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

    console.log("col is created in row[" + (numOfChildren - 1) + "].");
}

//열을 추가하는 함수
var makeColProduct = function ($parent_row_product, productData) {
    //열과 상품 요소를 생성
    var $col_product = $("<div></div>");
    var $product = $("<div></div>");
    var $productImg = $("<img>");

    //클래스 연결
    $col_product.addClass("col_product");
    $product.addClass("product");
    $productImg.attr("src", productData/*.src*/);

    //네 번째 상품이면 오른쪽 마진을 없앤다
    if ($parent_row_product.children().length == COL_LENGTH - 1) {
        $col_product.css("margin-right", "0px");
        console.log("last row has " + $parent_row_product.children().length + " cols. we need no margin col.");

    }
    //요소 연결
    $product.append($productImg);
    $col_product.append($product);
    $parent_row_product.append($col_product);
    
    resize($productImg, 206, 200);
}

//열을 만드는 함수
var makeRowProduct = function ($target_div) {
    var $row_product = $("<div></div>")
    $row_product.addClass("row_product");
    $target_div.append($row_product);
}
