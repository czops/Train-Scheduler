
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

    debugger;
    // YOUR TASK!!!
    // Code in the logic for storing and retrieving the most recent user.
    // Don't forget to provide initial data to your Firebase database.
    TrainName = $("#InputTrainName").val().trim();
    TrainDestination = $("#InputDestination").val().trim();
    FirstTrainTime = $("#InputFirstTrainTime").val().trim();
    TrainFrequency = $("#InputFrequency").val().trim();
    console.log(TrainName);
    console.log(TrainDestination);
    console.log(FirstTrainTime);
    console.log(TrainFrequency);

    debugger;
    //

    //This doesn't do anything


    // Refresh the entries
    $("#TrainNameInput").val("");
    $("#InputDestination").val();
    // $("#FirstTrainTime").val("--:-- AM/PM");
    $("#TrainFrequency").val();
    //





    debugger;
    //getting moment to figure out the next train time
    // Assumptions
    var tFrequency = moment(TrainFrequency, "minutes");
    console.log(tFrequency._i);

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(FirstTrainTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency._i;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency._i - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    // add an if statement here to check if the first train time has passed or not. If it has, use what's here, if it hasn't, use moment to output the difference between now and the first train time

    if (moment(FirstTrainTime, "HH:mm") > moment()) {
        var NextTrain = moment(FirstTrainTime, "HH:mm").add(tMinutesTillTrain, "HH:mm");
        tMinutesTillTrain = moment(moment(FirstTrainTime, "HH:mm").subtract(moment(),"minutes"));
        console.log("ARRIVAL TIME: " + moment(NextTrain).format("HH:mm"));
    } else {
        var NextTrain = moment().add(tMinutesTillTrain, "minutes");
        console.log("ARRIVAL TIME: " + moment(NextTrain).format("HH:mm"));
    }




    //this should not be the set method- want to instead use the push method
    debugger;
    database.ref().push({
        Name: TrainName,
        Destination: TrainDestination,
        FirstTime: FirstTrainTime,
        Frequency: TrainFrequency,
        NextTrainTime: moment(NextTrain).format("hh:mm"),
        MinutesAway: tMinutesTillTrain,
        DateAdded: firebase.database.ServerValue.TIMESTAMP
    });

});

debugger;
//when you're accessing the database... use this to make sure the data is being inputted correctly....
//instead of using the "value" you use "child-added" which creates a new object
database.ref().on("child_added", function (snapshot) {

    // Log everything that's coming out of snapshot
    console.log(snapshot.val());
    console.log(snapshot.val().Name);
    console.log(snapshot.val().Destination);
    console.log(snapshot.val().FirstTime);
    console.log(snapshot.val().NextTrainTime);
    console.log(snapshot.val().Frequency);
    console.log(snapshot.val().MinutesAway);

    // Change the HTML to reflect the new row added to the database
    //This should work for every child the same way... it can't just target the same IDs each time

    // var TimeElapsedCalc = moment(snapshot.val().FirstTime).startOf('minute').fromNow();
    // console.log(TimeElapsedCalc);

    // var NextTrain = moment().startOf(FirstTime).fromNow();
    // console.log(NextTrain);



    $("#myTable").append("<tr>" + "<td>" + snapshot.val().Name + "</td>" + "<td>" + snapshot.val().Destination + "</td>" + "<td>" + snapshot.val().Frequency + "</td>" + "<td>" + snapshot.val().NextTrainTime + "</td>" + "<td>" + snapshot.val().MinutesAway + "</td>" + "</tr>");


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


