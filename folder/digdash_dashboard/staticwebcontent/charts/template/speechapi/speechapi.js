SpeechRec = function(obj)
{
	this.sr = obj.SpeechRecognition
			|| obj.webkitSpeechRecognition
			|| obj.mozSpeechRecognition
			|| obj.msSpeechRecognition
			|| obj.oSpeechRecognition;
}

SpeechRec.prototype.isAvailable = function()
{
	return (this.sr != null);
}

SpeechRec.prototype.start = function(inputId, listener)
{
	var rec = new this.sr();
	rec.maxAlternatives = 1;
//	rec.continuous = false
	rec.lang = 'fr-FR';

	rec.onstart = function()
	{
		if (listener)
		{
			listener("start");
		}
	};

	rec.onerror = function(event)
	{
//		alert("error");
		switch (event.error)
		{
		case 'network':
			break;
		case 'not-allowed':
		case 'service-not-allowed':
			// if permission to use the mic is denied, turn off auto-restart
			autoRestart = false;
			break;
		}
	};

	rec.onend = function()
	{
		if (listener)
		{
			listener("end");
		}
	};

	rec.onresult = function(event)
	{
		// Map the results to an array
		var SpeechRecognitionResult = event.results[event.resultIndex];
		var results = [];
		setInput(inputId, SpeechRecognitionResult[0].transcript);
		for (var k = 0; k < SpeechRecognitionResult.length; k++)
		{
			results[k] = SpeechRecognitionResult[k].transcript;
		}
		if (listener)
		{
			listener("result");
		}
	};

	rec.start();
}

var sr = new SpeechRec(window);

function setInput(inpID, txt)
{
	var inp = document.getElementById(inpID);
	if (inp != null)
	{
		inp.value = txt;
	}
}
