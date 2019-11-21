
// 入口函数
$(function () {
    // 阻止a标签出现的跳转错误
    $('a').each(function () {
        this.onclick = function (e) {
            e.preventDefault()
        }
    })

    // 获取文章类别
    function getList() {
        $.get({
            url: BigNew.category_list,
            success: function (res) {
                const htmlStr = template('list', res)
                $('tbody').html(htmlStr);
            }
        })
    }
    getList();

    // 创建及编辑按钮逻辑功能
    $('#myModal').on('show.bs.modal', function (e) {
        // 通过bootstrap模态框自带的e.relatedTarget方法，可以快速获取触发模态框的原生对象
        const el = e.relatedTarget;
        // 通过判断触发对象的id值跟目标按钮的匹配，可以做出创建和编辑按钮不同的逻辑功能
        if (el.id == 'xinzengfenlei') {
            // 改变按钮的颜色和文字
            $('.btn-confirm').text('创建').addClass('btn-success').removeClass('btn-primary');
            // 改变标题栏文字
            $('#exampleModalLabel').text('创建文章类别');
            // 清空输入框全部内容
            $('.modal-body form')[0].reset();
        } else {
            // 改变按钮的颜色和文字
            $('.btn-confirm').text('编辑').addClass('btn-primary').removeClass('btn-success');
            // 改变标题栏文字
            $('#exampleModalLabel').text('编辑文章类别');
            // 把点击的id号赋值到模态框内的隐藏域
            $('#modalId').val($(el).attr('data-id'));
            // 同时把触发项的文字内容渲染到模态框上
            const artName = $(el).parent().siblings('.artName').text();
            const artSlug = $(el).parent().siblings('.artSlug').text();
            $('#recipient-name').val(artName);
            $('#message-text').val(artSlug);

        }
        // 给提交按钮绑定事件
        $('.btn-confirm').on('click', function () {
            // 点击时获取模态框输入的内容
            const name = $('#recipient-name').val();
            const slug = $('#message-text').val();
            // 通过判断当前模态框提交按钮的类名，确认是编辑还是新增
            if ($(this).hasClass('btn-success')) {
                // 如果是新增就发起新增post请求，提交
                $.post({
                    url: BigNew.category_add,
                    data: {
                        name: name,
                        slug: slug,
                    },
                    success: function () {
                        // 提交完成之后隐藏模态框并重新渲染列表数据
                        $('#myModal').modal('hide')
                        getList();
                    }
                })
            } else {
                const id = $('#modalId').val();
                // console.log(id);
                // 如果是编辑就发起编辑post请求，提交id和模态框内容
                $.post({
                    url: BigNew.category_edit,
                    data: {
                        name: name,
                        slug: slug,
                        id: id
                    },
                    success: function (res) {
                        // 提交完成之后隐藏模态框并重新渲染列表数据
                        $('#myModal').modal('hide')
                        getList();
                    }
                })
            }
        })
    })

    $('tbody').on('click', '.btn-delelt', function () {
        // console.log($(this).attr('data-id'));
        // 先从当前的按钮获得触发的id号
        const delId = $(this).attr('data-id');
        // 通过提示框询问用户是否删除
        const flag = confirm('您确定要删除该文章类别吗？')
        // 如果确认要删除，就开始执行删除请求
        if (flag) {
            $.post({
                url: BigNew.category_delete,
                data: {
                    id: delId
                },
                success: function (res) {
                    // 提交完成之后重新渲染列表数据
                    getList();
                }
            })
        }
    })

})
