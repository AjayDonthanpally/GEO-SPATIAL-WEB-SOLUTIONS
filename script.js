document.addEventListener('DOMContentLoaded', function() {
    const titleElement = document.getElementById('title');
    const titleText = "GeoSpatial Web Solutions";
    let index = 0;

    function typeCharacter() {
        if (index < titleText.length) {
            titleElement.textContent += titleText.charAt(index);
            index++;
            setTimeout(typeCharacter, 100); // Adjust the speed by changing the timeout value
        } else {
            // Redirect to index.html after the message is fully loaded
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000); // Adjust the delay before redirection if needed
        }
    }

    typeCharacter();
});

function showDateTime() {
    const options = { 
        timeZone: 'Asia/Kolkata', 
        weekday: 'short', // Short format for the day (e.g., "Sun")
        year: 'numeric', 
        month: 'short', // Short format for the month (e.g., "OCT")
        day: '2-digit', 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit', 
        hour12: true 
    };

    const now = new Date();
    const day = now.toLocaleString('en-IN', { weekday: 'short', timeZone: 'Asia/Kolkata' }).toUpperCase();
    const date = now.toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'Asia/Kolkata' });
    const time = now.toLocaleString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true, timeZone: 'Asia/Kolkata' });

    // Combine parts into the desired format
    const currentDateTime = `${day} ${date.replace(',', '')} ${time}`;
    
    document.getElementById('currentDateTime').innerHTML = currentDateTime;
}

// Call the function initially
showDateTime();
setInterval(showDateTime, 1000); // Update time every second

// Function to handle user registration
function registerUser(event) {
	event.preventDefault(); // Prevent form submission

	// Get form data
	const meterNo = document.getElementById("MTR.NO").value;
	const scNo = document.getElementById("SC.NO").value;
	const uscCode = document.getElementById("USC").value;
	const username = document.getElementById("username").value;
	const hNo = document.getElementById("H.NO").value;
	const village = document.getElementById("Village").value;
	const mandal = document.getElementById("mandal").value;
	const district = document.getElementById("District").value;
	const email = document.getElementById("email").value;
	const phone = document.getElementById("Phone").value;

	// Get password values
	const password = document.getElementById("password").value;

	// Create user object
	const newUser = {
		meterNo,
		scNo,
		uscCode,
		username,
		hNo,
		village,
		mandal,
		district,
		email,
		phone,
		password
	};

	// Check if user already exists
	let users = JSON.parse(localStorage.getItem('users')) || [];
	if (users.some(user => user.email === email)) {
	    alert('User already exists with this email.');
	    return;
	}

	// Save new user to local storage
	users.push(newUser);
	localStorage.setItem('users', JSON.stringify(users));
	alert('Registration successful!');
	window.location.href = 'signin.html'; // Redirect to Sign In page
}

// Function to handle user login
function loginUser(event) {
	event.preventDefault(); // Prevent form submission

	const email = document.querySelector('input[type=email]').value;
	const password = document.querySelector('input[type=password]').value;

	let users = JSON.parse(localStorage.getItem('users')) || [];
	const user = users.find(user => user.email === email && user.password === password);

	if (user) {
	    localStorage.setItem('loggedInEmail', email); // Store logged-in email
	    alert('Login successful!');
	    window.location.href = 'profile.html'; // Redirect to profile page
	} else {
	    alert('Invalid email or password.');
	}
}

// Function to display user profile
function displayUserProfile() {
	const loggedInEmail = localStorage.getItem('loggedInEmail');

	// Redirect to sign-in page if not logged in
	if (!loggedInEmail) {
	    alert('You must be logged in to view this page.');
	    window.location.href = 'signin.html'; // Redirect to sign-in page
	    return;
	}

	const users = JSON.parse(localStorage.getItem('users')) || [];
	const user = users.find(user => user.email === loggedInEmail);

	if (user) {
	    const profileHTML = `
	        ... // Code to display profile details goes here
	        `;
	    document.getElementById('user-profile').innerHTML = profileHTML + '<button onclick=\"editProfile()\">Edit Profile<\/button>';
	} else {
	    document.getElementById('user-profile').innerHTML = '<p>No user found. Please log in.</p>';
	}
}

// Function to edit user profile
function editProfile() {
	const loggedInEmail = localStorage.getItem('loggedInEmail');
	const users = JSON.parse(localStorage.getItem('users')) || [];
	const user = users.find(user => user.email === loggedInEmail);

	if (user) {
	    const editProfileHTML = `
	        ... // Code for editable fields goes here
	        `;
	    
	    document.getElementById('user-profile').innerHTML = editProfileHTML;

	    // Attach event listener to the form
	    document.getElementById('edit-profile-form').addEventListener('submit', function(event) {
	        event.preventDefault(); // Prevent form submission
	        updateProfile(user.email); // Call update function
	    });
	}
}

// Function to update user profile
function updateProfile(email) {
	const users = JSON.parse(localStorage.getItem('users')) || [];
	
	// Get updated values from input fields
	const updatedUser = {
	    meterNo: document.getElementById("editMeterNo").value,
	    scNo: document.getElementById("editScNo").value,
	    uscCode: document.getElementById("editUscCode").value,
	    username: document.getElementById("editUsername").value,
	    hNo: document.getElementById("editHNo").value,
	    village: document.getElementById("editVillage").value,
	    mandal: document.getElementById("editMandal").value,
	    district: document.getElementById("editDistrict").value,
	    email, // Keep email the same
	    phone: document.getElementById("phone").value // Keep phone number the same
	};

	// Update the user in the array
	const index = users.findIndex(user => user.email === email);
	if (index !== -1) {
	    users[index] = updatedUser; // Update user data
	    localStorage.setItem('users', JSON.stringify(users)); // Save back to local storage
	    alert('Profile updated successfully!');
	    displayUserProfile(); // Refresh profile display
	}
}

// Function to handle logout and update button visibility based on login status
function logout() {
	localStorage.removeItem('loggedInEmail'); // Remove email from local storage
	updateButtonVisibility(); // Update button visibility on logout
	window.location.href = 'signin.html'; // Redirect to sign-in page
}

// Function to update button visibility based on login status
function updateButtonVisibility() {
	const loggedInEmail = localStorage.getItem('loggedInEmail');
	document.getElementById('profile-button').style.display = loggedInEmail ? 'block' : 'none';
	document.getElementById('signin-button').style.display = loggedInEmail ? 'none' : 'block';
	document.getElementById('signup-button').style.display = loggedInEmail ? 'none' : 'block';
}

// Attach event listeners to forms on DOMContentLoaded and update button visibility initially.
document.addEventListener('DOMContentLoaded', () => {
	updateButtonVisibility(); // Check login status and update buttons

	const signupForm = document.getElementById('signup-form');
	if (signupForm) signupForm.addEventListener('submit', registerUser);

	const signinForm = document.getElementById('signin-form');
	if (signinForm) signinForm.addEventListener('submit', loginUser);

	const profilePage = document.querySelector('#user-profile');
	if (profilePage) displayUserProfile();
});

// Welcome Page Animation Script
const titleText = 'GEO SPATIAL WEB SOLUTIONS';
let index = 0;

function typeCharacter() {
	if (index <= titleText.length) {
	    document.getElementById("title").innerHTML += titleText.charAt(index);
	    index++;
	    setTimeout(typeCharacter, 100); // Adjust speed here
	}
}
let currentBillAmount = 0; // For current bill
let waterBillAmount = 0; // For water bill

// Function to calculate the current bill based on units consumed
function calculateCurrentBill() {
    const units = parseFloat(document.getElementById('units').value);
    
    // Calculate bill based on Telangana tariff rates
    if (units <= 50) {
        currentBillAmount = units * 3; // Rate for first 50 units
    } else if (units <= 100) {
        currentBillAmount = (50 * 3) + ((units - 50) * 5); // Rate for next 50 units
    } else if (units <= 200) {
        currentBillAmount = (50 * 3) + (50 * 5) + ((units - 100) * 7); // Rate for next 100 units
    } else {
        currentBillAmount = (50 * 3) + (50 * 5) + (100 * 7) + ((units - 200) * 10); // Rate for above 200 units
    }

    // Display the result in the designated div
    document.getElementById('result1').innerText = `Your current bill amount is: ₹${currentBillAmount.toFixed(2)}`;
    
    // Update total bill display
    updateTotalBill();
}

// Function to calculate the water bill based on gallons consumed
function calculateWaterBill() {
    const gallons = parseFloat(document.getElementById('gallons').value);
    
    // Calculate water bill based on Telangana tariff rates
    if (gallons <= 1000) {
        waterBillAmount = gallons * 1; // Rate for first 1000 gallons
    } else if (gallons <= 3000) {
        waterBillAmount = (1000 * 1) + ((gallons - 1000) * 1.5); // Rate for next 2000 gallons
    } else {
        waterBillAmount = (1000 * 1) + (2000 * 1.5) + ((gallons - 3000) * 2); // Rate for above 3000 gallons
    }

    // Display the result in the designated div
    document.getElementById('result2').innerText = `Your water bill amount is: ₹${waterBillAmount.toFixed(2)}`;
    
    // Update total bill display
    updateTotalBill();
}

// Function to update total bill amount displayed on the page
function updateTotalBill() {
    const totalBill = currentBillAmount + waterBillAmount;
    document.getElementById('totalBill').innerText = `Total Bill: ₹${totalBill.toFixed(2)}`;
}
// Function to toggle the visibility of the side menu
function toggleMenu() {
	const sideMenu = document.getElementById('side-menu');
	if (sideMenu.style.display === 'none') {
	    sideMenu.style.display = 'flex'; // Show the menu
	} else {
	    sideMenu.style.display = 'none'; // Hide the menu
	}
}

// Existing functions for user registration, login, etc.
// ... (Include all previous functions here)
// Function to toggle the visibility of the side menu
function toggleMenu() {
	const sideMenu = document.getElementById('side-menu');
	sideMenu.style.display = sideMenu.style.display === 'none' ? 'flex' : 'none'; // Toggle menu visibility
}

// Function to show content based on menu selection
function showContent(contentId) {
	// Hide all content sections
	const sections = document.querySelectorAll('.content-section');
	sections.forEach(section => section.style.display = 'none');

	// Show selected content section
	document.getElementById(contentId).style.display = 'block';
}
document.getElementById('theme-toggle').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    document.body.classList.toggle('light-mode');
});

// Set initial theme based on user preference or default to light mode
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.body.classList.add('dark-mode');
} else {
    document.body.classList.add('light-mode');
}


// Function to toggle notifications dropdown
function toggleNotifications() {
	const dropdown = document.getElementById('notifications-dropdown');
	dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none'; // Toggle dropdown visibility

	// Example to show notification badge
	const badge = document.getElementById('notification-badge');
	badge.style.display = 'none'; // Hide badge after clicking
}

// Function to simulate new notifications (for demonstration purposes)
function simulateNotification() {
	const badge = document.getElementById('notification-badge');
	badge.style.display = 'block'; // Show badge when there's a new notification
}

// Call this function where you want to simulate a new notification
simulateNotification(); // Call this function to show a notification for testing

// Existing functions for user registration, login, etc.
// ... (Include all previous functions here)

// Sample data for bills
const bills = [
    { type: "Electricity", dueDate: new Date("2024-10-15"), amountDue: "$75.00", status: "Pending" },
    { type: "Water", dueDate: new Date("2024-10-20"), amountDue: "$45.00", status: "Pending" },
    { type: "Internet", dueDate: new Date("2024-10-25"), amountDue: "$60.00", status: "Paid" },
];

// Current date
const currentDate = new Date();

// Function to format date to a readable format
function formatDate(date) {
    return date.toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' });
}

// Populate the upcoming payments table and messages
function populatePayments() {
    const paymentTableBody = document.getElementById("payment-table-body");
    
    // Filter bills that are due today or in the future
    const upcomingBills = bills.filter(bill => bill.dueDate >= currentDate);
    
    // Populate table rows
    upcomingBills.forEach(bill => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${bill.type}</td>
            <td>${formatDate(bill.dueDate)}</td>
            <td>${bill.amountDue}</td>
            <td>${bill.status}</td>`;
        paymentTableBody.appendChild(row);
        
        // Add important messages if the bill is due soon
        if (bill.dueDate <= new Date(currentDate.setDate(currentDate.getDate() + 7))) {
            const messageList = document.getElementById("message-list");
            const messageItem = document.createElement("li");
            messageItem.textContent = `Reminder: Your ${bill.type} bill is due on ${formatDate(bill.dueDate)}. Please ensure payment is made to avoid late fees.`;
            messageList.appendChild(messageItem);
        }
        
        // Reset current date for further checks
        currentDate.setDate(currentDate.getDate() - 7);
        
        // Update last payment date if applicable (for demonstration)
        const lastPaymentDateDiv = document.getElementById("last-payment-date");
        lastPaymentDateDiv.textContent = "September 30, 2024"; // Static example; this can be dynamic as well.
        
    });
}

// Function to show current UTC time
function showTime() {
	document.getElementById('currentTime').innerHTML = new Date().toUTCString();
}

// Call the function to populate data on page load
populatePayments();
showTime();
setInterval(showTime, 1000); // Update time every second

// Sample data for payments
const userPayments = [
    { type: "Electricity", datePaid: new Date("2024-09-15"), amountPaid: "$75.00" },
    { type: "Water", datePaid: new Date("2024-08-20"), amountPaid: "$45.00" },
];

// Simulate user login status
const isLoggedIn = true; // Change this to false to simulate a logged-out user

// Function to format date to a readable format
function formatDate(date) {
    return date.toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' });
}

// Populate the payment section based on login status
function populatePayments() {
    const paymentSection = document.getElementById("payment-section");

    if (!isLoggedIn) {
        paymentSection.innerHTML = `<h3>No Payments Available</h3><p>Please log in to view your payment history.</p>`;
        return;
    }

    if (userPayments.length === 0) {
        paymentSection.innerHTML = `<h3>No Payments Found</h3><p>You have not made any payments yet.</p>`;
        return;
    }

    const paymentList = document.createElement("ul");
    
    userPayments.forEach(payment => {
        const listItem = document.createElement("li");
        listItem.textContent = `${payment.type} - Paid on ${formatDate(payment.datePaid)} - Amount Paid: ${payment.amountPaid}`;
        paymentList.appendChild(listItem);
    });

    paymentSection.appendChild(paymentList);
}

// Call the function to populate data on page load
populatePayments();
