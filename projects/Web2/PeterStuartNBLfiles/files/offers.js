window.addEventListener('load', function () { //runs on load to call functions when page is loaded 
	"use strict";


	// get offers html js part

	const URL_Offers = 'getOffers.php'; //constant variable is set to the php file given

	const fetchOffersHTML = function () {
		fetch(URL_Offers) //fetches this url
			.then(//then do this...
				function (response) {
					return response.text(); // returns the response this function gives as text
				})
			.then(//then do this...
				function (text) {
					console.log(text); //logs this response in console, mainly used for troubleshooting
					document.getElementById("offers").innerHTML = text; //sets the value in index.php's element "offers" to the value of the given text from the response
				}
			)
			.catch( //if something goes wrong
				function (err) {
					console.log("Error with HTML offers function", err); //error function output in the console, used for troubleshooting
				});
	}

	fetchOffersHTML(); //fetch function on page load
	setInterval(fetchOffersHTML, 5000); //fetch function every 5000 ms/ 5 seconds 


	// get offers json js part

	const URL_Offers_JSON = URL_Offers + '?useJSON';  //constant variable is set to the php file given concatenated with ?useJSON, to access the JSON format

    const fetchOffersJSON = function () {
		fetch(URL_Offers_JSON) //fetches this url
            .then( //then do this...
                function (response) {
                    const contentType = response.headers.get('Content-Type'); // get the section Content-Type from the headers of the request
                    if (contentType.includes('application/json')) { //if this contains application/json then it is a JSON format
                        return response.json(); //return the response as JSON
                    }       
                }).then( //then do this...

                    function (json) {
						let html = "<p> &#8220;" + json.bookTitle + "&#8220; </p>"; //let html variable = the book title received concatenated between speech marks like the html function produces
						html += "<p>Category: " + json.catDesc + "</p>"; //add on the description with concatenation
						html += "<p>Price: " + json.bookPrice + "</p>"; //add on the price with concatenation
                        document.getElementById("JSONoffers").innerHTML = html; //set JSONoffers aside html to this html
					}
                )

			.catch( //if something goes wrong
                function (err) {
					console.log("Error with JSON offers function", err); //error function output in the console, used for troubleshooting
                });
    }

	fetchOffersJSON(); // fetch this function only once on page load

});