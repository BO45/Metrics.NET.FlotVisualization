﻿(function ($, moment, metrics) {
	'use strict';

	function Meter(name, unit, maxValues) {
		var count = new metrics.ValueSeries(maxValues),
			mean = new metrics.ValueSeries(maxValues),
			rate1 = new metrics.ValueSeries(maxValues),
			rate5 = new metrics.ValueSeries(maxValues),
			rate15 = new metrics.ValueSeries(maxValues);

		this.name = name;
		this.unit = unit;

		this.countChart = new metrics.Chart({
			name: name,
			unit: 'count',
			options: { yaxis: { min: 0 } }
		});

		this.rateChart = new metrics.Chart({
			name: name + ' Rate',
			unit: unit,
			labels: ['Mean', '1 min', '5 min', '15 min'],
			options: { yaxis: { min: 0 } }
		});

		this.update = function (value) {
			count.push(value.Count);
			mean.push(value.MeanRate);
			rate1.push(value.OneMinuteRate);
			rate5.push(value.FiveMinuteRate);
			rate15.push(value.FifteenMinuteRate);

			this.countChart.updateValues(count);
			this.rateChart.updateValues([mean, rate1, rate5, rate15]);
		};

		this.toggle = function (value) {
			this.rateChart.toggle(value);
		};

		this.isVisible = function () {
			return this.rateChart.isVisible() ||
				this.countChart.isVisible();
		};

		this.getCharts = function () {
			return [this.countChart, this.rateChart];
		};
	}

	$.extend(true, this, { metrics: { Meter: Meter } });

}).call(this, this.jQuery, this.moment, this.metrics);