var ConwayJSApp = (function () {

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
                    ctx.fillRect(row * size + 1, col * size + 1, size - 1, size - 1);
                } else {
                    ctx.clearRect(row * size + 1, col * size + 1, size - 1, size - 1);
                }
            }
        }
    }

    function drawGrid(ctx, width, height) {
        var cols = ~~(width / 10);
        var rows = ~~(height / 10);
        ctx.fillStyle = '#3061a3';
        ctx.strokeStyle = '#aaa';
        for (var row = 0; row < rows; row++) {
            ctx.beginPath();
            ctx.moveTo(0, row * 10);
            ctx.lineTo(width, row * 10);
            ctx.stroke();
        }
        for (var col = 0; col < cols; col++) {
            ctx.beginPath();
            ctx.moveTo(col * 10, 0);
            ctx.lineTo(col * 10, height);
            ctx.stroke();
        }
    }

    function getRandomValue() {
        return randomSeed[Math.round(Math.random() * (randomSeed.length - 1))];
    }

    function getRandomPattern(width, height) {
        var cols = ~~(width / 10);
        var rows = ~~(height / 10);
        var pattern = new Array(rows);
        for (var row = 0; row < rows; row++) {
            pattern[row] = [];
            for (var col = 0; col < cols; col++) {
                pattern[row].push(getRandomValue());
            }
        }
        return pattern;g
    }

    return React.createClass({
        displayName: 'ConwayJS',
        getInitialState: function () {
            return {
                size: getWindowSize(),
                generations: 0
            };
        },
        updateWindowSize: function () {
            this.setState({size: getWindowSize()});
        },
        componentDidMount: function () {
            var ctx = this.refs.canvas.getDOMNode().getContext('2d');
            drawGrid(ctx, this.state.size.width, this.state.size.height);
            window.addEventListener('resize', this.updateWindowSize);
            this.randomize();
        },
        componentWillUnmount: function () {
            window.removeEventListener('resize', this.updateWindowSize);
        },
        componentWillUpdate: function () {
            var ctx = this.refs.canvas.getDOMNode().getContext('2d');
            drawGrid(ctx, this.state.size.width, this.state.size.height);
        },
        randomize: function () {
            conway = new ConwayJS(getRandomPattern(this.state.size.width, this.state.size.height));
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
        render: function () {
            return React.DOM.div({
                    id: 'conwayJS'
                },
                React.DOM.div({
                        id: 'controls'
                    },
                    React.DOM.input({type: 'button', value: 'randomize', onClick: this.randomize}),
                    React.DOM.input({type: 'button', value: 'tick', onClick: this.tick}),
                    React.DOM.input({type: 'number', value: this.state.generations, readOnly: true})
                ),
                React.DOM.canvas({
                    ref: 'canvas',
                    id: 'canvas',
                    width: this.state.size.width - 100,
                    height: this.state.size.height - 100
                })
            );
        }
    });

})();
