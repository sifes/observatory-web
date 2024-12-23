import { instance } from '../instance';
import { Observation, ObservationDto } from './observation-api.types';

class ObservationApi {
  async getAll() {
    return await instance.get<Observation[]>('/Observation/GetAll');
  }

  async getObservationById(id: number) {
    return await instance.get<Observation>(`/Observation/GetById`, {
      params: { id },
    });
  }

  async createObservation(body: ObservationDto) {
    return await instance.post<Observation>('/Observation/add', body);
  }

  async updateObservation(id: number, body: ObservationDto) {
    return await instance.put(`/Observation/Update`, body, { params: { id } });
  }

  async deleteObservation(id: number) {
    return await instance.delete<string>(`/Observation/Delete`, {
      params: { id },
    });
  }
}

export const observationApi = new ObservationApi();
