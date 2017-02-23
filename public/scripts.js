renderData()

function renderData() {
  renderTotalOffenders()
  getOffenderNames()
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
      if(e.forgive == "true"){ totalForgiven += 1 }
      $('.number-forgiven').text(totalForgiven)
    })
  })
}

function renderUnforgiven() {
  let total = 0
  $.get('/hateList', function(hateList){
    hateList.forEach(e => {
      if(e.forgive == "false"){ total += 1 }
      $('.number-unforgiven').text(total)
    })
  })
}

function getOffenderNames() {
  $.get('/hateList', function(hateList){
      let obj = []
      let nameArray = hateList.forEach(e => obj.push([e.id, e.name])  )
      renderOffenderNames(obj)
    })
}

function renderOffenderNames(obj) {
  obj.forEach(e => {
    $('.offender-names').append(
      `
      <button class="${e[0]}" onclick="renderSelected(${e[0]})" >${e[1]}</button>
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

$('.submit').click(function(e){
  e.preventDefault()
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
})

function clearHatred() {
  $('.hate-table').empty()
}

function toggleForgiveness(id) {
  $.get(`/hateList/${id}`, function(response) {
    let toggle = response.hateList.forgive == "false" ? true : false
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
