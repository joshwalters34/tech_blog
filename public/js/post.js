const postFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const title = document.querySelector('#title').value.trim();
  const post = document.querySelector('#post').value.trim();

  if (title && post) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/post', {
      method: 'POST',
      body: JSON.stringify({ title, post }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
};


document.querySelector('.post-form').addEventListener('submit', postFormHandler);

// document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
