import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
 onValue,
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";

const firebaseConfig = {
  databaseURL: "https://leads-tracker-app-a00a6-default-rtdb.firebaseio.com/",
};

console.log(firebaseConfig);

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const referenceInDB = ref(database, "leads");
console.log(database);

const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");

// Real-time listener for updates to the database
onValue(referenceInDB, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      const leadsArray = Object.values(data);  // Convert object to array
      render(leadsArray);
    } else {
      ulEl.innerHTML = "<li>No leads available.</li>";  // If there's no data
    }
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
        `;
  }

  ulEl.innerHTML = listItems;
}

deleteBtn.addEventListener("dblclick", function () {});

inputBtn.addEventListener("click", function () {
  push(referenceInDB, inputEl.value);
  console.log(inputEl.value);
  inputEl.value = "";
});
