
// n - number of tasks
// m - number of processors
// time_tasks - array of processing times of tasks
const greedyJS = (n, m, time_tasks) => {
  // Arreglo de arreglos en que cada subarreglo tiene las
  // asignaciones (tiempo de la tarea) al procesador i
  const processor_assignments = [];

  // Arreglo que contiene la suma de los tiempos de las tareas asignadas a cada procesador
  const time_processors_sum = [];
  
  for (let i = 0; i < m; i++) {
    processor_assignments.push([]);
    time_processors_sum.push(0);
  }

  // Ordenar las tareas de mayor a menor
  time_tasks.sort((a, b) => b - a);

  // Asignar las tareas a los procesadores
  // Para cada tarea
  let min_completion_time;
  let min_processor;
  for (let i = 0; i < n; i++) {
    // Encontrar el procesador con el menor tiempo de completación
    min_completion_time = time_processors_sum[0];
    min_processor = 0;
    for (let j = 1; j < m; j++) {
      if (time_processors_sum[j] < min_completion_time) {
        min_completion_time = time_processors_sum[j];
        min_processor = j;
      }
    }
    time_processors_sum[min_processor] += time_tasks[i];
    processor_assignments[min_processor].push(time_tasks[i]);
  }
  return processor_assignments;
};

console.log(greedyJS(5, 2, [30, 50, 10, 20, 90]));
