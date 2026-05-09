
fetch("../../../frontend/pages/admin-nav-bar.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("top-bar").innerHTML = data;
  });