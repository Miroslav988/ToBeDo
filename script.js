//#region Глобальные-перменные
let currentTaskList = null;
let currentTask = null;
//#endregion

//#region Template
const newTaskTemplate = document.querySelector(".newTask");
const newClassTemplate = document.querySelector(".newClass");
const addNewSubTaskTemplate = document.querySelector(".addNewSubTask");
//#endregion
//#region Кнопки
const addNewClassBtn = document.querySelector(".addNewClass");
const dropDownBtn = document.querySelector(".dropDownBtn");
const submitClassBtn = document.querySelector(".classSubmit");
const themeToggle = document.querySelector(".themeToggle");
const submitTaskBtn = document.querySelector(".submitTaskBtn");
const addSubTaskBtn = document.querySelector(".addSubTask");
//#endregion
//#region Формы
const allForms = document.querySelectorAll("form");
const classes = ["none", "pink", "blue", "purple", "green"];
const subTaskTitleInput = document.querySelector(".subTaskTitleInput");

const taskData = document.forms.taskInfoModal;
const taskTitle = taskData.elements.taskTitle;
const taskNote = taskData.elements.taskNote;

const enlargeTaskContainer = document.forms.enlargeTaskInfo;
const enlargeTaskTitle = enlargeTaskContainer.elements.enlargeTaskTitle;
const enlargeTaskNote = enlargeTaskContainer.elements.enlargeTaskNote;
//#endregion

//#region other
const addBlock = document.querySelector(".addBlock");
const mainContent = document.getElementById("root");
const modalCover = document.querySelectorAll(".modalCover");
const body = document.body;
const subTasksList = document.querySelector(".subTasksList");
//#endregion

//#region классы
const openDropdown = () => {
  addBlock.classList.toggle("show");
  mainContent.classList.toggle("shiftDown");
  dropDownBtn.classList.toggle("rotate-90");
};
const createNewClass = (name) => {
  const newClass = newClassTemplate.content.cloneNode(true);
  newClass.querySelector(".className").textContent = name;
  return newClass;
};
const addNewClass = () => {
  const name = document.querySelector(".newClassName").value;
  const userClass = createNewClass(name);
  const addTaskBtn = userClass.querySelector(".addTask");
  addTaskBtn.addEventListener("click", () => {
    currentTaskList = event.target
      .closest(".userClassContainer")
      .querySelector(".userTasksList");
  });
  const deliteBtn = userClass.querySelector(".deliteClass");
  deliteBtn.addEventListener("click", deliteClass);
  const classThemeToggle = userClass.querySelector(".classThemeToggle");
  classThemeToggle.addEventListener("click", () => {
    const userClassContainer = event.target.closest(".userClassContainer");
    let currentClassIndex = -1;
    for (let i = 0; i < classes.length; i++) {
      if (userClassContainer.classList.contains(classes[i])) {
        currentClassIndex = i;
        break;
      }
    }
    if (currentClassIndex === -1) {
      currentClassIndex = 0;
    }
    const nextClassIndex = (currentClassIndex + 1) % classes.length;
    userClassContainer.classList.remove(classes[currentClassIndex]);
    userClassContainer.classList.add(classes[nextClassIndex]);
  });
  addTaskBtn.addEventListener("click", openModal);
  mainContent.appendChild(userClass);
};
//#endregion

//#region taskFunc
class Task {
  constructor(title, note, subTasks) {
    this.title = title;
    this.note = note;
    this.subTasks = [];
  }
}
class subTask {
  constructor(subTitle, status) {
    this.subTitle = subTitle;
    this.status = status;
  }
}
const createNewTask = (task) => {
  const newTask = newTaskTemplate.content.cloneNode(true);
  newTask.querySelector(".taskTitle").textContent = task.title;
  newTask.querySelector(".taskNote").textContent = task.note;
  return newTask;
};
const addNewTask = () => {
  event.preventDefault();
  const title = taskTitle.value;
  const note = taskNote.value;
  const subTasks = [];
  const newTask = new Task(title, note, subTasks);
  console.log(newTask);
  const userTask = createNewTask(newTask);
  const enlargeBtn = userTask.querySelector(".enlargeTaskBtn");
  enlargeBtn.addEventListener("click", () => {
    showTaskInfo(newTask);
    event.target.closest(".");
  });
  currentTaskList.appendChild(userTask);
};

const showTaskInfo = (newTask) => {
  openModal();
  enlargeTaskTitle.value = newTask.title;
  enlargeTaskNote.value = newTask.note;
  newTask.subTasks.forEach((subTask) => {
    const subTaskContainer = addNewSubTaskTemplate.content.cloneNode(true);
    subTaskContainer.querySelector(".newSubTaskLable").textContent =
      subTask.textContent;
  });
};
//#endregion

//#region SubTasks
const addSubTask = () => {
  event.preventDefault();
  const newSubTask = addNewSubTaskTemplate.content.cloneNode(true);
  subTaskTitleInput.value =
    newSubTask.querySelector(".newSubTaskLable").textContent;
};

//#endregion

// const createSubTask = (name) => {
//   const template = document.querySelector(".addNewSubTask");
//   const newSubTask = template.content.cloneNode(true);
//   newSubTask.querySelector(".newSubTaskLable").textContent = name;
//   return newSubTask;
// };
// const addSubTask = () => {
//   event.preventDefault();
//   const subTaskItem = document
//     .querySelector(".addNewSubTask")
//     .content.cloneNode(true);
//   const label = subTaskItem.querySelector(".newSubTaskLable");
//   const span = document.createElement("span");
//   const newSubTaskInput = document.querySelector(".newEnlargeSubTask");
//   span.textContent = newSubTaskInput.value;
//   label.appendChild(span);
//   const subTasksList = enlargeTaskInfo.querySelector(".subTasksList");
//   subTasksList.appendChild(subTaskItem);
//   newSubTaskInput.value = "";
// };
// addSubTaskBtn.addEventListener("click", addSubTask);

// создать отдельную функцию открытия модалки с субтасками,
// в которую будем передавать значения объекта
// с помощью myArray.unshift(newValue); добавляем новые субтаски
// используя forEach будем показывать субтаски в поле

//#region modals
const openModal = () => {
  const modalType = event.currentTarget.dataset.modal;
  const needToBeOpened = document.getElementById(modalType);
  needToBeOpened.classList.add("opened");
};
const closeModal = () => {
  const openedModal = event.target.closest(".opened");
  openedModal.classList.remove("opened");
};

//#endregion

//#region editModal
const deliteClass = () => {
  event.target.closest(".userClassContainer").remove();
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
const submitTaskEdit = (editTitle, editNote) => {
  editTitle.textContent = enlargeTaskTitle.value;
  editNote.textContent = enlargeTaskNote.value;
};
//#endregion

//#region Events
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

submitTaskBtn.addEventListener("click", addNewTask);
dropDownBtn.addEventListener("click", openDropdown);
addNewClassBtn.addEventListener("click", addNewClass);
//#endregion
