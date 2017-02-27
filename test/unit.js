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

describe('render offdenders by date', function(){
  jsdom()

  beforeEach(function() {
    $ = require('jquery')
  })

  xit('sorts offenders by date of offense added', function(){
    const renderOffenderNamesByDate = require('../public/hateHelpers.js').renderOffenderNamesByDate
    const obj = [{ id: 1, name: 'Meeka', offense: 'awesome teaching skills', forgive: true, date: 'December 31, 1969' }, { id: 1, name: 'Meeka', offense: 'awesome teaching skills', forgive: true, date: 'January 31, 1969' }]

    expect(renderOffenderNamesByDate(obj)).to.equal({ id: 1, name: 'Meeka', offense: 'awesome teaching skills', forgive: true, date: 'January 31, 2017' }, { id: 1, name: 'Meeka', offense: 'awesome teaching skills', forgive: true, date: 'December 31, 1969' })
  })
})
