import { Observation } from '../observation/observation-api.types';

export interface ObservationOrderDto {
  observationId: number;
  userId: number;
}

export interface ObservationOrder {
  id: number;
  observationId: number;
  userId: number;
}

export interface ObservationOrderWithObservation extends ObservationOrder {
  observation: Observation;
}
