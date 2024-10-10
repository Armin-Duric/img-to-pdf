import Tesseract from "tesseract.js";
import jsPDF from "jspdf";

const doc = new jsPDF();

document.getElementById("convert").addEventListener("click", function (event) {
  event.preventDefault();

  const fileInput = document.getElementById("file-input");
  const file = fileInput.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = function (e) {
      const dataURL = e.target.result;

      Tesseract.recognize(dataURL, "eng", {
        logger: (m) => console.log(m),
      })
        .then(({ data: { text } }) => {
          doc.text(text, 10, 10);
          document.getElementById("p").innerHTML = text;
        })
        .catch((err) => {
          console.error("Error:", err);
        });
    };

    reader.onerror = function (e) {
      console.error("Error reading file:", e);
    };

    reader.readAsDataURL(file);
  } else {
    console.log("No file selected");
  }
});

document.getElementById("download").addEventListener("click", function (event) {
  event.preventDefault();
  doc.save("document.pdf");
});
