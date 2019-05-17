// Show nav bar background when scrolled
$(function () {
    $(document).scroll(function() {
        var $nav = $(".navbar");
        $nav.toggleClass("scrolled", $(this).scrollTop() > $nav.height());
    });
});

// Nav links click listeners
var profileView = document.querySelector("#profile");
var projectsView = document.querySelector("#projects");
var footerView = document.querySelector("#footer");
var navLinks = document.querySelectorAll(".nav-link");

navLinks[0].addEventListener("click", function() {
    profileView.scrollIntoView({behavior: 'smooth', block: 'end'});
});

navLinks[1].addEventListener("click", function() {
    projectsView.scrollIntoView({behavior: 'smooth', block: 'start'});
});

navLinks[2].addEventListener("click", function() {
    footerView.scrollIntoView({behavior: 'smooth'});
});

// Collapse nav bar when clicked
$('.nav-item a').on('click', function(){
    var $window = $(window);
    var windowsize = $window.width();

    // Check nav bar is collapsed
    if (windowsize < 992) {
        $('.navbar-toggler').click();
    }
});

// Card click listeners
var mapsBtn = document.querySelector('#mapsBtn');
var mlBtn = document.querySelector('#mlBtn');
var schedulerBtn = document.querySelector('#schedulerBtn');
var cyberBtn = document.querySelector('#cyberBtn');

mapsBtn.addEventListener("click", function() {
    window.location='https://nosyarlin.shinyapps.io/sentiment_map/';
});
mlBtn.addEventListener("click", function() {
    window.location='https://github.com/nosyarlin/ML-Project';
});
schedulerBtn.addEventListener("click", function() {
    window.location='https://github.com/nosyarlin/se7en-scheduler';
});
cyberBtn.addEventListener("click", function() {
    window.location='https://github.com/nosyarlin/Cyber-Attack-Prediction';
});
virkBtn.addEventListener("click", function() {
    window.location='https://github.com/ashiswin/VIRK';
});

// Update year on copyright
var year = document.querySelector('#year');
var dt = new Date();
year.textContent = dt.getYear() + 1900
