let button = document.getElementById("signup-btn");

button.addEventListener("click", (event) => {
  event.preventDefault();
  let userInfo = localStorage.getItem("userInfo");
  if (userInfo) {
    userInfo = JSON.parse(userInfo);
  } else {
    userInfo = [];
  }
  let userDetail = {
    fname: document.getElementById("fname").value,
    lname: document.getElementById("lname").value,
    email: document.getElementById("email-input").value,
    password: document.getElementById("password-input").value,
  };
  
  let confirmPassword = document.getElementById("confirm-password-input").value;

  if (!userDetail.fname ||!userDetail.lname ||!userDetail.email ||!userDetail.password ||!confirmPassword) {
    alert("All fields are required.");
  } else {
    if (userDetail.password == confirmPassword) {
      if (userInfo.filter((user) => user.email == userDetail.email)) {
        alert("User already exist. Please login");
      } else {
        userInfo.push(userDetail);
        localStorage.setItem("userInfo", JSON.stringify(userInfo));

        alert("Successfull Signedup. Please login ");
      }

      window.location.href = "../login";
    } else {
      alert("Passwords are not matching");
    }
  }
});