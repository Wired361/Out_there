// Bind first to d3.select
d3.selection.prototype.first = function() {
  return d3.select(this.nodes()[0]);
};

// function that creates a table header at #placeholder
function createTable(columns, id) {
  var table = d3
      .select(id)
      .attr("class", "container-fluid d-block")
      .append("table")
      .attr("id", "dataTable")
      .attr(
        "class",
        "table table-hover table-dark table-striped table-responsive mx-auto"
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
      return headText.split(/(?=[A-Z])/)[0];
    })
    .attr("scope", "col")
    .attr("class", "text-capitalize");
  return table;
}

// Function for creating table with all the data
function allData(data) {
  // create a row for each object in the data
  var tbody = d3.select("#dataTable").append("tbody"),
    rows = tbody
      .selectAll("tr")
      .data(data)
      .enter()
      .append("tr");
  rows
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
    .attr("class", "text-capitalize")
    .text(function(tableData) {
      return tableData.value;
    });

  return tbody;
}

// Function for date filtering
function filterByDate() {
  d3.select("#resetButton").attr("class", "btn btn-light btn-sm ml-2");
  d3.selectAll("tr")
    .selectAll("td")
    .remove();
  let copyData = data;
  let dateQuery = new Date(document.getElementById("dateFilter").value);
  let tzoneOffset = dateQuery.getTimezoneOffset() * 60000;
  let convertedDate = Date.parse(dateQuery) + tzoneOffset;
  var dateArray = copyData.filter(function(d) {
    return Date.parse(d.datetime) == convertedDate;
  });
  allData(dateArray);
}
// Reset button for table
function resetData() {
  d3.selectAll("tr")
    .selectAll("td")
    .remove();
  allData(data);
  console.clear();
  console.log("reset");
  d3.select("#resetButton").attr("class", "d-none");
}

// Function for header reformatting
function headerFormat() {
  d3.select("#header").attr("class", "moving");
  setTimeout(function() {
    let headTitle = d3.select("#header").attr("class", "py-5");
    return headTitle;
  }, 1000);
}
// grab keys from first data.js object and create an array called columns
var columns = Object.keys(data[0]);
var phid = "#placeholder";

// Event listener for create full table button
d3.select("#allButton").on("click", function() {
  d3.event.preventDefault();
  d3.select("#allButton").attr("class", "d-none");
  headerFormat();
  setTimeout(function() {
    d3.select("#filterForm").attr(
      "class",
      "d-flex form-inline justify-content-center pb-2"
    );
    d3.select("#searchButton").attr("class", "btn btn-light btn-sm ml-2");
    createTable(columns, phid);
    allData(data);
  }, 650);
});

// Modal stuff
$("#reportModal").on("show.bs.modal", event => {
  var button = $(event.relatedTarget);
  var modal = $(this);
});
