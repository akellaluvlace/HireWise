function ajaxPost(form_data) {
	$.ajaxq.abort('ajaxQueue');
	$.ajaxq('ajaxQueue', {
		url : form_data.url,
		data : form_data.data,
		dataType: form_data.result_format,
		callback: form_data.callback,
		method: 'post',
		cache: false,
		processData: false,
		contentType: false,
		beforeSend: function () {
			$('input').blur();
			loader(true, form_data.call_message);
			blocker(true);
			document.onkeydown = function (e)  {  return false; }
			$(':button').prop('disabled', true);
		},
		success : function(ajax_result) {
			typeof (form_data.callback) == "function" ? form_data.callback(ajax_result) : false;
		},
		error : function(ajax_result) {
			completed({
				call_result : {error_count: 1, main_message: 'something went wrong with the system contact your administator', errors: ''},
				message_type : 'popup',
				callback_url : false,
				refresh_id : false,
				clear_form : false,
				callback : false
			});

			if(ajax_result['statusText'] != 'abort') {
				console.error(ajax_result['responseText']);
			}
		}
	});

	return false;
}



var delay_msg;
function completed(json_params) {
	clearInterval(delay_msg);
	if (json_params.call_result['error_count'] > 0) {

		switch (json_params.message_type) {
			case 'msg':
			default :
				var num_error = 1;
				$('#error-msg').html('');
				for (value in json_params.call_result['errors']) {
					$('#error-msg').append('<div><b>'+num_error+')</b> '+json_params.call_result['errors'][value]['message'] + '. <br></div>');
					num_error++;
				}
				$('#error-msg').css('border-left', '10px solid #E60E2A');
				messenger(true);
			break;
		}

		blocker(false);
		loader(false);

		delay_msg = setInterval(function(){
			messenger(false);
			clearInterval(delay_msg);
		}, 5000);
	}
	else 	{
		if(json_params.clear_form != true){
			$(json_params.clear_form).trigger("reset");
		}

		$('#error-msg').css('border-left', '10px solid #05ff92');
		$('#error-msg').html(json_params.call_result['main_message']);

		if (json_params.callback_url == false) {
			messenger(true);

			if(json_params.refresh_id != false) {
				refresher(json_params.refresh_id, json_params.form, function () {
					delay_msg = setInterval(function() {
						messenger(false);
						clearInterval(delay_msg);
					}, 5000);

					$(json_params.clear_form).trigger("reset");
				});
			}
			else {
				blocker(false);
				loader(false);
				delay_msg = setInterval(function() {
					messenger(false);
					clearInterval(delay_msg);
				}, 2000);
			}
		}
		else {
			loader(false);
			messenger(true);
			delay_msg = setInterval(function() {
				messenger(false);
				clearInterval(delay_msg);
				jump(json_params.callback_url, 0);
			}, 2000);
		}
	}

	document.onkeydown = function (e)  {  return true; }
	$(':button').prop('disabled', false);

	typeof (json_params.callback) == "function" ? json_params.callback(json_params.call_result) : false;
}



function refresher(refresh, form, callback) {
	$(document).ready(function () {
		if (refresh != false) {
			$.ajax({
				dataType: 'html',
				data: '',
				url: window.location.pathname,
				cache: false,
				method: 'get',
				beforeSend: function () {},
				success: function (gethtml) {
				var responsehtml = $('<div/>').html(gethtml);
					if (Array.isArray(refresh) == 1) {
						$.each(refresh, function (index, value) {
							$(value).html(responsehtml.find(value).contents());
						});
					}
					else {
						$(refresh).html(responsehtml.find(refresh).contents());
					}
					$(form).trigger("reset");
					blocker(false);
					loader(false);
				},
				error: function (result) {
					if (result['statusText'] != 'abort') {
						console.log(result['responseText']);
					}
				}
			});

		}
		typeof (callback) == "function" ? callback() : false;
	});
}



function blocker(type, callback) {
	if (type == true) {
		$('#loader-ani').fadeTo(100, 1.0);
		$('#blocker').fadeIn(100);
		typeof (callback) == "function" ? callback() : false;
	} else {
		$('#blocker').fadeOut(100);
	}
}



function messenger(type, callback) {
	if (type == true) {
		$('#error-msg').fadeTo(0, 0.0);
		$('#error-msg').css('display', 'grid');
		$('#error-msg').fadeTo(500, 1.0);
		typeof (callback) == "function" ? callback() : false;
	} else {
		$('#error-msg').fadeOut(500);
	}
}



function loader(type, msg = '', callback) {
	if(msg != '') {
		$('#loader-msg').html(msg);
	}

	if (type == true && $('#loader').is(":hidden")) {
		$('#loader').fadeTo(0, 0.0, function () {
			$('#loader').css('display', 'flex');
			$('#loader').fadeTo(100, 1.0);
		});
	}
	if (type == false) {
		$('#loader').fadeOut(500);
	}
	typeof (callback) == "function" ? callback() : false;
}



function jump(url, delay = 200, callback) {
	if (url != '') {
		setTimeout(function () {
			if (url == 'reload') {
				location.reload();
			}
			else {
				parent.location.assign(url);
			}
		}, delay);
		typeof (callback) == "function" ? callback(result) : false;
	}
}
