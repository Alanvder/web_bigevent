$(function () {

    const layer = layui.layer
    const form = layui.form
    form.verify({

        nickname: function (value) {
            if (value.length > 6) {
                return "昵称长度必须在1~6个字符"

            }
        }
    })


    initUserInfo()



    function initUserInfo() {
        $.ajax({
            type: "GET",
            url: "/my/userinfo",

            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败')
                }

                form.val('formUSerInfo', res.data)
            }
        });
    }


    $('#btnReset').click(function (e) {
        // e.preventDefault()
        initUserInfo()
    });



    $('.layui-form').submit(function (e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/my/userinfo",
            data: $(this).serialize(),

            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新用户数据失败')

                }
                layer.msg('更新用户数据成功')
                console.log(res);
                // window.parent.getUserInfo()
                getUserInfo()
            }
        });
    });





    function getUserInfo() {
        $.ajax({
            type: "GET",
            url: "/my/userinfo",
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg("获取用户信息失败")
                }
                console.log(res.data);
                renderAvater(res.data)
            },

        });
    }


    // 渲染用户头像
    function renderAvater(user) {
        console.log(user);
        let name = user.nickname || user.username;
        // 设置欢迎文本
        console.log(name);
        $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
        if (user.user_pic) {
            $('.layui-nav-img').attr('src', user.user_pic).show()
            $('.text-avatar').hide()

        } else {
            $('.layui-nav-img').hide()
            let first = name[0].toUpperCase()
            $('.text-avatar').html(first).show()
        }
    }




})