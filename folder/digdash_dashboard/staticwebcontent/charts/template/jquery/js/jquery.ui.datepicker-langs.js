jQuery(function($)
{
	$.datepicker.regional['en-GB'] =
	{
		closeText: 'Done',
		prevText: 'Prev',
		nextText: 'Next',
		currentText: 'Today',
		monthNames: ['January','February','March','April','May','June',
		'July','August','September','October','November','December'],
		monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
		'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
		dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
		dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
		dayNamesMin: ['Su','Mo','Tu','We','Th','Fr','Sa'],
		weekHeader: 'Wk',
		dateFormat: 'dd/mm/yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''
	};
	$.datepicker.setDefaults($.datepicker.regional['en-GB']);

	$.datepicker.regional['fr'] =
	{
		closeText: 'Fermer',
		prevText: 'Pr\u00E9c\u00E9dent',
		nextText: 'Suivant',
		currentText: 'Aujourd\'hui',
		monthNames: ['Janvier','F\u00E9vrier','Mars','Avril','Mai','Juin',
		'Juillet','Ao\u00FBt','Septembre','Octobre','Novembre','D\u00E9cembre'],
		monthNamesShort: ['Janv.','F\u00E9vr.','Mars','Avril','Mai','Juin',
		'Juil.','Ao\u00FBt','Sept.','Oct.','Nov.','D\u00E9c.'],
		dayNames: ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
		dayNamesShort: ['Dim.','Lun.','Mar.','Mer.','Jeu.','Ven.','Sam.'],
		dayNamesMin: ['D','L','M','M','J','V','S'],
		weekHeader: 'Sem.',
		dateFormat: 'dd/mm/yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''
	};

	$.datepicker.regional.de =
	{
		closeText: "Schlie\u00DFen",
		prevText: "&#x3C;Zur\u00FCck",
		nextText: "Vor&#x3E;",
		currentText: "Heute",
		monthNames: [ "Januar","Februar","M\u00E4rz","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember" ],
		monthNamesShort: [ "Jan","Feb","M\u00E4r","Apr","Mai","Jun","Jul","Aug","Sep","Okt","Nov","Dez" ],
		dayNames: [ "Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag" ],
		dayNamesShort: [ "So","Mo","Di","Mi","Do","Fr","Sa" ],
		dayNamesMin: [ "So","Mo","Di","Mi","Do","Fr","Sa" ],
		weekHeader: "KW",
		dateFormat: "dd.mm.yy",
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ""
	};

	$.datepicker.regional.es =
	{
		closeText: "Cerrar",
		prevText: "&#x3C;Ant",
		nextText: "Sig&#x3E;",
		currentText: "Hoy",
		monthNames: [ "enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre" ],
		monthNamesShort: [ "ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic" ],
		dayNames: [ "domingo","lunes","martes","mi\u00E9rcoles","jueves","viernes","s\u00E1bado" ],
		dayNamesShort: [ "dom","lun","mar","mi�","jue","vie","s\u00E1" ],
		dayNamesMin: [ "D","L","M","X","J","V","S" ],
		weekHeader: "Sm",
		dateFormat: "dd/mm/yy",
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ""
	};

	$.datepicker.regional.it = 
	{
		closeText: "Chiudi",
		prevText: "&#x3C;Prec",
		nextText: "Succ&#x3E;",
		currentText: "Oggi",
		monthNames: [ "Gennaio","Febbraio","Marzo","Aprile","Maggio","Giugno","Luglio","Agosto","Settembre","Ottobre","Novembre","Dicembre" ],
		monthNamesShort: [ "Gen","Feb","Mar","Apr","Mag","Giu","Lug","Ago","Set","Ott","Nov","Dic" ],
		dayNames: [ "Domenica","Luned\u00EC","Marted\u00EC","Mercoled\u00EC","Gioved\u00EC","Venerd\u00EC","Sabato" ],
		dayNamesShort: [ "Dom","Lun","Mar","Mer","Gio","Ven","Sab" ],
		dayNamesMin: [ "Do","Lu","Ma","Me","Gi","Ve","Sa" ],
		weekHeader: "Sm",
		dateFormat: "dd/mm/yy",
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ""
	};

	$.datepicker.regional.nl =
	{
		closeText: "Sluiten",
		prevText: "",
		nextText: "",
		currentText: "Vandaag",
		monthNames: [ "januari","februari","maart","april","mei","juni","juli","augustus","september","oktober","november","december" ],
		monthNamesShort: [ "jan","feb","mrt","apr","mei","jun","jul","aug","sep","okt","nov","dec" ],
		dayNames: [ "zondag","maandag","dinsdag","woensdag","donderdag","vrijdag","zaterdag" ],
		dayNamesShort: [ "zon","maa","din","woe","don","vri","zat" ],
		dayNamesMin: [ "zo","ma","di","wo","do","vr","za" ],
		weekHeader: "Wk",
		dateFormat: "dd-mm-yy",
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ""
	};

	$.datepicker.regional.pl =
	{
		closeText: "Zamknij",
		prevText: "&#x3C;Poprzedni",
		nextText: "Nastepny&#x3E;",
		currentText: "Dzis",
		monthNames: [ "Styczen","Luty","Marzec","Kwiecien","Maj","Czerwiec","Lipiec","Sierpien","Wrzesien","Pazdziernik","Listopad","Grudzien" ],
		monthNamesShort: [ "Sty","Lu","Mar","Kw","Maj","Cze","Lip","Sie","Wrz","Pa","Lis","Gru" ],
		dayNames: [ "Niedziela","Poniedzialek","Wtorek","Sroda","Czwartek","Piatek","Sobota" ],
		dayNamesShort: [ "Nie","Pn","Wt","Sr","Czw","Pt","So" ],
		dayNamesMin: [ "N","Pn","Wt","Sr","Cz","Pt","So" ],
		weekHeader: "Tydz",
		dateFormat: "dd.mm.yy",
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ""
	};

	$.datepicker.regional.pt =
	{
		closeText: "Fechar",
		prevText: "Anterior",
		nextText: "Seguinte",
		currentText: "Hoje",
		monthNames: [ "Janeiro","Fevereiro","Mar�o","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro" ],
		monthNamesShort: [ "Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez" ],
		dayNames: [ "Domingo","Segunda-feira","Ter�a-feira","Quarta-feira","Quinta-feira","Sexta-feira","S\u00E1bado" ],
		dayNamesShort: [ "Dom","Seg","Ter","Qua","Qui","Sex","S\u00E1b" ],
		dayNamesMin: [ "Dom","Seg","Ter","Qua","Qui","Sex","S\u00E1b" ],
		weekHeader: "Sem",
		dateFormat: "dd/mm/yy",
		firstDay: 0,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ""
	};
});
