function validateform()                                    
{ 
    var fname = document.forms["myform"]["fname"]; 
    var lname = document.forms["myform"]["lname"];               
    var email = document.forms["myform"]["email"];  
    var password = document.forms["myform"]["password"];    
    var con = document.forms["myform"]["con"];  
    var dob = document.forms["myform"]["dob"]
    if (fname.value == "")                                  
    { 
        window.alert("Please enter your first name.");
        return false; 
    } 
   if (lname.value == "")                                  
    { 
        window.alert("Please enter your last name."); 
        return false; 
    }
       if (email.value == "")
    {
         window.alert("Please enter an email id");
         return false;
    }
    var emailPattern = "/[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,4}$/";
    var test = emailPattern.test(email);
    if  (test==false)
    {
        window.alert("Please enter a valid email id.");
        return false;
     }
    if (password.value == "")                        
    { 
        window.alert("Please enter your password.");  
        return false; 
    } 
    if (password.value.length < 6)                        
    { 
        window.alert("Password should be atleast 6 charaters long."); 
        return false; 
    } 
    if (dob.value == "")                        
    { 
        window.alert("Please enter your Birthdate."); 
        return false; 
    } 
     if (con.value == "")                           
     { 
        window.alert("Please enter your contact number."); 
        return false; 
    }
      var pattern= "/^(\([0-9]{3}\)\s*|[0-9]{3}\-)[0-9]{3}-[0-9]{4}$/";
      var test = pattern.test(con);
      if  (test==false)
      {
        window.alert("Please enter a valid contact number.");
        return false;
      }
   if(con.value.length != 10) 
   {
    window.alert("Phone number must be 10 digits.");
    return false;
    }   
    return true; 
}
