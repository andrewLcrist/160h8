function renderHateTable(person, forgiveness) {
  return   `<tr>
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

function renderOffenderNamesSimple(e) {
  return `<li class="offender-name"><button class="offender-name-button" onclick="renderSelected(${e.id})" >${e.name}, ${e.date}</button></li>`
}

function forgivenCount(hateList) {
  return hateList.filter(e => e.forgive == 'true' || e.forgive == true).length
}

function unforgivenCount(hateList) {
  return hateList.filter(e => e.forgive == 'false' || e.forgive == false).length
}

function renderOffenderNamesByDate(obj) {
  obj.sort(function(a, b){
    var dateA = a.date.toUpperCase();
    var dateB = b.date.toUpperCase();
    if (dateA < dateB) {
      return -1;
    }
    if (dateA > dateB) {
      return 1;
    }
    return 0;
  })
  obj.forEach(e => {
    let rendered = renderOffenderNamesSimple(e)
    $('.offender-names').append(rendered)
  })
}

if(typeof module !== 'undefined') {
  module.exports = {
    forgivenCount,
    unforgivenCount,
    renderOffenderNamesByDate
  }
}
