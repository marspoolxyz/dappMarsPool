document.createElement("article");
document.createElement("footer");
document.createElement("header");
document.createElement("hgroup");
document.createElement("nav");
document.createElement("aside");
document.createElement("section");

$(document).ready(function() {
     $('#navbtn').click(function() {
          $('ul.nav-menu').animate({ height: 'toggle'}, 300);
      });
	  $( function() {
		$( "#datepicker" ).datepicker();
	  } );  
  
	$( function() {
		$( "#datepicker_1" ).datepicker();
	  } );  
	  
	$( function() {
    $( "#progressbar" ).progressbar({
      value: 37
    });
  } );
});

$(document).ready(function() { 
//if ($(window).width() < 740) {
  $('ul.nav-menu').find('ul').parent().append('<span class="menuarrow"></span>');
  $(".menuarrow").click(function () {
		$(this).prev("ul").animate({ height: 'toggle'}, 300);
		//$(this).removeAttr("href");
		//return false;
		if ($(this).parent().hasClass('active')) {
      		$(this).parent().removeClass('active');
   		 } else {
      		$(this).parent().addClass('active');
    	} 
    });
//}
});


$(window).load(function () {
    width1 =  ($(".wrapper").width());
	var windowwith1 = $(window).width(), divWidth=0;
	var getwidth1 = ((windowwith1 - width1) / 2);
	$('.fullpage').css({'marginLeft':(-getwidth1)+'px'});
	$('.fullpage').css({'marginRight':(-getwidth1)+'px'});
	$('.fullpage-content').css({'marginLeft':(-getwidth1)+'px'});
	$('.fullpage-content').css({'marginRight':(-getwidth1)+'px'});
	$('.fullpage-content').css({'paddingLeft':(getwidth1)+'px'});
	$('.fullpage-content').css({'paddingRight':(getwidth1)+'px'});
});
var width = $(window).width();
$(window).resize(function(){
	width2 =  ($(".wrapper").width());
	var windowwith2 = $(window).width(), divWidth=0;
	var getwidth2 = ((windowwith2 - width2) / 2);
	$('.fullpage').css({'marginLeft':(-getwidth2)+'px'});
	$('.fullpage').css({'marginRight':(-getwidth2)+'px'});
	$('.fullpage-content').css({'marginLeft':(-getwidth2)+'px'});
	$('.fullpage-content').css({'marginRight':(-getwidth2)+'px'});
	$('.fullpage-content').css({'paddingLeft':(getwidth2)+'px'});
	$('.fullpage-content').css({'paddingRight':(getwidth2)+'px'});
});

$(window).load(function(){
	
$('.flexslider').flexslider({
	animation: "slide"
});
	
AOS.init({
	duration: 600,
	once: true,
});

}); 

$(document).ready(function(){

$('#owl-one').owlCarousel({
        autoplay: true,
        		autoPlaySpeed: 5000,
        		autoPlayTimeout: 5000,
        		autoplayHoverPause: true,
                loop: true,
                margin: 10,
                responsiveClass: true,
        responsive:{
            0:{
                items: 1,
                    nav: false,
                    loop: true,
                    margin: 10
            },
            600:{
                items: 1,                   
					nav: true,
                    loop: true,
                    margin: 10
            },
            1024:{
                items: 1,
                    nav: true,
                    loop: true,
                    margin: 10
            },
            1025:{
                items: 1,
                    nav: true,
                    loop: true,
                    margin: 10
            }
        }
    });
	
});

function openModal1() {
  document.getElementById("myModal1").style.display = "block";
}
function closeModal1() {
  document.getElementById("myModal1").style.display = "none";
}

function openModal2() {
  document.getElementById("myModal2").style.display = "block";
}
function closeModal2() {
  document.getElementById("myModal2").style.display = "none";
}

function openModal3() {
  document.getElementById("myModal3").style.display = "block";
}
function closeModal3() {
  document.getElementById("myModal3").style.display = "none";
}

function openModal4() {
  document.getElementById("myModal4").style.display = "block";
}
function closeModal4() {
  document.getElementById("myModal4").style.display = "none";
}

function openModal5() {
  document.getElementById("myModal5").style.display = "block";
}
function closeModal5() {
  document.getElementById("myModal5").style.display = "none";
}

function openModal6() {
  document.getElementById("myModal6").style.display = "block";
}
function closeModal6() {
  document.getElementById("myModal6").style.display = "none";
}