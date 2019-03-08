// function that creates a table at an id (probably placeholder)
function createTable(columns, id) {
  var table = d3.select(id).append('table').attr('class', 'table table-dark table-striped'),
    thead = table.append('thead');

  // append the header row with filtered columns
  thead.append('tr')
    .selectAll('th')
    .data(columns)
    .enter()
    .append('th')
    .text(function (headText) {
      return headText.split(/(?=[A-Z])/).join(' in ');
    })
    .attr('scope', 'col')
    .attr('class', 'text-capitalize');
  return table;
};
// grab keys from first data.js object and create an array called columns
var columns = Object.keys(data[0]);
var phid = '#placeholder';
//create a function that filters based on form input (maybe a map?)
d3.select('#exploreButton')
  .on('click', function () {
    d3.event.preventDefault();
    d3.select('#exploreButton').attr('class', 'd-none');
    d3.select('#filterButton').attr('class', 'btn btn-light btn-lg')
    createTable(columns, phid);
  });
// apply a map to the data looping the previous function over all objects in data.js


$("#reportModal").on("show.bs.modal", (event) => {
  var button = $(event.relatedTarget);
  var modal = $(this);
  // Use above variables to manipulate the DOM
});