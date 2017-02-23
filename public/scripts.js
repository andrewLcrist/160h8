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
  $.get('/hateList', function(hateList){
    hateList.forEach(function(hated){
      $('.hate-table').append(
        `  <tr>
            <td>Offender: ${hated.name}</td>
            <td>Offense: ${hated.offense}</td>
            <td>Date of Offense: ${hated.date}</td>
            <td>Forgiven? ${hated.forgive}</td>
          </tr>
        `
      )
    })
  })
}
