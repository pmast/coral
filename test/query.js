/**
 * Test dependencies.
 */

var Query = require('../lib/query'),
  DB = require('./helper/db'),
  should = require('should');

describe('query', function() {

  var db = new DB();

  beforeEach(function(done) {
    db.connect();
    db.initialize(done);
  });

  afterEach(function(done) {
    db.disconnect(done);
  });

  it('find - must return all available records', function(done) {
    var cb = function(err, records) {
      if (!err) {
        records.length.should.equal(3);
        records[0].name.should.equal('A');
        records[1].name.should.equal('B');
        records[2].name.should.equal('C');
      } else {
        console.log(err);
      }
      done();
    };
    var data = db.getData();
    var query = new Query(data.brand);
    var options = {
      findAll: true,
    };
    query.find(options, cb);
  });

  it('find - must return all available records with sort and in descending order', function(done) {
    var cb = function(err, records) {
      if (!err) {
        records.length.should.equal(3);
        records[0].name.should.equal('C');
        records[1].name.should.equal('B');
        records[2].name.should.equal('A');
      } else {
        console.log(err);
      }
      done();
    };
    var data = db.getData();
    var query = new Query(data.brand);
    var options = {
      sort: '-name',
      skip: '0',
      limit: '3'
    };
    query.find(options, cb);
  });

  it('find - must return all available records with sort, in ascending order and limit of 2', function(done) {
    var cb = function(err, records) {
      if (!err) {
        records.length.should.equal(2);
        records[0].name.should.equal('A');
        records[1].name.should.equal('B');
      } else {
        console.log(err);
      }
      done();
    };
    var data = db.getData();
    var query = new Query(data.brand);
    var options = {
      sort: 'name',
      skip: '0',
      limit: '2'
    };
    query.find(options, cb);
  });

  it('find - must return all available records with sort order with skip first and limit of 2', function(done) {
    var cb = function(err, records) {
      if (!err) {
        records.length.should.equal(2);
        records[0].name.should.equal('B');
        records[1].name.should.equal('C');
      } else {
        console.log(err);
      }
      done();
    };
    var data = db.getData();
    var query = new Query(data.brand);
    var options = {
      sort: 'name',
      skip: '1',
      limit: '3'
    };
    query.find(options, cb);
  });

  it('find - must return all available records with select of id only and sort desc', function(done) {
    var cb = function(err, records) {
      if (!err) {
        records.length.should.equal(3);
        records[0].name.should.equal('A');
        records[1].name.should.equal('B');
        records[2].name.should.equal('C');
      } else {
        console.log(err);
      }
      done();
    };
    var data = db.getData();
    var query = new Query(data.brand);
    var options = {
      select: '_id name',
      findAll: true
    };
    query.find(options, cb);
  });

  it('find - must return emapty records without pagination, skip and findAll', function(done) {
    var cb = function(err, records) {
      if (!err) {
        should.not.exist(records);
      } else {
        console.log(err);
      }
      done();
    };
    var data = db.getData();
    var query = new Query(data.brand);
    var options = {};
    query.find(options, cb);
  });

  it('findOne - must return exact available record', function(done) {
    var data = db.getData();
    var query = new Query(data.brand);
    var cb = function(err, record) {
      if (!err) {
        record.name.should.equal('A');
      } else {
        console.log(err);
      }
      done();
    };
    var identifier = {
      '_id': data.brandData[0]
    };
    query.findOne(identifier, cb);
  });

  it('create - must create proper records', function(done) {
    var data = db.getData();
    var query = new Query(data.brand);
    var records = [{
      name: 'samsung'
    }, {
      name: 'nokia'
    }];
    var cb = function(err, record1, record2) {
      if (!err) {
        record1.name.should.equal('samsung');
        record2.name.should.equal('nokia');
      } else {
        console.log(err);
      }
      done();
    };
    query.create(records, cb);
  });

  it('findOneAndUpdate - must update proper record', function(done) {
    var data = db.getData();
    var query = new Query(data.brand);
    var records = {
      name: 'samsung'
    };
    var cb = function(err, record) {
      if (!err) {
        record.name.should.equal('samsung');
      } else {
        console.log(err);
      }
      done();
    };
    var identifier = {
      '_id': data.brandData[0]
    };
    query.findOneAndUpdate(identifier, records, cb);
  });

  it('findOneAndRemove - must remove proper record', function(done) {
    var data = db.getData();
    var query = new Query(data.brand);
    var cb = function(err) {
      should.not.exist(err);
      if (!err) {
        done();
      }
    };
    var identifier = {
      '_id': data.brandData[0]
    };
    query.findOneAndRemove(identifier, cb);
  });

});