window.addEventListener("load", initFunctions);

//global variables for maniuplating DOM
const quote = document.querySelector("#quote");
const author = document.querySelector("#author");

//to initate calling mechanism of functions
function initFunctions() {
  document.querySelector("#newquote").addEventListener("click", getQuote);
  document.querySelector("#twitter").addEventListener("click", tweetQuote);
}

//to get a new quote from the function
function getQuote() {
  const apiUrl = "http://quotes.stormconsultancy.co.uk/random.json";

  if (window.fetch) {
    let promise = fetch(apiUrl);

    promise
      .then((response) => {
        response
          .json()
          .then((data) => {
            console.log(data);
            printQuote(data);
          })
          .catch((err) => console.error("Invalid JSON!"));
      })
      .catch((err) => {
        //getQuote();
        console.error("Encountered an error ", err);
      });
  } else {
    console.error("fetxh is not supported kindly upgrade your browser!");
  }
}

//to print quote to the console
function printQuote(data) {
  if (data.quote.length > 120) {
    quote.classList.add("long-text");
  } else {
    quote.classList.remove("long-text");
  }
  quote.innerText = data.quote;
  author.innerText = data.author;
}

//function to tweet quote to twitter
function tweetQuote() {
  const tweet = quote.innerText;
  const by = author.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${tweet} - ${by}`;
  window.open(twitterUrl, "_blank");
}
