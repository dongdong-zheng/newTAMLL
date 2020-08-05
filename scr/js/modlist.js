define([], function() {
    return {
        modfn: function() {
            require(['jquery.pagination'], function() {
                class render {
                    constructor() {

                    }
                    init() {
                        let array_default = []; //排序前的li数组
                        let array = []; //排序中的数组
                        let prev = null;
                        let next = null;
                        //1.渲染
                        $.ajax({
                            url: 'http://localhost/WWW/TMALL/php/listtaobao.php',
                            dataType: 'json'
                        }).done(function(data) {
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
                                    <div class="cont-sailnumber">销量${value.sailnumber}</div>
                                </div>
                            </a>`;
                            })
                            $strhtml += `</ul>`;
                            $('.cont-cont').html($strhtml);
                            //懒加载
                            $(function() {
                                $('img.lazy').lazyload({ effect: "fadeIn" });
                            });
                            //4.对排序进行赋值。
                            array_default = []; //排序前的li数组-默认排序的数组
                            array = []; //排序中的数组
                            prev = null;
                            next = null;
                            $('.cont-cont a').each(function(index, element) {
                                array[index] = $(this);
                                array_default[index] = $(this);
                            });
                        });
                        //注意问题：渲染的元素在外部是无法获取，通过事件委托实现。

                        //3.分页思路 - 利用插件实现
                        //告知后端当前请求的是第几页数据。将当前的页面页码传递给后端(get和page)
                        $('.page').pagination({
                            pageCount: 3, //总的页数
                            jump: true, //是否开启跳转到指定的页数，布尔值。
                            coping: true, //是否开启首页和尾页，布尔值。
                            prevContent: '上一页',
                            nextContent: '下一页',
                            homePage: '首页',
                            endPage: '尾页',
                            callback: function(api) {
                                console.log(api.getCurrent()); //获取当前的页码
                                $.ajax({
                                    url: 'http://localhost/WWW/TMALL/php/listtaobao.php',
                                    data: { page: api.getCurrent() }, //传仓
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
                                            <div class="cont-sailnumber">销量${value.sailnumber}</div>
                                        </div>
                                    </a>`;
                                    });
                                    $strhtml += '</ul>';
                                    $('.cont-cont').html($strhtml);
                                    //渲染结束。
                                    $(function() {
                                        $('img.lazy').lazyload({ effect: "fadeIn" });
                                    });
                                    //分页后进行对应的赋值和排序。
                                    array_default = []; //排序前的li数组
                                    array = []; //排序中的数组
                                    prev = null;
                                    next = null;

                                    //将页面的li元素加载到两个数组中
                                    $('.cont-cont a').each(function(index, element) {
                                        array[index] = $(this);
                                        array_default[index] = $(this);
                                    });
                                })
                            }
                        });
                        //4.排序
                        //默认排序 -排序的是array_default数组
                        $('.sizer button').eq(0).on('click', function() {
                            $(this).addClass('sizer-price').siblings('button').removeClass('sizer-price');
                            $.each(array_default, function(index, value) { //value就是a标签
                                $('.cont-cont ul').append(value);
                            });
                            return;

                        });
                        //升序排序-array数组
                        $('.sizer button').eq(1).on('click', function() {
                            $(this).addClass('sizer-price').siblings('button').removeClass('sizer-price');
                            for (let i = 0; i < array.length - 1; i++) {
                                for (let $j = 0; $j < array.length - i - 1; $j++) {
                                    console.log($j);
                                    //取出array的价格，销量进行排序
                                    prev = parseFloat(array[$j].find('.cont-price').html());
                                    next = parseFloat(array[$j + 1].find('.cont-price').html());
                                    //通过销量的判断，改变的是li的位置。
                                    if (prev > next) {
                                        let temp = array[$j];
                                        array[$j] = array[$j + 1];
                                        array[$j + 1] = temp;

                                    }
                                }
                            }
                            console.log(array);
                            console.log(array_default);
                            //换完位置进行渲染
                            $.each(array, function(index, value) {
                                $('.cont-cont ul').append(value);
                            });
                        });
                        //降序排序
                        $('.sizer button').eq(2).on('click', function() {
                            $(this).addClass('sizer-price').siblings('button').removeClass('sizer-price');
                            for (let i = 0; i < array.length; i++) {
                                for (let $j = 0; $j < array.length - i - 1; $j++) {
                                    prev = parseFloat(array[$j].find('.cont-price').html());
                                    next = parseFloat(array[$j + 1].find('.cont-price').html());
                                    if (prev < next) {
                                        let temp = array[$j];
                                        array[$j] = array[$j + 1];
                                        array[$j + 1] = temp;
                                    }
                                }
                            }
                            $.each(array, function(index, value) {
                                $('.cont-cont ul').append(value);
                            })
                        })
                    }

                }
                new render().init();
            })

        }
    }
})