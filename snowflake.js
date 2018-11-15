// Epoch defaultly set to creation of this class
// (Tue Oct 23 2018 06:27:17 UTC)
const defEpoch = BigInt(1540276037951);

const nodeBits = BigInt(10);
const stepBits = BigInt(12);

const nodeMax = BigInt(BigInt(-1) ^ (BigInt(-1) << nodeBits));
const nodeMask = BigInt(nodeMax << stepBits);
const stepMask = BigInt(BigInt(-1) ^ (BigInt(-1) << stepBits));

const timeShift = nodeBits + stepBits;
const nodeShift = stepBits;

var epoch = defEpoch;

/**
 * Node collection of Snowflakes.
 */
class Node {
    /**
     * Create instance of Node.
     * @param {number} n Number of node 
     */
    constructor(n) {
        n = parseInt(n);
        if (!n || isNaN(n)) {
            n = BigInt(0);
        } else {
            n = BigInt(n);
        }
        if (n < 0 || n > nodeMax) {
            throw 'Node must be between 0 and ' + nodeMax;
        }
        this.time = BigInt(0);
        this.step = BigInt(0);
        this.n = n;
    }

    /**
     * Generate Snowflake.
     * @returns {BigInteger} Snowflake
     */
    next() {
        let now = BigInt(Date.now());

        if (this.time == now) {
            this.step = (this.step + BigInt(1)) & stepMask;
            if (this.step == 0) {
                while (now <= this.time) {
                    now = BigInt(Date.now());
                }
            }
        } else {
            this.step = BigInt(0);
        }

        this.time = now;

        return (
            ((now - epoch) << timeShift) |
            (this.n << nodeShift) |
            (this.step)
        );
    }
}

/**
 * Set the epoch where the snowflakes time count will strat from.
 * @param {Date|number} date Epoche starting time counting from. 
 */
function setEpoch(date) {
    if (!date) {
        epoch = BigInt(Date.now());
    } else if (date instanceof Date) {
        epoch = BigInt(date.getTime());
    } else {
        epoch = BigInt(date);
    }
}

/**
 * Get UNIX timestamp when snowflake was created.
 * @param {number} snowflake Snowflake
 * @param {Date|number} customEpoch Custom epoche date or number
 * @returns {number} UNIX timestamp
 */
function getTimestamp(snowflake, customEpoch) {
    if (customEpoch && customEpoch instanceof Date) {
        customEpoch = customEpoch.getTime();
    }
    customEpoch = customEpoch ? BigInt(customEpoch) : BigInt(epoch);
    return parseInt(customEpoch + (BigInt(snowflake) >> timeShift));
}

/**
 * Get node from which snowflake was created with.
 * @param {number} snowflake Snowflake
 * @returns {number} Number of node 
 */
function getNode(snowflake) {
    return parseInt((BigInt(snowflake) & nodeMask) >> nodeShift);
}

/**
 * Get number of step which was passed in the same millisecond
 * in the node instance while Snowflake was created.
 * @param {number} snowflake Snowflake
 * @returns {number} Number of step
 */
function getStep(snowflake) {
    return parseInt(BigInt(snowflake) & stepMask);
}


module.exports = {
    setEpoch,
    getTimestamp,
    getNode,
    getStep,
    Node
}