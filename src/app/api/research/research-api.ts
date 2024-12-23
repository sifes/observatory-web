import { instance } from '../instance';
import { Research, ResearchDto } from './research-api.types';

class ResearchApi {
  static async getAll() {
    return await instance.get<Research[]>('/Research/GetAll');
  }

  async getResearchById(id: number) {
    return await instance.get<Research>(`/Research/GetById`, {
      params: { id },
    });
  }

  async createResearch(body: ResearchDto) {
    return await instance.post<Research>('/Research/add', body);
  }

  async updateResearch(id: number, body: ResearchDto) {
    return await instance.put(`/Research/Update`, body, { params: { id } });
  }

  async deleteResearch(id: number) {
    return await instance.delete<string>(`/Research/Delete`, {
      params: { id },
    });
  }
}

export const researchApi = new ResearchApi();
