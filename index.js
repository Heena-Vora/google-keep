function toggleNav(visible) {
  let width = visible ? "0" : "250px";
  document.getElementById("mySidenav").style.width = width;
  document.getElementById("main").style.marginLeft = width;
}

class GoogleApp {
  constructor() {
    this.notes = [];
    this.title = "";
    this.text = "";
    this.id = "";

    this.addEvents();
    this.loginCheck();
  }

  loginCheck() {
    var loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      var userView = document.getElementById("user-view");
      var anonymousView = document.getElementById("anonymous-view");
      anonymousView.style.display = loggedInUser ? "none" : "block";
      userView.style.display = loggedInUser ? "block" : "none";
      document.getElementById('usernameText').innerText = loggedInUser;
    }
  }

  openLoginModal() {
    var modalElem = document.getElementById("login-modal");
    modalElem.style.display = "flex";
  }

  login() {
    var user = document.getElementById("username").value;
    localStorage.setItem("user", user);
    var userView = document.getElementById("user-view");
    var anonymousView = document.getElementById("anonymous-view");
    anonymousView.style.display = user ? "none" : "block";
    userView.style.display = user ? "block" : "none";
    document.getElementById('usernameText').innerText = loggedInUser;
  }
  logout() {
    localStorage.clear();
    var userView = document.getElementById("user-view");
    var anonymousView = document.getElementById("anonymous-view");
    anonymousView.style.display = "block";
    userView.style.display = "none";
    document.getElementById('usernameText').innerText = 'Anonymous';
  }
  sideNavLinkClick() {
    var elem = event.target;
    if (!elem.classList.contains("active")) {
      var allMenu = document.getElementsByClassName(
        "btn-wrapper btn-menu btn-side-nav"
      );
      Array.from(allMenu).forEach((element) => {
        element.classList.remove("active");
      });
      elem.classList.add("active");
    }
  }
  takeNoteClick() {
    var modalElem = document.getElementById("form-container");
    modalElem.style.display = "flex";
  }
  getNotesByUser() {
    if (localStorage.getItem("users")) {
    }
  }

  addEvents() {
    // event for get/add user
    var tryKeepBtn = document.getElementById("tryKeepBtn");
    tryKeepBtn.addEventListener("click", this.openLoginModal);

    // event for login button
    var tryKeepBtn = document.getElementById("loginBtn");
    tryKeepBtn.addEventListener("click", this.login);

    // event for logout button
    var tryKeepBtn = document.getElementById("logoutBtn");
    tryKeepBtn.addEventListener("click", this.logout);

    // event for side nav
    var sideNavLinks = document.getElementsByClassName(
      "btn-wrapper btn-menu btn-side-nav"
    );
    Array.from(sideNavLinks).forEach((element) => {
      element.addEventListener("click", this.sideNavLinkClick);
    });

    // event for new note creation
    var takeNote = document.getElementById("empty-note");
    takeNote.addEventListener("click", this.takeNoteClick);

    // event for fetch and render notes

    // event for edit notes
  }
}
new GoogleApp();
