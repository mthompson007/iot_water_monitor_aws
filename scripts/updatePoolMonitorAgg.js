console.log('Start updatePoolMonitorAgg');

var AWS = require('aws-sdk');
var dynamodb = new AWS.DynamoDB();

exports.handler = function(event, context, callback) {
    var currLastTemp = 0;
    var avgDayTemp = 0;
    var currSerialNumber = "";
    
    console.log('Record json', event.Records);
    event.Records.forEach(function(record) {
        currSerialNumber = record.dynamodb['NewImage']['serialNumber']['S'];
        currLastTemp = record.dynamodb['NewImage']['lastTemp']['N'];
        //var currRowEventDate = record.dynamodb['NewImage']['eventDateTime']['S'];
        
        avgDayTemp += parseInt(currLastTemp);
    }); 
    
    //callback(null, 'Hello from Lambda');
    
    updateAggregateTotals(currSerialNumber, avgDayTemp);
    
    function updateAggregateTotals(serialNumber, avgDayTemp) {             
/*     dynamodb.updateItem({
            'TableName': 'poolmonitoragg',
            'Key': { 'serialNumber' : { 'S': serialNumber }},
            'UpdateExpression': 'set #vote :x',
            'ExpressionAttributeNames': {'#vote' : 'Vote'},
            'ExpressionAttributeValues': { ':x' : { "N" : numVotes.toString() }}, function(err, data) {
            if (err) {
                console.log(err);
                context.fail("Error updating Aggregates table: ", err)
            } else {
                console.log("Recorded update for %s", serialNumber);
                context.succeed("Successfully processed " + event.Records.length + " records.");
            }
        });
*/
    }
    console.log('Finish updatePoolMonitorAgg');
};