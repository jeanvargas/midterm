$(window).ready(function(){
	
   // var audio = $("#audio1");
    var audio = document.getElementById('audio1');
   // audio.play();
    var ctx = new AudioContext();
    var analyser = ctx.createAnalyser();
   // console.log("audio: " + audio.currentSrc + " ready state: " + audio.readyState);
    var audioSource = ctx.createMediaElementSource(audio);
    audioSource.connect(analyser);
    audioSource.connect(ctx.destination);
    
    var frequencyData = new Uint8Array(analyser.frequencyBinCount);
    /* I did not know what a "Uint8Array" was. It's actually an array of 8-bit integers
    Read more here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array
    */
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    
    function renderFrame() {
      //  requestAnimationFrame(renderFrame);
        analyser.getByteFrequencyData(frequencyData);
     //   console.log(frequencyData); // now you can read the frequency data!
        console.log("length: " + frequencyData.length);
       /* for(bin = 0; bin < frequencyData.length; bin++) {
            var val = frequencyData[bin];
            //            var val = 100

            var red = 255-val;
            var green = val/2;
            var blue = val;
            context.fillStyle = 'rgb('+red+', '+green+', '+blue+')';
            console.log(red+ " " + green + " " + blue);
           // context.fillRect(bin * 2,0,2,200);
          //  context.fillRect(0,10,1000,10);
         //   context.fillRect(bin * 2, 0, bin, 10);
              context.fillRect(bin*2, 0, bin, 10);


        }*/
        var barx, barwidth, barheight;
        context.fillStyle = '#00CCFF';
        bars = 100;
        for(var i = 0; i < bars; i++) {
            barx = i * 3;
            barwidth = 2;
            barheight = (frequencyData[i]/2);
            context.fillRect(barx, canvas.height, barwidth, barheight);
        }
        requestAnimationFrame(renderFrame);
    }
      
    window.addEventListener('resize', resizeCanvas, false);
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight*.1;
        audio.play();
        renderFrame();
    }
    
    resizeCanvas();
  //  audio.play();
 //   renderFrame();
 //   draw();
});

