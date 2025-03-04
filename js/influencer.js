// Initialize Firebase
const firebaseConfig = { /* same as before */ };
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Authentication check
firebase.auth().onAuthStateChanged(user => {
    if (!user) window.location.href = 'index.html';
});

// Logout functionality
document.getElementById('logoutBtn').addEventListener('click', () => {
    firebase.auth().signOut().then(() => {
        window.location.href = 'index.html';
    });
});

// Load companies
function loadCompanies(filters = {}) {
    let query = db.collection('companies');
    
    if (filters.budget) query = query.where('budget', '>=', parseInt(filters.budget));
    if (filters.category) query = query.where('category', '==', filters.category);
    
    query.get().then(querySnapshot => {
        const companyList = document.getElementById('companyList');
        companyList.innerHTML = '';
        
        querySnapshot.forEach(doc => {
            const company = doc.data();
            const template = document.getElementById('companyTemplate').content.cloneNode(true);
            
            template.querySelector('.company-name').textContent = company.name;
            template.querySelector('.company-category').textContent = `Category: ${company.category}`;
            template.querySelector('.company-budget').textContent = `Budget: $${company.budget}`;
            
            template.querySelector('.apply-btn').addEventListener('click', () => {
                applyToCompany(doc.id);
            });
            
            companyList.appendChild(template);
        });
    });
}

// Filter event listeners
document.getElementById('budgetFilter').addEventListener('change', updateFilters);
document.getElementById('categoryFilter').addEventListener('change', updateFilters);

function updateFilters() {
    const filters = {
        budget: document.getElementById('budgetFilter').value,
        category: document.getElementById('categoryFilter').value
    };
    loadCompanies(filters);
}

// Initial load
loadCompanies();