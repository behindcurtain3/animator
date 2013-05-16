function Animations(canvasElement) {
	// Canvas
	this.canvasElement = canvasElement;
	this.ctx = this.canvasElement.getContext("2d");
	
	// Animations
	this.animations = [];	 
}

Animations.prototype = {
	load: function(file) {
		parser = new DOMParser();
		xmlDoc = parser.parseFromString(file,"text/xml");
		
		var animationNodes = xmlDoc.getElementsByTagName("Animation");		
		this.animations = new Array();
		$("#animations").html("");
		
		for(var i = 0; i < animationNodes.length; i++) {
			var anim = new Animation();
			anim.load(animationNodes[i]);
			this.animations[i] = anim;			
			
			$("#animations").append('<option value=\"' + i + '\">' + anim.state.value + ' [' + anim.group.value + ']</option>');
		}
	}
}

function Animation() {
	this.state = "";
	this.group = "";
	this.loop = false;
	this.spritesheet = "";
	this.layer = 0;
	this.framedelay = 100;
	this.origin = "";	
	this.frames = [];
}

Animation.prototype = {
	load: function(xmlNode) {
		this.state = xmlNode.getAttributeNode("State");
		this.group = xmlNode.getAttributeNode("Group");
		
		var loop = xmlNode.getAttributeNode("Loop").textContent;
		this.loop = (loop == "True") ? true : false;
		this.spritesheet = xmlNode.getAttributeNode("SpriteSheet");
		this.layer = xmlNode.getAttributeNode("Layer");
		this.framedelay = xmlNode.getAttributeNode("FrameDelay");
		this.origin = xmlNode.getAttributeNode("Origin");
		
		var frameNodes = xmlNode.getElementsByTagName("Frame");
		
		this.frames = new Array();
		for(var i = 0; i < frameNodes.length; i++) {
			var frame = new Frame();
			var value = frameNodes[i].textContent;
			var split = value.split(", ");
			
			frame.x = split[0];
			frame.y = split[1];
			frame.width = split[2];
			frame.height = split[3];
			
			this.frames[i] = frame;
		}
	}
}

function Frame() {
	this.x = 0;
	this.y = 0;
	this.width = 32;
	this.height = 32;
}
/*

(function() {

	var animating = 0;
	
	$('#animate').click(function(e) {
		e.preventDefault();
		clearInterval(animating);
		framesX = $('#frames-X').val();
		framesY = $('#frames-Y').val();
		frameWidth = $('#dropbox').width() / framesX;
		frameHeight = $('#dropbox').height() / framesY;
		
		$('#animation-area').css('width', frameWidth + 'px');
		$('#animation-area').css('height', frameHeight + 'px');
		$('#animation-area').css('background-image', 'url(' + $('#dropbox').attr('src') + ')');
		
		bpx = 0;
		bpy = 0;
		
		frames = JSON.parse('{"frames":[' + $('#frames').val() +']}').frames;
		
		count = 0;
		
		if( frames.length > 2 ) {
		
			animating = setInterval(function(){
				
				if( count++ >= frames.length ) count = 0;
				
				bpx = -(frames[count] % framesX) * frameWidth;
				bpy = -((frames[count] / framesX)|0) * frameHeight;

				$('#animation-area').css('background-position', bpx + 'px ' + bpy + 'px' );
			},$('#interval').val());
		} else {
		
			if( frames.length == 2 ) {
				startFrame = frames[0];
				endFrame = frames[1];
			} else if( frames.length < 2 ) {
				startFrame = 0;
				endFrame = framesX * framesY - 1;
			} 

			count = startFrame;
			bpx = -(count % framesX) * frameWidth;
			bpy = -((count / framesX)|0) * frameHeight;	
			
			$('#animation-area').css('background-position', bpx + 'px ' + bpy + 'px' );
			
			animating = setInterval(function(){
				
				if( count++ >= endFrame ) {
					count = startFrame;
				};
				
				bpx = -(count % framesX) * frameWidth;
				bpy = -((count / framesX)|0) * frameHeight;				

				$('#animation-area').css('background-position', bpx + 'px ' + bpy + 'px' );
			},$('#interval').val());

		} 
		
	});

})(); */