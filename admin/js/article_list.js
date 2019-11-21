
$(function () {
    // 加载分类筛选选项
    $.ajax({
        type: 'get',
        url: window.BigNew.category_list,
        success: function (res) {
            // console.log(res);
            const htmlStr1 = template('list1', res);
            $('#selCategory').html('<option value="">所有分类</option>' + htmlStr1);

        }
    })

    // 渲染所有列表
    let data = {
        // key: '',
        // type: '',
        // state: '',
        page: 1,
        perpage: 10
    }
    // 传入空对象直接返回所有文章列表
    list(data);
    function list(data) {
        $.get({
            url: BigNew.article_query,
            data: data,
            success: function (res) {
                // console.log(res);
                const htmlStr = template('list3', res.data);
                // console.log(htmlStr);
                $('tbody').html(htmlStr);
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
    $('#btnSearch').on('click', function () {
        console.log($('.form-inline').serialize());
        console.log($('.form-inline').serializeArray());
    })

})