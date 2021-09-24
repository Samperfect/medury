$(document).ready(function () {


    $('.js-submit-stpsmkng').click(function (event) {
        event.preventDefault();
        $('.form-error-summary, .form-captcha-error-summary, .form-email-error-summary').hide();
        if (validateForm($(this))) {

            var StpSmkngFormData = collectFormData('.stp-smkng');
            console.log(StpSmkngFormData);
            $.ajax({
                type: "POST",
                url: "/api/Sitecore/PWSAPI/SendStopSmokingEmail",
                data: JSON.stringify({
                    jsonInput: StpSmkngFormData
                }),
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    console.log('Success');
                    clearFormData($('.stp-smkng'));
                    scrollFormToTop();
                    $('.form-success-text').show();
                },
                error: function () {
                    console.log('Failure');
                }
            });

        } else {
            $('.stp-smkng .form-field-has-error').first().find('input').focus();
            $('.form-error-summary').show();
            $('.form-success-text').hide();

            if ($('[data-sc-field-name="EmailAddress"]').parent().parent().find('.js-ptrn-msg').is(':visible')) {
                $('.form-email-error-summary').show();
            }
        }
    });
});