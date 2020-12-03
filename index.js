
let state = {
  tasks: [],
  rendered: false,
}

let original_tasks = []

axios
  .get(`https://jsonplaceholder.typicode.com/todos`)
  .then(res => {
    state.tasks = res.data;
    original_tasks = state.tasks
    render();
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });

const renderTask = (task) => {
  return `<div class= taskcard>
          <h2>Task name: ${task.title}</h2>
          <p>Completed: ${task.completed}</p>
          <div class= "Complete Button">
            <button onclick= "toggle(${task.id})">Toggle Task</button>
          </div>
          <div class="card_footer">
            <p>User ID: ${task.userId}</p>
            <p>id: ${task.id}</p>
          </div>
          </div>`
  render();
}

const toggle = (id) => {
  state.tasks.map((item , i) => {
    if (item.id == id) {
      state.tasks[i].completed = !state.tasks[i].completed
    }
  })
  render();
} 

const clickToRender = () => {
  state.rendered = true;
  render();
}

const clickToUnRender = () => {
  state.rendered = false;
  render();
}

const renderList = () => {
  const {tasks} = state

  if (state.rendered == true) {
    let tasksArray = tasks.map(task => {
      return renderTask(task)
    })

    return `<div class = "grid">${tasksArray.join(" ")}</div>`
  }
  return ""

  render();
}

const hideCompleted = () => {
  if (state.rendered == true) {
    console.log('hide test')
    let filteredCompleted = state.tasks.filter(task => task.completed !== true)
    state.tasks = filteredCompleted;
    render();
  }
  return ""
}

const sortByName = () => {
  console.log("Im sorting")
  state.tasks.sort((task1, task2) => {
    task1name = task1.title.split(" ")[0]
    task2name = task2.title.split(" ")[0]
    if (task1name < task2name) {
      return -1
    }
    if (task1name > task2name) {
      return 1
    }
    return 0;
  })

  render();
}


const sortByUserID = () => {
  console.log("clickd")
  state.tasks.sort((a,b) => {
    if (a.userId > b.userId) {
      return 1
    }
    if (a.userId < b.userId) {
      return -1
    }
    return 0;
  })

  render();
}

const resetTasks = () => {
    state.tasks = original_tasks
    render();
}

  const render = () => {
    let htmlString = `<div>`
    htmlString += `<h1>To-do</h1>`
    htmlString +=  `<div class = "list-controls">`
    htmlString +=   `<button class="buttons" onclick = clickToRender()>Show List</button>`
    htmlString +=   `<button class="buttons" onclick = clickToUnRender()>Hide List</button>`
    htmlString +=   `<button class="buttons" onclick = hideCompleted()>Hide Completed Tasks</button>`
    htmlString +=   `<button class="buttons" onclick = sortByName()>Sort by Name</button>`
    htmlString +=   `<button class="buttons" onclick = sortByUserID()>Sort by User ID</button>`
    htmlString +=   `<button class="buttons" onclick = resetTasks()>Reset all Tasks</button>`
    htmlString +=   `</div>`
    htmlString += renderList();
    document.getElementById('app').innerHTML = htmlString
  }

  render();