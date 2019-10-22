function validateform() {
   var email = document.forms["myform"]["email"];
   var password = document.forms["myform"]["password"];
   var emailPattern = "/[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,4}$/";
   var test = emailPattern.test(email);
   if (email.value == "") {
      window.alert("Please enter an email id");
      return false;
   }
   if (!test) {
      window.alert("Please enter a valid email id");
      return false;
   }
   if (password.value == "") {
      window.alert("Please enter your password");
      return false;
   }
   if (password.value.length < 6) {
      window.alert("Password should be atleast 6 characters long");
      return false;
   }
   return true;
}