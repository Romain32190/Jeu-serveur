var express = require('express');
//var bodyParser = require('body-parser');


var app = express();



app.use(express.static('public'));

app.post('/choice',function (req, res) {
	
    var data= Math.random();
    console.log(data);

    if(data > 0.75){
        res.send("rocher");
    }else if (data > 0.50){
        res.send("dragon");
    }else if (data > 0.25){
        res.send("paysan");
    }else{
        res.send("potager");
    }
});

app.listen(3300, function(){
	console.log('App listening on port 3300');
});




