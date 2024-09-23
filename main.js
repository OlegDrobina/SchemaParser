function handle_file_select(evt) {
    console.info ( "[Event] file chooser" );
    let fl_files = evt.target.files;
    let fl_file = fl_files[0];
    let reader = new FileReader();
    let display_file = (e) => {
        console.info('. . got: ', e.target.result.length, e );
        let fileContent = e.target.result;
        let fileContentLength = fileContent.length;
        document.getElementById('upload_file').innerHTML = fileContent;
        if (fileContentLength != 0) {
            on_uploaded_file_changed(fileContent);
        }
    };
    let on_reader_load = (fl) => {
        console.info('. file reader load', fl);
        return display_file;
        };
    reader.onload = on_reader_load(fl_file);
    reader.readAsText(fl_file);
}


function on_uploaded_file_changed(fileContent) {
    let jsonFileContent = JSON.parse(fileContent);
    let attributesFromObject = Object.keys(jsonFileContent);
    let variablesArray = createVariables(attributesFromObject);
    let processedValues = processReceivedObject(attributesFromObject, variablesArray, jsonFileContent);
    //To Do
    console.log(processedValues);
}

/*
    @public method createVariables
    @returns array
**/
function createVariables(attributes) {
    var variables = [];
    for (var i = 0; i < attributes.length; ++i) {
        variables[i] = "attributes" + i;
    }
    return variables;
}

/*
    @public method parseReceivedObject
    @returns array
**/
function processReceivedObject(attributesFromObject, variablesArray, jsonFileContent) {
    attributesFromObject.forEach((item, index) => {
        variablesArray[index] = jsonFileContent[attributesFromObject[index]];
    });
    return variablesArray;
}


document.getElementById('upload').addEventListener('change', handle_file_select, false);
document.getElementById('upload_file').addEventListener('change', on_uploaded_file_changed, true);