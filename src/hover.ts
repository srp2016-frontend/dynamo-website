///<reference path='plotting.ts'/>
function handle_hover_person(person : Person) 
{
    $("#sidebar").append("First Name: ", person.fName, "<br>");
    $("#sidebar").append("Last Name:  ", person.lName, "<br>");
    $("#sidebar").append("Age:      &nbsp", person.age, "<br>");
    //$("#sidebar").append(person.age);
}