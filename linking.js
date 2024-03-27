"use strict";

// Fetch JSON data using fetch
fetch('./questions.json')
  .then(response => response.json())
  .then(quiz => {
    console.log(quiz); // Log the loaded quiz data
    startQuiz(quiz); // Call startQuiz function with the loaded data
  })
  .catch(error => {
    console.error('An error occurred while loading the quiz:', error);
  });

// Function to start the quiz
function startQuiz(quiz) {
    
    let currentQuestion = 0;
    let timerInterval; // Variable to store the timer interval

    function handleResultButtonClick() {
        const rslt = document.getElementById('rslt');
        rslt.addEventListener('click', function() { 
            var x = document.getElementById('hide2');
            x.style.display = "block";
            // Get the target div element
            const targetDiv = document.getElementById('hide2');
            // Scroll to the target div using smooth behavior
            targetDiv.scrollIntoView({ behavior: 'smooth' });

            const hh = document.getElementById('scroll')
            hh.style.display = 'none';

            const rmrk = document.getElementById("remark")
            const back = document.getElementById("results")
            if (currentScore>=150){
                document.querySelector(".remark").innerHTML="Remark: OutStanding ! !!O_O!!";
                rmrk.style.backgroundColor = "gold"
                rmrk.style.color = "white"
                back.style.color = "gold"
                back.style.borderColor = "gold"
                back.style.boxShadow = "45px 40px goldenrod"
            }else if(currentScore>=100 && currentScore<150 ){
                document.querySelector(".remark").innerHTML="Remark: Good, Keep Improving. ^_^";
                rmrk.style.color = "white"
                rmrk.style.backgroundColor = "green"
                back.style.color = "green"
                back.style.borderColor = "green"
                back.style.boxShadow = "45px 40px greenyellow"
            }else if(currentScore>=50 && currentScore<100){
                document.querySelector(".remark").innerHTML="Remark: Satisfactory, Play More. -_-";
                rmrk.style.color = "white"
                rmrk.style.backgroundColor = "orange"
                back.style.color = "orange"
                back.style.borderColor = "orange"
                back.style.boxShadow = "45px 40px rgb(241, 183, 74)"
            }else{
                document.querySelector(".remark").innerHTML="Remark: Unsatisfactory, Try Again. T_T";
                rmrk.style.color = "white"
                rmrk.style.backgroundColor = "red"
                back.style.color = "red"
                back.style.borderColor = "red"
                back.style.boxShadow = "45px 40px rgb(240, 72, 72)"
            }
        });
    }    
    // Function to start the timer
    function startTimer() {
        let timeLeft = 10; // Set the timer duration (in seconds)
        const timerDisplay = document.getElementById('timer'); // Timer display element
        
        // Display initial timer value
        timerDisplay.textContent ="Time Left:  " + timeLeft ;
        
        // Update timer every second
        timerInterval = setInterval(() => {
            timeLeft--;
            timerDisplay.textContent = "Time Left:  " + timeLeft ;
            
            // Check if time is up
            if (timeLeft === 0) {
                if(currentQuestion == quiz.length-1){
                    var x = document.getElementById('rslt');
                    x.removeAttribute('hidden');
                }

                clearInterval(timerInterval);
                const options = document.querySelectorAll('input[name="options"]');
                const correctAnswerIndex = quiz[currentQuestion].answer;
                const description =  document.getElementById("para");
                var i = 0;
                for  (i=0;i<=3;i++) {
                    if(options[i].value === correctAnswerIndex){
                        console.log("Correct Answer " + options[i].value)
                        options[i].parentElement.style.backgroundColor = "green";
                        options[i].parentElement.style.fontWeight = "bold";
                        options[i].checked="checked";
                    }else {
                        description.style.display = "block";
                        description.style.backgroundColor = "red";
                        options[i].parentElement.style.backgroundColor = "red";
                        options[i].parentElement.style.fontWeight = "bold";
                    }
                }
                const radioButtons = document.querySelectorAll('input[name="options"]');
                radioButtons.forEach(function(button) {
                    button.disabled = true;
                });
                handleResultButtonClick();
            }
        }, 1000);
    }

    const start = document.getElementById("startButton")
    start.addEventListener("click", ()=>{
        clearInterval(timerInterval);
        startTimer();})

    const questionEl = document.getElementById('ques');
    const photo = document.getElementById('photo');
    const description =  document.getElementById("para");
    
    function displayQuestion(currentQuestion) {
    const radioButtons = document.querySelectorAll('input[name="options"]');
    radioButtons.forEach(function(button) {
        button.checked = false; // Uncheck all radio buttons
        button.disabled = false; // Enable all radio buttons
    });
    photo.src = quiz[currentQuestion].image;
    description.innerHTML = quiz[currentQuestion].correction;
    
    document.getElementById("ques-left").textContent = "Question: " + 1 + "/" + quiz.length
    //show the question text on the page    
    questionEl.innerText = quiz[currentQuestion].question; 
        //options
    var i = 0;
    for (i=0;i<=3;i++){                     
        document.getElementById("opt"+i).value=quiz[currentQuestion].options[i];
        document.getElementById("lb"+i).innerText=quiz[currentQuestion].options[i];
    }
    document.getElementById('rslt').disabled = true;

}
    displayQuestion(currentQuestion);

    const radioButtons = document.querySelectorAll('input[name="options"]');
    let currentScore = 0;
    let right = 0
    let wrong = 0
    
    // Add event listener to all radio buttons
    radioButtons.forEach(function(radioButton) {
        radioButton.addEventListener('click', function() {
            
            const selectedOption = document.querySelector('input[name="options"]:checked');
            if (selectedOption) {
                handleResultButtonClick();
                if(currentQuestion == quiz.length-1){
                    var x = document.getElementById('rslt');
                    x.removeAttribute('hidden');
                }
                
                clearInterval(timerInterval);       
                const selectedAnswerIndex = document.querySelector('input[name="options"]:checked').value;
                const correctAnswerIndex = quiz[currentQuestion].answer;
                const options = document.querySelectorAll('.options');                
                
                // Remove color from all options
                options.forEach(function(option) {
                    option.style.backgroundColor = "";
                });
                
                radioButtons.forEach(function(button) {
                    if (button !== selectedOption) {
                        button.disabled = true;
                    }
                });
                const targetDiv = document.getElementById('scroll2');
                const targetDiv2 = document.getElementById('rslt');    
                if (selectedAnswerIndex === correctAnswerIndex) {
                    console.log("Correct!");
                    currentScore += 10;
                    right+=1;
                    document.getElementById('para').style.backgroundColor = "green";
                    selectedOption.parentElement.style.backgroundColor = "green";
                    selectedOption.parentElement.style.fontWeight = "bold";
                    targetDiv.scrollIntoView({ behavior: 'smooth' });
                    targetDiv2.scrollIntoView({ behavior: 'smooth' });
                } else {
                    console.log("Incorrect!");
                    wrong+=1;
                    document.getElementById('para').style.backgroundColor = "red";
                    selectedOption.parentElement.style.backgroundColor = "red";
                    selectedOption.parentElement.style.fontWeight = "bold";
                    const targetDiv = document.getElementById('scroll2');
                    targetDiv2.scrollIntoView({ behavior: 'smooth' });
                    targetDiv.scrollIntoView({ behavior: 'smooth' });    
                }
            } else {
                console.log("Please select an option");
                // Notify the user to select an option before proceeding
            }
            document.getElementById("score").textContent = "Score: " + currentScore ;
            document.getElementById("display-final-score").textContent = "Your Final Score is: " + currentScore ;
            document.getElementById("right-wrong").textContent = right + " were Right and " + wrong +" were Wrong"  ;
            document.getElementById("solved-ques-no").textContent = "You Solved " + right +" questions "   ;
            
        });
    });
    
    document.querySelector('.next').addEventListener('click', function () {
        clearInterval(timerInterval);
        startTimer();

        // Get the target div element
        const targetDiv = document.getElementById('scroll');
        // Scroll to the target div using smooth behavior
        targetDiv.scrollIntoView({ behavior: 'smooth' });
        

        // Remove the event listener from the element
    document.getElementById('rslt').removeEventListener('click', handleResultButtonClick());
    
        currentQuestion++;
        var y = document.getElementById("para");
        y.style.display = "none";
        y.style.backgroundColor = "";

        const options1 = document.querySelectorAll('input[name="options"]');
        var i = 0;
        for  (i=0;i<=3;i++) {
            options1[i].parentElement.style.backgroundColor = "white";
            options1[i].parentElement.style.fontWeight = "normal";
        }

        const selectedOption = document.querySelector('input[name="options"]:checked');
        selectedOption.parentElement.style.fontWeight = "normal";
        var y = document.getElementById("para");

        if (currentQuestion < quiz.length) {
            y.style.display = "none";
            // Display next question
            displayQuestion(currentQuestion);
            // Update question counter
            document.getElementById("ques-left").textContent = "Question: " + (currentQuestion + 1) + "/" + quiz.length;
            console.log("currentQuestion "+currentQuestion)
            console.log("quiz.length "+quiz.length)

        } 
        console.log("currentQuestion = "+(currentQuestion))
        console.log("quiz.length = "+(quiz.length))
        console.log("currentQuestion == quiz.length-1 " + currentQuestion == quiz.length-1)
        if(currentQuestion == quiz.length-1){
            console.log("Quiz completed");
            this.style.display = "none";      
            // Handle end of the quiz
        }
    }); 
}
