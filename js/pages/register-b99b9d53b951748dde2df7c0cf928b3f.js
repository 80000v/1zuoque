"use strict";

// Class definition
var RegisterControls = function () {
	// Base elements
	var registerValidation;
	var confirmValidation;
	var captchaImgSrc = $('#captcha-img').attr('src');
	var sendCodeWait = 120;
	
	// Private functions
	var initControls = function(){
		$('#captcha-img').click(function(){
			resetCaptcha();
		});
	}
	
	var initValidate = function (){
		registerValidation =$('#register-form').validate({
            // define validation rules
            rules: {
            	password: {
                    required: true,
                    minlength: 6,
                    maxlength: 20
                },
                repassword: {
                	equalTo: '[name="password"]'
                }
            },
            submitHandler: function (form) {
            	var l = Ladda.create( $(form).find('button[type="submit"]')[0] );
            	l.start();
            	$.ajax({
					type: "POST",
					url: $(form).attr('action'),
					data: $(form).serialize(),
					dataType: "json",
					success: function(result){
						if(result.success){
							window.location.href = contextPath + '/register/confirm/'+ result.data;
						}else{
							l.stop();
							
							resetCaptcha();
							$('#captcha').val('');
							
							if(!jQuery.isEmptyObject(result.errorFields)){
								registerValidation.showErrors(result.errorFields);
							}else{
								Lobibox.notify("error", {
									msg: result.message
								});
							}
						}
					},
					error: function(){
						l.stop();
					}
				});
            }
        });
	}
	
	var resetCaptcha = function() {
    	$('#captcha-img').hide().prop('src', captchaImgSrc+'?' + new Date().getTime()).fadeIn();
    }
	
	var initConfirmControls = function(){
		$('#send-btn').click(function () {
	    	var l = Ladda.create( this );
	    	l.start();
			$.ajax({
				url: contextPath + '/api/system/confirm/code/send/register/'+$('input[name="registerKey"]').val(),
				type:'post',
				dataType:'json',
				success: function(result) {
					l.stop();
					if(result.success){
						sendCodeWait = result.wait;
						resendCode();
					}else{
						Lobibox.notify("error", {
							msg: result.message
						});
					}
				},
				error: function(){
					l.stop();
				}
			});
		});
	}
	
	var initConfirmValidate = function (){
		confirmValidation = $('#confirm-form').validate({
	        // define validation rules
	        submitHandler: function (form) {
	        	var l = Ladda.create( $(form).find('button[type="submit"]')[0] );
	        	l.start();
	        	$.ajax({
					type: "POST",
					url: $(form).attr('action'),
					data: $(form).serialize(),
					dataType: "json",
					success: function(result){
						if(result.success){
							Swal.fire({
								type: 'success',
								title: I18n['register.success'],
								text: I18n['register.success.desc'],
								allowOutsideClick: false,
								confirmButtonText: I18n['login']
							}).then((result) => {
								window.location.href = contextPath+'/login';
						    });
						}else{
							l.stop();
							if(!jQuery.isEmptyObject(result.errorFields)){
								confirmValidation.showErrors(result.errorFields);
							}else{
								Lobibox.notify("error", {
									msg: result.message
								});
							}
							
						}
					},
					error: function(){
						l.stop();
					}
				});
	        }
	    });
	}
	
	var resendCode = function() {
		var sendbtn = $("#send-btn");
	    if (sendCodeWait == 0) {
	    	sendbtn.prop('disabled', false);
	    	sendbtn.html(I18n['send.code']);
	    	sendCodeWait = 120;
	    } else {
	    	sendbtn.prop('disabled', true);  
	        sendbtn.html(I18n['send.code']+"(" + sendCodeWait + ")");
	        sendCodeWait--;
	        setTimeout(function() {
	        	resendCode()
	        },1000)
	    }
	}
	
	return {
        // public functions
        init: function() {
        	initControls();
        	initValidate();
        },
        initConfirm: function(){
        	initConfirmControls();
        	initConfirmValidate();
        }
    };
}();

$(document).ready(function() {
	
});