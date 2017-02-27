const expect = require('chai').expect;
const should = require('chai').should;
const jsdom = require('mocha-jsdom')

describe('forgivenCount', function(){
  jsdom()

  beforeEach(function() {
    $ = require('jquery')
  })

  it('generates number of forgiven', function(){
    const forgivenCount = require('../public/hateHelpers.js').forgivenCount
    const hateList = [{ id: 1, name: 'Meeka', offense: 'awesome teaching skills', forgive: true, date: 'December 31, 1969' }]
    expect(forgivenCount(hateList)).to.equal(1)
  })
})

describe('unforgivenCount', function(){
  jsdom()

  beforeEach(function() {
    $ = require('jquery')
  })

  it('generates number of unforgiven', function(){
    const unforgivenCount = require('../public/hateHelpers.js').unforgivenCount

    const hateList = [{ id: 1, name: 'Meeka', offense: 'awesome teaching skills', forgive: true, date: 'December 31, 1969' }]
    expect(unforgivenCount(hateList)).to.equal(0)
  })
})

describe('render offenders by date', function(){
  jsdom()

  beforeEach(function() {
    $ = require('jquery')
  })

  it('sorts offenders by date of offense added', function(){
    const sortByDate = require('../public/hateHelpers.js').sortByDate

    const obj = [{ id: 1, name: 'Meeka', offense: 'awesome teaching skills', forgive: true, date: '2006-07-14' }, { id: 1, name: 'Meeka', offense: 'awesome teaching skills', forgive: true, date: '1969-12-31' }]

    let sorted = sortByDate(obj)

    expect(sorted[0].date).to.equal('2006-07-14')
  })
})

describe('render offenders by name', function(){
  jsdom()

  beforeEach(function() {
    $ = require('jquery')
  })

  it('sorts offenders by name', function(){
    const sortByName = require('../public/hateHelpers.js').sortByName

    const obj = [{ id: 1, name: 'Meeka', offense: 'awesome teaching skills', forgive: true, date: '2006-07-14' }, { id: 1, name: 'Andrew', offense: 'awesome teaching skills', forgive: true, date: '1969-12-31' }]

    let sorted = sortByName(obj)

    expect(sorted[0].name).to.equal('Andrew')
  })
})
