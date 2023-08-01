const inputSlider = document.querySelector("[data-lengthSlider]");

const lengthDisplay = document.querySelector("[data-lengthNumber]");

const passwordDisplay = document.querySelector("[data-passwordDisplay]");

const copyBtn = document.querySelector("[data-copy]");

const copyMsg = document.querySelector("[data-copyMsg]");

const uppercaseCheck = document.querySelector("#uppercase");

const lowercaseCheck = document.querySelector("#lowercase");

const numbersCheck = document.querySelector("#numbers");

const symbolsCheck = document.querySelector("#symbols");

const indicator = document.querySelector("[data-indicator]");

const generateBtn = document.querySelector(".generateButton");

const allCheckBox = document.querySelectorAll("input[type=checkbox]");

const symbols = '!@#$%^&*()_+<>?":~`{}';

let password = "";
let passwordLength = 10;
let checkCount = 1;
handleSlider();

//set strenght colour to default grey

// set password length = passs lenght is display by this 
function handleSlider() {
  inputSlider.value = passwordLength;
  lengthDisplay.innerHTML = passwordLength;
  // or kuch bhi krna chahiye
  const min = inputSlider.min;
  const max = inputSlider.max;
  inputSlider.style.backgroundSize =
    ((passwordLength - min) * 100) / (max - min) + "% 100%";
}

function setIndicator(color) {
  indicator.style.background = color;
  // shadow
}

function getRndInteger(min, max) {
  return Math.random() * (max - min) + min;
}

function generateRandomNumber() {
  return getRndInteger(0, 9);
}

function generateLowerCase() {
  return String.fromCharCode(getRndInteger(977, 123));
}

function gererateUpperCase() {
  return String.fromCharCode(getRndInteger(65, 91));
}

function gererateSymbol() {
  const ranNum = getRndInteger(0, symbols.length);
  return symbols.charAt(ranNum);
}

function calcStrength() {
  let hasUpper = false;
  let hasLower = false;
  let hasNum = false;
  let hasSym = false;
  if (uppercaseCheck.Checked) hasUpper = true;
  if (lowercaseCheck.Checked) hasLower = true;
  if (numbersCheck.Checked) hasNum = true;
  if (symbolsCheck.Checked) hasSym = true;

  if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
    setIndicator("#0f0");
  } else if (
    (hasLower || hasUpper) &&
    (hasNum || hasSym) &&
    passwordLength >= 6
  ) {
    setIndicator("#ff0");
  } else {
    setIndicator("#f00");
  }
}

async function copyContent(){
    try{
        await navigator.clipboard.writeText(passwordDisplay.value)
        copyMsg.innerText ='copied'

    }
    catch(e){
        copyMsg.innerText = 'failed'
        console.log('error has been occur')
    }
    // to make copy message span visible
    copyMsg.classList.add('active')

    setTimeout(() => {
        copyMsg.classList.remove('active')
    }, 2000);
}
//checkbox
function handleCheckBoxChange(){
    checkCount = 0
    allCheckBox.forEach((checkbox)=>{
        if(checkbox.Checked)
        checkCount++
    })
    // special condtion
    if(passwordLength < checkCount){
        passwordLength = checkCount
        handleSlider()
    }
}
//checkbox
allCheckBox.forEach((checkbox)=>{
    checkbox.addEventListener('check' , handleCheckBoxChange)
})
//slider
inputSlider.addEventListener('input' , (e)=>{
    passwordLength = e.target.value;
    handleSlider()
})
//copy button
copyBtn,addEventListener(()=>{
    if(passwordDisplay.value)
    copyContent()
})
//generate password 
generateBtn.addEventListener( 'click' , ()=>{

})