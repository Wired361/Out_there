// function that creates a table at an id (probably placeholder)
function createTable(columns, id) {
  var table = d3
      .select(id)
      .append('table')
      .attr('id', 'dataTable')
      .attr('class', 'table table-hover table-dark table-striped'),
    thead = table.append('thead');

  // append the header row with filtered columns
  thead
    .append('tr')
    .selectAll('th')
    .data(columns)
    .enter()
    .append('th')
    .attr('scope', 'col')
    .text(function(headText) {
      return headText.split(/(?=[A-Z])/).join(' in ');
    })
    .attr('scope', 'col')
    .attr('class', 'text-capitalize');
  return table;
}
// grab keys from first data.js object and create an array called columns
var columns = Object.keys(data[0]);
var phid = '#placeholder';
//create a function that filters based on form input (maybe a map?)
d3.select('#exploreButton').on('click', function() {
  d3.event.preventDefault();
  d3.select('#exploreButton').attr('class', 'd-none');
  d3.select('#allButton').attr('class', 'btn btn-light btn-lg');
  createTable(columns, phid);
});

// function to create full table
function rows(key) {
  data.map(dataobj => dataobj.key);
}

function allTable() {
  // create a row for each object in the data
  var tbody = d3.select('#dataTable').append('tbody');
  var rows = tbody
    .selectAll('tr')
    .data(data)
    .enter()
    .append('tr');

  // create a cell in each row for each column
  var cells = rows
    .selectAll('td')
    .data(function(row) {
      return columns.map(function(key) {
        if (key == 'state' || key == 'country') {
          row[key] = row[key].toUpperCase();
          console.log(row[key]);
        }

        return { key: key, value: row[key] };
      });
    })
    .enter()
    .append('td')
    .attr('class', 'text-truncate text-capitalize')
    .text(function(tableData) {
      return tableData.value;
    });

  return tbody;
}
// apply a map to the data looping the previous function over all objects in data.js
d3.select('#allButton').on('click', function() {
  d3.event.preventDefault();
  d3.select('#exploreButton').attr('class', 'd-none');
  d3.select('#allButton').attr('class', 'btn btn-light btn-lg');
  allTable();
});

data.map(row => row.pair);

// Modal stuff
$('#reportModal').on('show.bs.modal', event => {
  var button = $(event.relatedTarget);
  var modal = $(this);
});
