import { TestBed } from '@angular/core/testing';

import { OrdemCompraService } from './ordem-compra.service';

describe('OrdemCompraService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrdemCompraService = TestBed.get(OrdemCompraService);
    expect(service).toBeTruthy();
  });
});
