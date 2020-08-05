define([], function() {
    return {
        modfn: function() {
            const $username = $('.username');
            const $pass = $('.password');
            const $btn = $('.btn');
            const $span1 = $('.one');

            $btn.on('click', function() {
                $.ajax({
                    type: 'post',
                    url: 'http://localhost/WWW/TMALL/php/login.php',
                    data: {
                        name: $username.val(),
                        pass: $pass.val(),
                    }
                }).done(function(data) {
                    if (!data) {
                        console.log($username.val());
                        console.log($pass.val());
                        $span1.html('用户名或者密码错误');
                        $span1.css('color', 'red');
                        $pass.value = '';
                    } else {
                        $.cookie('username', $($username).val(), { expires: 7 });
                        location.href = "index1.html";
                    }
                })
            })
        }
    }
})