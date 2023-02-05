const allSigns = document.querySelectorAll(".sign");
const horoscopeContainer = document.querySelector(".horoscope-container");
const horoscopeTitle = horoscopeContainer.querySelector("h2");
const horoscopeDate = horoscopeContainer.querySelector("span");
const horoscopeText = horoscopeContainer.querySelector("p");
const horoscopeBtns = horoscopeContainer.querySelectorAll("button");
const closeBtn = document.querySelector(".close-btn");

//events
allSigns.forEach((sign) => {
  sign.addEventListener("click", () => {
    openHoroscopePanel();
    fetchApi(sign.classList[1], "today");
  });
});
closeBtn.addEventListener("click", () => {
  closeHoroscopePanel();
  clear();
});
horoscopeBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    changeDay(btn);
  });
});
//functions
function openHoroscopePanel() {
  horoscopeContainer.classList.add("active");
  document.body.style.overflow = "hidden";
}
function closeHoroscopePanel() {
  horoscopeContainer.classList.remove("active");
  document.body.style.overflow = "visible";
}

async function fetchApi(sign, day) {
  const response = await fetch(
    `https://aztro.sameerkumar.website/?sign=${sign}&day=${day}`,
    {
      method: "POST",
    }
  );
  const data = await response.json();
  addDataToPage(sign, data);
}
function addDataToPage(sign, data) {
  const { current_date, description } = data;
  horoscopeTitle.innerText = sign.charAt(0).toUpperCase() + sign.slice(1);
  horoscopeDate.innerText = current_date;
  horoscopeText.innerText = description;
}
function clear() {
  horoscopeTitle.innerText = "Loading....";
  horoscopeDate.innerText = "";
  horoscopeText.innerText = "";
}
function changeDay(btn) {
  horoscopeDate.innerText = "Wait";
  horoscopeText.innerText = "Loading....";
  const day = btn.innerText.toLowerCase();
  const sign = horoscopeTitle.innerText.toLowerCase();
  fetchApi(sign, day);
}
