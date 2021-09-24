
$(document).ready(function () {
    $(".close").click(function () {
        event.preventDefault();
        $('.FeedbackPopUp').modal('hide');
        $('.modal-backdrop').remove();
    });

    $(".FeedbackPopupSubmit").click(function () {
        event.preventDefault();
        var IsFormValidate = true;
        var SurveyInfoInput = {};

        if ($("[data-sc-field-name='VisitReasonlist']").val() == "Please choose one") {
           
            IsFormValidate = false;
        }

        if ($("[data-sc-field-name='IAmlist']").val() == "Please choose one") {

            IsFormValidate = false;
        }


        if (!$("input[name='fxb.4cccfb1d-c3fd-4655-b78a-02a5c135ff93.Fields[38411806-0037-4eac-8192-2e687b216dd7].Value']:checked").val()) {
         
            IsFormValidate = false;
        }

        if (!$("input[name='fxb.4cccfb1d-c3fd-4655-b78a-02a5c135ff93.Fields[db561f35-d0cd-4988-84c3-f62990f8f300].Value']:checked").val()) {

            IsFormValidate = false;
        }

        if (!$("input[name='fxb.4cccfb1d-c3fd-4655-b78a-02a5c135ff93.Fields[088af240-d38a-4ade-a07e-39fd6b3de013].Value']:checked").val()) {

            IsFormValidate = false;
        }
        
        if (!IsFormValidate) {
            $(".websiteFeedback .requiredField").css("display", "block");
        }
        else {
             
            SurveyInfoInput.InformationLevel = $('.Information input:checked').val();
            SurveyInfoInput.EaseLevel = $('.Easeofuse input:checked').val()
            SurveyInfoInput.WebSatisfactionLevel = $('.Satisfaction input:checked').val()
            SurveyInfoInput.VisitReason = $(".VisitReasonlist").val();
            SurveyInfoInput.IAm = $(".IAmlist").val();
            $.ajax({
                type: "POST",
                url: "/api/Sitecore/SurveyInfo/SurveyInfoAPI",

                data: JSON.stringify({
                    SurveyInfo: SurveyInfoInput
                }),
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    if (data.success == "true") {
                        window.location = '../../pages/404Error.html';
                    }
                },
                error: function () {
                    alert("Failure");
                }

            });

        
        }


       
        });
    });


    function openFeedbackPopup() {
        $('.FeedbackPopUp').modal('toggle');
    }

    $(".blog-social-icon").on('click', function (e) {
        e.preventDefault();
        $('#siteLeavingAlert').modal('toggle');
        var externallink = $(this).attr('href');
        $("#siteLeavingAlert .get-ex-link").attr('href', externallink);
        $("a.get-ex-link").click(function () {
            $('#siteLeavingAlert').modal('toggle');
        });
    });




