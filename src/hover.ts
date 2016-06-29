///<reference path='plotting.ts'/>
function handle_hover_person(person : Person) 
{
    $("#sidebar").empty();
    $("#sidebar").append("First Name: ", person.fName, "<br>");
    $("#sidebar").append("Last Name:  ", person.lName, "<br>");
    $("#sidebar").append("Age: ", person.age, "<br>");
    //$("#sidebar").append(person.age);
}