document.getElementById('guest-details').addEventListener('click', fillGuestDetails)
document.getElementById('signin-signup-button').addEventListener('click', () => document.getElementById('signin').click())

function fillGuestDetails() {
    const email = document.getElementById('signin-email-address')
    const password = document.getElementById('signin-password')
    email.value = 'guest@guest.com'
    password.value = 'guestguest'

    document.getElementById('signin-button').click();
}

