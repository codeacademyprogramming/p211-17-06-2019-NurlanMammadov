"use strict";
//File API
//File, FileList, FileReader

const btnAdd = document.getElementsByClassName("add-more-files")[0];
const btnClearAll = document.getElementsByClassName("clear-all")[0];
const btnRemoveSelected = document.getElementsByClassName("remove-selected")[0];

const photoInput = document.getElementById("photos");
const table = document.getElementById("file_table");
let dropArea = document.getElementsByClassName("drop-files")[0];

dropArea.ondragover = function(e){
  e.preventDefault();
  this.classList.add("dragover")
}

dropArea.ondragleave = function(){
  this.classList.remove("dragover")
}

dropArea.ondrop = function(e) {
  e.preventDefault();
  this.classList.remove("dragover");
  LoadPhotos([...e.dataTransfer.files]);
};

btnClearAll.onclick = function() {
  table.lastElementChild.innerText = "";
  table.classList.add("d-none");
};

btnAdd.onclick = function() {
  photoInput.click();
};

photoInput.onchange = function() {
  const photoList = [...photoInput.files];
  LoadPhotos(photoList);
};

function LoadPhotos(photoList) {
  let hasPhoto = false;

  photoList.forEach(photo => {
    if (photo.type.includes("image/")) {
      hasPhoto = true;

      const tr = document.createElement("tr");

      const tdName = document.createElement("td");
      tdName.innerText = photo.name;

      const tdImage = document.createElement("td");

      const reader = new FileReader();
      reader.onload = function(e) {
        const result = e.target.result;
        
        const img = document.createElement("img");
        img.src = result;
        tdImage.appendChild(img);
      };
      reader.readAsDataURL(photo);

      const tdSize = document.createElement("td");
      tdSize.innerText = (photo.size / 1024).toFixed(2) + " kb";

      const tdType = document.createElement("td");
      tdType.innerText = photo.type;

      const tdCheckbox = document.createElement("td");

      const checkbox = document.createElement("input");
      checkbox.setAttribute("type", "checkbox");
      checkbox.classList.add("form-control");

      checkbox.onchange = function() {
        ShowRemoveSelectedButton();
      };

      tdCheckbox.appendChild(checkbox);

      tr.appendChild(tdName);
      tr.appendChild(tdImage);
      tr.appendChild(tdSize);
      tr.appendChild(tdType);
      tr.appendChild(tdCheckbox);

      table.lastElementChild.appendChild(tr);
    }
  });

  if (hasPhoto) {
    table.classList.remove("d-none");
  }
}

btnRemoveSelected.onclick = function() {
  const checkedCheckboxes = [
    ...document.querySelectorAll("input[type=checkbox]:checked")
  ];
  checkedCheckboxes.forEach(function(item) {
    item.closest("tr").remove();
  });
};

function ShowRemoveSelectedButton() {
  const checkedCheckboxes = document.querySelectorAll(
    "input[type=checkbox]:checked"
  );

  if (checkedCheckboxes.length > 0) {
    btnRemoveSelected.classList.remove("d-none");
  } else {
    btnRemoveSelected.classList.add("d-none");
  }
}
