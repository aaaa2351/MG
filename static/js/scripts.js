document.getElementById("browseButton").addEventListener("click", () => {
  document.getElementById("fileInput").click();
});

const dropZone = document.getElementById("drop-zone");
const fileInput = document.getElementById("fileInput");
const progressBar = document.getElementById("uploadProgress");
const form = document.querySelector("form");

dropZone.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropZone.classList.add("dragover");
});

dropZone.addEventListener("dragleave", () => {
  dropZone.classList.remove("dragover");
});

dropZone.addEventListener("drop", (e) => {
  e.preventDefault();
  dropZone.classList.remove("dragover");
  const files = e.dataTransfer.files;
  if (files.length > 0) {
    fileInput.files = files;
  }
});

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const file = fileInput.files[0];
  if (!file) return;

  const xhr = new XMLHttpRequest();
  const formData = new FormData(form);
  xhr.open("POST", "/", true);

  xhr.upload.onprogress = function (e) {
    if (e.lengthComputable) {
      progressBar.value = (e.loaded / e.total) * 100;
    }
  };

  xhr.onload = function () {
    if (xhr.status === 200) {
      location.reload();
    } else {
      alert("Upload failed!");
    }
  };

  xhr.send(formData);
});
