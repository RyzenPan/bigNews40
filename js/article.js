
$(function () {
    const myId = location.search.slice(4) + '';
    $.get({
        url: 'http://localhost:8080/api/v1/index/article',
        data: {
            id: myId
        },
        success: function (res) {
            console.log(res);
            const htmlStr = template('art-content', res)
            console.log(htmlStr);
            $('#artContent').html(htmlStr);
            $('.prev').attr('href', './article.html?id=' + res.data.prev.id).text(res.data.prev.title);
            $('.next').attr('href', './article.html?id=' + res.data.next.id).text(res.data.next.title);
        }
    })

    // 评论列表
    function comment() {
        $.get({
            url: 'http://localhost:8080/api/v1/index/get_comment',
            data: {
                articleId: myId
            },
            success: function (res) {
                const htmlStr = template('commentList1', res);
                $('.comment_list_con').html(htmlStr);
                $('.comment_count span').text(res.data.length)
            }
        })


    }
    comment();

    // 发表评论
    $('.comment_sub').on('click', function (e) {
        e.preventDefault();
        $.post({
            url: 'http://localhost:8080/api/v1/index/post_comment',
            data: {
                author: $('.comment_name').val(),
                content: $('.comment_input').val(),
                articleId: myId
            },
            success: function (res) {
                console.log(res);
                if (res.code == 201) {
                    alert('留言成功，等待后台审核后展示到页面中');
                }
            }
        })
    })

    // 搜索按钮
    $('.search_btn').on('click', function () {
        location.href = './list.html?key=' + $('.search_txt').val();
    })


})