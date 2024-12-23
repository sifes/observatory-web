import { instance } from '../instance';
import { Equipment, EquipmentDto } from './equipment-api.types';

class EquipmentApi {
  async getAll() {
    return await instance.get<Equipment[]>('/Equipment/GetAll');
  }

  async getEquipmentById(id: number) {
    return await instance.get<Equipment>(`/Equipment/GetById`, {
      params: { id },
    });
  }

  async createEquipment(body: EquipmentDto) {
    return await instance.post<Equipment>('/Equipment/add', body);
  }

  async updateEquipment(id: number, body: EquipmentDto) {
    return await instance.put(`/Equipment/Update`, body, { params: { id } });
  }

  async deleteEquipment(id: number) {
    return await instance.delete<string>(`/Equipment/Delete`, {
      params: { id },
    });
  }
}

export const equipmentApi = new EquipmentApi();
