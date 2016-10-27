$(document).ready(function(){
	console.log("ready");
	// var $container = $('#gallery'); jQuery way
	var gallery = document.querySelector('#gallery'),
		imgs = document.querySelectorAll('img'),
		name = document.querySelector('#name');
	console.log(imgs);

	function updateText(content){
		name.innerHTML = content;
	}

	function requestContent(file){
		$('#content').load(file + ' #content');
	}

	function removeCurrentClass(){
		for(var i = 0; i < imgs.length; i++){
			imgs[i].classList.remove('current');
		}
	}

	function addCurrentClass(elem){
		removeCurrentClass();
		var element = document.querySelector("#" + elem);
		element.classList.add('current');
	}


	//on click
	gallery.addEventListener('click', function(e){
		if(e.target != e.currentTarget){
			e.preventDefault();
			// e.target is img inside link clicked
			var data = e.target.getAttribute('data-name'),
				url = data + ".php";
			// console.log(data + "|" + url);
			addCurrentClass(data);
			history.pushState(data, null, url);
			updateText(data);
			requestContent(url);
			document.title = "GoT | " + data;
		}
		e.stopPropagation();
	}, false);

	//listens for back/forward button
	window.addEventListener('popstate', function(e){
		var selected = e.state;
		
		//not selected
		if(selected == null){
			removeCurrentClass();
			content.innerHTML = "";
			name.innerHTML = "";
			document.title = "GoT";
		} else{
			updateText(selected);
			requestContent(selected + ".php");
			addCurrentClass(selected);
			// content.innerHTML = "change p content";
			document.title = "GoT | " + selected;
		}
	});
});