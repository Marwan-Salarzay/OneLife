document.addEventListener('DOMContentLoaded', fetchUsers);

async function fetchUsers() {
    try {
        // Make sure to use http instead of https for localhost
        const response = await fetch('http://localhost:3000/api/users');
        if (!response.ok) throw new Error('Network response was not ok');
        const users = await response.json();
        console.log(users);
        
        // Display users on the page (optional)
        displayUsers(users);
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}

// Optional function to display users on the page
function displayUsers(users) {
    const container = document.createElement('div');
    container.className = 'users-container';
    
    users.forEach(user => {
        const userElement = document.createElement('div');
        userElement.className = 'user-card';
        userElement.innerHTML = `
            <h3>${user.name || 'Unknown User'}</h3>
            <p>Email: ${user.email || 'N/A'}</p>
        `;
        container.appendChild(userElement);
    });
    
    document.body.appendChild(container);
}