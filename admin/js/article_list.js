
$(function () {
    // 加载分类筛选选项
    $.ajax({
        type: 'get',
        url: window.BigNew.category_list,
        success: function (res) {
            // console.log(res);
            const htmlStr1 = template('list1', res);
            $('#selCategory').html(htmlStr1);
        }
    })

    // 渲染所有列表
    list();
    function list(data) {
        $.get({
            url: BigNew.article_query,
            data: {
                type: $('#selCategory').val(),
                state: $('#selStatus').val(),
                page: 1,
                perpage: 10
            },
            success: function (res) {
                console.log(res);
                const htmlStr = template('list3', res.data);
                // console.log(htmlStr);
                $('tbody').html(htmlStr);
                // 引入分页导航栏
                $('#pagination-demo').twbsPagination({
                    totalPages: res.data.totalPage,
                    visiblePages: 7,
                    first: '首页',
                    prev: '上一页',
                    next: '下一页',
                    last: '尾页',
                    onPageClick: function (event, page) {
                        $.get({
                            url: BigNew.article_query,
                            data: {
                                type: $('#selCategory').val(),
                                state: $('#selStatus').val(),
                                page: page,
                                perpage: 10
                            },
                            success: function (res) {
                                const htmlStr = template('list3', res.data);
                                $('tbody').html(htmlStr);
                            }
                        })
                    }
                });

            }
        })
    }

    // 删除功能
    $('tbody').on('click', '.delete', function () {
        // console.log($(this).attr('data-id'));
        // 先从当前的按钮获得触发的id号
        const delId = $(this).attr('data-id');
        // 通过提示框询问用户是否删除
        const flag = confirm('您确定要删除该文章类别吗？')
        // 如果确认要删除，就开始执行删除请求
        if (flag) {
            $.post({
                url: BigNew.article_delete,
                data: {
                    id: delId
                },
                success: function (res) {
                    // 提交完成之后重新渲染列表数据
                    list(data);
                }
            })
        }
    })

    // 筛选功能
    $('#btnSearch').on('click', function (e) {
        e.preventDefault();
        $.get({
            url: BigNew.article_query,
            data: {
                type: $('#selCategory').val(),
                state: $('#selStatus').val(),
                page: 1,
                perpage: 10
            },
            success: function (res) {
                $('#pagination-demo').twbsPagination('changeTotalPages', res.data.totalPage, 1)
                const htmlStr = template('list3', res.data);
                $('tbody').html(htmlStr);
            }
        })
    })

})