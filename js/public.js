(function () {
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
            // console.log(res);
            const htmlStr = template('attention', res);
            // console.log(htmlStr);
            $(".guanzhu_list").html(htmlStr);
        }
    })


})()