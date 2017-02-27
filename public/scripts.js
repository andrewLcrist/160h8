renderData()

$('.submit').click(function(e){
  e.preventDefault()
  clearOffenders()
  let hated = {
    name: $('.name').val(),
    offense: $('.offense').val(),
    date: $('.date').val()
  }

  $.ajax({
    type: "POST",
    url: '/hateList',
    data: {
      hated
    }
  })
  renderData()
})

function clearOffenders() {
  $('.offender-names').empty()
}

function renderData() {
  clearOffenders()
  renderTotalOffenders()
  getOffenderNames(renderOffenderNames)
  renderForgiven()
  renderUnforgiven()
}

function renderTotalOffenders() {
  $.get('/hateList', function(hateList){
    $('.total-offenders').text(hateList.length)
  })
}

function renderForgiven() {
  let totalForgiven = 0
  $.get('/hateList', function(hateList){
  const forgivenTotal = forgivenCount(hateList)
  $('.number-forgiven').text(forgivenTotal)
  })
}

function renderUnforgiven() {
  let total = 0
  $.get('/hateList', function(hateList){
  const unforgivenTotal = unforgivenCount(hateList)
  $('.number-unforgiven').text(unforgivenTotal)
  })
}

function getOffenderNames(task) {
  $.get('/hateList', function(hateList){
      task(hateList)
    })
}

$('.filter-name').on('click', function() {
  clearOffenders()
  getOffenderNames(renderOffenderNamesSorted)
})

$('.filter-date').on('click', function() {
  clearOffenders()
  getOffenderNames(renderOffenderNamesByDate)
})

function renderOffenderNamesSorted(obj) {
  obj.sort(function(a, b){
    var nameA = a.name.toUpperCase();
    var nameB = b.name.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  })
  obj.forEach(e => {
    let rendered = renderOffenderNamesSimple(e)
    $('.offender-names').append(rendered)
  })
}

function renderSelected(id) {
  clearHatred()
  $.get(`/hateList/${id}`, function(details){
      let person = details.hateList
      let forgiveness = person.forgive == "false" ? "Not Forgiven" : "Forgiven"
      let rendered = renderHateTable(person, forgiveness)
      $('.hate-table').append(rendered)
    })
}

function clearHatred() {
  $('.hate-table').empty()
}

function toggleForgiveness(id) {
  $.get(`/hateList/${id}`, function(response) {
    let toggle = response.hateList.forgive == "false" || response.hateList.forgive == false ? true : false
    $.ajax({
      type: "PUT",
      url: `/hateList/${id}`,
      data: {
        forgive: toggle
      }
    })
    .then(function() {
      renderForgiven()
      renderUnforgiven()
      clearHatred()
      renderSelected(id)
    })
  })
}

$('.name').on('keyup', function(){
  buttonCheck();
})

$('.offense').on('keyup', function() {
  buttonCheck();
})

$('.date').on('change', function() {
  buttonCheck();
})

function buttonCheck(){
  name = $('.name').val();
  offense = $('.offense').val();
  date = $('.date').val();
  var fieldsComplete = name && offense && date
  $('.submit').attr('disabled', !fieldsComplete);
}
