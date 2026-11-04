import useUnitConvertor from "@/hooks/unitConvertorHook"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Ruler,
    Grid2x2,
    TriangleRight,
    Droplets,
    HardDrive,
    AudioLines,
    Weight,
    Gauge,
    Database,
    Clock4,
    Thermometer,
    Cuboid,
    Zap,
} from 'lucide-react';

import type { DimensionCategory } from '@/type';
import type { JSX } from "react/jsx-runtime";

const COLORS = [
    '#EF4444', // Red
    '#F97316', // Orange
    '#F59E0B', // Amber
    '#10B981', // Emerald
    '#06B6D4', // Cyan
    '#3B82F6', // Blue
    '#8B5CF6', // Purple
    '#EC4899', // Pink
    '#14B8A6', // Teal
    '#84CC16', // Lime
    '#6366F1', // Indigo
    '#0EA5E9', // Sky Blue
    '#F472B6', // Light Pink
    '#FB923C', // Light Orange
    '#A78BFA', // Lavender
];
const DIMENSION_COLORS: Record<DimensionCategory, string> = {
    length: COLORS[0],        // #EF4444 (Red)
    area: COLORS[1],          // #F97316 (Orange)
    angle: COLORS[2],         // #F59E0B (Amber)
    fuel: COLORS[3],          // #10B981 (Emerald)
    'data-transfer': COLORS[4], // #06B6D4 (Cyan)
    frequency: COLORS[5],     // #3B82F6 (Blue)
    mass: COLORS[6],          // #8B5CF6 (Purple)
    pressure: COLORS[7],      // #EC4899 (Pink)
    'data-size': COLORS[8],   // #14B8A6 (Teal)
    time: COLORS[9],          // #84CC16 (Lime)
    temperature: COLORS[10],  // #6366F1 (Indigo)
    speed: COLORS[11],        // #0EA5E9 (Sky Blue)
    volume: COLORS[12],       // #F472B6 (Light Pink)
    energy: COLORS[13],       // #FB923C (Light Orange)
};

export const DIMENSION_ICONS: Record<DimensionCategory, JSX.Element> = {
    length: <Ruler className="h-5 w-5" style={{ color: DIMENSION_COLORS.length }} />,
    area: <Grid2x2 className="h-5 w-5" style={{ color: DIMENSION_COLORS.area }} />,
    angle: <TriangleRight className="h-5 w-5" style={{ color: DIMENSION_COLORS.angle }} />,
    fuel: <Droplets className="h-5 w-5" style={{ color: DIMENSION_COLORS.fuel }} />,
    'data-transfer': <HardDrive className="h-5 w-5" style={{ color: DIMENSION_COLORS['data-transfer'] }} />,
    frequency: <AudioLines className="h-5 w-5" style={{ color: DIMENSION_COLORS.frequency }} />,
    mass: <Weight className="h-5 w-5" style={{ color: DIMENSION_COLORS.mass }} />,
    pressure: <Gauge className="h-5 w-5" style={{ color: DIMENSION_COLORS.pressure }} />,
    'data-size': <Database className="h-5 w-5" style={{ color: DIMENSION_COLORS['data-size'] }} />,
    time: <Clock4 className="h-5 w-5" style={{ color: DIMENSION_COLORS.time }} />,
    temperature: <Thermometer className="h-5 w-5" style={{ color: DIMENSION_COLORS.temperature }} />,
    speed: <Cuboid className="h-5 w-5" style={{ color: DIMENSION_COLORS.speed }} />,
    volume: <Cuboid className="h-5 w-5" style={{ color: DIMENSION_COLORS.volume }} />,
    energy: <Zap className="h-5 w-5" style={{ color: DIMENSION_COLORS.energy }} />,
};


export default function UnitConvertorDimensionSelect() {
    const { allDimension, setDimensionCategory, dimensionCategory } = useUnitConvertor()


    return (<Select value={dimensionCategory} onValueChange={setDimensionCategory}>
        <SelectTrigger className="sm:w-full w-100 capitalize font-medium py-5">
            <SelectValue placeholder="Select a dimension" />
        </SelectTrigger>
        <SelectContent>
            <SelectGroup className="capitalize pl-5">
                <SelectLabel>Dimension</SelectLabel>

                {allDimension?.map((dim, i) => {
                    return (
                        <SelectItem key={i} value={dim}>
                            {DIMENSION_ICONS[dim as  DimensionCategory]}
                            <span className="capitalize">{dim}</span>
                        </SelectItem>
                    )
                })
                }
            </SelectGroup>
        </SelectContent>
    </Select >
    )
}