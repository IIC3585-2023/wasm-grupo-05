#include <stdio.h>
#include <stdlib.h>
#include <time.h>

// n - number of tasks
// m - number of processors
// time_tasks - array of processing times of tasks
int y_x(int i, int j, int rows) { return i * rows + j; }
int randomC(int n, int m, int *time_tasks, int *processors_assignments) {
  // Arreglo de arreglos en que cada subarreglo tiene las
  // asignaciones (tiempo de la tarea) al procesador i
  // int** processors_assignments = malloc(m * sizeof(int*));
  // for (int i = 0; i < m; i++) {
  //   processors_assignments[i] = calloc(n, sizeof(int));
  // }

  // Arreglo que contiene la cantidad de tareas asignadas a cada procesador
  int *n_tasks_processors = calloc(m, sizeof(int));

  // Asignar las tareas a los procesadores
  int random_processor;
  // Para cada tarea
  for (int i = 0; i < n; i++) {
    // Escoger un procesador al azar
    random_processor = rand() % m;
    // Asignar la tarea al procesador
    // processors_assignments[random_processor]
    //                       [n_tasks_processors[random_processor]] =
    //                           time_tasks[i];
    processors_assignments[y_x(random_processor,
                               n_tasks_processors[random_processor], n)] =
        time_tasks[i];
    n_tasks_processors[random_processor]++;
  }
  // processors_assignments[y_x(0, 3, n)] = 111111;

      free(n_tasks_processors);
  return 0;
}

int compare(const void* a, const void* b) {
    return (*(int*)b - *(int*)a); // para ordenar en orden decreciente
}

// n - number of tasks
// m - number of processors
// time_tasks - array of processing times of tasks
int greedyC(int n, int m, int* time_tasks, int* processors_assignments) {
    // Arreglo de arreglos en que cada subarreglo tiene las
    // asignaciones (tiempo de la tarea) al procesador i
    // int** processors_assignments = malloc(m * sizeof(int*));
    // for (int i = 0; i < m; i++) {
    //   processors_assignments[i] = calloc(n, sizeof(int));
    // }

    // Arreglo que contiene la suma de los tiempos de las tareas asignadas a cada procesador  
    int* time_processors_sum = calloc(m, sizeof(int));
    // Arreglo que contiene la cantidad de tareas asignadas a cada procesador
    int* n_tasks_processors = calloc(m, sizeof(int));

    // Ordenar las tareas de mayor a menor
    qsort(time_tasks, n, sizeof(int), compare);

    // Asignar las tareas a los procesadores
    // Para cada tarea
    for (int i = 0; i < n; i++) {
        // Encontrar el procesador con menor tiempo de completación
        int min_completion_time = time_processors_sum[0];
        int min_processor = 0;
        for (int j = 1; j < m; j++) {
            if (time_processors_sum[j] < min_completion_time) {
                min_completion_time = time_processors_sum[j];
                min_processor = j;
            }
        }
        time_processors_sum[min_processor] += time_tasks[i]; // assign task to the processor with earliest completion time
        processors_assignments[y_x(min_processor, n_tasks_processors[min_processor], n)] = time_tasks[i];
        n_tasks_processors[min_processor]++;
    }
    free(time_processors_sum);
    free(n_tasks_processors);
    return 0;
}


int main() {
  int n = 5;
  int m = 2;
  int tasks[5] = {30, 50, 10, 20, 90};

  srand(time(NULL));
  //   int** assignments = randomC(n, m, tasks);
  //   for (int i = 0; i < m; i++) {
  //       for (int j = 0; j < n; j++) {
  //           if (assignments[i][j] != 0) {
  //               printf("%d ", assignments[i][j]);
  //           }
  //       }
  //       printf("\n");
  //   }
  return 0;
}
