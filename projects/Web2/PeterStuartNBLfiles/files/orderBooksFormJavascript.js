window.addEventListener('load', function () { //only ran on load of the window to keep script data safe
	"use strict";


	const l_form = document.getElementById('orderForm');  //set the form variable to a constant so its easy to call

	let l_deliveryCharge = 0; //initialise delivery total to 0
	let l_total = 0; //initialise total to 0, this also prevents the user from booking while no books are selected

	l_form.onchange = calculateTotal;  //calculate the total cost every time the user interacts with the form
	l_form.submit.onclick = checkForm;  //check the forms validation once the user submits the form
	l_form.termsChkbx.onclick = termsFunction; //when the T&Cs button is clicked it runs the function to either enable or disable the submit button
	l_form.onclick = customerType; //check if the user is a customer or trade and show the correct input boxes on click


	function calculateTotal() {
		l_total = 0;
		; //set total to 0 so the calculations do not overlap
		const l_books = l_form.querySelectorAll('.item'); //get an array of the books from item class
		const l_booksCount = l_books.length; //get the length of the array and set this to a variable

		for (let t_i = 0; t_i < l_booksCount; t_i++) { //for loop through each book with that variable
			const t_book = l_books[t_i]; //get the current book in the loop
			const t_checkbox = t_book.querySelector('input[data-price][type=checkbox]'); //check if every book has been checked


			if (t_checkbox.checked) {  //check every book that is checked
				l_total += parseFloat(t_checkbox.dataset.price); //take those books prices and add it to the total

			}

		}


		const l_delivery = l_form.querySelectorAll('input[name=deliveryType]'); //delivery variable is equal to the one ticked
		const l_deliveryCount = l_delivery.length; //count how many methods of delivery there are

		for (let l_i = 0; l_i < l_deliveryCount; l_i++) { //for loop through every delivery type
			const t_radionElem = l_delivery[l_i]; //set each to a variable t_radionElem
			if (t_radionElem.checked) { //check if they're checked
				l_deliveryCharge = parseFloat(t_radionElem.dataset.price); //set the delivery charge to that method's price
			}

		}
		l_form.total.value = (l_total + l_deliveryCharge).toFixed(2); // display the total of books + delivery charge
	}



	function checkForm(_evt) //check form for validation
	{

		alert("checking form"); //inform user of form check
		let l_formErrors = false; //no errors at form start		
		
		if (!l_form.forename.value && !l_form.companyName.value) { //if no forename or company input
			alert("Please enter a forename or company name");
			l_formErrors = true; //set error to true so the form cannot be submitted
		}

		if (!l_form.surname.value && !l_form.companyName.value) { //if no surname or company input
			alert("Please enter a surname or company name");
			l_formErrors = true; //set error to true so the form cannot be submitted
		}

		if (l_total == 0) { //if there is no total then no book would have been chosen
			alert("Please select at least one book");
			l_formErrors = true; //set error to true so the form cannot be submitted	 	
		}

		if (l_formErrors) { // if there are errors
			_evt.preventDefault(); //prevent the forms default action of sending its data
		}

		//this is to run instead of the preset form action in the orderBooksForm.php given to us because this actually sends the form and furthermore tells the user that the form was SUCCESSFUL
		else if (!l_formErrors) //if there are no errors in the form
		{
			alert("Form Submitted Successfully"); //alert the user that they have submitted a valid form
		}

	}


	//this function deals with if the user has selected whether they are a customer or trade
	function customerType() {
		const l_retDetails = document.getElementById("retCustDetails"); //constant variable of if they select customer from the list. RETAIL
		const l_trdDetails = document.getElementById("tradeCustDetails"); //constant variable of if they select retail from the list. TRADE

		const l_select = document.querySelector('select'); //find the dropdown list for customer type and it to a constant variable
		const l_customerOptions = l_select.querySelectorAll('option'); //find the options for customer types and set them to a constant variable

		for (let t_i = 0; t_i < l_customerOptions.length; t_i++) { //for loop searching through the all the options in the select tag
			if (l_customerOptions[t_i].selected) { //if one of them if selected then...
				let t_customerSelected = l_customerOptions[t_i].value; //let customerSelected be equal to the value of the option that is selected

				if (t_customerSelected == "ret") { //if that value is ret then the user will be a customer so the style visibility of the customer input box for forename and surname is unchanged but the trade input box is set to hidden
					l_retDetails.style.visibility = '';
					l_trdDetails.style.visibility = 'hidden';
				}

				else if (t_customerSelected == "trd") { //if that value is trd then the user will be part of a trade organisation so the style visibility of the trade input box is unchanged but the customer input box for forename and surname is set to hidden
					l_retDetails.style.visibility = 'hidden';
					l_trdDetails.style.visibility = '';
				}

				else { //if neither are selected then they are both set to hidden so no data can be falsely input
					l_retDetails.style.visibility = 'hidden';
					l_trdDetails.style.visibility = 'hidden';
				}
			}
		}

	}

	function termsFunction(_evt) //function requiring the user to first check the T&Cs box to access the order button
	{
		const l_checkBox = l_form.termsChkbx;	//checkbox of the T&Cs
		const l_termsText = document.getElementById('termsText'); //agree text of the T&Cs
		let l_button = l_form.submit; //book now button

		if (l_checkBox.checked == true) //if the checkbox is checked 
		{
			l_termsText.style.color = "black"; //set the T&Cs text color to black
			l_termsText.style.fontWeight = "normal"; //set the T&Cs font to normal weight
			l_button.disabled = false; //enable the book button
		}
		else //if the checkbox is not checked 
		{
			l_termsText.style.color = "red"; //set the T&Cs text color to red
			l_termsText.style.fontWeight = "bold"; //set the T&Cs font to bold
			l_button.disabled = true; //disable the book button
		}
	}


});

