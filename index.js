var AsyncArray = (function(){
    function promisify(){
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

    function singleMethodCall(){
        if (this.chains.length === 1) {
            this.chains[0].call();
        }
    }

    function AsyncArray(data) {
        if(!(this instanceof AsyncArray)){
            return new AsyncArray(data);
        }
        this._data = data;
        this.chains = [];
    }

    AsyncArray.prototype.filter = function (fn) {
        promisify.call(this, fn,function (input, values){
            return input.filter(function (value, index){
                return values[index];
            });
        });
        return this;
    };

    AsyncArray.prototype.map = function (fn) {
        promisify.call(this, fn,function(input, values){
            return input.map(function (value, index){
                return values[index];
            });
        });
        return this;
    };

    AsyncArray.prototype.forEach = function (fn) {
        promisify.call(this, fn,function (input){
            return input;
        });
        return this;
    };

    return AsyncArray;
})();