const input = document.getElementById("input");
const addButton = document.getElementById("addButton");
const ul = document.getElementById("mainUl");
let tasks = loadTasks();

function loadTasks() {
  const data = localStorage.getItem("tasks");

  if (data === null) {
    return [];
  }

  try {
    return JSON.parse(data);
  } catch (e) {
    // explica o erro que fez ativar o catch
    console.error("Erro ao ler JSON:", e);
    return [];
  }
}

document.addEventListener("DOMContentLoaded", renderLoadedTasks);

function renderLoadedTasks() {
  tasks.forEach(function (task) {
    const loadedLi = document.createElement("li");
    loadedLi.classList.add("liJs");
    loadedLi.dataset.id = task.id;

    const loadedCheckBox = document.createElement("input");
    loadedCheckBox.type = "checkbox";
    loadedCheckBox.classList.add("checkBoxJs");
    loadedCheckBox.checked = task.checked;

    const loadedSpan = document.createElement("span");
    loadedSpan.classList.add("spanJs");
    loadedSpan.textContent = task.value;

    if (task.checked) {
      loadedSpan.classList.add("toggleCheckBoxJs");
    }

    const loadedEditButton = document.createElement("button");
    loadedEditButton.classList.add("editButtonJs");

    loadedEditButton.innerHTML = `<svg class="svgEditJs"  viewBox="0 0 24.00 24.00" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000" stroke-width="0.792">

<g id="SVGRepo_bgCarrier" stroke-width="0"/>

<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.336"/>

<g id="SVGRepo_iconCarrier">

<path fill-rule="evenodd" clip-rule="evenodd" d="m3.99 16.854-1.314 3.504a.75.75 0 0 0 .966.965l3.503-1.314a3 3 0 0 0 1.068-.687L18.36 9.175s-.354-1.061-1.414-2.122c-1.06-1.06-2.122-1.414-2.122-1.414L4.677 15.786a3 3 0 0 0-.687 1.068zm12.249-12.63 1.383-1.383c.248-.248.579-.406.925-.348.487.08 1.232.322 1.934 1.025.703.703.945 1.447 1.025 1.934.058.346-.1.677-.348.925L19.774 7.76s-.353-1.06-1.414-2.12c-1.06-1.062-2.121-1.415-2.121-1.415z" fill="#000000"/>

</g>

</svg>`;

    const loadedDeleteButton = document.createElement("button");
    loadedDeleteButton.classList.add("deleteButtonJs");

    loadedDeleteButton.innerHTML = `<svg class="svgDeleteJs" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <path d="M112 112l20 320c.95 18.49 14.4 32 32 32h184c17.67 0 30.87-13.51 32-32l20-320" fill="none" stroke="currentColor" 
  stroke-linecap="round" stroke-linejoin="round" /><path stroke="currentColor" stroke-linecap="round" 
  stroke-miterlimit="10"  d="M80 112h352"/>
  <path d="M192 112V72h0a23.93 23.93 0 0124-24h80a23.93 23.93 0 0124 24h0v40M256 176v224M184 176l8 224M328 176l-8 224" 
  fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
  </svg>`;

    //organizing loaded elements and displaying
    loadedLi.appendChild(loadedCheckBox);
    loadedLi.appendChild(loadedSpan);
    loadedLi.appendChild(loadedEditButton);
    loadedLi.appendChild(loadedDeleteButton);

    ul.appendChild(loadedLi);
  });
}

addButton.addEventListener("click", function () {
  if (input.value.trim()) {
    addTaskToArray();

    saveLocalStorageState();

    handleNewTask();
  }
});

function addTaskToArray() {
  tasks.push({
    id: Date.now().toString(),
    value: input.value,
    checked: false,
  });
}

function saveLocalStorageState() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function handleNewTask() {
  const elements = createElements();
  inputContent(elements.span);
  renderTask(elements);
}

function createElements() {
  const li = document.createElement("li");
  li.classList.add("liJs");
  li.dataset.id = tasks[tasks.length - 1].id;

  const checkBox = document.createElement("input");
  checkBox.type = "checkbox";
  checkBox.classList.add("checkBoxJs");

  const span = document.createElement("span");
  span.classList.add("spanJs");

  const editButton = document.createElement("button");
  editButton.classList.add("editButtonJs");

  //Introduzindo o svg dentro do botão via innerHTML sempre usando o `
  editButton.innerHTML = `<svg class="svgEditJs"  viewBox="0 0 24.00 24.00" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000" stroke-width="0.792">

<g id="SVGRepo_bgCarrier" stroke-width="0"/>

<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.336"/>

<g id="SVGRepo_iconCarrier">

<path fill-rule="evenodd" clip-rule="evenodd" d="m3.99 16.854-1.314 3.504a.75.75 0 0 0 .966.965l3.503-1.314a3 3 0 0 0 1.068-.687L18.36 9.175s-.354-1.061-1.414-2.122c-1.06-1.06-2.122-1.414-2.122-1.414L4.677 15.786a3 3 0 0 0-.687 1.068zm12.249-12.63 1.383-1.383c.248-.248.579-.406.925-.348.487.08 1.232.322 1.934 1.025.703.703.945 1.447 1.025 1.934.058.346-.1.677-.348.925L19.774 7.76s-.353-1.06-1.414-2.12c-1.06-1.062-2.121-1.415-2.121-1.415z" fill="#000000"/>

</g>

</svg>`;

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("deleteButtonJs");

  deleteButton.innerHTML = `<svg class="svgDeleteJs" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <path d="M112 112l20 320c.95 18.49 14.4 32 32 32h184c17.67 0 30.87-13.51 32-32l20-320" fill="none" stroke="currentColor" 
  stroke-linecap="round" stroke-linejoin="round" /><path stroke="currentColor" stroke-linecap="round" 
  stroke-miterlimit="10"  d="M80 112h352"/>
  <path d="M192 112V72h0a23.93 23.93 0 0124-24h80a23.93 23.93 0 0124 24h0v40M256 176v224M184 176l8 224M328 176l-8 224" 
  fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
  </svg>`;

  return { li, checkBox, span, editButton, deleteButton };
}

function inputContent(span) {
  span.textContent = input.value;
}

function renderTask(elements) {
  elements.li.appendChild(elements.checkBox);
  elements.li.appendChild(elements.span);
  elements.li.appendChild(elements.editButton);
  elements.li.appendChild(elements.deleteButton);

  ul.appendChild(elements.li);
}

ul.addEventListener("click", deleteItem);

function deleteItem(event) {
  //  event.target é exatamente onde foi o evento --- .closest como temos svg dentro do botão nós usamos isso para buscar a classe mais próxima..
  if (event.target.closest(".deleteButtonJs")) {
    const li = event.target.closest(".liJs");

    const idTask = li.dataset.id;

    if (li) {
      ul.removeChild(li);
      tasks = tasks.filter(function (task) {
        return task.id !== idTask;
      });
      saveLocalStorageState();
    }
  }
}

let newInput;
let newSpan2;
ul.addEventListener("click", enterEditMode);

function enterEditMode(event) {
  if (event.target.closest(".editButtonJs")) {
    const li = event.target.closest(".liJs");
    newSpan2 = li.querySelector(".spanJs");

    newInput = document.createElement("input");
    newInput.classList.add("inputJs");

    newInput.value = newSpan2.textContent;

    newSpan2.replaceWith(newInput);
    newInput.focus();
  }
}

ul.addEventListener("keyup", finisheEditOnEnter);

let cameFromEnter = false;
function finisheEditOnEnter(event) {
  if (event.key === "Enter") {
    cameFromEnter = true;
    applyChanges();
    setTimeout((cameFromEnter = false), 100);
  }
}

ul.addEventListener("focusout", finishEditOnBlur);

function finishEditOnBlur(event) {
  if (!cameFromEnter) {
    if (event.target.tagName === "INPUT" && event.target.matches(".inputJs")) {
      applyChanges();
    }
  }
}

function applyChanges() {
  if (newInput.value.trim() === "") {
    newInput.replaceWith(newSpan2);
  } else {
    newSpan2.textContent = newInput.value;
    newInput.replaceWith(newSpan2);
  }
  syncChangesLocalStorage();
}

function syncChangesLocalStorage() {
  const li = newSpan2.parentElement;
  const obj = tasks.find((task) => {
    return li.dataset.id === task.id;
  });

  obj.value = newSpan2.textContent;

  saveLocalStorageState();
}

ul.addEventListener("change", ifChecked);

function ifChecked(event) {
  if (event.target.matches(".checkBoxJs")) {
    const li = event.target.closest(".liJs");

    const span = li.querySelector(".spanJs");
    span.classList.toggle("toggleCheckBoxJs");

    if (span.classList.contains("toggleCheckBoxJs")) {
      confetti();
    }

    // id que quero mudar o estado checked
    const idTask = li.dataset.id;

    // salvar no array
    const obj = tasks.find((task) => {
      return task.id === idTask;
    });

    if (span.classList.contains("toggleCheckBoxJs")) {
      obj.checked = true;
      // salvar localStorage
      saveLocalStorageState();
    } else {
      obj.checked = false;
      saveLocalStorageState();
    }
  }
}

// Ajuste do texto no input principal para telas menores...

const mainInput = document.getElementById("input");

function adjustMobileInputFont() {
  const length = mainInput.value.length;

  if (window.innerWidth <= 768) {
    if (length >= 1 && length <= 20) {
      mainInput.style.fontSize = "1rem";
    } else if (length > 20 && length <= 30) {
      mainInput.style.fontSize = "0.95rem";
    } else if (length > 30 && length <= 40) {
      mainInput.style.fontSize = "0.9rem";
    } else if (length > 40 && length <= 50) {
      mainInput.style.fontSize = "0.85rem";
    } else if (length > 50) {
      mainInput.style.fontSize = "0.8rem";
    }
  } else {
    mainInput.style.fontSize = "1rem";
  }
}

mainInput.addEventListener("input", adjustMobileInputFont);
window.addEventListener("resize", adjustMobileInputFont);
