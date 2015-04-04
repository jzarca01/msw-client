var expect = require('chai').expect;
var nock = require('nock');

var MswClient = require('../index');

describe('MSW Client units', function () {

    describe('Constructor units', function () {

        it('should be able to optionally set units on client construction', function () {

            var units = 'us';

            var NewClient = new MswClient(
                {
                    apikey: 'apikey',
                    spot_id: 1,
                    units: units

                });

            expect(NewClient.getRequestEndpoint()).
                to.eql('http://magicseaweed.com/api/apikey/forecast?spot_id=1&units=' + units);

            expect(NewClient.getUnits()).to.eql(units);

        });
    });


    describe('get and set units', function () {

        var Client;

        beforeEach(function (done) {

            Client = new MswClient({apikey: 'apikey', spot_id: 1});
            done();

        });

        it('should be able add set units', function () {


            var units = 'us';

            Client.setUnits(units);

            var setUnits = Client.getUnits();

            expect(setUnits).to.eql(units);

        });

        it('should only except valid units', function () {

            var validUnts = ['uk', 'us', 'uk'];

            for (var i = 0; i < validUnts.length; i++) {

                expect(function () {

                    Client.setUnits(validUnts[i])

                }).to.not.throw(Error);

            }

            var invalidunits = 'pa';
            expect(function () {

                setUnits(invalidunits)

            }).to.throw(Error);

        });

        it('should not allow upper case units', function () {

            var upperunits = 'UK';
            expect(function () {

                setUnits(upperunits)

            }).to.throw(Error);

        });

        it('should be able to change units', function () {

            var units = 'uk';
            var unitsToChangeTo = 'eu';

            Client.setUnits(units);

            expect(Client.getUnits()).to.eql(units);

            Client.setUnits(unitsToChangeTo);

            expect(Client.getUnits()).to.eql(unitsToChangeTo);

        });

        it('should default to uk if units not set', function () {

            expect(Client.getUnits()).to.eql('uk');

        });

        it('should only take a string value as units', function () {

            expect(function () {
                Client.setUnits(['array', 'of', 'units'])
            })
                .to.throw(Error);

            expect(function () {
                Client.setUnits(2)
            })
                .to.throw(Error);

            expect(function () {
                Client.setUnits({units: 'object'})
            })
                .to.throw(Error);

            expect(function () {
                Client.setUnits('uk')
            })
                .to.not.throw(Error);

        });

    });

    describe('Endpoint with units', function () {

        var Client;

        beforeEach(function (done) {

            Client = new MswClient({apikey: 'apikey', spot_id: 1});
            done();

        });

        it('should update the request endpoint with the set units', function () {

            var units = 'us';

            Client.setUnits(units);

            expect(Client.getRequestEndpoint())
                .to
                .eql('http://magicseaweed.com/api/apikey/forecast?spot_id=1&units=' + units);


        });

        it('should not show units if uk is set (default)', function () {

            var units = 'uk';

            Client.setUnits(units);

            var endPoint = Client.getRequestEndpoint();

            expect(endPoint)
                .to
                .eql('http://magicseaweed.com/api/apikey/forecast?spot_id=1');

            expect(endPoint)
                .to.not
                .eql('http://magicseaweed.com/api/apikey/forecast?spot_id=1&units=' + units);

        });


    });


});