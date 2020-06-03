const MAX_ITERS = 3;

// Assignment Code
var generateBtn = document.querySelector("#generate");
var charTypes = ["lowercase", "uppercase", "numerals", "specialChars"];
var selectedCharTypes = [false, false, false, false];

function generateNextCharType(fromCharType) {
  
  nextCharType = fromCharType;

  for (var i = (charTypes.indexOf(fromCharType) + 1) % charTypes.length;  charTypes[i] != fromCharType; i = (i + 1) % (charTypes.length)) {
    console.log("generateNextCharType = " + i);
 
    if (selectedCharTypes[i] == true) {
      nextCharType = charTypes[i];
      break;
    }
  }

  return nextCharType;
}

function generatePassword() {

  // password criteria prompts
  var iteration = 0;
  while (true) {
    var passwordLength = parseInt(prompt("what is the length of your desired password?"));
    
    console.log(passwordLength);
  
    if (isNaN(passwordLength) || ((passwordLength < 8) || (passwordLength > 128)))  {
      alert("The password length must be at least 8 characters and no more than 128 characters.");
    }
    else {
      break;
    }
  
    if (++iteration == MAX_ITERS) {
      alert("Too many tries, exiting!");
      return "";
    }

    console.log(iteration);
  }
  

  iteration = 0;
  while (true) {
    selectedCharTypes[charTypes.indexOf("lowercase")] = confirm("should lowercase characters be used?");
    selectedCharTypes[charTypes.indexOf("uppercase")] = confirm("should uppercase characters be used?");
    selectedCharTypes[charTypes.indexOf("numerals")] = confirm("should numerals be used?");
    selectedCharTypes[charTypes.indexOf("specialChars")] = confirm("should special characters be used?");

    console.log(selectedCharTypes);

    if (selectedCharTypes == [false, false, false, false]) {
      alert("At least one character type has to be selected!");
    }
    else {
      break;
    }

    if (++iteration == MAX_ITERS) {
      alert("Too many tries, exiting!");
      return "";
    }

    console.log(iteration);
  }

  //generate password
  var alphabet = ("abcdefghijklmnopqrstuvwxyz").split('');
  
  var password = "";
  var newChar = "";

  var nextCharType = "lowercase";

  for (var i = 0; i < passwordLength; i++) {
    nextCharType = generateNextCharType(nextCharType);
    console.log(nextCharType);

    switch (nextCharType) {
      case "lowercase": {
        newChar = alphabet[Math.floor(Math.random() * alphabet.length)];
        break;
      }
      case "uppercase": {
        newChar = (alphabet[Math.floor(Math.random() * alphabet.length)]).toUpperCase();
        break;
      }
      case "numerals": {
        newChar = Math.floor(Math.random() * 10);
        break;
      }
      case "specialChars": {
        newChar = String.fromCharCode(0x20 + Math.floor(Math.random() * (0x2F - 0x20 + 1)));
        break;
      }
    }

    console.log(newChar);
    password += newChar;

  }

  return password;
}

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);










