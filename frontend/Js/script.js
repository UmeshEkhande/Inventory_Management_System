document.addEventListener("DOMContentLoaded", () => {
  const signUpForm = document.getElementById("signUpForm");
  signUpForm.addEventListener("submit", signUp);

  const btn = document.getElementById("btn");
  btn.addEventListener("click", () => {
    console.log("Event called....");
  });
});

function signUp(event) {
  event.preventDefault();

  const username = document.getElementById("signUpUsername").value;
  const email = document.getElementById("signUpEmail").value;
  const password = document.getElementById("signUpPassword").value;

  fetch("http://localhost:3001/auth/signUp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, email, password }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Sign-up failed");
      }
      localStorage.setItem("username", username);
      window.location.href = "main.html";
    })
    .catch((error) => {
      console.error("Sign-up error:", error);
    });
}
