//DOMContentLoading事件綁定-focus, blur, keyup, click事件
$(function () {

    // ==== 1.待辦事項文字框的 focus 事件及 blur 事件觸發 ===== //
    $("input.task_name").on("focus", function () {
        // console.log("focus");
        $(this).closest("div.task_add_block").addClass("-on"); // 添加-on類名，游標點入文字框製造陰影效果
    });

    $("input.task_name").on("blur", function () {
        // console.log("blur");
        $(this).closest("div.task_add_block").removeClass("-on"); // 刪除-on類名，游標移出文字框製造陰影效果
    });


    //========2.text欄位新增待辦事項========//
    $("input.task_name").on("keyup", function (e) {
        // console.log(e.keyCode); // 取得鍵盤按下的keyCode
        if (e.keyCode == 13) { // 如果按下Enter鍵
            $("button.task_add").click(); // 觸發新增按鈕的click事件)
        }
    });


    //========3.按下新增按鈕========//
    $("button.task_add").on("click", function () {
        let task_text = ($("input.task_name").val()).trim(); // 取得文字框的值
        if (task_text != "") { // 如果文字框為空值，則不執行後續動作
            let list_html = `
        <li>
  <div class="item_flex">
    <div class="left_block">
      <div class="btn_flex">
        <button type="button" class="btn_up">往上</button>
        <button type="button" class="btn_down">往下</button>
      </div>
    </div>
    <div class="middle_block">
      <div class="star_block">
        <span class="star" data-star="1"><i class="fas fa-star"></i></span>
        <span class="star" data-star="2"><i class="fas fa-star"></i></span>
        <span class="star" data-star="3"><i class="fas fa-star"></i></span>
        <span class="star" data-star="4"><i class="fas fa-star"></i></span>
        <span class="star" data-star="5"><i class="fas fa-star"></i></span>
      </div>
      <p class="para">${task_text}</p>
    </div>
    <div class="right_block">
      <div class="btn_flex">
        <button type="button" class="btn_update">更新</button>
        <button type="button" class="btn_delete">移除</button>
      </div>
    </div>
  </div>
</li>
    `;
            $("ul.task_list").prepend(list_html); // 將新增的HTML加入到ul.task_list中
            $("input.task_name").val(""); // 清空文字框的值
        }
    });

});


//========移除待辦事項========//
$(document).on("click", "button.btn_delete", function () { //事件綁定
    let r = confirm("確定要刪除嗎？");
    if (r) {
        // console.log(this);
    }

    $(this).closest("li").animate({
        "opacity": 0, // 透明度設為0
    }, 1000, "swing", function () { // 動畫持續時間1000ms
        // console.log("yyy");
        $(this).remove(); // 移除該元素
    });

    //方法二.fadeOut()
    // $(this).closest("li").fadeOut(1000, function () { // 動畫持續時間500ms
    //     $(this).remove(); // 移除該元素
    // });
    // // $(this).closest("li").remove(); // 移除該元素

});

//========按下更新按鈕事件========//
$("ul.task_list").on("click", "button.btn_update", function () {
    // console.log("update"); // 測試用
    let para_el = $(this).closest("li").find("p.para"); // 取得p.para元素
    let task_name_update_el = $(this).closest("li").find("input.task_name_update"); // 取得input.task_name_update元素
    if ($(this).attr("data-edit") == undefined) {//進入編輯狀態

        $(this).attr("data-edit", true); // 設定data-edit屬性為true
        $(para_el).toggleClass("-none");
        $(task_name_update_el).toggleClass("-none"); // 顯示input.task_name_update元素

    } else {
        let update_task_name = ($(task_name_update_el).val()).trim(); // 取得input.task_name_update的值
        if (update_task_name == "") {
            alert("請輸入待辦事項");
        } else {
            $(pare_el).html(update_task_name).toggleClass("-none");
            $(this).removeAttr("data-edit");
        }
    }
});


//========按下移動順序按鈕========//
$("ul.task_list").on("click", "button.btn_up, button.btn_down", function () {
    //往上
    // console.log($(this).closest("li").is(':first-child')); // 判斷是否為第一個元素，要終止行為
    if ($(this).hasClass("btn_up") && $(this).closest("li").is(':first-child')) {
        let clone_html = $(this).closest("li").clone(); // 取得當前元素的HTML
        $(this).closest("li").prev().before(clone_html); // 將當前元素的HTML插入到前一個元素之前
        $(this).closest("li").remove(); // 移除當前元素的HTML
    }

    //往下
    if ($(this).hasClass("btn_down") && $(this).closest("li".is(':last-child'))) {
        let clone_html = $(this).closest("li").clone(); // 取得當前元素的HTML
        $(this).closest("li").next().after(clone_html); // 將當前元素的HTML插入到下一個元素之後
        $(this).closest("li").remove(); // 移除當前元素的HTML

    }

});














