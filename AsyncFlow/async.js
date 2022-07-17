let myVar1 = null
let myVar2 = null
let myVar3 = null
let myVar4 = null
let myVar5 = null

//mock an exit from your event loop with setTimeout
function callCbServer1(cb) {
    setTimeout(() => {
        cb(undefined, 1)

    }, 3000)
}

function callCbServer2(cb) {
    setTimeout(() => {
        cb(undefined, 2)

    }, 1000)
}

function callCbServer3(cb) {
    setTimeout(() => {
        cb(undefined, 3)

    }, 2000)
}

function callCbServer4(cb) {
    setTimeout(() => {
        cb(undefined, 4)

    }, 1000)
}

function callCbServer5(cb) {
    setTimeout(() => {
        cb(undefined, 5)
    }, 3000)
}

//The classic method of dealing with async flow, callbacks, error first.
callCbServer1(function (error, result1) {
    if (error) {
        console.log("Error:", error)
    } else {
        callCbServer2(function (error, result2) {
            if (error) {
                console.log("Error:", error)
            } else {
                callCbServer3(function (error, result3) {
                    if (error) {
                        console.log("Error:", error)
                    } else {
                        callCbServer4(function (error, result4) {
                            if (error) {
                                console.log("Error:", error)
                            } else {
                                callCbServer5(function (error, result5) {
                                    if (error) {
                                        console.log("Error:", error)
                                    } else {
                                        myVar1 = result1
                                        myVar2 = result2
                                        myVar3 = result3
                                        myVar4 = result4
                                        myVar5 = result5

                                    }
                                })
                            }
                        })
                    }
                })
            }
        })
    }
})

//Wrapping the same function with ES6 Promise
//https://tc39.es/ecma262/multipage/control-abstraction-objects.html#sec-promise-objects

//returned to a variable
const promise1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(1)
    }, 3000)
});

// as a function
function promise2() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(2)
            // return reject("No Server")
        }, 1000)
    });

}

const promise3 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(3)
    }, 1000)
});

const promise4 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(4)
    }, 1000)
});

const promise5 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(5)
    }, 1000)
});

//chain with ES6 .then
//https://tc39.es/ecma262/multipage/control-abstraction-objects.html#sec-promise.prototype.then

promise1.then((result1) => {
    promise2.then((result2) => {
        promise3.then((result3) => {
            promise4.then((result4) => {
                promise5.then((result5) => {
                    result1
                    result2
                    result3
                    result4
                    result5
                })
            })
        })
    })
})

//wrapping with an async function
//https://tc39.es/ecma262/multipage/ecmascript-language-functions-and-classes.html#sec-async-function-definitions

//Asynchronous flow will look like a synchronous flow
async function asyncTest() {
    //wrapping with try and catch scopes will allow you to catch thrown errors and promise rejects easily.
    try {
        //await operator will hold the execution of the async function code.
        //execution will continue with Promise's resolve function returned with a result.
        //https://tc39.es/ecma262/multipage/ecmascript-language-functions-and-classes.html#sec-async-function-definitions

        let result1 = await promise1
        //Synchronous console.log will fired after "promise1" resolved.
        console.log(result1)
        console.log("sync1")
        let result2 = await promise2()
        console.log(result2)
        console.log("sync2")
        let result3 = await promise3
        let result4 = await promise4
        let result5 = await promise5
        console.log()

        //Promise.all method will iterate an array holding promise functions and execute them in order.
        //if all resolved, an array of returned values will returned to the assigned variable.
        const promiseArr = await Promise.all([promise1, promise2(), promise3, promise4, promise5])
        console.log()
    } catch (error) {
        //Caught error block.
        //Execution will reach this scope if one of the promise function above rejected.
        console.log("Caught Error", error)
    }
}

asyncTest()

