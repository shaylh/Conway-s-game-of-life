var ConwayJSApp = (function () {

    var PLAY_INTERVAL = 1000;
    var MIN_CANVAS_WIDTH = 500;
    var MIN_CANVAS_HEIGHT = 300;

    var conway;
    var randomSeed20 = [1, 0, 0, 0, 0];
    var randomSeed50 = [1, 0];

    function getWindowSize() {
        return {
            width: window.innerWidth,
            height: window.innerHeight
        };
    }

    function addRandomPattern(conway, canvasSize) {
        var row = Math.round(Math.random() * ~~(canvasSize.height / 10));
        var col = Math.round(Math.random() * ~~(canvasSize.width / 10));
        conway.setCellValue(row - 1, col - 1, getRandomValue(randomSeed50));
        conway.setCellValue(row - 1, col, getRandomValue(randomSeed50));
        conway.setCellValue(row - 1, col + 1, getRandomValue(randomSeed50));
        conway.setCellValue(row, col - 1, getRandomValue(randomSeed50));
        conway.setCellValue(row, col, getRandomValue(randomSeed50));
        conway.setCellValue(row, col + 1, getRandomValue(randomSeed50));
        conway.setCellValue(row + 1, col - 1, getRandomValue(randomSeed50));
        conway.setCellValue(row + 1, col, getRandomValue(randomSeed50));
        conway.setCellValue(row + 1, col + 1, getRandomValue(randomSeed50));
    }

    function drawBoard(ctx, board) {
        var size = 10;
        var rows = board.length;
        var cols = board[0].length;
        for (var row = 0; row < rows; row++) {
            for (var col = 0; col < cols; col++) {
                if (board[row][col] === 1) {
                    ctx.fillRect(col * size + 1, row * size + 1, size - 1, size - 1);
                } else {
                    ctx.clearRect(col * size + 1, row * size + 1, size - 1, size - 1);
                }
            }
        }
    }

    function drawGrid(ctx, canvasSize) {
        var cols = ~~(canvasSize.width / 10);
        var rows = ~~(canvasSize.height / 10);
        ctx.fillStyle = '#3061a3';
        ctx.strokeStyle = '#aaa';
        for (var row = 0; row < rows; row++) {
            ctx.beginPath();
            ctx.moveTo(0, row * 10);
            ctx.lineTo(canvasSize.width, row * 10);
            ctx.stroke();
        }
        for (var col = 0; col < cols; col++) {
            ctx.beginPath();
            ctx.moveTo(col * 10, 0);
            ctx.lineTo(col * 10, canvasSize.height);
            ctx.stroke();
        }
    }

    function getRandomValue(randomSeed) {
        var seed = _.isArray(randomSeed) ? randomSeed : randomSeed20;
        return seed[Math.round(Math.random() * (seed.length - 1))];
    }

    function getRandomPattern(canvasSize) {
        var cols = ~~(canvasSize.width / 10);
        var rows = ~~(canvasSize.height / 10);
        return _.times(rows, _.times.bind(null, cols, getRandomValue));
    }

    return React.createClass({
        displayName: 'ConwayJS',
        getInitialState: function () {
            return {
                size: getWindowSize(),
                generations: 0,
                isPlaying: false
            };
        },
        updateWindowSize: function () {
            this.setState({size: getWindowSize()});
        },
        componentDidMount: function () {
            var ctx = this.refs.canvas.getDOMNode().getContext('2d');
            drawGrid(ctx, this.getCanvasSize());
            window.addEventListener('resize', this.updateWindowSize);
            this.randomize();
        },
        componentWillUnmount: function () {
            window.removeEventListener('resize', this.updateWindowSize);
        },
        componentDidUpdate: function () {
            var ctx = this.refs.canvas.getDOMNode().getContext('2d');
            drawGrid(ctx, this.getCanvasSize());
            drawBoard(ctx, conway.getBoard());
        },
        randomize: function () {
            conway = new ConwayJS(getRandomPattern(this.getCanvasSize()));
            this.drawBoard();
        },
        tick: function () {
            conway.tick();
            this.drawBoard();
        },
        drawBoard: function () {
            var ctx = this.refs.canvas.getDOMNode().getContext('2d');
            this.setState({generations: conway.getGenerations()});
            drawBoard(ctx, conway.getBoard());
        },
        getCanvasSize: function () {
            return {
                width: ~~(Math.max(this.state.size.width - 100, MIN_CANVAS_WIDTH) / 10) * 10,
                height: ~~(Math.max(this.state.size.height - 100, MIN_CANVAS_HEIGHT) / 10) * 10
            }
        },
        togglePlay: function () {
            if (this.state.isPlaying) {
                window.clearInterval(this.playInterval);
                this.setState({isPlaying: false});
            } else {
                this.tick();
                this.playInterval = window.setInterval(this.tick, PLAY_INTERVAL);
                this.setState({isPlaying: true});
            }
        },
        addRandomPattern: function () {
            addRandomPattern(conway, this.getCanvasSize());
            this.drawBoard();
        },
        resetBoard: function(){
            conway.resetBoard();
            this.drawBoard();
        },
        render: function () {
            return React.DOM.div({
                    id: 'conwayJS'
                },
                React.DOM.div({
                        id: 'controls'
                    },
                    React.DOM.div({className: 'inline board'},
                        React.DOM.input({type: 'button', value: 'random board', onClick: this.randomize}),
                        React.DOM.input({type: 'button', value: 'random life form', onClick: this.addRandomPattern}),
                        React.DOM.input({type: 'button', value: 'reset', onClick: this.resetBoard})
                    ),
                    React.DOM.div({className: 'inline timeline'},
                        React.DOM.input({type: 'button', value: 'tick', onClick: this.tick}),
                        React.DOM.input({
                            type: 'button',
                            value: this.state.isPlaying ? 'pause' : 'play',
                            onClick: this.togglePlay
                        }),
                        React.DOM.span({className: 'input'}, this.state.generations)
                    )
                ),
                React.DOM.canvas(_.assign({
                        ref: 'canvas',
                        id: 'canvas'
                    },
                    this.getCanvasSize()
                ))
            );
        }
    });

})();
