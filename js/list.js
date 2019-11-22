
//入口函数
$(function () {

    // 封装搜索功能
    function searchBtn(text) {
        if (text == undefined) {
            //获取搜索内容
            var text = $('.search_txt').val();
        }
        //ajax请求
        $.get({
            url: 'http://localhost:8080/api/v1/index/search',
            data: {
                page: 1,
                perpage: 10,
                key: text
            },
            success: function (res) {
                $('.setfr').html(template('news', res));
                // console.log(res);

                var totalPages = Math.ceil(res.data.totalCount / 10);
                // 引入分页导航栏
                $('#pagination-demo').twbsPagination({
                    totalPages: totalPages,     // 从服务器中获取总页数
                    visiblePages: 7,
                    first: '首页',
                    prev: '上一页',
                    next: '下一页',
                    last: '尾页',
                    onPageClick: function (event, page) {
                        // 当用户点击页码的时候重新请求数据并渲染到页面上
                        // myPage = page;
                        console.log(page);
                        $.get({
                            url: 'http://localhost:8080/api/v1/index/search',
                            data: {
                                page: page,
                                perpage: 10,
                                key: text
                            },
                            success: function (res) {
                                $('.setfr').html(template('news', res));
                            }
                        })
                    }
                });
            }
        });
    }

    //搜索按钮点击事件 
    $('.search_btn').click(function () {
        searchBtn();
    });

    // 如果地址栏存在get数据，则导向该搜索结果
    if (location.search != '') {
        var title = decodeURI(location.search.slice(5)); //只需要转一次码 
        searchBtn(title);
        $('.search_txt').val(title);
        $('.search_btn').trigger('click');
    }

    //页面一加载：默认搜索全部
    $('.search_btn').trigger('click');
    searchBtn();
    $('.search_btn')[0].click();


});