import type { DimensionCategory } from '@/type';

type UnitMapDimension = Exclude<DimensionCategory, 'fuel' | 'temperature'>;
type FromUnitsDimension = 'fuel' | 'temperature';
interface BaseUnitData {
    baseUnit: string;
    toUnit: string;
}
interface UnitMapData extends BaseUnitData {
    dimension: UnitMapDimension;
    units: Record<string, number>; 
    fromUnits?: never;
}
interface FromUnitsData extends BaseUnitData {
    dimension: FromUnitsDimension;
    fromUnits: readonly string[]; 
    units?: never;
}



export type UnitData = UnitMapData | FromUnitsData;
export const unitData: UnitData[] = [
    {
        dimension: 'length',
        baseUnit: 'meter',
        toUnit: 'kilometer',
        units: {
            'millimeter': 0.001,
            'centimeter': 0.01,
            'meter': 1,
            'kilometer': 1000,
            'inch': 0.0254,
            'foot': 0.3048,
            'yard': 0.9144,
            'mile': 1609.344,
            'nautical-mile': 1852
        }
    },

    {
        dimension: 'area',
        baseUnit: 'sq-meter',
        toUnit: 'sq-kilometer',
        units: {
            'sq-millimeter': 0.000001,
            'sq-centimeter': 0.0001,
            'sq-meter': 1,
            'sq-kilometer': 1000000,
            'hectare': 10000,
            'acre': 4046.856,
            'sq-foot': 0.092903,
            'sq-yard': 0.836127,
            'sq-mile': 2589988.11
        }
    },

    {
        dimension: 'angle',
        baseUnit: 'radian',
        toUnit: 'degree',
        units: {
            'radian': 1,
            'degree': 0.0174533,
            'gradian': 0.015708,
            'arcminute': 0.000290888,
            'arcsecond': 0.00000484814
        }
    },

    {
        dimension: 'fuel',
        baseUnit: 'L/100km',
        toUnit: 'km/L',
        fromUnits: ['L/100km', 'km/L', 'mpg-US', 'mpg-UK']
    },

    // 5. DATA TRANSFER RATE (Base: bit per second)
    {
        dimension: 'data-transfer',
        baseUnit: 'bps',
        toUnit: 'mbps',
        units: {
            'bps': 1,
            'kbps': 1000,
            'mbps': 1000000,
            'gbps': 1000000000,
            'tbps': 1000000000000
        }
    },

    {
        dimension: 'frequency',
        baseUnit: 'hertz',
        toUnit: 'megahertz',
        units: {
            'hertz': 1,
            'kilohertz': 1000,
            'megahertz': 1000000,
            'gigahertz': 1000000000,
            'terahertz': 1000000000000,
            'rpm': 0.0166667
        }
    },

    {
        dimension: 'mass',
        baseUnit: 'gram',
        toUnit: 'kilogram',
        units: {
            'milligram': 0.001,
            'gram': 1,
            'kilogram': 1000,
            'tonne': 1000000,
            'ounce': 28.3495,
            'pound': 453.592,
            'stone': 6350.29
        }
    },

    {
        dimension: 'pressure',
        baseUnit: 'pascal',
        toUnit: 'kilopascal',
        units: {
            'pascal': 1,
            'hectopascal': 100,
            'kilopascal': 1000,
            'megapascal': 1000000,
            'bar': 100000,
            'millibar': 100,
            'atmosphere': 101325,
            'mmHg': 133.322,
            'psi': 6894.76
        }
    },

    {
        dimension: 'data-size',
        baseUnit: 'byte',
        toUnit: 'kilobyte',
        units: {
            'byte': 1,
            'kilobyte': 1000,
            'megabyte': 1000000,
            'gigabyte': 1000000000,
            'terabyte': 1000000000000,
            'kibibyte': 1024,
            'mebibyte': 1048576,
            'gibibyte': 1073741824,
            'tebibyte': 1099511627776
        }
    },

    {
        dimension: 'time',
        baseUnit: 'second',
        toUnit: 'minute',
        units: {
            'millisecond': 0.001,
            'second': 1,
            'minute': 60,
            'hour': 3600,
            'day': 86400,
            'week': 604800,
            'month': 2629800,
            'year': 31557600
        }
    },

    {
        dimension: 'temperature',
        baseUnit: 'kelvin',
        toUnit: 'celsius',
        fromUnits: ['celsius', 'fahrenheit', 'kelvin']
    },

    {
        dimension: 'speed',
        baseUnit: 'm/s',
        toUnit: 'km/h',
        units: {
            'm/s': 1,
            'km/h': 0.277778,
            'mph': 0.44704,
            'ft/s': 0.3048,
            'knot': 0.514444
        }
    },

    {
        dimension: 'volume',
        baseUnit: 'liter',
        toUnit: 'milliliter',
        units: {
            'milliliter': 0.001,
            'liter': 1,
            'hectoliter': 100,
            'cubic-meter': 1000,
            'teaspoon': 0.00492892,
            'tablespoon': 0.0147868,
            'fluid-ounce': 0.0295735,
            'cup': 0.236588,
            'pint': 0.473176,
            'quart': 0.946353,
            'gallon-us': 3.78541,
            'gallon-uk': 4.54609
        }
    },

    {
        dimension: 'energy',
        baseUnit: 'joule',
        toUnit: 'kilojoule',
        units: {
            'joule': 1,
            'kilojoule': 1000,
            'megajoule': 1000000,
            'watt-hour': 3600,
            'kilowatt-hour': 3600000,
            'calorie': 4.184,
            'kilocalorie': 4184,
            'btu': 1055.06,
            'electronvolt': 1.602e-19
        }
    }
];



function convertTemperature(value: number, fromUnit: string, toUnit: string) {
    // Step 1: Convert everything to Kelvin
    let kelvin;
    switch (fromUnit) {
        case 'celsius': kelvin = value + 273.15; break;
        case 'fahrenheit': kelvin = (value - 32) * 5 / 9 + 273.15; break;
        case 'kelvin': kelvin = value; break;
        default: return null;
    }

    // Step 2: Convert from Kelvin to target
    switch (toUnit) {
        case 'celsius': return kelvin - 273.15;
        case 'fahrenheit': return (kelvin - 273.15) * 9 / 5 + 32;
        case 'kelvin': return kelvin;
        default: return null;
    }
}


function convertFuel(value: number, fromUnit: string, toUnit: string) {
    // Step 1: Convert whatever you have into L/100km
    let lPer100km;
    switch (fromUnit) {
        case 'L/100km': lPer100km = value; break;
        case 'km/L': lPer100km = 100 / value; break;
        case 'mpg-US': lPer100km = 235.215 / value; break;
        case 'mpg-UK': lPer100km = 282.481 / value; break;
        default: return null;
    }

    // Step 2: Convert from L/100km to the target
    switch (toUnit) {
        case 'L/100km': return lPer100km;
        case 'km/L': return 100 / lPer100km;
        case 'mpg-US': return 235.215 / lPer100km;
        case 'mpg-UK': return 282.481 / lPer100km;
        default: return null;
    }
}


export function convert(
    value: number,
    category: DimensionCategory,
    fromUnit: string,
    toUnit: string
) {
    if (category === 'temperature') return convertTemperature(value, fromUnit, toUnit);
    if (category === 'fuel') return convertFuel(value, fromUnit, toUnit);

    const data = unitData.find((d) => d.dimension === category);

    if (!data || !('units' in data)) {
        throw new Error(`No numeric units found for category "${category}"`);
    }

    const units = data.units as unknown as Record<string, number>;

    const baseValue = value * units[fromUnit];
    return baseValue / units[toUnit];
}

export function formatResult(value: number | ''): string {
    if (value === '') return ''
    if (!isFinite(value)) return 'Error';
    if (isNaN(value)) return '';

    const str = String(value);
    if (str.includes('e')) {
        return str;
    }

    return value.toLocaleString('fr-FR', {
        maximumFractionDigits: 20,
        minimumFractionDigits: 0,
        useGrouping: true
    }
    );
}

export function parseFormattedNumber(str: string): number {
    const trimmed = str.trim();

    if (trimmed === '') return 0;
    if (trimmed === 'Error') return NaN;

    const cleaned = trimmed.replace(/[\s]/g, '');

    const parsed = parseFloat(cleaned);
    if (isNaN(parsed)) return NaN;

    return parsed;
}

export function removeDotsAfterFirst(str: string) {
    const cleanedStr = str.replace(/,/g, '.')
    const firstDot = cleanedStr.indexOf('.');
    if (firstDot === -1) return str;
    const before = cleanedStr.slice(0, firstDot + 1);
    const after = cleanedStr.slice(firstDot + 1).replace(/\./g, '');
    return before + after;
}