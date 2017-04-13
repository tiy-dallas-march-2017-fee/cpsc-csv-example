console.log('yo');

var tbody = document.querySelector('tbody');
var filterButton = document.querySelector('#filter-button');
var productInput = document.querySelector('#product-input');
var violationInput = document.querySelector('#violation-input');
var firmInput = document.querySelector('#firm-input');

var allTheData;

function putOnPage(list) {
  console.log('dat list', list);
  var template = document.querySelector('#row-template').innerHTML;

  var str = '';

  for (var i = 0; i < list.length; i++) {
    list[i].rowNum = i;
    str += Mustache.render(template, list[i]);
  }

  tbody.innerHTML = str;
}

$.ajax({
  url: '/api/data'
})
.done(function(data) {
  allTheData = data;
  console.log('all?', allTheData);

  putOnPage(allTheData.violations);

});

var productFilter = '';
var violationFilter = '';
var firmFilter = '';

productInput.addEventListener('keyup', function() {
  productFilter = productInput.value.toUpperCase();
  filter();
});
violationInput.addEventListener('keyup', function() {
  violationFilter = violationInput.value.toUpperCase();
  filter();
});
firmInput.addEventListener('keyup', function() {
  firmFilter = firmInput.value.toUpperCase();
  filter();
});


function filter() {
  console.log('filtering', productFilter, violationFilter, firmFilter);
  var filtered = [];

  for (var i = 0; i < allTheData.violations.length; i++) {
    var item = allTheData.violations[i];
    //console.log(allTheData.violations[i]);

    if (productFilter !== '') {
      if (item.product.indexOf(productFilter) === -1) {
        console.log('skipping', item.product, 'for', productFilter);
        continue;
      }
    }
    if (violationFilter !== '') {
      if (item.violation.toUpperCase().indexOf(violationFilter) === -1) {
        continue;
      }
    }
    if (firmFilter !== '') {
      if (item.firm.indexOf(firmFilter) === -1) {
        continue;
      }
    }

    filtered.push(item);

  }

  putOnPage(filtered);
}
