
/*## Exercise 20:
In our name app, add the field "age" in the html, using the dob property in the database. 
We will not store the age property in the database.*/

var getAge = function(dob){
  var birthday = new Date(dob);
  var today = new Date();
  var diff = today - birthday;
  //var timeElapsed = dob.getDate();
  diff = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
  return "age: " + diff; 
};

var shortDate = function(dob){
  //var birthday = (new Date(dob)).toLocaleDateString(); // need to fix for UTC
  var birthday = new Date(dob); // need to fix for UTC
  //04/09/2016
  birthday = (birthday.getMonth() + 1) + "/" + (birthday.getDate()) + "/" + (birthday.getFullYear());
  return birthday;
};

var emailLink = function(emailString){
  //<a href="mailto:emailstring">emailstring</a>
  return '<a href="mailto:' + emailString + '">' + emailString + '</a>';
};

var formatAsTable = function(allNames){
  //console.log(allNames);
  var tableHeader = "<table class='table table-striped table-bordered table-hover table-sm'><thead class='thead-inverse'><tr> <th>Name</th> <th>Birthday</th> <th>Age</th> <th>Email</th> </tr></thead>";
  var personRow ="";
  allNames.forEach((person)=>{
    //console.log("PERON!", person);
    personRow += "<tr><td>" + person.name + "</td><td>" + shortDate(person.birthday) + "</td> <td>" + getAge(person.birthday) + "</td><td>" + emailLink(person.email) + "</td></tr>";
  });
  var tableFooter = "</table>";
  return tableHeader + personRow + tableFooter;
};
 

var formatAsCards = function(allNames) {
  console.log(allNames);
  var p1 = '<div class="card-columns">';
  var personRow = '';
  allNames.forEach((person)=>{
    personRow += '<div class="card">';
    
    if (person.imgurl !== undefined) {
      personRow += '<img class="card-img-top" src="'+ person.imgurl +'" alt="'+ person.name +'"/>';
    }
    personRow += '<div class="card-body">';

    personRow += '<h4 class="card-title">'+ person.name +'</h4>';
    personRow += '<p class="card-text">'+ person.starredIn.join(", ") +'</p>';

    personRow += '<footer class="blockquote-footer"><small class="text-muted">'+ shortDate(person.dob) +' (' + getAge(person.dob) + ') </small></footer>';
     
    personRow += '</div></div>';
  });
  var p3 = "</div>";

  return p1 + personRow + p3;
}