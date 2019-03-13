// Bind first to d3.select
d3.selection.prototype.first = function() {
  return d3.select(this.nodes()[0]);
};

// function that creates a table header at #placeholder
function createTable(columns, id) {
  var table = d3
      .select(id)
      .attr("class", "container-fluid")
      .append("table")
      .attr("id", "dataTable")
      .attr(
        "class",
        "table table-hover table-dark table-striped table-responsive"
      ),
    thead = table.append("thead");

  // append the header row with filtered columns
  thead
    .append("tr")
    .selectAll("th")
    .data(columns)
    .enter()
    .append("th")
    .attr("scope", "col")
    .text(function(headText) {
      return headText.split(/(?=[A-Z])/).join(" in ");
    })
    .attr("scope", "col")
    .attr("class", "text-capitalize sticky");
  return table;
}

// Function for creating table with all the data
function allData() {
  // create a row for each object in the data
  var tbody = d3.select("#dataTable").append("tbody"),
    rows = tbody
      .selectAll("tr")
      .data(data)
      .enter()
      .append("tr"),
    cellData = rows
      .selectAll("td")
      .data(function(row) {
        return columns.map(function(key) {
          if (key == "state" || key == "country") {
            row[key] = row[key].toUpperCase();
          }

          return { key: key, value: row[key] };
        });
      })
      .enter()
      .append("td")
      .attr("class", "text-truncate text-capitalize")
      .text(function(tableData) {
        return tableData.value;
      });

  return tbody;
}

// Function for date filtering
function tableFilter() {
  var dateValue = document.getElementById("#dateFilter").value();
  var tableDate = d3.selectAll("tr");
  console.log(dateValue);
}

// Function for header reformatting
function headerFormat() {
  var headTitle = d3.select("#header").attr("class", "py-5");
  return headTitle;
}
// grab keys from first data.js object and create an array called columns
var columns = Object.keys(data[0]);
var phid = "#placeholder";

// Event listener for create full table button
d3.select("#allButton").on("click", function() {
  d3.event.preventDefault();
  d3.select("#allButton").attr("class", "d-none");
  d3.select("#filterForm").attr(
    "class",
    "d-flex form-inline justify-content-center"
  );
  d3.select("#searchButton").attr("class", "btn btn-light btn-small ml-2");
  headerFormat();
  createTable(columns, phid);
  allData();
});

// Swap Buttons for search input

// Modal stuff
$("#reportModal").on("show.bs.modal", event => {
  var button = $(event.relatedTarget);
  var modal = $(this);
});
