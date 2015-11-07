// $(function() {
//     $('.dropdown-submenu').hover(
//         function() {
//         var ul = $(this).children('.dropdown-menu');
//         ul.addClass('submenu');
//         ul.show();
        
//         },
//         function(){
//             $(this).children('.dropdown-menu').hide();
//         }
//     );

    
// });

var $menu = $(".dropdown-menu");

// jQuery-menu-aim: <meaningful part of the example>
// Hook up events to be fired on menu row activation.

$menu.menuAim({
    activate: activateSubmenu,
    deactivate: deactivateSubmenu
});

function hideAllComponents() {

  
    $('.slider').hide();
    $('.slider-nav').hide();
    $('.search').hide();
    $('.checkin').hide();
    $('.checkin-verify').hide();
    $('.search-results').hide();
    $('.checkin-result').hide();
}

// jQuery-menu-aim: </meaningful part of the example>
// jQuery-menu-aim: the following JS is used to show and hide the submenu
// contents. Again, this can be done in any number of ways. jQuery-menu-aim
// doesn't care how you do this, it just fires the activate and deactivate
// events at the right times so you know when to show and hide your submenus.
function activateSubmenu(row) {
    var $row = $(row),
        submenuId = $row.data("submenuId"),
        $submenu = $("#" + submenuId),        
        height = $menu.outerHeight(),
        width = $menu.outerWidth();

    // Show the submenu
    $submenu.css({
        display: "block",
        top: -1,
        left: width - 3,  // main should overlay submenu
    });

    // Keep the currently activated row's highlighted look
    $row.find("a").addClass("maintainHover");
}

function deactivateSubmenu(row) {
    var $row = $(row),
        submenuId = $row.data("submenuId"),
        $submenu = $("#" + submenuId);

    // Hide the submenu and remove the row's highlighted look
    $submenu.css("display", "none");
    $row.find("a").removeClass("maintainHover");
}

// Bootstrap's dropdown menus immediately close on document click.
// Don't let this event close the menu if a submenu is being clicked.
// This event propagation control doesn't belong in the menu-aim plugin
// itself because the plugin is agnostic to bootstrap.
$(".dropdown-menu li").click(function(e) {
    e.stopPropagation();
});


var main = function() {

  $('departure_date').attr("placeholder", "type date");
  $('departure_date').attr("placeholder", "type date");

  $('.arrow-next').click(function() {
    var currentSlide = $('.active-slide');
    var nextSlide = currentSlide.next();

    var currentDot = $('.active-dot');
    var nextDot = currentDot.next();

    if(nextSlide.length === 0) {
      nextSlide = $('.slide').first();
      nextDot = $('.dot').first();
    }
    
    currentSlide.fadeOut(600).removeClass('active-slide');
    nextSlide.fadeIn(600).addClass('active-slide');

    currentDot.removeClass('active-dot');
    nextDot.addClass('active-dot');
  });


  $('.arrow-prev').click(function() {
    var currentSlide = $('.active-slide');
    var prevSlide = currentSlide.prev();

    var currentDot = $('.active-dot');
    var prevDot = currentDot.prev();

    if(prevSlide.length === 0) {
      prevSlide = $('.slide').last();
      prevDot = $('.dot').last();
    }
    
    currentSlide.fadeOut(600).removeClass('active-slide');
    prevSlide.fadeIn(600).addClass('active-slide');

    currentDot.removeClass('active-dot');
    prevDot.addClass('active-dot');
  });
  
  // $(".popover").css("display", "none");
  // $("a.maintainHover").removeClass("maintainHover");


  $('.show_search').click(function(){
    console.log("show search clicked");
    hideAllComponents();
    $('.search').show();
  });

  $('.checkin-btn').click(function(){
    console.log("checking in");
    hideAllComponents();
    $('.checkin').show();
  });
  

}

$(document).ready(main);