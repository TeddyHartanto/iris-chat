'use strict';

describe('Filter: senderFilter', function () {

  // load the filter's module
  beforeEach(module('irisChatApp'));

  // initialize a new instance of the filter before each test
  var senderFilter;
  beforeEach(inject(function ($filter) {
    senderFilter = $filter('senderFilter');
  }));

  it('should return the input prefixed with "senderFilter filter:"', function () {
    var text = 'angularjs';
    expect(senderFilter(text)).toBe('senderFilter filter: ' + text);
  });

});
