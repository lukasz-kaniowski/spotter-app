'use strict';

angular.module('SpotterApp').factory('helperService', function() {
	var isDom = function(element) {
		return !!element && typeof element === 'object' && 'getBoundingClientRect' in element;
	};

	return {
		reattachMap : function(map, div) {
			if (!isDom(div)) {
				console.log('div is not dom');
				return map;
			} else {
				map.set('div', div);
				map.refreshLayout();

				while (div.parentNode) {
					div.style.backgroundColor = 'rgba(0,0,0,0)';
					div = div.parentNode;
				}

				return map;
			}
		}
	};
});