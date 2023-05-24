const express = require('express')
const axios=require('axios')
const path=require('path')
const app = express()
const port = process.env.PORT || 8000;
const cors = require('cors');
app.use(cors({
    origin: '*'
}));
app.get('/', (req, res) => {
	res.send('Hello World!')
})

app.get('/station-details',async (req, res) => {
  const [ from, tempTo, tempDate ] = req.query.fromStation.replaceAll(`'`,'').split('?');
  const to = tempTo.split('=')[1]
  const date = tempDate.split('=')[1];
  console.log({from},{to},{date})
  
  // res.json({check:1234})
 //let k= await res.json(`${price()}`)
 await price(from,to,date).then(data=>{
   console.log(data);
   res.json(data);
 }).catch( err =>{ throw Error( `Some Error in fetching data from IRCTC: ${err} `) })
//  await res.json(`${k}`)
})
app.get('/train',async (req, res) => {
	const trainNo = req.query.trainNo
	 // res.json({check:1234})
	//let k= await res.json(`${price()}`)
	await price(trainNo).then(data=>{
		console.log(data);
		res.json(data);
	}).catch( err =>{ throw Error( `Some Error in fetching data from IRCTC: ${err} `) })
 //  await res.json(`${k}`)
 })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})