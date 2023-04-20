const addTaskBtn = document.getElementById('addTaskBtn');
const randomBtn = document.getElementById('randomBtn');
const container = document.getElementById('TaskContainer');
const c1 = document.getElementById('C1Container');
const c2 = document.getElementById('C2Container');

const createTaskDiv = (value) => {
  const taskDiv = document.createElement('div');
  taskDiv.classList.add('task');

  const taskInput = document.createElement('input');
  taskInput.classList.add('taskInput');
  taskInput.type = 'text';
  taskInput.value = value;

  taskDiv.appendChild(taskInput);
  return taskDiv;
};

addTaskBtn.addEventListener('click', () => {
  const taskDiv = createTaskDiv('0');
  container.appendChild(taskDiv);
});

// puede servir para mostrar la suma total del cluster
// const getTimeSum = (c) => Array.from(c.children).reduce((previous, current) => {
//   const toAdd = current.querySelector('input');
//   // console.log(toAdd?.value);
//   if (toAdd) {
//     return previous + parseInt(toAdd.value, 10);
//   }
//   return previous;
// }, 0);

const randomizeTaskAssignment = (times) => {
  const cluster1 = Array.from({ length: times.length }, () => Math.floor(Math.random() * 2));
  const cluster2 = cluster1.map((x) => (x === 1 ? 0 : 1));
  return [cluster1, cluster2];
};

const getTimes = (c) => Array.from(c.children)
  .map((x) => {
    const input = x.querySelector('input');
    if (input) {
      return parseInt(input.value, 10);
    }
    return null;
  })
  .filter((x) => x !== null);

const removeAllTasks = (c) => {
  while (c.children.length > 0) {
    const remove = c.querySelector('.task')
    container.removeChild(remove);
  }
};

const addTaskArray = (times, clusterArray, cluster) => {
  clusterArray.forEach((element, index) => {
    if (element) {
      cluster.appendChild(createTaskDiv(times[index]));
    }
  });
};

randomBtn.addEventListener('click', () => {
  // Intente hacer lo de cargar el modulo wasm pero no pude

  // Esto falla la segunda vez
  // removeAllTasks(c1);
  // removeAllTasks(c2);

  // Define the input data
  const times = getTimes(container);
  const clusters = randomizeTaskAssignment(times);

  randomizeTaskAssignment(times, clusters);

  // quito las que ya estaban escritas y pongo nuevas con el cluster
  removeAllTasks(container);
  addTaskArray(times, clusters[0], c1);
  addTaskArray(times, clusters[1], c2);
});
