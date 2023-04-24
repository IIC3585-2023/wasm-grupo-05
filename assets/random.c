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
