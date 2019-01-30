
//set up the database



  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCLMkRPJMDqLrPSI89hB_n2sOz_SWGCEME",
    authDomain: "train-scheduler-33c5e.firebaseapp.com",
    databaseURL: "https://train-scheduler-33c5e.firebaseio.com",
    projectId: "train-scheduler-33c5e",
    storageBucket: "train-scheduler-33c5e.appspot.com",
    messagingSenderId: "1060283539159"
  };


firebase.initializeApp(config);

// Create a variable to reference the database.
var database = firebase.database();

// var EmployeeName = database.ref();


$("#add-row").on("click", function (event) {
    // Don't refresh the page!
    event.preventDefault();

    // YOUR TASK!!!
    // Code in the logic for storing and retrieving the most recent user.
    // Don't forget to provide initial data to your Firebase database.
    TrainName = $("#InputTrainName").val().trim();
    TrainDestination = $("#InputDestination").val().trim();
    TrainTime = $("#InputTrainTime").val().trim();
    TrainFrequency = $("#InputFrequency").val().trim();

    //this should not be the set method- want to instead use the push method

    database.ref().push({
        Name: TrainName,
        Destination: TrainDestination,
        Time: TrainTime,
        Frequency: TrainFrequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });

    $("#inputName4").val("Name");
    $("#inputRole4").val("Role");
    $("#date-input").val("2000-01-01");
    $("#pay-input").val(0);

});

//when you're accessing the database... use this to make sure the data is being inputted correctly....
//instead of using the "value" you use "child-added" which creates a new object
database.ref().on("child_added", function (snapshot) {

    // Log everything that's coming out of snapshot
    console.log(snapshot.val());
    console.log(snapshot.val().EmployeeName);
    console.log(snapshot.val().StartDate);
    console.log(snapshot.val().Role);
    console.log(snapshot.val().Pay);

    // Change the HTML to reflect the new row added to the database
    //This should work for every child the same way... it can't jhust target the same IDs each time
    var dateCalc = moment(snapshot.val().StartDate).format('YYYYMMDD');
    console.log(dateCalc);
    debugger;

    $("#myTable").append("<tr>" + "<td>" + snapshot.val().EmployeeName + "</td>" + "<td>" + snapshot.val().Role + "</td>" + "<td>" + snapshot.val().StartDate + "</td>" + "<td>0</td>" + "<td>" + snapshot.val().Pay + "</td>" + "<td>0</td>" + "</tr>");


    // Handle the errors
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});

function pushData() {

};



