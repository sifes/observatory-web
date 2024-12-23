import { instance } from '../instance';
import {
  SpaceObjectDto,
  SpaceObject,
} from './space-observation-object-api.types';

class SpaceObjectApi {
  async getAll() {
    return await instance.get<SpaceObject[]>('/SpaceObject/GetAll');
  }

  async getSpaceObjectById(id: number) {
    return await instance.get<SpaceObject>(`/SpaceObject/GetById`, {
      params: { id },
    });
  }

  async createSpaceObject(body: SpaceObjectDto) {
    return await instance.post<SpaceObject>('/SpaceObject/add', body);
  }

  async updateSpaceObject(id: number, body: SpaceObjectDto) {
    return await instance.put(`/SpaceObject/Update`, body, { params: { id } });
  }

  async deleteSpaceObject(id: number) {
    return await instance.delete<string>(`/SpaceObject/Delete`, {
      params: { id },
    });
  }
}

export const spaceObjectApi = new SpaceObjectApi();
