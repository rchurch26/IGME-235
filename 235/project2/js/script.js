window.onload = (e) => document.querySelector("button").onclick = quizButtonClicked;
function getData(url)
{
    let xhr = new XMLHttpRequest();
    xhr.onload = dataLoaded;
    //xhr.onerror = dataError;
    xhr.open("GET", url);
    xhr.send();
}
function quizButtonClicked()
{
    console.log("Button clicked");
    const triviaUrl = "https://opentdb.com/api.php?amount=50";
    let url = triviaUrl;
    /*let difficulty = document.querySelectorAll("option[value]");
    for (let v of difficulty) 
    {
        if(v == "any")    
    }*/
    console.log(url);
    getData(url);
}
function dataLoaded(e)
{
    let xhr = e.target;
    let obj = JSON.parse(xhr.responseText);
    let questions = obj.results;
    for(let i = 0; i < questions.length; i++)
    {
        document.querySelector("#questions").innerHTML += `<p>${questions[i].question}</p>`;
    }  
}