import React, {useEffect} from "react";
import { format } from 'date-fns'
import {generateCalendarData} from "../utils/generateCalendarData";
export type CalendarDataType = {
    date: Date,
    className: string
}
export type Task2DateRangePickerProps = {
}

export const Task2DateRangePicker: React.FunctionComponent<Task2DateRangePickerProps> = () => {
    const [year, setYear] = React.useState(new Date().getFullYear());
    const [month, setMonth] = React.useState(new Date().getMonth()+1);
    const [calendarData, setCalendarData] = React.useState([]as Array<CalendarDataType>);
    const [selectedRange, setSelectedRange] = React.useState({ start: "", end: "" } as {start:string|Date,end:string|Date});

    useEffect(() => {
        setCalendarData(generateCalendarData(year,month,true));
    }, [year, month]);

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
        if (!selectedRange.start) {
            setSelectedRange({ start: clickedDate, end: clickedDate });
        } else if (clickedDate >= selectedRange.start) {
            setSelectedRange({ start: selectedRange.start, end: clickedDate });
        } else {
            setSelectedRange({ start: clickedDate, end: selectedRange.start });
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
                                className={`${item.className} ${item.date>=selectedRange.start && item.date <= selectedRange.end ? 'selected' : ''}`}
                                onClick={()=>handleDateClick(item.date)}>
                        {format(item.date,"d日")}
                    </div>
                })}
            </div>
            <div>Select Range: {selectedRange.start && format(new Date(selectedRange.start),"yyyy-MM-dd")+'~'+format(new Date(selectedRange.end),"yyyy-MM-dd")}</div>
        </div>
    );
}
