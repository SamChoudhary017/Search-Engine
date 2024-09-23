document.addEventListener("DOMContentLoaded", function () {
    const searchBtn = document.getElementById("searchBtn");
    const clearHistoryBtn = document.getElementById("clearHistoryBtn");
    const searchInput = document.getElementById("searchInput");
    const searchHistoryList = document.getElementById("searchHistory");

    // Load search history from localStorage
    let searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];

    // Display the stored history
    function displayHistory() {
        searchHistoryList.innerHTML = '';
        searchHistory.forEach((item, index) => {
            const li = document.createElement('li');
            li.innerHTML = `${item} <button class="delete-btn" data-index="${index}">Delete</button>`;
            searchHistoryList.appendChild(li);
        });

        // Add event listeners for delete buttons
        const deleteButtons = document.querySelectorAll(".delete-btn");
        deleteButtons.forEach(button => {
            button.addEventListener("click", function () {
                const index = this.getAttribute("data-index");
                deleteHistoryItem(index);
            });
        });
    }

    // Search button click event
    searchBtn.addEventListener("click", function () {
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            searchHistory.push(searchTerm);
            localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
            displayHistory();
            searchInput.value = '';
        }
    });

    // Clear history button click event
    clearHistoryBtn.addEventListener("click", function () {
        searchHistory = [];
        localStorage.removeItem("searchHistory");
        displayHistory();
    });

    // Delete individual history item
    function deleteHistoryItem(index) {
        searchHistory.splice(index, 1);
        localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
        displayHistory();
    }

    // Initial display of history
    displayHistory();

    
});
