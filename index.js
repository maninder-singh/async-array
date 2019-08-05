(function () {
    function promisify() {
        function promise(fn, method) {
            new Promise((resolve, reject) => {
                Promise.all(this._data.map(fn)).then(values => {
                    this._data = method(this._data, values);
                    this.chains.shift();
                    if (this.chains.length > 0) {
                        this.chains[0].call();
                    }
                    resolve([]);
                }).catch(error => {
                    resolve([]);
                });
            });
        }

        this.chains.push(promise.bind(this, ...arguments));
        singleMethodCall.call(this);
    }

    function singleMethodCall() {
        if (this.chains.length === 1) {
            this.chains[0].call();
        }
    }

    function AsyncArray(data) {
        this._data = data;
        this.chains = [];
    }

    AsyncArray.prototype.filter = function (fn) {
        promisify.call(this, fn, (input, values) => {
            return input.filter((value, index) => {
                return values[index];
            });
        });
        return this;
    };

    AsyncArray.prototype.map = function (fn) {
        promisify.call(this, fn, (input, values) => {
            return input.map((value, index) => {
                return values[index];
            });
        });
        return this;
    };

    AsyncArray.prototype.each = function (fn) {
        promisify.call(this, fn, (input) => {
            return input;
        });
        return this;
    };
    window.AsyncArray = AsyncArray;

    // example
    new AsyncArray([1, 2, 3, 4, 5]).each(num => {
        return delay().then(() => {
            console.log(`first => ${num}`);
        })
    })
        .filter(num => {
            return delay().then(() => {
                return num >= 3;
            })
        }).each(num => {
        return delay().then(() => {
            console.log(`second => ${num}`);
        })
    }).filter(num => {
        return delay().then(() => {
            return num >= 4;
        })
    })
        .map(num => {
            return delay().then(() => {
                return num + 2;
            })
        }).each(num => {
        return delay().then(() => {
            console.log(`fifth => ${num}`);
        })
    }).each(num => {
        return delay().then(() => {
            console.log(`sixth => ${num}`);
        })
    });

    function delay(ms = 200) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
})();