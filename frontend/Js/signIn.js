document.addEventListener("DOMContentLoaded", () => {
  const signInForm = document.getElementById("signInForm");

  signInForm.addEventListener("submit", signIn);

  const btn = document.getElementById("btn");
  btn.addEventListener("click", () => {
    console.log("Event called....");
  });
});

function signIn(event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  console.log("Email:", email);

  fetch("http://localhost:3001/auth/signIn", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      return response.json();
    })
    .then((data) => {
      localStorage.setItem("username", data.username);
      window.location.href = "main.html";
    })
    .catch((error) => {
      console.error("Sign-in error:", error);
    });
}
