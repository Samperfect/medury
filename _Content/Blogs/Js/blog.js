$(window).on('load', function () {
    if ($('iframe').length) {
        var protocol = ["https:" === window.location.protocol ? "https://" : "http://"];
        $('iframe').attr('src', $('iframe').attr('src').replace("http://", protocol));
    }
});

$(document).ready(function () {
    $(".FeedbackPopUp .captcha-cntr").remove();

    $('body').find('a[href*="www."],a[href*=".com"]').not('#main-navigation .mainNav a[href*=".com"],.nav-side-menu a[href*=".com"],a[href*="molinahealthcare"],a.instamed-popup,a[href*="pay.instamed"],a[href*="mymolina.com"],a[href*="molinamarketplace.com"]').each(function () {
        if ($(this).attr('class')) {
            $(this).addClass('externalLink');
            $(this).attr({ 'data-toggle': 'modal', 'data-target': '#siteLeavingAlert', 'target': '_blank' });
        } else {
            $(this).attr({ 'class': 'externalLink', 'data-toggle': 'modal', 'data-target': '#siteLeavingAlert', 'target': '_blank' });
        }
        $("a.externalLink").click(function () {
            var externallink = $(this).attr('href');
            $('#siteLeavingAlert .confirmation-box .get-ex-link').attr('target', '_blank');
            $("#siteLeavingAlert .get-ex-link").attr('href', externallink);
            $("#siteLeavingAlert .get-ex-link").click(function () {
                $('#siteLeavingAlert').modal('hide');
            });
        });
    });
    $(".mainNav .nav-item a").each(function () {
        var link = $(this).attr("href");
        link = link.split("../../index.html");
        var finalSplit = link[4];
        $(this).parent("li").addClass(finalSplit);
    });
    $('#navbarCollapse li.abtmolina').addClass('selected');
    if (/\/blog([^\w]|$)/.test(window.location.pathname)) {
        
    }

    $("#sendEmail").click(function () {

        var emailtxt = $('#emailinput').val();
        var subjecttxt = $('#subjectinput').val();
        var pageurl = $('#emailModel').find('.url').html();
        $.ajax({
            url: "/api/sitecore/SendEmail/Sendemailaction",
            type: 'POST',
            data: {
                email: emailtxt,
                subject: subjecttxt,
                bodytext: pageurl
            },
            success: function (data) { },
            error: function (xhr) { }
        });
    })
    //Blog Email PopUp
    $(".emailthis").click(function () {
        $('#emailModel #emailinput').val('');
        url = $(this).closest('.row').find('.bluetextheader a').attr('href');
        if (url == null || url == "") {
            url = encodeURI(window.location.href);
            $("#emailModel .url").html(url);
        }
        else {
            var absoluteURL = Encoder.htmlEncode(window.location.protocol) + "//" + Encoder.htmlEncode(window.location.hostname) + url;
            $("#emailModel .url").html(absoluteURL);
        }
    });


    function shareurl(socialUrl, url) {
        var windowurl = url,
            width = 550,
            height = 465,
            i = screen.height,
            o = screen.width,
            left = Math.round(o / 2 - width / 2),
            top = 0,
            u = document,
            f = "";
        i > height && (top = Math.round(i / 2 - height / 2));
        window.shareWin = window.open(encodeURI(socialUrl + "=" + windowurl), "&t=" + "", "left=" + left + ",top=" + top + ",width=" + width + ",height=" + height + ",personalbar=0,toolbar=0,scrollbars=1,resizable=1");
        f = u.createElement("script");
        u.getElementsByTagName("head")[0].appendChild(f)
    }

    $(".blogsocialshare").click(function (e) {
        url = $(this).closest('.row').find('.bluetextheader a').attr('href');
        if (url == null) {
            url = encodeURI(window.location.href);
        }

        shareurl($(this).attr("socialurl"), url);
    });

    function closePrint() {
        document.body.removeChild(this.__container__);
    }

    function setPrint() {
        this.contentWindow.__container__ = this;
        this.contentWindow.onbeforeunload = closePrint;
        this.contentWindow.onafterprint = closePrint;
        this.contentWindow.focus(); // Required for IE
        this.contentWindow.print();
    }

    $(".printthis").click(function () {
        sURL = $(this).closest('.row').find('.bluetextheader a').attr('href');
        if (sURL == null) {
            sURL = encodeURI(window.location.href);
        }
        var oHiddFrame = document.createElement("iframe");
        oHiddFrame.setAttribute("id", "printArea");
        $('#printArea').contents().find('footer').hide();
        oHiddFrame.onload = setPrint;
        oHiddFrame.style.position = "fixed";
        oHiddFrame.style.right = "0";
        oHiddFrame.style.bottom = "0";
        oHiddFrame.style.width = "0";
        oHiddFrame.style.height = "0";
        oHiddFrame.style.border = "0";
        oHiddFrame.src = sURL;
        document.body.appendChild(oHiddFrame);
    });

});


$(".close").click(function () {
    $('.modal-backdrop').remove();
});






/*facebook & twitter & google*/
//function facebookurl() {
//    var e = document.getElementsByClassName("fb-small"),
//        o = document.URL.replace("#", ""),
//        t = 550,
//        n = 450,
//        i = screen.height,
//        s = screen.width,
//        h = Math.round(s / 2 - t / 2),
//        r = 0,
//        u = document,
//        f = "";
//    i > n && (r = Math.round(i / 2 - n / 2));
//    window.shareWin = window.open("https://www.facebook.com/login.php?skip_api_login=" + o + "&t=" + e + "", "", "left=" + h + ",top=" + r + ",width=" + t + ",height=" + n + ",personalbar=0,toolbar=0,scrollbars=1,resizable=1");
//    f = u.createElement("script");
//    u.getElementsByTagName("head")[0].appendChild(f)
//}

//function twitterurl() {
//    var e = document.getElementsByClassName("twitter-small"),
//        e = document.URL.replace("#", ""),
//        t = 550,
//        n = 465,
//        i = screen.height,
//        o = screen.width,
//        s = Math.round(o / 2 - t / 2),
//        r = 0,
//        u = document,
//        f = "";
//    i > n && (r = Math.round(i / 2 - n / 2));
//    window.shareWin = window.open("https://twitter.com/intent/tweet?url=" + e, "", "left=" + s + ",top=" + r + ",width=" + t + ",height=" + n + ",personalbar=0,toolbar=0,scrollbars=1,resizable=1");
//    f = u.createElement("script");
//    u.getElementsByTagName("head")[0].appendChild(f)
//}

//function gplusurl() {
//    var e = document.getElementsByClassName("googleplus-small"),
//        e = document.URL.replace("#", ""),
//        t = 550,
//        n = 465,
//        i = screen.height,
//        o = screen.width,
//        s = Math.round(o / 2 - t / 2),
//        r = 0,
//        u = document,
//        f = "";
//    i > n && (r = Math.round(i / 2 - n / 2));
//    window.shareWin = window.open("https://plus.google.com/share?url=" + e, "", "left=" + s + ",top=" + r + ",width=" + t + ",height=" + n + ",personalbar=0,toolbar=0,scrollbars=1,resizable=1");
//    f = u.createElement("script");
//    u.getElementsByTagName("head")[0].appendChild(f)
//}






//module form
var onloadCallback = function () {
    var recaptcha = document.getElementById("captcha_element");

    if (recaptcha) {
        if (window.location.href.indexOf("molinahealthcare") > -1) {
            grecaptcha.render('captcha_element', {
                'sitekey': '6LeqmLIZAAAAAPv9OdDJhoO2Tpj_JX4ARhxE-ybO',
                'callback': function (response) {
                    response.setHeader("Set-Cookie", "HttpOnly;Secure;SameSite=Strict");
                    $("[data-sc-field-key='recaptcha-validation']").addClass("hide-error-field");
                }
            });

        }
        else {
            grecaptcha.render('captcha_element', {
                'sitekey': '6LdETLUUAAAAAJeMufpj7wsjBWmww_1dfhk1GvfB',
                'callback': function (response) {
                    response.setHeader("Set-Cookie", "HttpOnly;Secure;SameSite=Strict");
                    $("[data-sc-field-key='recaptcha-validation']").addClass("hide-error-field");
                }
            });
        }
        
    }

    var contactusrecaptcha = document.getElementById("ContactUsForm");

    if (contactusrecaptcha) {
        if (window.location.href.indexOf("molinahealthcare") > -1) {
            grecaptcha.render('ContactUsForm', {
                'sitekey': '6LeqmLIZAAAAAPv9OdDJhoO2Tpj_JX4ARhxE-ybO',
                'callback': function (response) {
                    response.setHeader("Set-Cookie", "HttpOnly;Secure;SameSite=Strict");
                    $("[data-sc-field-key='recaptcha-validation']").addClass("hide-error-field");
                }
            });

        }
        else {
            grecaptcha.render('ContactUsForm', {
                'sitekey': '6LdETLUUAAAAAJeMufpj7wsjBWmww_1dfhk1GvfB',
                'callback': function (response) {
                    response.setHeader("Set-Cookie", "HttpOnly;Secure;SameSite=Strict");
                    $("[data-sc-field-key='recaptcha-validation']").addClass("hide-error-field");
                }
            });
        }
    }

    grecaptcha.render('ModuleForm', {
        'sitekey': '6LdETLUUAAAAAJeMufpj7wsjBWmww_1dfhk1GvfB',
        'callback': function (response) {
            response.setHeader("Set-Cookie", "HttpOnly;Secure;SameSite=Strict");
            $("[data-sc-field-key='recaptcha-validation']").addClass("hide-error-field");
        }
    });
};
var SurveyInfoInput = {};
$(document).ready(function () {

    $(".nav-side-menu li").hover(
        function () { $(this).addClass("hover"); },
        function () { $(this).removeClass("hover"); }
    );

    $(".FeedbackPopupSubmit").click(function () {
        event.preventDefault();
        var IsFormValidate = true;

        if ($('.Information input:checked').val()) {
            $("[data-sc-field-key='lblMandatoryField']").css("display", "none");

        } else {
            $("[data-sc-field-key='lblMandatoryField']").css("display", "block");
            IsFormValidate = false;
        }

        if ($('.Easeofuse input:checked').val()) {
            $("[data-sc-field-key='lblMandatoryField']").css("display", "none");

        } else {
            $("[data-sc-field-key='lblMandatoryField']").css("display", "block");
            IsFormValidate = false;
        }

        if ($('.Satisfaction input:checked').val()) {
            $("[data-sc-field-key='lblMandatoryField']").css("display", "none");

        } else {
            $("[data-sc-field-key='lblMandatoryField']").css("display", "block");
            IsFormValidate = false;
        }

        if ($("[data-sc-field-name='VisitReasonlist']").val() == $(".VisitReasonlist option:first").val()) {
            $("[data-sc-field-key='lblMandatoryField']").css("display", "block");
            IsFormValidate = false;
        } else {
            $("[data-sc-field-key='lblMandatoryField']").css("display", "none");
        }

        if ($("[data-sc-field-name='IAmlist']").val() == $(".IAmlist option:first").val()) {
            $("[data-sc-field-key='lblMandatoryField']").css("display", "block");
            IsFormValidate = false;
        } else {
            $("[data-sc-field-key='lblMandatoryField']").css("display", "none");
        }

        var recaptcha = document.getElementById("FeedbackForm");
        if (recaptcha) {
            var recaptchaResponse =   $('#FeedbackForm-g-recaptcha-response').val();
            if (recaptchaResponse.length == 0) {
                $("[data-sc-field-key='captchaValid']").css("display", "block");
                IsFormValidate = false;
            } else {
                $("[data-sc-field-key='captchaValid']").css("display", "none");
            }
        }

        if (IsFormValidate == false) {
            return false;
        } else {
            SurveyInfoInput.InformationLevel = $('.Information input:checked').val();
            SurveyInfoInput.EaseLevel = $('.Easeofuse input:checked').val()
            SurveyInfoInput.WebSatisfactionLevel = $('.Satisfaction input:checked').val()
            SurveyInfoInput.VisitReason = $(".VisitReasonlist").val();
            SurveyInfoInput.IAm = $(".IAmlist").val();
            SurveyInfoInput.PageURL = window.location.href;
            SurveyInfoInput.State = GetStateName(document.getElementById("selStateCodeHdn").value);
            var recaptchaResponse = $('#FeedbackForm-g-recaptcha-response').val();;
            $.ajax({
                type: "POST",
                url: "/api/Sitecore/SurveyInfo/SurveyInfoAPI",
                data: JSON.stringify({
                    SurveyInfo: SurveyInfoInput,
                    Response: recaptchaResponse
                }),
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    if (data.success == "true") {
                        alert($(".display-success-msg").text());
                        $('.FeedbackPopUp').modal('hide');
                    }
                    if (data.success == "false") {
                        alert($(".display-failure-msg").text());
                        $('.FeedbackPopUp').modal('hide');
                    }
                },
                error: function () {
                    alert($(".display-failure-msg").text());
                    $('.FeedbackPopUp').modal('hide');
                }
            });
        }
    });

    $("span.contactusfeedback").click(function () {
        window.open(Encoder.htmlEncode(window.location.protocol + "//" + window.location.hostname + '/members/common/en-US/abtmolina/compinfo/contactus.aspx', '_blank'));
    });

    var isMobile = /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent);
    var is_iPad = navigator.userAgent.match(/iPad/i) != null;
    $('.dropdown-menu').hover(function () {
        $(this).parent().toggleClass('hover');
    });
    $('.navbar-toggler').on('click', function () {
        $('.navbar-collapse').toggleClass('right');
        $(this).toggleClass('active');
        $('.navbar-brand').toggleClass('visibilityhidden');
        $('.navbar.navbar-expand-md').toggleClass('bgnone');
        $('body').toggleClass('fixedPosition');
        $('.navbar-collapse').removeClass('submenu-view');
        $('.nav-item.dropdown,.dropdown-menu').removeClass('show');
    });
    $('.nav-link.dropdown-toggle').click(function (e) {
        e.stopPropagation();
    });
    $('.nav-item.dropdown .arrow').click(function (e) {
        e.stopPropagation();
        if ($(this).parent().hasClass('show')) {
            e.stopPropagation();
            $(this).parents().find('.navbar-collapse').addClass('animate-in-2').removeClass('submenu-view').removeClass('animate-out-2');
            $(this).next().removeClass('show');
            $(this).parent().removeClass('show');
        } else {
            e.preventDefault();
            $(this).parents().find('.navbar-collapse').addClass('animate-out-2').removeClass('animate-in-2');
            $(this).parent().addClass('show');
            $(this).next().addClass('show');
            if ($(this).parent().hasClass('dropdown')) {
                $(this).parents().find('.navbar-collapse').addClass('submenu-view');
            } else { return false; }
            return false;
        }
    });
    function is_touch_device() {
        return !!('ontouchstart' in window);
    }
    if (is_touch_device() && is_iPad) {
        $(".navbar-nav li.dropdown a.nav-link").click(function (e) {
            var $this = $(this);
            if ($this.hasClass('clicked')) {
                return;
            } else {
                $this.addClass('clicked');
                e.preventDefault();
                setTimeout(function () {
                    $this.removeClass('clicked');
                }, 500);
            }
        });
    }

    $(window).on("resize", function (event) {
        var width = $(this).width();
        if (width > 767 && width < 1025) {
            $(".navbar-nav li.dropdown a.nav-link").click(function (e) {
                var $this = $(this);
                if ($this.hasClass('clicked')) {
                    return;
                } else {
                    $this.addClass('clicked');
                    e.preventDefault();
                    setTimeout(function () {
                        $this.removeClass('clicked');
                    }, 500);
                }
            });
        }
    })

    var isMobile = /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent);
    $(window).on("resize", function (event) {
        var width = $(this).width();
        if (width < 768) {
            $(".globalToolbox").insertAfter(".secondary-header");
            $("#main-navigation").insertBefore(".secondary-header");
            $(".globalToolbox").insertAfter(".provider-header");
            $("#provider-navigation").insertBefore(".provider-header");
            $('#main-navigation').css('z-index', 'inherit');
            $('.navbar.navbar-expand-md .navbar-nav .nav-item a').on('click', function () {
                $('.navbar-collapse').removeClass('show');
                $('.navbar-toggler').removeClass('active').addClass('collpased');
                $('.navbar.navbar-expand-md').removeClass('bgnone');
                $('.navbar-brand.d-block').removeClass('visibilityhidden');
                $('#main-navigation').css('z-index', '-1');
            });
            $('a[data-dismiss="modal"]').on('click', function () {
                $('#main-navigation').removeAttr('style');
            });
        } else {
            $(".globalToolbox").insertBefore(".secondary-header");
            $("#main-navigation").insertAfter(".secondary-header");
            $(".globalToolbox").insertBefore(".provider-header");
            $("#provider-navigation").insertAfter(".provider-header");
            $('#main-navigation').css('z-index', '3');
        }
    });
    if ($(window).width() < 768 || isMobile) {
        $('.navbar.navbar-expand-md .navbar-nav .nav-item a').on('click', function () {
            $('.navbar-collapse').removeClass('show');
            $('.navbar-toggler').removeClass('active').addClass('collpased');
            $('.navbar.navbar-expand-md').removeClass('bgnone');
            $('.navbar-brand.d-block').removeClass('visibilityhidden');
            $('#main-navigation').css('z-index', '-1');
        });
        $('a[data-dismiss="modal"]').on('click', function () {
            $('#main-navigation').removeAttr('style');
        });
    }

    if ($(window).width() < 768 || isMobile) {
        $(".globalToolbox").insertAfter(".secondary-header");
        $("#main-navigation").insertBefore(".secondary-header");
        $(".globalToolbox").insertAfter(".provider-header");
        $("#provider-navigation").insertBefore(".provider-header");
    } else {
        $(".globalToolbox").insertBefore(".secondary-header");
        $("#main-navigation").insertAfter(".secondary-header");
        $(".globalToolbox").insertBefore(".provider-header");
        $("#provider-navigation").insertAfter(".provider-header");
    }
});