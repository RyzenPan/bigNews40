// 文字热门排行模块
$.ajax({
    type: 'get',
    url: 'http://localhost:8080/api/v1/index/rank',
    success: function (res) {
        // console.log(res);
        const htmlStr = template('hotList', res)
        // console.log(htmlStr);
        $(".hotrank_list").html(htmlStr);
    }
})

// 最新资讯
$.ajax({
    type: 'get',
    url: 'http://localhost:8080/api/v1/index/latest',
    success: function (res) {
        // console.log(res);
        const htmlStr = template('newList', res);
        // console.log(htmlStr);
        $(".common_news").html(htmlStr);
    }
})
// 最新评论
$.ajax({
    type: 'get',
    url: 'http://localhost:8080/api/v1/index/latest_comment',
    success: function (res) {
        // console.log(res);
        const htmlStr = template('commentList', res);
        // console.log(htmlStr);
        $(".comment_list").html(htmlStr);
    }
})

// 焦点关注 
$.ajax({
    type: 'get',
    url: 'http://localhost:8080/api/v1/index/attention',
    success: function (res) {
        console.log(res);
        const htmlStr = template('attention', res);
        // console.log(htmlStr);
        $(".guanzhu_list").html(htmlStr);
    }
})

// 焦点图片
$.ajax({
    type: 'get',
    url: 'http://localhost:8080/api/v1/index/hotpic',
    success: function (res) {
        // console.log(res);
        const htmlStr = template('hotpic', res);
        // console.log(htmlStr);
        $(".focus_list").html(htmlStr);
    }
})

// 搜索按钮
$('.search_btn').on('click', function () {
    location.href = './list.html?key=' + $('.search_txt').val();
})
