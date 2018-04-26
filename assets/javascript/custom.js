var jsonData;

var getJson = function () {
    var tagScript = document.createElement('script');
    var shelfJson = 'http://roberval.chaordicsystems.com/challenge/challenge.json?callback=X';
    
    tagScript.src = shelfJson;

    window.X = function(jsonData){
    	window.jsonData = jsonData;
		createProcuctRecommendation();
		createProductReference();
		slider();
    };

    document.getElementsByTagName('head')[0].appendChild(tagScript);
}

var createProcuctRecommendation = function() {

	var productRecommendation =  jsonData.data.recommendation;
	
	for(var i = 0; i < productRecommendation.length; i++) {

		var productName = productRecommendation[i].name;
		var productURL = productRecommendation[i].detailUrl;
		var productImageUrl = productRecommendation[i].imageName;
		var productOldPrice = productRecommendation[i].oldPrice;

	

		var productPrice = productRecommendation[i].price;

		// calc installments
		var productInstallmentsPrice = productPrice.replace(',', '.').replace('R$', '');
		var calcInstallments = productInstallmentsPrice / 12;
		var calcInstallments = calcInstallments.toFixed(2);
		var productInstallmentsPriceFinal = calcInstallments.toString().replace('.', ',');

		// creating content html product
		if (productOldPrice == null) {
			var htmlProductRecomendation = '<div class="product-content">'+						
								'<a href="'+ productURL +'" class="details product-thumbnail">'+	
									'<img src="https://'+ productImageUrl +'">'+
								'</a>'+
						
								'<div class="product-details">'+
									'<a href="'+ productURL +'" class="details product-name">'+	
										'<p>'+ productName +'</p>'+
									'</a>'+

									'<a href="'+ productURL +'" class="details product-prices">'+
										'<p class="price">Por: <span>'+ productPrice +'<span></p>'+
										'<p class="installments-price">ou 12X de R$ '+ productInstallmentsPriceFinal +' <span>sem juros</span></p>'+
									'</a>'+
								'</div>'+
							'</div>';	
		} else {
			var htmlProductRecomendation = '<div class="product-content">'+						
								'<a href="'+ productURL +'" class="details product-thumbnail">'+	
									'<img src="https://'+ productImageUrl +'">'+
								'</a>'+
						
								'<div class="product-details">'+
									'<a href="'+ productURL +'" class="details product-name">'+	
										'<p>'+ productName +'</p>'+
									'</a>'+

									'<a href="'+ productURL +'" class="details product-prices">'+
										'<p class="old-price">De: '+ productOldPrice +'</p>' +
										'<p class="price">Por: <span>'+ productPrice +'</span></p>'+
										'<p class="installments-price">ou 12X de R$ '+ productInstallmentsPriceFinal +' <span>sem juros</span></p>'+
									'</a>'+
								'</div>'+
							'</div>';	
		}
		

		// product append in front
		var productRecomendation = document.getElementById('recomendation-item');								
		productRecomendation.innerHTML += htmlProductRecomendation;
	}	
}

var createProductReference = function() {

	var productReference =  jsonData.data.reference.item;

	var productName = productReference.name;
	var productURL = productReference.detailUrl;
	var productImageUrl = productReference.imageName;
	
	var productOldPrice = productReference.oldPrice;
	
	// if( !productReference.oldPrice === null) {
	// 	var productOldPrice = productReference.oldPrice;
	// }
	var productPrice = productReference.price;	


	// calc installments
	var productInstallmentsPrice = productPrice.replace(',', '.').replace('R$', '');
	var calcInstallments = productInstallmentsPrice / 12;
	var calcInstallments = calcInstallments.toFixed(2);
	var productInstallmentsPriceFinal = calcInstallments.toString().replace('.', ',');

	// creating content html product
	var htmlProductReference = '<div class="product-content">'+						
							'<a href="'+ productURL +'" class="details product-thumbnail">'+	
								'<img src="https://'+ productImageUrl +'">'+
							'</a>'+
					
							'<div class="product-details">'+
								'<a href="'+ productURL +'" class="details product-name">'+	
									'<p>'+ productName +'</p>'+
								'</a>'+

								'<a href="'+ productURL +'" class="details product-prices">'+
									'<p class="old-price">De: '+ productOldPrice +'</p>' +

									'<p class="price">Por: <span>'+ productPrice +'</span></p>'+
									'<p class="installments-price">ou 12X de R$'+ productInstallmentsPriceFinal +' <span>sem juros</span></p>'+
								'</a>'+
							'</div>'+
						'</div>';
	
	// product append in front	
	var productReference = document.getElementById('reference-item');								
	productReference.innerHTML += htmlProductReference;
}

var slider = function(){
	var carrouselWraper = document.querySelector('.carrousel-wrapper');
	var arrowLeft = document.querySelector('#arrow-left');
	var arrowRight = document.querySelector('#arrow-right');
	var screenWidth = window.screen.availWidth;
	if(screenWidth > 768 ){    
		count = 0;
		arrowLeft.addEventListener("click", function(e) {
		    count++;
			
			    carrouselWraper.style.left = count * 286 + 'px';
			    if (count > -2) {
			        arrowRight.style.display = 'block';
			    }
			    if (count >= 0) {
			        arrowLeft.style.display = 'none';
			    }

		});

		arrowRight.addEventListener("click", function(e) {
		    count--;
		    carrouselWraper.style.left = count * 286 + 'px';
		    if (count < 0) {
		        arrowLeft.style.display = 'block';
		    }
		    if (count <= - 4) {
		        arrowRight.style.display = 'none';
		    }
		});
	} else {
		count = 0;
		arrowLeft.addEventListener("click", function(e) {
		    count++;
			
			    carrouselWraper.style.left = count * 256 + 'px';
			    if (count > -2) {
			        arrowRight.style.display = 'block';
			    }
			    if (count >= 0) {
			        arrowLeft.style.display = 'none';
			    }

		});

		arrowRight.addEventListener("click", function(e) {
		    count--;
		    carrouselWraper.style.left = count * 256 + 'px';
		    if (count < 0) {
		        arrowLeft.style.display = 'block';
		    }
		    if (count <= - 5) {
		        arrowRight.style.display = 'none';
		    }
		});
	}
}

getJson();
