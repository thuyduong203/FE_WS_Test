function closeComboBox() {
  var options = document.getElementById("options");
  var selectButton = document.getElementById("select-button");

  options.style.display = "none";
  selectButton.classList.remove("open");
}
