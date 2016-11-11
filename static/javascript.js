	//Made By theflyingmantis
var random_points_number=0;
var random_points_x=[];
var random_points_y=[];

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
		document.getElementById("numberpoints").innerHTML="Number of points are :"+String(random_points_y.length);
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
					document.getElementById('final_points').innerHTML="Final Points are"+String(k1.length);
					for(var i=0;i<k1.length;i++)
					{
						var k=parseInt(k1[i]);
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
	k.height=15;
	k.width=15;
}