var csrfToken = $("meta[name='_csrf']").attr("content");
var csrfHeader = $("meta[name='_csrf_header']").attr("content");
$(document).ajaxSend(function(e, xhr, options) {
	if(csrfToken && csrfHeader){
		xhr.setRequestHeader(csrfHeader, csrfToken);
	}
});

jQuery.validator.setDefaults({
	errorPlacement: function(error, element) {
		var ck = element.siblings('div.ck');
		if(ck.length){
			ck.after(error.addClass('invalid-feedback'));
			return;
		}
        var group = element.closest('.input-btn--inline');
        if (group.length) {
            group.after(error.addClass('invalid-feedback'));
        } else {
            element.after(error.addClass('invalid-feedback'));
        }
    }
});

$('form[data-subscribe]').each(function(){
	$(this).validate({
		rules: {
	    	email: {
	            required: true,
	            maxlength: 50
	        }
	    },
	    submitHandler: function (form) {
	    	var l = Ladda.create( form.querySelector( 'button[type=submit]' ) );
	    	l.start();
	    	var captcha = new TencentCaptcha(captchaCodeId, function(res){
	    		if(res.ret==0){
	    			$.ajax({
						type: "POST",
						url: contextPath + '/subscribe',
						data: $(form).serialize()+"&"+$.param({'c-tk':res.ticket, 'c-rs':res.randstr}),
						dataType: "json",
						success: function(result){
							if(result.success){
								Swal.fire({
			                        title: '订阅成功',
			                        text: '感谢您订阅我们的资讯',
			                        type: 'success'
			                    });
							}else{
								Swal.fire({
			                        title: '订阅失败',
			                        text: result.message,
			                        type: 'error'
			                    });
							}
						},
						complete: function(){
							l.stop();
						}
					});
	    		}else{
	    			l.stop();
	    		}
	    	});
	    	captcha.show()
	    }
	});
});