document.addEventListener("DOMContentLoaded", function () {
    

    function DeleteRowButton(id){
        console.log("delete button", id);
        document.getElementById(id).remove();
    }
    
    function AddNewRowButton(targetContentColumnId){
        console.log("add new row");
        let numberRows = document.getElementById(targetContentColumnId).childElementCount - 2;
        let newNumberRows = numberRows + 1;
        let newButtonRowId = targetContentColumnId + newNumberRows;

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
        let numberRows = document.body.childElementCount - 1;
        let newContentColumnId = numberRows + 1;

        var contentColumn = document.createElement("div");
        contentColumn.setAttribute("id", "content-column-" + newContentColumnId);
        contentColumn.setAttribute("class", "content-column");

        var speedRow = document.createElement("div");
        speedRow.setAttribute("class", "row");
        
        var speedText = document.createElement("div");
        speedText.innerText = "Speed: ";
        speedRow.appendChild(speedText);
        
        var speedInput = document.createElement("input");
        speedInput.setAttribute("type", "number");
        speedRow.appendChild(speedInput);
        
        contentColumn.appendChild(speedRow);


        var addNewRowButtonContainer = document.createElement("div");
        addNewRowButtonContainer.setAttribute("id","add-new-row-button")
        addNewRowButtonContainer.setAttribute("class","new-row-button")
        var addNewRowButtonButton = document.createElement("div");
        addNewRowButtonButton.setAttribute("class","appear-button-like")
        addNewRowButtonButton.innerText = "Add New Row";
        addNewRowButtonButton.addEventListener("click", () => AddNewRowButton("content-column-" + newContentColumnId));
        
        addNewRowButtonContainer.appendChild(addNewRowButtonButton);

        contentColumn.appendChild(addNewRowButtonContainer);

        var body = document.body;
        body.insertBefore(
            contentColumn,
            body.children[body.childElementCount]
        );

        AddNewRowButton("content-column-" + newContentColumnId);
        
    }
        
    // document.querySelector("#add-new-row-button-1").addEventListener("click", AddNewRowButton);
    // document.querySelector("#delete-button-1").addEventListener("click", () => DeleteRowButton("row-1"));
    document.querySelector('#add-content-column').addEventListener("click", () => AddContentColumn());    
    AddContentColumn();
});
  