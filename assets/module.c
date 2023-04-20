#include <stdlib.h>
#include <time.h>
#include <emscripten.h>
#include <stdio.h>

#define NUM_CLUSTERS 2

EMSCRIPTEN_KEEPALIVE
void randomize_task_assignment(int *times, int n, int (*clusters)[NUM_CLUSTERS], int m) {
    // Set the seed for the random number generator
    srand(time(NULL));

    // Initialize the randomized assignment array
    int *assignment = (int *) malloc(n * sizeof(int));
    for (int i = 0; i < n; i++) {
        assignment[i] = i % NUM_CLUSTERS;
    }

    // Randomize the assignment
    for (int i = n - 1; i > 0; i--) {
        int j = rand() % (i + 1);
        int temp = assignment[i];
        assignment[i] = assignment[j];
        assignment[j] = temp;
    }

    // Update the task cluster matrix with the randomized assignment
    for (int i = 0; i < n; i++) {
        clusters[i][assignment[i]] = 1;
    }

    // Free the assignment array
    free(assignment);
}

int main() {
    // Define the time array and task cluster matrix
    int times[] = {10, 20, 30, 40, 50, 60, 70, 80, 90, 100};
    int clusters[][NUM_CLUSTERS] = {{0, 0}, {0, 0}, {0, 0}, {0, 0}, {0, 0}, {0, 0}, {0, 0}, {0, 0}, {0, 0}, {0, 0}};

    // Call the function to randomize the task assignment
    randomize_task_assignment(times, 10, clusters, 10);

    // Print the randomized task cluster matrix
    for (int i = 0; i < 10; i++) {
        printf("[%d, %d] ", clusters[i][0], clusters[i][1]);
    }

    return 0;
}
