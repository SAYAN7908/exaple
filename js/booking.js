document.addEventListener('DOMContentLoaded', function() {
    const bookingForm = document.getElementById('bookingForm');
    const pickupLocation = document.getElementById('pickupLocation');
    const dropoffLocation = document.getElementById('dropoffLocation');
    const flightNumberField = document.getElementById('flightNumberField');
    const roomNumberField = document.getElementById('roomNumberField');
    
    // Show/hide flight number field based on pickup location
    pickupLocation.addEventListener('change', function() {
        if (this.value === 'airport') {
            flightNumberField.classList.remove('hidden');
            roomNumberField.classList.add('hidden');
        } else if (this.value === 'hotel') {
            roomNumberField.classList.remove('hidden');
            flightNumberField.classList.add('hidden');
        } else {
            flightNumberField.classList.add('hidden');
            roomNumberField.classList.add('hidden');
        }
    });
    
    // Form validation and submission
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form
            let isValid = true;
            const requiredFields = this.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    field.style.borderColor = 'red';
                    isValid = false;
                } else {
                    field.style.borderColor = '#ddd';
                }
            });
            
            if (!isValid) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Get form data
            const formData = new FormData(bookingForm);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // In a real app, you would send this to your backend
            console.log('Booking submitted:', formObject);
            
            // Show success message
            alert('Your booking has been submitted successfully! We will contact you shortly to confirm.');
            bookingForm.reset();
            
            // Hide conditional fields after reset
            flightNumberField.classList.add('hidden');
            roomNumberField.classList.add('hidden');
        });
    }
    
    // Initialize date picker with min date as today
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }
});