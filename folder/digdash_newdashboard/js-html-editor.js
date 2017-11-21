function initHtmlEditor(id, jsListener)
{
	if (tinyMCE.get(id) != null)
	{
		closeHtmlEditor(id);
	}

	tinyMCE.init({
		selector: '#' + id,
		language: ddCtrl.ddLang,
		elementpath: false,
		relative_urls: true,
		convert_urls: false,
		image_advtab: true,
		remove_script_host : false,
		allow_script_urls: true,

		menubar: 'insert format table',

		plugins: ['autoresize advlist autolink lists link image charmap print preview hr anchor pagebreak',
		          'searchreplace visualblocks visualchars code',
		          'insertdatetime media nonbreaking save table contextmenu directionality', 'emoticons template paste textcolor colorpicker textpattern imagetools'],
		toolbar1: 'styleselect | fontselect fontsizeselect | bold underline italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image media | forecolor backcolor emoticons code',
		toolbar_items_size: 'small',

		valid_elements : "*[*]",
		extended_valid_elements : "*[*]",

		setup : function(editor)
		{
			editor.on('keyup', function (e)
			{
				if (jsListener != null)
				{
					jsListener();
				}
			});
			editor.on('change', function (e)
			{
				if (jsListener != null)
				{
					jsListener();
				}
			});
		}
	});
}

function initHtmlEditorInline(id, jsListener)
{
	if (tinyMCE.get(id) != null)
	{
		closeHtmlEditor(id);
	}

	tinyMCE.init({
		selector: '#' + id,
		language: ddCtrl.ddLang,
		theme: 'inlite',
		elementpath: false,
		relative_urls: true,
		convert_urls: false,
		inline: true,
		paste_data_images: true,

		plugins: ['advlist autolink lists link image charmap print preview hr anchor pagebreak',
		          'searchreplace visualblocks visualchars code',
		          'insertdatetime media nonbreaking save table contextmenu directionality', 'emoticons template paste textcolor colorpicker textpattern imagetools'],
		insert_toolbar: 'quickimage quicktable',
		selection_toolbar: 'bold italic | quicklink h2 h3 blockquote',

		setup : function(editor)
		{
			editor.on('keyup', function (e)
			{
				if (jsListener != null)
				{
					jsListener();
				}
			});
			editor.on('change', function (e)
			{
				if (jsListener != null)
				{
					jsListener();
				}
			});
		}
	});
}

function closeHtmlEditor(id)
{
	tinyMCE.remove('#' + id);
}
