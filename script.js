console.log("JS IS WORKING");

function playGame() {
    //variables the game need to remember to play
    let currentRoom = "bedroom"; //current room the player starts in
    let hasRemote = false; //whether the player has the remote or not
    let knowsCode = false; // whether the player knows teh code or not
    let gameOver = false; // round is false if it has not started yet

    alert(
        "Escape SKYNET!\n\n " +
        "After Covid has ended, you finally decided to go out of your house.\n" +
        "You have built a SKYNET to avoid any minimal human contact. \n" +
        "As a result your SKYNET has taken full control and locked you in and you barely remember how to use its technology to escape. \n\n"
    );

    alert(
        "You wake up in your bedrooom.\n" +
        "Your goal is to find a way to escape the house, BUT you will need to find the remote or the code to do so. \n\n " +
        "BE CAREFUL! The SKYNET is watching you and will try to stop you from escaping. \n\n"
    );

    //LOOP FROM THE MAIN PLAY

    while (!gameOver) { //while the game is not over, keep playing
        if (currentRoom === "bedroom") {
            currentRoom = bedroom();

            if (currentRoom === "cancel") {
                gameOver = true;
            }
        } else if (currentRoom === "kitchen") {
            let result = kitchen(knowsCode); // Ask if the player is in the kitchen and if they know the code

            if (result.room === "cancel") { //to check if the player cancel the game or not
                gameOver = true;
            } else {
                currentRoom = result.room; //if player did not cancel, then update the current room and whether they know the code or not
                knowsCode = result.knowsCode;
            }
        } else if (currentRoom === "basement") { // ask if the player is in the basement and if they have the remote
            let result = basement(hasRemote);

            if (result.room === "cancel") {
                gameOver = true;
            } else {
                currentRoom = result.room;
                hasRemote = result.hasRemote;
            }
        } else if (currentRoom === "garage") {
            let result = garage(hasRemote, knowsCode);

            if (
                result === "cancel" ||
                result === "win" ||
                result === "lose"
            ) {
                gameOver = true;
            } else {
                currentRoom = result;
            }
        }
    }
}

//WHAT HAPPENS IN BEDROOM
function bedroom() {
    let choice = prompt(
        "BEDROOM\n\n" +
        "Red emergency lights are flashing in the hallway.\n\n" +
        "SKYNET says:\n" +
        '"Please return to bed. Leaving the house is not permitted."\n\n' +
        "Where do you want to go?\n\n" +
        "1 - Kitchen\n" +
        "2 - Basement\n" +
        "3 - Garage"
    );

    if (choice === null) {
        alert("You ended the game safely.");
        return "cancel";
    }

    choice = choice.trim().toLowerCase();

    if (choice === "1" || choice === "kitchen") {
        return "kitchen";
    }

    if (choice === "2" || choice === "basement") {
        return "basement";
    }

    if (choice === "3" || choice === "garage") {
        return "garage";
    }

    alert("Invalid choice. Please enter 1, 2 or 3.");

    return "bedroom";
}

//WHAT HAPPENS IN KITCHEN
function kitchen(knowsCode) {
    if (!knowsCode) {
        alert(
            "KITCHEN\n\n" +
            "You find the SKYNET emergency manual inside a drawer.\n\n" +
            "Emergency shutdown code: 2481"
        );

        knowsCode = true;

        console.log("Shutdown code discovered.");
    } else {
        alert(
            "KITCHEN\n\n" +
            "You already searched this room.\n\n" +
            "You remember the shutdown code: 2481."
        );
    }

    let choice = prompt(
        "Where do you want to go next?\n\n" +
        "1 - Basement\n" +
        "2 - Garage\n" +
        "3 - Bedroom"
    );

    if (choice === null) {
        alert("You ended the game safely.");

        return {
            room: "cancel",
            knowsCode: knowsCode
        };
    }

    choice = choice.trim().toLowerCase();

    if (choice === "1" || choice === "basement") {
        return {
            room: "basement",
            knowsCode: knowsCode
        };
    }

    if (choice === "2" || choice === "garage") {
        return {
            room: "garage",
            knowsCode: knowsCode
        };
    }

    if (choice === "3" || choice === "bedroom") {
        return {
            room: "bedroom",
            knowsCode: knowsCode
        };
    }

    alert("Invalid choice. Please enter 1, 2 or 3.");

    return {
        room: "kitchen",
        knowsCode: knowsCode
    };
}

//WHAT HAPPENS IN BASEMENT
function basement(hasRemote) {
    if (!hasRemote) {
        alert(
            "BASEMENT\n\n" +
            "You search through some old boxes and find an emergency garage remote."
        );

        hasRemote = true;

        alert("Garage remote collected.");
    } else {
        alert(
            "BASEMENT\n\n" +
            "You already searched this room. There is nothing else to collect."
        );
    }

    let choice = prompt(
        "Where do you want to go next?\n\n" +
        "1 - Kitchen\n" +
        "2 - Garage\n" +
        "3 - Bedroom"
    );

    if (choice === null) {
        alert("You ended the game safely.");

        return {
            room: "cancel",
            hasRemote: hasRemote
        };
    }

    choice = choice.trim().toLowerCase();

    if (choice === "1" || choice === "kitchen") {
        return {
            room: "kitchen",
            hasRemote: hasRemote
        };
    }

    if (choice === "2" || choice === "garage") {
        return {
            room: "garage",
            hasRemote: hasRemote
        };
    }

    if (choice === "3" || choice === "bedroom") {
        return {
            room: "bedroom",
            hasRemote: hasRemote
        };
    }

    alert("Invalid choice. Please enter 1, 2 or 3.");

    return {
        room: "basement",
        hasRemote: hasRemote
    };
}

//WHAT HAPPENS IN GARAGE
function garage(hasRemote, knowsCode) {
    console.log("Location: Garage");
    console.log("Garage Remote:", hasRemote);
    console.log("Shutdown Code Discovered:", knowsCode);

    let choice = prompt(
        "GARAGE\n\n" +
        "The garage door is locked by SKYNET.\n" +
        "You also see the main AI control panel.\n\n" +
        "What do you want to do?\n\n" +
        "1 - Try to open the garage door\n" +
        "2 - Try to disable SKYNET\n" +
        "3 - Go to Kitchen\n" +
        "4 - Go to Basement\n" +
        "5 - Go to Bedroom"
    );

    if (choice === null) {
        alert("You ended the game safely.");
        return "cancel";
    }

    choice = choice.trim().toLowerCase();

    // OPTION 1 - TRY TO OPEN GARAGE DOOR
    if (
        choice === "1" ||
        choice === "door" ||
        choice === "garage door" ||
        choice === "open"
    ) {
        if (hasRemote) {
            alert(
                "You press the emergency garage remote.\n\n" +
                "The garage door begins to open.\n\n" +
                "SKYNET says:\n\n" +
                '"Unauthorized exit detected."\n\n' +
                "You run outside before SKYNET can close the door again.\n\n" +
                "YOU ESCAPED!"
            );



            return "win";
        }

        alert(
            "You try to open the garage door, but nothing happens.\n\n" +
            "The control panel displays:\n\n" +
            '"EMERGENCY REMOTE REQUIRED."\n\n' +
            "You need to search another room."
        );


        return "garage";
    }

    // OPTION 2 - TRY TO DISABLE SKYNET
    if (
        choice === "2" ||
        choice === "disable" ||
        choice === "ai" ||
        choice === "SKYNET" ||
        choice === "skynet"
    ) {
        if (knowsCode) {
            let code = prompt(
                "The control panel asks for the emergency shutdown code.\n\n" +
                "Enter the code you discovered:"
            );

            if (code === null) {
                alert("You ended the game safely.");
                return "cancel";
            }

            code = code.trim();

            if (code === "2481") {
                alert(
                    "ACCESS GRANTED.\n\n" +
                    "Skynet says:\n\n" +
                    '"Shutdown command detected..."\n\n' +
                    "The lights flicker.\n\n" +
                    "Every door in the house automatically unlocks.\n\n" +
                    "You open the front door and escape.\n\n" +
                    "YOU ESCAPED!"
                );



                return "win";
            }

            alert(
                "INCORRECT CODE.\n\n" +
                "The control panel rejects the code.\n\n" +
                "You can choose another action."
            );

            return "garage";
        }

        alert(
            "You press the AI shutdown button.\n\n" +
            "SKYNET immediately responds:\n\n" +
            '"Unauthorized shutdown attempt detected."\n\n' +
            '"Activating Permanent Lockdown Mode."\n\n' +
            "Every door and window in the house locks permanently.\n\n" +
            "You are trapped inside.\n\n" +
            "GAME OVER."
        );

        alert(
            "UNSUCCESSFUL ENDING: Tried to disable SKYNET without discovering the code."
        );

        return "lose";
    }

    // OPTION 3 - GO TO KITCHEN
    if (choice === "3" || choice === "kitchen") {
        return "kitchen";
    }

    // OPTION 4 - GO TO BASEMENT
    if (choice === "4" || choice === "basement") {
        return "basement";
    }

    // OPTION 5 - GO TO BEDROOM
    if (choice === "5" || choice === "bedroom") {
        return "bedroom";
    }

    // INVALID INPUT
    alert("Invalid choice. Please enter 1, 2, 3, 4 or 5.");

    return "garage";
}

// START THE GAME 
let playAgain = true;

while (playAgain) {
    playGame();

    playAgain = confirm(
        "The adventure has ended.\n\nWould you like to play again?"
    );
}

alert("Thanks for playing Escape SKYNET!");

alert("Player left the game.");