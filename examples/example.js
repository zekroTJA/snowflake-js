const Snowflake = require('../snowflake');

// Create a node in which snowflakes will be counted
// up in steps if they get generated in the same
// millisecond.
var node1 = new Snowflake.Node(1);

// Get next snowflake. This will be returned as
// BigInteger.
console.log(node1.next());