let button = document.getElementById("save-info-btn");

button.addEventListener("click", (event) => {
    event.preventDefault();
    let userDetail = JSON.parse(localStorage.getItem("userInfo"));
    let fname = document.getElementById("fname");
    let lname = document.getElementById("lname");
    userDetail.fname = fname.value ? fname.value : userDetail.fname;
    userDetail.lname = lname.value ? lname.value : userDetail.lname;
  
    localStorage.setItem("userInfo", JSON.stringify(userDetail));
    alert("first name and last name updated succesfully");
});

let changePasswordBtn = document.getElementById("change-pass-btn");

changePasswordBtn.addEventListener("click", (event) => {
    event.preventDefault();
  
    let userDetail = JSON.parse(localStorage.getItem("userInfo"));
    let oldPassword = document.getElementById("old-pass-input");
    let newPassword = document.getElementById("new-pass-input");
    let confirmPassword = document.getElementById("confirm-pass-input");
    if (!oldPassword.value || !newPassword.value || !confirmPassword.value) {
      alert("all fields are required");
    } else {
      if (userDetail.password == oldPassword.value) {
        if (newPassword.value == confirmPassword.value) {
          userDetail.password = newPassword.value;
          localStorage.setItem("userInfo", JSON.stringify(userDetail));
          alert("Password Updated Succesfully");
          oldPassword.value = "";
          newPassword.value = "";
          confirmPassword.value = "";
        } else {
          alert("new password and confirm did not match");
        }
      } else {
        alert("old password is not correct");
      }
    }
});

let logoutBtn = document.getElementById("logout-btn");

logoutBtn.addEventListener("click", (event) => {
  event.preventDefault();
  sessionStorage.removeItem("email");
  window.location.href = "../";
});

function onLoad() {
    let userInfo = localStorage.getItem("userInfo");
  
    if (userInfo) {
      userInfo = JSON.parse(userInfo);
      document.getElementById("fname").value = userInfo.fname;
      document.getElementById("lname").value = userInfo.lname;
    }
}