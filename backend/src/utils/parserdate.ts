
    const parseInitialDate = (date: Date) => {
        var currentdate = date;
        var datetime = currentdate.getDate() + "/"
            + (currentdate.getMonth() + 1) + "/"
            + currentdate.getFullYear() + " "
            + currentdate.getHours() + ":"
            + `${currentdate.getMinutes() < 10 ? "0" + currentdate.getMinutes() : currentdate.getMinutes()}` + " ";

        return datetime;
    }
    const parseEndDate = (date: Date) => {
        var currentdate = date;
        var datetime = currentdate.getDate() + "/"
            + (currentdate.getMonth() + 1) + "/"
            + currentdate.getFullYear() + " "
            + currentdate.getHours() + ":"
            + `${currentdate.getMinutes() < 10 ? "0" + currentdate.getMinutes() : currentdate.getMinutes()}` + " ";

        return datetime;
    }
export {parseInitialDate,parseEndDate};