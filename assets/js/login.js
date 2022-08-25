$(function () {

    $('#link_red').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()

    })

    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    const form = layui.form
    const layer = layui.layer
    form.verify({
        pass: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {

            var pwd = $('#pws').val()
            if (pwd !== value) {
                return '两次密码不一致'
            }
        }
    })




    // 监听注册表单的提交
    $('#form_reg').on('submit', function (e) {
        e.preventDefault()
        console.log($('#uname').val());
        console.log($('#pws').val());
        $.post("/api/reguser", { username: $('#uname').val(), password: $('#pws').val() },
            function (res) {
                console.log(res);
                if (res.status !== 0) {
                    // return console.log(res.message);
                    return layer.msg(res.message);
                }
                // console.log(注册成功);
                layer.msg('注册成功');
                $('#link_login').click()
            },

        );

    })

    // 监听登陆表单的提交

    $('#form_login').submit(function (e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/api/login",
            data: $(this).serialize(),

            success: function (res) {
                if (res.status !== 0) {
                    console.log($(this).serialize());
                    return layer.msg('登录失败');
                }

                layer.msg('登录成功')
                // 将得到的token保存到本地存储,便于以后用
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
            }
        });
    });


































})