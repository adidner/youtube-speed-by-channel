document.addEventListener("DOMContentLoaded", function () {
    

    function DeleteRowButton(id){
        document.getElementById(id).remove();
        saveAndApplyChanges();
    }
    
    function AddNewRowButton(targetContentColumnId, rowDataObject){

        let numberRows = document.getElementById(targetContentColumnId).childElementCount - 2;
        let newNumberRows = numberRows + 1;
        let newButtonRowId =  newNumberRows + "-" + targetContentColumnId;

        var row = document.createElement("div");
        row.setAttribute("class", "row");
        row.setAttribute("id", "row-" + newButtonRowId);


        var select = document.createElement("select");
        select.setAttribute("id", "select-" + newButtonRowId);
        select.setAttribute("class", "select")
        var optionChannel = document.createElement("option");
        optionChannel.setAttribute("value", "channel");
        optionChannel.innerText = "Channel";
        var optionTitle = document.createElement("option");
        optionTitle.setAttribute("value", "title");
        optionTitle.innerText = "Title";
        if(rowDataObject?.selectValue == "title"){
            select.appendChild(optionTitle);
            select.appendChild(optionChannel);
        }
        else {
            select.appendChild(optionChannel);
            select.appendChild(optionTitle);
        }
        select.addEventListener("change", () => saveAndApplyChanges())
        row.appendChild(select);

        var input = document.createElement("input");
        input.setAttribute("type", "text");
        input.setAttribute("class", "title-input");
        input.setAttribute("placeholder", "set speed for");
        input.setAttribute("id", "input-" + newButtonRowId);
        input.setAttribute("value", rowDataObject ? rowDataObject.inputValue : "");
        input.addEventListener("blur", () => saveAndApplyChanges());
        row.appendChild(input);
        

        var deleteButton = document.createElement("i");
        deleteButton.setAttribute("id", "delete-button-" + newButtonRowId);
        deleteButton.setAttribute("class", "delete-X-button fa fa-trash");
        deleteButton.addEventListener("click", () => DeleteRowButton("row-" + newButtonRowId));
        row.appendChild(deleteButton);
        
        var customs_element = document.getElementById(targetContentColumnId);
        customs_element.insertBefore(
            row,
            customs_element.children[customs_element.childElementCount - 1]
        );

        saveAndApplyChanges();
    }
    
    
    function AddContentColumn(ColumnDataObject, addBlankRow){
        let contentColumns = document.getElementById("data-section").childElementCount;
        let nextId = (contentColumns + 1);
        let newContentColumnId = "content-column-" + nextId;

        var contentColumn = document.createElement("div");
        contentColumn.setAttribute("id", newContentColumnId);
        contentColumn.setAttribute("class", "content-column");

        var speedRow = document.createElement("div");
        speedRow.setAttribute("class", "row speed-row");
        
        var speedText = document.createElement("div");
        speedText.setAttribute("class", "speed-text");
        speedText.innerText = "Speed: ";
        speedRow.appendChild(speedText);
        
        var speedInput = document.createElement("input");
        speedInput.setAttribute("type", "number");
        speedInput.setAttribute("id", "speed-input-" + newContentColumnId); 
        speedInput.setAttribute("value", ColumnDataObject ? ColumnDataObject.speed : "");
        speedInput.setAttribute("class", "speed-input")
        speedInput.addEventListener("blur", () => saveAndApplyChanges());
        speedRow.appendChild(speedInput);

        var deleteButton = document.createElement("div");
        deleteButton.innerText = "Delete Section";
        deleteButton.setAttribute("class", "appear-button-like red-delete-button");
        deleteButton.addEventListener("click", () => deleteContentColumn(nextId - 1)); // -1 becasue ID's start at 1 and index's start at 0
        speedRow.appendChild(deleteButton);
        
        contentColumn.appendChild(speedRow);


        var addNewRowButtonContainer = document.createElement("div");
        addNewRowButtonContainer.setAttribute("id","add-new-row-button")
        addNewRowButtonContainer.setAttribute("class","new-row-button")
        var addNewRowButtonButton = document.createElement("div");
        addNewRowButtonButton.setAttribute("class","appear-button-like primary-blue-button")
        addNewRowButtonButton.innerText = "Add New Row";
        addNewRowButtonButton.addEventListener("click", () => AddNewRowButton(newContentColumnId));
        
        addNewRowButtonContainer.appendChild(addNewRowButtonButton);

        contentColumn.appendChild(addNewRowButtonContainer);

        var body = document.getElementById("data-section");
        body.insertBefore(
            contentColumn,
            body.children[body.childElementCount]
        );

        if(addBlankRow){
            AddNewRowButton(newContentColumnId);
        }

        return newContentColumnId;
        
    }


    // Deleting is weird because we rely on things being in sequencial order (1,2,3,4) rather than (1,2,4,5). So it was easiest to 
    // Delete by index rather than ID and just rehydrate without that element
    function deleteContentColumn(contentColumnIndex){
        // document.getElementById(contentColumnIndex).remove();
        // now we kinda need to fix the hierarchy or else some of our assumtion don't work
        // Kind of inline with this idea we can probably kill everything and re-hydrate but skipping a certain index
        // so All we would need to do is make the rehydrate function take a param to skip a certain index
        
        saveAndApplyChanges(); // Need to do this so we can rehydrate correctly without deleted data in a minute

        //Remove all the children in the data-section
        const parent = document.getElementById("data-section");
        while(parent.firstChild){
            parent.firstChild.remove();
        }
        console.log("contentColumnIndex", contentColumnIndex);
        rehydrateSavedData(contentColumnIndex);


        // Or I guess we can look when adding new conent rows if we have any things in the middle and then add their first
        // This probably doesn't work because saveAndApplyChanges relies on things being in continuous order, so I'd have to fix that too if I wanted to use this method

    }

    function saveAndApplyChanges(){
        let saveObject = [

        ];
        let numberContentSection = document.getElementById("data-section").childElementCount + 1;
        for(let i = 1; i < numberContentSection; i++){ 
            contentSectionId = "content-column-" + i;
            contentSection = document.getElementById(contentSectionId);
            let numberRows = contentSection.childElementCount - 2;
            let contentSectionObject = {
                speed: document.getElementById("speed-input-" + "content-column-" + i).value,
                rows: [

                ],
            }
            for(let j = 1; j < numberRows + 2; j++){ //when we delete a value in the system there is now a gap in the numbers (example we have 1, 2, 3, 4 -> we delete 2. This system sees the number of rows at 3 total (1, 3, 4) and then it looks for sequential values of 1, 2, 3). To compenstate when we add to the total number of rows so it looks for (1,2,3,4) sequentially
                let targetInput = document.getElementById("input-"+ j + "-content-column-" + i);
                let targetSelect = document.getElementById("select-" + j + "-content-column-" + i);
                if(targetInput != null && targetSelect != null){
                    let rowObject = {
                        inputValue: targetInput.value,
                        selectValue: targetSelect.value,
                    }
                    contentSectionObject.rows.push(rowObject);
                }
            }
            saveObject.push(contentSectionObject);
        }
        console.log("saveObject: ", saveObject);
        chrome.storage.sync.set({saveObject: saveObject});
    }

    // This function is primarily for re-creating the UI structure from an object representation stored in memory between session
    // Recently this function has also been hijacked to help with deleting because of issues where we don't all the elements sequencially (ex 1,2,4,5 when deleting 3) which casues issues with how I've built this
    function rehydrateSavedData(excludeIndex){
        chrome.storage.sync.get(["saveObject"], (data) => {
            
            console.log("data.saveObject before splice", data.saveObject);

            // Delete excludeIndex for deleting syncing purposes
            if(excludeIndex && data.saveObject != undefined){
                data.saveObject.splice(excludeIndex, 1); //TODO: not sure why I can't delete the last row here but it works in all other cases from what I can tell
                console.log("data.saveObject right after splice ", data.saveObject);
            }

            
            
            //if we have no saved data, make one column
            if(data.saveObject != undefined && data.saveObject.length > 0){
                
                console.log("data.saveObject after splice in if", data.saveObject);

                data.saveObject.forEach((currentColumn) => {
                    columnId = AddContentColumn(currentColumn);
                    currentColumn.rows.forEach((currentRow) => {
                        AddNewRowButton(columnId, currentRow);
                    })
                });
                
            }
            // else grab the saved data and populate the structure with it
            else {
                AddContentColumn(undefined, true);
                console.log("no data");
            }
        })
    } 

    document.querySelector('#add-content-column').addEventListener("click", () => AddContentColumn(undefined, true));    
    rehydrateSavedData();
});
  