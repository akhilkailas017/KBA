// Get the form element
const form = document.querySelector('form');

// Add an event listener to the form's submit event
form.addEventListener('submit', (e) => {
  // Prevent the default form submission behavior
  e.preventDefault();

  // Create an object to store the form data
  const formData = {};

  // Get the form elements
  const elements = form.elements;

  // Loop through the form elements and store their values in the formData object
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    if (element.name) {
      formData[element.name] = element.value;
    }
  }

  // Log the formData object to the console
  console.log(formData);
  console.log(formData.cname);

  // You can now use the formData object to send the data to a server or perform other actions
});