	//Made By theflyingmantis
var random_points_number=0;
var random_points_x=[];
var random_points_y=[];
var previous_net=[];

function generate_random()
{
	if($('#random_number').val() == ''){
      alert('Enter Random Points First');
   		}
   	else{
	   	document.getElementById('left').innerHTML="";
	   	random_points_number=document.getElementById('random_number').value;

	   	random_points_x=[];
	   	random_points_y=[];
	   	for (var i=0;i<random_points_number;i++)
	   	{
	   		var x=Math.floor((Math.random() * 900) + 1);
	   		var y=Math.floor((Math.random() * 650) + 1);
	   		random_points_x.push(x);
	   		random_points_y.push(y);
	   		mark_point(x,y);
	   	}
   }
}

function reload1()
{
	location.reload();
}

function addbyclick(e)
{
	var x = e.clientX;
    var y = e.clientY;
    random_points_x.push(x);
   	random_points_y.push(y);
   	mark_point(x,y);
}



function showcoordinates(e)
{
	var x = e.clientX;
    var y = e.clientY;
    var coor = "Coordinates: (" + x + "," + y + ")";
    document.getElementById("showcoordinates_html").innerHTML = coor;
}

function clearcoordinates(e)
{
	document.getElementById("showcoordinates_html").innerHTML = "";
}

function add_point()
{
	if($('#input_x').val() == ''||$('#input_y').val() == ''){
      alert('Enter both X and Y value');
   		}
   	var x=document.getElementById('input_x').value;
   	var y=document.getElementById('input_y').value
   	random_points_x.push(x);
   	random_points_y.push(y);
   	mark_point(x,y);
}

function mark_point(x,y)
{
	//console.log(x,y);
	var image = document.createElement("img");
    image.setAttribute("src", "hex_b.gif");
    image.setAttribute("height", "6");
    image.setAttribute("width", "6");
    image.id=String(x)+"$"+String(y);
    image.style.left=x+"px";
    image.style.top=y+"px";
    image.style.position='absolute';
    document.getElementById('left').appendChild(image);
}

function epsilon_net()
{
	if($('#epsilon').val() == ''){
      alert('Enter Epsilon first');
   		}
   	else{
   		if(previous_net.length!=0)
   			clear_net();
		document.getElementById("numberpoints").innerHTML="Total Number of points are : "+String(random_points_y.length);
		console.log(random_points_x);
		console.log(random_points_y);
		console.log("In Epsilon Net");
		var secret="epsilon_net";
		var epsilon1=document.getElementById('epsilon').value;
		//var data1={secret: secret, random_points_x: random_points_x, random_points_y: random_points_y,epsilon:epsilon1};
		$.ajax({
				type:"POST",
				url:"/api",	//Change this URL
				data: JSON.stringify({secret: secret, random_points_x: random_points_x, random_points_y: random_points_y,epsilon:epsilon1}),
				contentType: "application/json; charset=utf-8",
				success: function(answer)
				{		
					var string=answer.epsilon_net;
					var k1=string.split(" ");
					document.getElementById('final_points').innerHTML="Final Number of Points are : "+String(k1.length-1);
					console.log(k1);
					document.getElementById('result').innerHTML="13.4 / Epsilon = "+String(13.4/epsilon1);
					document.getElementById('epsilon_n').innerHTML="Epsilon * n = "+String(epsilon1*(k1.length-1));
					for(var i=0;i<k1.length-1;i++)
					{
						var k=parseInt(k1[i]);
						previous_net.push(k);
						change_color(random_points_x[k],random_points_y[k]);
					}
					
				},
				error: function(err)
				{
					console.log(err);
					alert(err);
					//alert("Error");
				}
			});
		}
}

function change_color(x,y)
{
	
	var id=String(x)+"$"+String(y);
	var k=document.getElementById(id);
	k.src="hex_r.gif";
	k.height=10;
	k.width=10;
}

function clear_net()
{
	document.getElementById('numberpoints').innerHTML="";
	document.getElementById('final_points').innerHTML="";
	document.getElementById('result').innerHTML="";
	document.getElementById('epsilon_n').innerHTML="";
	for(var i=0;i<previous_net.length;i++)
	{
		var x=random_points_x[previous_net[i]];
		var y=random_points_y[previous_net[i]];
		var id=String(x)+"$"+String(y);
		var k=document.getElementById(id);
		k.src="hex_b.gif";
		k.height=6;
		k.width=6;
	}
}