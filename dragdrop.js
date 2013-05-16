$(document).ready(function() {
	var ctx = $('#display').get(0).getContext('2d');
	
	var img = new Image();   // Create new img element  
    img.onload = function(){  
		$('#display').attr('width', img.width);
		$('#display').attr('height', img.height);
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
				var animations = new Animations(canvas);
				animations.load(evt.target.result);
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