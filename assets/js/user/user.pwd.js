$(function () {
    const form = layui.form

    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格  '],
        samePwd: function (value) {
            if (value === $('[name="oldPwd"]').val()) {
                return '新密码和旧密码不能相同'
            }
        },

        rePwd: function (value) {
            if (value !== $('[name="newPwd"]').val()) {
                return '两次密码输入不一致'
            }
        },
    })


    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/my/updatepwd",
            data: $(this).serialize(),

            success: function (res) {
                console.log(11);
                if (res.status !== 0) {
                    console.log(res);
                    return layui.layer.msg('更新密码失败')

                }
                layui.layer.msg('更新密码成功')

                $('.layui-form')[0].reset()

            }
        });




    })




























































})