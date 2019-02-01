import { PointGeometry } from './PointGeometry';

export interface FreeSlot {
  freeSlotsGeometry: PointGeometry[],
  id: number,
  slotOrientation: 'parallel' | 'perpendicular'
}
