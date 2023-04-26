// n - number of tasks
// m - number of processors
// time_tasks - array of processing times of tasks
function quicksort(arr, left = 0, right = arr.length - 1) {  if (left >= right) {
  return;
}

const pivot = arr[Math.floor((left + right) / 2)];
const index = partition(arr, left, right, pivot);

quicksort(arr, left, index - 1);
quicksort(arr, index, right);
}

function partition(arr, left, right, pivot) {
while (left <= right) {
  while (arr[left] > pivot) {  // Changed from < to >
    left++;
  }

  while (arr[right] < pivot) { // Changed from > to <
    right--;
  }

  if (left <= right) {
    swap(arr, left, right);
    left++;
    right--;
  }
}

return left;
}

function swap(arr, i, j) {
const temp = arr[i];
arr[i] = arr[j];
arr[j] = temp;
}

const greedyJS = (n, m, time_tasks) => {
  const processor_assignments = [];
  const time_processors_sum = [];
  for (let i = 0; i < m; i++) {
    processor_assignments.push([]);
    time_processors_sum.push(0);
  }
  quicksort(time_tasks);
  let min_completion_time;
  let min_processor;
  for (let i = 0; i < n; i++) {
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
