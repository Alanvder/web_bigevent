// 每次用jq发起请求都会先调用这个函数


$.ajaxPrefilter(function (options) {
    console.log(options);
    console.log(options.url);
    // options.url = 'http://www.liulongbin.top:3007' + options.url

    // console.log(options.url);
})