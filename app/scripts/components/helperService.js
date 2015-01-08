'use strict';

angular.module('SpotterApp').factory('helperService', function() {
	var isDom = function(element) {
		return !!element && typeof element === 'object' && 'getBoundingClientRect' in element;
	};

	return {
		missions : [{
			'id' : 1,
			'title' : 'Nice and easy',
			'company' : 'Tesco',
			'address' : {
				'coordinates' : [52.230938, 21.009537],
				'distance' : '2'
			},
			'dueDate' : '2/15/2015 22:10',
			'price' : 5
		}, {
			'id' : 2,
			'title' : 'Nice and easy 2',
			'company' : 'Tesco',
			'address' : {
				'coordinates' : [52.330938, 21.009537],
				'distance' : '10'
			},
			'dueDate' : '1/20/2015 22:10',
			'price' : 10
		}, {
			'id' : 3,
			'title' : 'Nice and easy 3',
			'company' : 'Tesco 3',
			'address' : {
				'coordinates' : [52.430938, 21.109537],
				'distance' : '11'
			},
			'dueDate' : '2/5/2015 22:10',
			'price' : 64
		}, {
			'id' : 4,
			'title' : 'Nice and easy 4',
			'company' : 'Tesco',
			'address' : {
				'coordinates' : [52.530938, 21.209537],
				'distance' : '19'
			},
			'dueDate' : '2/9/2015 22:10',
			'price' : 1
		}, {
			'id' : 5,
			'title' : 'Nice and easy 5',
			'company' : 'Tesco',
			'address' : {
				'coordinates' : [52.630938, 21.209537],
				'distance' : '10'
			},
			'dueDate' : '2/9/2015 22:10',
			'price' : 78
		}, {
			'id' : 6,
			'title' : 'Nice and easy 6',
			'company' : 'Tesco',
			'address' : {
				'coordinates' : [52.730938, 21.509537],
				'distance' : '10'
			},
			'dueDate' : '2/7/2015 22:10',
			'price' : 44
		}, {
			'id' : 7,
			'title' : 'Nice and easy 7',
			'company' : 'Tesco',
			'address' : {
				'coordinates' : [52.830938, 21.309537],
				'distance' : '10'
			},
			'dueDate' : '2/6/2015 22:10',
			'price' : 67
		}, {
			'id' : 8,
			'title' : 'Nice and easy 8',
			'company' : 'Tesco',
			'address' : {
				'coordinates' : [52.930938, 21.009537],
				'distance' : '10'
			},
			'dueDate' : '2/1/2015 22:10',
			'price' : 66
		}, {
			'id' : 9,
			'title' : 'Nice and easy 9',
			'company' : 'Tesco',
			'address' : {
				'coordinates' : [52.030938, 21.909537],
				'distance' : '10'
			},
			'dueDate' : '2/11/2015 22:10',
			'price' : 99
		}, {
			'id' : 10,
			'title' : 'Nice and easy 10',
			'company' : 'Tesco',
			'address' : {
				'coordinates' : [52.330938, 22.009537],
				'distance' : '10'
			},
			'dueDate' : '2/12/2015 22:10',
			'price' : 75
		}],
		reattachMap : function(map, div) {
			console.log('re-attaching Native Map');
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
		},
		createMarkerIcon : function(price, currency) {
			// Icons can be added as base64 but wont work on Android 2.3
			var canvas = document.createElement('canvas');
			canvas.width = 50;
			canvas.height = 55;
			var context = canvas.getContext('2d');

			// draw Bubble rectangle
			context.fillStyle = 'rgba(72,195, 232, 0.8)';
			context.fillRect(0, 0, 50, 45);
			// draw Bubble tip
			context.beginPath();
			context.moveTo(15, 45);
			context.lineTo(35, 45);
			context.lineTo(25, 55);
			context.lineTo(15, 45);
			context.strokeStyle = 'rgba(0,0, 0, 0)';
			// Transparent Stroke
			context.stroke();
			context.closePath();
			context.fillStyle = 'rgba(72,195, 232, 0.8)';
			context.fill();
			// draw Price
			context.font = '16pt Arial';
			context.fillStyle = 'white';
			var x = canvas.width / 2;
			var y = canvas.height / 2;
			context.textAlign = 'center';
			context.fillText(price, x, y - 5);
			// draw currency
			context.font = '12pt Arial';
			context.fillText(currency, x, y + 10);
			return canvas.toDataURL('image/png');
		}
	};
});