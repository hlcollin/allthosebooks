/**
 * 
 */

var pixelsPerYr = 100;
var timelineItemHeight = 90;
var timelineObjs = [];
var secondsScrolling = 3000;

$(document).ready (function() {
	createTimeline();
	//add click event
	$(document).on( 'click', '.book_link', function(){
		navigateToBookPage();
	} );
	var url = window.location.href;
	if(url.indexOf("?dt=")>-1) {
		var dt = url.substring(url.indexOf("?dt=")+4);
		scrollToDate(dt);
	} 
});

function scrollToDate(id) {
	var p = (parseInt(id) - 1910) * pixelsPerYr;
	$('html, body').animate({
		//scrollTop: $(id).offset().top
		scrollTop: p
	}, secondsScrolling);
}

function showDims(e) {
	var dims = e.offsetWidth + ":" + e.offsetHeight;
	alert(dims);
}

function navigateToBookPage(){
    testwindow = window.open("index.html?a=books", "_self");
}

function createTimeline() {
	var maxDate = 0;
	$.getJSON("timeline.json", function(data) {
		//decard markers first because they do not move
		$.each(data, function(key, value){
			if(value.Type=="Decade Marker") createTimeLineItem(value);
			var dt = parseInt(value.Date);
			//alert(Math.max(dt,maxDate));
			maxDate = Math.max(dt,maxDate);
		});
		//now other timeline items because they move
		$.each(data, function(key, value){
			if(value.Type!="Decade Marker") createTimeLineItem(value);
			var dt = parseInt(value.Date);
			//alert(Math.max(dt,maxDate));
			maxDate = Math.max(dt,maxDate);
		});
		var p = (maxDate - 1910) * pixelsPerYr + 100;
		//resize timeline elements (line and border
		$(".timeline_items").attr('style',  'height:'+ p +'px');
		$(".v1").attr('style','height:'+ p +'px;');
	});
}

function createTimeLineItem(value) {
	
	if(value.Type=='Decade Marker') {
		var p = getTopValue(value);
		var m = $("<p id='" + value.Date + "' class='decade_marker' style='top:" + p + "px;left:320px' >" + value.Date + "</p>");
		$(".timeline_content").append(m);
		timelineObjs.push({top:p, bottom:(p+40), item: value});
	} else if(value.Type=='World Event') {
		var p = getTopValue(value);
		var e = $("<div id='world_event' class='world_event' style='left:277px; top: "+p+"'>");
		var h =$("<p class='event_header'>" + value.Date + "</p>");
		var d = $("<div class='event_details'>");
		$(d).html("<p>"+value.Description+"</p><img src='"+ value.Image + "'>");
		$(e).html(h);
		$(e).append(d);
		$(".timeline_content").append(e);
		timelineObjs.push({top:p, bottom:(p+timelineItemHeight), item: value});
	} else if(value.Type=='GrC Event') {
		var p = getTopValue(value);
		var e = $('<div class="grc_event" style="left: 518px;top:' + p + 'px" >');
        e.append('<p class="event_header">'+value.Date+'</p>');
        var details = $('<div class="event_details">');
        details.html('<img src="'+value.Image+'"><p>'+value.Description+'</p>');
        e.append(details);
        $(".timeline_content").append(e);
        timelineObjs.push({top:p, bottom:(p+timelineItemHeight), item: value});
	} else if(value.Type=='Book') {
		
		var p = getTopValue(value);
		var b = $('<div class="book_marker" style="left:481px;top:' + (p +54) + 'px" ><img src="icons/book_white.svg"></div>');
		var e = $('<div class="book_event" style="left:518px;top:'+ p +'px;" >');
        e.append('<div class="book_orange_line"></div>');
        var a = $('<a class="book_link" href="#"><img class="book_thumbnail" src="'+value.Image+'"></a>');
        e.append(a);
        e.append('<p>' + value.Date + ' - ' + value.Description + '</p>');
        $(".timeline_content").append(b);
        $(".timeline_content").append(e);
	}
}

function getTopValue(value) {
	//determine the top value based on year AND whether an object is in the way
	var p = (parseInt(value.Date) - 1910) * pixelsPerYr;
	//Books and Decades fall where they will
	if(value.Type=="Decade Marker") {
		return p;
	} else if(value.Type=="Book") {
		if((value.Date % 10) == 0) {
			p+= 40;
		}
		return p -75; //line falls in the middle
	} 
	
	//alert(top + ":"+ bottom);
	var scan = true;
	while(scan) {
		var top = p;
		var bottom = p + timelineItemHeight;
		scan = false;
		for(var i=0;i<timelineObjs.length;i++) {
			var obj = timelineObjs[i];
			if(bottom>=obj.top&&top<=obj.bottom) {
				var item = obj.item;
				if(item.Type==value.Type||item.Type=='Decade Marker') {
					//if(value.Date=="1970") alert(value.Description + " moved to " + (obj.bottom));
					p = obj.bottom + 5;
					scan = true;
					break;
				}
			}
		}
	}
	return p;
}