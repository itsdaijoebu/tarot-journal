"use strict";
const deleteButtons = document.querySelectorAll('.delete-button');
deleteButtons.forEach(e => {
    e.addEventListener('click', deleteACard);
});
function deleteACard(e) {
    console.log(typeof e);
}
