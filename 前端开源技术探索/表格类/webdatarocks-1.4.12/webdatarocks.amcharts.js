/**
 * WebDataRocks Reporting v1.4.12 (https://www.webdatarocks.com/)
 * Copyright © 2023 WebDataRocks. All rights reserved.
 *
 * By downloading, installing and/or using WebDataRocks you agree with the terms of
 * WebDataRocks End User License Agreement, a copy of which is located at: https://www.webdatarocks.com/license-agreement/.
 */
(function () {
	var WebDataRocksAmcharts = {};
	window["WebDataRocksAmcharts"] = WebDataRocksAmcharts;

	WebDataRocksAmcharts.getData = function (options, callbackHandler, updateHandler) {
		//define slice to select the data you would like to show (different from data that webdatarocks instance is showing)
		//leave it undefined to get the data that webdatarocks instance is showing
		var slice = options.slice;

		//please use prepareDataFunction if you need to prepare the data another way
		var _prepareDataFunction = options.prepareDataFunction;

		var _updateHandler;
		if (updateHandler != null) {
			_updateHandler = function (data) {
				if (_prepareDataFunction != undefined) {
					updateHandler(_prepareDataFunction(data), data);
				} else {
					updateHandler(prepareData(data), data);
				}
			};
		}

		this.instance.getData({
			slice: slice
		}, function (data) {
			if (_prepareDataFunction != undefined) {
				callbackHandler(_prepareDataFunction(data), data);
			} else {
				callbackHandler(prepareData(data), data);
			}
		}, _updateHandler
		);
	}

	WebDataRocksAmcharts.getNumberFormatPattern = function (format) {
		var str = "###";
		if (format == null) return str;
		var thousandsSeparator = (format["thousandsSeparator"] != undefined && format["thousandsSeparator"] != "");
		if (thousandsSeparator) {
			str = "#," + str;
		}
		var maxDecimalPlaces = (format["maxDecimalPlaces"] != undefined && format["maxDecimalPlaces"] > 0);
		var decimalPlaces = (format["decimalPlaces"] != undefined && format["decimalPlaces"] > 0);
		if (decimalPlaces) {
			str = str + ".";
			var numberOfDecimals = (maxDecimalPlaces && format["maxDecimalPlaces"] < format["decimalPlaces"]) ? format["maxDecimalPlaces"] : format["decimalPlaces"];
			for (var i = 0; i < numberOfDecimals; i++) {
				str = str + "0";
			}
		} else if (maxDecimalPlaces) {
			str = str + ".";
			for (var i = 0; i < format["maxDecimalPlaces"]; i++) {
				str = str + "#";
			}
		}
		if (format["isPercent"] == true) {
			str = str + "%";
		} else if (format["currencySymbol"] != undefined && format["currencySymbol"] != "") {
			str = (format["currencySymbolAlign"] == "left" || (format["isPercent"] == true && format["currencySymbol"] == "%"))
				? format["currencySymbol"] + str
				: str + format["currencySymbol"];
		}
		return str;
	}

	WebDataRocksAmcharts.getCategoryName = function (rawData) {
		var categoryName;
		if (rawData.meta && rawData.meta["rAmount"] > 0) {
			categoryName = rawData.meta["r0Name"];
		} else if (rawData.meta && rawData.meta["cAmount"] > 0) {
			categoryName = rawData.meta["c0Name"];
		}
		return categoryName;
	}

	WebDataRocksAmcharts.getMeasureNameByIndex = function (rawData, measureIndex) {
		return (rawData.meta && rawData.meta["vAmount"] > 0) ? rawData.meta["v" + measureIndex + "Name"] : undefined;
	}

	WebDataRocksAmcharts.getNumberOfMeasures = function (rawData) {
		return (rawData.meta) ? rawData.meta["vAmount"] : undefined;
	}

	function prepareData(data) {
		var output = {};
		output.options = prepareChartInfo(data);
		prepareSeries(output, data);
		return output;
	}

	function prepareChartInfo(data) {
		var output = {
			title: (data.meta && data.meta.caption) ? data.meta.caption : ""
		};
		return output;
	}

	function prepareSeries(output, data) {
		var records = [];
		var basedOnRows = false;
		var basedOnColumns = false;
		for (var i = 0; i < data.data.length; i++) {
			if (i == 0) {
				var headerRow = {};
				if (data.meta["rAmount"] > 0) {
					headerRow["r0Name"] = data.meta["r0Name"];
					basedOnRows = true;
				} else if (data.meta["cAmount"] > 0) {
					headerRow["c0Name"] = data.meta["c0Name"];
					basedOnColumns = true;
				}
				for (var j = 0; j < data.meta["vAmount"]; j++) {
					headerRow["v" + j + "Name"] = data.meta["v" + j + "Name"];
				}
			}
			var record = data.data[i];
			var recordIsNotAFact = false;
			var _record = {};
			if (basedOnRows) {
				if (record["r0"] == undefined || record["r1"] != undefined || record["c0"] != undefined || record["v0"] == undefined) continue;
				_record[headerRow["r0Name"]] = record["r0"];
			}
			if (basedOnColumns) {
				if (record["c0"] == undefined || record["c1"] != undefined || record["r0"] != undefined || record["v0"] == undefined) continue;
				_record[headerRow["c0Name"]] = record["c0"];
			}
			for (var j = 0; j < data.meta["vAmount"]; j++) {
				if (record["v" + j] == undefined) {
					recordIsNotAFact = true;
					continue;
				}
				_record[headerRow["v" + j + "Name"]] = !isNaN(record["v" + j]) ? record["v" + j] : 0;
			}
			if (recordIsNotAFact) continue;
			records.push(_record);
		}
		output.data = records;
	}

})();
