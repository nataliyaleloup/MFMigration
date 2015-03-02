/* Dutch (UTF-8) initialisation for the jQuery UI date picker plugin. */
/* Written by Mathias Bynens <http://mathiasbynens.be/> */
jQuery(function($){
	$.datepicker.regional['nl'] = {
		closeText: 'Sluiten',
		prevText: '\u2190',
		nextText: '\u2192',
		currentText: 'Vandaag',
		monthNames: ['Januari', 'Februari', 'Maart', 'April', 'Mei', 'Juni',
		'Juli', 'Augustus', 'September', 'Oktober', 'November', 'December'],
		monthNamesShort: ['Jan', 'Feb', 'Maa', 'Apr', 'Mei', 'Jun',
		'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'],
		dayNames: ['Zondag', 'Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag'],
		dayNamesShort: ['Zon', 'Maa', 'Din', 'Woe', 'Don', 'Vri', 'Zat'],
		dayNamesMin: ['Z', 'M', 'D', 'W', 'D', 'V', 'Z'],
		weekHeader: 'Wk',
		dateFormat: 'dd-mm-yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
});