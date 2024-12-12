// Generates a random array with random values between 1 and 100
const generateArray = (size = 50) => {
    return Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 1);
};

// Function to render the array as bars
const renderArray = (array) => {
    const container = document.getElementById("visualization");
    container.innerHTML = ''; // Clear the previous bars
    array.forEach(value => {
        const bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = `${value * 3}px`; // Scale height for better visibility
        container.appendChild(bar);
    });
};

// Swap function to swap elements in the array
const swap = (items, i, j) => {
    const temp = items[i];
    items[i] = items[j];
    items[j] = temp;
};

// Partition function for QuickSort
const partition = (items, lo, hi) => {
    const pivot = items[lo];  // The pivot is the first element
    let l = lo + 1;
    let r = hi;

    while (true) {
        // Move left pointer until an element greater than or equal to pivot is found
        while (l <= r && items[l] <= pivot) l++;

        // Move right pointer until an element smaller than pivot is found
        while (l <= r && items[r] >= pivot) r--;

        if (l >= r) break; // When the left and right pointers cross, break the loop

        // Swap elements at l and r
        swap(items, l, r);
    }

    // Place the pivot in the correct position
    if (items[lo] > items[l]) l--;
    swap(items, lo, l);

    return l; // Return the index of the pivot
};

// Naive QuickSort function
const naiveQuickSort = async (items, lo, hi) => {
    if (lo >= hi) return; // Base case: if the array has one or fewer elements
    const pivotIndex = partition(items, lo, hi); // Partition the array
    await sleep(100); // Delay for visualization
    renderArray(items); // Update the visualization with the sorted array so far
    await naiveQuickSort(items, lo, pivotIndex - 1); // Sort the left part
    await naiveQuickSort(items, pivotIndex + 1, hi); // Sort the right part
};

// Bubble Sort Algorithm
const bubbleSort = async (array) => {
    const bars = document.querySelectorAll('.bar');
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - 1 - i; j++) {
            const current = array[j];
            const next = array[j + 1];

            if (current > next) {
                // Highlight the bars being compared
                bars[j].classList.add("highlight");
                bars[j + 1].classList.add("highlight");

                await sleep(100);  // Pause for visualization

                // Swap the elements in the array
                [array[j], array[j + 1]] = [array[j + 1], array[j]];

                // Re-render the array after swapping
                renderArray(array);

                // Remove highlight after swap
                bars[j].classList.remove("highlight");
                bars[j + 1].classList.remove("highlight");
            }
        }
    }
};

// Sleep function to introduce delays for better visualization
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Handling the "Start" button click event
document.getElementById("startBtn").addEventListener("click", () => {
    const selectedAlgorithm = document.getElementById("algorithmSelect").value;

    let array = generateArray();  
    renderArray(array);           

    if (selectedAlgorithm === "bubbleSort") {
        bubbleSort(array);  
    } else if (selectedAlgorithm === "quickSort") {
        naiveQuickSort(array, 0, array.length - 1);  
    }
});
