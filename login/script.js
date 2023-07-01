let button = document.getElementById("login-btn");

button.addEventListener("click", (event) => {
  event.preventDefault();

  let userInfo = JSON.parse(localStorage.getItem("userInfo"));
  let email = document.getElementById("email-input").value;
  let password = document.getElementById("password-input").value;
  let userDetail = userInfo.find((user) => user.email == email);
  if (userDetail && userDetail.password == password) {
    sessionStorage.setItem("email", email);
    window.location.href = "../shop";
  } else {
    alert("invalid credential please signup");
  }
});

function onLoad() {
  if (sessionStorage.getItem("email")) {
    window.location.href = "../shop";
  }
}