/**
 * MIT License
 *
 * Copyright (c) 2021 Alexey Tushinski
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

(() => {
    const methodName = 'pipe';

    requirePropertyNotDefined(Object, methodName);
    defineMethod(Object, methodName, objectMethod);

    [Number, String, Symbol, Boolean]
        .forEach(classObj => {
            requirePropertyNotDefined(classObj, methodName);
            defineMethod(classObj, methodName, primitiveMethod);
        });

    function requirePropertyNotDefined(classObj, propName) {
        if (classObj.prototype.hasOwnProperty(propName)) {
            throw new Error(`Cannot define method '${propName}' on Object prototype. The method is already defined.`);
        }
    }

    function defineMethod(classObj, methodName, methodFunction) {
        Object.defineProperty(classObj.prototype, methodName, {
            value: methodFunction,
            writable: false,
            configurable: false
        });
    }

    function objectMethod(cb, ...additionalArgs) {
        return cb(this, ...additionalArgs);
    }

    function primitiveMethod(cb, ...additionalArgs) {
        return cb(this.valueOf(), ...additionalArgs);
    }
})();