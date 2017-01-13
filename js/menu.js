$(document.body).on("click", ".header span.toggle", function(event) {
  var header = $("section.header");
  header.toggleClass("toggled");
  $(document.body).toggleClass("toggled");
  $(event.currentTarget).toggleClass("cross");
});
