import * as FileSaver from 'file-saver';

const jodit = Jodit.make('#editor', {
	uploader: {
		url: 'https://xdsoft.net/jodit/finder/?action=fileUpload'
	},
	filebrowser: {
		ajax: {
			url: 'https://xdsoft.net/jodit/finder/'
		}
	},
	height: '800px',
	language: 'ru',
	config: {
		readonly: false, // all options from https://xdsoft.net/jodit/doc/
		events: {
			afterInit: instance => {
				editor = instance;
			}
		}
	},
	extraButtons: [
		{
			name: 'insertDate',
			iconURL: 'http://xdsoft.net/jodit/logo.png',
			exec: function (editor) {
				let content = editor.s.html;
				editor.selection.insertHTML(
					`<span class="selected-json">${content}</span>`
				);
			}
		},
		{
			name: 'retake',
			iconURL: 'http://xdsoft.net/jodit/logo.png',
			exec: function (editor) {
				const template =
					'{{data.elementName if data.elementName else ‘’}}';
				let json_file = { data: {} };
				let listOfSelected =
					document.querySelectorAll('.selected-json');
				Array.from(listOfSelected).map(
					elem => (json_file.data[elem.innerText] = '')
				);
				let blob = new Blob([JSON.stringify(json_file)], {
					type: 'text/plain;charset=utf-8'
				});
				FileSaver.saveAs(blob, 'data.json');

				for (let i = 0; i < listOfSelected.length; i++) {
					list[i].innerHTML = template;
				}
			}
		}
	]
});
