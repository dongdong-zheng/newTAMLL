require.config({
    paths: {
        'jquery': 'https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.min',
        'lazyload': 'https://cdn.bootcdn.net/ajax/libs/jquery.lazyload/1.9.1/jquery.lazyload.min',
        'pagination': './jquery.pagination',
        'jqcookie': 'https://cdn.bootcdn.net/ajax/libs/jquery-cookie/1.4.1/jquery.cookie'

    },
    shim: {
        'lazyload': {
            deps: ["jquery"],
            exports: "lazyload"
        },
        'jqcookie': {
            deps: ["jquery"],
            exports: "jqcookie"
        }
    }
});
require(['jquery', 'lazyload', 'jqcookie'], function($) {
    let modname = $('#currentpage').attr('currentmod');
    if (modname) {
        require([modname], function(mode) {
            mode.modfn();

        });
    }
});