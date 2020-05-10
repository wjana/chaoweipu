var models = require('../db')
var express = require('express')
var router = express.Router()
var mysql = require('mysql')
var $sql = require('../sqlMap')

// 连接数据库
var conn = mysql.createConnection(models.mysql);

conn.connect();

var jsonWrite = function (res, ret) {
  if(typeof ret === 'undefined') {
    res.json({
      code: '1',
      msg: '操作失败'
    })
  }else {
    res.json(ret)
  }
};

router.post('/searchUid', (req, res) => {
	var sql = $sql.collection.searchUid;
	var params = req.body;
	conn.query(sql, [params.uid, params.cid], function (err, result) {
	    if (err) {
	      console.log(err)
	    }
	    if(result[0]===undefined) {
	    	res.send('-1')    //查询不出cid，data返回-1
	    }else {
	    	jsonWrite(res, result);
		}
	})
});

router.post('/add', (req, res) => {
  var sql = $sql.collection.add;
  var params = req.body;
  conn.query(sql, [params.uid, params.cid], function(err, result) {
    if(err) {
      	console.log(err);
    }
    if(result) {
      	jsonWrite(res, result);
    }
  }) 
});

//取消收藏
router.post('/delete', (req, res) => {
	var sql = $sql.collection.delete;
	var params = req.body;
	conn.query(sql, [params.uid, params.cid], function (err, result) {
		if (err) {
		  console.log(err);
		}
		if (result) {
		  jsonWrite(res, result);
		}
	})
});

router.post('/collectCount', (req, res) => {
	var sqlId = $sql.collection.collectCount;
	var params = req.body;
	conn.query(sqlId, params.uid, function (err, result) {
	    if (err) {
	      console.log(err)
	    }
	    if(result[0]===undefined) {
	    	res.send('-1')    //查询不出，data返回-1
	    }else {
	    	jsonWrite(res, result);
		}
	})
});

router.post('/search', (req, res) => {
	var sql = $sql.collection.search;
	var params = req.body;
	conn.query(sql, [params.uid], function (err, result) {
	    if (err) {
	      console.log(err)
	    }
	    if(result[0]===undefined) {
	    	res.send('-1')    //查询不出cid，data返回-1
	    }else {
	    	jsonWrite(res, result);
		}
	})
});

module.exports = router;