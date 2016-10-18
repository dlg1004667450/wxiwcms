function dc() {
	var num = parseInt($("chanum").value);
	if( num > 20)
	{
		num = 20;
	}
	var common = parseInt($("chacommon").value);
	var one = parseInt($("chaone").value);
	// alert( num + "----" +common+ "----" + one);
	var y = $("www").value;
	var A, B;
	A = one;
	B = formatStr(y, one) + '<br>';
	for ( var i = 1; i <= num - 1; i++) {
		A += common;
		var v = formatStr(y, A);
		B += v + '<br>';
	}
	return B;
}
function db() {
	var num = parseInt($("binum").value);
	if( num > 20)
	{
		num = 20;
	}
	var common = parseInt($("bicommon").value);
	var one = parseInt($("bione").value);
	// alert( num + "----" +common+ "----" + one);
	var y = $("www").value;
	var A;
	A = one;
	B = formatStr(y, one) + '<br>';
	for ( var i = 1; i <= num - 1; i++) {
		A = common * A;
		var v = formatStr(y, A);
		B += v + '<br>';
	}
	return B;
}

function cj_test(title) {
	msg = '<ul class="tb tb_s cl">';
		
	if(document.getElementById("optype_dengcha").checked)
	{
		msg += dc();
	}else{
		msg += db();
	}		
	msg += '</ul>';
	// 'confirm', 'notice', 'info', 'right','alert'
	
	showDialog(msg, 'info', title);
}
var id;
function cj_del_db(id,title) {
	this.id = id;
	msg = '<ul class="tb tb_s cl">';		
	msg += '<li>你真的要清空数据吗？</li>';		
	msg += '<li>删除后不可恢复!!</li>';		
	msg += '</ul>';
	// 'confirm', 'notice', 'info', 'right','alert'
	showDialog(msg, 'confirm', title,cktest,'','','','是的','取消');
}
function cktest()
{

	var temp=this.id;
    var x = new Ajax("HTML");
	var url = SITEURL + 'admin/cj/article/del_db';
	 x.post(url,'id='+temp,function(s){ 
		 window.location.href = SITEURL + 'admin/cj/article';
	 }); 
}
var ids;
function cj_del_img_db(id,title) {
	this.id = id;
	msg = '<ul class="tb tb_s cl">';		
	msg += '<li>你真的要清空数据吗？</li>';		
	msg += '<li>删除后不可恢复!!</li>';		
	msg += '</ul>';
	// 'confirm', 'notice', 'info', 'right','alert'
	showDialog(msg, 'confirm', title,cktestimg,'','','','是的','取消');
}
function cktestimg()
{

	var temp=this.id;
    var x = new Ajax("HTML");
	var url = SITEURL + 'admin/cj/img/del_db';
	 x.post(url,'id='+temp,function(s){ 
		 window.location.href = SITEURL + 'admin/cj/img';
	 }); 
}
function uper(str) {
	if (IsURL(str) == false) {
		alert("输入的URL格式错误");
	} else {
		var listconment = $("code");
		listconment.value = str;
	}
}

function upperCase() {
	var y = $("www").value;
	if (y == "" || IsURL(y) == false) {
		alert("输入的URL格式错误");
	} else {
		var chkObjs = document.getElementsByName("a_bi");
		for ( var i = 0; i < chkObjs.length; i++) {
			if (chkObjs[i].checked) {
				var v = chkObjs[i].value;
				if (v == "1") {
					dc();
				} else {
					db();
				}
				break;
			}
		}
	}
}
function IsURL(str_url) {
	var strRegex = "^((https|http|ftp|rtsp|mms)?://)";
	var re = new RegExp(strRegex);
	// re.test()
	if (re.test(str_url)) {
		return (true);
	} else {
		return (false);
	}
}
function Isture(str) {
	var regex = /\(\*\)/ig; // 创建正则表达式对象
	var array = regex.exec(str);
	if (array) {
		return (true);
	} else {
		return (false);
	}
}
function formatStr(str, A) {
	str = str.replace(/\(\*\)/ig, A);
	return str + "\n";
}
function insertAtCursor(myField, myValue) {
	var myField = $(myField);
	if (document.selection) {
		myField.focus();
		sel = document.selection.createRange();
		sel.text = myValue;
		sel.select();
	} else if (myField.selectionStart || myField.selectionStart == '0') {
		var startPos = myField.selectionStart;
		var endPos = myField.selectionEnd;
		// save scrollTop before insert
		var restoreTop = myField.scrollTop;
		myField.value = myField.value.substring(0, startPos) + myValue
				+ myField.value.substring(endPos, myField.value.length);
		if (restoreTop > 0) {
			// restore previous scrollTop
			myField.scrollTop = restoreTop;
		}
		myField.focus();
		myField.selectionStart = startPos + myValue.length;
		myField.selectionEnd = startPos + myValue.length;
	} else {
		myField.value += myValue;
		myField.focus();
	}
}
function insertAtCursordate(myField, myValue) {
	var myField = $(myField);
	myField.value = myValue;
	myField.focus();
}
function sortsubmit() {
	var temp = document.getElementById("myform");
	var sort = document.getElementById("sort");
	var sort_start = document.getElementById("sort_start");
	var sort_end = document.getElementById("sort_end");
	if (sort.value == "") {
		alert('请选择字段');
		return;
	}
	if (sort_start.value == "") {
		alert('替换前不能为空');
		return;
	}
	temp.submit();
}
function onsubmitz() {
	var temp = document.getElementById("myform");
	var listconment = document.getElementById("listconment");
	var www = document.getElementById("www");
	var uid = document.getElementsByName("uid");
	for ( var i = 0; i < uid.length; i++) {
		if (uid[i].checked) {
			var uidv = uid[i].value;
			break;
		}
	}
	if (uidv == 1) {
		if (listconment.value == "") {
			alert('单条网址输入不符合要求');
			return;
		}
	} else if (uidv == 3) {
		y = www.value;
		if (y == "" || IsURL(y) == false || Isture(y) == false) {
			alert('地址格式输入不符合要求');
			return;
		}
	}
	temp.submit();
}
/** *******tab 类 start********************** */
var tabLinks = new Array();
var contentDivs = new Array();

function init() {

	var tabListItems = document.getElementById('tabs').childNodes;
	for ( var i = 0; i < tabListItems.length; i++) {
		if (tabListItems[i].nodeName == "LI") {
			var tabLink = getFirstChildWithTagName(tabListItems[i], 'A');
			var id = getHash(tabLink.getAttribute('href'));
			tabLinks[id] = tabLink;
			contentDivs[id] = document.getElementById(id);
		}
	}

	var i = 0;

	for ( var id in tabLinks) {
		tabLinks[id].onclick = showTab;
		tabLinks[id].onfocus = function() {
			this.blur()
		};
		if (i == 0)
			tabLinks[id].className = 'j_tab  current_tab';
		i++;
	}
	var i = 0;

	for ( var id in contentDivs) {
		if (i != 0)
			contentDivs[id].className = 'tabContent hide';
		i++;
	}
}

function showTab() {
	var selectedId = getHash(this.getAttribute('href'));

	// Highlight the selected tab, and dim all others.
	// Also show the selected content div, and hide all others.
	for ( var id in contentDivs) {
		if (id == selectedId) {
			tabLinks[id].className = 'j_tab  current_tab';
			contentDivs[id].className = 'tabContent';
		} else {
			tabLinks[id].className = '';
			contentDivs[id].className = 'tabContent hide';
		}
	}
	return false;
}

function getFirstChildWithTagName(element, tagName) {
	for ( var i = 0; i < element.childNodes.length; i++) {
		if (element.childNodes[i].nodeName == tagName)
			return element.childNodes[i];
	}
}

function getHash(url) {
	var hashPos = url.lastIndexOf('#');
	return url.substring(hashPos + 1);
}
/** *******tab 类 end********************** */
