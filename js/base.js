var heights = []

$(document).ready(function(){
    //window.createMenu();
    
    $(".leerMas").click(function(){
        
            $(".slide").slideDown(200, function(){
                window.createHeights();    
            });
            $(".menu ul").slideDown(500);
        
            if(window.innerWidth <= 970){
                $('.mobile-menu').show();
            }
            
        });
    
    $('.mobile-menu').click(function(){
        if ($(".menu").is(":visible")){
             $(".menu").slideDown(500);
               
        } else{
            $(".menu").slideUp(500);
            
        }
    })
    
      var popup = $(".popup"),
      doc = $(document),
      popClass = "popped",
      showPopup = function (event) {
        popup.fadeIn(200);
        event.preventDefault();
      },
      hidePopup = function (event) {
        popup.hide();
        event.preventDefault();
      };
    
    doc.keypress(function (event) {
    if (event.keyCode === 27) { // esc key
      hidePopup();
    }
  });
    
    
  doc.on("click", ".open-popup", showPopup);
  doc.on("click", ".popup__close", hidePopup);
    /*===================================0
            BOTONERA HEADER
    =====================================*/
    $(".botonA").click(function(){    
         if ($(".slideHeader").is(":visible")){
             $(".slideHeader").slideUp(500);
               
        } else{
            $(".slideHeader").slideDown(500);
            
        }
    
        });
    
    var where = $("#container-controls");
    var sizeFuenteOriginal = where.css("font-size");
    // Resetear Font Size
    $(".resetFont").click(function(){
        where.css("font-size", sizeFuenteOriginal);
        window.createHeights();
        window.compareHeights();
    });
    // Aumentar Font Size
    $(".biggerFont").click(function(){
        changeFont(true);
    });
    function changeFont(big){
        var sizeFuenteActual = where.css("font-size");
        console.log(sizeFuenteActual);
        var sizeFuenteNuevo;
        var sizeFuenteActualNum = parseFloat(sizeFuenteActual, 10);
        if(big){
            if(sizeFuenteActualNum <= 48){
                sizeFuenteNuevo = sizeFuenteActualNum*1.2;    
            }
               
        }else{
            if(sizeFuenteActualNum >= 12){
                sizeFuenteNuevo = sizeFuenteActualNum*0.8;
            }
        }
        where.css("font-size", sizeFuenteNuevo);
        window.createHeights();
        window.compareHeights();
    }
    
  // Disminuir Font Size
    $(".smallerFont").click(function(){
        changeFont();
    });
    
    $(".amarillo").click(function(){
       $("#container-controls").css("background-color", "#F6AB3B"); 
       $("p").css("color", "#000000")
    });
    
     $(".morado").click(function(){
       $("#container-controls").css("background-color", "#5F0542");
       $("p").css("color", "#FFFFFF");
	   $('.menu-item p ').css("color", "#000");	 
    });
    
     $(".blanco").click(function(){
       $("#container-controls").css("background-color", "#FFFFFF");
       $("p").css("color", "#000000")
    });
    
    $(".menu").stickThis({
        top:110
    });
    
    //prender o apagar
    $('#presentation-button').click(function(){
        $('.presentation').fadeIn();
        $('body').css('overflow', 'hidden');
    })
    $('#presentation-close').click(function(){
        $('.presentation').fadeOut();
        $('body').css('overflow', 'scroll');
    })
	
	//notas
	$('sup').click(function(){
		var ide = '#refe' + $(this).attr('id').substring(3,5);
		console.log(ide);
		$('html, body').animate({
                scrollTop: $(ide).offset().top - 100
        }, 500);
	})
	
	$('.footnote').click(function(){
		var ide = '#ref' + $(this).attr('id').substring(4,6);
		$('html, body').animate({
                scrollTop: $(ide).offset().top - 100
        }, 500);
	})
    
})

$(document).scroll(function(){
    window.compareHeights();
})

$(window).resize(function(){
    window.createHeights();
    window.compareHeights();
    if(window.innerWidth > 970){
        $('.mobile-menu').hide();   
    }else{
        if($('.slide').is(':visible')){
              $('.mobile-menu').show();  
        }    
    }
    
})
function createHeights(){
    for (var i = 0; i < $('.slides').length; i++){
        var ele = $('.slides')[i];
        window.heights [i] = parseFloat($(ele).offset().top) - 200;
    }
}
function compareHeights(){
    var currentHeight = $('body, html').scrollTop();
    for (var i = 0; i < $('.slides').length; i++){
        if(currentHeight >= heights[i]){
            
            var ele = $('.menu-item')[i];
            $('.menu-item').each(function(){
                $(this).removeClass('menu-selected');
            })
             window.createProgress(i);
            $(ele).addClass('menu-selected');
            $('.mobile-menu').text($(ele).text());
           
        }
    }
}


function createProgress(num){
    var altura1 = window.heights[num];
    var altura2 = window.heights[num +1];
    
    var value = altura2 - altura1;
    
        var scroll = $('body, html').scrollTop();
        var alturaActual = scroll- altura1;
        var widthItem = parseFloat($('.menu-item').css('width'));
        var width = (alturaActual * widthItem)/value;
        var el = $('.menu-item div')[num];
        $('.menu-item div').css('width', 0);
        $(el).css('width', width);
    
}

function createMenu(num){
    var lis = '<ul>'
    for(var i = 0; i < $('.section-title').length; i++){
        var sel = $('.section-title')[i];
        var text = $(sel).text();
		var text1 = text.replace(/[0-9]/g, '');
        lis += '<li class="menu-item"><p>' + text1 + '</p><div></div></li>';
    }
    lis += '</ul>';
    $('.menu').append(lis);
    for(var a = 0; a < $('.section-title').length; a++){
        window.createClicks(a);
        var ele = $('.section-title')[a];
    }
    var presen = '<li id="presentation-button">Créditos</li>';
    var dowloads = '<a href="descargas/libro'+num+'/epub.epub" target="_blank"><li class="menu-download">Descargar epub</li></a><a href="descargas/libro'+num+'/libro.pdf" target="_blank"><li class="menu-download">Descargar pdf</li></a>';
    $('.menu ul').prepend(presen);
    $('.menu ul').append(dowloads);
}


function createClicks(num){
    var ele = $('.menu-item')[num];
    var ele1 = $('.section-title')[num];
    return $(ele).click(function (){
            $('html, body').animate({
                scrollTop: $(ele1).offset().top - 100
            }, 1500);
            
   });
}

















