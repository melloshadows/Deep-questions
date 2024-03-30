let gameCont = document.querySelector("#game-container")
let card = document.querySelector(".card")
let cardContent = document.querySelector(".card-content")
let button = document.querySelectorAll("button")
let answerArea = document.querySelector("textarea")
let showQuestion = document.querySelector(".show")
let resultSection = document.querySelector("#results")
let player = document.querySelector(".player-answer")



let theAnswers = []
let randomIndex
let clicked = false
let theQuestions = [] 
let numberOfPlayers = 0
let playersVotes = 0

function fading(){
    hide(showQuestion)
    randomIndex = Math.floor(Math.random() *(questions.length - 0) + 0);
    cardContent.textContent = questions[randomIndex]
    theQuestions.push(cardContent.textContent)
    clicked = true
    cardContent.style.display = "block"
    cardContent.classList.add("fadein")

}

function flipit(object){
    object.classList.add("flipped1")
}

function show(object){
    object.style.display = "block"
}

function hide(object){
    object.style.display = "none"
}

function checkanswer(){
    let counter = 0

    for(let i = 0 ; i < answerArea.value.length ; i++){
        if(answerArea.value[i] == " "){
            counter++
        }
    }
    
    if (clicked == false){
        alert("you didn't even see the question, dummy!");
        return false
    }

    else if(answerArea.value.length == counter || answerArea.value == ""){
        alert("you must submit an answer to the question");
        return false
    }
    
    return true
}



showQuestion.addEventListener("click", fading)


button[0].addEventListener("click", function(){
    
    if (checkanswer() == true){
        numberOfPlayers++
        flipit(card)
        flipit(showQuestion)
        hide(cardContent)
        theAnswers.push(answerArea.value) 
        answerArea.value = ""
        show(showQuestion)
        clicked = false

        showQuestion.addEventListener("click", function(){
            flipit(cardContent)
            cardContent.textContent = questions[randomIndex]
            show(button[1])
        })
    }
    
})

button[1].addEventListener("click", function(){    
    
    if(checkanswer() == true){
        theAnswers.push(answerArea.value)
        hide(card)
        hide(answerArea)
        hide(button[0])
        hide(button[1])
        show(button[2])
        show(button[3])
    }
    
})

button[2].addEventListener("click", function(){
    location.reload()
})


button[3].addEventListener("click", function(){
    playersVotes++
    button[3].textContent = "Vote To Show Results (" + playersVotes + ")"

    if(numberOfPlayers == playersVotes){
        button[3].addEventListener("click", function(){
            hide(button[2])
            hide(button[3])
            show(resultSection)
            let playerNumber = 0
            for(let i = 0 ; i < theQuestions.length ; i++){
                playerNumber++
                
                player.innerHTML +=  "player " + playerNumber + " question: <br><br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +  theQuestions[i] + "<br><br><br> player " + playerNumber + " answer: <br><br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + theAnswers[i] + "<br><br><hr><br><br>"
            }
        })
    }
   
})