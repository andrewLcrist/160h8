renderHatred()
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
      <button class="${e[0]}" onclick="renderSelected()" >${e[1]}</button>
      `
    )
  })
}

function renderSelected() {
  console.log('hello');
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
  .then(function() {
    renderHatred()
  })
})

// function renderHatred() {
//   clearHatred()
//   $.get('/hateList', function(hateList){
//     hateList.forEach(function(hated){
//       let forgiveness = hated.forgive == "false" ? "Not Forgiven" : "Forgiven"
//       $('.hate-table').append(
//         `  <tr>
//             <td>Offender: ${hated.name}</td>
//           </tr>
//           <tr>
//             <td>Offense: ${hated.offense}</td>
//           </tr>
//           <tr>
//             <td>Date of Offense: ${hated.date}</td>
//           </tr>
//           <tr>
//             <td>Forgiven? <button class="toggle-hatred" onclick="toggleForgiveness(${hated.id})" >${forgiveness}</button></td>
//           </tr>
//         `
//       )
//     })
//   })
// }

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
      renderHatred()
    })
  })
}
