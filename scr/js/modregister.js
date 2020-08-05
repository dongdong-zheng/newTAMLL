define([], function() {
    return {
        modfn: function() {
            const $unsrname = $('#name');
            const $pass = $('#password');
            const $repass = $('#repass');
            const $email = $('#email');
            const $span = $('.one');
            const $span2 = $('.two');
            const $span3 = $('.three');
            const $span4 = $('.four');
            const $from1 = $('.from');
            var $usernameflag = true;
            var $passflag = true;
            var $repassflag = true;
            var $emailflag = true;

            //1.获取用户名给后端
            $unsrname.on('blur', function() {
                if ($unsrname.value !== '') {
                    let strlen = this.value.replace(/[\u4e00-\u9fa5]/g, '**').length;
                    let reg = /^[a-zA-Z\u4e00-\u9fa5]+$/g; //正则表达式
                    if (strlen <= 14) {
                        $.ajax({
                            type: 'post',
                            url: 'http://localhost/WWW/TMALL/php/registry.php',
                            data: {
                                name: this.value //将表单的值传给后端。
                            }
                        }).done(function(data) {
                            if (!data) {
                                $span.html('用户名可以使用');
                                $span.css('color', 'green');
                                $usernameflag = true;
                            } else {
                                $span.html('该用户名已经被注册');
                                $span.css('color', 'red');
                                $usernameflag = false;
                            }

                        })
                        if (reg.test(this.value)) {
                            $span.html('用户名可以使用');
                            $span.css('color', 'green');
                            $usernameflag = true;
                        } else {
                            $span.html('格式有误');
                            $span.css('color', 'red');
                            $usernameflag = false;

                        }

                    } else {
                        $span.html('用户名长度有误，最长14个字符或者7个汉字');
                        $span.css('color', 'red');
                        $usernameflag = false;
                    }
                } else {
                    $span.html('用户名不能为空');
                    $span.css('color', 'red');
                    $usernameflag = false;
                }
            });
            $unsrname.on('focus', function() {
                $span.html('');
                $unsrname.val('');
            });
            //2.密码
            $pass.on('focus', function() {
                $span2.html('请输入密码(字母数字特殊字符，6-12之间)');
                $span2.css('color', 'red');
            });
            $pass.on('input', function() {
                if (this.value.length >= 6 && this.value.length <= 12) {
                    let $regnum = /\d+/; //数字 
                    let $reglower = /[a-z]+/; //小写字母 
                    let $regupper = /[A-Z]+/; //大写字母
                    let $other = /[\W\_]+/; //特殊字符
                    let $count = 0; //计数器
                    if ($regnum.test(this.value)) {
                        $count++;
                    }
                    if ($reglower.test(this.value)) {
                        $count++;
                    }
                    if ($regupper.test(this.value)) {
                        $count++;
                    }
                    if ($other.test(this.value)) {
                        $count++;
                    }
                    switch ($count) {
                        case 1:
                            $span2.html('弱');
                            $span2.css('color', 'red');
                            break;
                        case 2:
                        case 3:
                            $span2.html('中');
                            $span2.css('color', 'orange');
                            break;
                        case 4:
                            $span2.html('强');
                            $span2.css('color', 'green');
                            break;
                    }
                } else {
                    $span2.html('密码长度有误，请输入6-12位的密码');
                    $span2.css('color', 'red');
                    $passflag = false;
                };
            });
            $pass.on('blur', function() {
                if (this.value !== '') {
                    $span2.html('密码可以使用');
                    $span2.css('color', 'green');
                    $passflag = true;
                } else {
                    $span2.html('密码不能为空');
                    $span2.css('color', 'red');
                    $passflag = false;
                }
            });
            // 确认密码
            $repass.on('focus', function() {
                $span3.html('请确认密码');
                $span3.css('color', 'red');
            });
            $repass.on('blur', function() {
                    if (this.value !== '') {
                        if ($repass.val() === $pass.val()) {
                            $span3.html('密码正确');
                            $span3.css('color', 'green');
                        } else {
                            $span3.html('密码不正确');
                            $span3.css('color', 'red');
                        }
                    } else {
                        $span3.html('不能为空');
                        $span3.css('color', 'red');
                    }

                })
                // 邮箱
            $email.on('focus', function() {
                $span4.html('请确认邮箱');
                $span4.css('color', 'red');
            });
            $email.on('blur', function() {
                    if ($email.val() !== '') {
                        let reg = /^(\w+[+-.]*\w+)\@(\w+\w+)\.(\w+\w+)$/;
                        if (reg.test(this.value)) {
                            $span4.html('邮箱可以使用');
                            $span4.css('color', 'green');
                            $emailflag = true;
                        } else {
                            $span4.html('邮箱格式有误');
                            $span4.css('color', 'red');
                            $emailflag = false;
                        }
                    } else {
                        $span4.html('邮箱不可以为空');
                        $span4.css('color', 'red');
                        $emailflag = false;
                    }
                })
                // 表单submit提交的事件不是submit发起的，由form表单发起的。
            $from1.on('submit', function() {
                if ($unsrname.val() === '') {
                    $span.html('用户名不能为空');
                    $span.css('color', 'red');
                    $usernameflag = false;
                }
                if ($pass.val() === '') {
                    $span2.html('密码不能为空');
                    $span2.css('color', 'red');
                    $passflag = false;
                }
                if ($repass.val() === '') {
                    $span3.html('密码不能为空');
                    $span3.css('color', 'red');
                    $repassflag = false;
                }
                if ($email.val() === '') {
                    $span4.html('邮箱不可以为空');
                    $span4.css('color', 'red');
                    $emailflag = false;
                }
                console.log($emailflag, $repassflag, $passflag, $usernameflag);
                if (!$emailflag || !$repassflag || !$passflag || !$usernameflag) {
                    return false;
                }
            })
        }
    }
})