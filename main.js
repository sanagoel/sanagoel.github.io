// Simple interactive script for the website
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('header');
    header.addEventListener('click', function() {
        alert('Hello, welcome to my personal website!');
    });
// });

// document.addEventListener('DOMContentLoaded', function() {
//     const aboutImage = document.querySelector('header');
//     aboutImage.addEventListener('click', function() {
//         alert('this is an image of the creator of the website - Sana Goel');
//     });
// });

    // Click event for the about image
    const aboutImage = document.querySelector('#about img'); 
    if (aboutImage) {
        aboutImage.addEventListener('click', function () {
            alert('This is an image of the creator of the website - Sana Goel');
        });
    }
});
