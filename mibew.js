(function(){
	
	var a = document.createElement("a");
	var div = document.createElement("div");
	var img_1 = document.createElement("img");
	var img_2 = document.createElement("img");
	var img_3 = document.createElement("img");

	a.className = "chat_bottom";
	a.href = window.location.origin + "chat/client.php?locale=pt-br&amp;style=silver";
	a.target = "_blank";
	a.addEventListener('click',function(){
		if(navigator.userAgent.toLowerCase().indexOf('opera') != -1 && window.event.preventDefault) window.event.preventDefault();
		this.newWindow = window.open(window.location.origin+&#039;chat/client.php?locale=pt-br&amp;style=silver&amp;url=&#039;+escape(document.location.href)+&#039;&amp;referrer=&#039;+escape(document.referrer), 'mibew', 'toolbar=0,scrollbars=0,location=0,status=1,menubar=0,width=640,height=480,resizable=1');this.newWindow.focus();this.newWindow.opener=window;return false;
	});

	div.className = "tp_chat";
	img_1.className = "clone_bln";
	img_1.src = window.location.origin + "chat/images/close_baloom.png";

	img_2.src = window.location.origin + "chat/images/tp_chat.png";

	img_3.src = window.location.origin + "chat/b.php?i=customizada&lang=pt-br";
	img_3.width = 241;
	img_3.height = 35;

	div.appendChild(img_1);
	div.appendChild(img_2);
	a.appendChild(div);
	a.appendChild(img_3);
	document.getElementsByTagName('body')[0].appendChild(a);
	console.info(a);
	console.info('done');
})();