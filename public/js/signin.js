document.getElementById('guest-details').addEventListener('click', fillGuestDetails)

function fillGuestDetails() {
    const email = document.getElementById('email-address')
    const password = document.getElementById('password')
    email.value = 'guest@guest.com'
    password.value = 'guestguest'

    document.getElementById('signin-button').click();
}