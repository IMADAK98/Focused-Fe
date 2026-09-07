import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { IntakeChipCatalogItem } from '../session/types';

@Injectable({ providedIn: 'root' })
export class FocusedApiService {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiBaseUrl}/api/v1`;

  getMe() {
    return this.http.get(`${this.base}/me`);
  }

  getCatalog() {
    return this.http.get<Array<{ id: string; name: string; description: string }>>(
      `${this.base}/focus-area-catalog`
    );
  }

  getIntakeChipCatalog(focusAreaCatalogId: string, kind: string) {
    const params = new HttpParams()
      .set('focusAreaCatalogId', focusAreaCatalogId)
      .set('kind', kind);
    return this.http.get<IntakeChipCatalogItem[]>(`${this.base}/intake-chip-catalog`, { params });
  }

  seedMorningEnergy() {
    return this.http.get<Record<string, unknown>>(`${this.base}/focus-areas/seed-morning-energy`);
  }

  getFocusArea(id: string) {
    return this.http.get<Record<string, unknown>>(`${this.base}/focus-areas/${id}`);
  }

  createFocusArea(catalogId: string) {
    return this.http.post<Record<string, unknown>>(`${this.base}/focus-areas`, { catalogId });
  }

  saveIntake(id: string, body: unknown) {
    return this.http.put<Record<string, unknown>>(`${this.base}/focus-areas/${id}/intake`, body);
  }

  getAsIs(id: string) {
    return this.http.get<Record<string, unknown>>(`${this.base}/focus-areas/${id}/as-is`);
  }

  updateAsIs(id: string, body: unknown) {
    return this.http.put<Record<string, unknown>>(`${this.base}/focus-areas/${id}/as-is`, body);
  }

  getCalibration(id: string) {
    return this.http.get<Record<string, unknown>>(`${this.base}/focus-areas/${id}/calibration`);
  }

  calibrate(id: string, confirmedBottleneckIndex: number) {
    return this.http.post<Record<string, unknown>>(`${this.base}/focus-areas/${id}/calibration`, {
      confirmedBottleneckIndex
    });
  }

  getToBe(id: string) {
    return this.http.get<Record<string, unknown>>(`${this.base}/focus-areas/${id}/to-be`);
  }

  updateToBe(id: string, body: unknown) {
    return this.http.put<Record<string, unknown>>(`${this.base}/focus-areas/${id}/to-be`, body);
  }

  confirmToBe(id: string) {
    return this.http.post<Record<string, unknown>>(`${this.base}/focus-areas/${id}/to-be/confirm`, {});
  }

  getRun(id: string) {
    return this.http.get<Record<string, unknown>>(`${this.base}/focus-areas/${id}/run`);
  }

  submitCheckIn(id: string, day: number, success: boolean) {
    return this.http.put<Record<string, unknown>>(
      `${this.base}/focus-areas/${id}/run/check-ins/${day}`,
      { success }
    );
  }
}
