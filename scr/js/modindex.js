define(['jquery'], function() {
    return {
        // 顶部悬浮框
        modfn: function() {
            // 顶部悬浮框
            class nav {
                constructor() {
                    this.$nav = $('.nav');
                }
                init() {
                    $(window).on('scroll', () => {
                        if ($(window).scrollTop() >= 500) {
                            this.$nav.stop(true).animate({
                                top: 0
                            });
                        } else {
                            this.$nav.stop(true).animate({
                                top: -50
                            })
                        }
                    });
                }

            }
            new nav().init();


            // const $nav = $('.nav');
            // $(window).on('scroll', function() {
            //     if ($(window).scrollTop() >= 500) {
            //         $nav.stop(true).animate({
            //             top: 0
            //         });
            //     } else {
            //         $nav.stop(true).animate({
            //             top: -50
            //         })
            //     }
            // }); 
            // 回到顶部
            class top {
                constructor() {
                    this.$louti = $('#loutinav');
                    this.$loutili = $('#loutinav li');
                    this.$louceng = $('#main .louti');
                    this.$top = $(window).scrollTop();
                }
                init() {
                    let $index = this;
                    if (this.$top >= 500) {
                        this.$louti.show();
                    } else {
                        this.$louti.hide();
                    }
                    // 滚轮事件
                    $(window).on('scroll', function() {
                        $index.$top = $(window).scrollTop();
                        if ($index.$top >= 500) {
                            $index.$louti.show();
                        } else {
                            $index.$louti.hide();
                        }
                        $index.$louceng.each(function(index, element) {
                            let $topvalue = $(element).offset().top;
                            if ($topvalue >= $index.$top) {
                                $index.$loutili.eq(index).addClass('active').siblings('li').removeClass('active');
                                return false;
                            }
                        })
                    });
                    // 回到顶部
                    $('.last').on('click', function() {
                        $('html,body').animate({
                            scrollTop: 0
                        })
                    });
                    // 点击楼梯
                    this.$loutili.not('.last,.frist').on('click', function() {
                        $($index).addClass('active').siblings('li').removeClass('active');
                        $index.$topvalue = $index.$louceng.eq($(this).index()).offset().top;
                        $('html,body').animate({
                            scrollTop: $index.$topvalue
                        });
                    });
                }
            }
            new top().init();

            class banner {
                constructor() {
                    this.$banner = $('.cont-banner');
                    this.$piclist = $('.cont-banner ul li');
                    this.$btn = $('.cont-banner ol li');
                    this.index = 0; //存储索引
                    this.$timer = null; //定时器
                    this.$autotimer = null; //自动定时器
                }
                init() {
                    let $this = this;
                    this.$btn.on('mouseover', function() {
                        setTimeout(() => {
                            $this.$index = $(this).index();
                            $(this).addClass('active').siblings('li').removeClass('active');
                            $this.$piclist.eq($(this).index()).stop(true).animate({ opacity: 1 }).siblings('li').stop(true).animate({
                                opacity: 0
                            });
                        }, 500);
                    });
                    this.$autotimer = setInterval(() => {
                        this.index++;
                        if (this.index > 6) {
                            this.index = 0;
                        }
                        this.$piclist.eq(this.index).stop(true).animate({ opacity: 1 }).siblings('ul li').stop(true).animate({ opacity: 0 });
                    }, 3000);
                    // 自动播放
                }
            }
            new banner().init();

            class tab {
                constructor() {
                    this.$tabli = $('.tab-ul li');
                    this.$tabdiv = $('.tabdiv-1');
                    this.$cartlist = $('.cartlist');
                    this.$a = $('.tab-ul li a')

                }
                init() {
                    console.log(this.$a);

                    let $this = this;
                    console.log($this.$a);
                    // let $arr = ['#ec0db5', '#0d48ec', '#930dec;', '#ec0d96', '#ec0db5', '#0d48ec', '#930dec;', '#ec0d96', '#ec0db5', '#0d48ec', '#930dec;', '#ec0d96', '#ec0db5', '#0d48ec', '#930dec;', '#ec0d96']
                    this.$tabli.on('mouseover', function() {

                        $this.$cartlist.show(); //内容框出来
                        $this.$tabdiv.eq($(this).index()).show().siblings('.tabdiv-1').hide();
                    });
                    this.$tabli.on('mouseout', function() {
                        $this.$a.removeClass('tab-a');
                        $this.$cartlist.hide();
                    });
                    this.$cartlist.on('mouseover', function() {
                        $this.$cartlist.show();
                    });
                    this.$cartlist.on('mouseout', function() {
                        $this.$cartlist.hide();
                    })
                }
            }
            new tab().init();

            class render {
                constructor() {}
                init() {
                    $.ajax({
                        url: 'http://localhost/WWW/day27_cart/hph/taobaodata.php',
                        dataType: 'json'
                    }).done(function(data) {
                        console.log(data);
                        let $strhtml = '<ul>';
                        $.each(data, function(index, value) {
                            $strhtml +=
                                `<a class="cont-cont-item" href="javascriot:;">
                            <div class="cont-item-box">
                                <div class="cont-item-tag"></div>
                                <img data-original="${value.url}" alt="javascriot:;" class = "lazy" width='185',height ='185'>
                                <div class="cont-item-title">
                                ${value.title}
                                </div>
                                <div class="cont-price">
                                    ${value.price}
                                </div>
                            </div>
                        </a>`;
                        })
                        $strhtml += `</div>`;
                        $('.cont-cont').html($strhtml);
                        //懒加载
                        $(function() {
                            $('img.lazy').lazyload({ effect: "fadeIn" });
                        });

                    });
                }

            }
            new render().init();

            class name {
                constructor() {
                    this.$headerul1 = $('.headerul1');
                    this.$admin = $('.admin');
                    this.$hi = $('.hi');
                    this.$close = $('.admin a');
                }
                init() {
                    let $this = this;
                    console.log($.cookie("username"));
                    if ($.cookie('username')) { //存在
                        this.$headerul1.css('display', 'none');
                        this.$admin.css('display', 'block');
                        this.$hi.html($.cookie('username'));
                    }

                    this.$close.on('click', function() {
                        $this.$headerul1.css('display', 'block');
                        $this.$admin.css('display', 'none');
                        $.cookie('username', null);
                    })
                }
            }
            new name().init();
        }

        // top: function() {
        //     const $louti = $('#loutinav');
        //     const $loutili = $('#loutinav li');
        //     let $louceng = $('#main .louti');
        //     let $top = $(window).scrollTop();
        //     if ($top >= 500) {
        //         $louti.show();
        //     } else {
        //         $louti.hide();
        //     }
        //     // 滚轮事件
        //     $(window).on('scroll', function() {
        //         $top = $(window).scrollTop();
        //         if ($top >= 500) {
        //             $louti.show();
        //         } else {
        //             $louti.hide();
        //         }
        //         $louceng.each(function(index, element) {
        //             let $topvalue = $(element).offset().top;
        //             if ($topvalue >= $top) {
        //                 $loutili.eq(index).addClass('active').siblings('li').removeClass('active');
        //                 return false;
        //             }
        //         })
        //     });
        //     // 回到顶部
        //     $('.last').on('click', function() {
        //         $('html,body').animate({
        //             scrollTop: 0
        //         })
        //     });
        //     // 点击楼梯
        //     $loutili.not('.last,.frist').on('click', function() {
        //         $(this).addClass('active').siblings('li').removeClass('active');
        //         let $topvalue = $louceng.eq($(this).index()).offset().top;
        //         $('html,body').animate({
        //             scrollTop: $topvalue
        //         });
        //     });
        // },
        // banner: function() {
        //     const $banner = $('.cont-banner');
        //     const $piclist = $('.cont-banner ul li');
        //     const $btn = $('.cont-banner ol li');
        //     let index = 0; //存储索引
        //     let $timer = null; //定时器
        //     let $autotimer = null; //自动定时器

        //     //轮播图切换 滑动btn切图
        //     $btn.on('mouseover', function() {
        //         setTimeout(() => {
        //             $index = $(this).index();
        //             $(this).addClass('active').siblings('li').removeClass('active');
        //             $piclist.eq($(this).index()).stop(true).animate({ opacity: 1 }).siblings('li').stop(true).animate({
        //                 opacity: 0
        //             });
        //         }, 500);
        //     });
        //     $autotimer = setInterval(() => {
        //             index++;
        //             if (index > 6) {
        //                 index = 0;
        //             }
        //             $piclist.eq(index).stop(true).animate({ opacity: 1 }).siblings('ul li').stop(true).animate({ opacity: 0 });
        //         }, 3000)
        //         // 自动播放

        // },
        // tab: function() {
        //     const $tabli = $('.tab-ul li');
        //     const $tabdiv = $('.tabdiv-1');
        //     const $cartlist = $('.cartlist');
        //     $tabli.on('mouseover', function() {
        //         $cartlist.show(); //内容框出来
        //         $tabdiv.eq($(this).index()).show().siblings('.tabdiv-1').hide();
        //     });
        //     $tabli.on('mouseout', function() {
        //         $cartlist.hide();
        //     });
        //     $cartlist.on('mouseover', function() {
        //         $cartlist.show();
        //     });
        //     $cartlist.on('mouseout', function() {
        //         $cartlist.hide();
        //     })
        // },
        // render: function() {
        //     $.ajax({
        //         url: 'http://localhost/WWW/day27_cart/hph/taobaodata.php',
        //         dataType: 'json'
        //     }).done(function(data) {
        //         console.log(data);
        //         let $strhtml = '<ul>';
        //         $.each(data, function(index, value) {
        //             $strhtml +=
        //                 `<a class="cont-cont-item" href="javascriot:;">
        //                     <div class="cont-item-box">
        //                         <div class="cont-item-tag"></div>
        //                         <img src="${value.url}" alt="javascriot:;">
        //                         <div class="cont-item-title">
        //                         ${value.title}
        //                         </div>
        //                         <div class="cont-price">
        //                             ${value.price}
        //                         </div>
        //                     </div>
        //                 </a>`;
        //         })
        //         $strhtml += `</div>`;
        //         $('.cont-cont').html($strhtml);
        //     });
        // $ajaxpromise({
        //     url: 'http://localhost/WWW/day27_cart/hph/taobaodata.php'
        // }).then(function(data) {
        //     console.log(JSON.parse(data));
        //     let taobaoarr = JSON.parse(data);
        //     let strhtml = '<ul>'
        //     for (let value of taobaoarr) {
        //         strhtml +=
        //             `<a href="http://localhost/WWW/day27_cart/src/details.html?sid=${value.sid}"target="_blank">
        //                 <li>
        //                     <img src="${value.url}"/>
        //                     <p>${value.title}</p>
        //                     <span>¥${value.price}</span>
        //                     <strong>销量${value.sailnumber}</strong>
        //                 </li>
        //             </a>`
        //     }
        //     strhtml += '</ul>'
        //     goodslist.innerHTML += strhtml;
        // })

    }
})