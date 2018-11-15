const Snowflake = require('../snowflake');
var Assert = require('chai').assert;


var node;

describe('Create Node', () => {
    
    describe('With default node number 0', () => {
        it('Node != null', () => {
            node = new Snowflake.Node();
            Assert.isNotNull(node);
        });
        it ('Node value = 0', () => {
            Assert.equal(
                Snowflake.getNode(node.next()), 
                0
            );
        });
    });

    describe('With custom node number 512', () => {
        it('Node != null', () => {
            node = new Snowflake.Node(512);
            Assert.isNotNull(node);
        });
        it ('Node value = 512', () => {
            Assert.equal(
                Snowflake.getNode(node.next()), 
                512
            );
        });
    });
});

describe('Create Snowflake', () => {

    var snowflake;
    var createdAt;

    it('snowflake > 0 and not null', () => {
        createdAt = Date.now();
        snowflake = node.next();
        Assert.isAbove(parseInt(snowflake), 0);
    });

    it('snowflake timetsamp equals created time +- 1ms', () => {
        Assert.isBelow(
            Math.abs(createdAt - Snowflake.getTimestamp(snowflake)),
            2
        );
    });

    it('node = 512', () => {
        Assert.equal(
            Snowflake.getNode(snowflake), 
            512
        );
    });

    it('step = 0', () => {
        Assert.equal(
            Snowflake.getStep(snowflake), 
            0
        );
    });

});

describe('Create multiple Snowflake\'s', () => {

    var lastSnowflake;

    it('Create 500 and check last step > 1', () => {
        for (var i = 0; i < 500; i++) {
            lastSnowflake = node.next();
        }
        Assert.isAbove(
            Snowflake.getStep(lastSnowflake),
            1
        );
    });
    it('node is still 512', () => {
        Assert.equal(
            Snowflake.getNode(lastSnowflake),
            512
        );
    });

});