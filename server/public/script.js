const colors = [
  "#16a085", // Teal
  "#27ae60", // Green
  "#2c3e50", // Dark Blue
  "#f39c12", // Orange
  "#e74c3c", // Red
  "#9b59b6", // Purple
  "#FB6964", // Pink
  "#342224", // Dark Brown
  "#472E32", // Brown
  "#BDBB99", // Beige
  "#77B1A9", // Light Teal
  "#73A857", // Light Green
  "#e67e22", // Carrot Orange
  "#3498db", // Sky Blue
  "#f1c40f", // Yellow
  "#e84393", // Hot Pink
  "#7f8c8d", // Grey
  "#9b59b6", // Purple (Repeated for variety)
  "#2ecc71", // Emerald
  "#d35400", // Orange Red
  "#34495e", // Slate Blue
];

function applyNewStyles() {
  const color = colors[Math.floor(Math.random() * colors.length)];
  $("html body").animate(
    {
      backgroundColor: color,
      color: color,
    },
    1000
  );
  $(".button").animate(
    {
      backgroundColor: color,
    },
    1000
  );
}

$(document).ready(function () {
  applyNewStyles();

  $("#new-quote").on("click", function () {
    location.reload(); // Reloads the page to fetch a new quote
  });
});
// script.js

$(document).ready(function () {
  // Handle New Quote button click
  $("#new-quote").click(function () {
    // Logic to get a new quote
    // For example, you might want to fetch a new quote from your server
  });

  // Handle Copy button click
  $("#copy-quote").click(function () {
    // Get the text of the quote
    var quoteText = $("#text").text();

    // Create a temporary input element to copy the text
    var $tempInput = $("<input>");
    $("body").append($tempInput);
    $tempInput.val(quoteText).select();
    document.execCommand("copy");
    $tempInput.remove();

    // Optionally, display a message or feedback to the user
    alert("Quote copied to clipboard!");
  });
});
