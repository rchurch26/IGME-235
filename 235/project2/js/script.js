window.onload = (e) => document.querySelector("button").onclick = quizButtonClicked;
let answers = [];
function getData(url)
{
    let xhr = new XMLHttpRequest();
    xhr.onload = dataLoaded;
    xhr.onerror = dataError;
    xhr.open("GET", url);
    xhr.send();
}
function quizButtonClicked()
{
    let difficulty = difficultyChosen();
    let category = categoryChosen();
    let numQuestions = document.querySelector("#numQuestions").value;
    const triviaUrl = "https://opentdb.com/api.php?";
    let url = triviaUrl;
    if(difficulty == "any" && category == "any")
    {
        url += `amount=${numQuestions}`;
    }else if(category == "any")
    {
        url += `amount=${numQuestions}&difficulty=${difficulty}`;
    }else if(difficulty == "any")
    {
        url += `amount=${numQuestions}&category=${category}`;
    }else
    {
        url += `amount=${numQuestions}&category=${category}&difficulty=${difficulty}`;
    }
    console.log(url);
    getData(url);
}
function dataLoaded(e)
{
    let xhr = e.target;
    let obj = JSON.parse(xhr.responseText);
    let questions = obj.results;
    let question = questions[0];
    document.querySelector("#questions").innerHTML = `<p>${question.category}<br>${question.question}<br>${question.difficulty}</p>`;
    answers.push(question.correct_answer);
    for(let i = 0; i < question.incorrect_answers.length; i++)
    {
        answers.push(question.incorrect_answers[i]);
    }
    answers.sort();
    for(let i = 0; i < answers.length; i++)
    {
        document.querySelector("#answers").innerHTML += `<p><input type='radio' name='answers' value='${answers[i]}'>${answers[i]}</p>`;
    }
    let choice = document.querySelector("#answers[name]");
    if(choice.value == question.correct_answer)
    {
        document.querySelector("#result").innerHTML = `Correct`;
    }
}
function dataError(e)
{
    console.log("An error occurred");
}
//difficultyChosen Function
function difficultyChosen()
{
    let difficulties = document.querySelectorAll(".difficulty");
    for(let d of difficulties)
    {
        if(d.selected == true)
        {
            return d.value;
        }
    }
}
//categoryChosen Function
function categoryChosen()
{
    let categories = document.querySelectorAll(".category");
    for(let i = 0; i < categories.length; i++)
    {
        if(categories[i].selected == true)
        {
            if(categories[i].value == "any")
            {
                return "any";
            }
            return i + 8;
        }
    }
}
//checkAnswer Function
function checkAnswer()
{
    for(let a of answers)
    {
        if(a.selected == true)
        {
            return a;
        }
    }
}