// domain/.netlify/functions/hello

exports.handler = async function(even, context){
 return {
  statusCode: 200,
  body: 'Hello World'
 }
}