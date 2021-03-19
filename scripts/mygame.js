
	function Level(color, limit, add, target, time){
		this.color = color;
		this.limit = limit;
		this.add = add;
		this.target = target;
		this.time = time;
	}


	r = 0;
	g = 0;
	b = 0;
	current_level = 0;
	current_point = 0;
	btonelife = document.getElementById("bt-onelife");
	btscoring = document.getElementById("bt-scoring");
	pagstart = document.getElementById("start");
	pagchange = document.getElementById("change");

	pagemenu = document.getElementById("menu");
	pagtutorial = document.getElementById("tutorial");
	bttutorial = document.getElementById("bt-tutorial");
	
	pagetutoclick = document.getElementById("tuto-click");
	pagetutomode = document.getElementById("tuto-mode");
	
	btnexttuto = document.getElementById("bt-nexttutorial");
	btprevioustuto = document.getElementById("bt-previoustutorial");
	btmenututo1 = document.getElementById("bt-menututorial1");
	btmenututo2 = document.getElementById("bt-menututorial2");
	
	btreturnmenu = document.getElementById("bt-returnmenu");

	levels = [];
	gerateLevels();

	bggame = document.getElementById("bg_game");
	square = document.getElementById("square");
	scoring = document.getElementById("scoring");
	btreturn = document.getElementById("btreturn");
	datagame = document.getElementById("datagame");
	datarecord= document.getElementById("txt-record");

	mode = window.location.search.substr(1);
	if((mode != undefined) && (mode != "")){
		mode = mode.split("=")[1];
		pagstart.style.display = "none";
		startLevel();
	}
  
  
	if( getItem("level") == undefined){
		saveItem("level", 0);
		console.log("init bd");
	}

	if( getItem("points") == undefined){
		saveItem("points", 0);
		console.log("init bd");
	}

	if( !mobileCheck() ){
		pagchange.style.display = "block";
		pagstart.style.display = "none";
	}

	
	btnexttuto.addEventListener("click", function(){	
		pagetutoclick.classList.remove("active");
		pagetutomode.classList.add("active");
	});
	
	btprevioustuto.addEventListener("click", function(){
		pagetutomode.classList.remove("active");
		pagetutoclick.classList.add("active");
	});
	
	
	pagstart.addEventListener("click", function(){
		pagemenu.style.display = "block";	
		pagstart.style.display = "none";	
		document.getElementById("body").requestFullscreen();
		
	});


	btreturnmenu.addEventListener("click", function(){
			
		bggame.classList.add("fadein-page");
		btscoring.src = "assets/bt-scoring.png";
		btonelife.src = "assets/bt-one-life.png";
		setTimeout( function(){
			pagemenu.classList.remove("fadein-page");
			bggame.classList.remove("fadein-page");
			bggame.style.display = "none"; 
			islevel = false;
			pagemenu.style.display = "block";
		}, 50);
		
	});



	btonelife.addEventListener("click", function(){
		btonelife.src = "assets/bt-one-life-over.png";
		pagemenu.classList.add("fadein-page");
		setTimeout( startLevel, 50);
		mode = "onelife";
		current_level = 0;

	});


	btscoring.addEventListener("click", function(){
		btscoring.src = "assets/bt-scoring-over.png";
		pagemenu.classList.add("fadein-page");
		setTimeout( startLevel, 50);
		mode = "scoring";
		current_level = 0;
		current_point = 0;

	});


	bttutorial.addEventListener("click", function(){
		//document.getElementById("body").requestFullscreen();
		
		bttutorial.src = "assets/bt-tutorial-over.png";
		pagemenu.classList.add("fadein-page");
		
		setTimeout( function(){ 
			pagemenu.style.display = "none"; 
			bttutorial.src = "assets/bt-tutorial.png"; 
			pagtutorial.style.display = "block"; 
		}, 50);

	});

	btmenututo1.addEventListener("click", function(){
			
		pagtutorial.classList.add("fadein-page");
		
		setTimeout( function(){
			pagemenu.classList.remove("fadein-page");
			pagtutorial.classList.remove("fadein-page");
			pagtutorial.style.display = "none"; 
			
			pagemenu.style.display = "block";
		}, 50);
		
	});
	
	btmenututo2.addEventListener("click", function(){
			
		pagtutorial.classList.add("fadein-page");
		
		setTimeout( function(){
			pagemenu.classList.remove("fadein-page");
			pagtutorial.classList.remove("fadein-page");
			pagtutorial.style.display = "none"; 
			
			pagemenu.style.display = "block";
		}, 50);
		
	});

	function gerateLevels(){
					
		min_target = 50;
		
		min_target += parseInt(current_level / 10) * 5;
		
		add =  [ Math.random(), Math.random(), Math.random() ];
			
		factor = 55 + Math.random() * 200;
		
		color =  [ add[0] * factor , add[1] * factor, add[2] * factor];
		limit = [ add[0] * 255 , add[1] * 255, add[2] * 255];
		
		time = 10 - parseInt(current_level / 10);
		
		//color, limit, add, target, time
		levels.push( new Level(color, limit, add, min_target, time) );
	

	}
	function changeColor(){
		
		preload = false;
		
		r+=levels[current_level].add[0];
		g+=levels[current_level].add[1];
		b+=levels[current_level].add[2];
		
		r=r>255?255:r;
		g=g>255?255:g;
		b=b>255?255:b;
		
		if((r>levels[current_level].limit[0]) || (g>levels[current_level].limit[1]) || (b>levels[current_level].limit[2]))
			restartLevel();
		
		bggame.style.backgroundColor = "rgb("+r+","+g+","+b+")";
		if(islevel)
			changetimeout = setTimeout( changeColor, 10 );
			
	};

  
	function pickColor(){
		if(preload)
		  return;
		  
		islevel = false;
		sum = 100 - Math.abs(  ( r - levels[current_level].color[0]) + (g - levels[current_level].color[1]) + (b - levels[current_level].color[2]) );
		scoring.style.display = "block";
		scoring.innerHTML =   parseInt( sum )   + " pts" ;	
		square.style.display = "none";
		
		if(mode == "scoring"){
			current_point += sum;
			
					 
			 if( parseInt( getItem("points") ) < current_point ){
				saveItem("points", current_point);
			 
			 }
			 
			 if(current_point < 0){
				btreturn.style.display = "block";
				current_point = 0;
				current_level = 0;
				setTimeout( startLevel, 1000 );
			 }else{
				btwin.style.display = "block";
				setTimeout( nextLevel, 1000 );
			
			 }
		
		}else{
			if(sum >= levels[current_level].target ){
				 btwin.style.display = "block";
				 setTimeout( nextLevel, 1000 );
				 
				 if( parseInt( getItem("level") ) <  current_level+1 ){
					saveItem("level", current_level+1);
				 }
			 
			}else{
				btreturn.style.display = "block";
			}
			
			
		}
			
	}


	function showAds(){
		window.location = "ads.html?mode="+mode;
	}


	function startLevel(){

		r = 0;
		g = 0;
		b = 0;
		
		console.log("starting");
		
		if(mode == "onelife"){
			datagame.innerHTML = "level "+ ( parseInt( current_level ) +1);
			datarecord.innerHTML = getItem("level");
		}else{
			datagame.innerHTML = parseInt( current_point ) + " points";
			datarecord.innerHTML = getItem("points");
		}

		btreturn.style.display = "none";
		scoring.style.display = "none";
		square.style.display = "block";
		btwin.style.display = "none";
		
		pagemenu.style.display = "none";
		bggame.style.display = "block";
		
		bggame.style.backgroundColor = "rgb("+levels[current_level].color[0]+","+levels[current_level].color[1]+","+levels[current_level].color[2]+")"; 
		square.style.backgroundColor = "rgb("+levels[current_level].color[0]+","+levels[current_level].color[1]+","+levels[current_level].color[2]+")"; 
		
		if(mode == "onelife")
			square.innerHTML = levels[current_level].target;
		else
			square.innerHTML = "?";
		
		
		changetimeout = setTimeout( changeColor, 1000 );
		islevel = true;	 
		preload = true;
	}

	function restartLevel(){
		r = 0;
		g = 0;
		b = 0;
	}


	function nextLevel(){
		gerateLevels();
		
		if(current_level < levels.length)
			current_level++;
			
		startLevel();
	}

	btreturn.addEventListener("click", function(){
		current_level = 0;
		current_point = 0;
		
		startLevel();
		//showAds();
	});

	square.addEventListener("click", pickColor, false);
 