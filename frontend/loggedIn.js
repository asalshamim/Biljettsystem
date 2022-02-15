const nameElem = document.querySelector('#ticketNumber');
const emailElem = document.querySelector('#verifybutt');



async function changePassword(pass) {
  let obj = {
    password: pass
  }

  const response = await fetch('http://localhost:8000/staff/user/change', {
    method: 'POST',
    body: JSON.stringify(obj),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const data = await response.json();
  console.log(data);
}

async function removeAccount() {
  const response = await fetch('http://localhost:8000/staff/user/remove', {
    method: 'DELETE'
  });
  const data = await response.json();
  console.log(data);
}

function createForm() {
  const inputElem = document.createElement('input');
  inputElem.setAttribute('type', 'password');

  const buttonElem = document.createElement('button');
  buttonElem.setAttribute('id', 'changeButton');
  buttonElem.innerHTML = 'Byt lösenord';

  buttonElem.addEventListener('click', () => {
    console.log(inputElem.value);
    changePassword(inputElem.value);
  });

  formElem.append(inputElem);
  formElem.append(buttonElem);
}

function createRemoveButton() {
  const buttonElem = document.createElement('button');
  buttonElem.innerHTML = 'Ta bort mitt konto';

  buttonElem.addEventListener('click', () => {
    removeAccount();
  });

  bodyElem.append(buttonElem);
}


async function getAllUsers() {
  const response = await fetch('http://localhost:8000/staff/user/all');
  const data = await response.json();

  console.log(data);
}

async function getUserInfo() {
  const response = await fetch('http://localhost:8000/staff/user');
  const data = await response.json();

  console.log(data);
  nameElem.innerHTML = `${data.user.firstname} ${data.user.lastname}`;
  emailElem.innerHTML = data.user.email;

  if (data.user.role === 'admin') {
    getAllUsers();
    createForm();
  } else if (data.user.role === 'user') {
    createRemoveButton();
  }
}

async function isLoggedIn() {
  const response = await fetch('http://localhost:8000/staff/check-ticket');
  const data = await response.json();

  if (data.loggedIn) {
    getUserInfo();
  } else {
    location.href = 'http://localhost:8000/';
  }
}

isLoggedIn();

