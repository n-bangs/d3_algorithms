/* html:
<script src="https://d3js.org/d3.v4.min.js"></script>

<svg></svg>
*/



var s = 'oaljsdlkhtauoernxznvdjfg';
var st = [];
var colors = [];
for (var i = 0; i < s.length; i++){
  st.push(s[i]);
  colors.push('grey');
}

var arr = [];
for (var i = 0; i <= 26; i++) {
  arr.push(0);
}

var svg = d3.select('svg');

svg.attr('height',550).attr('width',550);

svg.selectAll('g')
    .data(arr)
    .enter().append('g')
    .attr('class','bar')
    .attr('transform', function(d,i) {
        return 'translate(' 
               + (i*17 +30) + ',300)';
    })
    .append('rect')
    .attr('height',function(d) { 
          return d*10;
        })
    .attr('width', 8)
    .attr('fill',d3.rgb('#b0c4dc')) // initial bar
    .attr('y',-15);
    
svg.selectAll('g')
    .append('text')
    .attr('fill','steelblue') // left text
      .attr('x', 0)
      .attr('y', 5)
      .attr("dy", ".2em")
      .text(
        function(d,i) {
            if (i != 26) {
              return String.fromCharCode(i + 97);
            }
            else { return '';}
          }
      );

// button stuff

svg.selectAll('.char')
    .data(st)
    .enter()
    .append('g')
    .attr('transform',function(d,i)
      {
        return 'translate(' + (30 + 10*i) + ',50)';
      })
    .attr('class','char')
  .append('text')
    .attr('x',5)
    .attr('y',7)
    .attr('fill','grey')        // top text
    .text( function(d) { return d; });

svg.append('g')
    .attr('transform','translate(0,385)')
    .attr('id','button')
  .append('rect')
    .attr('width',50)
    .attr('height',20)
    .attr('fill','steelblue'); // button
   
button = d3.select('#button');

button.append('text')
      .attr('fill','white')
      .attr('x', 10)
      .attr('y', 25)
      .attr("dy", "-.6em")
      .text('click');
      
var i = 0;      

function orderedBars() {
  sums = [arr[0]]
  for (var i = 1; i < arr.length; i++)   {
    sums.push(arr[i] + sums[i-1])
  } 

  bar = d3.selectAll('.bar')
  bar.select('text')
     .remove();
  bar.transition()
     .duration(750)
     .attr('transform',
      function(d,i) {
        if (i==0) { return 'translate(150,100)';}
        else {
          return 'translate(150,' + 
            ((21*sums[i-1])+100) + ')'; 
      }})
      .select('rect')
      .attr('width', 15)
      .attr('height',function(d) { 
          return d*20;
        });

   var st = [];
   for (var i = 0; i < arr.length; i++) {
    while (arr[i] > 0){
      st.push(String.fromCharCode(i+97))
      arr[i] -= 1
    }
   }

   
  svg.selectAll('.final')
    .data(st)
    .enter()
  .append('g')
    .attr('class','final')
    .attr('transform',function(d,i)
      {
        return 'translate(200,' + (21*i + 100 ) + ')';
      })
    .attr('class','char')
  .append('text')
    //.attr('x',5)
    //.attr('y',7)
    .attr('fill','black') // final text
    .text( function(d) { return d; });
   
   bar.append('text')
      .attr('fill', d3.rgb('#22293b')) // final text
      .attr('x', 4)
      .attr('y', 0)/*function(d) {
        return -3*d;
      }      
      )*/
      .attr('dy','.1em')
      .text(function(d,i) { 
            if (d==0) { return '';} 
            else { 
              return String.fromCharCode(i+97);
            }
          }
        );
  }
  

function go() {

  if (i == s.length) {
    orderedBars();
  }
  if (i > s.length) { return}
  
  ord = s.charCodeAt(i) - 97;
  arr[ord ] += 1;
  
  if (i < s.length) {
      colors[i] = 'red';  // highlited 
   }
  if (i >= 1) {
    colors[i-1] = 'grey';
  }
  
  d3.selectAll('.char').select('text')
    .attr('fill', function(d,i) { return colors[i];
            });
  
  bar = d3.selectAll('.bar')
      .data(arr);
  bar.select('rect')
      .attr('height',function(d) { 
          return d*10;
        })
      .attr('y', function(d) { 
          return -d*10 - 10;
        });
        
  i += 1;
 }

d3.interval( function() { 
                go(); }, 
             700);
