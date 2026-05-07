document.addEventListener('DOMContentLoaded', () => {
    const listingsContainer = document.getElementById('listings-container');
    const addListingBtn = document.getElementById('add-listing-btn');

    // Προσομοίωση δεδομένων (Στο μέλλον, αυτά θα έρχονται μέσω fetch API από την PHP σου)
    const mockListings = [
        { id: 1, title: 'Μακαρόνια με κιμά', portions: 2, location: 'Εστία Α, Δωμάτιο 102', time: '14:30', allergens: 'Γλουτένη' },
        { id: 2, title: 'Γεμιστά (Ορφανά)', portions: 0, location: 'Κτίριο Β, Ισόγειο', time: '15:00', allergens: 'Κανένα' },
        { id: 3, title: 'Κοτόπουλο στον φούρνο', portions: 1, location: 'Εστία Β, Δωμάτιο 50', time: '16:00', allergens: 'Κανένα' },
        { id: 4, title: 'Σαλάτα εποχής', portions: 3, location: 'Βιβλιοθήκη', time: '13:00', allergens: 'Ξηροί Καρποί' }
    ];

    // Συνάρτηση για την προβολή των αγγελιών στο DOM
    function renderListings(listings) {
        listingsContainer.innerHTML = ''; // Καθαρισμός του container

        listings.forEach(listing => {
            // Δημιουργία στοιχείου κάρτας
            const card = document.createElement('div');
            card.className = `card ${listing.portions === 0 ? 'inactive' : ''}`;

            // Εισαγωγή HTML μέσα στην κάρτα
            card.innerHTML = `
                <h3>${listing.title}</h3>
                <p>📍 <strong>Παραλαβή:</strong> ${listing.location}</p>
                <p>⏰ <strong>Ώρα:</strong> ${listing.time}</p>
                <p>🍲 <strong>Μερίδες:</strong> ${listing.portions}</p>
                <p class="allergens">⚠️ <strong>Αλλεργιογόνα:</strong> ${listing.allergens}</p>
                
                <button class="btn primary request-btn" data-id="${listing.id}" ${listing.portions === 0 ? 'disabled' : ''}>
                    ${listing.portions > 0 ? 'Δέσμευση (1 Πόντος)' : 'Εξαντλήθηκε'}
                </button>
            `;

            listingsContainer.appendChild(card);
        });

        // Προσθήκη Event Listeners στα κουμπιά που μόλις δημιουργήθηκαν
        attachRequestEvents();
    }

    // Συνάρτηση για τα events του κουμπιού "Δέσμευση"
    function attachRequestEvents() {
        const requestButtons = document.querySelectorAll('.request-btn');
        requestButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const listingId = e.target.getAttribute('data-id');
                // Εδώ θα έμπαινε η POST fetch() κλήση προς τον server
                alert(`Στάλθηκε αίτημα δέσμευσης για την αγγελία #${listingId}`);
            });
        });
    }

    // Αρχική εκτέλεση: Εμφάνιση των αγγελιών
    renderListings(mockListings);

    // Event Listener για το κουμπί δημιουργίας αγγελίας
    addListingBtn.addEventListener('click', () => {
        // Εδώ στο μέλλον θα ανοίγεις ένα Modal (popup) ή θα αλλάζεις σελίδα
        alert('Άνοιγμα φόρμας "Δημιουργία Νέας Αγγελίας"');
    });
});