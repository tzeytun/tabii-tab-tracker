let myLeads = []
let oldLeads = []
const buttonEl = document.getElementById("input-btn")
const inputEl = document.getElementById("input-el")
const ulEl = document.getElementById("ul-el")
const tabButton = document.getElementById("tab-btn")
const deleteButton = document.getElementById("delete-btn")
let leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))

console.log(leadsFromLocalStorage)

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}


tabButton.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        render(myLeads)
    })
});

function render(leads) {
    let listItems = "";
    for (let i = 0; i < leads.length; i++) {

        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems  
}


buttonEl.addEventListener("click", function() {


    console.log("Button clicked!")

    myLeads.push(inputEl.value) 

    inputEl.value = "";

    localStorage.setItem("myLeads", JSON.stringify(myLeads))

    console.log(myLeads)

    render(myLeads);

});

deleteButton.addEventListener("click", function() {

    let question = window.confirm("Are you sure you want to delete all the data?");

    if (question) {
        localStorage.clear(); 
        myLeads = [];         
        render(myLeads);        
    } else {
        return;      
    }
});

