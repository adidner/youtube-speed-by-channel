document.addEventListener("DOMContentLoaded", function () {
    

    function DeleteRowButton(id){
        console.log("delete button", id);
        document.getElementById(id).remove();
    }
    
    function AddNewRowButton(){
        console.log("add new row");
        let numberRows = document.getElementById("content-column-1").childElementCount - 2;
        let newId = numberRows + 1;


        var row = document.createElement("div");
        row.setAttribute("class", "row");
        row.setAttribute("id", "row-" + newId);
        
        var deleteButton = document.createElement("div");
        deleteButton.setAttribute("id", "delete-button-" + newId);
        deleteButton.setAttribute("class", "delete-row-button appear-button-like");
        // deleteButton.setAttribute("onclick", () => DeleteRowButton(newId));
        deleteButton.addEventListener("click", () => DeleteRowButton("row-" + newId));
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
        

        var customs_element = document.getElementById("content-column-1");
        customs_element.insertBefore(
            row,
            customs_element.children[customs_element.childElementCount - 1]
            );
    }
    
    
    
        
    document.querySelector("#add-new-row-button-1").addEventListener("click", AddNewRowButton);
    document.querySelector("#delete-button-1").addEventListener("click", () => DeleteRowButton("row-1"));
        
});
  