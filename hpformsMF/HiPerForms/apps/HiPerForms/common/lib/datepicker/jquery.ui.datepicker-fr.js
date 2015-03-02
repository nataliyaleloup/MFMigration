/* French initialisation for the jQuery UI date picker plugin. */
/* Written by Keith Wood (kbwood{at}iinet.com.au),
			  Stephane Nahmani (sholby@sholby.net),
			  Stephane Raimbault <stephane.raimbault@gmail.com> */
jQuery(function($){
	$.datepicker.regional['fr'] = {
		closeText: 'Fermer',
		prevText: 'Pr\u00E9c\u00E9dent',
		nextText: 'Suivant',
		currentText: 'Aujourd\'hui',
		monthNames: ['Janvier', 'F\u00E9vrier', 'Mars', 'Avril', 'Mai', 'Juin',
			'Juillet', 'Ao\u00FBt', 'Septembre', 'Octobre', 'Novembre', 'D\u00E9cembre'],
		monthNamesShort: ['Janv.', 'F\u00E9vr.', 'Mars', 'Avril', 'Mai', 'Juin',
			'Juil.', 'Ao\u00FBt', 'Sept.', 'Oct.', 'Nov.', 'D\u00E9c.'],
		dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
		dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'],
		dayNamesMin: ['D','L','M','M','J','V','S'],
		weekHeader: 'Sem.',
		dateFormat: 'dd/mm/yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
});
