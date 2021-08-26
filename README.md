# Pipeline Method
Object-oriented alternative to the [pipeline operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Pipeline_operator).

## Setup
Add the minified or original script to your project in any convenient way.
The script must be invoked before usages of the method.

## Usage
The script extends standard `Object` prototype with method `pipe`.

There are cases when you have to break your method chain in order to pass the result to a method of other object:
```javascript
    const result = array
        .map(el => { /*code*/ })
        .filter(el => { /*code*/ });
    
    Array.from(new Set(result)) // remove non-unique elements
```

using the **pipeline method** you can continue chaining with a pipeline:
```javascript
    array
        .map(el => { /*code*/ })
        .filter(el => { /*code*/ })
        .pipe(array => new Set(array))
        .pipe(Array.from)
```

## Method description
`Object.pipe(fn, ...args?)`

- **fn** - a `Function` to which target object will be passed as the first argument 
- **args** (optional) - `Array` of arguments which will be passed to the function after the first argument

> Notice, that, unlike the pipeline operator, pipeline method cannot be called on `null` and `undefined` values. <br>
> The reason for this is that these types has no corresponding object wrappers.

## More examples
```javascript
    /* Output element found in array */
    array
        .find(el => el.isToBeFound)
        .pipe(console.log);

    /* Get all links from document */
    document
        .querySelectorAll('a')
        .pipe(Array.from)
        .map(a => a.href);

    /* Create a map from an array */
    array
        .map(el => [el.name, el.value])
        .pipe((pairs) => new Map(pairs))
```
