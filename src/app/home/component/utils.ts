import dayjs from "dayjs";
import ja from "dayjs/locale/ja";

dayjs.locale(ja);

export const hour = (keys: number) => [...Array(keys).keys()];

export function calcWeek(start?: string) {
	const date = start ? dayjs(start) : dayjs();
	const day = date.day();
	const startDay = date.subtract(day, 'd');
	const week = [];
	for (let day = 0; day < 7; day++) {
		week.push(startDay.add(day, 'day'));
	}

	return week;
}