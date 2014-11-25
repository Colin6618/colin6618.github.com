// require(['node'], function ($) {
//     // 查找 DOM 节点.
//     var oneElementById     = $('#foo'),
//         oneElementByName   = $('body'),
//         allElementsByClass = $('.bar');

//     // 创建 DOM 节点.
//     var contentNode$ = $('<div>'),
//         listNode    = $('<ul>'),
//         footerNode  = $('<footer>');

//     // 操作节点，支持链式调用
//     contentNode$.html('Hello Kissy!')
//                 .append('<p>touch me</p>')
//                 .addClass('highlight')
//                 .appendTo('body');
//     contentNode$.html('Hello Kissy!')
//                 .append('<p>touch me</p>')
//                 .addClass('highlight')
//                 .appendTo('body');
//     contentNode$.append('<button id="#close-button">close</button>');
//                 // .appendTo('body');
//     // 绑定事件
//     $('#close-button').on('click', function (e) {
//         contentNode$.hide();
//     });
// });