let arrayDatos = [];
let pastEvents = [];
const contenedorTarjetas = document.querySelector("#containercards");

fetch('https://mindhub-xj03.onrender.com/api/amazing')
    .then(response => response.json())
    .then(data => {
        arrayDatos = data.events
        currentDate = data.currentDate
        init()

})

function init() {

  function getPastEvents(arrayEventos, currentDate) {
    for (const evento of arrayEventos) {
        if (evento.date < currentDate) {
          pastEvents.push(evento);
        }
    }
  }

  getPastEvents(arrayDatos, currentDate);

  function generateCards(pastEvents) {
      let tarjetasGeneradas = ""
      for (const evento of pastEvents) {
          tarjetasGeneradas += `
          <div class="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3 col-xxl-3 mb-5">
              <div class="card">
                  <img src=${evento.image} class="card-img-top shadow" alt="...">
                  <div class="card-body">
                      <h5 class="card-title">${evento.name}</h5>
                      <p class="card-text">${evento.description}</p>
                      <div class="row d-flex align-items-center p-1">
                          <h6 class="btn btn-white btn-simple col">Price $${evento.price}</h6>
                          <a href="#" class="btn btn-primary shadow col me-1">Ver mas...</a>
                      </div>
                  </div>
              </div>
          </div>`
      }
      
      contenedorTarjetas.innerHTML = tarjetasGeneradas;

  }

  generateCards(pastEvents)



  /* ----------------------------------------------------- */




  function generateCheckboxes(pastEvents) {
      let categorias = [];
      pastEvents.forEach((evento) => {
        if (!categorias.includes(evento.category)) {
          categorias.push(evento.category);
        }
      });
      const contenedorFiltro = document.getElementById("checkboxes-container");
      let checkboxesGenerados = "";
      categorias.forEach((categoria) => {
        checkboxesGenerados += `
          <div class="form-check-inline col-12 col-md-5 col-lg-3 col-xl-2 mb-2 ms-2">
            <input class="form-check-input" type="checkbox" value="${categoria}" id="${categoria}">
            <label class="form-check-label" for="${categoria}">
              ${categoria}
            </label>
          </div>
        `;
      });
      contenedorFiltro.innerHTML = checkboxesGenerados;
    }

  generateCheckboxes(pastEvents);  

  function filterEvents() {
    const checkboxes = document.querySelectorAll("#checkboxes-container input[type=checkbox]");
    const selectedCategories = Array.from(checkboxes)
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.value);
    let filteredEvents = pastEvents;
    if (selectedCategories.length > 0) {
      filteredEvents = pastEvents.filter((evento) => selectedCategories.includes(evento.category));
    }
    const searchBox = document.getElementById("search-box");
    if (searchBox.value !== "") {
      filteredEvents = filteredEvents.filter((evento) => evento.name.toLowerCase().includes(searchBox.value.toLowerCase()));
    }
    contenedorTarjetas.innerHTML = "";
    generateCards(filteredEvents);
  }

  function searchEvents() {
    const checkboxes = document.querySelectorAll("#checkboxes-container input[type=checkbox]");
    const selectedCategories = Array.from(checkboxes)
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.value);
    let filteredEvents = pastEvents;
    if (selectedCategories.length > 0) {
      filteredEvents = pastEvents.filter((evento) => selectedCategories.includes(evento.category));
    }
    const searchBox = document.getElementById("search-box");
    if (searchBox.value !== "") {
      filteredEvents = filteredEvents.filter((evento) => evento.name.toLowerCase().includes(searchBox.value.toLowerCase()));
    }
    contenedorTarjetas.innerHTML = "";
    generateCards(filteredEvents);
  }

  const checkboxes = document.querySelectorAll("#checkboxes-container input[type=checkbox]");
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", filterEvents);
  });

  const searchBox = document.getElementById("search-box");
  searchBox.addEventListener("keyup", searchEvents);

}

