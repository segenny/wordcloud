// Word cloud layout by Jason Davies, http://www.jasondavies.com/word-cloud/
// Algorithm due to Jonathan Feinberg, http://static.mrfeinberg.com/bv_ch03.pdf

var emotion = ["긍정", "부정", "기타", "화남"];

var frequency_list = [];

for ( i = 0; i < 100 ; i++ ) {
	
	frequency_list.push ({
			"text"		:words[randomRange(0, words.length-1)],
			"emotion"	:"긍정",//"emotion[randomRange(0, emotion.length-1)]",
			"size"		:randomRange(0, 40),
			"color"       :function(size){
				 var color = d3.scale.linear()
							.domain([40,0])
							.range(colorbrewer.Oranges[3]);
				return color(size);
			}
		}
	)
}

for ( i = 0; i < 100 ; i++ ) {
	frequency_list.push ({
			"text"		:words[randomRange(0, words.length-1)],
			"emotion"	:"부정",//"emotion[randomRange(0, emotion.length-1)]",
			"size"		:randomRange(10, 40),
			"color"     :function(size){
				 var color = d3.scale.linear()
							.domain([40, 10])
							.range(colorbrewer.Blues[3]);
				return color(size);
			}
		}
	)
}

for ( i = 0; i < 100 ; i++ ) {
	frequency_list.push ({
			"text"		:words[randomRange(0, words.length-1)],
			"emotion"	:"화남",//"emotion[randomRange(0, emotion.length-1)]",
			"size"		:randomRange(10, 30),
			"color"     :function(size){
				 var color = d3.scale.linear()
							.domain([30, 10])
							.range(["#FF1000", "#FFFF00"]);
				return color(size);
			}
		}
	)
}

for ( i = 0; i < 5 ; i++ ) {
	frequency_list.push ({
			"text"		:words[randomRange(0, words.length-1)],
			"emotion"	:"기타",//"emotion[randomRange(0, emotion.length-1)]",
			"size"		:randomRange(60, 100),
			"color"     :function(size){
				 var color = d3.scale.linear()
							.domain([100, 60])
							.range(["#ed3636", "#f9aeae"]);
				return color(size);
			}
		}
	)
}

	
var color1 = d3.scale.linear()
							.domain([10,0])
							.range(["#FF0000", "#F00000"]);	


/*var color = d3.scale.linear()
		.domain([100, 0])
		.range(colorbrewer.Reds[3]);
*/
var contentElement = document.getElementById("wordSpace");

var screen_w = contentElement.offsetWidth;
var screen_h = contentElement.offsetHeight;

d3.layout.cloud().size([screen_w, screen_h])
		.timeInterval(10)
		.words(frequency_list)
		//.rotate(return ~~(Math.random() * 2) * 90)
		.rotate(0)
		//.rotate(function() { return ~~(Math.random() * 2) * 90; })
		.padding(3)
		.font('monospace')
		.fontSize(function(d) { return d.size; })
		.spiral("archimedean")
		//.spiral("rectangular") 
		.on("end", draw)

		.start();

function draw(words) {
	d3.select("#wordSpace").append("svg")
			.attr("width", screen_w) 
			.attr("height", screen_h)
			.attr("class", "wordcloud")
			.append("g")
			//.attr("transform", "translate(944,529)")
			// without the transform, words words would get cutoff to the left and top, they would appear outside of the SVG area
			.attr("transform", "translate("+Math.floor(screen_w/2)+","+Math.floor(screen_h/2)+")")
			.selectAll("text")
			.data(words)
			.enter().append("text")
			.attr("text-anchor", "middle")
			.attr('opacity', function(d) { return 1; })
			.style("font-family", function(d) { return "Impact"; }) 
			.style("fill", function(d, i) { return d.color(d.size); })
			
			.attr("transform", function(d) {
				return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
			})
			.on("mouseover", function(d){ 
				d3.select(this).transition().duration(500).ease("elastic")
					.style("font-size", (d.size+30)+"px") 
					.style("stroke","white") 
					.style("stroke-width", "5px") 
					.style("stroke-opacity", "0.8")
					.style("cursor", "pointer")
			})
			.on("mouseout", function(d){ 
				d3.select(this).transition().duration(500).ease("elastic")
					.style("font-size", (d.size)+"px") 
					.style("stroke","white") 
					.style("stroke-width", "0px") 
					.style("stroke-opacity", "0.8") 
			})
			.transition()
			.duration(500)
			.style("font-size", function(d) { return d.size+ "px"; })
	//.on("mouseover", function(d){ d3.select(this).transition().style("font-size","30px") })
	//		.on("mouseout", function(d){ d3.select(this).transition().style("font-size","scale(1)") })
			.text(function(d) { if ( d.emotion==="화남" ){ return "*"+d.text;} else return d.text; })
			
			;
	
	
}
function randomRange(n1, n2) {
  return Math.floor( (Math.random() * (n2 - n1 + 1)) + n1 );
}
