var allNames=[];
var allCountries;
var countriesNumber;

function getData() {
    setTimeout(function() {}, 500);
    fetch('https://restcountries.eu/rest/v2/all')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        countriesNumber = data.length;
        allCountries = data;
        getAllNames();
    })
    .catch(error => {
        console.log('Error', error);
    })
}

function getAllNames() {
    var i;
    for (i=0; i<countriesNumber; i++) {
        allNames.push(allCountries[i].name);
    }
}

function clearSelect(element) {
    var size = element.options.length-1;
    var i;
    for (i=size; i>=0; i--) {
        element.remove(i);
    }
}

function refillSelect(select, suggestions) {
    clearSelect(select);
    console.log(suggestions); 
    suggestions.forEach( function(str) {
        var option = document.createElement('option');
        option.appendChild(document.createTextNode(str));
        option.value = str;
        document.getElementById('suggestions-box').appendChild(option);
    })
}

function showResult(str) {
    console.log("chose "+str);
    var current = null;
    var i;
    var empty=true;
    for (i=0; i<countriesNumber; i++) {
        if (allCountries[i].name==str) {
            current=allCountries[i];
            console.log(current);
            empty=false;
            break;
        }
    }
    if (!empty) {
        document.querySelector("#Region").innerHTML=current.region;
        console.log(current.region);
        if (current.subregion=="") {
            current.subregion="-";
        }
        if (current.capital=="") {
            current.capital="-";
        }
        document.querySelector("#Subregion").innerHTML=current.subregion;
        console.log(current.subregion);
        document.querySelector("#Capital").innerHTML=current.capital;
        console.log(current.capital);
        document.querySelector("#Population").innerHTML=current.population;
        console.log(current.population);
        document.querySelector("#Latitude").innerHTML=current.latlng[0];
        console.log(current.latlng[0]);
        document.querySelector("#Longtitude").innerHTML=current.latlng[1];
        console.log(current.latlng[1]);
        lang = "";
        if (current.languages!=null) {
            for (i=0; i<current.languages.length; i++) {
                lang += current.languages[i].name;
                if (i!=current.languages.length-1) {
                    lang+=",";
                }
            }
        }
        document.querySelector("#Languages").innerHTML=lang;
        console.log(current.lang);
        document.querySelector("#flag-img").src=current.flag;

    }
    else {
        console.log("null current")
    }

}

document.addEventListener('DOMContentLoaded', () => {

    if (window.location.href.endsWith("index.html")) {
        document.querySelector('#explore-choice').onclick = () => {
            window.location.href="explore.html"
        }
        document.querySelector('#about-choice').onclick = () => {
            window.location.href="about-us.html"
        }
    }
    else if (window.location.href.endsWith("explore.html")) {
        getData();
        console.log(allCountries);
        console.log(allNames);
        console.log(countriesNumber);
        var suggestions = allNames;
        var select = document.getElementById('suggestions-box');
        setTimeout(function() {
            refillSelect(select, allNames);
            document.querySelector("#suggestions-box").value="Afghanistan";
            showResult(document.querySelector('#suggestions-box').value);
        }, 500);

        document.querySelector('#country-input').onkeyup = () => {
            let input = document.querySelector('#country-input').value;
            if (input) {
                clearSelect(select);
                suggestions = allNames;
                suggestions = suggestions.filter(name => 
                    name.toLowerCase().startsWith(input.toLowerCase())
                )
                refillSelect(select, suggestions);
            }
            else {
                refillSelect(select, allNames);

            }
        }

        document.querySelector('#suggestions-box').onchange = () => {
            console.log("chose country");
            showResult(document.querySelector('#suggestions-box').value);
        }

        document.querySelector('.home').onclick = () => {
            console.log("chose to go home");
            window.location.href="index.html"
        }

    }

    else /*if (window.location.href.endsWith("about-us.html"))*/ {
        document.querySelector('.home').onclick = () => {
            console.log("chose to go home");
            window.location.href="index.html"
        }

        
    }

})