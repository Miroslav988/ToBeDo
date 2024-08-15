//#region Глобальные-перменные
let currentTaskList = null;
//#endregion
//#region Кнопки
const addNewClassBtn = document.querySelector(".addNewClass");
const dropDownBtn = document.querySelector(".dropDownBtn");
const submitClassBtn = document.querySelector(".classSubmit");
const themeToggle = document.querySelector(".themeToggle");
const submitTaskBtn = document.querySelector(".submitTaskBtn");
//#endregion
//#region Формы
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
//#endregion
//MODALS
const classBGSelector = document.querySelector('select[name="selectClassBG"]');

const addBlock = document.querySelector(".addBlock");
const mainContent = document.getElementById("root");
const modalCover = document.querySelectorAll(".modalCover");
const body = document.body;
//
//#region классы
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
  const editClassBtn = userClass.querySelector(".editUserHeader");
  editClassBtn.addEventListener("click", () => {
    const editCurrentClass = event.target.closest(".userClassContainer");
    openEditClassModal(editCurrentClass);
    openModal();
  });
  const addTaskBtn = userClass.querySelector(".addTask");
  addTaskBtn.addEventListener("click", () => {
    currentTaskList = event.target
      .closest(".userClassContainer")
      .querySelector(".userTasksList");
  });
  addTaskBtn.addEventListener("click", openModal);
  mainContent.appendChild(userClass);
};
//#endregion

const createNewTask = (title, note) => {
  const template = document.querySelector(".newTask");
  const newTask = template.content.cloneNode(true);
  newTask.querySelector(".taskTitle").textContent = title;
  newTask.querySelector(".taskNote").textContent = note;
  return newTask;
};
const addNewTask = () => {
  event.preventDefault();
  const title = taskTitle.value;
  const note = taskNote.value;

  const userTask = createNewTask(title, note);
  const enlargeBtn = userTask.querySelector(".enlargeTaskBtn");
  const addSubTaskBtn = userTask.querySelector(".addTask");

  currentTaskList.appendChild(userTask);

  enlargeBtn.addEventListener("click", openModal);
};
//#region modals
const openModal = () => {
  const currentBtn = event.target;
  const modalType = currentBtn.dataset.modal;
  const needToBeOpened = document.getElementById(modalType);
  needToBeOpened.classList.add("opened");
};
const closeModal = () => {
  const openedModal = event.target.closest(".opened");
  openedModal.classList.remove("opened");
};

//#endregion

//#region editModals
const openEditClassModal = (editCurrentClass) => {
  const editTitle = editCurrentClass.querySelector(".className");
  editClassTitle.value = editTitle.textContent;
  submitClassBtn.addEventListener("click", () => {
    submitClassEdit(editTitle);
  });
  openModal();
};
const openEditTaskModal = () => {
  const editTask = event.target.closest(".userTaskContainer");
  const editTitle = editTask.querySelector(".taskTitle");
  const editNote = editTask.querySelector(".taskNote");
  submitTaskBtn.addEventListener("click", () =>
    submitTaskEdit(editTitle, editNote)
  );
  openModal();
};
//#endregion

//#region сабмиты
const submitClassEdit = (editTitle) => {
  editTitle.textContent = editClassTitle.value;
};
const submitTaskEdit = (editTitle, editNote) => {
  editTitle.textContent = enlargeTaskTitle.value;
  editNote.textContent = enlargeTaskNote.value;
};
//#endregion

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
submitTaskBtn.addEventListener("click", addNewTask);
dropDownBtn.addEventListener("click", openDropdown);
addNewClassBtn.addEventListener("click", addNewClass);
