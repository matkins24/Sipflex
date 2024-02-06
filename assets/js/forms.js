// Plan select variables
const planContainer = document.querySelector('#plan-container');

// Plan details and Buttons

const home = {
    type: 'home',
    button: document.querySelector('#home-plan-button'),
    details: ' \
    <div id="plan-container" class="plan-container"> \
    <select name="home_plan" id="plan-choice"> \
      <option value="Happy Camper - £5 per month">Happy Camper - £4 / month</option> \
      <option value="National Pride - £9 per month">National Pride - £9 / month</option> \
      <option value="Global Takeover - £13 per month">Global Takeover - £13 / month</option> \
    </select> \
    <p>Phone numbers & additional users can be added later<p/> \
    </div>'
}

const business = {
    type: 'business',
    button: document.querySelector('#business-plan-button'),
    details: ' \
    <div id="plan-container" class="plan-container"> \
    <select name="business_plan" id="plan-choice"> \
      <option value="Pay As You Go - £5 per month">Pay As You Go - £5 / month</option> \
      <option value="All Rounder - £10 per month">All Rounder - £10 / month</option> \
      <option value="Business Unlimited - £15 per month">Business Unlimited - £15 / month</option> \
    </select> \
    <p>Phone numbers & additional users can be added later<p/> \
    </div>'
}

const number = {
    type: 'number',
    button: document.querySelector('#number-plan-button'),
    details: ' \
    <div id="plan-container" class="plan-container"> \
    <select name="number_plan" id="plan-choice"> \
      <option value="UK Phone Number - £2 per month">UK Phone Number - £2 / month</option> \
      <option value="International Phone Number - £5 per month">International Phone Number - £5 / month</option> \
      <option value="0800 Number - £9 per month">0800 Number - £8 / month</option> \
      <option value="UK Virtual Number - £0 per month">Free UK Virtual Number - £0 / month</option> \
    </select> \
    <p>Additional phone numbers can be added later</p> \
    </div>'
}

// Run when page is loaded
// Set the default plan for the page
const defaultPlan = location.search.substring(1);

let planType;
let planNumber;

if (defaultPlan.length > 0) {
    planType = defaultPlan.split('-')[0];
    planNumber = defaultPlan.split('-')[1];
}

if (planType != 'home' || planType != 'business' || planType != 'number') {
    planType = 'home'
    planNumber = 1;
}

// clickPlanButton(eval(planType)); // FIND ALTERNATIVE
// const planSelect = document.querySelector('#plan-choice');
// planSelect.options.selectedIndex = planNumber - 1;


// Function to change types 

function clickPlanButton(plan) {
    const planList = ['home', 'business', 'number'];
    removePlan = planList.indexOf(plan.type);
    planList.splice(removePlan,1);
    remainder1 = eval(planList[0]);
    remainder2 = eval(planList[1]);

    planContainer.innerHTML = plan.details;
    plan.button.classList.add('filter-active');
    remainder1.button.classList.remove('filter-active');
    remainder2.button.classList.remove('filter-active');
}


// Plan Select click events
// home.button.addEventListener('click', function () {
//     clickPlanButton(home);
// })

// business.button.addEventListener('click', function () {
//     clickPlanButton(business);
// })

// number.button.addEventListener('click', function () {
//     clickPlanButton(number);
// })



// Stepper controls

let stepCounter = 0;

// Stepper buttons
const nextButton = document.querySelector('#stepper-next');
const prevButton = document.querySelector('#stepper-prev');
const submitButton = document.querySelector('#stepper-submit');
const stepCounterDisplay = document.querySelector('#step-counter');
const step = document.querySelectorAll('.steps');
const formSubmitted = document.querySelector('.signup-success');
const allButtons = document.querySelector('.all-buttons');
const signupTitle = document.querySelector('.signup-title');
const emailConfirmation = document.querySelector('#email_confirmation');

nextButton.addEventListener('click', function () {
    stepButtonClicked(stepCounter, stepCounter + 1)
    checkNextButtonEnabled(stepCounter + 1);
})

prevButton.addEventListener('click', function () {
    stepButtonClicked(stepCounter, stepCounter - 1)
    checkNextButtonEnabled(stepCounter + 1);
})

submitButton.addEventListener('click', function () {
    step[3].classList.add('hidden');
    allButtons.classList.add('hidden');
    signupTitle.classList.add('hidden');
    formSubmitted.classList.remove('hidden');
    emailConfirmation.innerText = emailInput.value;
})

function stepButtonClicked(currentStep, nextStep) {
    step[currentStep].classList.add('hidden');
    step[nextStep].classList.remove('hidden');

    stepCounter = nextStep;
    stepCounterDisplay.textContent = stepCounter + 1;

    if (nextStep > 0) {
        prevButton.classList.remove('not-seen');

        if (stepCounter === 3) {
            nextButton.classList.add('hidden');
            submitButton.classList.remove('hidden');
            signupTitle.classList.add('hidden');
            printSummary();
        } else {
            nextButton.classList.remove('hidden');
            signupTitle.classList.remove('hidden');
            submitButton.classList.add('hidden');
        }
    } else {
        prevButton.classList.add('not-seen');
    }

}


function printSummary() {
    planChoice = document.querySelector('#plan-choice');
    summary = document.querySelector('#form-summary');

    var companyName = 'Not Applicable';
    var agentCodePrint = 'Not Applicable';

    if (companyNameInput.value.length > 0) {
        companyName = companyNameInput.value;
    }

    if (agentCode.value.length > 0) {
        agentCodePrint = agentCode.value;
    }
    
    html = ' \
    <h4>Plan Summary</h4> \
    <table> \
    <tr> \
        <td class="summary-label">Plan Name:<td/> <td>SIP Trunking Plan<td/> \
    <tr/> \
    <tr> \
        <td class="summary-label">Name: <td/> <td>' + firstNameInput.value + ' ' + lastNameInput.value + '<td/> \
    <tr/> \
    <tr> \
        <td class="summary-label">Company: <td/> <td>' + companyName + '<td/> \
    <tr/> \
    <tr> \
        <td class="summary-label">Email: <td/> <td>' + emailInput.value + '<td/> \
    <tr/> \
    <tr> \
        <td class="summary-label">Phone: <td/> <td>' + phoneNumberInput.value + '<td/> \
    <tr/> \
    <tr> \
    <td class="summary-label">Agent Code: <td/> <td>' + agentCodePrint + '<td/> \
    <tr/> \
    <tr> \
        <td class="summary-label">Address: <td/> <td>' + streetNumberInput.value + ' ' + streetNameInput.value + ', ' + suburbInput.value +'<td/> \
    <tr/> \
    <tr> \
        <td class="summary-label"><td/> <td>' + cityInput.value + ' ' + postcodeInput.value + ', ' + countryInput.value +'<td/> \
    <tr/> \
    <table/> \
    '

    // <tr> \
    //     <td class="summary-label"><td/> <td>' + cityInput.value + '<td/> \
    // <tr/> \
    // <tr> \
    //     <td class="summary-label"><td/> <td>' + countryInput.value + '<td/> \
    // <tr/> \

    summary.innerHTML = html;
}

// Recaptcha 

const personalName = document.querySelector('#name');
const personalEmail = document.querySelector('#email');

if (personalName.value.length > 0 || personalEmail.value.length > 0) {
    console.log("SPAMMER!")
}

function onSubmit(token) {
     document.querySelector("#recaptcha").submit();
}


// Form Validation


// Input declarations

const emailInput = document.querySelector('#email_address');
const emailInputRepeated = document.querySelector('#email_repeated');
const termsCheckbox = document.querySelector('#terms_checkbox');
const firstNameInput = document.querySelector('#first_name');
const lastNameInput = document.querySelector('#last_name');
const companyNameInput = document.querySelector('#company_name');
const phoneNumberInput = document.querySelector('#phone_number');
const passwordInput = document.querySelector('#password');
const passwordInputRepeated = document.querySelector('#password_repeated');
const streetNumberInput = document.querySelector('#street_number');
const streetNameInput = document.querySelector('#street_name');
const suburbInput = document.querySelector('#suburb');
const cityInput = document.querySelector('#city');
const postcodeInput = document.querySelector('#postcode');
const countryInput = document.querySelector('#country');
const agentCode = document.querySelector('#agent_code');

const declaredInputs = {
    1: ['email_address', 'email_repeated', 'terms_checkbox'],
    2: ['first_name', 'last_name', 'phone_number', 'password', 'password_repeated'],
    3: ['street_number', 'street_name', 'city', 'postcode', 'country']
}


//Create clone of declared inputs for reference purposes
const requiredInputs = JSON.parse(JSON.stringify(declaredInputs));

// Alerts Selected
const alertBox = document.querySelectorAll('.alert-box')
var emailInputCount = 0;
var phoneInputCount = 0;
var passwordInputCount = 0;


// PAGE 1

// Check whether the button should be enabled
checkNextButtonEnabled(1);

// Set country input as valid since it is already selected by default
checkRequired(countryInput.id, 'valid');


// Pattern Matches
const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,25})+$/;
const phoneFormat = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{3,9}$/;
const passwordFormat = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
const streetNameFormat = /^[^\s]{1,}(\s[^\s]{2,})+$/;
const postCodeFormat = /^.{3,}$/;


// Reset error message when attempting to update mistake
emailInput.addEventListener('input', function() {
    this.value = this.value.toLowerCase();
    
    if(this.value.match(emailFormat)) {
        if (this.value === emailInputRepeated.value) {
            alertValid(emailInput, emailInputRepeated);
            checkRequired(emailInput.id, 'valid');
            checkRequired(emailInputRepeated.id, 'valid');
        } else {
            alertValid(emailInput);
            checkRequired(emailInput.id, 'valid');
            checkRequired(emailInputRepeated.id, 'invalid');
        }
    } else {
        resetError(emailInput);
        checkRequired(emailInput.id, 'invalid');
    }
        // emailInputCount = 0;
    
})

// Check that email is valid and that both email fields match
emailInputRepeated.addEventListener('input', function() {
    this.value = this.value.toLowerCase();

    if(this.value.match(emailFormat)) {
        if (this.value === emailInput.value) {
            alertValid(emailInput, emailInputRepeated);
            checkRequired(emailInputRepeated.id, 'valid');
            checkRequired(emailInput.id, 'valid');
        } else {
            resetError(emailInputRepeated);
            checkRequired(emailInputRepeated.id, 'invalid');
        }
        
    } else {
        resetError(emailInputRepeated);
        checkRequired(emailInputRepeated.id, 'invalid');
    }
})

termsCheckbox.addEventListener('input', function() {
    if (this.checked === true) {
        checkRequired(this.id, 'valid');
    } else {
        checkRequired(this.id, 'invalid');
    }
})

function alertValid(input1, input2) {
    input1.style.backgroundColor = '#f6f6f6'
    if (!input2 == false) {
        input2.style.backgroundColor = '#f6f6f6'
    }    
}

function checkNextButtonEnabled (page) {

    if (page <= Object.keys(declaredInputs).length) {
        const tempArray = requiredInputs[page];
    
        if (tempArray.length === 0){
            toggleButton(nextButton, 'enable');
        } else {
            toggleButton(nextButton, 'disable');
        }
    }
}

// Find and add/remove required input from page array
function checkRequired(input, action) {
    let pages = Object.keys(requiredInputs);
    let originalPages = Object.keys(declaredInputs);
    let tempArray;
    let updatedArray;

    if (action === 'invalid') {

        originalPages.forEach((page) => {
            for (let key = 0; key <= declaredInputs[page].length; key++) {
                
                if (input === declaredInputs[page][key]) {
                    tempArray = requiredInputs[page];
                    var addInput = true;
                    
                    tempArray.forEach((tempKey) => {
                        if (input === tempKey) {
                            addInput = false;
                        }
                    })

                    if (addInput === true) {
                        tempArray.splice([key],0, `${input}`);
                        requiredInputs[page] = tempArray;
                    }
                    updatedArray = requiredInputs[page];
                }
            }
        })

    } else {
        pages.forEach((page) => {
            for (let key = 0; key <= requiredInputs[page].length; key++) {
                if (input === requiredInputs[page][key]) {
                    tempArray = requiredInputs[page];
                    tempArray.splice([key],1);
                    requiredInputs[page] = tempArray;
                    updatedArray = requiredInputs[page];
                }
                
            }
            
        })
    }

    // Check if all required inputs have been completed for the page and allow/disable buttons accordingly
    
    if (updatedArray === undefined) {
        return
    }

    if (updatedArray.length > 0) {
        toggleButton(nextButton, 'disable')
    } else {
        toggleButton(nextButton, 'enable')
    }
}



// Enable or disable a button
function toggleButton(button, action) {

    if (action === 'enable') {
        button.style.pointerEvents = ''
        button.style.opacity = '100%'
    } else if (action === 'disable') {
        button.style.pointerEvents = 'none'
        button.style.opacity = '50%'
    }
}

// Alert user to a problem
function alertErrorMsg(type, msg, input) {
    
    if (type === "email" || type === "password") {
        alertBox.innerText = `${msg}`;
    }
    input.style.borderColor = '#F55A4E';
    input.style.boxShadow = '0 0 5px #F55A4E';
}

// Reset all error alert
function resetError(input, alert) {
    input.style.borderColor = '';
    input.style.boxShadow = '';
    input.style.placeholder = '';
    input.style.backgroundColor = '';

    if (alert != null) {
        alert.innerText = '';
    }
}



// PAGE 2

firstNameInput.addEventListener('change', function(){
    if (this.value.length === 0) {
        this.style.backgroundColor = '#ffc6c4';
    }
})

firstNameInput.addEventListener('input', function() {
    if (this.value.length > 0) {
        alertValid(this);
        checkRequired(this.id, 'valid');
    } else {
        resetError(this);
        checkRequired(this.id, 'invalid');
    }
} )

lastNameInput.addEventListener('change', function(){
    if (this.value.length === 0) {
        this.style.backgroundColor = '#ffc6c4';
    }
})

lastNameInput.addEventListener('input', function() {
    if (this.value.length > 0) {
        alertValid(this);
        checkRequired(this.id, 'valid');
    } else {
        resetError(this);
        checkRequired(this.id, 'invalid');
    }
} )

companyNameInput.addEventListener('input', function() {
    if (this.value.length > 0) {
        alertValid(this);
    }
} )

phoneNumberInput.addEventListener('change', function(){
    if (!this.value.match(phoneFormat)) {
        this.style.backgroundColor = '#ffc6c4';
    }
})

phoneNumberInput.addEventListener('input', function(){

    if (this.value.match(phoneFormat)) {
        alertValid(this);
        checkRequired(this.id, 'valid');
    }
    else {
        resetError(this);
        checkRequired(this.id, 'invalid');
    }

})

passwordInput.addEventListener('input', function() {
    if (this.value.match(passwordFormat)) {
        resetError(this, alertBox[1]);
        alertValid(this);
    } else {
        resetError(this);
    }

    if (this.value.match(passwordFormat)) {
        if(this.value === passwordInputRepeated.value) {
            alertValid(this, passwordInputRepeated);
            checkRequired(this.id, 'valid');
            checkRequired(passwordInputRepeated.id, 'valid');
        } else {
            resetError(passwordInputRepeated);
            checkRequired(this.id, 'invalid');
            checkRequired(passwordInputRepeated.id, 'invalid');
            if (passwordInputRepeated.value.length > 0) {
                passwordInputRepeated.style.backgroundColor = '#ffc6c4';
                alertBox[1].innerHTML = '<p>Passwords do not match</p>';
            }

        }
    }
     
})

passwordInput.addEventListener('change', function(){
    if (this.value.match(passwordFormat)) {
        resetError(this, alertBox[1]);
        alertValid(this);
    } else {
        this.style.backgroundColor = '#ffc6c4';
        alertBox[1].innerHTML = '<p>Password must contain at least:<ul><li>8 characters</li><li>one upper case letter</li><li>one lower case letter</li><li>one number</li><li>one special character</li></ul></p>'
    }
})

passwordInputRepeated.addEventListener('input', function() {

    if(passwordInput.value.match(passwordFormat)) {
        if (this.value === passwordInput.value) {
            alertValid(this, passwordInput);
            checkRequired(this.id, 'valid');
            checkRequired(passwordInput.id, 'valid');
            alertBox[1].innerHTML = '';
        } else {
            resetError(passwordInputRepeated);
            checkRequired(this.id, 'invalid');
            checkRequired(passwordInput.id, 'invalid');
        }
    }
    
})

passwordInputRepeated.addEventListener('change', function(){
    if (passwordInput.value.match(passwordFormat)) {
        if (this.value === passwordInput.value) {
            alertValid(this);
        } else {
            this.style.backgroundColor = '#ffc6c4';
            alertBox[1].innerHTML = '<p>Passwords do not match</p>';
        }
    } 
})

// Page 3

streetNumberInput.addEventListener('change', function(){
    if (this.value.length === 0) {
        this.style.backgroundColor = '#ffc6c4';
    }
})

streetNumberInput.addEventListener('input', function() {
    if (this.value.length > 0) {
        alertValid(this);
        checkRequired(this.id, 'valid');
    } else {
        resetError(this);
        checkRequired(this.id, 'invalid');
    }
} )

streetNameInput.addEventListener('change', function(){
    if (!this.value.match(streetNameFormat)) {
        this.style.backgroundColor = '#ffc6c4';
    }
})

streetNameInput.addEventListener('input', function() {
    if (this.value.match(streetNameFormat)) {
        alertValid(this);
        checkRequired(this.id, 'valid');
    } else {
        resetError(this);
        checkRequired(this.id, 'invalid');
    }
} )


suburbInput.addEventListener('input', function() {
    if (this.value.length > 0) {
        alertValid(this);
    }
} )

cityInput.addEventListener('change', function(){
    if (this.value.length === 0) {
        this.style.backgroundColor = '#ffc6c4';
    }
})

cityInput.addEventListener('input', function() {
    if (this.value.length > 0) {
        alertValid(this);
        checkRequired(this.id, 'valid');
    } else {
        resetError(this);
        checkRequired(this.id, 'invalid');
    }
} )

postcodeInput.addEventListener('change', function(){
    if (!this.value.match(postCodeFormat)) {
        this.style.backgroundColor = '#ffc6c4';
    }
})

postcodeInput.addEventListener('input', function() {
    if (this.value.match(postCodeFormat)) {
        alertValid(this);
        checkRequired(this.id, 'valid');
    } else {
        resetError(this);
        checkRequired(this.id, 'invalid');
    }
} )

countryInput.addEventListener('change', function(){
    if (this.value.length === 0) {
        this.style.backgroundColor = '#ffc6c4';
    }
})

countryInput.addEventListener('input', function() {
    if (this.value.length > 0) {
        alertValid(this);
        checkRequired(this.id, 'valid');
    } else {
        resetError(this);
        checkRequired(this.id, 'invalid');
    }
} )

// Recaptcha

differentCaptcha = document.querySelector('#different-captcha');
captchaImg = document.querySelector('#captcha');
captchaInput = document.querySelector('#captcha-input');

differentCaptcha.addEventListener('click', function () {
    captchaImg.src = 'https://tel2.co.uk/securimage/securimage_show.php?' + Math.random();
    return false;
})