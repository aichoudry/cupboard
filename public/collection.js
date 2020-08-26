$(document).ready(() => {
  let desc = $("#collections").find(":selected").data("description");
  let name = $("#collections").find(":selected").data("name");
  $("#description").val(desc);
  $("#name").val(name);
});

$("#collections").on("change", function (e) {
  let desc = $(this).find(":selected").data("description");
  let name = $(this).find(":selected").data("name");
  $("#description").val(desc);
  $("#name").val(name);
});
