$(function () {


    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)






    $('#btnclick').click(function (e) {
        e.preventDefault();
        console.log(1);
        $('#file').click()
    });

    $('#file').change(function (e) {
        var flieliet = e.target.files
        if (flieliet.length < 1) {
            return layui.layer.msg('请选择照片')
        }


        var fileliast = e.target.files[0]

        var imgurl = URL.createObjectURL(fileliast)

        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', imgurl)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域


    });


    $('#btnupload').click(function () {
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png')

        $.ajax({
            type: "POST",
            url: "/my/update/avatar",
            data: {
                avatar: dataURL
            },
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layui.layer.msg('更新失败')
                }
                layui.layer.msg('更新成功')
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