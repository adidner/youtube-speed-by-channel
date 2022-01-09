document.addEventListener("DOMContentLoaded", function () {
    

    function DeleteRowButton(id){
        console.log("delete button", id);
        document.getElementById(id).remove();
    }
    
    function AddNewRowButton(targetContentColumnId){
        console.log("add new row");
        let numberRows = document.getElementById(targetContentColumnId).childElementCount - 2;
        let newNumberRows = numberRows + 1;
        let newButtonRowId =  newNumberRows + "-" + targetContentColumnId;

        var row = document.createElement("div");
        row.setAttribute("class", "row");
        row.setAttribute("id", "row-" + newButtonRowId);
        
        var deleteButton = document.createElement("div");
        deleteButton.setAttribute("id", "delete-button-" + newButtonRowId);
        deleteButton.setAttribute("class", "delete-row-button appear-button-like");
        deleteButton.addEventListener("click", () => DeleteRowButton("row-" + newButtonRowId));
        deleteButton.innerText = "X"
        row.appendChild(deleteButton);
        
        var input = document.createElement("input");
        input.setAttribute("type", "text");
        input.setAttribute("class", "title-input");
        input.setAttribute("placeholder", "set speed for");
        input.setAttribute("id", "input-" + newButtonRowId);
        row.appendChild(input);

        var select = document.createElement("select");
        var optionChannel = document.createElement("option");
        optionChannel.setAttribute("value", "channel");
        optionChannel.innerText = "Channel";
        var optionTitle = document.createElement("option");
        optionTitle.setAttribute("value", "title");
        optionTitle.innerText = "Title";
        select.appendChild(optionChannel);
        select.appendChild(optionTitle);

        row.appendChild(select);
        

        var customs_element = document.getElementById(targetContentColumnId);
        customs_element.insertBefore(
            row,
            customs_element.children[customs_element.childElementCount - 1]
        );
    }
    
    
    function AddContentColumn(){
        let contentColumns = document.body.childElementCount - 1;
        let nextId = (contentColumns + 1);
        let newContentColumnId = "content-column-" + nextId;

        var contentColumn = document.createElement("div");
        contentColumn.setAttribute("id", newContentColumnId);
        contentColumn.setAttribute("class", "content-column");

        var speedRow = document.createElement("div");
        speedRow.setAttribute("class", "row");
        
        var speedText = document.createElement("div");
        speedText.innerText = "Speed: ";
        speedRow.appendChild(speedText);
        
        var speedInput = document.createElement("input");
        speedInput.setAttribute("type", "number");
        speedInput.setAttribute("id", "speed-input-" + newContentColumnId); 
        speedRow.appendChild(speedInput);
        
        contentColumn.appendChild(speedRow);


        var addNewRowButtonContainer = document.createElement("div");
        addNewRowButtonContainer.setAttribute("id","add-new-row-button")
        addNewRowButtonContainer.setAttribute("class","new-row-button")
        var addNewRowButtonButton = document.createElement("div");
        addNewRowButtonButton.setAttribute("class","appear-button-like")
        addNewRowButtonButton.innerText = "Add New Row";
        addNewRowButtonButton.addEventListener("click", () => AddNewRowButton(newContentColumnId));
        
        addNewRowButtonContainer.appendChild(addNewRowButtonButton);

        contentColumn.appendChild(addNewRowButtonContainer);

        var body = document.body;
        body.insertBefore(
            contentColumn,
            body.children[body.childElementCount]
        );

        AddNewRowButton(newContentColumnId);
        
    }

    function saveAndApplyChanges(){
        console.log("save and apply");
        let saveObject = [

        ];
        let numberContentSection = document.body.childElementCount - 1;
        for(let i = 1; i < numberContentSection + 1; i++){    
            contentSectionId = "content-column-" + i;
            contentSection = document.getElementById(contentSectionId);
            let numberRows = contentSection.childElementCount - 2;
            console.log("numberRows", numberRows);
            let contentSectionObject = {
                speed: document.getElementById("speed-input-" + "content-column-" + i).value,
                rows: [

                ],
            }
            for(let j = 1; j < numberRows + 1; j++){
                let targetInput = document.getElementById("input-"+ j + "-content-column-" + i);
                let rowObject = {
                    inputValue: targetInput.value,
                    selectValue: "channel",
                }
                contentSectionObject.rows.push(rowObject);
            }
            saveObject.push(contentSectionObject);
        }
        console.log("saveObject", saveObject);
        chrome.storage.sync.set({saveObject: saveObject})
    }

    function rehydrateSavedData(){
        //if we have no saved data, make one column
        // if(){
            AddContentColumn();
        // }
        // else grab the saved data and populate the structure with it
    } 

    // document.querySelector("#add-new-row-button-1").addEventListener("click", AddNewRowButton);
    // document.querySelector("#delete-button-1").addEventListener("click", () => DeleteRowButton("row-1"));
    document.querySelector('#add-content-column').addEventListener("click", () => AddContentColumn());    
    document.querySelector('#save-button').addEventListener("click", () => saveAndApplyChanges());
    rehydrateSavedData();
});
  