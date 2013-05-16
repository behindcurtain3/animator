$(document).ready(function() {
	var currentFile = null;
	var selectedAnimation = null;
	var img = new Image();

	$("#animations").change(function() {
		// Called when a new animation is selected from the list
		if(currentFile == null)		
			return;
			
		// Update the frame list
		var index = $(this).val();
		var anim = currentFile.animations[index];
		
		$("#animation-frames").html("");
		for(var i = 0; i < anim.frames.length; i++) {
			var f = anim.frames[i];
			$("#animation-frames").append('<option value=\"' + i + '\">[' + i + '] ' + f.x + ', ' + f.y + ', ' + f.width + ', ' + f.height + '</option>');
		}
		
		// Update the other UI elements	
		// TODO: read loop value
		(anim.state != null) ? $("#animation-state").val(anim.state.value) : $("#animation-state").val("");
		(anim.group != null) ? $("#animation-group").val(anim.group.value) : $("#animation-group").val("");
		(anim.layer != null) ? $("#animation-layer").val(anim.layer.value) : $("#animation-layer").val("");
		(anim.spritesheet != null) ? $("#animation-spritesheet").val(anim.spritesheet.value) : $("#animation-spritesheet").val("");
		(anim.framedelay != null) ? $("#animation-framedelay").val(anim.framedelay.value) : $("#animation-framedelay").val("");
		(anim.origin != null) ? $("#animation-origin").val(anim.origin.value) : $("#animation-origin").val("");
		
		// Set the selected animation
		selectedAnimation = anim;
		
		// Clear the canvas to only show the sprite sheet
		var canvas = $("#display").get(0);
		var ctx = canvas.getContext('2d');
		
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.drawImage(img , 0, 0, img.width, img.height, 0, 0, img.width, img.height);
	});

	$("#animation-frames").change(function() {
		if(selectedAnimation == null)
			return;
			
		var canvas = $("#display").get(0);
		var ctx = canvas.getContext('2d');
		
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.drawImage(img , 0, 0, img.width, img.height, 0, 0, img.width, img.height);
		
		var frame = selectedAnimation.frames[$(this).val()];
		
		ctx.strokeRect(frame.x, frame.y, frame.width, frame.height);
	});
	
	// Setup default img
    img.onload = function(){  
		$('#display').attr('width', img.width);
		$('#display').attr('height', img.height);
		var ctx = $('#display').get(0).getContext('2d');
		ctx.drawImage(img , 0, 0, img.width, img.height, 0, 0, img.width, img.height);
    };  
    img.src = 'default.png'; // Set source path  	
	
	// Setup XML file drop listeners
	$("#xml-drop-area").bind('dragenter dragover dragleave', stopDefault); 
	$("#xml-drop-area").bind('drop', onXmlDrop);
	
	function stopDefault(e) { 
		e.stopPropagation(); 
		e.preventDefault(); 
	} 
	
	function onXmlDrop(e) {
		console.log(e.originalEvent);
	
		e.stopPropagation(); 
		e.preventDefault(); 

		var readFileSize = 0; 
		var files = e.originalEvent.dataTransfer.files;

		var file = files[0]; 
		readFileSize += file.fileSize; 		
		
		var reader = new FileReader(); 
		
		reader.onerror = function(e) { 
			alert('Error code: ' + e.target.error); 
		}; 
		
		reader.onload = (function(aFile) { 
			return function(evt) { 
				var canvas = $('#display').get(0);
				currentFile = new Animations(canvas);
				currentFile.load(evt.target.result);
			} 
		})(file); 

		reader.readAsText(file); 
	}
});

(function() {
	var dropbox = document.getElementById('drop-area'); 

	dropbox.addEventListener('dragenter', stopDefault, false); 
	dropbox.addEventListener('dragover', stopDefault, false); 
	dropbox.addEventListener('dragleave', stopDefault, false); 
	dropbox.addEventListener('drop', onDrop, false); 
	
	function stopDefault(e) { 
	  e.stopPropagation(); 
	  e.preventDefault(); 
	} 


	function onDrop(e) { 
		e.stopPropagation(); 
		e.preventDefault(); 

		var readFileSize = 0; 
		var files = e.dataTransfer.files;

		file = files[0]; 
		readFileSize += file.fileSize; 
		
		var imageType = /image.*/; 

		if (!file.type.match(imageType)) { 
			return; 
		} 


		var reader = new FileReader(); 


		reader.onerror = function(e) { 
			alert('Error code: ' + e.target.error); 
		}; 


		reader.onload = (function(aFile) { 
			return function(evt) { 
				var ctx = $('#display').get(0).getContext('2d');
				var img = new Image();   // Create new img element  
				img.onload = function(){  
					$('#display').attr('width', img.width);
					$('#display').attr('height', img.height);
					ctx.drawImage(img , 0, 0, img.width, img.height, 0, 0, img.width, img.height);
				};  
				img.src = evt.target.result; //'default.png'; // Set source path  	
				//document.getElementById('dropbox').src = evt.target.result; 
			} 
		})(file); 

		reader.readAsDataURL(file); 
	} 
	
})();