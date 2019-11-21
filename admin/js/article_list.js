
$(function () {
    // 加载分类筛选选项
    $.ajax({
        type: 'get',
        url: window.BigNew.category_list,
        success: function (res) {
            // 通过模版引擎写入到对应option中
            const htmlStr1 = template('list1', res);
            $('#selCategory').html(htmlStr1);
        }
    })


    // 封装好一个ajax请求，通过传入page和success函数即可调用
    function list(callback, page = 1) {
        $.get({
            url: BigNew.article_query,
            data: {
                type: $('#selCategory').val(),
                state: $('#selStatus').val(),
                page: page,
                perpage: 10
            },
            success: callback
        })
    }



    // 请求所有数据并显示第一页，并且加入分页导航栏
    const allList = function (res) {
        // 通过模版引擎写入到页面中
        const htmlStr = template('list3', res.data);
        $('tbody').html(htmlStr);
        // 引入分页导航栏
        $('#pagination-demo').twbsPagination({
            totalPages: res.data.totalPage,     // 从服务器中获取总页数
            visiblePages: 7,
            first: '首页',
            prev: '上一页',
            next: '下一页',
            last: '尾页',
            onPageClick: function (event, page) {
                var paging = function (res) {
                    const htmlStr = template('list3', res.data);
                    $('tbody').html(htmlStr);
                }
                // 当用户点击页码的时候重新请求数据并渲染到页面上
                list(paging, page);
            }
        });

    }

    // 页面加载时请求所有数据并显示第一页
    list(allList);

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
        // 阻止a标签跳转默认行为
        e.preventDefault();
        // 点击筛选按键时，获取两个select按键的val值，发送ajax请求，返回到数据重新渲染到页面上
        const flter = function (res) {
            $('#pagination-demo').twbsPagination('changeTotalPages', res.data.totalPage, 1)
            const htmlStr = template('list3', res.data);
            $('tbody').html(htmlStr);
        }
        list(flter);
    })

})