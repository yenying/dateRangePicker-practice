import {CalendarDataType} from "../component/Task2DateRangePicker";

export function generateCalendarData(year:number,month:number,canCrossMonth:boolean) : Array<CalendarDataType> {
    const today = new Date(); // 获取当前日期
    const firstDayOfCurrentMonth = new Date(year, month - 1, 1);
    const currentLastDayOfMonth = new Date(year, month, 0);
    const firstDayOfWeek = firstDayOfCurrentMonth.getDay(); //當月份第一天的星期
    const lastDayOfWeek = currentLastDayOfMonth.getDay(); //當月份最後一天的星期
    const data = [];

    //假設第一天不是星期天,則將上個月的日期push
    if(firstDayOfWeek !== 0) {
        const prevMonthLastDay = new Date(year, month - 1, 0);
        const prevMonthDays = prevMonthLastDay.getDate();
        for (let day = prevMonthDays-firstDayOfWeek+1; day <= prevMonthDays; day++) {
            const date = new Date(year, month - 2, day);
            data.push({date:date,className: canCrossMonth?'pre-date':'not-current-month'});
        }
    }

    for (let day = 1; day <= currentLastDayOfMonth.getDate(); day++) {
        const date = new Date(year, month - 1, day);
        // 检查日期是否是今天
        const isToday = date.toDateString() === today.toDateString();
        data.push({date:date,className:isToday?'today':'date'});
    }

    //假設最後一天不是星期六,則將下個月的日期補上
    if(lastDayOfWeek !== 6) {
        for (let day = 1; day <= 6 - lastDayOfWeek; day++) {
            const date = new Date(year, month, day);
            data.push({date:date,className: canCrossMonth?'next-date':'not-current-month'});
        }
    }

    return data;
}