define([], function(){
   'use strict';

    describe('ConwayJS', function () {

        var conway;

        describe('Initial Pattern', function () {

            it('should create board with initial pattern', function () {
                conway = new ConwayJS([[0, 0, 0], [0, 1, 0], [0, 0, 0]]);
                expect(conway.getBoard()).toEqual([[0, 0, 0], [0, 1, 0], [0, 0, 0]]);
            });

        });

        describe('Any live cell with fewer than two live neighbours dies, as if caused by under-population', function () {

            it('zero neighbors', function () {
                conway = new ConwayJS([[0, 0, 0], [0, 1, 0], [0, 0, 0]]);
                conway.tick();
                expect(conway.getBoard()).toEqual([[0, 0, 0], [0, 0, 0], [0, 0, 0]]);
            });

            it('one neighbor', function () {
                conway = new ConwayJS([[0, 0, 0], [1, 1, 0], [0, 0, 0]]);
                conway.tick();
                expect(conway.getBoard()).toEqual([[0, 0, 0], [0, 0, 0], [0, 0, 0]]);
            });

        });

        describe('Any live cell with two or three live neighbours lives on to the next generation', function () {

            it('two neighbors', function () {
                conway = new ConwayJS([[0, 0, 1], [1, 1, 0], [0, 0, 0]]);
                conway.tick();
                expect(conway.getBoard()).toEqual([[0, 1, 0], [0, 1, 0], [0, 0, 0]]);
            });

            it('three neighbors', function () {
                conway = new ConwayJS([[0, 0, 1], [1, 1, 0], [0, 1, 0]]);
                conway.tick();
                expect(conway.getBoard()).toEqual([[0, 1, 0], [1, 1, 1], [1, 1, 0]]);
            });

        });

        describe('Any live cell with more than three live neighbours dies, as if by overcrowding', function(){

            it('four neighbors', function(){
                conway = new ConwayJS([[0, 0, 1], [1, 1, 1], [0, 1, 0]]);
                conway.tick();
                expect(conway.getBoard()).toEqual([[0, 0, 1], [1, 0, 1], [1, 1, 1]]);
            });

            it('five neighbors', function(){
                conway = new ConwayJS([[0, 1, 1], [1, 1, 1], [0, 1, 0]]);
                conway.tick();
                expect(conway.getBoard()).toEqual([[1, 0, 1], [1, 0, 0], [1, 1, 1]]);
            });

        });

        describe('Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction', function(){

            it('three neighbors', function(){
                conway = new ConwayJS([[0, 0, 1], [1, 1, 0], [0, 1, 0]]);
                conway.tick();
                expect(conway.getBoard()).toEqual([[0, 1, 0], [1, 1, 1], [1, 1, 0]]);
            });

        });

    });
});