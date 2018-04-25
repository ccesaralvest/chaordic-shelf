var getJson = function () {
    var tagScript = document.createElement('script');
    var shelfJson = 'http://roberval.chaordicsystems.com/challenge/challenge.json?callback=X';
    
    tagScript.src = shelfJson;

    window.X = function(jsonData){
    	window.jsonData = jsonData;

    	console.log(jsonData);
    };

    document.getElementsByTagName('head')[0].appendChild(tagScript);
}

getJson();
