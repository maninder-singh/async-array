# async-array

A utility for managing array operation on asynchronous data.
`filter`,`map` and `forEach` implementation of `Array` to work like a synchronous wise.

### Import 
script tag to load file in browser
```
<script
  src="./async-array.js"
  type="application/javascript"
  crossorigin="anonymous"></script>
```

### Examples 
```
new AsyncArray([1, 2, 3, 4, 5])
    .forEach(num => {
        return delay().then(() => {
            console.log(`first => ${num}`);
        })
    })
    .filter(num => {
        return delay().then(() => {
            return num >= 3;
        })
    })
    .forEach(num => {
        return delay().then(() => {
            console.log(`second => ${num}`);
        })
    })
    .filter(num => {
        return delay().then(() => {
            return num >= 4;
        })
    })
    .map(num => {
        return delay().then(() => {
            return num + 2;
        })
    })
    .forEach(num => {
        return delay().then(() => {
            console.log(`third => ${num}`);
        })
    })
    .forEach(num => {
        return delay().then(() => {
            console.log(`fourth => ${num}`);
        })
    });

function delay(ms = 200) {
    return new Promise(function(resolve){
        setTimeout(resolve, ms);
    });
}

// Output 

first => 1
first => 2
first => 3
first => 4
first => 5
second => 3
second => 4
second => 5
third => 6
third => 7
fourth => 6
fourth => 7

```