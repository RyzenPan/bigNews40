
$(function () {
    // 获取个人详情页信息显示
    $.ajax({
        type: 'get',
        url: window.BigNew.user_detail,
        success: function (res) {
            // console.log(res.data);
            $('#inputEmail1').val(res.data.username);
            $('#inputEmail2').val(res.data.nickname);
            $('#inputEmail3').val(res.data.email);
            $('.user_pic').attr('src', res.data.userPic);
            $('#inputEmail4').val(res.data.password);
        }
    })
    // 把图片变量定义在外面，以便ajax请求修改时把文件传上去
    let imgData;
    $('#exampleInputFile').on('change', function () {
        // 获取上传按钮时候的图片文件，并存到imgData中
        imgData = this.files[0];
        let url;
        // 通过URL方法把图片生成url路径，把图片预览到页面上
        if (imgData != null) {
            url = URL.createObjectURL(imgData);
        }

        // console.log(url);
        $('.user_pic').attr('src', url);
    })


    $('.btn-edit').on('click', function (e) {
        e.preventDefault();
        // console.dir($();
        // 设置个人详情页信息保存
        const form = document.querySelector('#form');       // 通过获取原生form表单信息
        const data = new FormData(form);                    // 导入到FormData中可以序列化获取表单信息并转换成二进制
        // 创建一个FormData对象用来存储所有发送的数据
        // data.append('username', $('#inputEmail1').val());
        // data.append('nickname', $('#inputEmail2').val());
        // data.append('email', $('#inputEmail3').val());
        // data.append('userPic', imgData);
        // data.append('password', $('#inputEmail4').val());
        // console.log(data);
        // 发送ajax请求，把要更改的信息上传到服务器
        $.ajax({
            type: 'post',
            url: window.BigNew.user_edit,
            data: data,
            contentType: false,
            processData: false,
            success: function (res) {
                // console.log(res);
                // 如果上传成功，则提示用户成功并跳转到后台首页
                if (res.code == 200) {
                    alert('更新成功');
                    // 通过ajax请求父页面的元素，直接静态不刷新页面修改用户信息，体验更好
                    $.ajax({
                        type: 'get',
                        url: window.BigNew.user_info,   // 地址用了全局的html.js去封装，在其他页面进行调用
                        success: function (res) {
                            // 把返回回来的数据设置页面上的元素内容
                            parent.$('.user_info>img').attr('src', res.data.userPic);
                            parent.$('.user_info>span').html('欢迎&nbsp;&nbsp;' + res.data.nickname);
                            parent.$('.user_center_link>img').attr('src', res.data.userPic);
                            // window.location.reload();
                        }
                    })


                } else {
                    alert('上传失败，请重新上传'); // 失败提示
                }
            }
        })
    })
})

