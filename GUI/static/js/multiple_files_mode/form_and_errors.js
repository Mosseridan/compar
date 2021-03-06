function handleErrors(errors){
    if(errors && errors.input_directory){
        document.getElementById('inputDirectoryAlert').innerHTML = errors.input_directory;
    }
    else {
        document.getElementById('inputDirectoryAlert').innerHTML = "";
    }
    if(errors && errors.output_directory){
        document.getElementById('outputDirectoryAlert').innerHTML = errors.output_directory;
    }
    else {
        document.getElementById('outputDirectoryAlert').innerHTML = "";
    }
    if(errors && errors.main_file_path){
        document.getElementById('mainFileAlert').innerHTML = errors.main_file_path;
    }
    else {
        document.getElementById('mainFileAlert').innerHTML = "";
    }
    if (errors && errors.test_path){
        document.getElementById('validationPathAlert').innerHTML = errors.test_path;
    }
    else{
        document.getElementById('validationPathAlert').innerHTML = "";
    }
    if(errors && errors.slurm_partition){
        document.getElementById('slurmPartitionAlert').innerHTML = errors.slurm_partition;
    }
    else{
        document.getElementById('slurmPartitionAlert').innerHTML = "";
    }
    if ( errors && errors.jobs_count){
        document.getElementById('jobsCountAlert').innerHTML = errors.jobs_count;
    }
    else {
        document.getElementById('jobsCountAlert').innerHTML = "";
    }
    if ( errors && errors.multiple_combinations){
        document.getElementById('multipleCombinationsAlert').innerHTML = errors.multiple_combinations;
    }
    else {
        document.getElementById('multipleCombinationsAlert').innerHTML = "";
    }
    if ( errors && errors.project_name){
        document.getElementById('projectNameAlert').innerHTML = errors.project_name;
    }
    else {
        document.getElementById('projectNameAlert').innerHTML = "";
    }
}

$(document).ready(function() {
    $('form').submit(function (e) {
        var url = "/multiple_files_submit"; // send the form data here.
        if(!comparIsRunning){
            submitForm(url);
        }
        e.preventDefault(); // block the traditional submission of the form.
    });
});

function submitForm(url){
var formData = new FormData($('#form')[0]);
$.ajax({
            type: "POST",
            url: url,
            contentType: false,
            processData: false,
            data: formData, // serializes the form's elements.
            success: function (data) {
            },
            error: function(error){
            }
        })
        .done(function(data) {
            handleErrors(data.errors);
            if(!data.errors){
                run();
            }
        });

    // Inject our CSRF token into our AJAX request.
    $.ajaxSetup({
        beforeSend: function(xhr, settings) {
            if (!/^(GET|HEAD|OPTIONS|TRACE)$/i.test(settings.type) && !this.crossDomain) {
                xhr.setRequestHeader("X-CSRFToken", "{{ form.csrf_token._value() }}")
            }
        }
    })
}
