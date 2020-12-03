
let state = {
  tasks: [],
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

const renderList = () => {
  const {tasks} = state
  console.log(state.tasks)
  let tasksArray = tasks.map(task => {
    return renderTask(task)
  })

  return `<div class = "grid">${tasksArray.join(" ")}</div>`
}


  const render = () => {
    let htmlString = `<div>`
    htmlString += `<h1>To-do</h1>`
    htmlString += `<div class="Render" onclick = "renderList()">Show List</div>`
    htmlString += renderList();
    document.getElementById('app').innerHTML = htmlString
  }

  render();