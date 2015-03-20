var ConwayJSApp = (function () {

    var PLAY_INTERVAL = 1000;
    var MIN_CANVAS_WIDTH = 500;
    var MIN_CANVAS_HEIGHT = 300;

    var conway;
    var randomSeed = [1, 0, 0, 0, 0];

    function getWindowSize() {
        return {
            width: window.innerWidth,
            height: window.innerHeight
        };
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

    function getRandomValue() {
        return randomSeed[Math.round(Math.random() * (randomSeed.length - 1))];
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
        render: function () {
            return React.DOM.div({
                    id: 'conwayJS'
                },
                React.DOM.div({
                        id: 'controls'
                    },
                    React.DOM.input({type: 'button', value: 'randomize', onClick: this.randomize}),
                    React.DOM.input({type: 'button', value: 'tick', onClick: this.tick}),
                    React.DOM.input({
                        type: 'button',
                        value: this.state.isPlaying ? 'pause' : 'play',
                        onClick: this.togglePlay
                    }),
                    React.DOM.input({type: 'number', value: this.state.generations, readOnly: true})
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
