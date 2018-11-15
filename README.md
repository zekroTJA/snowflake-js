<div align="center">
     <h1>~ snowflake-js ~</h1>
     <strong>A twitter like snowflake adaption to create unique, time stamp based IDs for node.js</strong><br>
     <i>This package is strongly inspired by <a href="https://github.com/bwmarrin/snowflake">bwmarrin/snowflake</a></i>
</div>

---

## ATTENTION!

This package is only working with **Node.js 10.13.0 and higher**!

---

## Usage

```js
const Snowflake = require('../snowflake');

// Create a node in which snowflakes will be counted
// up in steps if they get generated in the same
// millisecond.
var node1 = new Snowflake.Node(1);

// Get next snowflake. This will be returned as
// BigInteger.
console.log(node1.next());
```