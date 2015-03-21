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

        describe('Board manipulations', function(){

            it('should set a cell value at the correct coordinates', function(){
                conway = new ConwayJS([[0, 0, 0], [0, 0, 0], [0, 0, 0]]);
                conway.setCellValue(2, 1, 1);
                expect(conway.getBoard()).toEqual([[0, 0, 0], [0, 0, 0], [0, 1, 0]]);
            });

            it('should ignore if setting value to a cell that does not exist', function(){
                conway = new ConwayJS([[0, 0, 0], [0, 0, 0], [0, 0, 0]]);
                conway.setCellValue(10, 1, 1);
                conway.setCellValue(1, 10, 1);
                expect(conway.getBoard()).toEqual([[0, 0, 0], [0, 0, 0], [0, 0, 0]]);
            });

            it('should reset board', function(){
                conway = new ConwayJS([[1, 1, 1], [1, 1, 1], [1, 1, 1]]);
                conway.tick();
                expect(conway.getGenerations()).toBe(1);
                conway.resetBoard();
                expect(conway.getGenerations()).toBe(0);
                expect(conway.getBoard()).toEqual([[0, 0, 0], [0, 0, 0], [0, 0, 0]]);
            });

        });

    });
});