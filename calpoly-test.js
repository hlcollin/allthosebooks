var imagesPerLoad = 10;
//runs at page load 
$(document).ready (function() {
	createHtml();
	loadImages();
});

$('#load-more-btn').click(function() {
	loadImages();
} );

/*Create all html content for the images based on a json file :) */
function createHtml() {
	
	 $.getJSON("images.json", function(data) {
        $.each(data, function(key, value){
			 var html = '';
            html += "<div class='mySlides'>";
			html += "<div class='numbertext'>1 / 69</div>";
			html += "<img data-src='cropped/" + value.image + ".jpg' >";
			alert(html);
			/*<div class='image_info'>
			<table>
			<h1>“UNKOWN”</h1>
			<tr>
			<td><span class='display'>year:</span></td>
			<td><span class='details'>1966</span></td>
			</tr>
			<tr>
			<td><span class='display'>book:</span></td>
			<td><span class='details'><a href='#books'>Polygraph Jahrbuch, Vol. 4</a></span></td>
			</tr>
			<tr>
			<td><span class='display'>page:</span></td>
			<td><span class='details'>UNKNOWN</span></td>
			</tr>
			<tr>
			<td><span class='display'>region:</span></td>
			<td><span class='details'>Germany</span></td>
			</tr>
			<tr>
			<td><span class='display'>topic:</span></td>
			<td><span class='details'>“UNKNOWN”</span></td>
			</tr>
			<tr>
			<td><span class='display'>type:</span></td>
			<td><span class='details'>UNKNOWN</span></td>
			</tr>
			<tr>
			<td><span class='display'>notes:</span></td>
			<td><span class='details'>“UNKNOWN”</span></td>
			</tr>
			<tr>
			<td></td>
			<td><span class='timeline_link'><a href='#timeline' target='_blank'>see where it lands in history <i class='fa fa-chevron-right' aria-hidden='true'></i></a></span></td>
			</tr>
			</table>
			</div>
			</div> */
			$('#light-box').append(html);
        });
    //$('#light-box').html(html);
    });
}

function loadImages() {
	var imagesLoaded=0;
	$('.single_image[data-src]').each(function() {
		imagesLoaded++;
		if(imagesLoaded>imagesPerLoad) return false;
		var img = $(this);
		img.setAttribute('src', img.getAttribute('data-src'));
		img.onload = function() {
			img.removeAttribute('data-src');
		};
	});
}

