
let currentUserId = 1; // to start userId from 1

let isFetching = false;
let page = 1;

async function fetchData(url) {
    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
}

async function loadUsers() {
    if (isFetching) return;
    isFetching = true;
    document.getElementById("loading").style.display = "block";

    const url = `https://dummyjson.com/users?skip=${(page - 1) * 15}&limit=15`;
    const data = await fetchData(url);

    if (data && data.users) {
        const tableBody = document.getElementById("table-body");
        data.users.forEach(user => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${currentUserId++}</td> 
                <td>${user.firstName} ${user.lastName}</td>
                <td>${user.email}</td>
                <td>${user.gender}</td>
                <td>${user.address.address}, ${user.address.city}</td>
                <td>${user.phone}</td>
                <td>${user.address.postalCode}</td>
            `;
            tableBody.appendChild(row);
        });
        page++;
    }

    document.getElementById("loading").style.display = "none";
    isFetching = false;
}

function handleScroll() {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 10) {
        loadUsers();
    }
}

window.addEventListener("scroll", handleScroll);

// Initial load
loadUsers();
