// The $(document).ready() method is used to make sure that all the function are available
// after the document is fully loaded. Whatever inside .ready() will be executed
// after ducument is loaded.
$(document).ready(function() {

    // This is an array of animals that will be used to produce
    // buttons.
    var animals = [
      "dog", "cat", "rabbit", "hamster", "skunk", "goldfish",
      "bird", "ferret", "turtle", "sugar glider", "chinchilla",
      "hedgehog", "hermit crab", "gerbil", "pygmy goat", "chicken",
      "capybara", "teacup pig", "serval", "salamander", "frog"
    ];
    
    // This fuction creates and populates button on the document.
    // This function takes in three different parameters; the array
    // to make animal buttons, the class for buttons, and at which 
    // place to put buttons on the document.
    function populateButtons(arrayToUse, classToAdd, areaToAddTo) {
        // if there are pictures of animals from previous call, it
        // erases those pictures before adding new animal pictures.
        $(areaToAddTo).empty();

        // For loop for accessing each of values in the animals array
        for (var i = 0; i < arrayToUse.length; i++) {
            // Creating a button html element and store it
            // into the variable named "a"
            var a = $("<button>");
            
            // adding class to the variable "a"
            a.addClass(classToAdd);
            
            // adding "data-type" attribute corresponds to
            // each of the animals from the arrayToUse parameter
            a.attr("data-type", arrayToUse[i]);
            
            // gives a text to the button corresponds to
            // each of values in the "animals" array
            a.text(arrayToUse[i]);
            
            // adding the button to the corresponding div place
            // in the html document
            $(areaToAddTo).append(a);
        }
  
    }
    
    // This line creates an on-click event for the function.
    // If the users hit one of the animal buttons appended previously,
    // this function will execute.
    $(document).on("click", ".animal-button", function() {

        // Clearing out any previous animal pictures.
        $("#animals").empty();
        
        // Clearing out "active" class tag for the previous
        // animal buttons.
        $(".animal-button").removeClass("active");
        
        // (this) returns the clicked button element for adding
        // "active" tag to the class.
        $(this).addClass("active");

        // It returns what type of animal buttons clicked
        // in a string format.
        var type = $(this).attr("data-type");
        
        // This concatenates the queryURL to retreive gif images from giphy.
        // The variable type is a text variable contains specific animal type.
        // e.g. if type = "lion" => this queryURL will look for the images containing
        // lion.
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";
        
        // Starting an ajax session using jquery method
        $.ajax({
            // taking inthe queryURL declared in line 72
            url: queryURL,
            // telling the ajax method that we will be using "GET" method for
            // current ajax session.
            method: "GET"
        })
        
        // A call back function that executes when prior ajax session is
        // successfully initiated
        .then(function(response) {
            // Storing a response of ajax session (usually retrieved API data)
            // in to the variable named 'results'
            var results = response.data;

            // Starting a for loop that travels through entire response elements
            // the queryURL is going to retrieve 10 images (because of 'limit=10' at the end of query)
            // So this for loop will execute 10 times
            for (var i = 0; i < results.length; i++) {
                // Creating div and give a class attribute
                // called 'animal-item'
                var animalDiv = $("<div class=\"animal-item\">");

                // Storing the rate data of the image into the variable
                var rating = results[i].rating;

                // Creating a paragraph tag and set it equal to 
                // rating data retrieved previously, and store it
                // in the variable called 'p'
                var p = $("<p>").text("Rating: " + rating);

                // get the reference of both animated image and 
                // still image for play & pause function
                // Store that reference in the each variable called
                // "animated" and "still"
                var animated = results[i].images.fixed_height.url;
                var still = results[i].images.fixed_height_still.url;

                // Initialize variable named 'animalImage' and
                // store the image tag in it.
                var animalImage = $("<img>");
                // Give the image tag the source attribute 'still',
                // which is a reference of still image
                animalImage.attr("src", still);
                // Give the image tag "data-still" attribute and set
                // it eauql to 'still' like previous one.
                animalImage.attr("data-still", still);
                // give another attribute "data-animate" to get the
                // image url of animated image.
                animalImage.attr("data-animate", animated);
                // Give the image tag "data-state" attribute and set
                // it equal to still to make it still image on first load                
                animalImage.attr("data-state", "still");
                // Give image tag a class called "animal-image"
                animalImage.addClass("animal-image");

                // Append variable p tag to "animalDiv" 
                animalDiv.append(p);
                // Append "animalImage" tag to "animalDiv"
                animalDiv.append(animalImage);

                // Append "animalDiv" to animals placeholder div
                $("#animals").append(animalDiv);
            }
        });
    });
    
    // If user clicks on the image, this function executes
    $(document).on("click", ".animal-image", function() {
        
        // Get the reference of the image "data-state" attribute, 
        // and store it into the variable named "state"
        var state = $(this).attr("data-state");

        // If the image was still image
        if (state === "still") {
            
            // Change the source url of the image from
            // still image to animated image
            $(this).attr("src", $(this).attr("data-animate"));
            
            // and change the "data-state" attribute to animate
            $(this).attr("data-state", "animate");
        
        // If the image was animated image
        } else {
            
            // Change the source url of the image from
            // animated image to still image
            $(this).attr("src", $(this).attr("data-still"));

            // and change the "data-state" attribute to still
            $(this).attr("data-state", "still");
        }
    });
  
    // If user clicks on the add-animal button,
    // this function executes
    $("#add-animal").on("click", function(event) {
        // To prevent the default action of the event triggered
        event.preventDefault();
        
        // Get the user input in string format
        var newAnimal = $("input").eq(0).val();
        

        // If the length of the word of new animal
        // is longer than 2, it will push new animal into
        // the "animals" array
        if (newAnimal.length > 2) {
            
            // push new animal into the "animals" array
            animals.push(newAnimal);
        }
        
        // Call populateButtons() function again to plot the button of
        // new animal.
        populateButtons(animals, "animal-button", "#animal-buttons");
  
    });
    
    // Execute the function populateButtons() with corresponding 
    // parameters.
    populateButtons(animals, "animal-button", "#animal-buttons");
});
  