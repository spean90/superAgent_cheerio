var express = require('express');
var superagent = require('superagent');
var cheerio = require('cheerio');
var ProductInfo = require('./modal/productInfo')

var app = express();

//app.get('/',function(req,res,next) {
//    superagent.get('https://cnodejs.org/')
//        .end(function(err,sres) {
//            if(err){
//                return next(err);
//            }
//            // sres.text 里面存储着网页的 html 内容，将它传给 cheerio.load 之后
//            // 就可以得到一个实现了 jquery 接口的变量，我们习惯性地将它命名为 `$`
//            // 剩下就都是 jquery 的内容了
//            var $ = cheerio.load(sres.text);
//            var items = [];
//            $('#topic_list .topic_title').each(function (idx, element) {
//                var $element = $(element);
//                items.push({
//                    title: $element.attr('title'),
//                    href: $element.attr('href')
//                });
//            });
//
//            res.send(items);
//        })
//})

//app.get('/',function(req,res,next) {
//    superagent.get('http://www.aihuishou.com/')
//        .end(function(err,sres) {
//            if(err){
//                return next(err);
//            }
//            // sres.text 里面存储着网页的 html 内容，将它传给 cheerio.load 之后
//            // 就可以得到一个实现了 jquery 接口的变量，我们习惯性地将它命名为 `$`
//            // 剩下就都是 jquery 的内容了
//            var $ = cheerio.load(sres.text);
//            var items = [];
//            $('.product_desc').each(function (idx, element) {
//                var $element = $(element);
//                var children =  $element.find("a").get(0);
//                var price = $element.find("div.product_price").get(0);
//                var item = {};
//                item.title = $(children).attr('title');
//                item.price = $(price).text();
//                items.push(item);
//            });
//
//            res.send(items);
//        })
//})
app.get('/',function(req,res,next) {

    for(var i=1;i<=56;i++){
        superagent.get('http://www.aihuishou.com/product/search?cid=1&bid=0&keyword=&pageIndex='+i)
            .end(function(err,sres) {
                if(err){
                    return next(err);
                }
                // sres.text 里面存储着网页的 html 内容，将它传给 cheerio.load 之后
                // 就可以得到一个实现了 jquery 接口的变量，我们习惯性地将它命名为 `$`
                // 剩下就都是 jquery 的内容了
                var $ = cheerio.load(sres.text);
                var items = [];
                console.log($('ul.products>li>a').length);
                $('ul.products>li>a').each(function (idx, element) {
                    items.push({
                        href : $(element).attr('href')
                    });
                });

                items.forEach(function(e,id) {
                    console.log(e.href);
                    superagent.get('http://www.aihuishou.com'+ e.href).end(function(err,sres) {
                        if(err){
                            return next(err);
                        }
                        var $ = cheerio.load(sres.text);
                        var pid = $('.product_name');
                        var li = $('div.right>ul>li').get(1);
                        console.log(pid.text()+" : "+$(li).find('div').text());
                        var pro = {
                            pname : pid.text(),
                            price : $(li).find('div').text(),
                            addTime : new Date()
                        }
                        new ProductInfo(pro).save(function(){});
                    });
                });

            })
    }
 res.send("ok");
})
module.exports = app;

