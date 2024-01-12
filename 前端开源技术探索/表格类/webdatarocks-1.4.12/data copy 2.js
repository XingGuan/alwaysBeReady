var jsonData = [{
  "Category": "Accessories",
  "Size": "262 oz",
  "Color": "red",
  "Destination": "Australia",
  "Business Type": "Specialty Bike Shop",
  "Country": "Australia",
  "Price": 174,
  "Quantity": 225,
  "Discount": 23
},
{
  "Category": "Accessories",
  "Size": "214 oz",
  "Color": "yellow",
  "Destination": "Canada",
  "Business Type": "Specialty Bike Shop",
  "Country": "Canada",
  "Price": 502,
  "Quantity": 90,
  "Discount": 17
},
{
  "Category": "Bikes",
  "Size": "226 oz",
  "Color": "blue",
  "Destination": "France",
  "Business Type": "Warehouse",
  "Country": "Canada",
  "Price": 699,
  "Quantity": 22,
  "Discount": 42
},
{
  "Category": "Bikes",
  "Size": "311 oz",
  "Color": "purple",
  "Destination": "Germany",
  "Business Type": "Warehouse",
  "Country": "France",
  "Price": 5403,
  "Quantity": 75,
  "Discount": 70
}]

var pivot = new WebDataRocks({
  container: "wdr-component",
  width: "100%",
  height: 430,
  toolbar: true,
  report: {
  "dataSource": {
      "data": jsonData
  },
  "slice": {
  }
}
});

