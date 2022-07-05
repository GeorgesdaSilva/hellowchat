


class DayOfWeek {
    index: number;
    label: string;
    open: boolean;

    start1: Date;

    end1: Date;

    start2: Date

    end2: Date;

    constructor({ index, label, open, start1, end1, start2, end2 }: { index: number, label: string, open: boolean, start1: Date, end1: Date, start2: Date, end2: Date }) {

        this.index = index
        this.label = label
        this.open = open
        this.start1 = start1
        this.end1 = end1
        this.start2 = start2
        this.end2 = end2
    }


}

export default DayOfWeek