/* English initialisation for the jQuery UI date picker plugin. */
jQuery(function($){
	$.datepicker.regional['en'] = {
		closeText: 'Close',
		prevText: 'Previous',
		nextText: 'Next',
		currentText: 'Today',
		monthNames: ['January', 'February', 'March', 'April', 'May', 'June',
			'July', 'August', 'September', 'October', 'November', 'December'],
		monthNamesShort: ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'June',
			'July', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.'],
		dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
		dayNamesShort: ['Sun.', 'Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.'],
		dayNamesMin: ['S','M','T','W','T','F','S'],
		weekHeader: 'Week',
		dateFormat: 'dd/mm/yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['en']);
});
