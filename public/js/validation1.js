function validateform()                                    
{ 
    var fname = document.forms["myform"]["fname"].value; 
    var lname = document.forms["myform"]["lname"].value;               
    var email = document.forms["myform"]["email"].value;  
    var password = document.forms["myform"]["password"].value;    
    var con = document.forms["myform"]["con"].value;  
    var dob = document.forms["myform"]["dob"].value;
    if (fname == "")                                  
    { 
        window.alert("Please enter your first name.");
        return false; 
    } 
   if (lname == "")                                  
    { 
        window.alert("Please enter your last name."); 
        return false; 
    }
       if (email == "")
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
    if (password == "")                        
    { 
        window.alert("Please enter your password.");  
        return false; 
    } 
    if (password.length < 6)                        
    { 
        window.alert("Password should be atleast 6 charaters long."); 
        return false; 
    } 
    if (dob == "")                        
    { 
        window.alert("Please enter your Birthdate."); 
        return false; 
    } 
     if (con == "")                           
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
   if(con.length != 10) 
   {
    window.alert("Phone number must be 10 digits.");
    return false;
    }   
    return true; 
}
