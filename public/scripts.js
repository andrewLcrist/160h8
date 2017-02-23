renderHatred()

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

function renderHatred() {
  clearHatred()
  $.get('/hateList', function(hateList){
    hateList.forEach(function(hated){
      let forgiveness = hated.forgive == "true" ? "Forgiven" : "Not Forgiven"
      $('.hate-table').append(
        `  <tr>
            <td>Offender: ${hated.name}</td>
            <td>Offense: ${hated.offense}</td>
            <td>Date of Offense: ${hated.date}</td>
            <td>Forgiven? <button class="toggle-hatred" onclick="toggleForgiveness(${hated.id})" >${forgiveness}</button></td>
          </tr>
        `
      )
    })
  })
}

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
