"use strict";

// Class definition
var LoginControls = function () {
	// Base elements
	var captchaImgSrc = $('#captcha-img').attr('src');
	
	// Private functions
	var initControls = function(){
		$('#captcha-img').click(function(){
			resetCaptcha();
		});
	}
	
	var initValidate = function (){
		$('#login-form').validate({
		    // define validation rules
		    rules: {
		    	password: {
		            required: true,
		            minlength: 6,
		            maxlength: 20
		        }
		    },
		    submitHandler: function (form) {
		    	var l = Ladda.create( form.querySelector( 'button[type=submit]' ) );
		    	l.start();
		    	form.submit();
		    }
		});
	}
	
	var resetCaptcha = function() {
    	$('#captcha-img').hide().prop('src', captchaImgSrc+'?' + new Date().getTime()).fadeIn();
    }
	
	return {
        // public functions
        init: function() {
        	initControls();
        	initValidate();
        }
    };
}();

$(document).ready(function() {
	
});