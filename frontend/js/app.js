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
    $('.select_place').hide();
    $('.seat_map').hide();
    
    $('.search_results').hide();
    $('.book-confirmed').hide();
}

}

function searchFlight() {
    var departure = $('#departure').val();
    if (departure==undefined || departure=="") {
        departure = "Helsinki";
    }
    var destination = $('#destination').val();
    var departure_date = $('#departure_date').val();
    var return_date = $('#return_date').val();
    console.log("raw string: " + departure_date);
    var date = new Date(departure_date);
    console.log("Mo is annoying: " + date);
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    var formattedDepartureDate = month + "-" + day + "-" + year;
    console.log("reformatted: " + formattedDepartureDate);
    console.log("departure " + departure + ", dest " + destination + ", departure date: " +
        departure_date + ", return date: " + return_date);
    var query = "http://localhost:8080/api/getflight?departure=" + departure + "&destination=" + destination + "&date=" + formattedDepartureDate;
    console.log(query);
    $.getJSON(query, 
        function(data_inbound) {
        if (data_inbound != undefined) {
            //display in search results
            console.log("Inbound-flight: " + data_inbound);
            console.log(data_inbound._id);
            displayInboundResults(data_inbound);
            
        }

    });

    date = new Date(return_date);
    
    day = date.getDate();
    month = date.getMonth() + 1;
    year = date.getFullYear();
    var formattedReturnDate = month + "-" + day + "-" + year;
    console.log("mo is annoying2: " + formattedReturnDate);

    $.getJSON("http://localhost:8080/api/getflight?departure=" + destination + "&destination=" + departure + "&date=" + formattedReturnDate, 
        function(data_outbound) {
        if (data_outbound != undefined) {
            //display in search results
            console.log("Outbound-flight: " + data_outbound);
            console.log(data_outbound._id);
            displayOutboundResults(data_outbound);
        }
    });

    hideAllComponents();
    $('.search_results').show();
}

function displayInboundResults(inbound) {
    var inbound_tbl = $("#inbound_results");

    
    var tr = $("<tr></tr>");
    tr.attr("id", "tr_" + inbound._id);
    var p = "‎350.0";

    var id_td = document.createElement("td");
    id_td.className = "flight_id";
    var id = document.createTextNode(inbound._id);
    id_td.appendChild(id);

    var dep_td = document.createElement("td");
    dep_td.className = "departure";
    var departure = document.createTextNode(inbound.departure);
    dep_td.appendChild(departure);

    var des_td = document.createElement("td");
    des_td.className = "destination";
    var destination = document.createTextNode(inbound.destination);
    des_td.appendChild(destination);

    var date_td = document.createElement("td");
    date_td.className = "date";
    var date = document.createTextNode(inbound.date);
    date_td.appendChild(date);

    var price_td = document.createElement("td");
    price_td.className = "price";
    var price = document.createTextNode(p);
    price_td.appendChild(price);

    var checkbox_td = $("<td></td>");
    checkbox_td.addClass("checkbox");
    checkbox_td.className = "checkbox";
    var checkbox = $("<input></input>");
    checkbox.addClass("cb");
    checkbox.attr("style", "position:relative; visibility: visible; left:30px");
    checkbox.attr("type", "checkbox");
    checkbox.attr("id", "cb_" + inbound._id);
    checkbox.attr('checked', 'checked');
    checkbox_td.append(checkbox);

    
        tr.append(id_td);
        tr.append(dep_td);
        tr.append(des_td);
        tr.append(date_td);
        tr.append(price_td);
        tr.append(checkbox_td);
    inbound_tbl.append(tr);
}

function displayOutboundResults(inbound) {
    var inbound_tbl = $("#outbound_results");

    
    var tr = $("<tr></tr>");
    tr.attr("id", "tr_" + inbound._id);
    var p = "‎350.0";

    var id_td = document.createElement("td");
    id_td.className = "flight_id";
    var id = document.createTextNode(inbound._id);
    id_td.appendChild(id);

    var dep_td = document.createElement("td");
    dep_td.className = "departure";
    var departure = document.createTextNode(inbound.departure);
    dep_td.appendChild(departure);

    var des_td = document.createElement("td");
    des_td.className = "destination";
    var destination = document.createTextNode(inbound.destination);
    des_td.appendChild(destination);

    var date_td = document.createElement("td");
    date_td.className = "date";
    var date = document.createTextNode(inbound.date);
    date_td.appendChild(date);

    var price_td = document.createElement("td");
    price_td.className = "price";
    var price = document.createTextNode(p);
    price_td.appendChild(price);

    var checkbox_td = $("<td></td>");
    checkbox_td.addClass("checkbox");
    checkbox_td.className = "checkbox";
    var checkbox = $("<input></input>");
    checkbox.attr("style", "position:relative; visibility: visible; left:30px");
    
    checkbox.attr("type", "checkbox");
    checkbox.addClass("cb");
    checkbox.attr('checked', 'checked');
    checkbox.attr("id", "cb_" + inbound._id);
    checkbox_td.append(checkbox);

    
        tr.append(id_td);
        tr.append(dep_td);
        tr.append(des_td);
        tr.append(date_td);
        tr.append(price_td);
        tr.append(checkbox_td);
    inbound_tbl.append(tr);


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
    $('.checkin-verify').show();
  });
  
  $('#search_flight_btn').click(function(){
    searchFlight();
  });

  $('#get_booking_btn').click(function() {
    hideAllComponents();
    $('.checkin').show();
  });

$('#seat_map_btn').click(function() {
    hideAllComponents();
    $('.seat_map').show();
  });
  $('#use_sezi_btn').click(function() {
    hideAllComponents();
    $('.checkin-result').show();
  });
  $('.checkin_completed').click(function() {
    hideAllComponents();
    $('.checkin-result').show();
  });

$('#book_btn').click(function() {
    hideAllComponents();
    $('.book-confirmed').show();
  });

}

$(document).ready(main);