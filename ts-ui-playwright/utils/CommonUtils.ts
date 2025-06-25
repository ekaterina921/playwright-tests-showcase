export default class CommonUtils{

async getDateTimeString(){
    let dateNow: Date = new Date();
        let dateStr: string = dateNow.toISOString() + '.png';
        const symbolsToRemove = /[-,!?;:]/g;
        return dateStr.replace(symbolsToRemove, '');
}
}