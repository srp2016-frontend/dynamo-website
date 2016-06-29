///<reference path='plotting.ts'/>
function handle_hover_person(person : Person) 
{
    $("#sidebar").empty();
    $("#sidebar").append("<b>First Name: </b>", person.fName, "<br>");
    $("#sidebar").append("<b>Last Name:  </b>", person.lName, "<br>");
    $("#sidebar").append("<b>Age: </b>", person.age, "<br>");
    //$("#sidebar").append(person.age);
}

