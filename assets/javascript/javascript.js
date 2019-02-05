
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


$("#add-row").on("click", function (event) {
    // Don't refresh the page!
    event.preventDefault();

    // YOUR TASK!!!
    // Code in the logic for storing and retrieving the most recent user.
    // Don't forget to provide initial data to your Firebase database.
    TrainName = $("#InputTrainName").val().trim();
    TrainDestination = $("#InputDestination").val().trim();
    FirstTrainTime = $("#InputFirstTrainTime").val().trim();
    TrainFrequency = $("#InputFrequency").val().trim();
    //do calculations
    NextTrain = moment().startOf(FirstTrainTime).fromNow();
    // NextTrain = moment(FirstTrainTime).startOf().fromNow();
    console.log(NextTrain);

    //this should not be the set method- want to instead use the push method

    database.ref().push({
        Name: TrainName,
        Destination: TrainDestination,
        FirstTime: FirstTrainTime,
        Frequency: TrainFrequency,
        DateAdded: firebase.database.ServerValue.TIMESTAMP
        // NextTrain: 
    });

    // Refresh the entries
    $("#TrainNameInput").val("");
    $("#InputDestination").val();
    // $("#FirstTrainTime").val("--:-- AM/PM");
    $("#TrainFrequency").val();

});

//when you're accessing the database... use this to make sure the data is being inputted correctly....
//instead of using the "value" you use "child-added" which creates a new object
database.ref().on("child_added", function (snapshot) {

    // Log everything that's coming out of snapshot
    console.log(snapshot.val());
    console.log(snapshot.val().Name);
    console.log(snapshot.val().Destination);
    console.log(snapshot.val().FirstTime);
    console.log(snapshot.val().Frequency);

    // Change the HTML to reflect the new row added to the database
    //This should work for every child the same way... it can't just target the same IDs each time

    // var TimeElapsedCalc = moment(snapshot.val().FirstTime).startOf('minute').fromNow();
    // console.log(TimeElapsedCalc);

    // var NextTrain = moment().startOf(FirstTime).fromNow();
    // console.log(NextTrain);



    $("#myTable").append("<tr>" + "<td>" + snapshot.val().Name + "</td>" + "<td>" + snapshot.val().Destination + "</td>" + "<td>" + snapshot.val().Frequency + "</td>" + "<td>" + snapshot.val().FirstTime + "</td>" + "</tr>");


    // Handle the errors
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});



//call the time to update
// database.ref().onUpdate() = {

//     $("#myTable").append("<tr>" + "<td>" + snapshot.val().Name + "</td>" + "<td>" + snapshot.val().Destination + "</td>" + "<td>" + snapshot.val().Frequency + "</td>" + "<td>" + snapshot.val().FirstTime + "</td>" + "</tr>");

// }

function pushData() {

};

//What's left:
// getTime of first Train 1:00 pm -> 13:00 … 
// Moment.JS needs Military time

// 	Frequency = 15 min
// from 13:00 onwards... there is a train every is min
// 		Next Arrival = PreviousArrival + 15 min
// 	TimetUntilNextTrain = NextArrival - TimeNow
// ---> Display these


