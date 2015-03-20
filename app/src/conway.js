var ConwayJS = (function () {

    var ConwayJSClass = function (pattern) {
        this.pattern = pattern;
        this.generations = 0;
    };

    function getNextCellValue(pattern, row, col) {
        var neighbors = getNeighborsCount(pattern, row, col);

        if (pattern[row][col] === 1) {
            if (neighbors < 2 || neighbors > 3) {
                return 0;
            }
            return 1;
        } else if (neighbors === 3) {
            return 1;
        }

        return 0;
    }

    function getNeighborsCount(pattern, row, col) {
        var neighbors = 0;
        neighbors += getCellValue(pattern, row - 1, col - 1);//NW
        neighbors += getCellValue(pattern, row - 1, col);//N
        neighbors += getCellValue(pattern, row - 1, col + 1);//NE
        neighbors += getCellValue(pattern, row, col - 1);//W
        neighbors += getCellValue(pattern, row, col + 1);//E
        neighbors += getCellValue(pattern, row + 1, col - 1);//SW
        neighbors += getCellValue(pattern, row + 1, col);//S
        neighbors += getCellValue(pattern, row + 1, col + 1);//SE
        return neighbors;
    }

    function getCellValue(pattern, row, col) {
        return ((pattern[row] || [])[col] || 0);
    }

    function getBlankPattern(pattern) {
        var rows = pattern.length;
        var cols = pattern[0].length;
        var blankPattern = new Array(rows);

        for (var row = 0; row < rows; row++) {
            blankPattern[row] = new Array(cols);
        }

        return blankPattern;
    }

    ConwayJSClass.prototype = {
        tick: function () {
            var currentPattern = this.pattern;
            var nextPattern = getBlankPattern(currentPattern);
            var rows = currentPattern.length;
            var cols = currentPattern[0].length;
            for (var row = 0; row < rows; row++) {
                for (var col = 0; col < cols; col++) {
                    nextPattern[row][col] = getNextCellValue(currentPattern, row, col);
                }
            }
            this.pattern = nextPattern;
            return ++this.generations;
        },
        getGenerations: function(){
            return this.generations;
        },
        getBoard: function () {
            return this.pattern;
        }
    };

    return ConwayJSClass;
})();
