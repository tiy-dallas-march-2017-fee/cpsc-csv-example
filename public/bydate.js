var dateList = document.querySelector('#dates');
var tbody = document.querySelector('tbody');

var ajaxData;

$.ajax({
  url: '/api/data'
})
.done(function(data) {
  console.log('data?', data);
  ajaxData = data;

  var dates = [];

  for (var i = 0; i < data.violations.length; i++) {
    //gathering the dates in that array
    if (dates.indexOf(data.violations[i].date) === -1) {
      dates.push(data.violations[i].date);
    }
  }


  for (var i = 0; i < dates.length; i++) {
    var li = document.createElement('li');
    li.textContent = dates[i];
    dateList.appendChild(li);
  }

});


dateList.addEventListener('click', function(evt) {
  var text = evt.target.textContent;
  console.log('You clicked on', text);

  //now, filter data and put on page!
  var filtered = [];

  for (var i = 0; i < ajaxData.violations.length; i++) {

    if (ajaxData.violations[i].date === text) {
      filtered.push(ajaxData.violations[i]);
    }

  }

  console.log('what do I have?', filtered);

  putItOnThePage(filtered);
})


function putItOnThePage(arr) {

  tbody.innerHTML = '';

  for (var i = 0; i < arr.length; i++) {
    console.log(arr[i]);
    var tr = document.createElement('tr');

    var td = document.createElement('td');
    td.textContent = arr[i].violation;

    tr.appendChild(td);
    tbody.appendChild(tr);
  }

}
