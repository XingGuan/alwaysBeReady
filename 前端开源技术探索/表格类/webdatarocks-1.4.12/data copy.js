var pivot = new WebDataRocks({
  container: "#wdr-component",
  height: 530,
  toolbar: true,
  report: {
    dataSource: {
      data: getData()
    },
    options: {
      grid: {
        type: "classic"
      }
    },
    "slice": {
      "rows": [
        {
          "uniqueName": "Product Info",
          // "filter":{
            //"members":["Business Type.Specialty Bike Shop"]
            // "type": "top",
            // "quantity": 10,
            // "measure": "Price"
          // },

          "sort": "asc"
        },
        {
          "uniqueName": "Measures"
        }
      ],
      "columns": [
        {
          "uniqueName": "Category",
          "sort": "asc"
        },
        {
          "uniqueName": "Country",
          "sort": "asc"
        }
      ],
      "measures": [
        {
          "uniqueName": "Price",
          "aggregation": "sum"
        }
      ],
      "drills": {
        "drillAll": false,
        "rows": [
          {
            "tuple": [
              "Business Type.Warehouse"
            ]
          }
        ]
      }
    }
  }
});


function getData() {
  return [{
    "Category": {
      type: "level",
      hierarchy: "Product Info",
      parent: "Business Type"
    },
    "Size": { type: "string" },
    "Color": { type: "string" },
    "Destination": { type: "string" },
    "Business Type": {
      type: "level",
      hierarchy: "Product Info"
    },
    "Country": { type: "string" },
    "Price": { type: "number" },
    "Quantity": { type: "number" },
    "Discount": { type: "number" }
  },
  {
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
    "Category": "Accessories",
    "Size": "147 oz",
    "Color": "white",
    "Destination": "France",
    "Business Type": "Specialty Bike Shop",
    "Country": "France",
    "Price": 242,
    "Quantity": 855,
    "Discount": 37
  },
  {
    "Category": "Accessories",
    "Size": "112 oz",
    "Color": "yellow",
    "Destination": "Germany",
    "Business Type": "Specialty Bike Shop",
    "Country": "Germany",
    "Price": 102,
    "Quantity": 897,
    "Discount": 42
  },
  {
    "Category": "Accessories",
    "Size": "256 oz",
    "Color": "red",
    "Destination": "United Kingdom",
    "Business Type": "Specialty Bike Shop",
    "Country": "United Kingdom",
    "Price": 126,
    "Quantity": 115,
    "Discount": 44
  },
  {
    "Category": "Accessories",
    "Size": "278 oz",
    "Color": "yellow",
    "Destination": "United States",
    "Business Type": "Specialty Bike Shop",
    "Country": "United States",
    "Price": 1246,
    "Quantity": 88,
    "Discount": 47
  },
  {
    "Category": "Accessories",
    "Size": "8 oz",
    "Color": "green",
    "Destination": "Australia",
    "Business Type": "Value Added Reseller",
    "Country": "Australia",
    "Price": 680,
    "Quantity": 66,
    "Discount": 80
  },
  {
    "Category": "Accessories",
    "Size": "181 oz",
    "Color": "yellow",
    "Destination": "Canada",
    "Business Type": "Value Added Reseller",
    "Country": "Canada",
    "Price": 1241,
    "Quantity": 939,
    "Discount": 66
  },
  {
    "Category": "Accessories",
    "Size": "181 oz",
    "Color": "yellow",
    "Destination": "Canada",
    "Business Type": "Value Added Reseller",
    "Country": "Canada",
    "Price": 1241,
    "Quantity": 939,
    "Discount": 66
  },
  {
    "Category": "Accessories",
    "Size": "344 oz",
    "Color": "yellow",
    "Destination": "France",
    "Business Type": "Value Added Reseller",
    "Country": "France",
    "Price": 150,
    "Quantity": 67,
    "Discount": 30
  },
  {
    "Category": "Accessories",
    "Size": "291 oz",
    "Color": "red",
    "Destination": "Germany",
    "Business Type": "Value Added Reseller",
    "Country": "Germany",
    "Price": 244,
    "Quantity": 963,
    "Discount": 22
  },
  {
    "Category": "Accessories",
    "Size": "126 oz",
    "Color": "yellow",
    "Destination": "United Kingdom",
    "Business Type": "Value Added Reseller",
    "Country": "United Kingdom",
    "Price": 501,
    "Quantity": 556,
    "Discount": 9
  },
  {
    "Category": "Accessories",
    "Size": "317 oz",
    "Color": "red",
    "Destination": "United States",
    "Business Type": "Value Added Reseller",
    "Country": "United States",
    "Price": 4960,
    "Quantity": 898,
    "Discount": 41
  },
  {
    "Category": "Accessories",
    "Size": "124 oz",
    "Color": "yellow",
    "Destination": "Australia",
    "Business Type": "Warehouse",
    "Country": "Australia",
    "Price": 9,
    "Quantity": 578,
    "Discount": 8
  },
  {
    "Category": "Accessories",
    "Size": "23 oz",
    "Color": "red",
    "Destination": "Canada",
    "Business Type": "Warehouse",
    "Country": "Canada",
    "Price": 3655,
    "Quantity": 64,
    "Discount": 70
  },
  {
    "Category": "Accessories",
    "Size": "124 oz",
    "Color": "green",
    "Destination": "France",
    "Business Type": "Warehouse",
    "Country": "France",
    "Price": 1654,
    "Quantity": 556,
    "Discount": 95
  },
  {
    "Category": "Accessories",
    "Size": "310 oz",
    "Color": "yellow",
    "Destination": "Germany",
    "Business Type": "Warehouse",
    "Country": "Germany",
    "Price": 1190,
    "Quantity": 292,
    "Discount": 36
  },
  {
    "Category": "Accessories",
    "Size": "277 oz",
    "Color": "red",
    "Destination": "United Kingdom",
    "Business Type": "Warehouse",
    "Country": "United Kingdom",
    "Price": 1222,
    "Quantity": 730,
    "Discount": 38
  },
  {
    "Category": "Accessories",
    "Size": "47 oz",
    "Color": "white",
    "Destination": "United States",
    "Business Type": "Warehouse",
    "Country": "United States",
    "Price": 7941,
    "Quantity": 73,
    "Discount": 53
  },
  {
    "Category": "Bikes",
    "Size": "264 oz",
    "Color": "white",
    "Destination": "Australia",
    "Business Type": "Specialty Bike Shop",
    "Country": "Australia",
    "Price": 6829,
    "Quantity": 19,
    "Discount": 56
  },
  {
    "Category": "Bikes",
    "Size": "76 oz",
    "Color": "red",
    "Destination": "Canada",
    "Business Type": "Specialty Bike Shop",
    "Country": "Canada",
    "Price": 1664,
    "Quantity": 19,
    "Discount": 75
  },
  {
    "Category": "Bikes",
    "Size": "217 oz",
    "Color": "red",
    "Destination": "France",
    "Business Type": "Specialty Bike Shop",
    "Country": "France",
    "Price": 2995,
    "Quantity": 98,
    "Discount": 88
  },
  {
    "Category": "Bikes",
    "Size": "251 oz",
    "Color": "green",
    "Destination": "Germany",
    "Business Type": "Specialty Bike Shop",
    "Country": "Germany",
    "Price": 1487,
    "Quantity": 96,
    "Discount": 100
  },
  {
    "Category": "Bikes",
    "Size": "292 oz",
    "Color": "green",
    "Destination": "United Kingdom",
    "Business Type": "Specialty Bike Shop",
    "Country": "United Kingdom",
    "Price": 9245,
    "Quantity": 51,
    "Discount": 29
  },
  {
    "Category": "Bikes",
    "Size": "266 oz",
    "Color": "green",
    "Destination": "United States",
    "Business Type": "Specialty Bike Shop",
    "Country": "United States",
    "Price": 9008,
    "Quantity": 76,
    "Discount": 66
  },
  {
    "Category": "Bikes",
    "Size": "198 oz",
    "Color": "green",
    "Destination": "Australia",
    "Business Type": "Value Added Reseller",
    "Country": "Australia",
    "Price": 9376,
    "Quantity": 92,
    "Discount": 7
  },
  {
    "Category": "Bikes",
    "Size": "109 oz",
    "Color": "red",
    "Destination": "Canada",
    "Business Type": "Value Added Reseller",
    "Country": "Canada",
    "Price": 1531,
    "Quantity": 56,
    "Discount": 31
  },
  {
    "Category": "Bikes",
    "Size": "54 oz",
    "Color": "yellow",
    "Destination": "France",
    "Business Type": "Value Added Reseller",
    "Country": "France",
    "Price": 5421,
    "Quantity": 83,
    "Discount": 22
  },
  {
    "Category": "Bikes",
    "Size": "93 oz",
    "Color": "red",
    "Destination": "Germany",
    "Business Type": "Value Added Reseller",
    "Country": "Germany",
    "Price": 6975,
    "Quantity": 73,
    "Discount": 41
  },
  {
    "Category": "Bikes",
    "Size": "297 oz",
    "Color": "blue",
    "Destination": "United Kingdom",
    "Business Type": "Value Added Reseller",
    "Country": "United Kingdom",
    "Price": 4320,
    "Quantity": 59,
    "Discount": 100
  },
  {
    "Category": "Bikes",
    "Size": "339 oz",
    "Color": "red",
    "Destination": "Australia",
    "Business Type": "Value Added Reseller",
    "Country": "United States",
    "Price": 3200,
    "Quantity": 27,
    "Discount": 41
  },
  {
    "Category": "Bikes",
    "Size": "205 oz",
    "Color": "blue",
    "Destination": "Canada",
    "Business Type": "Warehouse",
    "Country": "Australia",
    "Price": 6688,
    "Quantity": 22,
    "Discount": 41
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
  },
  {
    "Category": "Bikes",
    "Size": "282 oz",
    "Color": "red",
    "Destination": "United Kingdom",
    "Business Type": "Warehouse",
    "Country": "Germany",
    "Price": 6377,
    "Quantity": 28,
    "Discount": 49
  },
  {
    "Category": "Bikes",
    "Size": "286 oz",
    "Color": "blue",
    "Destination": "United States",
    "Business Type": "Warehouse",
    "Country": "United Kingdom",
    "Price": 2471,
    "Quantity": 93,
    "Discount": 14
  },
  {
    "Category": "Bikes",
    "Size": "100 oz",
    "Color": "blue",
    "Destination": "Australia",
    "Business Type": "Warehouse",
    "Country": "United States",
    "Price": 6650,
    "Quantity": 40,
    "Discount": 4
  },
  {
    "Category": "Clothing",
    "Size": "218 oz",
    "Color": "yellow",
    "Destination": "Canada",
    "Business Type": "Specialty Bike Shop",
    "Country": "Australia",
    "Price": 865,
    "Quantity": 4513,
    "Discount": 70
  },
  {
    "Category": "Clothing",
    "Size": "216 oz",
    "Color": "blue",
    "Destination": "France",
    "Business Type": "Specialty Bike Shop",
    "Country": "Canada",
    "Price": 511,
    "Quantity": 4615,
    "Discount": 20
  },
  {
    "Category": "Clothing",
    "Size": "284 oz",
    "Color": "blue",
    "Destination": "Germany",
    "Business Type": "Specialty Bike Shop",
    "Country": "France",
    "Price": 981,
    "Quantity": 1854,
    "Discount": 36
  },
  {
    "Category": "Clothing",
    "Size": "325 oz",
    "Color": "blue",
    "Destination": "United Kingdom",
    "Business Type": "Specialty Bike Shop",
    "Country": "Germany",
    "Price": 57,
    "Quantity": 1187,
    "Discount": 10
  },
  {
    "Category": "Clothing",
    "Size": "192 oz",
    "Color": "white",
    "Destination": "United States",
    "Business Type": "Specialty Bike Shop",
    "Country": "United Kingdom",
    "Price": 675,
    "Quantity": 1527,
    "Discount": 38
  },
  {
    "Category": "Clothing",
    "Size": "25 oz",
    "Color": "purple",
    "Destination": "Australia",
    "Business Type": "Specialty Bike Shop",
    "Country": "United States",
    "Price": 40,
    "Quantity": 4342,
    "Discount": 72
  },
  {
    "Category": "Clothing",
    "Size": "95 oz",
    "Color": "red",
    "Destination": "Canada",
    "Business Type": "Value Added Reseller",
    "Country": "Australia",
    "Price": 400,
    "Quantity": 8975,
    "Discount": 63
  },
  {
    "Category": "Clothing",
    "Size": "39 oz",
    "Color": "purple",
    "Destination": "France",
    "Business Type": "Value Added Reseller",
    "Country": "Canada",
    "Price": 971,
    "Quantity": 3522,
    "Discount": 90
  },
  {
    "Category": "Clothing",
    "Size": "36 oz",
    "Color": "green",
    "Destination": "Germany",
    "Business Type": "Value Added Reseller",
    "Country": "France",
    "Price": 357,
    "Quantity": 3939,
    "Discount": 93
  },
  {
    "Category": "Clothing",
    "Size": "208 oz",
    "Color": "red",
    "Destination": "United Kingdom",
    "Business Type": "Value Added Reseller",
    "Country": "Germany",
    "Price": 820,
    "Quantity": 3560,
    "Discount": 40
  },
  {
    "Category": "Clothing",
    "Size": "3 oz",
    "Color": "white",
    "Destination": "United States",
    "Business Type": "Value Added Reseller",
    "Country": "United Kingdom",
    "Price": 520,
    "Quantity": 3892,
    "Discount": 32
  },
  {
    "Category": "Clothing",
    "Size": "147 oz",
    "Color": "white",
    "Destination": "Australia",
    "Business Type": "Value Added Reseller",
    "Country": "United States",
    "Price": 448,
    "Quantity": 3906,
    "Discount": 24
  },
  {
    "Category": "Clothing",
    "Size": "68 oz",
    "Color": "red",
    "Destination": "United Kingdom",
    "Business Type": "Warehouse",
    "Country": "Australia",
    "Price": 513,
    "Quantity": 9790,
    "Discount": 40
  },
  {
    "Category": "Clothing",
    "Size": "267 oz",
    "Color": "blue",
    "Destination": "United States",
    "Business Type": "Warehouse",
    "Country": "Canada",
    "Price": 977,
    "Quantity": 6107,
    "Discount": 8
  },
  {
    "Category": "Clothing",
    "Size": "33 oz",
    "Color": "green",
    "Destination": "Australia",
    "Business Type": "Warehouse",
    "Country": "France",
    "Price": 118,
    "Quantity": 4718,
    "Discount": 84
  },
  {
    "Category": "Clothing",
    "Size": "319 oz",
    "Color": "blue",
    "Destination": "Canada",
    "Business Type": "Warehouse",
    "Country": "Germany",
    "Price": 161,
    "Quantity": 7988,
    "Discount": 29
  },
  {
    "Category": "Clothing",
    "Size": "326 oz",
    "Color": "green",
    "Destination": "France",
    "Business Type": "Warehouse",
    "Country": "United Kingdom",
    "Price": 239,
    "Quantity": 840,
    "Discount": 89
  },
  {
    "Category": "Clothing",
    "Size": "184 oz",
    "Color": "green",
    "Destination": "Germany",
    "Business Type": "Warehouse",
    "Country": "United States",
    "Price": 327,
    "Quantity": 6574,
    "Discount": 79
  },
  {
    "Category": "Components",
    "Size": "255 oz",
    "Color": "red",
    "Destination": "United Kingdom",
    "Business Type": "Specialty Bike Shop",
    "Country": "Australia",
    "Price": 284,
    "Quantity": 2471,
    "Discount": 42
  },
  {
    "Category": "Components",
    "Size": "144 oz",
    "Color": "green",
    "Destination": "United States",
    "Business Type": "Specialty Bike Shop",
    "Country": "Canada",
    "Price": 827,
    "Quantity": 4772,
    "Discount": 26
  },
  {
    "Category": "Components",
    "Size": "283 oz",
    "Color": "red",
    "Destination": "Australia",
    "Business Type": "Specialty Bike Shop",
    "Country": "France",
    "Price": 967,
    "Quantity": 1646,
    "Discount": 42
  },
  {
    "Category": "Components",
    "Size": "299 oz",
    "Color": "blue",
    "Destination": "United Kingdom",
    "Business Type": "Specialty Bike Shop",
    "Country": "Germany",
    "Price": 569,
    "Quantity": 6568,
    "Discount": 58
  },
  {
    "Category": "Components",
    "Size": "88 oz",
    "Color": "blue",
    "Destination": "United States",
    "Business Type": "Specialty Bike Shop",
    "Country": "United Kingdom",
    "Price": 156,
    "Quantity": 7585,
    "Discount": 35
  },
  {
    "Category": "Components",
    "Size": "161 oz",
    "Color": "red",
    "Destination": "Australia",
    "Business Type": "Specialty Bike Shop",
    "Country": "United States",
    "Price": 845,
    "Quantity": 4208,
    "Discount": 42
  },
  {
    "Category": "Components",
    "Size": "242 oz",
    "Color": "blue",
    "Destination": "Canada",
    "Business Type": "Value Added Reseller",
    "Country": "Australia",
    "Price": 838,
    "Quantity": 6460,
    "Discount": 41
  },
  {
    "Category": "Components",
    "Size": "25 oz",
    "Color": "red",
    "Destination": "France",
    "Business Type": "Value Added Reseller",
    "Country": "Canada",
    "Price": 51,
    "Quantity": 410,
    "Discount": 97
  },
  {
    "Category": "Components",
    "Size": "317 oz",
    "Color": "blue",
    "Destination": "Germany",
    "Business Type": "Value Added Reseller",
    "Country": "France",
    "Price": 95,
    "Quantity": 2307,
    "Discount": 64
  },
  {
    "Category": "Components",
    "Size": "295 oz",
    "Color": "red",
    "Destination": "France",
    "Business Type": "Value Added Reseller",
    "Country": "Germany",
    "Price": 885,
    "Quantity": 6843,
    "Discount": 10
  },
  {
    "Category": "Components",
    "Size": "69 oz",
    "Color": "blue",
    "Destination": "Germany",
    "Business Type": "Value Added Reseller",
    "Country": "United Kingdom",
    "Price": 239,
    "Quantity": 7541,
    "Discount": 36
  }]
}
