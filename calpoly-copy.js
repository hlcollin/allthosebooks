
var imagesPerLoad = 12;

//runs at page load 
$(document).ready (function() {
	//createSlides();
	$('#load-more-btn').click(function() {
		//loadImages();
	});
});

function createSlides() {
	
	var slideNum = $(".single_image_container").length;
	$.getJSON("images.json", function(data) {
		$.each(data, function(key, value){
			createMySlidesDiv(value);
			slideNum++;
			var image = createSingleImageContainerDiv(value, slideNum);	
			if(slideNum<=imagesPerLoad)loadImage(image);
		});
		if(slideNum<=imagesPerLoad) {
			$('#load-more-btn').hide();
		}
	});
}

/*Create all html content for the images based on a json file :) */
function createMySlidesDiv(value) {

	var html = '';
	html += "<div class='mySlides'>";
	html += "<div class='numbertext'></div>";
	html += "<img src='cropped/" + value.image + "' >";
	html += "<div class='image_info'>";
	html += "<table>";
	html += "<h1>&ldquo;" + value.title.toUpperCase() + "&rdquo;</h1>";
	html += "<tr>";
	html += "<td><span class='display'>year&#58;</span></td>";
	html += "<td><span class='details'>" + value.year + "</span></td>";
	html += "</tr>";
	html += "<tr>";
	html += "<td><span class='display'>book&#58;</span></td>";
	html += "<td><span class='details'>" + value.book + "</span></td>";
	html += "</tr>";
	html += "<tr>";
	html += "<td><span class='display'>page&#58;</span></td>";
	html += "<td><span class='details'>" + value.page + "</span></td>";
	html += "</tr>";
	html += "<tr>";
	html += "<td><span class='display'>region&#58;</span></td>";
	html += "<td><span class='details'>" + value.region + "</span></td>";
	html += "</tr>";
	html += "<tr>";
	html += "<td><span class='display'>topic&#58;</span></td>";
	html += "<td><span class='details'>" + value.topic + "</span></td>";
	html += "</tr>";
	html += "<tr>";
	html += "<td><span class='display'>type&#58;</span></td>";
	html += "<td><span class='details'>" + value.type + "</span></td>";
	html += "</tr>";
	html += "<tr>";
	html += "<td><span class='display'>notes&#58;</span></td>";
	html += "<td valign='bottom'><span class='details notes'>" + value.notes + "</span></td>";
	html += "</tr>";
	html += "<tr>";
	html += "<td></td>";
	html += "<td><span class='timeline_link'><a href='#timeline' target='_blank'>see where it lands in history <i class='fa fa-chevron-right' aria-hidden='true'></i></a></span></td>";
	html += "</tr>";
	html += "</table>";
	html += "</div>";
	html += "</div>";

	$('#light-box').append(html);
}

function createSingleImageContainerDiv(value, slideNum) {

	var container = $("<div class='single_image_container' style='display: none;' ></div>");
	var image = $("<img alt='"+value.title +"' class='single_image' style='width:100% height:100%' data-src='preview/"+value.image+"'>");
	container.html(image);
	var html = "<div class='overlay'>";
	html += "<div class='text'>";
	html += "<p>";
	html += "<a class='single_image_text' onclick='openModal();currentSlide(" + slideNum + ")' href='#instagram.html'><svg class='svg-inline--fa fa-ellipsis-h fa-w-16' aria-hidden='true' data-prefix='fas' data-icon='ellipsis-h' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' data-fa-i2svg=''><path fill='currentColor' d='M328 256c0 39.8-32.2 72-72 72s-72-32.2-72-72 32.2-72 72-72 72 32.2 72 72zm104-72c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72zm-352 0c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72z'></path></svg><!-- <i class='fas fa-ellipsis-h'></i> --></a>";
	html += "</p>";
	html += "</div>";
	html += "</div>";
	container.append(html);
	
	//alert($(image).attr('alt'));
	
	$('#load-more-btn').before(container);
	return image;
}

function loadImages() {
	
	var imagesLoaded=0;
	$('#pictures_panel').find('.single_image[data-src]').each(function() {
		imagesLoaded++;
		if(imagesLoaded>imagesPerLoad) return false;
		var img = this;
		loadImage(img);
	});
	if(imagesLoaded<=imagesPerLoad) {
		$('#load-more-btn').hide();
	}
}

function loadImage(image) {
	
	var container = $(image).parent();
	$(image).attr('src', $(image).attr('data-src'));
	$(image).removeAttr('data-src');
	$(container).show();
}

/*this code is really janky but it basically makes the subheader (nav bar) hidden when the lightbox is open or when the user hasn't scrolled far enough down the page*/
(function($) {          
	$(document).ready(function(){                    
		$(window).scroll(function(){                          
			if (($(this).scrollTop() > 650) && ($('#myModal').css('display') == 'none')) {
				$('#subheader').fadeIn(50);
			} else {
				$('#subheader').fadeOut(50);
			}
		});
		$(window).click(function(){                          
			if (($(this).scrollTop() > 650) && ($('#myModal').css('display') == 'none')) {
				$('#subheader').fadeIn(50);
			} else {
				$('#subheader').fadeOut(50);
			}
		}); 
	});
})(jQuery);

//Used when adding new slides dynamically (need to know number for event :)
function getNewSlideNum() {
	var slides = document.getElementsByClassName("mySlides");
	return slides.length;
}







/*if (condition1) {
    block of code to be executed if condition1 is true
} else if (condition2) {
    block of code to be executed if the condition1 is false and condition2 is true
} else {
    block of code to be executed if the condition1 is false and condition2 is false
}*/


//*****************************************************************************************************************************************************

//accoridon panels
var acc = document.getElementsByClassName("accordion");
var i;


for (i = 0; i < acc.length; i++) {
	acc[i].addEventListener("click", function() {
		/* Toggle between adding and removing the "active" class,
        to highlight the button that controls the panel */
		this.classList.toggle("active");

		/* Toggle between hiding and showing the active panel */
		var panel = this.nextElementSibling; /*we are creating a variable called panel that represents the sibling of whatever you just clicked*/

		if (panel.style.display === "none") {
			panel.style.display = "flex";
		} else if (panel.style.display == "flex") {
			panel.style.display = "none";
		} else  {
			panel.style.display = "flex";
		}
	});
}

//lightbox functionality

function openModal() {
	document.getElementById('myModal').style.display = "block";
}

function closeModal() {
	document.getElementById('myModal').style.display = "none";
}

var slideIndex = 1;
//showSlides(slideIndex);

function plusSlides(n) {
	showSlides(slideIndex += n);
}

function currentSlide(n) {
	showSlides(slideIndex = n);
}

function showSlides(n) {
	
	var i;
	var slides = document.getElementsByClassName("mySlides");
	var captionText = document.getElementById("caption");
	if (n > slides.length) {slideIndex = 1}
	if (n < 1) {slideIndex = slides.length}
	for (i = 0; i < slides.length; i++) {
		slides[i].style.display = "none";
	}

	slides[slideIndex-1].style.display = "block";
	
	//Display 1/24 slides etc
	var slide = slides[slideIndex-1];
	var slideNum = slideIndex;
	var html =slideNum + " / " + slides.length;
	
	$(slide).find('.numbertext').html(html);
	
	//dots[slideIndex-1].className += " active";
	//captionText.innerHTML = dots[slideIndex-1].alt;
}


