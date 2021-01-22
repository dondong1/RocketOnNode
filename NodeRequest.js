const express = require('express')
const app = express()
const port = 3000


app.post('quote.js', function (req, res) {
let amountRecommended = parseFloat(req.body.recommended};
let Cost = parseFloat(req.body.unitCost);
let costBasedOnQuantity = amountRecommended * Cost;
res.send(costBasedOnQuantityInput.toString());

app.post('quote.js', function (req, res) {
let amountRecommended = parseFloat(req.body.recommended);
let Cost =parseFloat(req.body.unitCost);
let Fee = parseFloat(req.body.installationCost);
let installationCostInput = amountRecommended * Cost * Fee;
res.send(installationCostInput.toString());

app.post('quote.js', function (req, res) {
let amountRecommended = parseFloat(req.body.recommended);
let Cost = parseFloat(req.body.unitCost);
let Fee = pareseFloat(req.body.installationCost);
let finalPaymentOutputSpan = amountRecommended * Cost  + (amountRecommended * Cost * Fee);
res.send(installationCostInput.toString());

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})