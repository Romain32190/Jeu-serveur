var Ent = function(x,y,type,regime) {
	this.posX = x;
	this.posY = y;
	this.type = type;
	this.regime = regime;
	this.age = 0;

};


Ent.prototype.killMe = function (){
	for(var i =0; i<entArray.length; i++){
		if(this === entArray[i]){
			entArray.splice(i, 1);
		}
	}
};


Ent.prototype.vieillir = function() {
    this.age ++;
           if (this.type == "dragon"){
               if (this.age>=15){
                   this.killMe();
           }
           }else if(this.type == "potager"){
               if (this.age>=30){
                   this.killMe();
               }

           
     
           }

};

function vieillirall(){
    for (var h = 0; h < entArray.length; h++) {
        entArray[h].vieillir();
        
    }

}

Ent.prototype.checkAround = function() {
 //var cellAround = [];
 var Akill = [];
 for(var i = 0; i< entArray.length; i++){
 	if(entArray[i].posX>=this.posX-1 && entArray[i].posX <= this.posX+1){
 		if(entArray[i].posY >= this.posY -1 && entArray[i].posY <= this.posY+1){
 			// console.log(entArray[i]);
 			var typeEnemi = entArray[i].type;
 			if(typeEnemi === this.regime){
 				Akill.push(entArray[i]);
 				// entArray[i].killMe();
 			}

 		}
 	} 
 }

 for(var j = 0; j < Akill.length; j++){
 	Akill[j].killMe();
 }


};


function createHtmlArray(w,h){

	$('#plateau').html('');

		for (var yy = 0; yy < h; yy++) {
		var curlign = '<tr>';
			for (var xx = 0; xx < w; xx++) {
				curlign += '<td class="cell" data-xy="'+xx+'-'+yy+'"></td>';
			}
		curlign += '</tr>';
		$('#plateau').append(curlign);
	}

}

function affiche(){    
	$(".cell").html('');

        for (var i =0; i<entArray.length; i++){


            var curtype = entArray[i].type;
            var curposX = entArray[i].posX;
            var curposY = entArray[i].posY;
            var add = $('.cell' + '[data-xy="'+entArray[i].posX+'-'+entArray[i].posY+'"]');
            $(add).append('<p>'+entArray[i].type+'</p>');
            //console.log(add);

        }

    }

function ajoutDragon(col,lin){    
    var ent= new Ent(Math.floor(Math.random()*col),Math.floor(Math.random()*lin),"dragon","paysan");
    for (var i = 0; i < entArray.length; i++) {
        if(entArray[i].posX == ent.posX && entArray[i].posY == ent.posY){
            if (entArray[i].type == "rocher"){
            	return;
            }
            entArray[i] = ent;
            entArray[i].checkAround();
            return;
            // checkAround();
        }
    }
    entArray.push(ent);
    ent.checkAround();
       
}
function game(){

	    $.ajax({
	        url: "/choice",
	        type: "post",
	        data: {}
	    })
	    .done(function(res) {
	        console.log("post /choice res du server: ", res);

	        switch(res){
	        	case "rocher":
	        		//essayer d'inserer un rocher
	        		ajoutDragon(10,10);

	        		//lololol
	        	break;
	        	case "dragon":
	        		//
	        		ajoutDragon(10,10);
	        	break;
	        	case "paysan":
	        		ajoutDragon(10,10);
	        		//
	        	break;
	        	case "potager":
	        		ajoutDragon(10,10);
	        	break;
	        	// default:
	        	// 	//couille dans le potage
	        	// break;
	        }
	        		affiche();
	        		vieillirall();
	    });
}



var entArray = [];

$(document).ready(function(){

	
	var rocher = new Ent(1,1,"rocher",null);

	//console.log('test egalité ',rocher === rocher2);

	entArray.push(new Ent(0,0,"paysan","potager"));
	entArray.push(new Ent(1,0,"paysan","potager"));
	entArray.push(new Ent(2,0,"paysan","potager"));
	entArray.push(new Ent(0,1,"paysan","potager"));
	entArray.push(rocher);
	entArray.push(new Ent(1,2,"paysan","potager"));
	entArray.push(new Ent(0,2,"paysan","potager"));
	entArray.push(new Ent(2,1,"paysan","potager"));
	entArray.push(new Ent(2,2,"paysan","potager"));



	createHtmlArray(10,10);
	affiche();
	setInterval(function(){
		game();},500);
	// /game();
	//rocher.checkAround();


});