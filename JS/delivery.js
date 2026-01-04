class MumbaiDelivery {
    constructor() {
        this.areas = {
            '400001': 'Fort',
            '400028': 'Bandra West',
            '400016': 'Dadar East'
        };
    }

    getDeliveryTime(pincode) {
        const area = this.areas[pincode.substring(0,6)];
        return area ? '2 hours' : 'Next day';
    }
} 