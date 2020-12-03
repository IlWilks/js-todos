
let state = {
  tasks: [],
  rendered: false,
}

axios
  .get(`https://jsonplaceholder.typicode.com/todos`)
  .then(res => {
    state.tasks = res.data;
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
          <p>Completed: ${task.completed}</p>`

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


  const render = () => {
    let htmlString = `<div>`
    htmlString += `<h1>To-do</h1>`
    htmlString +=  `<div class = "list-controls">`
    htmlString +=   `<button class="buttons" onclick = clickToRender()>Show List</button>`
    htmlString +=   `<button class="buttons" onclick = clickToUnRender()>Hide List</button>`
    htmlString +=   `<button class="buttons" onclick = hideCompleted()>Hide Completed Tasks</button>`
    htmlString +=  `</div>`
    htmlString += renderList();
    document.getElementById('app').innerHTML = htmlString
  }

  render();