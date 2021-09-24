
$(document).ready(function () {
    var input = document.getElementById("searchInputText");

    // Execute a function when the user releases a key on the keyboard
    input.addEventListener("keyup", function (event) {
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
            // Cancel the default action, if needed
            event.preventDefault();
            // Trigger the button element with a click
            $('.btn-secondary').click();
        }
    });

    if ($(window).width() < 768) {
        $(".globalToolbox").insertAfter(".secondary-header");
        $("#main-navigation").insertBefore(".secondary-header");
    }

    $('.btn-secondary').click(function () {

        var searchString = Encoder.htmlEncode($('#searchInputText').val());
        if (!searchString) {
            $('.errorInfo').show();
        } else {
            window.location.href = encodeURI('../pages/Search?key=' + searchString);
            
        }
    });
});
