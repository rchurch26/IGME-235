window.onload = (e) => document.querySelector("button").onclick = quizButtonClicked;
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
    const triviaUrl = "https://opentdb.com/api.php?amount=50";
    let url = triviaUrl;
    console.log(url);
    getData(url);
}
function dataLoaded(e)
{
    let xhr = e.target;
    let obj = JSON.parse(xhr.responseText);
    let questions = obj.results;
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
    for(let c of categories)
    {
        if(c.selected == true)
        {
            return c.value;
        }
    }
}