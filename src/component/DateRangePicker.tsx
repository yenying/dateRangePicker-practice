import React, {useEffect} from "react";
import { format } from 'date-fns'
export type DateRangePickerProps = {
}

export const DateRangePicker: React.FunctionComponent<DateRangePickerProps> = () => {
    const [year, setYear] = React.useState(new Date().getFullYear());
    const [month, setMonth] = React.useState(new Date().getMonth()+1);
    const [calendarData, setCalendarData] = React.useState([]as Array<{ date: Date,className: string}>);
    const [selectedRange, setSelectedRange] = React.useState({ start: "", end: "" } as {start:string|Date,end:string|Date});

    useEffect(() => {
        generateCalendarData();
    }, [year, month]);
    const generateCalendarData = () => {
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
                data.push({date:date,className:'pre-date'});
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
                data.push({date:date,className:'next-date'});
            }
        }

        setCalendarData(data);
    };

    const goToPreviousMonth = () => {
        if (month === 1) {
            setYear(year - 1);
            setMonth(12);
        } else {
            setMonth(month - 1);
        }
    };

    const goToNextMonth = () => {
        if (month === 12) {
            setYear(year + 1);
            setMonth(1);
        } else {
            setMonth(month + 1);
        }
    };

    const goToCurrentMonth = ()=>{
        setYear(new Date().getFullYear())
        setMonth(new Date().getMonth()+1)
    }

    const handleDateClick = (clickedDate:Date) => {
        if(clickedDate.getFullYear() === year && clickedDate.getMonth() +1 === month){
            if (!selectedRange.start) {
                setSelectedRange({ start: clickedDate, end: clickedDate });
            } else if (clickedDate >= selectedRange.start) {
                setSelectedRange({ start: selectedRange.start, end: clickedDate });
            } else {
                setSelectedRange({ start: clickedDate, end: selectedRange.start });
            }
        }

    };

    return (
        <div className="calendar">
            <div className="calendarHeader">
                <button className="prevMonth" onClick={goToPreviousMonth}></button>
                <div className="currentMonth" onClick={goToCurrentMonth}>{year+'年'+month+'月'}</div>
                <button className="nextMonth" onClick={goToNextMonth}></button>
            </div>
            <div className="dates">
                {calendarData.map(item=>{
                    return <div key={item.date.toString()}
                                style={{
                                    background:
                                    item.className ==='today'
                                        ? 'yellow'
                                        : selectedRange.start <= item.date && item.date <= selectedRange.end
                                            ? '#006edc'
                                            : 'white',
                                }}
                                className={item.className}
                                onClick={()=>handleDateClick(item.date)}>
                        {format(item.date,"d日")}
                    </div>
                })}
            </div>
        </div>
    );
}
