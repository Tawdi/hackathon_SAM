// formValidate.js

// Function to add validation styles to the form
(function() {
    'use strict';

    window.addEventListener('load', function() {
        // Get all forms with the class 'needs-validation'
        var forms = document.getElementsByClassName('needs-validation');

        // Loop over them and prevent submission if there are invalid fields
        var validation = Array.prototype.filter.call(forms, function(form) {
            form.addEventListener('submit', function(event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);
})();
