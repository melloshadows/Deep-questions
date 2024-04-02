let gameCont = document.querySelector("#game-container")
let card = document.querySelector(".card")
let cardContent = document.querySelector(".card-content")
let button = document.querySelectorAll("button")
let answerArea = document.querySelector("textarea")
let showQuestion = document.querySelector(".show")
let resultSection = document.querySelector("#results")
let player = document.querySelector(".player-answer")
let playerNumber = document.querySelector("#playernumber")
let nameArea = document.querySelector("#namearea")
let turn = document.querySelector(".turn")
let nextTurn = document.querySelector(".nextturn")



let theAnswers = []
let theQuestions = [] 
let thePlayers = []
let clickedToShowQuestion = false
let clickedPlayerAdded = false
let voted = false
let randomIndex
let playersVotes = 0
let playersnumber = 2
let arrayIndex = 1


function flip(object){
    if(object.classList.contains("flips")){
        object.classList.remove("flips")
    }
    else{    
        object.classList.add("flips")
    }
}

function show(object){
    object.style.display = "block"
}

function hide(object){
    object.style.display = "none"
}

function playeradded(){
    clickedPlayerAdded = true
    
    if (checkanswer(nameArea)){
        playerNumber.textContent = "player " + playersnumber + " name : "
        playersnumber++
        thePlayers.push(nameArea.value)
        nameArea.value = ""
    }  
}

function startquestions(){

    clickedPlayerAdded = true

    if(thePlayers.length < 1){
        alert("There Must Be At Least 2 Players")
    }


    else if (checkanswer(nameArea)){
        thePlayers.push(nameArea.value)
        nameArea.value = ""
        hide(playerNumber)
        hide(nameArea)
        hide(button[4])
        hide(button[5])
        show(card)
        show(answerArea)
        show(button[0])
        turn.textContent = thePlayers[0] +"'s turn"
        nextTurn.innerHTML = "------->  " + thePlayers[1]
    }
    
}

function showingQuestion(){
    hide(showQuestion)
    randomIndex = Math.floor(Math.random() *(questions.length - 0) + 0);
    cardContent.textContent = questions[randomIndex]
    theQuestions.push(cardContent.textContent)
    clickedToShowQuestion = true
    cardContent.style.display = "block"
    cardContent.classList.add("fadein")

    if(arrayIndex > 1){
        flip(cardContent)
    }
}


function startAgain(){
    hide(button[2])
    hide(button[3])
    show(card)
    show(answerArea)
    show(button[0])
    hide(button[1])
    turn.textContent = thePlayers[0] +"'s turn"
    nextTurn.innerHTML = "------->  " + thePlayers[1]
    arrayIndex = 1
    theQuestions = []
    theAnswers = []
    playersVotes = 0
    button[2].textContent = "Vote To Show Results"

    if (voted){
        hide(resultSection)
        player.innerHTML = ""

    }
}

function checkanswer(area){
    let counter = 0

    for(let i = 0 ; i < area.value.length ; i++){
        if(area.value[i] == " "){
            counter++
        }
    }
    

    if (clickedToShowQuestion == false && clickedPlayerAdded == false){
        alert("You Didn't Even See The Question, Dummy!");
        return false
    }

    else if (area.value.length == counter || area.value == ""){
        if(clickedPlayerAdded){
            alert("You MUST Enter Your Name To Countinue")
            clickedPlayerAdded = false
            return false
        }
        else{
            alert("You MUST Submit An Answer To The Question");
            return false
        }
        
    }
    clickedPlayerAdded = false
    
    return true
}


button[4].addEventListener("click", playeradded)
button[5].addEventListener("click", startquestions)
showQuestion.addEventListener("click", showingQuestion)


button[0].addEventListener("click", function(){
    
    if (checkanswer(answerArea)){
        turn.textContent = thePlayers[arrayIndex] +"'s turn"

        if(arrayIndex == thePlayers.length - 1){
            show(button[1])
            hide(button[0])
            nextTurn.innerHTML = ""
        }

        else{
            nextTurn.innerHTML = "------->  " + thePlayers[arrayIndex + 1]
        }   
        
        flip(card)
        flip(showQuestion)
        hide(cardContent)
        theAnswers.push(answerArea.value)
        answerArea.value = ""
        show(showQuestion)
        clickedToShowQuestion = false
        arrayIndex++
        
    }
    
})

button[1].addEventListener("click", function(){    

    if(checkanswer(answerArea)){
        theAnswers.push(answerArea.value)
        turn.textContent = ""
        answerArea.value = ""
        hide(cardContent)
        show(showQuestion)
        clickedToShowQuestion = false
        hide(card)
        hide(answerArea)
        hide(button[0])
        hide(button[1])
        show(button[3])
        show(button[2])
    }
    
})

button[2].addEventListener("click", function(){
    playersVotes++
    button[2].textContent = "Vote To Show Results (" + playersVotes + ")"

    if(thePlayers.length == playersVotes){
            voted = true
            hide(button[2])
            show(resultSection)
            for(let i = 0 ; i < theQuestions.length ; i++){                
                player.innerHTML +=  thePlayers[i] + "'s question: <br><br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +  theQuestions[i] + "<br><br><br>" + thePlayers[i] + "'s answer: <br><br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + theAnswers[i] + "<br><br><hr><br><br>"

            }    
    }
   
})

button[3].addEventListener("click", startAgain)