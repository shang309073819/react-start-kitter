/**
 * 配置文件
 */
import moment from 'moment';

const Config = {
	category: {
		'all': '全部',
		'politics': '时政',
		'military': '军事',
		'finance': '财经',
		'society': '社会',
		'entertainment': '娱乐',
		'sport': '体育',
		'tech': '科技',
		'autos': '汽车',
		'health': '健康',
		'education': '教育',
		'travel': '旅游',
		"unknown": '未分类'
	},
	renderTimeStamp: (time) => {
		time = parseInt(time);
		let now = moment().format('YYYY-MM-DD');
		let zero = moment(now).format('YYYY-MM-DD HH:mm:ss');
		let today = moment(zero).toDate().getTime();
		let todayTimeStamp = parseInt(moment(today).format('x'));
		let nowYear = moment().format('YYYY');
		let zeroYear = moment(nowYear).format('YYYY-MM-DD HH:mm:ss');
		let year = moment(zeroYear).toDate().getTime();
		let yearTimeStamp = parseInt(moment(year).format('x'));
		//今天只显示几点几分
		if (time >= todayTimeStamp) {
			return moment(time).format('HH:mm');
		}
		if (time >= yearTimeStamp) {
			return moment(time).format('MM-DD HH:mm');
		}
		return moment(time).format('YYYY-MM-DD HH:mm');
	},
	getTime: (time) => {
		time = parseInt(time, 10);
		let now = moment().format('YYYY-MM-DD');
		let zero = moment(now).format('YYYY-MM-DD HH:mm:ss');
		let today = moment(zero).toDate().getTime();
		let yesterday = moment(today).subtract(1, 'days').format('x');
		let tomorrow = moment(today).add(1, 'days').format('x');
		let lastWeek = moment(today).subtract(7, 'days').format('x');
		let result = {};
		switch (time) {
			//今天
			case 0:
				result = {
					startTime: today,
					endTime: tomorrow
				};
				break;
			// 昨天
			case 1:
				result = {
					startTime: yesterday,
					endTime: today
				};
				break;
			//	本周
			case 2:
				result = {
					startTime: lastWeek,
					endTime: tomorrow
				};
				break;

			//	1个小时内
			case 3:
				result = {
					startTime: moment().subtract(1, 'hours').format('x'),
					endTime: moment().format('x')
				};
				break;

			//	2个小时内
			case 4:
				result = {
					startTime: moment().subtract(2, 'hours').format('x'),
					endTime: moment().format('x')
				};
				break;
			//	3个小时内
			case 5:
				result = {
					startTime: moment().subtract(3, 'hours').format('x'),
					endTime: moment().format('x')
				};
				break;
			//	4个小时内
			case 6:
				result = {
					startTime: moment().subtract(4, 'hours').format('x'),
					endTime: moment().format('x')
				};
				break;
			//	24个小时内
			case 7:
				result = {
					startTime: moment().subtract(24, 'hours').format('x'),
					endTime: moment().format('x')
				};
				break;
			//	48个小时内
			case 8:
				result = {
					startTime: moment().subtract(48, 'hours').format('x'),
					endTime: moment().format('x')
				};
				break;
		}
		return result;
	}
};
export default Config;
