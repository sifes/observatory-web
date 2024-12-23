export interface ObservationDto {
  name: string;
  scheduledTime: Date;
  spaceObjectId: number;
  equipmentId: number;
}

export interface Observation {
  id: number;
  name: string;
  description: string;
  properties: string;
  scheduledTime: string;
  spaceObjectId: number;
  equipmentId: number;
}
