$(document).ready(function() {
    $.ajax({
        url: "https://jmod-s.herokuapp.com/perfil"
    }).then(function(data) {
       $('.greeting-content').append(data.paciente);
    });
});