/**
 * Created by Administrator on 2015/3/17.
 */
var conn = require('./mysql_conn');

function Product(product) {
    this.pname = product.pname;
    this.price = product.price;
    this.add_time = product.addTime;
}
module.exports = Product;
Product.prototype.save = function(callback) {
    conn.query("insert into aihuishou (pname,price,add_time) values (?,?,?)",[this.pname,this.price,this.add_time],
    function(err,result) {
        if (err) throw err;
    })
}

