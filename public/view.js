let collections = $("#collectionsData").data("list");
let items = $("#itemsData").data("list");

function filterItems(val) {
  let filteredItems = [];
  items.forEach((item) => {
    let names = [item.name, item.location];
    item.tags.forEach((tag) => {
      names.push(tag);
    });
    let combinedNames = names.join(",");
    if (names.join(",").toLowerCase().includes(val))
      filteredItems.push(item._id);
  });
  return filteredItems;
}

function filterCollections(val) {
  let filteredCollections = [];
  collections.forEach((collection) => {
    if (collection.name.toLowerCase().includes(val))
      filteredCollections.push(collection._id);
  });
  return filteredCollections;
}

$("#search").on("input", async function (e) {
  let val = $(this).val().toString().toLowerCase();
  let filteredItems = filterItems(val);
  let filteredCollections = filterCollections(val);

  $("#items-row")
    .children()
    .each(function () {
      if (!filteredItems.includes($(this).attr("id"))) {
        $(this).addClass("d-none");
      } else {
        $(this).removeClass("d-none");
      }
    });

  $("#collections-row")
    .children()
    .each(function () {
      if (!filteredCollections.includes($(this).attr("id"))) {
        $(this).addClass("d-none");
      } else {
        $(this).removeClass("d-none");
      }
    });
});
