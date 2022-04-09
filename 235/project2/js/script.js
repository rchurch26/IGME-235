window.onload = (e) => {document.querySelector("button").onclick = quizButtonClicked};
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
    let questions = obj.data;
    for(let i = 0; i < questions; i++)
    {
        let question = questions[i];
        document.querySelector("#questions").innerHTML = `<p> ${question} </p>`;
    }
}