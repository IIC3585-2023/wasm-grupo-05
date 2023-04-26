#include <stdio.h>
#include <stdlib.h>
#include <time.h>

// n - number of tasks
// m - number of processors
// time_tasks - array of processing times of tasks
int y_x(int i, int j, int rows) { return i * rows + j; }
int randomC(int n, int m, int *time_tasks, int *processors_assignments) {
  int *n_tasks_processors = calloc(m, sizeof(int));
  int random_processor;
  for (int i = 0; i < n; i++) {
    random_processor = rand() % m;
    processors_assignments[y_x(random_processor,
                               n_tasks_processors[random_processor], n)] =
        time_tasks[i];
    n_tasks_processors[random_processor]++;
  }
  free(n_tasks_processors);
  return 0;
}

int compare(const void* a, const void* b) {
    return (*(int*)b - *(int*)a); // para ordenar en orden decreciente
}
int partition(int arr[], int left, int right, int pivot) {
    while (left <= right) {
        while (arr[left] < pivot) {  // Changed from > to <
            left++;
        }
        while (arr[right] > pivot) { // Changed from < to >
            right--;
        }
        if (left <= right) {
            int temp = arr[left];
            arr[left] = arr[right];
            arr[right] = temp;
            left++;
            right--;
        }
    }
    return left;
}
void quicksort(int arr[], int left, int right) {
    if (left >= right) {
        return;
    }
    int pivot = arr[(left + right) / 2];
    int index = partition(arr, left, right, pivot);
    quicksort(arr, left, index - 1);
    quicksort(arr, index, right);
}


int greedyC(int n, int m, int* time_tasks, int* processors_assignments) {
    int start_time = clock();
    int* time_processors_sum = calloc(m, sizeof(int));
    int* n_tasks_processors = calloc(m, sizeof(int));

    quicksort(time_tasks, 0, n - 1);
    for (int i = 0; i < n; i++) {
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