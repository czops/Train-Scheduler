
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
        DateAdded: firebase.database.ServerValue.TIMESTAMP
    });

    // Refresh the entries
    $("#TrainNameInput").val("Thomas");
    $("#InputDestination").val("Kingdom Come");
    // $("#TrainTime").val("--:-- AM/PM");
    $("#TrainFrequency").val(0);

});

//when you're accessing the database... use this to make sure the data is being inputted correctly....
//instead of using the "value" you use "child-added" which creates a new object
database.ref().on("child_added", function (snapshot) {

    // Log everything that's coming out of snapshot
    console.log(snapshot.val());
    console.log(snapshot.val().Name);
    console.log(snapshot.val().Destination);
    console.log(snapshot.val().Time);
    console.log(snapshot.val().Frequency);

    // Change the HTML to reflect the new row added to the database
    //This should work for every child the same way... it can't jhust target the same IDs each time
    // var dateCalc = moment(snapshot.val().StartDate).format('YYYYMMDD');
    // console.log(dateCalc);
    // debugger;

    $("#myTable").append("<tr>" + "<td>" + snapshot.val().Name + "</td>" + "<td>" + snapshot.val().Destination + "</td>" + "<td>" + snapshot.val().Time + "</td>" + "<td>" + snapshot.val().Frequency + "</td>" + "</tr>");


    // Handle the errors
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});

function pushData() {

};



