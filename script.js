let currentClass = null;
let editCurrentClass = null;
let editCurrentTask = null;
let selectedValue;
//BUTTONS
const addNewClassBtn = document.querySelector(".addNewClass");
const dropDownBtn = document.querySelector(".dropDownBtn");
const submitClassBtn = document.querySelector(".classSubmit");
const themeToggle = document.querySelector(".themeToggle");
//
//FORMS
const allForms = document.querySelectorAll("form");

const taskData = document.forms.taskInfoModal;
const taskTitle = taskData.elements.taskTitle;
const taskNote = taskData.elements.taskNote;

const classData = document.forms.editClassModal;
const editClassTitle = classData.elements.editClassTitle;
const editClassBG = classData.elements.selectClassBG;

const enlargeTaskContainer = document.forms.enlargeTaskInfo;
const enlargeTaskTitle = enlargeTaskContainer.elements.enlargeTaskTitle;
const enlargeTaskNote = enlargeTaskContainer.elements.enlargeTaskNote;
//
//MODALS
const classBGSelector = document.querySelector('select[name="selectClassBG"]');

const addBlock = document.querySelector(".addBlock");
const mainContent = document.getElementById("root");
const modalCover = document.querySelectorAll(".modalCover");
const body = document.body;
//
const checkValidation = (attribute) => {
  if (attribute.checkValidity()) {
    submitBtn.removeAttribute("disabled");
  } else {
    submitBtn.setAttribute("disabled", "true");
  }
};

const openDropdown = () => {
  addBlock.classList.toggle("show");
  mainContent.classList.toggle("shiftDown");
  dropDownBtn.classList.toggle("rotate-90");
};
const createNewClass = (name) => {
  const template = document.querySelector(".newClass");
  const newClass = template.content.cloneNode(true);
  newClass.querySelector(".className").textContent = name;
  return newClass;
};
const addNewClass = () => {
  const name = document.querySelector(".newClassName").value;
  const userClass = createNewClass(name);
  const editBtn = userClass.querySelector(".editUserHeader");
  const addTaskBtn = userClass.querySelector(".addTask");
  mainContent.appendChild(userClass);
  editBtn.addEventListener("click", openModal);
  addTaskBtn.addEventListener("click", openModal);
};

const createNewTask = (title, note) => {
  const template = document.querySelector(".newTask");
  const newTask = template.content.cloneNode(true);
  newTask.querySelector(".taskTitle").textContent = title;
  newTask.querySelector(".taskNote").textContent = note;
  return newTask;
};
const addNewTask = (userClass) => {
  event.preventDefault();
  const title = taskTitle.value;
  const note = taskNote.value;

  const userTask = createNewTask(title, note);
  const enlargeBtn = userTask.querySelector(".enlargeTaskBtn");
  const currentClass = userClass.querySelector(".userTasksList");
  currentClass.appendChild(userTask);

  const addSubTaskBtn = userTask.querySelector(".addTask");

  enlargeBtn.addEventListener("click", openModal);
};

const openModal = () => {
  const currentBtn = event.target;
  const modalType = currentBtn.dataset.modal;
  const needToBeOpened = document.getElementById(modalType);
  needToBeOpened.classList.add("opened");
  switch (modalType) {
    case "editClassName":
      openEditClassModal();
      break;
    case "enlargeTaskInfo":
      openEditTaskModal();
      break;
  }
};
const closeModal = () => {
  const openedModal = event.target.closest(".opened");
  openedModal.classList.remove("opened");
};
const openEditClassModal = () => {
  const editClass = event.target.closest(".userClassContainer");
  const editTitle = editClass.querySelector(".className");
  editClassTitle.value = editTitle.textContent;

  const submitClassBtn = document.querySelector(".classSubmit");
  submitClassBtn.addEventListener("click", () =>
    submitClassEdit(editTitle, editClass, selectedValue)
  );
};
const submitClassEdit = (editTitle, editClass, selectedValue) => {
  editTitle.textContent = editClassTitle.value;
  editClass.classList.add(selectedValue);
};

const openEditTaskModal = () => {
  const editTask = event.target.closest(".userTaskContainer");
  const editTitle = editTask.querySelector(".taskTitle");
  const editNote = editTask.querySelector(".taskNote");

  const submitTaskBtn = document.querySelector(".taskSubmit");
  submitTaskBtn.addEventListener("click", () =>
    submitTaskEdit(editTitle, editNote)
  );
};
const submitTaskEdit = (editTitle, editNote) => {
  editTitle.textContent = enlargeTaskTitle.value;
  editNote.textContent = enlargeTaskNote.value;
};

allForms.forEach((form) => {
  form.addEventListener("click", () => {
    event.stopPropagation();
  });
});

modalCover.forEach((cover) => {
  cover.addEventListener("click", closeModal);
});

themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark-theme");
});

classBGSelector.addEventListener("change", () => {
  selectedValue = event.target.value;
});
dropDownBtn.addEventListener("click", openDropdown);
addNewClassBtn.addEventListener("click", addNewClass);
