(function ($) {
	$.fn.emailValidator = function (email) {
		const pattern = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i;
		console.log(pattern.test(email));
		
		return pattern.test(email);
	}
})(jQuery)