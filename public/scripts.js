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
    hateList.forEach(e => {
      if(e.forgive == "true" || e.forgive == true){ totalForgiven += 1 }
      $('.number-forgiven').text(totalForgiven)
    })
  })
}

function renderUnforgiven() {
  let total = 0
  $.get('/hateList', function(hateList){
    hateList.forEach(e => {
      if(e.forgive == "false" || e.forgive == false){ total += 1 }
      $('.number-unforgiven').text(total)
    })
  })
}

function getOffenderNames(task) {
  $.get('/hateList', function(hateList){
      task(hateList)
    })
}

function renderOffenderNames(obj) {
  obj.forEach(e => {
    $('.offender-names').append(
      `
      <li class="offender-name"><button class="offender-name-button" onclick="renderSelected(${e.id})" >${e.name}, ${e.date}</button></li>
      `
    )
  })
}

$('.filter-name').on('click', function() {
  clearOffenders()
  getOffenderNames(renderOffenderNamesSorted)
})

function renderOffenderNamesSorted(obj) {
  obj.forEach(e => {
    $('.offender-names').append(
      `
      <li class="offender-name"><button class="offender-name-button" onclick="renderSelected(${e.id})" >${e.name}, ${e.date}</button></li>
      `
    )
  })
}

function renderSelected(id) {
  clearHatred()
  $.get(`/hateList/${id}`, function(details){
      let person = details.hateList
      let forgiveness = person.forgive == "false" ? "Not Forgiven" : "Forgiven"
      $('.hate-table').append(
        `<tr>
          <td>Offender: ${person.name}</td>
        </tr>
        <tr>
          <td>Offense: ${person.offense}</td>
        </tr>
        <tr>
          <td>Date of Offense: ${person.date}</td>
        </tr>
        <tr>
          <td>Forgiven? <button class="toggle-hatred" onclick="toggleForgiveness(${person.id})" >${forgiveness}</button></td>
        </tr>
        `
      )
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
