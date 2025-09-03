import eStatsPeriod from "./eStatsPeriod";

type tFilterPeriod = {
    selectedPeriod: eStatsPeriod;
    startDate?: Date;
    endDate?: Date;
}

export default tFilterPeriod;