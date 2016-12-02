// Word cloud layout by Jason Davies, http://www.jasondavies.com/word-cloud/
// Algorithm due to Jonathan Feinberg, http://static.mrfeinberg.com/bv_ch03.pdf

var emotion = ["긍정", "부정", "기타", "화남"];

var frequency_list = [];

for ( i = 0; i < 80 ; i++ ) {
	
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

for ( i = 0; i < 80 ; i++ ) {
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

for ( i = 0; i < 80 ; i++ ) {
	frequency_list.push ({
			"text"		:words[randomRange(0, words.length-1)],
			"emotion"	:"화남",//"emotion[randomRange(0, emotion.length-1)]",
			"size"		:randomRange(10, 30),
			"color"     :function(size){
				 var color = d3.scale.linear()
							.domain([30, 10])
							.range(["#FFFF00", "#FFF000"]);
				return color(size);
			}
		}
	)
}

for ( i = 0; i < 10 ; i++ ) {
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
d3.layout.cloud().size([1100, 800])
		.timeInterval(10)
		.words(frequency_list)
		//.rotate(return ~~(Math.random() * 2) * 90)
		.rotate(function() { return ~~(Math.random() * 2) * 90; })
		.padding(1)
		.font('monospace')
		.fontSize(function(d) { return d.size; })
		.spiral("archimedean")
		.on("end", draw)

		.start();

function draw(words) {
	d3.select("#wordSpace").append("svg")
			.attr("width", 1200) 
			.attr("height", 950)
			.attr("class", "wordcloud")
			.append("g")
			// without the transform, words words would get cutoff to the left and top, they would appear outside of the SVG area
			.attr("transform", "translate(550,400)")
			.selectAll("text")
			.data(words)
			.enter().append("text") 
			.attr("text-anchor", "middle")
			.style("font-family", function(d) { return "Impact"; }) 
			.style("font-size", function(d) { return d.size+ "px"; })
			.style("fill", function(d, i) { return d.color(d.size); }) 
			.transition()
				  .duration(1500)
			.attr("transform", function(d) {
				return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
			})
			.text(function(d) { if ( d.emotion==="화남" ){ return "*"+d.text;} else return d.text; });
}
function randomRange(n1, n2) {
  return Math.floor( (Math.random() * (n2 - n1 + 1)) + n1 );
}
