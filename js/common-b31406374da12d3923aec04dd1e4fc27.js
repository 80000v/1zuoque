$(document).ajaxError( function(event, xhr, settings, thrownError){
	if(thrownError == 'abort'){  
    }else if(xhr.responseJSON){
		Lobibox.notify("error", {
			msg: xhr.responseJSON.message
		});
	}else{
		if(xhr.status!=0){
			Lobibox.notify("error", {
				msg: thrownError
			});
		}
	}
});

Lobibox.notify.DEFAULTS = $.extend({}, Lobibox.notify.DEFAULTS, {
	size: 'mini',
	rounded: true,
	position: "center top",
	soundPath: contextPath+'/libs/lobibox/sounds/',
	iconSource: 'fontAwesome',
	icons: {
		fontAwesome: {
	        success: 'far fa-check-circle',
	        error: 'far fa-times-circle',
	        warning: 'far fa-exclamation-circle',
	        info: 'far fa-info-circle'
	    }
	}
});

var valGetParentContainer = function(element) {
    var element = $(element);

    if ($(element).closest('.form-group-sub').length > 0) {
        return $(element).closest('.form-group-sub')
    } else if ($(element).closest('.bootstrap-select').length > 0) {
        return $(element).closest('.bootstrap-select')
    } else {
        return $(element).closest('.form-group');
    }
}

jQuery.validator.setDefaults({
    errorElement: 'div', //default input error message container
    focusInvalid: false, // do not focus the last invalid input
    ignore: "",  // validate all fields including form hidden input

    errorPlacement: function(error, element) { // render error placement for each input type
        var element = $(element);

        var group = valGetParentContainer(element);
        var help = group.find('.form-text');

        if (group.find('.valid-feedback, .invalid-feedback').length !== 0) {
            return;
        }

        element.addClass('is-invalid');
        error.addClass('invalid-feedback');

        if (help.length > 0) {
            help.before(error);
        } else {
            if (element.closest('.bootstrap-select').length > 0) {     //Bootstrap select
                element.closest('.bootstrap-select').find('.bs-placeholder').after(error);
            } else if (element.closest('.input-group').length > 0) {   //Bootstrap group
                element.parent().after(error);
            } else {                                                   //Checkbox & radios
                if (element.is(':checkbox')) {
                    element.closest('.kt-checkbox').find('> span').after(error);
                } else {
                    element.after(error);
                }                
            }            
        }
    },

    highlight: function(element) { // hightlight error inputs
        var group = valGetParentContainer(element);
        group.addClass('validate');
        group.addClass('is-invalid');
        $(element).removeClass('is-valid');
    },

    unhighlight: function(element) { // revert the change done by hightlight
        var group = valGetParentContainer(element);
        group.removeClass('validate'); 
        group.removeClass('is-invalid'); 
        $(element).removeClass('is-invalid');
    },

    success: function(label, element) {
        var group = valGetParentContainer(element);
        group.removeClass('validate');
        group.find('.invalid-feedback').remove();
    }
});