import React, {useEffect} from "react";
import { format } from 'date-fns'
import {generateCalendarData} from "../utils/generateCalendarData";

export type DateRangePickerProps = {
}

export const Task1DateRangePicker: React.FunctionComponent<DateRangePickerProps> = () => {
    const [year, setYear] = React.useState(new Date().getFullYear());
    const [month, setMonth] = React.useState(new Date().getMonth()+1);
    const [calendarData, setCalendarData] = React.useState([]as Array<{ date: Date,className: string}>);
    const [selectedRange, setSelectedRange] = React.useState({ start: "", end: "" } as {start:string|Date,end:string|Date});

    useEffect(() => {
        setCalendarData(generateCalendarData(year,month,false));
    }, []);

    const handleDateClick = (clickedDate:Date) => {
        if(clickedDate.getFullYear() === year && clickedDate.getMonth() +1 === month) {
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
                <button className="prevMonth"></button>
                <div className="currentMonth">{year+'年'+month+'月'}</div>
                <button className="nextMonth"></button>
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
        </div>
    );
}
