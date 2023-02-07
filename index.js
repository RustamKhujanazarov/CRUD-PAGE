const formCreate = document.getElementById('form-create');
const inputCreate = document.getElementById("input-create");
const formEdit = document.getElementById('form-edit');
const listGroupCrud = document.getElementById('table');
const allClear = document.getElementById("allClear");
const surname = document.getElementsByClassName("surname")[0];
// const messageCreate = document.getElementById('message-create')

const modal = document.getElementById('modal')
const overlay = document.getElementById('overlay')
/* time elements */
const closeEl = document.getElementById('close');
const clearInput= document.getElementById("clearInput");

let editItemId;

// check
let crud = JSON.parse(localStorage.getItem('list'))
  ? JSON.parse(localStorage.getItem('list'))
  : []

if (crud.length) showCrud()

// setCrud to localstorage
function setCrud() {
  localStorage.setItem('list', JSON.stringify(crud))
}



// show crud
function showCrud() {
  const crud = JSON.parse(localStorage.getItem('list'))
  listGroupCrud.innerHTML = '';
  crud.forEach((item, i) => {
    listGroupCrud.innerHTML += 
    `
    <tr>
        <td class="name">${item.name}</td>
        <td class="surname">${item.surname}</td>
        <td class="address">${item.address}</td>
        <td class="phone-number">${item.phoneNumber}</td>
        <td ><i class="fas fa-pen" src="img/edit.svg" alt="edit icon" onclick=(editCrud(${i})) ></i></td>
        <td ><i class="fas fa-trash" src="img/edit.svg" alt="edit icon" onclick=(deleteCrud(${i}))></i></td>
    </tr>

    `
  })
}

// get Crud
formCreate.addEventListener('submit', (e) => {
  e.preventDefault()
  const name = formCreate['input-create'].value.trim()
  const surname = formCreate['input-surname'].value.trim()
  const address = formCreate['input-address'].value.trim()
  const phoneNumber = formCreate['input-phone'].value.trim()
  formCreate.reset()
  if (name.length>0, surname.length>0, address.length>0, phoneNumber.length>0) {
    crud.push({ name:name, surname:surname, address:address, phoneNumber:phoneNumber})
    setCrud()
    showCrud()
    if(crud.length=11){
      location.reload()
    }
   } 
    else if(crud.length=10){
      location.reload()
    }
  else {
    alert("Please, Fill in the details completely...")
  }
})

// delete crud
function deleteCrud(id) {
  const deletedCrud = crud.filter((item, i) => {
    return i !== id
  })

  crud = deletedCrud
  setCrud()
  showCrud()
}



// edit Form
formEdit.addEventListener('submit', (e) => {
  e.preventDefault()

  const name = formEdit['input-edit-name'].value.trim()
  const surname = formEdit['input-edit-surname'].value.trim()
  const address = formEdit['input-edit-address'].value.trim()
  const phoneNumber = formEdit['input-edit-phone'].value.trim()
  formEdit.reset()
  if (name.length>0, surname.length>0, address.length>0, phoneNumber.length>0) {
    crud.splice(editItemId, 1, {
        name:name, surname:surname, address:address, phoneNumber:phoneNumber
    })
    setCrud()
    showCrud()
    close()
    console.log('ishladi');
  } 
  else {
    alert('Please, Enter some text...')
  }
})

// edit Crud
function editCrud(id) {
  open()
  editItemId = id
}

overlay.addEventListener('click', close)
closeEl.addEventListener('click', close)

document.addEventListener('keydown', (e) => {
  if (e.which == 27) {
    close()
  }
})

function open() {
  modal.classList.remove('hidden')
  overlay.classList.remove('hidden')
}

function close() {
  modal.classList.add('hidden')
  overlay.classList.add('hidden')
};



allClear.addEventListener("click", () =>{
  localStorage.removeItem("list");
  crud = [];
  listGroupCrud.innerHTML = '';
  console.log('salom');
 
});

function search() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("input-search");
    filter = input.value.toUpperCase();
    table = document.getElementById("table");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }       
    }
  };

  const paginationNumbers = document.getElementById("pagination-numbers");
// const paginatedList = document.getElementById("paginated-list");
const listItems = listGroupCrud.querySelectorAll("tr");
const nextButton = document.getElementById("next-button");
const prevButton = document.getElementById("prev-button");

const paginationLimit = 10;
const pageCount = Math.ceil(listItems.length / paginationLimit);
let currentPage = 1;

const disableButton = (button) => {
  button.classList.add("disabled");
  button.setAttribute("disabled", true);
};

const enableButton = (button) => {
  button.classList.remove("disabled");
  button.removeAttribute("disabled");
};

const handlePageButtonsStatus = () => {
  if (currentPage === 1) {
    disableButton(prevButton);
  } else {
    enableButton(prevButton);
  }

  if (pageCount === currentPage) {
    disableButton(nextButton);
  } else {
    enableButton(nextButton);
  }
};

const handleActivePageNumber = () => {
  document.querySelectorAll(".pagination-number").forEach((button) => {
    button.classList.remove("active");
    const pageIndex = Number(button.getAttribute("page-index"));
    if (pageIndex == currentPage) {
      button.classList.add("active");
    }
  });
};

const appendPageNumber = (index) => {
  const pageNumber = document.createElement("button");
  pageNumber.className = "pagination-number";
  pageNumber.innerHTML = index;
  pageNumber.setAttribute("page-index", index);
  pageNumber.setAttribute("aria-label", "Page " + index);

  paginationNumbers.appendChild(pageNumber);
};

const getPaginationNumbers = () => {
  for (let i = 1; i <= pageCount; i++) {
    appendPageNumber(i);
  }
};

const setCurrentPage = (pageNum) => {
  currentPage = pageNum;

  handleActivePageNumber();
  handlePageButtonsStatus();
  
  const prevRange = (pageNum - 1) * paginationLimit;
  const currRange = pageNum * paginationLimit;

  listItems.forEach((item, index) => {
    item.classList.add("hidden-pagination");
    if (index >= prevRange && index < currRange) {
      item.classList.remove("hidden-pagination");
    }
  });
};

window.addEventListener("load", () => {
  getPaginationNumbers();
  setCurrentPage(1);

  prevButton.addEventListener("click", () => {
    setCurrentPage(currentPage - 1);
  });

  nextButton.addEventListener("click", () => {
    setCurrentPage(currentPage + 1);
  });

  document.querySelectorAll(".pagination-number").forEach((button) => {
    const pageIndex = Number(button.getAttribute("page-index"));

    if (pageIndex) {
      button.addEventListener("click", () => {
        setCurrentPage(pageIndex);
      });
    }
  });
});