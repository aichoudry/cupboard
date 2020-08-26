$(document).ready(() => {
  let desc = $("#items").find(":selected").data("description");
  let tags = $("#items").find(":selected").data("tags");
  let name = $("#items").find(":selected").data("name");
  let location = $("#items").find(":selected").data("location");
  $("#description").val(desc);
  $("#tags").val(tags);
  $("#name").val(name);
  $("#location").val(location);
});

$("#items").on("change", function (e) {
  let desc = $(this).find(":selected").data("description");
  let tags = $(this).find(":selected").data("tags");
  let name = $(this).find(":selected").data("name");
  let location = $(this).find(":selected").data("location");
  $("#description").val(desc);
  $("#tags").val(tags);
  $("#name").val(name);
  $("#location").val(location);
});
