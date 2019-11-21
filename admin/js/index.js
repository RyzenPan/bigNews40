
$(function () {
    $.ajax({
        type: 'get',
        url: window.BigNew.user_info,   // 地址用了全局的html.js去封装，在其他页面进行调用
        success: function (res) {
            // 把返回回来的数据设置页面上的元素内容
            $('.user_info>img').attr('src', res.data.userPic);
            $('.user_info>span').html('欢迎&nbsp;&nbsp;' + res.data.nickname);
            $('.user_center_link>img').attr('src', res.data.userPic);
        }
    })
    // 退出按钮
    $('.logout').on('click', function () {
        // 退出的时候删除session中的token
        localStorage.removeItem('token');
        // 跳转到登录页
        location.href = './login.html';
    })

    // 绑定一级菜单按钮高亮
    $('div.level01').on('click', function () {
        // 点击当前按钮高亮
        $(this).addClass('active').siblings('div').removeClass('active');
        // 如果点击的是第二个菜单，则触发二级菜单
        if ($(this).index() == 1) {
            // 二级菜单向下划出
            $('ul.level02').slideToggle();
            // 划出的同时自动选中第一个菜单
            $('ul.level02 a').eq(0)[0].click();
            // 小箭头跟随旋转
            $(this).find('b').toggleClass('rotate0');
        }
    })
    // 绑定二级菜单按钮高亮
    $('ul.level02 li').on('click', function () {
        $(this).addClass('active').siblings('li').removeClass('active');
    })


})
