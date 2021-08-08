function toggleNav(visible) {
  let width = visible ? "0" : "250px";
  document.getElementById("mySidenav").style.width = width;
  document.getElementById("main").style.marginLeft = width;
}

class GoogleApp {
  constructor() {
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
      document.getElementById("usernameText").innerText = loggedInUser;
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
    document.getElementById("usernameText").innerText = loggedInUser;
  }
  logout() {
    localStorage.clear();
    var userView = document.getElementById("user-view");
    var anonymousView = document.getElementById("anonymous-view");
    anonymousView.style.display = "block";
    userView.style.display = "none";
    document.getElementById("usernameText").innerText = "Anonymous";
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
    if (this.title) {
      document.getElementById("note-title").value = this.title;
      document.getElementById("note-text").value = this.text;
    }
  }
  getNotesByUser() {
    if (localStorage.getItem("users")) {
    }
  }

  addEvents() {
    // event for get/add user
    var tryKeepBtn = document.getElementById("tryKeepBtn");
    tryKeepBtn.addEventListener("click", this.openLoginModal.bind(this));

    // event for login button
    var tryKeepBtn = document.getElementById("loginBtn");
    tryKeepBtn.addEventListener("click", this.login.bind(this));

    // event for logout button
    var tryKeepBtn = document.getElementById("logoutBtn");
    tryKeepBtn.addEventListener("click", this.logout.bind(this));

    // event for side nav
    var sideNavLinks = document.getElementsByClassName(
      "btn-wrapper btn-menu btn-side-nav"
    );
    Array.from(sideNavLinks).forEach((element) => {
      element.addEventListener("click", this.sideNavLinkClick.bind(this));
    });

    // event for new note creation
    var takeNote = document.getElementById("empty-note");
    takeNote.addEventListener("click", this.takeNoteClick.bind(this));

    var addNote = document.getElementById("submit-button");
    addNote.addEventListener("click", this.handleFormClick.bind(this));

    var addNote = document.getElementById("form-close-button");
    addNote.addEventListener("click", this.resetForm.bind(this));

    var notesBlock = document.getElementById("notes");
    notesBlock.addEventListener("click", this.selectNote.bind(this));

    var notesAll = localStorage.getItem("notes");
    this.notes = notesAll ? JSON.parse(notesAll) : [];
    if (this.notes.length) this.displayNotes();
    this.title = "";
    this.text = "";
    this.id = "";
  }

  handleFormClick(event) {
    const title = document.getElementById("note-title").value;
    const text = document.getElementById("note-text").value;
    const hasNote = title || text;

    if (this.id) {
      this.notes = this.notes.map((note) =>
        note.id === Number(this.id) ? { ...note, title, text } : note
      );
    } else if (hasNote) {
      const newNote = {
        title,
        text,
        color: "white",
        id:
          this.notes.length > 0 ? this.notes[this.notes.length - 1].id + 1 : 1,
      };
      this.notes = [...this.notes, newNote];
    }
    localStorage.setItem("notes", JSON.stringify(this.notes));
    this.displayNotes();
    this.resetForm();
  }

  resetForm() {
    document.getElementById("note-title").value = "";
    document.getElementById("note-text").value = "";
    var modalElem = document.getElementById("form-container");
    modalElem.style.display = "none";
  }

  selectNote(event) {
    const $selectedNote = event.target.closest(".note");
    if (!$selectedNote) return;
    const [$noteTitle, $noteText] = $selectedNote.children;
    this.title = $noteTitle.innerText;
    this.text = $noteText.innerText;
    this.id = $selectedNote.dataset.id;
    this.takeNoteClick();
    this.edit = true;
  }

  displayNotes() {
    const hasNotes = this.notes.length > 0;

    document.getElementById("notes").innerHTML = this.notes
      .map(
        (note) => `
        <div style="background: ${note.color};" class="note" data-id="${
          note.id
        }">
          <div class="${note.title && "note-title"}">${note.title}</div>
          <div class="note-text">${note.text}</div>
          <div class="toolbar-container">
            <div class="toolbar">
            </div>
          </div>
        </div>
     `
      )
      .join("");
  }
}
new GoogleApp();
