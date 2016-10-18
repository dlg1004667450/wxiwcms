function loadjsupload() {

	s = '';
	s += '<div id="jsupload" style="display:none; position:absolute; z-index:100000;">';
	s += '<div style="width: 210px;"><form><table cellspacing="0" cellpadding="0" width="100%" style="text-align: center;">';
	s += '<tr><td colspan="2"><input type="file" name="UploadFile" id="upload" onchange="js_upload();"></td></tr>';
	s += '<tr><td colspan="2" id="progressNumber"></td></tr>';
	s += '<tr id="hourminute" class="pns"><td></td><td><button type="button" class="pn" onclick="closejsupload(event);"><em>关闭</em></button></td></tr>';
	s += '</table></form></div></div>';

	if (BROWSER.ie && BROWSER.ie < 7) {

		s += '<iframe id="jsuploadiframe" frameborder="0" style="display:none;position:absolute;filter:progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0)"></iframe>';

	}

	var div = document.createElement('div');

	div.innerHTML = s;

	$('append').appendChild(div);
}
function js_upload() {

	var fd = new FormData();
	var file = document.getElementById('upload').files[0];
	if (file) {
		fd.append("UploadFile", file);
		var xhr = new XMLHttpRequest();
		xhr.upload.addEventListener("progress", uploadProgress, false);
		xhr.addEventListener("load", uploadComplete, false);
		xhr.addEventListener("error", uploadFailed, false);
		xhr.addEventListener("abort", uploadCanceled, false);
		xhr.open("POST", "http://127.0.0.1/wjhxzf/admin/qeditor/logo_upload");
		xhr.send(fd);
	}
}

function closejsupload(event) {

	$('jsupload').style.display = 'none';

	if (BROWSER.ie && BROWSER.ie < 7) {

		$('jsuploadiframe').style.display = 'none';

	}

}
function showjsupload(event, controlid) {
	loadjsupload();

	var p = fetchOffset(controlid);

	$('jsupload').style.display = 'block';

	$('jsupload').style.left = p['left'] + 'px';

	$('jsupload').style.top = (p['top'] + 24) + 'px';

	doane(event);
}

/** *************************************js 无刷新上传******************************* */
function fileSelected() {
	var file = document.getElementById('fileToUpload').files[0];
	if (file) {
		var fileSize = 0;
		if (file.size > 1024 * 1024)
			fileSize = (Math.round(file.size * 100 / (1024 * 1024)) / 100)
					.toString()
					+ 'MB';
		else
			fileSize = (Math.round(file.size * 100 / 1024) / 100).toString()
					+ 'KB';

		document.getElementById('fileName').innerHTML = 'Name: ' + file.name;
		document.getElementById('fileSize').innerHTML = 'Size: ' + fileSize;
		document.getElementById('fileType').innerHTML = 'Type: ' + file.type;
	}
}

function uploadProgress(evt) {
	if (evt.lengthComputable) {
		var percentComplete = Math.round(evt.loaded * 100 / evt.total);
		document.getElementById('progressNumber').innerHTML = percentComplete
				.toString()
				+ '%';
	} else {
		document.getElementById('progressNumber').innerHTML = 'unable to compute';
	}
}

function uploadComplete(evt) {
	/* This event is raised when the server send back a response */
	//alert(evt.target.responseText);	
	var data = eval('(' + evt.target.responseText + ')');
	var obj = document.getElementById('pic');
	if(obj){
		obj.value = data.url;
		closejsupload(event);
	}	
}

function uploadFailed(evt) {
	alert("There was an error attempting to upload the file.");
}

function uploadCanceled(evt) {
	alert("The upload has been canceled by the user or the browser dropped the connection.");
}