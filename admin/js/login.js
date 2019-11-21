
$('.input_sub').on('click', function (e) {
    // 阻止鼠标点击时触发跳转
    e.preventDefault();
    // 获取输入框内容
    const userName = $('.input_txt').val().trim();
    const userPwd = $('.input_pass').val().trim();
    // 判断是否为空输入
    if (userName == '' || userPwd == '') {
        // alert('用户名和密码不能为空');
        // 模态框提示用户
        $('#myModal').modal();
        $('.modal-body').html('用户名和密码不能为空')
        return;
    }

    // 发送ajax请求，获取登录状态情况
    $.ajax({
        type: 'post',
        url: window.BigNew.user_login,
        data: {
            username: userName,
            password: userPwd
        },
        success: function (res) {
            // console.log(res);
            $('#myModal').modal();
            $('.modal-body').text(res.msg);
            if (res.code == 200) {

                localStorage.setItem('token', res.token);

                // alert('登录成功');
                $('#myModal').on('hidden.bs.modal', function (e) {
                    location.href = './index.html';
                })
            }
        }
    })
})
