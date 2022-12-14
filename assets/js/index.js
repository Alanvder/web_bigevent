$(function () {

    getUserInfo()

    $('#btnLogout').on('click', function () {

        //eg1
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
            //do something
            localStorage.removeItem('token')

            location.href = '/login.html'

            layer.close(index);
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

                renderAvater(res.data)
            },

        });
    }


    // 渲染用户头像
    function renderAvater(user) {
        const name = user.nickname || user.username;
        // 设置欢迎文本
        $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
        if (user.user_pic) {
            $('.layui-nav-img').attr('src', user.user_pic).show()
            $('.text-avatar').hide()

        } else {
            $('.layui-nav-img').hide()
            const first = name[0].toUpperCase()
            $('.text-avatar').html(first).show()
        }
    }






























})