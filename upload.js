/**
 * 
 */
$(document).ready (function() {
	$('#file').change(function(){
		$('#image').val($(this).val());
	});
	$('.single_image_text').click(function(){
		navigateToBookPage();
	} );
	
	//form validation **************************************
	
	//max characters
	$('#title').attr('maxLength',30);
	$('#book').attr('maxLength',70);
	$('#year').attr('maxLength',4);
	$('#page').attr('maxLength',4);
	$('#topic').attr('maxLength',70);
    $('#type').attr('maxLength',70);
	$('#notes').attr('maxLength',1300);
	
	
	//no crazy characters in title
	$('#title').keypress(function( e ) {  
	    if(!/[0-9 a-zA-Z-,.!:;?//&@#%^*()+=]/.test(String.fromCharCode(e.which)))
	    	return false;
	});
	
	//numbers only please
	$('#year, #page').keypress(function( e ) {  
	    if(!/[0-9]/.test(String.fromCharCode(e.which))) {
	    	alert("Numbers only, please :)");
	    	return false;
	    }
	});
	
	//No missing image, blank required fields, provide defaults
	$('#submit').on('click', function(event) {
		var ok = true;
		var title = $('#title');
		if(!title.val()) {
			title.val("Untitled");
		}
		if(!$('#image').val()) {
			var file = $('#file');
			file.addClass('error');
			ok = false;
		} 
		//all other required fields
		$('.required').each(function(){
			var f = $(this);
			if(!f.val()) {
				f.addClass('error');
				ok = false;
			} 
		});
		if(!ok) 
			event.preventDefault(); 
	});
	
	//remove error
	$('.required').on('input', function(){
		if($(this).val()) {
			$(this).removeClass('error');
		} 
	});
	$('#file').click(function(){
		$('#file').removeClass('error');
	})
	
});

function navigateToBookPage(){
    testwindow = window.open("index.html?a=pictures", "_self");
}