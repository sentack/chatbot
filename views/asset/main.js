
// Check if the local storage item exists
if (localStorage.getItem('chatHistory')) {
  // Retrieve the array from local storage
  const arrayToSend = JSON.parse(localStorage.getItem('chatHistory')); 
} else {
  // Save the array to local storage
  const arrayToSend = localStorage.setItem('chatHistory', JSON.stringify([]));
}

// Send the array to the server
fetch('/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(arrayToSend)
}).catch(error => {
      // Handle any errors that occur during the request
      console.log(error);
});