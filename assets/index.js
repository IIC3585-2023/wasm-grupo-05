const randomBtn = document.getElementById('randomBtn');
const randomJSButton = document.getElementById('randomJSButton');
const randomCButton = document.getElementById('randomCButton');
const greedyJSButton = document.getElementById('greedyJSButton');
const greedyCButton = document.getElementById('greedyCButton');
const randomJSTime = document.getElementById('randomJSTime');
const randomCTime = document.getElementById('randomCTime');
const greedyJSTime = document.getElementById('greedyJSTime');
const greedyCTime = document.getElementById('greedyCTime');
const c1 = document.getElementById('C1Container');
const c2 = document.getElementById('C2Container');

const randomizeTaskAssignment = (times, n) => {
  const clusters = Array.from({ length: n }, () => []);
  for (let i = 0; i < times.length; i++) {
    const cluster = clusters[Math.floor(Math.random() * n) % n];
    cluster.push(times[i]);
  }
  return clusters;
};

const addTaskArray = (clusterArray, cluster) => {
  // add a parragraph with the times
  const p = document.createElement('p');
  p.innerHTML = clusterArray.join(', ');
  p.classList.add('tasks');
  p.classList.add('overflow-auto');
  cluster.appendChild(p);
};

const getTimes = () => {
  const times = document.getElementById('time-tasks').value;
  return times.split(',').map((time) => parseInt(time, 10));
};

const removeAllTasks = (container) => {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
};

const getParams = () => {
  const m = parseInt(document.getElementById('numClusters').value);
  const times = getTimes();
  return { m, times };
};
const showClusters = (clusters, container, m) => {
  for (let i = 0; i < m; i++) {
    const cluster = document.createElement('div');
    cluster.classList.add('cluster');
    const title = document.createElement('p');
    title.innerHTML = `Cluster ${i + 1}`;
    title.classList.add('cluster-title');
    cluster.appendChild(title);
    addTaskArray(clusters[i], cluster);
    container.appendChild(cluster);
  }
};

randomJSButton.addEventListener('click', () => {
  const { m, times } = getParams();
  const initialTime = performance.now();
  const clusters = randomizeTaskAssignment(times, m);
  const endTime = performance.now();
  randomJSTime.innerHTML = `${endTime - initialTime} ms`;
  const container = document.getElementById('cluster-container');
  removeAllTasks(container);
  showClusters(clusters, container, m);

});

greedyJSButton.addEventListener('click', () => {
  const { m, times } = getParams();
  const initialTime = performance.now();
  const clusters = greedyJS(times.length, m, times);
  const endTime = performance.now();
  greedyJSTime.innerHTML = `${endTime - initialTime} ms`;
  const container = document.getElementById('cluster-container');
  removeAllTasks(container);
  showClusters(clusters, container, m);

});

const arrayToMatrix = (arr, rows, cols) => {
  const matrix = [];
  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < cols; j++) {
      const offset = i * cols + j;
      // console.log(arr[offset], i, j);
      if (arr[offset]) {
        row.push(arr[offset]);
      }
    }
    matrix.push(row);
  }
  return matrix;
};
// Wait for WASM compilation.
Module.onRuntimeInitialized = () => {
  // ------//
  // WASM //
  // ------//
  randomCButton.addEventListener('click', () => {
    const { m, times } = getParams();
    const timesArray = Uint32Array.from(times);
    const timePtr = Module._malloc(timesArray.byteLength);
    Module.HEAPU32.set(timesArray, timePtr >> 2);
    
    const clusterArray = Uint32Array.from({ length: m * timesArray.length });
    const clusterPtr = Module._malloc(clusterArray.byteLength);
    Module.HEAPU32.set(clusterArray, clusterPtr >> 2);
      
    const updatedClusterArray = Module.HEAPU32.subarray(
      clusterPtr >> 2,
      (clusterPtr >> 2) + m * timesArray.length,
      );
        
    const initialTime = performance.now();
    Module.ccall(
      'randomC',
      'int',
      ['number', 'number', 'number', 'number'],
      [timesArray.length, m, timePtr, clusterPtr],
    );
    const endTime = performance.now();
    randomCTime.innerHTML = `${endTime - initialTime} ms`;
    const updatedCluster = Array.from(updatedClusterArray);
    const matrix = arrayToMatrix(updatedCluster, m, times.length);

    const container = document.getElementById('cluster-container');
    removeAllTasks(container);
    showClusters(matrix, container, m);
  });

  greedyCButton.addEventListener('click', () => {
    const { m, times } = getParams();
    const timesArray = Uint32Array.from(times);
    const timePtr = Module._malloc(timesArray.byteLength);
    Module.HEAPU32.set(timesArray, timePtr >> 2);
    
    const clusterArray = Uint32Array.from({ length: m * timesArray.length });
    const clusterPtr = Module._malloc(clusterArray.byteLength);
    Module.HEAPU32.set(clusterArray, clusterPtr >> 2);
      
    const updatedClusterArray = Module.HEAPU32.subarray(
      clusterPtr >> 2,
      (clusterPtr >> 2) + m * timesArray.length,
      );
    const initialTime = performance.now();
    Module.ccall(
      'greedyC',
      'int',
      ['number', 'number', 'number', 'number'],
      [timesArray.length, m, timePtr, clusterPtr],
    );
    const endTime = performance.now();
    greedyCTime.innerHTML = `${endTime - initialTime} ms`;
    const updatedCluster = Array.from(updatedClusterArray);
    const matrix = arrayToMatrix(updatedCluster, m, times.length);

    const container = document.getElementById('cluster-container');
    removeAllTasks(container);
    showClusters(matrix, container, m);
  });
};
