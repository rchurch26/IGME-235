// 1
window.onload = (e) => {document.querySelector("#search").onclick = searchButtonClicked};
	
// 2
let displayTerm = "";

// 3
function getData(url)
{
    //1 - Create new XHR object
    let xhr = new XMLHttpRequest();
    //2 - Set onload handler
    xhr.onload = dataLoaded;
    //3 - Set onerror handler
    xhr.onerror = dataError;
    //4 - Open connection and send request
    xhr.open("GET", url);
    xhr.send();
}

// 4
function searchButtonClicked(){
    console.log("searchButtonClicked() called");
    //1
    const GIPHY_URL = "https://api.giphy.com/v1/gifs/search?";
    //2
    //Public API from: https://developers.giphy.com/docs/
    let GIPHY_KEY = "dc6zaTOxFJmzC";
    //3 - Build up URL string
    let url = GIPHY_URL;
    url += "api_key=" + GIPHY_KEY;
    //4 - Parse user entered term we wish to search
    let term = document.querySelector("#searchterm").value;
    displayTerm = term;
    //5 - Get rid of any leading and trailing spaces
    term = term.trim();
    //6 - Encode spaces and special characters
    term = encodeURIComponent(term);
    //7 - If no term to search then bail out of function
    if(term.length < 1) return;
    //8 - Append the search term to the URL
    url += "&q=" + term;
    //9 - Grab user chosen search `limit` from <select> and append it to URL
    let limit = document.querySelector("#limit").value;
    url += "&limit=" + limit;
    //10 - Update UI
    document.querySelector("#status").innerHTML = `<b>Searching for "${displayTerm}"</b>`;
    //11 - See URL
    console.log(url);
    //12 - Request Data
    getData(url);
}
// 5 - Callback Functions
function dataLoaded(e)
{
    // 5 - event.target is xhr object
    let xhr = e.target;
    // 6 - xhr.responseText is JSON file
    console.log(xhr.responseText);
    // 7 - Turn text into parsable JavaScript object
    let obj = JSON.parse(xhr.responseText);
    // 8 - No results, print message and return
    if(!obj.data || obj.data.length == 0)
    {
        document.querySelector("#status").innerHTML = `<b>No results found for "${displayTerm}"</b>`;
        return;
    }
    // 9 - Start builing HTML string we'll display to user
    let results = obj.data;
    console.log("results.length = " + results.length);
    let bigString = "";
    // 10 - Loop through results
    for(let i = 0; i < results.length; i++)
    {
        let result = results[i];
        // 11 - Get URL to GIF
        let smallURL = result.images.fixed_width_downsampled.url;
        if(!smallURL) smallURL = "images/no-image-found.png";
        // 12 - Get URL to GIPHY Page
        let url = result.url;
        // 12.5 - Get rating of GIF
        let rating = (result.rating ? result.rating : "NA").toUpperCase();
        // 13 - Build <div> to hold results
        //ES6 String Templating
        let line = `<div class='result'><img src='${smallURL}' title='${result.id}'/>`;
        line += `<span><a target='_blank' href='${url}'>View on Giphy</a><p>Rating: ${rating}</p></span>`;
        line += `</div>`;
        //14 - Another way of doing same thing above
        //Replaces this:
        /*
        var line = "<div class='result'>";
        line += "<img src='";
        line += smallURL;
        line += "' title= '";
        line += result.id;
        line += "' />";
        line += "<span><a target='_blank' href='" + url + "'>View on Giphy</a></span>";
        line += "</div>";
        */
        // 15 - Add <div> to `bigString` and loop
        bigString += line;
    }
    // 16 - All done building HTML - show to user!
    document.querySelector("#content").innerHTML = bigString;
    // 17 - Update Status
    document.querySelector("#status").innerHTML = `<b>Success!</b><p><i>Here are ${results.length} results for ${displayTerm}</i></p>`;
}
function dataError(e)
{
    console.log("An error occurred");
}