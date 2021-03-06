'use strict';

import Chart from 'chart.js';
import rough from 'roughjs';
import roughHelpers from '../helpers/helpers.rough';

var Arc = Chart.elements.Arc;

export default Arc.extend({

	// Ported from Chart.js 2.8.0. Modified for rough arc.
	draw: function() {
		var me = this;
		var vm = me._view;
		var x = vm.x;
		var y = vm.y;
		var outerRadius = vm.outerRadius;
		var innerRadius = vm.innerRadius;
		var sA = vm.startAngle;
		var eA = vm.endAngle;
		var sCos = Math.cos(sA);
		var sSin = Math.sin(sA);
		var eCos = Math.cos(eA);
		var eSin = Math.sin(eA);
		var isLargeArc = eA - sA > Math.PI ? 1 : 0;
		var canvas = rough.canvas(me._chart.canvas);

		var path =
			'M' + (x + outerRadius * sCos) + ' ' + (y + outerRadius * sSin) +
			'A' + outerRadius + ' ' + outerRadius + ' 0 ' + isLargeArc +
			' 1 ' + (x + outerRadius * eCos) + ' ' + (y + outerRadius * eSin) +
			'L' + (x + innerRadius * eCos) + ' ' + (y + innerRadius * eSin) +
			'A' + innerRadius + ' ' + innerRadius + ' 0 ' + isLargeArc +
			' 0 ' + (x + innerRadius * sCos) + ' ' + (y + innerRadius * sSin) + 'Z';

		canvas.path(path, roughHelpers.getFillOptions(vm));

		if (vm.borderWidth) {
			canvas.path(path, roughHelpers.getStrokeOptions(vm));
		}
	}
});
