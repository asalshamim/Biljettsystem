const ticketIdInput = document.getElementById('ticket-id');
const verifyBtn = document.getElementById('verify-ticket');
const textElem = document.getElementById('verify-p');

async function checkToken() {
  const token = sessionStorage.getItem('token');
  const response = await fetch('http://localhost:8000/api/cheack-token', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  const data = await response.json();

  if (data.success) {
    ticketIdInput.style.display = "inline-block";
    verifyBtn.style.display = "inline-block";
  } else {
    window.location.href = 'http://localhost:8000/index.html';
  }

}

async function checkTicket(ticketId) {
  const response = await fetch('http://localhost:8000/api/check-ticket', {
    method: 'POST',
    body: JSON.stringify(ticketId),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const data = await response.json();
  if (data.success) {
    textElem.innerHTML = "Ticket is validated";
  } else if (data.used) {
    textElem.innerHTML = "Ticket is already verified";
  } else if (data.exists === false) {
    textElem.innerHTML = "The ticket did not match "
  }
}


verifyBtn.addEventListener('click', () => {
  const ticketId = {
    id: ticketIdInput.value
  }
  checkTicket(ticketId);
})
checkToken();
